import React from "react";
import styles from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Order Details</h2>
        <p><strong>User Name:</strong> {order.user?.name || "N/A"}</p>
        <p><strong>Phone Number:</strong> {order.user?.number || "N/A"}</p>
        <p><strong>Email:</strong> {order.user?.email || "N/A"}</p>
        <p><strong>Box Name:</strong> {order.boxName || "N/A"}</p>
        <p><strong>Box Size:</strong> {order.boxSize || "N/A"}</p>
        <p><strong>Product Name:</strong> {order.productName || "N/A"}</p>
        <p><strong>Price:</strong> ₹{order.productPrice || 0}</p>
        <p><strong>Quantity:</strong> {order.quantity || "N/A"}</p>
        <p><strong>Total Cost:</strong> ₹{order.totalCost || 0}</p>
        <p><strong>Address:</strong> {order.address ? `${order.address.province}, ${order.address.city}, ${order.address.area}, ${order.address.landmark}` : "N/A"}</p>
        <p><strong>Status:</strong> {order.status || "Pending"}</p>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;