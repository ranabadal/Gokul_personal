import React, { useState, useEffect } from "react";
import styles from "./giftBoxesHistory.module.css";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component
import { BASE_URL } from "../../../../../Const/Const";
import { useToaster } from "../../../../../utils"; // Adjust the import path as necessary
const GiftBoxesHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const setToast = useToaster();

  // Fetch user orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${BASE_URL}/api/giftBoxOrderQueries/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging output

        if (!response.ok || !Array.isArray(data)) throw new Error("Invalid response format");

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrorMessage("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cancel Order Function
  const handleCancelOrder = async (orderId, orderStatus) => {
    if (orderStatus === "Approved") {
      setToast("You cannot cancel an order once it has been approved.","error");
      return;
    }

    if (orderStatus === "Rejected") {
      setToast("You cannot cancel an order once it has been rejected.","error");
      return;
    }
    if (orderStatus === "Canceled") {
      setToast("This order has already been canceled.","success");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${BASE_URL}/api/giftBoxOrderQueries/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setToast("Order canceled successfully!","success");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Canceled" } : order))
        );
      } else {
        setToast("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      setToast("An error occurred. Please try again later.","error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
  if (!orders || orders.length === 0)
    return (
      <>
        <div className={styles.heading}>Gift Boxes Order History</div>
        <p className={styles.noOrders}>🎁 No gift box orders yet! Start shopping now!</p>
      </>
    );

  return (
    <div className={styles.orderContainer}>
      <div className={styles.heading}>Gift Boxes Order History</div>
      <div className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Items</th>
              <th>Matching Handbags</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.cartItems.map((item, idx) => (
                    <div key={idx}>
                      {item.details.name} - ₹{item.details.price} x {item.details.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  {order.cartItems.map((item) =>
                    item.matchingHandbags?.length > 0 ? (
                      item.matchingHandbags.map((handbag, hIdx) => (
                        <div key={hIdx}>{handbag.name} - ₹{handbag.price} x {handbag.quantity}</div>
                      ))
                    ) : (
                      <div>No matching handbags</div>
                    )
                  )}
                </td>
                <td>₹{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <button className={styles.cancel} onClick={() => handleCancelOrder(order._id, order.status)}>
                    Cancel
                  </button>
                  <button className={styles.view} onClick={() => setSelectedOrder(order)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default GiftBoxesHistory;