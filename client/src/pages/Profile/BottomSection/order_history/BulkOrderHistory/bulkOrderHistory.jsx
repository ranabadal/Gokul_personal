

import React, { useState, useEffect } from "react";
import styles from "./bulkOrderHistory.module.css";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component
import { BASE_URL } from "../../../../../Const/Const";
const BulkOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${BASE_URL}/api/bulkOrderQueries/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging output
    
        if (!response.ok || !Array.isArray(data)) throw new Error("Invalid response format");
    
        setOrders(data);
      } catch (error) {
        console.error("Error fetching bulk orders:", error);
        setErrorMessage("An error occurred while fetching bulk orders.");
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
      const response = await fetch(`${BASE_URL}/api/bulkOrderQueries/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Order canceled successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Canceled" } : order))
        );
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
  if (orders.length === 0)
    return (
      <>
        <div className={styles.heading}>Bulk Order History</div>
        <p className={styles.noOrders}>📦 No bulk orders yet! Place an order today!</p>
      </>
    );

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Items</th>
              <th>Gift Boxes</th>
              <th>Regular Boxes</th>
              <th>Matching Handbags</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {orders && Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order._id}>
        <td>
          {order.selectedItems && Object.keys(order.selectedItems).length > 0 ? (
            Object.entries(order.selectedItems).map(([itemName, qty], idx) => (
              <div key={idx}>{itemName} - {qty} kg</div>
            ))
          ) : "No items"}
        </td>
        <td>
          {order.giftBoxes && order.giftBoxes.length > 0 ? (
            order.giftBoxes.map((box, idx) => (
              <div key={idx}>{box.name} - Qty: {box.quantity} (₹{box.price * box.quantity})</div>
            ))
          ) : "No gift boxes"}
        </td>
        <td>
          {order.selectedRegularBoxes && order.selectedRegularBoxes.length > 0 ? (
            order.selectedRegularBoxes.map((box, idx) => (
              <div key={idx}>{box.label} - Qty: {box.quantity}</div>
            ))
          ) : "No regular boxes"}
        </td>
        <td>
          {order.giftBoxes && order.giftBoxes.some((box) => box.matchingHandbags?.length > 0) ? (
            order.giftBoxes.map((box) =>
              box.matchingHandbags?.map((handbag, hIdx) => (
                <div key={hIdx}>{handbag.name} - Qty: {handbag.quantity} (₹{handbag.price * handbag.quantity})</div>
              ))
            )
          ) : "No matching handbags"}
        </td>
        <td>₹{order.totalCost || "N/A"}</td>
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
    ))
  ) : (
    <tr>
      <td colSpan="7">No bulk orders found.</td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default BulkOrderHistory;