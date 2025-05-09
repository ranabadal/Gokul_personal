import React from "react";
import styles from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null; // Prevent rendering if order is undefined

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Order Details</h2>
        <div className={styles.modalBody}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User Name:</strong> {order.userName}</p>
          <p><strong>Email:</strong> {order.userEmail}</p>
          <p><strong>Mobile:</strong> {order.userMobile}</p>
          <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status || "Pending"}</p>

          <h3>Delivery Address</h3>
          {order.address ? (
            <p>{order.address.province}, {order.address.city}, {order.address.area}, {order.address.landmark}</p>
          ) : (
            <p>No address provided</p>
          )}

          <h3>Ordered Items</h3>
          {order.cartItems && order.cartItems.length > 0 ? (
            order.cartItems.map((item, idx) => (
              <div key={idx} className={styles.itemDetails}>
                <p><strong>{item.details.name}</strong> - ₹{item.details.price} x {item.details.quantity}</p>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}

          <h3>Matching Handbags</h3>
          {order.cartItems.some(item => item.matchingHandbags?.length > 0) ? (
            order.cartItems.map((item) =>
              item.matchingHandbags?.map((handbag, hIdx) => (
                <p key={hIdx}>{handbag.name} - ₹{handbag.price} x {handbag.quantity}</p>
              ))
            )
          ) : (
            <p>No matching handbags</p>
          )}

          <button onClick={onClose} className={styles.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;