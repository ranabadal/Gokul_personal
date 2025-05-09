// import React from "react";
// import styles from "./orderDetailsModal.module.css";

// const OrderDetailsModal = ({ order, onClose }) => {
//   return (
//     <div className={styles.modalOverlay}>
// <div className={styles.modalContent}>
// <h2 className={styles.modalHeading}>Order Details</h2>

// <div className={styles.modalBody}>
//         <p><strong>Box Name:</strong> {order.boxName || "N/A"}</p>
//         <p><strong>Box Size:</strong> {order.boxSize || "N/A"}</p>
//         <p><strong>Product Name:</strong> {order.productName || "N/A"}</p>
//         <p><strong>Price:</strong> ₹{order.productPrice || 0}</p>
//         <p><strong>Quantity:</strong> {order.quantity || "N/A"}</p>
//         <p><strong>Total Cost:</strong> ₹{order.totalCost || 0}</p>
//         <p><strong>Address:</strong> {order.address ? `${order.address.province}, ${order.address.city}, ${order.address.area}, ${order.address.landmark}` : "N/A"}</p>
//         <p><strong>Status:</strong> {order.status || "Pending"}</p>
//         <button onClick={onClose} className={styles.closeBtn}>Close</button>
//       </div>
// </div>
//     </div>
//   );
// };

// export default OrderDetailsModal;


import React from "react";
import styles from "./orderDetailsModal.module.css";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Bulk Order Details</h2>
        <div className={styles.modalBody}>
          {/* Basic Info */}
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User ID:</strong> {order.user}</p>
          <p><strong>Name:</strong> {order.userName}</p>
          <p><strong>Email:</strong> {order.userEmail}</p>
          <p><strong>Mobile:</strong> {order.userNumber}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          {/* Address */}
          <h3>Delivery Address</h3>
          {order.address ? (
            <>
              <p>{order.address.province}, {order.address.city}, {order.address.area}</p>
              <p><strong>Landmark:</strong> {order.address.landmark || "N/A"}</p>
              <p><strong>Comments:</strong> {order.address.comments || "None"}</p>
            </>
          ) : <p>No address provided</p>}

          {/* Items */}
          <h3>Selected Items</h3>
          {order.selectedItems && Object.keys(order.selectedItems).length > 0 ? (
            Object.entries(order.selectedItems).map(([item, qty], idx) => (
              <p key={idx}>{item} - {qty} kg</p>
            ))
          ) : (
            <p>No selected items</p>
          )}

          {/* Regular Boxes */}
          <h3>Regular Boxes</h3>
          {order.selectedRegularBoxes?.length > 0 ? (
            order.selectedRegularBoxes.map((box, idx) => (
              <p key={idx}>{box.label} - Qty: {box.quantity}</p>
            ))
          ) : (
            <p>No regular boxes</p>
          )}

          {/* Gift Boxes and Matching Handbags */}
          <h3>Gift Boxes</h3>
          {order.giftBoxes?.length > 0 ? (
            order.giftBoxes.map((box, idx) => (
              <div key={idx} className={styles.itemDetails}>
                <p><strong>{box.name}</strong> - Qty: {box.quantity}, ₹{box.price * box.quantity}</p>
                
                {/* Matching Handbags for this gift box */}
                {box.matchingHandbags?.length > 0 ? (
                  <>
                    <h4>Matching Handbags:</h4>
                    {box.matchingHandbags.map((bag, bIdx) => (
                      <p key={bIdx}>{bag.name} - ₹{bag.price} x {bag.quantity}</p>
                    ))}
                  </>
                ) : <p>No matching handbags</p>}
              </div>
            ))
          ) : (
            <p>No gift boxes</p>
          )}

          <button onClick={onClose} className={styles.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
