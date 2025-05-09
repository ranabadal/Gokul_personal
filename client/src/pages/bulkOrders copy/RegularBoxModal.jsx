// import React, { useState } from "react";
// import styles from "./bulkOrders.module.css";

// const RegularBoxModal = ({ onClose, onSelect }) => {
//   // Define the 7 available size options.
//   const sizeOptions = [
//     { id: "2lb", label: "2 Laddoo Box", minOrder: 1 },
//     { id: "4lb", label: "4 Laddoo Box", minOrder: 1 },
//     { id: "6lb", label: "6 Laddoo Box", minOrder: 1 },
//     { id: "500gm", label: "500gm", minOrder: 1 },
//     { id: "1kg", label: "1kg", minOrder: 1 },
//     { id: "2kg", label: "2kg", minOrder: 1 },
//     { id: "5kg", label: "5kg", minOrder: 1 }
//   ];

//   // Object mapping option id to its selected quantity.
//   // When a size is unchecked, it is removed from the state.
//   const [selectedSizes, setSelectedSizes] = useState(() => {
//     return JSON.parse(localStorage.getItem("RegularBoxSelection")) || {}; // ✅ Load stored selection
//   });

//   const toggleOption = (option) => {
//     setSelectedSizes((prev) => {
//       const updatedSizes = prev[option.id] !== undefined
//         ? (delete prev[option.id], { ...prev }) // ✅ Remove if unchecked
//         : { ...prev, [option.id]: option.minOrder }; // ✅ Add if checked
  
//       localStorage.setItem("RegularBoxSelection", JSON.stringify(updatedSizes)); // ✅ Update storage
//       return updatedSizes;
//     });
//   };
  
//   const updateQuantity = (option, operation) => {
//     setSelectedSizes((prev) => {
//       const newQty = operation === "increase"
//         ? prev[option.id] + 1
//         : Math.max(prev[option.id] - 1, option.minOrder);
  
//       const updatedSizes = { ...prev, [option.id]: newQty };
  
//       localStorage.setItem("RegularBoxSelection", JSON.stringify(updatedSizes)); // ✅ Update storage
//       return updatedSizes;
//     });
//   };

//   // Build the final selection data structure as an array of objects.
//   const handleFinalSelect = () => {
//     // ✅ Retrieve existing selection from Local Storage
//     const existingSelection = JSON.parse(localStorage.getItem("RegularBoxSelection")) || {};
  
//     // ✅ Merge old selections with new selections, ensuring labels are included
//     const updatedSelection = { ...existingSelection };
  
//     sizeOptions.forEach((option) => {
//       if (selectedSizes[option.id] !== undefined) {
//         updatedSelection[option.id] = {
//           label: option.label, // ✅ Store the label
//           quantity: selectedSizes[option.id],
//         };
//       }
//     });
  
//     // ✅ Save updated selection in Local Storage
//     localStorage.setItem("RegularBoxSelection", JSON.stringify(updatedSelection));
  
//     // ✅ Update BulkOrder state immediately
//     onSelect(Object.entries(updatedSelection).map(([id, data]) => ({ id, label: data.label, quantity: data.quantity })));
  
//     onClose();
//   };
//   // Render a summary of selected sizes.
//   const renderFinalSelection = () => {
//     return sizeOptions
//       .filter((option) => selectedSizes[option.id] !== undefined)
//       .map((option) => (
//         <p key={option.id}>
//           <strong>{option.label}:</strong> Quantity: {selectedSizes[option.id]}
//         </p>
//       ));
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeButton} onClick={onClose}>
//           ×
//         </button>
//         <h3>Select Regular Box Options</h3>
//         {sizeOptions.map((option) => {
//           const isSelected = selectedSizes[option.id] !== undefined;
//           return (
//             <div key={option.id} className={styles.sizeOption}>
//               <label>
//                 <input
//                   type="checkbox"
//                   className={styles.sizeCheckbox}
//                   checked={isSelected || false}
//                   onChange={() => toggleOption(option)}
//                 />
//                 <span>{option.label}</span>
//               </label>
//               {isSelected && (
//                 <div className={styles.quantitySelector}>
//                   <button onClick={() => updateQuantity(option, "decrease")}>-</button>
//                   <span>{selectedSizes[option.id]}</span>
//                   <button onClick={() => updateQuantity(option, "increase")}>+</button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//         <div className={styles.finalSelection}>
//           <h4>Final Selection</h4>
//           {renderFinalSelection()}
//         </div>
//         <button className={styles.selectButton} onClick={handleFinalSelect}>
//           Select Regular Boxes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegularBoxModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./bulkOrders.module.css";

const RegularBoxModal = ({ onClose, onSelect }) => {
  // State that will hold the Regular Box options fetched from the backend.
  const [sizeOptions, setSizeOptions] = useState([]);

  // Initialize selectedSizes from local storage, cleaning any old format.
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("RegularBoxSelection"));
    if (stored && typeof stored === "object") {
      const cleaned = {};
      Object.keys(stored).forEach((key) => {
        const val = stored[key];
        // If the stored value is an object with a quantity, extract it.
        if (val && typeof val === "object" && "quantity" in val) {
          cleaned[key] = val.quantity;
        } else {
          cleaned[key] = val;
        }
      });
      return cleaned;
    }
    return {};
  });

  // Fetch available regular boxes from the backend on mount.
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/regularBoxes");
        // Map each box to the expected structure.
        const options = res.data.map((box) => ({
          id: box._id, // Using the unique _id from MongoDB.
          label: `${box.boxName} (${box.size})`, // e.g. "2 Laddoo Box (2lb)".
          minOrder: box.minOrder,
        }));
        setSizeOptions(options);
      } catch (error) {
        console.error(
          "Error fetching regular boxes:",
          error.response?.data || error.message || error
        );
      }
    };

    fetchOptions();
  }, []);

  // Toggle option selection (add or remove from state).
  const toggleOption = (option) => {
    setSelectedSizes((prev) => {
      let updated;
      if (prev[option.id] !== undefined) {
        // Remove if unchecked.
        updated = { ...prev };
        delete updated[option.id];
      } else {
        // Add if checked with default minOrder value.
        updated = { ...prev, [option.id]: option.minOrder };
      }
      localStorage.setItem("RegularBoxSelection", JSON.stringify(updated));
      return updated;
    });
  };

  // Update the quantity for a selected option.
  const updateQuantity = (option, operation) => {
    setSelectedSizes((prev) => {
      const newQty =
        operation === "increase"
          ? prev[option.id] + 1
          : Math.max(prev[option.id] - 1, option.minOrder);
      const updated = { ...prev, [option.id]: newQty };
      localStorage.setItem("RegularBoxSelection", JSON.stringify(updated));
      return updated;
    });
  };

  // Build the final selection data structure as an array of objects and pass it upward.
  const handleFinalSelect = () => {
    // Instead of re-reading localStorage, we work with the cleaned state from selectedSizes.
    const updatedSelection = {};
    sizeOptions.forEach((option) => {
      if (selectedSizes[option.id] !== undefined) {
        updatedSelection[option.id] = {
          label: option.label,
          quantity: selectedSizes[option.id],
        };
      }
    });

    // Save the updated (final) selection structure in local storage.
    localStorage.setItem("RegularBoxSelection", JSON.stringify(updatedSelection));

    // Pass an array of objects upward.
    onSelect(
      Object.entries(updatedSelection).map(([id, data]) => ({
        id,
        label: data.label,
        quantity: data.quantity,
      }))
    );

    onClose();
  };

  // Render a summary of selected sizes.
  const renderFinalSelection = () => {
    return sizeOptions
      .filter((option) => selectedSizes[option.id] !== undefined)
      .map((option) => (
        <p key={option.id}>
          <strong>{option.label}</strong>: Quantity: {selectedSizes[option.id]}
        </p>
      ));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h3>Select Regular Box Options</h3>
        {sizeOptions.map((option) => {
          const isSelected = selectedSizes[option.id] !== undefined;
          return (
            <div key={option.id} className={styles.sizeOption}>
              <label>
                <input
                  type="checkbox"
                  className={styles.sizeCheckbox}
                  checked={isSelected || false}
                  onChange={() => toggleOption(option)}
                />
                <span>{option.label}</span>
              </label>
              {isSelected && (
                <div className={styles.quantitySelector}>
                  <button onClick={() => updateQuantity(option, "decrease")}>-</button>
                  <span>{selectedSizes[option.id]}</span>
                  <button onClick={() => updateQuantity(option, "increase")}>+</button>
                </div>
              )}
            </div>
          );
        })}
        <div className={styles.finalSelection}>
          <h4>Final Selection</h4>
          {renderFinalSelection()}
        </div>
        <button className={styles.selectButton} onClick={handleFinalSelect}>
          Select Regular Boxes
        </button>
      </div>
    </div>
  );
};

export default RegularBoxModal;