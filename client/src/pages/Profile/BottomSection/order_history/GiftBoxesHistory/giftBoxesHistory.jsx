import React, { useState, useEffect } from "react";
import styles from "./giftBoxesHistory.module.css";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component

const GiftBoxesHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/api/giftBoxOrderQueries/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setErrorMessage("Failed to fetch gift box orders.");
        }
      } catch (error) {
        console.error("Error fetching gift box orders:", error);
        setErrorMessage("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      const response = await fetch(`http://localhost:8080/api/giftBoxOrderQueries/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Order canceled successfully!");

        const updatedResponse = await fetch("http://localhost:8080/api/giftBoxOrderQueries/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setOrders(updatedData);
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

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
  if (orders.length === 0) return <>
    <div className={styles.heading}>Gift Boxes Order History</div>
     <p className={styles.noOrders}>🎁 No gift box orders yet! Start shopping now!</p>
  </>

  return (
    <div className={styles.orderContainer}>
      {/* <h2>Gift Boxes Order History</h2> */}
      <div className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Box Name</th>
              <th>Products</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.boxName || "N/A"}</td>
                <td>
                  {order.products?.map((product, index) => (
                    <div key={index}>
                      {product.productName} - ₹{product.productPrice} x {product.quantity}
                    </div>
                  )) || "N/A"}
                </td>
                <td>₹{order.totalCost || 0}</td>
                <td>{order.status || "Pending"}</td>
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