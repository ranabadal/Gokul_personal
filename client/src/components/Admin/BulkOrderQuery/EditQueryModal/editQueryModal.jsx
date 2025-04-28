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


// import React, { useState } from "react";
// import styles from "./editQueryModal.module.css";

// const EditQueryModal = ({ query, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(query);

//   // Handle changes within the orders array
//   const handleOrderChange = (index, field, value) => {
//     const updatedOrders = formData.orders.map((order, i) =>
//       i === index ? { ...order, [field]: value } : order
//     );
//     setFormData({ ...formData, orders: updatedOrders });
//   };

//   // Handle sweet edits inside each order
//   const handleSweetChange = (orderIndex, sweetIndex, field, value) => {
//     const updatedSweets = formData.orders[orderIndex].sweets.map((sweet, i) =>
//       i === sweetIndex ? { ...sweet, [field]: value } : sweet
//     );
//     const updatedOrders = formData.orders.map((order, i) =>
//       i === orderIndex ? { ...order, sweets: updatedSweets } : order
//     );
//     setFormData({ ...formData, orders: updatedOrders });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <form className={styles.modalContent} onSubmit={handleSubmit}>
//         <h3>Edit Bulk Order Query</h3>

//         {formData.orders.map((order, orderIndex) => (
//           <div key={orderIndex} className={styles.orderSection}>
//             <h4>Box {orderIndex + 1}</h4>

//             <label>Box Name:</label>
//             <input
//               type="text"
//               name="boxName"
//               value={order.boxName}
//               onChange={(e) => handleOrderChange(orderIndex, "boxName", e.target.value)}
//             />

//             <label>Box Size:</label>
//             <input
//               type="text"
//               name="boxSize"
//               value={order.boxSize}
//               onChange={(e) => handleOrderChange(orderIndex, "boxSize", e.target.value)}
//             />

//             <label>Quantity:</label>
//             <input
//               type="number"
//               name="quantity"
//               value={order.quantity}
//               onChange={(e) => handleOrderChange(orderIndex, "quantity", e.target.value)}
//             />

//             <label>Total Cost:</label>
//             <input
//               type="number"
//               name="totalCost"
//               value={order.totalCost}
//               onChange={(e) => handleOrderChange(orderIndex, "totalCost", e.target.value)}
//             />

//             <h4>Sweets</h4>
//             {order.sweets.map((sweet, sweetIndex) => (
//               <div key={sweetIndex} className={styles.sweetSection}>
//                 <label>Product Name:</label>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={sweet.productName}
//                   onChange={(e) =>
//                     handleSweetChange(orderIndex, sweetIndex, "productName", e.target.value)
//                   }
//                 />

//                 <label>Price:</label>
//                 <input
//                   type="number"
//                   name="productPrice"
//                   value={sweet.productPrice}
//                   onChange={(e) =>
//                     handleSweetChange(orderIndex, sweetIndex, "productPrice", e.target.value)
//                   }
//                 />
//               </div>
//             ))}
//           </div>
//         ))}

//         <label>Status:</label>
//         <select name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
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

const EditQueryModal = ({ query, onSave, onCancel }) => {
  const [formData, setFormData] = useState(query);

  // Handle changes within the orders array
  const handleOrderChange = (index, field, value) => {
    const updatedOrders = formData.orders.map((order, i) =>
      i === index ? { ...order, [field]: value } : order
    );
    setFormData({ ...formData, orders: updatedOrders });
  };

  // Handle sweet edits inside each order
  const handleSweetChange = (orderIndex, sweetIndex, field, value) => {
    const updatedSweets = formData.orders[orderIndex].sweets.map((sweet, i) =>
      i === sweetIndex ? { ...sweet, [field]: value } : sweet
    );
    const updatedOrders = formData.orders.map((order, i) =>
      i === orderIndex ? { ...order, sweets: updatedSweets } : order
    );
    setFormData({ ...formData, orders: updatedOrders });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h3>Edit Bulk Order Query</h3>

        {formData.orders.map((order, orderIndex) => (
          <div key={orderIndex} className={styles.orderSection}>
            <h4>Box {orderIndex + 1}</h4>

            <label>Box Name:</label>
            <input
              type="text"
              name="boxName"
              value={order.boxName}
              onChange={(e) => handleOrderChange(orderIndex, "boxName", e.target.value)}
            />

            <label>Box Size:</label>
            <input
              type="text"
              name="boxSize"
              value={order.boxSize}
              onChange={(e) => handleOrderChange(orderIndex, "boxSize", e.target.value)}
            />

            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={order.quantity}
              onChange={(e) => handleOrderChange(orderIndex, "quantity", e.target.value)}
            />

            <label>Total Cost:</label>
            <input
              type="number"
              name="totalCost"
              value={order.totalCost}
              onChange={(e) => handleOrderChange(orderIndex, "totalCost", e.target.value)}
            />

            <h4>Sweets</h4>
            {order.sweets.map((sweet, sweetIndex) => (
              <div key={sweetIndex} className={styles.sweetSection}>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={sweet.productName}
                  onChange={(e) =>
                    handleSweetChange(orderIndex, sweetIndex, "productName", e.target.value)
                  }
                />

                <label>Price:</label>
                <input
                  type="number"
                  name="productPrice"
                  value={sweet.productPrice}
                  onChange={(e) =>
                    handleSweetChange(orderIndex, sweetIndex, "productPrice", e.target.value)
                  }
                />
              </div>
            ))}

            {/* ✅ New Custom Message Input */}
            <label>Custom Message:</label>
            <textarea
              name="customMessage"
              rows="3"
              value={order.customMessage || ""}
              onChange={(e) => handleOrderChange(orderIndex, "customMessage", e.target.value)}
              placeholder="Enter a special message for your loved ones..."
              className={styles.customMessageInput}
            />
          </div>
        ))}

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
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