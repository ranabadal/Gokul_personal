// import React, { useState } from "react";
// import styles from "./editQueryForm.module.css";

// const EditQueryForm = ({ query, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(query); // Initialize form data with the query

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData); // Pass updated query to the parent component
//   };

//   return (
//     <form className={styles.editForm} onSubmit={handleSubmit}>
//       <h3>Edit Query</h3>
//       <label>Occasion:</label>
//       <input
//         type="text"
//         name="occasion"
//         value={formData.occasion}
//         onChange={handleChange}
//       />
//       <label>Guest Count:</label>
//       <input
//         type="number"
//         name="guestCount"
//         value={formData.guestCount}
//         onChange={handleChange}
//       />
//       <label>Selected Menu:</label>
//       <input
//         type="text"
//         name="selectedCart"
//         value={formData.selectedCart}
//         onChange={handleChange}
//       />
//       <label>Comments:</label>
//       <textarea
//         name="comments"
//         value={formData.comments}
//         onChange={handleChange}
//       />
//       <button type="submit">Save</button>
//       <button type="button" onClick={onCancel}>Cancel</button>
//     </form>
//   );
// };

// export default EditQueryForm;



import React, { useState } from "react";
import styles from "./editQueryForm.module.css";

const EditQueryForm = ({ query, onSave, onCancel }) => {
  const [formData, setFormData] = useState(query); // Initialize form data with the query

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMenuPreferencesChange = (key, value) => {
    setFormData({
      ...formData,
      menuPreferences: {
        ...formData.menuPreferences,
        [key]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated query to the parent component
  };

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <h3>Edit Query</h3>
      <label>Occasion:</label>
      <input
        type="text"
        name="occasion"
        value={formData.occasion}
        onChange={handleChange}
      />
      <label>Guest Count:</label>
      <input
        type="number"
        name="guestCount"
        value={formData.guestCount}
        onChange={handleChange}
      />
      <label>Selected Menu:</label>
      <input
        type="text"
        name="selectedCart"
        value={formData.selectedCart}
        onChange={handleChange}
      />
      <label>Comments:</label>
      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
      />

      <label>Menu Preferences:</label>
      {formData.menuPreferences &&
        Object.entries(formData.menuPreferences).map(([key, value]) => (
          <div key={key} className={styles.menuPreferenceItem}>
            <label>{key}:</label>
            <input
              value={Array.isArray(value) ? value.join(", ") : value}
              onChange={(e) =>
                handleMenuPreferencesChange(
                  key,
                  Array.isArray(value)
                    ? e.target.value.split(",").map((item) => item.trim())
                    : e.target.value
                )
              }
            />
          </div>
        ))}
      <button className={styles.first} type="submit">Save</button>
      <button className={styles.sec} type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditQueryForm;