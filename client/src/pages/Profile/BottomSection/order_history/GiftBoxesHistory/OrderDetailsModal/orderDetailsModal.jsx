import React from "react";
import styles from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Order Details</h2>
        <div className={styles.modalBody}>
          {order.orders.map((box, boxIndex) => (
            <div key={boxIndex} className={styles.boxDetails}>
              <h3>Box {boxIndex + 1}</h3>
              <p><strong>Box Name:</strong> {box.boxName || "N/A"}</p>
              <p><strong>Box Size:</strong> {box.boxSize || "N/A"}</p>
              
              <h4>Sweets:</h4>
              {box.sweets.map((sweet, sweetIndex) => (
                <p key={sweetIndex}>
                  {sweet.productName} - ₹{sweet.productPrice}
                </p>
              ))}

              <p><strong>Quantity:</strong> {box.quantity || "N/A"}</p>
              <p><strong>Total Cost:</strong> ₹{box.totalCost || 0}</p>
              <p><strong>Address:</strong> {box.address ? `${box.address.province}, ${box.address.city}, ${box.address.area}, ${box.address.landmark}` : "N/A"}</p>

              {/* ✅ Display Custom Message if available */}
              {box.customMessage && (
                <p className={styles.customMessage}>
                  <strong>Personalized Message:</strong> {box.customMessage}
                </p>
              )}
            </div>
          ))}
          <p><strong>Status:</strong> {order.status || "Pending"}</p>
          <button onClick={onClose} className={styles.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;