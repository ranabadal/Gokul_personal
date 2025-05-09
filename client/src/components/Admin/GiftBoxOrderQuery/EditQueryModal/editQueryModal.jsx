// import React, { useState } from "react";
// import styles from "./editQueryModal.module.css";

// const EditQueryModal = ({ query, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(query);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData); // Pass updated query to parent
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <form className={styles.modalContent} onSubmit={handleSubmit}>
//         <h3>Edit Query</h3>
//         <label>Box Name:</label>
//         <input type="text" name="boxName" value={formData.boxName} onChange={handleChange} />

//         <label>Box Size:</label>
//         <input type="text" name="boxSize" value={formData.boxSize} onChange={handleChange} />

//         <label>Product Name:</label>
//         <input
//           type="text"
//           name="productName"
//           value={formData.productName}
//           onChange={handleChange}
//         />

//         <label>Quantity:</label>
//         <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

//         <label>Price:</label>
//         <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} />

//         <label>Status:</label>
//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </select>

//         <button type="submit" className={styles.first}>Save</button>
//         <button type="button" className={styles.second} onClick={onCancel}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default EditQueryModal;
import React, { useState } from "react";
import styles from "./editQueryModal.module.css";

const EditOrderModal = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState(order);

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.cartItems.map((item, i) =>
      i === index ? { ...item.details, [field]: value } : item
    );
    setFormData({ ...formData, cartItems: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h3>Edit Order</h3>

        {formData.cartItems.map((item, index) => (
          <div key={index} className={styles.itemSection}>
            <label>Name:</label>
            <input type="text" value={item.details.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} />

            <label>Price:</label>
            <input type="number" value={item.details.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} />

            <label>Quantity:</label>
            <input type="number" value={item.details.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} />
          </div>
        ))}

        <label>Status:</label>
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className={styles.saveBtn}>Save</button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditOrderModal;