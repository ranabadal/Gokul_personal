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
//   matchingHandbags,
//   onSelectionChange,
//   onUpdate,
//   data,
//   externalSelected,
//   externalQuantity,
//   externalMatchingHandbags
// }) => {
//   const initialQty = Number(minOrderQuantity) || 1;

//   // Local state for product selection and quantity
//   const [quantity, setQuantity] = useState(externalQuantity || initialQty);
//   const [isSelected, setIsSelected] = useState(externalSelected || false);
//   const [handbagSelections, setHandbagSelections] = useState({});
//   const [zoomedImage, setZoomedImage] = useState(null); // Modal image state

//   // Synchronizing external state from parent component
//   useEffect(() => {
//     setIsSelected(externalSelected || false);
//     setQuantity(externalQuantity || initialQty);
//     if (externalSelected && externalMatchingHandbags?.length > 0) {
//       const obj = {};
//       externalMatchingHandbags.forEach((mh, index) => {
//         const key = mh.id || index;
//         obj[key] = { selected: true, quantity: mh.quantity };
//       });
//       setHandbagSelections(obj);
//     }
//   }, [externalSelected, externalQuantity]);

//   // Ensure updates reflect in parent cart state
//   useEffect(() => {
//     if (isSelected) {
//       onUpdate(id, type, { quantity, matchingHandbags: getSelectedHandbags() });
//     }
//   }, [handbagSelections, quantity, isSelected]);

//   const getSelectedHandbags = () => {
//     return matchingHandbags?.filter((handbag, index) => {
//       const key = handbag.id || index;
//       return handbagSelections[key]?.selected;
//     }).map((handbag, index) => {
//       const key = handbag.id || index;
//       return { ...handbag, quantity: handbagSelections[key].quantity };
//     }) || [];
//   };

//   // Toggle selection state for the main product
//   const handleToggleSelect = () => {
//     const updatedSelection = !isSelected;
//     setIsSelected(updatedSelection);

//     if (updatedSelection) {
//       onSelectionChange(id, type, data, true, {
//         quantity: initialQty,
//         matchingHandbags: getSelectedHandbags()
//       });
//     } else {
//       onSelectionChange(id, type, data, false, {});
//     }
//   };

//   // Increase or decrease the quantity
//   const updateQuantity = (action) => {
//     const newQty = action === "increase" ? quantity + 1 : Math.max(initialQty, quantity - 1);
//     setQuantity(newQty);
//     if (isSelected) {
//       onUpdate(id, type, { quantity: newQty, matchingHandbags: getSelectedHandbags() });
//     }
//   };

//   // Toggle selection for a matching handbag
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

//   // Update the quantity of selected matching handbags
//   const updateHandbagQuantity = (handbag, index, action) => {
//     const key = handbag.id || index;
//     setHandbagSelections((prev) => {
//       const current = prev[key] || { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
//       let newQuantity = action === "increase" ? current.quantity + 1 : Math.max(Number(handbag.minOrderQuantity) || 1, current.quantity - 1);
//       return { ...prev, [key]: { selected: true, quantity: newQuantity } };
//     });
//   };

//   // Handle image zoom modal
//   const handleImageClick = (imageSrc) => {
//     setZoomedImage(imageSrc);
//   };

//   const handleCloseModal = () => {
//     setZoomedImage(null);
//   };

//   return (
//     <div className={styles.product_details}>
//       {/* Main product image (click to zoom) */}
//       <div className={styles.product_image} onClick={() => handleImageClick(image)}>
//         <img src={image} alt={name} />
//       </div>

//       {/* Product Information */}
//       <div className={styles.product_info}>
//         <h2 className={styles.product_name}>{name}</h2>
//         {type === "giftBox" && <p className={styles.product_description}>{description}</p>}
//         <p className={styles.product_price}>Price: ₹{price}</p>
//         <p className={styles.product_min_order}>Minimum Order: {minOrderQuantity}</p>

//         {/* Select Button */}
//         <button className={styles.select_button} onClick={handleToggleSelect}>
//           {isSelected ? "Unselect" : "Select"}
//         </button>

//         {/* Quantity Selector */}
//         {isSelected && (
//           <div className={styles.quantity_selector}>
//             <button className={styles.quantity_button} onClick={() => updateQuantity("decrease")}>−</button>
//             <span className={styles.quantity_display}>{quantity}</span>
//             <button className={styles.quantity_button} onClick={() => updateQuantity("increase")}>+</button>
//           </div>
//         )}

//         {/* Matching Handbags Section */}
//         {isSelected && type === "giftBox" && matchingHandbags?.length > 0 && (
//           <div className={styles.matching_handbags_section}>
//             <h3>Matching Handbags</h3>
//             <div className={styles.handbags_container}>
//               {matchingHandbags.map((handbag, index) => {
//                 const key = handbag.id || index;
//                 const isSelectedHandbag = handbagSelections[key]?.selected;
//                 const handbagQty = handbagSelections[key]?.quantity || Number(handbag.minOrderQuantity) || 1;
//                 return (
//                   <div key={key} className={styles.handbag_item}>
//                     <div className={styles.handbag_info}>
//                       {handbag.image && (
//                         <img 
//                           src={handbag.image} 
//                           alt={handbag.name} 
//                           className={styles.handbag_image} 
//                           onClick={() => handleImageClick(handbag.image)}
//                         />
//                       )}
//                       <div className={styles.handbag_details}>
//                         <span>{handbag.name}</span>
//                         <span>Price: ₹{handbag.price}</span>
//                         <span>Min Order: {handbag.minOrderQuantity}</span>
//                       </div>
//                     </div>
//                     <div className={styles.handbag_actions}>
//                       <label className={styles.handbag_label}>
//                         <input type="checkbox" checked={isSelectedHandbag} onChange={(e) => handleHandbagSelection(e, handbag, index)} />
//                         Select
//                       </label>
//                       {isSelectedHandbag && (
//                         <div className={styles.handbag_quantity_selector}>
//                           <button onClick={() => updateHandbagQuantity(handbag, index, "decrease")}>−</button>
//                           <span>{handbagQty}</span>
//                           <button onClick={() => updateHandbagQuantity(handbag, index, "increase")}>+</button>
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

//       {/* Zoomed Image Modal */}
//       {zoomedImage && (
//         <div className={styles.imageModal} onClick={handleCloseModal}>
//           <div className={styles.imageModalContent}>
//             <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
//             <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiftBoxAndBulkTemplate;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../Const/Const";
// import styles from "./giftBoxAndBulkTemplate.module.css";

// const GiftBoxAndBulkTemplate = ({
//   id,
//   name,
//   price,
//   description,
//   minOrderQuantity,
//   image,
//   type, // "giftBox" or "handbag"
//   matchingHandbags,
//   onSelectionChange,
//   onUpdate,
//   data, // data object from backend; admin-defined fields are here
//   externalSelected,
//   externalQuantity,
//   externalMatchingHandbags,
// }) => {
//   const initialQty = Number(minOrderQuantity) || 1;

//   // Local state for main product selection and quantity
//   const [quantity, setQuantity] = useState(externalQuantity || initialQty);
//   const [isSelected, setIsSelected] = useState(externalSelected || false);
//   const [handbagSelections, setHandbagSelections] = useState({});
//   const [zoomedImage, setZoomedImage] = useState(null);

//   // Sweets-related state
//   // Get admin-defined sweets quantity from data; default to 0 if not provided.
//   const adminSweetsQty = data?.sweetsQuantity || 0;
//   const [giftBoxSweets, setGiftBoxSweets] = useState({
//     sweetsQuantity: adminSweetsQty,
//     preferredSweets: [], // Array of sweet IDs selected by the user
//   });
//   // For displaying the complete sweet objects
//   const [selectedSweetsDisplay, setSelectedSweetsDisplay] = useState([]);
//   // Sweets modal states
//   const [sweetsModalOpen, setSweetsModalOpen] = useState(false);
//   const [loadingSweets, setLoadingSweets] = useState(false);
//   const [availableSweets, setAvailableSweets] = useState([]);

//   // Update giftBoxSweets.sweetsQuantity if admin data changes.
//   useEffect(() => {
//     setGiftBoxSweets((prev) => ({
//       ...prev,
//       sweetsQuantity: adminSweetsQty,
//     }));
//   }, [adminSweetsQty]);

//   // Synchronizing external state from parent
//   useEffect(() => {
//     setIsSelected(externalSelected || false);
//     setQuantity(externalQuantity || initialQty);
//     if (externalSelected && externalMatchingHandbags?.length > 0) {
//       const obj = {};
//       externalMatchingHandbags.forEach((mh, index) => {
//         const key = mh.id || index;
//         obj[key] = { selected: true, quantity: mh.quantity };
//       });
//       setHandbagSelections(obj);
//     }
//   }, [externalSelected, externalQuantity]);

//   // Send updates (including sweets selections) to the parent.
//   useEffect(() => {
//     if (isSelected) {
//       onUpdate(id, type, {
//         quantity,
//         matchingHandbags: getSelectedHandbags(),
//         preferredSweets: giftBoxSweets.preferredSweets,
//       });
//     }
//   }, [handbagSelections, quantity, isSelected, giftBoxSweets, id, type, onUpdate]);

//   const getSelectedHandbags = () => {
//     return (
//       matchingHandbags
//         ?.filter((handbag, index) => {
//           const key = handbag.id || index;
//           return handbagSelections[key]?.selected;
//         })
//         .map((handbag, index) => {
//           const key = handbag.id || index;
//           return { ...handbag, quantity: handbagSelections[key].quantity };
//         }) || []
//     );
//   };

//   // Toggle selection for the main product
//   const handleToggleSelect = () => {
//     const updatedSelection = !isSelected;
//     setIsSelected(updatedSelection);
//     if (updatedSelection) {
//       onSelectionChange(id, type, data, true, {
//         quantity: initialQty,
//         matchingHandbags: getSelectedHandbags(),
//         preferredSweets: giftBoxSweets.preferredSweets,
//       });
//     } else {
//       onSelectionChange(id, type, data, false, {});
//     }
//   };

//   // Increase or decrease the main product quantity
//   const updateQuantity = (action) => {
//     const newQty =
//       action === "increase" ? quantity + 1 : Math.max(initialQty, quantity - 1);
//     setQuantity(newQty);
//     if (isSelected) {
//       onUpdate(id, type, {
//         quantity: newQty,
//         matchingHandbags: getSelectedHandbags(),
//         preferredSweets: giftBoxSweets.preferredSweets,
//       });
//     }
//   };

//   // Matching Handbags functions
//   const handleHandbagSelection = (e, handbag, index) => {
//     const checked = e.target.checked;
//     const key = handbag.id || index;
//     setHandbagSelections((prev) => {
//       const newSelections = { ...prev };
//       if (checked) {
//         newSelections[key] = {
//           selected: true,
//           quantity: Number(handbag.minOrderQuantity) || 1,
//         };
//       } else {
//         delete newSelections[key];
//       }
//       return newSelections;
//     });
//   };

//   const updateHandbagQuantity = (handbag, index, action) => {
//     const key = handbag.id || index;
//     setHandbagSelections((prev) => {
//       const current = prev[key] || {
//         selected: true,
//         quantity: Number(handbag.minOrderQuantity) || 1,
//       };
//       let newQuantity =
//         action === "increase"
//           ? current.quantity + 1
//           : Math.max(Number(handbag.minOrderQuantity) || 1, current.quantity - 1);
//       return { ...prev, [key]: { selected: true, quantity: newQuantity } };
//     });
//   };

//   // Image zoom functions
//   const handleImageClick = (imageSrc) => {
//     setZoomedImage(imageSrc);
//   };

//   const handleCloseModal = () => {
//     setZoomedImage(null);
//   };

//   // --- SWEETS MODAL FUNCTIONALITY ---
//   // Fetch only those sweets which the admin selected as preferred sweets.
//   // We assume the admin has defined the preferred sweets IDs in data.preferredSweets.
// const fetchSweetsData = async () => {
//   try {
//     if (!id) return []; // Ensure we have the gift box ID

//     const response = await axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes/${id}`);
    
//     if (!response.data || !response.data.preferredSweets) return [];

//     return response.data.preferredSweets; // Only return the preferred sweets
//   } catch (error) {
//     console.error("Error fetching preferred sweets:", error);
//     return [];
//   }
// };
//   const openSweetsModal = async () => {
//     setSweetsModalOpen(true);
//     setLoadingSweets(true);
//     const sweetsData = await fetchSweetsData();
//     setAvailableSweets(sweetsData);
//     setLoadingSweets(false);
//   };

//   // Handle user toggling a sweet in the modal.
//   const handleSweetsCheckboxChange = (sweet) => {
//     const currentIDs = giftBoxSweets.preferredSweets;
//     const currentDisplay = selectedSweetsDisplay;
//     const isChecked = currentIDs.includes(sweet._id);
//     if (!isChecked) {
//       const limit = Number(giftBoxSweets.sweetsQuantity);
//       if (currentIDs.length >= limit) {
//         alert(`You can only select ${limit} sweets.`);
//         return;
//       }
//       setGiftBoxSweets((prev) => ({
//         ...prev,
//         preferredSweets: [...prev.preferredSweets, sweet._id],
//       }));
//       setSelectedSweetsDisplay([...currentDisplay, sweet]);
//     } else {
//       setGiftBoxSweets((prev) => ({
//         ...prev,
//         preferredSweets: currentIDs.filter((id) => id !== sweet._id),
//       }));
//       setSelectedSweetsDisplay(currentDisplay.filter((s) => s._id !== sweet._id));
//     }
//   };

//   // Calculate total sweets price: for each selected sweet, its price is divided by the admin-defined sweets quantity.
//   const totalSweetsPrice = selectedSweetsDisplay.reduce(
//     (acc, sweet) => acc + sweet.price / Number(giftBoxSweets.sweetsQuantity || 1),
//     0
//   );

//   return (
//     <div className={styles.product_details}>
//       {/* Main Product Image */}
//       <div className={styles.product_image} onClick={() => handleImageClick(image)}>
//         <img src={image} alt={name} />
//       </div>

//       {/* Product Information */}
//       <div className={styles.product_info}>
//         <h2 className={styles.product_name}>{name}</h2>
//         {type === "giftBox" && (
//           <p className={styles.product_description}>{description}</p>
//         )}
//         <p className={styles.product_price}>Price: ₹{price}</p>
//         <p className={styles.product_min_order}>
//           Minimum Order: {minOrderQuantity}
//         </p>

//         {/* Main Product Selection */}
//         <button className={styles.select_button} onClick={handleToggleSelect}>
//           {isSelected ? "Unselect" : "Select"}
//         </button>

//         {isSelected && (
//           <div className={styles.quantity_selector}>
//             <button
//               className={styles.quantity_button}
//               onClick={() => updateQuantity("decrease")}
//             >
//               −
//             </button>
//             <span className={styles.quantity_display}>{quantity}</span>
//             <button
//               className={styles.quantity_button}
//               onClick={() => updateQuantity("increase")}
//             >
//               +
//             </button>
//           </div>
//         )}

//         {/* Matching Handbags Section */}
//         {isSelected && type === "giftBox" && matchingHandbags?.length > 0 && (
//           <div className={styles.matching_handbags_section}>
//             <h3>Matching Handbags</h3>
//             <div className={styles.handbags_container}>
//               {matchingHandbags.map((handbag, index) => {
//                 const key = handbag.id || index;
//                 const isSelectedHandbag = handbagSelections[key]?.selected;
//                 const handbagQty =
//                   handbagSelections[key]?.quantity ||
//                   Number(handbag.minOrderQuantity) ||
//                   1;
//                 return (
//                   <div key={key} className={styles.handbag_item}>
//                     <div className={styles.handbag_info}>
//                       {handbag.image && (
//                         <img
//                           src={handbag.image}
//                           alt={handbag.name}
//                           className={styles.handbag_image}
//                           onClick={() => handleImageClick(handbag.image)}
//                         />
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
//                           onChange={(e) =>
//                             handleHandbagSelection(e, handbag, index)
//                           }
//                         />
//                         Select
//                       </label>
//                       {isSelectedHandbag && (
//                         <div className={styles.handbag_quantity_selector}>
//                           <button
//                             onClick={() =>
//                               updateHandbagQuantity(handbag, index, "decrease")
//                             }
//                           >
//                             −
//                           </button>
//                           <span>{handbagQty}</span>
//                           <button
//                             onClick={() =>
//                               updateHandbagQuantity(handbag, index, "increase")
//                             }
//                           >
//                             +
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Sweets Section (only for gift boxes) */}
//         {isSelected && type === "giftBox" && (
//           <>
//             <p className={styles.admin_sweets_info}>
//               Max Sweets Allowed: {giftBoxSweets.sweetsQuantity}
//             </p>
//             <button
//               className={styles.add_sweets_button}
//               onClick={openSweetsModal}
//             >
//               Click to add sweets to your box
//             </button>

//             {selectedSweetsDisplay.length > 0 && (
//               <div className={styles.selectedSweetsDisplay}>
//                 {selectedSweetsDisplay.map((sweet) => (
//                   <div key={sweet._id} className={styles.preferredSweet}>
//                     <img
//                       src={sweet.image}
//                       alt={sweet.name}
//                       className={styles.sweetImage}
//                     />
//                     <div>{sweet.name}</div>
//                   </div>
//                 ))}
//                 <div>Total Sweets Price: ₹{totalSweetsPrice.toFixed(2)}</div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Zoomed Image Modal */}
//       {zoomedImage && (
//         <div className={styles.imageModal} onClick={handleCloseModal}>
//           <div className={styles.imageModalContent}>
//             <img
//               src={zoomedImage}
//               alt="Zoomed Preview"
//               className={styles.modalImage}
//             />
//             <button className={styles.closeButton} onClick={handleCloseModal}>
//               ✖
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Sweets Selection Modal */}
//       {sweetsModalOpen && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h3>
//               Select Sweets (Max {giftBoxSweets.sweetsQuantity})
//             </h3>
//             {loadingSweets ? (
//               <div className={styles.loader}>Loading...</div>
//             ) : (
//               <>
//                 {availableSweets.length > 0 ? (
//                   availableSweets.map((sweet) => (
//                     <div key={sweet._id} className={styles.sweetItem}>
//                       <input
//                         type="checkbox"
//                         checked={giftBoxSweets.preferredSweets.includes(sweet._id)}
//                         onChange={() => handleSweetsCheckboxChange(sweet)}
//                       />
//                       <img
//                         src={sweet.image}
//                         alt={sweet.name}
//                         className={styles.sweetImage}
//                       />
//                       <span>
//                         {sweet.name} - ₹{sweet.price}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No sweets available.</p>
//                 )}
//               </>
//             )}
//             <button onClick={() => setSweetsModalOpen(false)}>Done</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiftBoxAndBulkTemplate;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Const/Const";
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
  data, // data object from backend; admin-defined fields (sweetsQuantity, preferredSweets) are here
  externalSelected,
  externalQuantity,
  externalMatchingHandbags,
}) => {
  const initialQty = Number(minOrderQuantity) || 1;

  // Local state for main product selection and quantity
  const [quantity, setQuantity] = useState(externalQuantity || initialQty);
  const [isSelected, setIsSelected] = useState(externalSelected || false);
  const [handbagSelections, setHandbagSelections] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);

  // Sweets-related state:
  // Get admin-defined sweets quantity from data; default to 0 if not provided.
  const adminSweetsQty = data?.sweetsQuantity || 0;
  const [giftBoxSweets, setGiftBoxSweets] = useState({
    sweetsQuantity: adminSweetsQty,
    preferredSweets: [], // Array of sweet IDs (for backend tracking)
  });
  // For displaying the complete sweet objects (so we can show names, images, price)
  const [selectedSweetsDisplay, setSelectedSweetsDisplay] = useState([]);
  // Sweets modal states
  const [sweetsModalOpen, setSweetsModalOpen] = useState(false);
  const [loadingSweets, setLoadingSweets] = useState(false);
  const [availableSweets, setAvailableSweets] = useState([]);

  // Update giftBoxSweets.sweetsQuantity if admin data changes.
  useEffect(() => {
    setGiftBoxSweets((prev) => ({
      ...prev,
      sweetsQuantity: adminSweetsQty,
    }));
  }, [adminSweetsQty]);

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

  // Updated onUpdate call to include the full selected sweets objects.
  useEffect(() => {
    if (isSelected) {
      onUpdate(id, type, {
        quantity,
        matchingHandbags: getSelectedHandbags(),
        preferredSweets: giftBoxSweets.preferredSweets,
        selectedSweets: selectedSweetsDisplay,
      });
    }
  }, [handbagSelections, quantity, isSelected, giftBoxSweets, selectedSweetsDisplay, id, type, onUpdate]);

  const getSelectedHandbags = () => {
    return (
      matchingHandbags
        ?.filter((handbag, index) => {
          const key = handbag.id || index;
          return handbagSelections[key]?.selected;
        })
        .map((handbag, index) => {
          const key = handbag.id || index;
          return { ...handbag, quantity: handbagSelections[key].quantity };
        }) || []
    );
  };

  // Toggle selection for the main product
  const handleToggleSelect = () => {
    const updatedSelection = !isSelected;
    setIsSelected(updatedSelection);
    if (updatedSelection) {
      onSelectionChange(id, type, data, true, {
        quantity: initialQty,
        matchingHandbags: getSelectedHandbags(),
        preferredSweets: giftBoxSweets.preferredSweets,
        selectedSweets: selectedSweetsDisplay,
      });
    } else {
      onSelectionChange(id, type, data, false, {});
    }
  };

  // Increase or decrease the main product quantity
  const updateQuantity = (action) => {
    const newQty = action === "increase" ? quantity + 1 : Math.max(initialQty, quantity - 1);
    setQuantity(newQty);
    if (isSelected) {
      onUpdate(id, type, {
        quantity: newQty,
        matchingHandbags: getSelectedHandbags(),
        preferredSweets: giftBoxSweets.preferredSweets,
        selectedSweets: selectedSweetsDisplay,
      });
    }
  };

  // Matching Handbags functions
  const handleHandbagSelection = (e, handbag, index) => {
    const checked = e.target.checked;
    const key = handbag.id || index;
    setHandbagSelections((prev) => {
      const newSelections = { ...prev };
      if (checked) {
        newSelections[key] = {
          selected: true,
          quantity: Number(handbag.minOrderQuantity) || 1,
        };
      } else {
        delete newSelections[key];
      }
      return newSelections;
    });
  };

  const updateHandbagQuantity = (handbag, index, action) => {
    const key = handbag.id || index;
    setHandbagSelections((prev) => {
      const current = prev[key] || { selected: true, quantity: Number(handbag.minOrderQuantity) || 1 };
      let newQuantity =
        action === "increase"
          ? current.quantity + 1
          : Math.max(Number(handbag.minOrderQuantity) || 1, current.quantity - 1);
      return { ...prev, [key]: { selected: true, quantity: newQuantity } };
    });
  };

  // Image zoom functions
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setZoomedImage(null);
  };

  // --- SWEETS MODAL FUNCTIONALITY ---
  // Fetch only those sweets which the admin selected as preferred sweets.
  // We assume the admin has defined the preferred sweets IDs in data.preferredSweets.
  const fetchSweetsData = async () => {
    try {
      if (!id) return [];
      const response = await axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes/${id}`);
      if (!response.data || !response.data.preferredSweets) return [];
      // Return the full sweet objects populated in the giftBox document.
      return response.data.preferredSweets;
    } catch (error) {
      console.error("Error fetching preferred sweets:", error);
      return [];
    }
  };

  const openSweetsModal = async () => {
    setSweetsModalOpen(true);
    setLoadingSweets(true);
    const sweetsData = await fetchSweetsData();
    setAvailableSweets(sweetsData);
    setLoadingSweets(false);
  };

  // Handle user toggling a sweet in the modal
  const handleSweetsCheckboxChange = (sweet) => {
    const currentIDs = giftBoxSweets.preferredSweets;
    const currentDisplay = selectedSweetsDisplay;
    const isChecked = currentIDs.includes(sweet._id);
    if (!isChecked) {
      const limit = Number(giftBoxSweets.sweetsQuantity);
      if (currentIDs.length >= limit) {
        alert(`You can only select ${limit} sweets.`);
        return;
      }
      setGiftBoxSweets((prev) => ({
        ...prev,
        preferredSweets: [...prev.preferredSweets, sweet._id],
      }));
      setSelectedSweetsDisplay([...currentDisplay, sweet]);
    } else {
      setGiftBoxSweets((prev) => ({
        ...prev,
        preferredSweets: currentIDs.filter((id) => id !== sweet._id),
      }));
      setSelectedSweetsDisplay(currentDisplay.filter((s) => s._id !== sweet._id));
    }
  };

  // Calculate total sweets price:
  // For each selected sweet, divide its price by the number of selected sweets and sum the values.
  const totalSweetsPrice =
    selectedSweetsDisplay.length > 0
      ? selectedSweetsDisplay.reduce(
          (acc, sweet) => acc + Number(sweet.price) / selectedSweetsDisplay.length,
          0
        )
      : 0;

  // Final total amount = (base price + total sweets price) * quantity.
  const totalAmount = (Number(price) + totalSweetsPrice) * Number(quantity);

  return (
    <div className={styles.product_details}>
      {/* Main Product Image */}
      <div className={styles.product_image} onClick={() => handleImageClick(image)}>
        <img src={image} alt={name} />
      </div>

      {/* Product Information */}
      <div className={styles.product_info}>
        <h2 className={styles.product_name}>{name}</h2>
        {type === "giftBox" && (
          <p className={styles.product_description}>{description}</p>
        )}
        <p className={styles.product_price}>Price: ₹{price}</p>
        <p className={styles.product_min_order}>Minimum Order: {minOrderQuantity}</p>

        {/* Main Product Selection Button */}
        <button className={styles.select_button} onClick={handleToggleSelect}>
          {isSelected ? "Unselect" : "Select"}
        </button>

        {isSelected && (
          <div className={styles.quantity_selector}>
            <button className={styles.quantity_button} onClick={() => updateQuantity("decrease")}>
              −
            </button>
            <span className={styles.quantity_display}>{quantity}</span>
            <button className={styles.quantity_button} onClick={() => updateQuantity("increase")}>
              +
            </button>
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
                const handbagQty =
                  handbagSelections[key]?.quantity ||
                  Number(handbag.minOrderQuantity) ||
                  1;
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
                        <input
                          type="checkbox"
                          checked={isSelectedHandbag}
                          onChange={(e) => handleHandbagSelection(e, handbag, index)}
                        />
                        Select
                      </label>
                      {isSelectedHandbag && (
                        <div className={styles.handbag_quantity_selector}>
                          <button onClick={() => updateHandbagQuantity(handbag, index, "decrease")}>
                            −
                          </button>
                          <span>{handbagQty}</span>
                          <button onClick={() => updateHandbagQuantity(handbag, index, "increase")}>
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sweets Section (only for gift boxes) */}
        {isSelected && type === "giftBox" && (
          <>
            <p className={styles.admin_sweets_info}>
              Max Sweets Allowed: {giftBoxSweets.sweetsQuantity}
            </p>
            <button className={styles.add_sweets_button} onClick={openSweetsModal}>
              Click to add sweets to your box
            </button>

            {selectedSweetsDisplay.length > 0 && (
              <div className={styles.selectedSweetsDisplay}>
                {selectedSweetsDisplay.map((sweet) => (
                  <div key={sweet._id} className={styles.preferredSweet}>
                    <img src={sweet.image} alt={sweet.name} className={styles.sweetImage} />
                    <div>{sweet.name}</div>
                  </div>
                ))}
                <div className={styles.totalSweetsPrice}>
                  Total Sweets Price: ₹{totalSweetsPrice.toFixed(2)}
                </div>
                <div className={styles.finalTotalAmount}>
                  Total Amount: ₹{totalAmount.toFixed(2)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className={styles.imageModal} onClick={handleCloseModal}>
          <div className={styles.imageModalContent}>
            <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Sweets Selection Modal */}
      {sweetsModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Sweets (Max {giftBoxSweets.sweetsQuantity})</h3>
            {loadingSweets ? (
              <div className={styles.loader}>Loading...</div>
            ) : (
              <>
                {availableSweets.length > 0 ? (
                  availableSweets.map((sweet) => (
                    <div key={sweet._id} className={styles.sweetItem}>
                      <input
                        type="checkbox"
                        checked={giftBoxSweets.preferredSweets.includes(sweet._id)}
                        onChange={() => handleSweetsCheckboxChange(sweet)}
                      />
                      <img src={sweet.image} alt={sweet.name} className={styles.sweetImage} />
                      <span>
                        {sweet.name} - ₹{sweet.price}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No sweets available.</p>
                )}
              </>
            )}
            <button onClick={() => setSweetsModalOpen(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBoxAndBulkTemplate;