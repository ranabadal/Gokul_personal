import React, { useState } from "react";
import styles from "./editQueryModal.module.css"; // Modal Styles

const EditOrderModal = ({ order, onSave, onCancel }) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  // Handle input changes
  const handleChange = (event, field) => {
    setUpdatedOrder({ ...updatedOrder, [field]: event.target.value });
  };

  // Handle nested updates for selected items
  const handleItemChange = (itemName, value) => {
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      selectedItems: { ...prevOrder.selectedItems, [itemName]: value },
    }));
  };

  // Handle nested updates for gift boxes
  const handleGiftBoxChange = (index, field, value) => {
    setUpdatedOrder((prevOrder) => {
      const updatedGiftBoxes = [...prevOrder.giftBoxes];
      updatedGiftBoxes[index] = { ...updatedGiftBoxes[index], [field]: value };
      return { ...prevOrder, giftBoxes: updatedGiftBoxes };
    });
  };

  // Handle nested updates for regular boxes
  const handleRegularBoxChange = (index, field, value) => {
    setUpdatedOrder((prevOrder) => {
      const updatedRegularBoxes = [...prevOrder.selectedRegularBoxes];
      updatedRegularBoxes[index] = { ...updatedRegularBoxes[index], [field]: value };
      return { ...prevOrder, selectedRegularBoxes: updatedRegularBoxes };
    });
  };

  // Save edited order
  const handleSave = () => {
    onSave(updatedOrder);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Bulk Order</h2>

        {/* User Details */}
        <label>User Name</label>
        <input
          type="text"
          value={updatedOrder.userName}
          onChange={(e) => handleChange(e, "userName")}
          className={styles.inputField}
        />

        <label>Email</label>
        <input
          type="email"
          value={updatedOrder.userEmail}
          onChange={(e) => handleChange(e, "userEmail")}
          className={styles.inputField}
        />

        <label>Mobile</label>
        <input
          type="text"
          value={updatedOrder.userNumber}
          onChange={(e) => handleChange(e, "userNumber")}
          className={styles.inputField}
        />

        {/* Selected Items */}
        <h3>Selected Items</h3>
        {Object.entries(updatedOrder.selectedItems).map(([itemName, qty], idx) => (
          <div key={idx} className={styles.itemRow}>
            <label>{itemName}</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => handleItemChange(itemName, Number(e.target.value))}
              className={styles.inputField}
            />
          </div>
        ))}

        {/* Gift Boxes */}
        <h3>Gift Boxes</h3>
        {updatedOrder.giftBoxes.map((box, idx) => (
          <div key={idx} className={styles.itemRow}>
            <label>Box Name</label>
            <input
              type="text"
              value={box.name}
              onChange={(e) => handleGiftBoxChange(idx, "name", e.target.value)}
              className={styles.inputField}
            />
            <label>Quantity</label>
            <input
              type="number"
              value={box.quantity}
              onChange={(e) => handleGiftBoxChange(idx, "quantity", Number(e.target.value))}
              className={styles.inputField}
            />
            <label>Price</label>
            <input
              type="number"
              value={box.price}
              onChange={(e) => handleGiftBoxChange(idx, "price", Number(e.target.value))}
              className={styles.inputField}
            />
          </div>
        ))}

        {/* Regular Boxes */}
        <h3>Regular Boxes</h3>
        {updatedOrder.selectedRegularBoxes.map((box, idx) => (
          <div key={idx} className={styles.itemRow}>
            <label>Box Label</label>
            <input
              type="text"
              value={box.label}
              onChange={(e) => handleRegularBoxChange(idx, "label", e.target.value)}
              className={styles.inputField}
            />
            <label>Quantity</label>
            <input
              type="number"
              value={box.quantity}
              onChange={(e) => handleRegularBoxChange(idx, "quantity", Number(e.target.value))}
              className={styles.inputField}
            />
          </div>
        ))}

        {/* Order Status */}
        <label>Status</label>
        <select
          value={updatedOrder.status}
          onChange={(e) => handleChange(e, "status")}
          className={styles.selectField}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Canceled">Canceled</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Total Cost */}
        <label>Total Cost</label>
        <input
          type="number"
          value={updatedOrder.totalCost}
          onChange={(e) => handleChange(e, "totalCost")}
          className={styles.inputField}
        />

        {/* Modal Actions */}
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;