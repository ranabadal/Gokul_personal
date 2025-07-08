

import React, { useState, useEffect } from "react";
import styles from "./boking.module.css";
import Loader from "../../components/Loader/loader2/loader2";
import { BASE_URL } from "../../Const/Const";
import { useToaster } from "../../utils";

const Boking = () => {
    const [queries, setQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [loading, setLoading] = useState(false);
    const bookingsPerPage = 2;
    const setToast = useToaster();

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("jwtToken");
                const response = await fetch(`${BASE_URL}/api/queries/user/`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user bookings.");

                const data = await response.json();

                if (Array.isArray(data)) {
                    console.log("Fetched Data:", data);
                    setQueries(data);
                } else {
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentBookings = () => {
        const startIndex = (currentPage - 1) * bookingsPerPage;
        return queries.slice(startIndex, startIndex + bookingsPerPage);
    };

    const handleCancelOrder = async (orderId, orderStatus) => {
        if (orderStatus === "Approved") {
            setToast("You cannot cancel the booking once it has been approved.", "error");
            return;
        }

        if (orderStatus === "Canceled") {
            setToast("This booking has already been canceled.", "error");
            return;
        }

        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`${BASE_URL}/api/queries/${orderId}/cancel`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setToast("Booking canceled successfully!", "success");

                const updatedResponse = await fetch(`${BASE_URL}/api/queries/user`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setQueries(updatedData);
                } else {
                    setToast("Failed to refresh orders. Please try again.", "error");
                }
            } else {
                setToast("Failed to cancel booking.", "error");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            setToast("An error occurred. Please try again later.", "error");
        }
    };

    const totalPages = Math.ceil(queries.length / bookingsPerPage);
    const currentBookings = getCurrentBookings();

    return (
        <div className={styles.boking_Container}>
            <div className={styles.boking_Container_main}>
                <h2>My Banquet Bookings</h2>

                {loading ? (
                    <Loader />
                ) : queries.length === 0 ? (
                    <div className={styles.noBookings}>
                        <p>🚀 No banquet bookings found! Start planning your event today 🎉</p>
                    </div>
                ) : (
                    <>
                        {currentBookings.map((booking) => (
                            <div key={booking._id} className={styles.bookingCard}>
                                <h3>{booking.hallTitle}</h3>
                                <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                                <p>Guests: {booking.guestCount}</p>
                                <p>Price: ₹{booking.totalCost}</p>
                                <div className={styles.status}>
                                    Status: {booking.status}
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => setSelectedQuery(booking)} className={styles.viewBtn}>
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleCancelOrder(booking._id, booking.status)}
                                        className={styles.cancelBtn}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))}

                        {totalPages > 1 && !selectedQuery && (
                            <div className={styles.pagination}>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? styles.activePage : ""}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {selectedQuery && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h3>Booking Details</h3>
                            <p><strong>Hall Name:</strong> {selectedQuery.hallTitle}</p>
                            <p><strong>Occasion:</strong> {selectedQuery.occasion}</p>
                            <p><strong>Guests:</strong> {selectedQuery.guestCount}</p>
                            <p><strong>Menu:</strong> {selectedQuery.selectedCart}</p>
                            <p><strong>Dates:</strong> {selectedQuery.selectedDates?.join(", ") || "N/A"}</p>
                            <p>
  <strong>Timings:</strong>{" "}
  {selectedQuery.preferredTimings?.start && selectedQuery.preferredTimings?.end
    ? `${new Date(`1970-01-01T${selectedQuery.preferredTimings.start}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })} 
       to 
       ${new Date(`1970-01-01T${selectedQuery.preferredTimings.end}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`
    : "N/A"}
</p>
                            <p><strong>Menu Preferences:</strong> {selectedQuery.menuPreferences ? JSON.stringify(selectedQuery.menuPreferences) : "N/A"}</p>
                            <p><strong>Comments:</strong> {selectedQuery.comments || "None"}</p>
                            <p><strong>Total Cost:</strong> ₹{selectedQuery.totalCost || 0}</p>
                            <button className={styles.closeBtn} onClick={() => setSelectedQuery(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Boking;