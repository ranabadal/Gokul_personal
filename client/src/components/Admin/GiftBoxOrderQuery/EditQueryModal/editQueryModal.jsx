import React, { useState } from "react";
import styles from "./editQueryModal.module.css";

const EditQueryModal = ({ query, onSave, onCancel }) => {
  const [formData, setFormData] = useState(query);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated query to parent
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h3>Edit Query</h3>
        <label>Box Name:</label>
        <input type="text" name="boxName" value={formData.boxName} onChange={handleChange} />

        <label>Box Size:</label>
        <input type="text" name="boxSize" value={formData.boxSize} onChange={handleChange} />

        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

        <label>Price:</label>
        <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit" className={styles.first}>Save</button>
        <button type="button" className={styles.second} onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditQueryModal;