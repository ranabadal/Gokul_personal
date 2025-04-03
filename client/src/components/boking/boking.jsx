// import React, { useState } from "react";
// import styles from "./boking.module.css";
// import hall from "./assets/hall.svg";
// import heart from "./assets/heart.svg";

// const Boking = ({ bookingData }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const bookingsPerPage = 2;

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const getCurrentBookings = () => {
//         const startIndex = (currentPage - 1) * bookingsPerPage;
//         return bookingData.slice(startIndex, startIndex + bookingsPerPage);
//     };

//     const currentBookings = getCurrentBookings();

//     return (
//         <div className={styles.boking_Container}>
//             <div className={styles.boking_Container_main}>
//                 <div className={styles.boking_Container_main_top}>
//                     <div className={styles.boking_Container_heading}>Booking History</div>
//                     {currentBookings.map((booking, index) => (
//                         <div key={index} className={styles.boking_Container_details}>
//                             <div className={styles.boking_Container_details_top}>Booked on: {booking.date} ({booking.duration})</div>
//                             <div className={styles.boking_Container_details_bottom}>
//                                 <div className={styles.boking_Container_details_bottom_left}>
//                                     <img src={hall} alt="hall" />
//                                 </div>
//                                 <div className={styles.boking_Container_details_bottom_right}>
//                                     <div className={styles.boking_Container_details_bottom_right_heading}>
//                                         <div className={styles.boking_Container_details_bottom_right_heading_left}>{booking.hall}</div>
//                                         <div className={styles.boking_Container_details_bottom_right_heading_right}>
//                                             <img src={heart} alt="heart" />
//                                         </div>
//                                     </div>
//                                     <div className={styles.boking_Container_details_bottom_right_number}>{booking.seating}</div>
//                                     <div className={styles.boking_Container_details_bottom_right_price}>
//                                         <div className={styles.boking_Container_details_bottom_right_price_left}>{booking.price}</div>
//                                         <div className={styles.boking_Container_details_bottom_right_price_button}>
//                                             <button>Re-book</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className={styles.order_history_container_page_no}>
//                     <div className={styles.order_history_container_page_no_1} onClick={() => handlePageChange(1)}>1</div>
//                     <div className={styles.order_history_container_page_no_2} onClick={() => handlePageChange(2)}>2</div>
//                     <div className={styles.order_history_container_page_no_3} onClick={() => handlePageChange(3)}>3</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Boking;


// import React, { useState, useEffect } from "react";
// import styles from "./boking.module.css";
// import hall from "./assets/hall.svg";
// import heart from "./assets/heart.svg";
// import Loader from "../../components/Loader/loader2/loader2"; // Import the loader component

// const Boking = () => {
//     const [queries, setQueries] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedQuery, setSelectedQuery] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const bookingsPerPage = 2;

//     useEffect(() => {
//         const fetchUserBookings = async () => {
//             try {
//                 setLoading(true); 
//                 const token = localStorage.getItem("jwtToken");
//                 const response = await fetch("http://localhost:8080/api/queries/user/", {
//                     method: "GET",
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setQueries(data);
//                 } else {
//                     console.error("Failed to fetch user bookings.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching bookings:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserBookings();
//     }, []);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const getCurrentBookings = () => {
//         const startIndex = (currentPage - 1) * bookingsPerPage;
//         return queries.slice(startIndex, startIndex + bookingsPerPage);
//     };

//     const totalPages = Math.ceil(queries.length / bookingsPerPage); // Compute total pages dynamically
//     const currentBookings = getCurrentBookings();

//     return (
//         <div className={styles.boking_Container}>
//     <div className={styles.boking_Container_main}>
//         <div className={styles.Heading}>My Banquet Bookings</div>

//         {loading ? (
//             <Loader />
//         ) : selectedQuery ? (
//             <div className={styles.queryDetails}>
//                 <h3>{selectedQuery.hallTitle}</h3>
//                 <p><strong>Guests:</strong> {selectedQuery.guestCount}</p>
//                 <p><strong>Occasion:</strong> {selectedQuery.occasion}</p>
//                 <p><strong>Total Cost:</strong> ₹{selectedQuery.totalCost}</p>
//                 <p><strong>Status:</strong> <span className={styles.status}>{selectedQuery.status}</span></p>
//                 <button onClick={() => setSelectedQuery(null)}>Close</button>
//             </div>
//         ) : (
//             <>
//                 {currentBookings.map((booking) => (
//                     <div key={booking._id} className={styles.bookingCard}>
//                         <h3>{booking.hallTitle}</h3>
//                         <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
//                         <p>Guests: {booking.guestCount}</p>
//                         <p>Price: ₹{booking.totalCost}</p>
//                         <div className={styles.status}>
//                             Status: {booking.status === "Approved" ? "✅ Approved" : "⌛ Pending"}
//                         </div>
//                         <button onClick={() => setSelectedQuery(booking)}>View Details</button>
//                     </div>
//                 ))}

//                 {/* Show pagination only if no query is selected */}
//                 {totalPages > 1 && !selectedQuery && (
//                     <div className={styles.pagination}>
//                         {[...Array(totalPages)].map((_, index) => (
//                             <button 
//                                 key={index + 1} 
//                                 onClick={() => handlePageChange(index + 1)}
//                                 className={currentPage === index + 1 ? styles.activePage : ""}
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </>
//         )}
//     </div>
// </div>
//     );
// };

// export default Boking;

// import React, { useState, useEffect } from "react";
// import styles from "./boking.module.css";
// import Loader from "../../components/Loader/loader2/loader2";

// const Boking = () => {
//     const [queries, setQueries] = useState([]); // Store fetched booking data
//     const [currentPage, setCurrentPage] = useState(1); // Handle pagination
//     const [selectedQuery, setSelectedQuery] = useState(null); // Store selected booking
//     const [loading, setLoading] = useState(false); // Manage loading state
//     const bookingsPerPage = 2; // Number of bookings per page

//     useEffect(() => {
//         const fetchUserBookings = async () => {
//             try {
//                 setLoading(true);
//                 const token = localStorage.getItem("jwtToken");
//                 const response = await fetch("http://localhost:8080/api/queries/user/", {
//                     method: "GET",
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (!response.ok) throw new Error("Failed to fetch user bookings.");

//                 const data = await response.json();

//                 if (Array.isArray(data)) {
//                     console.log("Fetched Data:", data); // Debug log
//                     setQueries(data);
//                 } else {
//                     console.error("Unexpected API response:", data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching bookings:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserBookings();
//     }, []);

//     // Pagination logic
//     const handlePageChange = (pageNumber) => {
//         console.log("Changing to page:", pageNumber); // Debug log
//         setCurrentPage(pageNumber);
//     };

//     const getCurrentBookings = () => {
//         const startIndex = (currentPage - 1) * bookingsPerPage;
//         return queries.slice(startIndex, startIndex + bookingsPerPage);
//     };

//     const totalPages = Math.ceil(queries.length / bookingsPerPage);
//     const currentBookings = getCurrentBookings();

//     return (
//         <div className={styles.boking_Container}>
//             <div className={styles.boking_Container_main}>
//                 <h2>My Banquet Bookings</h2>

//                 {loading ? (
//                     <Loader />
//                 ) : queries.length === 0 ? (
//                     <div className={styles.noBookings}>
//                         <p>🚀 No banquet bookings found! Start planning your event today 🎉</p>
//                     </div>
//                 ) : selectedQuery ? (
//                     <div className={styles.queryDetails}>
//                         <h3>{selectedQuery.hallTitle}</h3>
//                         <p><strong>Guests:</strong> {selectedQuery.guestCount}</p>
//                         <p><strong>Occasion:</strong> {selectedQuery.occasion}</p>
//                         <p><strong>Total Cost:</strong> ₹{selectedQuery.totalCost}</p>
//                         <p><strong>Status:</strong> <span className={styles.status}>{selectedQuery.status}</span></p>
//                         <button onClick={() => setSelectedQuery(null)}>Close</button>
//                     </div>
//                 ) : (
//                     <>
//                         {currentBookings.map((booking) => (
//                             <div key={booking._id} className={styles.bookingCard}>
//                                 <h3>{booking.hallTitle}</h3>
//                                 <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
//                                 <p>Guests: {booking.guestCount}</p>
//                                 <p>Price: ₹{booking.totalCost}</p>
//                                 <div className={styles.status}>
//                                     Status: {booking.status === "Approved" ? "✅ Approved" : "⌛ Pending"}
//                                 </div>
//                                 <button onClick={() => setSelectedQuery(booking)}>View Details</button>
//                             </div>
//                         ))}

//                         {/* Show pagination only when viewing all bookings */}
//                         {totalPages > 1 && !selectedQuery && (
//                             <div className={styles.pagination}>
//                                 {[...Array(totalPages)].map((_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => handlePageChange(index + 1)}
//                                         className={currentPage === index + 1 ? styles.activePage : ""}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Boking;




// import React, { useState, useEffect } from "react";
// import styles from "./boking.module.css";
// import Loader from "../../components/Loader/loader2/loader2";

// const Boking = () => {
//     const [queries, setQueries] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedQuery, setSelectedQuery] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const bookingsPerPage = 2;

//     useEffect(() => {
//         const fetchUserBookings = async () => {
//             try {
//                 setLoading(true);
//                 const token = localStorage.getItem("jwtToken");
//                 const response = await fetch("http://localhost:8080/api/queries/user/", {
//                     method: "GET",
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (!response.ok) throw new Error("Failed to fetch user bookings.");

//                 const data = await response.json();

//                 if (Array.isArray(data)) {
//                     console.log("Fetched Data:", data);
//                     setQueries(data);
//                 } else {
//                     console.error("Unexpected API response:", data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching bookings:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserBookings();
//     }, []);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const getCurrentBookings = () => {
//         const startIndex = (currentPage - 1) * bookingsPerPage;
//         return queries.slice(startIndex, startIndex + bookingsPerPage);
//     };

//     const totalPages = Math.ceil(queries.length / bookingsPerPage);
//     const currentBookings = getCurrentBookings();

//     return (
//         <div className={styles.boking_Container}>
//             <div className={styles.boking_Container_main}>
//                 <h2>My Banquet Bookings</h2>

//                 {loading ? (
//                     <Loader />
//                 ) : queries.length === 0 ? (
//                     <div className={styles.noBookings}>
//                         <p>🚀 No banquet bookings found! Start planning your event today 🎉</p>
//                     </div>
//                 ) : (
//                     <>
//                         {currentBookings.map((booking) => (
//                             <div key={booking._id} className={styles.bookingCard}>
//                                 <h3>{booking.hallTitle}</h3>
//                                 <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
//                                 <p>Guests: {booking.guestCount}</p>
//                                 <p>Price: ₹{booking.totalCost}</p>
//                                 <div className={styles.status}>
//                                     Status: {booking.status === "Approved" ? "✅ Approved" : "⌛ Pending"}
//                                 </div>
//                                 <button onClick={() => setSelectedQuery(booking)}>View Details</button>
//                             </div>
//                         ))}

//                         {totalPages > 1 && !selectedQuery && (
//                             <div className={styles.pagination}>
//                                 {[...Array(totalPages)].map((_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => handlePageChange(index + 1)}
//                                         className={currentPage === index + 1 ? styles.activePage : ""}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}

//                 {/* Modal for Viewing Details */}
//                 {selectedQuery && (
//                     <div className={styles.modalOverlay}>
//                         <div className={styles.modalContent}>
//                             <h3>Booking Details</h3>
//                             <p><strong>Hall Name:</strong> {selectedQuery.hallTitle}</p>
//                             <p><strong>Occasion:</strong> {selectedQuery.occasion}</p>
//                             <p><strong>Guests:</strong> {selectedQuery.guestCount}</p>
//                             <p><strong>Menu:</strong> {selectedQuery.selectedCart}</p>
//                             <p><strong>Dates:</strong> {selectedQuery.selectedDates?.join(", ") || "N/A"}</p>
//                             <p><strong>Timings:</strong> {selectedQuery.preferredTimings?.join(", ") || "N/A"}</p>
//                             <p><strong>Menu Preferences:</strong> {selectedQuery.menuPreferences ? JSON.stringify(selectedQuery.menuPreferences) : "N/A"}</p>
//                             <p><strong>Comments:</strong> {selectedQuery.comments || "None"}</p>
//                             <p><strong>Total Cost:</strong> ₹{selectedQuery.totalCost || 0}</p>
//                             <button className={styles.closeBtn} onClick={() => setSelectedQuery(null)}>Close</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Boking;



import React, { useState, useEffect } from "react";
import styles from "./boking.module.css";
import Loader from "../../components/Loader/loader2/loader2";

const Boking = () => {
    const [queries, setQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [loading, setLoading] = useState(false);
    const bookingsPerPage = 2;

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("jwtToken");
                const response = await fetch("http://localhost:8080/api/queries/user/", {
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
            alert("You cannot cancel an order once it has been approved.");
            return;
        }

        if (orderStatus === "Canceled") {
            alert("This order has already been canceled.");
            return;
        }

        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/queries/${orderId}/cancel`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                alert("Order canceled successfully!");

                const updatedResponse = await fetch("http://localhost:8080/api/queries/user", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setQueries(updatedData);
                } else {
                    alert("Failed to refresh orders. Please try again.");
                }
            } else {
                alert("Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("An error occurred. Please try again later.");
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
                                        Cancel Order
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
                            <p><strong>Timings:</strong> {selectedQuery.preferredTimings?.join(", ") || "N/A"}</p>
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