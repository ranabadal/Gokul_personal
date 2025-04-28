import React from "react";
import styles from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Order Details</h2>
        <div className={styles.modalBody}>
          {order.products.map((prod, prodIndex) => (
            <div key={prodIndex} className={styles.productDetails}>
              <h3>Product {prodIndex + 1}</h3>
              <p><strong>Product Name:</strong> {prod.product?.name || "N/A"}</p>
              <p><strong>Quantity:</strong> {prod.quantity || "N/A"}</p>
              <p><strong>Price:</strong> ₹{prod.product?.price ? prod.product.price * prod.quantity : "N/A"}</p>
            </div>
          ))}
          <p><strong>Total Price:</strong> ₹{order.totalPrice || "N/A"}</p>
          <p><strong>Status:</strong> {order.status || "Pending"}</p>
          <button onClick={onClose} className={styles.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;