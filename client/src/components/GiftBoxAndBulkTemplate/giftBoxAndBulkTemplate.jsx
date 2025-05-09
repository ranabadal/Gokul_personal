// // GiftBoxAndBulkTemplate.jsx
// import React, { useState, useEffect } from "react";
// import styles from "./giftBoxAndBulkTemplate.module.css";

// const GiftBoxAndBulkTemplate = ({
//   id,
//   name,
//   price,
//   description,
//   minOrderQuantity,
//   image,
//   type, // "giftBox" or "handbag"
//   matchingHandbags, // For giftBox only; an array of matching handbag objects
//   onSelectionChange, // Callback: (id, type, data, isSelected, { quantity, matchingHandbags })
//   onUpdate,          // Callback: (id, type, { quantity, matchingHandbags })
//   data,              // the full product data (for storing in cart)
//   externalSelected,  // Boolean, computed from parent's cart state
//   externalQuantity,  // Number, computed from parent's cart state
//   externalMatchingHandbags // Array, computed from parent's cart state
// }) => {
//   const initialQty = Number(minOrderQuantity) || 1;

//   // Local state is initially set from parent's external state if available.
//   const [quantity, setQuantity] = useState(externalQuantity || initialQty);
//   const [isSelected, setIsSelected] = useState(externalSelected || false);
//   // Local matching handbag selections (object keyed by handbag.id or index).
//   const [handbagSelections, setHandbagSelections] = useState({});

//   // Synchronize local state when externalSelected or externalQuantity changes.
//   useEffect(() => {
//     setIsSelected(externalSelected || false);
//     setQuantity(externalQuantity || initialQty);
//     if (externalSelected && externalMatchingHandbags && externalMatchingHandbags.length > 0) {
//       const obj = {};
//       externalMatchingHandbags.forEach((mh, index) => {
//         const key = mh.id || index;
//         obj[key] = { selected: true, quantity: mh.quantity };
//       });
//       setHandbagSelections(obj);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [externalSelected, externalQuantity]);

//   // When local handbagSelections or quantity changes, update parent's cart via onUpdate.
//   useEffect(() => {
//     if (isSelected && type === "giftBox") {
//       onUpdate(id, type, { quantity, matchingHandbags: getSelectedHandbags() });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [handbagSelections, quantity, isSelected]);

//   // Convert local matching handbag selections into an array.
//   const getSelectedHandbags = () => {
//     if (!matchingHandbags) return [];
//     return matchingHandbags
//       .filter((handbag, index) => {
//         const key = handbag.id || index;
//         return handbagSelections[key]?.selected;
//       })
//       .map((handbag, index) => {
//         const key = handbag.id || index;
//         return { ...handbag, quantity: handbagSelections[key].quantity };
//       });
//   };

//   // Toggle overall product selection.
//   const handleToggleSelect = () => {
//     if (!isSelected) {
//       setQuantity(initialQty);
//       setIsSelected(true);
//       // The onUpdate will be triggered by useEffect after state updates.
//       onSelectionChange(id, type, data, true, {
//         quantity: initialQty,
//         matchingHandbags: getSelectedHandbags()
//       });
//     } else {
//       setIsSelected(false);
//       onSelectionChange(id, type, data, false, {});
//     }
//   };

//   const increaseQuantity = () => {
//     const newQty = quantity + 1;
//     setQuantity(newQty);
//     if (isSelected) {
//       onUpdate(id, type, { quantity: newQty, matchingHandbags: getSelectedHandbags() });
//     }
//   };

//   const decreaseQuantity = () => {
//     const newQty = Math.max(initialQty, quantity - 1);
//     setQuantity(newQty);
//     if (isSelected) {
//       onUpdate(id, type, { quantity: newQty, matchingHandbags: getSelectedHandbags() });
//     }
//   };

//   // Toggle selection for an individual matching handbag.
//   const handleHandbagSelection = (e, handbag, index) => {
//     const checked = e.target.checked;
//     const key = handbag.id || index;
//     setHandbagSelections((prev) => {
//       const newSelections = { ...prev };
//       if (checked) {
//         newSelections[key] = { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
//       } else {
//         delete newSelections[key];
//       }
//       return newSelections;
//     });
//   };

//   // Update the quantity for a matching handbag.
//   const updateHandbagQuantity = (handbag, index, action) => {
//     const key = handbag.id || index;
//     setHandbagSelections((prev) => {
//       const current = prev[key] || { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
//       let newQuantity = current.quantity;
//       if (action === "increase") {
//         newQuantity = current.quantity + 1;
//       } else if (action === "decrease") {
//         newQuantity = Math.max(Number(handbag.minOrderQuantity) || 1, current.quantity - 1);
//       }
//       return { ...prev, [key]: { selected: true, quantity: newQuantity } };
//     });
//   };

//   return (
//     <div className={styles.product_details}>
//       <div className={styles.product_image}>
//         <img src={image} alt={name} />
//       </div>
//       <div className={styles.product_info}>
//         <h2 className={styles.product_name}>{name}</h2>
//         {type === "giftBox" && <p className={styles.product_description}>{description}</p>}
//         <p className={styles.product_price}>Price: ₹{price}</p>
//         <p className={styles.product_min_order}>Minimum Order: {minOrderQuantity}</p>
//         <button className={styles.select_button} onClick={handleToggleSelect}>
//           {isSelected ? "Unselect" : "Select"}
//         </button>
//         {isSelected && (
//           <div className={styles.quantity_selector}>
//             <button className={styles.quantity_button} onClick={decreaseQuantity}>-</button>
//             <span className={styles.quantity_display}>{quantity}</span>
//             <button className={styles.quantity_button} onClick={increaseQuantity}>+</button>
//           </div>
//         )}
//         {isSelected && type === "giftBox" && matchingHandbags && matchingHandbags.length > 0 && (
//           <div className={styles.matching_handbags_section}>
//             <h3>Matching Handbags</h3>
//             <div className={styles.handbags_container}>
//               {matchingHandbags.map((handbag, index) => {
//                 const key = handbag.id || index;
//                 const isSelectedHandbag = Boolean(handbagSelections[key]?.selected);
//                 const handbagQty = handbagSelections[key]?.quantity || Number(handbag.minOrderQuantity) || 1;
//                 return (
//                   <div key={key} className={styles.handbag_item}>
//                     <div className={styles.handbag_info}>
//                       {handbag.image && (
//                         <img src={handbag.image} alt={handbag.name} className={styles.handbag_image} />
//                       )}
//                       <div className={styles.handbag_details}>
//                         <span>{handbag.name}</span>
//                         <span>Price: ₹{handbag.price}</span>
//                         <span>Min Order: {handbag.minOrderQuantity}</span>
//                       </div>
//                     </div>
//                     <div className={styles.handbag_actions}>
//                       <label className={styles.handbag_label}>
//                         <input
//                           type="checkbox"
//                           checked={isSelectedHandbag}
//                           onChange={(e) => handleHandbagSelection(e, handbag, index)}
//                         />{" "}
//                         Select
//                       </label>
//                       {isSelectedHandbag && (
//                         <div className={styles.handbag_quantity_selector}>
//                           <button className={styles.quantity_button} onClick={() => updateHandbagQuantity(handbag, index, "decrease")}>-</button>
//                           <span className={styles.quantity_display}>{handbagQty}</span>
//                           <button className={styles.quantity_button} onClick={() => updateHandbagQuantity(handbag, index, "increase")}>+</button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GiftBoxAndBulkTemplate;







import React, { useState, useEffect } from "react";
import styles from "./giftBoxAndBulkTemplate.module.css";

const GiftBoxAndBulkTemplate = ({
  id,
  name,
  price,
  description,
  minOrderQuantity,
  image,
  type, // "giftBox" or "handbag"
  matchingHandbags,
  onSelectionChange,
  onUpdate,
  data,
  externalSelected,
  externalQuantity,
  externalMatchingHandbags
}) => {
  const initialQty = Number(minOrderQuantity) || 1;

  // Local state for product selection and quantity
  const [quantity, setQuantity] = useState(externalQuantity || initialQty);
  const [isSelected, setIsSelected] = useState(externalSelected || false);
  const [handbagSelections, setHandbagSelections] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null); // Modal image state

  // Synchronizing external state from parent component
  useEffect(() => {
    setIsSelected(externalSelected || false);
    setQuantity(externalQuantity || initialQty);
    if (externalSelected && externalMatchingHandbags?.length > 0) {
      const obj = {};
      externalMatchingHandbags.forEach((mh, index) => {
        const key = mh.id || index;
        obj[key] = { selected: true, quantity: mh.quantity };
      });
      setHandbagSelections(obj);
    }
  }, [externalSelected, externalQuantity]);

  // Ensure updates reflect in parent cart state
  useEffect(() => {
    if (isSelected) {
      onUpdate(id, type, { quantity, matchingHandbags: getSelectedHandbags() });
    }
  }, [handbagSelections, quantity, isSelected]);

  const getSelectedHandbags = () => {
    return matchingHandbags?.filter((handbag, index) => {
      const key = handbag.id || index;
      return handbagSelections[key]?.selected;
    }).map((handbag, index) => {
      const key = handbag.id || index;
      return { ...handbag, quantity: handbagSelections[key].quantity };
    }) || [];
  };

  // Toggle selection state for the main product
  const handleToggleSelect = () => {
    const updatedSelection = !isSelected;
    setIsSelected(updatedSelection);

    if (updatedSelection) {
      onSelectionChange(id, type, data, true, {
        quantity: initialQty,
        matchingHandbags: getSelectedHandbags()
      });
    } else {
      onSelectionChange(id, type, data, false, {});
    }
  };

  // Increase or decrease the quantity
  const updateQuantity = (action) => {
    const newQty = action === "increase" ? quantity + 1 : Math.max(initialQty, quantity - 1);
    setQuantity(newQty);
    if (isSelected) {
      onUpdate(id, type, { quantity: newQty, matchingHandbags: getSelectedHandbags() });
    }
  };

  // Toggle selection for a matching handbag
  const handleHandbagSelection = (e, handbag, index) => {
    const checked = e.target.checked;
    const key = handbag.id || index;
    setHandbagSelections((prev) => {
      const newSelections = { ...prev };
      if (checked) {
        newSelections[key] = { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
      } else {
        delete newSelections[key];
      }
      return newSelections;
    });
  };

  // Update the quantity of selected matching handbags
  const updateHandbagQuantity = (handbag, index, action) => {
    const key = handbag.id || index;
    setHandbagSelections((prev) => {
      const current = prev[key] || { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
      let newQuantity = action === "increase" ? current.quantity + 1 : Math.max(Number(handbag.minOrderQuantity) || 1, current.quantity - 1);
      return { ...prev, [key]: { selected: true, quantity: newQuantity } };
    });
  };

  // Handle image zoom modal
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setZoomedImage(null);
  };

  return (
    <div className={styles.product_details}>
      {/* Main product image (click to zoom) */}
      <div className={styles.product_image} onClick={() => handleImageClick(image)}>
        <img src={image} alt={name} />
      </div>

      {/* Product Information */}
      <div className={styles.product_info}>
        <h2 className={styles.product_name}>{name}</h2>
        {type === "giftBox" && <p className={styles.product_description}>{description}</p>}
        <p className={styles.product_price}>Price: ₹{price}</p>
        <p className={styles.product_min_order}>Minimum Order: {minOrderQuantity}</p>

        {/* Select Button */}
        <button className={styles.select_button} onClick={handleToggleSelect}>
          {isSelected ? "Unselect" : "Select"}
        </button>

        {/* Quantity Selector */}
        {isSelected && (
          <div className={styles.quantity_selector}>
            <button className={styles.quantity_button} onClick={() => updateQuantity("decrease")}>−</button>
            <span className={styles.quantity_display}>{quantity}</span>
            <button className={styles.quantity_button} onClick={() => updateQuantity("increase")}>+</button>
          </div>
        )}

        {/* Matching Handbags Section */}
        {isSelected && type === "giftBox" && matchingHandbags?.length > 0 && (
          <div className={styles.matching_handbags_section}>
            <h3>Matching Handbags</h3>
            <div className={styles.handbags_container}>
              {matchingHandbags.map((handbag, index) => {
                const key = handbag.id || index;
                const isSelectedHandbag = handbagSelections[key]?.selected;
                const handbagQty = handbagSelections[key]?.quantity || Number(handbag.minOrderQuantity) || 1;
                return (
                  <div key={key} className={styles.handbag_item}>
                    <div className={styles.handbag_info}>
                      {handbag.image && (
                        <img 
                          src={handbag.image} 
                          alt={handbag.name} 
                          className={styles.handbag_image} 
                          onClick={() => handleImageClick(handbag.image)}
                        />
                      )}
                      <div className={styles.handbag_details}>
                        <span>{handbag.name}</span>
                        <span>Price: ₹{handbag.price}</span>
                        <span>Min Order: {handbag.minOrderQuantity}</span>
                      </div>
                    </div>
                    <div className={styles.handbag_actions}>
                      <label className={styles.handbag_label}>
                        <input type="checkbox" checked={isSelectedHandbag} onChange={(e) => handleHandbagSelection(e, handbag, index)} />
                        Select
                      </label>
                      {isSelectedHandbag && (
                        <div className={styles.handbag_quantity_selector}>
                          <button onClick={() => updateHandbagQuantity(handbag, index, "decrease")}>−</button>
                          <span>{handbagQty}</span>
                          <button onClick={() => updateHandbagQuantity(handbag, index, "increase")}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className={styles.imageModal} onClick={handleCloseModal}>
          <div className={styles.imageModalContent}>
            <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBoxAndBulkTemplate;