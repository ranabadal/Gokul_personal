import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./giftBoxCartRight.module.css";
import editIcon from "./Assets/editIcon.svg";
import deleteIcon from "./Assets/delete.svg";

export default function OrderSummary({ 
    selectedGiftBox, 
    setSelectedGiftBox, 
    selectedSweets, 
    setSelectedSweets, 
    isViewingSelection, 
    setIsViewingSelection, 
    handleCheckout = () => {} 
  }) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(50);
  const navigate = useNavigate();
  const [storedSelections, setStoredSelections] = useState([]);


//   // Load stored selections from local storage
//   useEffect(() => {
//     const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
//     setStoredSelections(selections);
//   }, []);


// useEffect(() => {
//     setStoredSelections(JSON.parse(localStorage.getItem("giftBoxSelections")) || []);
//   }, [storedSelections]); // ✅ Re-render when selections change

useEffect(() => {
    setStoredSelections(JSON.parse(localStorage.getItem("giftBoxSelections")) || []);
  }, []); // ✅ Add an empty dependency array to prevent endless re-renders
//   useEffect(() => {
//     const updateSelections = () => {
//       const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
//       setStoredSelections(selections);
//     };
  
//     // ✅ Listen for changes
//     window.addEventListener("storage", updateSelections);
  
//     return () => {
//       window.removeEventListener("storage", updateSelections);
//     };
//   }, []);

//   const handleEditBox = (index) => {
//     const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
//     const editingBox = selections[index];
  
//     if (editingBox) {
//       setSelectedGiftBox(editingBox.selectedGiftBox); // ✅ Ensure correct box is set
//       setSelectedSweets(editingBox.selectedSweets);
//       setIsViewingSelection(true); // Open GiftBoxCartLeft
//     } else {
//       console.error("Editing box not found in local storage!");
//     }
//   };

const handleEditBox = (index) => {
    const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
    const editingBox = selections[index];
  
    if (editingBox) {
      // ✅ Store the editing index in localStorage
      localStorage.setItem("editingBoxIndex", index); 
  
      // ✅ Set the box and sweets correctly
      setSelectedGiftBox(editingBox.selectedGiftBox);
      setSelectedSweets(editingBox.selectedSweets);
      setIsViewingSelection(true); // Open GiftBoxCartLeft
    } else {
      console.error("Editing box not found in local storage!");
    }
  };
  
//   const handleDeleteBox = (index) => {
//     const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
//     selections.splice(index, 1); // Remove the selected box
//     localStorage.setItem("giftBoxSelections", JSON.stringify(selections)); // Update storage
//     setStoredSelections(selections); // Update state to reflect changes
//   };

const handleDeleteBox = (index) => {
    let selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
    selections.splice(index, 1);
    localStorage.setItem("giftBoxSelections", JSON.stringify(selections));
  
    // ✅ Instantly reflect deletion in state
    setStoredSelections([...selections]);
  };

  // Calculate the total based on all stored selections
  useEffect(() => {
    const total = storedSelections.reduce((sum, box) => {
      const sweetsTotal = box.selectedSweets.reduce((sweetsSum, sweet) => sweetsSum + sweet.price, 0);
      return sum + box.selectedGiftBox.price + sweetsTotal;
    }, 0);
    
    setBasketTotal(total + additionalCharges + deliveryCharges - discount);
  }, [storedSelections, discount, additionalCharges, deliveryCharges]);

  const handleApplyPromo = () => {
    if (promoCode === "badal2004") {
      setDiscount(500);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <h2 className={styles.orderTitle}>Your Order Summary</h2>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>

      {storedSelections.length > 0 ? (
        storedSelections.map((box, index) => (
          <div key={index} className={styles.orderItem}>
            <div className={styles.itemDetails}>
              <div className={styles.topSection}>
                <div className={styles.selectedBoxNameAndSize}>
                  {box.selectedGiftBox.title} ({box.selectedGiftBox.size})
                </div>
                <div className={styles.icons}>
  <div className={styles.editIcon} onClick={() => handleEditBox(index)}>
    <img src={editIcon} alt="edit" className={styles.editIconImage} />
  </div>
  <div className={styles.deleteIcon} onClick={() => handleDeleteBox(index)}>
    <img src={deleteIcon} alt="delete" className={styles.deleteIconImage} />
  </div>
</div>
              </div>
              <div className={styles.midSection}>
                <div className={styles.allSelectedItems}>
                  {box.selectedSweets.map(sweet => sweet.name).join(", ")}
                </div>
              </div>
              <div className={styles.bottomSection}>
                <p className={styles.itemPrice}>Box Price: ₹{box.selectedGiftBox.price}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No gift boxes selected.</p>
      )}

      <div className={styles.promoContainer}>
        <p className={styles.promoAppliedText}>Promo Code Applied</p>
        <div className={styles.promoSection}>
          <input
            type="text"
            placeholder="Promo Code"
            className={styles.promoInput}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className={styles.applyButton} onClick={handleApplyPromo}>
            Apply
          </button>
        </div>
      </div>

      <div className={styles.deliveryContainer}>
        <p className={styles.deliveryText}>Delivery Type</p>
        <div className={styles.deliverySection}>
          <select className={styles.deliverySelect}>
            <option>Standard Delivery</option>
            <option>Express Delivery</option>
          </select>
        </div>
      </div>

      <div className={styles.chargesSection}>
        <p className={styles.chargeItem}>
          <span>Additional Charges</span> <span>₹{additionalCharges}</span>
        </p>
        <p className={styles.chargeItem}>
          <span>Delivery Charges</span> <span>₹{deliveryCharges}</span>
        </p>
        <p className={styles.chargeItem}>
          <span>Coupon Applied</span> <span>-₹{discount}</span>
        </p>
      </div>

      <div className={styles.chargesSection}>
        <p className={styles.chargeTotal}>
          <span>Total</span> <span>₹{basketTotal}</span>
        </p>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./giftBoxCartRight.module.css";
// import editIcon from "./Assets/editIcon.svg";
// import deleteIcon from "./Assets/delete.svg";

// const OrderCard = ({ item, bulkQuantity, size }) => {
//   // Decide which quantity to use
//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
//   console.log(`Item Size: ${item.size}, Price: ${item.productId.price}`);

//   // Adjust the price based on size
//   const adjustedPrice = (() => {
//     if (size === "500 gm") {
//       return item.productId.price / 2; // Halve the price for 500 gm
//     } else if (size === "2 kg") {
//       return item.productId.price * 2; // Double the price for 2 kg
//     }
//     return item.productId.price; // Default price for 1 kg
//   })();

//   return (
//     <div className={styles.orderItem}>
//       <div className={styles.itemDetails}>
//         <div className={styles.topSection}>
//           {/* Dynamic gift box name and size here if desired; fallback to static text */}
//           <div className={styles.selectedBoxNameAndSize}>
//             {item.title} ({item.size})
//           </div>
//           <div className={styles.icons}>
//             <div className={styles.editIcon}>
//               <img src={editIcon} alt="edit" className={styles.editIconImage} />
//             </div>
//             <div className={styles.deleteIcon}>
//               <img
//                 src={deleteIcon}
//                 alt="delete"
//                 className={styles.deleteIconImage}
//               />
//             </div>
//           </div>
//         </div>
//         <div className={styles.midSection}>
//           {/* For cartItems fallback, static content is used here */}
//           <div className={styles.allSelectedItems}>
//             Rassgulla, Milk Cake, Laddu, Gulab jamun
//           </div>
//         </div>
//         <div className={styles.bottomSection}>
//           <p className={styles.itemQuantity}>QTY : {quantity}</p>
//           <p className={styles.itemPrice}>₹{adjustedPrice * quantity}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({
//   customTitle = "Your Order",         // For header title override
//   customTotalHeading = "Total",        // For total heading override
//   cartItems = [],                      // Fallback list of items if no gift box exists
//   showQuantityInput = false,           // Whether to show the quantity input field
//                    // Array of selected sweets (each with at least a name and price)
//   handleCheckout = () => {}            // Callback function for Checkout
// }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50);
//   // This quantity applies to the selected gift box (the number of boxes)
//   const [quantity, setQuantity] = useState(1);
//   const [localGiftBox, setLocalGiftBox] = useState(null);
// const [localSweets, setLocalSweets] = useState([]);
//   const navigate = useNavigate();
//  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
//   const [selectedSweets, setSelectedSweets] = useState([]);


//   // Calculate total based on whether a selected gift box exists or if we use cartItems.
//   const calculateTotal = () => {
//     if (selectedGiftBox) {
//       // Sum selected sweets prices, then add the gift box price, multiply by quantity.
//       const sweetsTotal =
//         selectedSweets && selectedSweets.length > 0
//           ? selectedSweets.reduce((sum, sweet) => sum + (sweet.price || 0), 0)
//           : 0;
//       const itemsTotal = (selectedGiftBox.price + sweetsTotal) * quantity;
//       setBasketTotal(itemsTotal + additionalCharges + deliveryCharges - discount);
//     } else if (cartItems.length > 0) {
//       const itemsTotal = cartItems.reduce((total, item) => {
//         let price = item.productId.price;
//         if (item.size === "500 gm") {
//           price = price / 2;
//         } else if (item.size === "2 kg") {
//           price = price * 2;
//         }
//         // Use a controlled quantity if showQuantityInput is enabled
//         const itemQuantity = showQuantityInput ? quantity : item.quantity;
//         return total + price * itemQuantity;
//       }, 0);
//       setBasketTotal(
//         itemsTotal + additionalCharges + deliveryCharges - discount
//       );
//     } else {
//       setBasketTotal(0);
//     }
//   };


//   useEffect(() => {
//     const savedData = localStorage.getItem("giftBoxSelection");
//     if (savedData) {
//       const parsedData = JSON.parse(savedData);
  
//       console.log("Loaded from local storage:", parsedData); // Debugging
  
//       // Ensure selectedGiftBox and selectedSweets are updated
//       setSelectedGiftBox(parsedData.selectedGiftBox || null);
//       setSelectedSweets(parsedData.selectedSweets || []);
//     }
//   }, []);

//   useEffect(() => {
//     calculateTotal();
//   }, [
//     discount,
//     additionalCharges,
//     deliveryCharges,
//     quantity,
//     cartItems,
//   ]);



//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>
//           {selectedGiftBox
//             ? `${selectedGiftBox.title} (${selectedGiftBox.size})`
//             : customTitle}
//         </h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {selectedGiftBox ? (
//         // When a gift box is selected, show its details.
//         <div className={styles.orderDetails}>
//           {/* Here we show the selected box name and size dynamically */}
//           <div className={styles.selectedBoxNameAndSize}>
//   {selectedGiftBox ? `${selectedGiftBox.title} (${selectedGiftBox.size})` : "No box selected"}
// </div>

// <div className={styles.allSelectedItems}>
//   {selectedSweets.length > 0 ? selectedSweets.map(sweet => sweet.name).join(", ") : "No sweets selected"}
// </div>

//           {showQuantityInput && (
//             <div className={styles.detailSection}>
//               <label htmlFor="quantity" className={styles.quantityLabel}>
//                 Quantity:
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 className={styles.quantityInput}
//                 value={quantity}
//                 min="1"
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//               />
//             </div>
//           )}
//         </div>
//       ) : (
//         // Fallback: render the cartItems if no gift box is selected.
//         cartItems.map((item, index) => (
//           <OrderCard
//             key={index}
//             item={item}
//             size={item.size}
//             bulkQuantity={showQuantityInput ? quantity : undefined}
//           />
//         ))
//       )}

//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <button className={styles.applyButton} onClick={handleApplyPromo}>
//             Apply
//           </button>
//         </div>
//       </div>

//       <div className={styles.deliveryContainer}>
//         <p className={styles.deliveryText}>Delivery Type</p>
//         <div className={styles.deliverySection}>
//           <select className={styles.deliverySelect}>
//             <option>Standard Delivery</option>
//             <option>Express Delivery</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeItem}>
//           <span>Additional Charges</span> <span>₹{additionalCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Delivery Charges</span> <span>₹{deliveryCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Coupon Applied</span> <span>-₹{discount}</span>
//         </p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>{customTotalHeading}</span> <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout
//       </button>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./giftBoxCartRight.module.css";
// import editIcon from "./Assets/editIcon.svg";
// import deleteIcon from "./Assets/delete.svg";

// const OrderCard = ({ item, bulkQuantity, size }) => {
//   // Decide which quantity to use
//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
//   console.log(`Item Size: ${item.size}, Price: ${item.productId.price}`);

//   // Adjust the price based on size
//   const adjustedPrice = (() => {
//     if (size === "500 gm") {
//       return item.productId.price / 2; // Halve the price for 500 gm
//     } else if (size === "2 kg") {
//       return item.productId.price * 2; // Double the price for 2 kg
//     }
//     return item.productId.price; // Default price for 1 kg
//   })();

//   return (
//     <div className={styles.orderItem}>
//       <div className={styles.itemDetails}>
//         <div className={styles.topSection}>
//           <div className={styles.selectedBoxNameAndSize}>
//             Holi Special (500gm)
//           </div>
//           <div className={styles.icons}>
//             <div className={styles.editIcon}>
//               <img src={editIcon} alt="edit" className={styles.editIconImage} />
//             </div>
//             <div className={styles.deleteIcon}>
//               <img
//                 src={deleteIcon}
//                 alt="delete"
//                 className={styles.deleteIconImage}
//               />
//             </div>
//           </div>
//         </div>
//         <div className={styles.midSection}>
//           <div className={styles.allSelectedItems}>
//             Rassgulla, Milk Cake, Laddu, Gulab jamun
//           </div>
//         </div>
//         <div className={styles.bottomSection}>
//           <p className={styles.itemQuantity}>QTY : {quantity}</p>
//           <p className={styles.itemPrice}>₹{adjustedPrice * quantity}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({
//   customTitle = "Your Order",        // Allow overriding header title via props
//   customTotalHeading = "Total",       // Allow overriding total heading
//   cartItems = [],                     // List of items passed as a prop
//   showQuantityInput = false,          // Whether to show the quantity input field
//   handleCheckout = () => {}           // Checkout handler passed as a prop
// }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   // Calculate the total using cart items and adjustments
//   const calculateTotal = () => {
//     if (cartItems.length > 0) {
//       const itemsTotal = cartItems.reduce((total, item) => {
//         let price = item.productId.price;
//         if (item.size === "500 gm") {
//           price = price / 2;
//         } else if (item.size === "2 kg") {
//           price = price * 2;
//         }
//         // Use a controlled quantity if showQuantityInput is enabled
//         const itemQuantity = showQuantityInput ? quantity : item.quantity;
//         return total + price * itemQuantity;
//       }, 0);
//       setBasketTotal(itemsTotal + additionalCharges + deliveryCharges - discount);
//     } else {
//       setBasketTotal(0);
//     }
//   };

//   useEffect(() => {
//     calculateTotal();
//   }, [discount, additionalCharges, deliveryCharges, quantity, cartItems]);

//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>{customTitle}</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {cartItems.map((item, index) => (
//         <OrderCard
//           key={index}
//           item={item}
//           size={item.size} // Pass size if available
//           bulkQuantity={showQuantityInput ? quantity : undefined}
//         />
//       ))}

//       {showQuantityInput && (
//         <div className={styles.quantityContainer}>
//           <label htmlFor="quantity" className={styles.quantityLabel}>
//             Quantity
//           </label>
//           <input
//             type="number"
//             id="quantity"
//             className={styles.quantityInput}
//             value={quantity}
//             min={1}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//           />
//         </div>
//       )}

//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <button className={styles.applyButton} onClick={handleApplyPromo}>
//             Apply
//           </button>
//         </div>
//       </div>

//       <div className={styles.deliveryContainer}>
//         <p className={styles.deliveryText}>Delivery Type</p>
//         <div className={styles.deliverySection}>
//           <select className={styles.deliverySelect}>
//             <option>Standard Delivery</option>
//             <option>Express Delivery</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeItem}>
//           <span>Additional Charges</span> <span>₹{additionalCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Delivery Charges</span> <span>₹{deliveryCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Coupon Applied</span> <span>-₹{discount}</span>
//         </p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>{customTotalHeading}</span>{" "}
//           <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout
//       </button>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./giftBoxCartRight.module.css";
// import editIcon from "./Assets/editIcon.svg";
// import deleteIcon from "./Assets/delete.svg";

// const OrderCard = ({ item, bulkQuantity, size }) => {
//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
//   console.log(`Item Size: ${item.size}, Price: ${item.productId.price}`);

//   // Adjust price based on size
//   const adjustedPrice = (() => {
//     if (size === "500 gm") {
//       return item.productId.price / 2; // Halve the price for 500 gm
//     } else if (size === "2 kg") {
//       return item.productId.price * 2; // Double the price for 2 kg
//     }
//     return item.productId.price; // Default price for 1 kg
//   })();

//   return (
//     <div className={styles.orderItem}>
//       <div className={styles.itemDetails}>
//      <div className={styles.topSection}>
//      <div className={styles.selectedBoxNameAndSize}>
//           Holi Special (500gm)
//         </div>
//         <div className={styles.icons}>
//           <div className={styles.editIcon}>
//             <img src={editIcon} alt="edit" className={styles.editIconImage} />
//           </div>
//           <div className={styles.deleteIcon}>
//             <img
//               src={deleteIcon}
//               alt="delete"
//               className={styles.deleteIconImage}
//             />
//           </div>
//         </div>
//      </div>
//        <div className={styles.midSection}>
//        <div className={styles.allSelectedItems}>
//           Rassgulla, Milk Cake, Laddu , Gulab jamun
//         </div>
//        </div>
//       <div className={styles.bottomSection}>
//       <p className={styles.itemQuantity}>
//       QTY : 4
//         </p>
//         <p className={styles.itemPrice}>₹{adjustedPrice * quantity}</p>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({

// }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     calculateTotal();
//   }, [ discount, additionalCharges, deliveryCharges, quantity]);

//   const calculateTotal = () => {
   
//     }
  
  

//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>{customTitle || "Your Order"}</h2>
//         <h2 className={styles.orderPrice}>₹5555</h2>
//       </div>
     
//       {cartItems
//         .map((item, index) => (
//           <OrderCard
//             key={index}
//             item={item}
         
//             bulkQuantity={showQuantityInput ? quantity : undefined}
//           />
//         ))}

//           <div className={styles.quantityContainer}>
//             <label htmlFor="quantity" className={styles.quantityLabel}>
//               Quantity
//             </label>
//             <input
//               type="number"
//               id="quantity"
//               className={styles.quantityInput}
//               value={quantity}
//               min={1}
              
//             />
//           </div>
    

//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <button className={styles.applyButton} onClick={handleApplyPromo}>
//             Apply
//           </button>
//         </div>
//       </div>

//       <div className={styles.deliveryContainer}>
//         <p className={styles.deliveryText}>Delivery Type</p>
//         <div className={styles.deliverySection}>
//           <select className={styles.deliverySelect}>
//             <option>Standard Delivery</option>
//             <option>Express Delivery</option>
//           </select>
//         </div>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeItem}>
//           <span>Additional Charges</span> <span>₹{additionalCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Delivery Charges</span> <span>₹{deliveryCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Coupon Applied</span> <span>-₹{discount}</span>
//         </p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>{customTotalHeading || "Total"}</span>{" "}
//           <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout 
//       </button>
//     </div>
//   );




// GiftBoxCartRight.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./giftBoxCartRight.module.css";
// import editIcon from "./Assets/editIcon.svg";
// import deleteIcon from "./Assets/delete.svg";

// /**
//  * Helper function to return an adjusted price based on the box size.
//  * If size is "500 gm", price is halved; if "2 kg", price is doubled; otherwise default.
//  */
// const getAdjustedPrice = (price, size) => {
//   if (size === "500 gm") {
//     return price / 2;
//   } else if (size === "2 kg") {
//     return price * 2;
//   }
//   return price;
// };

// /**
//  * OrderCard Component
//  * Renders a single order item with details such as product name, quantity,
//  * and the computed item total (adjusted for box size).
//  */
// const OrderCard = ({ item, bulkQuantity, size }) => {
//   // Guard clause: if item or its productId is missing, don't render the card.
//   if (!item || !item.productId) {
//     console.warn("OrderCard: Missing product or productId", item);
//     return null;
//   }

//   // Use global bulkQuantity if provided, otherwise use item's own quantity.
//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;

//   // Use optional chaining and nullish coalescing to safely get the price; fallback to 0.
//   const basePrice = item.productId?.price ?? 0;
//   const adjustedPrice = getAdjustedPrice(basePrice, size);

//   return (
//     <div className={styles.orderItem}>
//       <div className={styles.itemDetails}>
//         <div className={styles.topSection}>
//           <div className={styles.selectedBoxNameAndSize}>
//             {/* Replace hardcoded value with dynamic content later if available */}
//             Holi Special (500gm)
//           </div>
//           <div className={styles.icons}>
//             <div className={styles.editIcon}>
//               <img src={editIcon} alt="edit" className={styles.editIconImage} />
//             </div>
//             <div className={styles.deleteIcon}>
//               <img
//                 src={deleteIcon}
//                 alt="delete"
//                 className={styles.deleteIconImage}
//               />
//             </div>
//           </div>
//         </div>
//         <div className={styles.midSection}>
//           <div className={styles.allSelectedItems}>
//             {/* List of selected sweets; update as needed */}
//             Rassgulla, Milk Cake, Laddu, Gulab Jamun
//           </div>
//         </div>
//         <div className={styles.bottomSection}>
//           <p className={styles.itemQuantity}>QTY: {quantity}</p>
//           <p className={styles.itemPrice}>
//             ₹{Math.round(adjustedPrice * quantity)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// /**
//  * OrderSummary Component
//  * Renders the order summary on the right side (cart).
//  * Displays the order header, list of order items, quantity controls,
//  * promo code application, delivery charges, and the final total.
//  */
// export default function OrderSummary({

// }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   // Recalculate total when any dependencies change.
//   useEffect(() => {
//     calculateTotal();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cartItems, discount, additionalCharges, deliveryCharges, quantity]);

//   /**
//    * Calculate the total price of all checked items.
//    * Total = Sum( adjusted price * itemQuantity ) + additionalCharges + deliveryCharges - discount.
//    */
//   const calculateTotal = () => {
//     // Only include items that are checked.
//     const checkedItems = cartItems.filter((item) => item.checked);

//     const total = checkedItems.reduce((sum, item) => {
//       // Avoid error if productId is missing.
//       const basePrice = item.productId?.price ?? 0;
//       const adjustedPrice = getAdjustedPrice(basePrice, size);
//       const itemQuantity = showQuantityInput ? quantity : item.quantity;
//       return sum + adjustedPrice * itemQuantity;
//     }, 0);

//     // Final total calculation.
//     const finalTotal = total + additionalCharges + deliveryCharges - discount;
//     setBasketTotal(Math.round(finalTotal));
//   };

//   /**
//    * Handle promo code application.
//    * If promo code matches the preset, apply a discount; otherwise reset discount.
//    */
//   const handleApplyPromo = () => {
//     if (promoCode.trim().toLowerCase() === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   /**
//    * Handle checkout action.
//    * Validates that at least one product is selected before proceeding.
//    */
//   const handleCheckout = () => {
//     if (cartItems.filter((item) => item.checked).length === 0) {
//       alert("Please select at least one product before checkout!");
//       return;
//     }
//     // Pass along overall quantity and total to the onCheckout callback.
//     onCheckout({ quantity, basketTotal });
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>{customTitle || "Your Order"}</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {/* Render each checked order item */}
//       {cartItems
//         .filter((item) => item.checked)
//         .map((item, index) => (
//           <OrderCard
//             key={index}
//             item={item}
//             size={size}
//             bulkQuantity={showQuantityInput ? quantity : undefined}
//           />
//         ))}

//       {/* Optional quantity input */}
//       {showQuantityInput && cartItems.filter((item) => item.checked).length > 0 && (
//         <div className={styles.quantityContainer}>
//           <label htmlFor="quantity" className={styles.quantityLabel}>
//             Quantity
//           </label>
//           <input
//             type="number"
//             id="quantity"
//             className={styles.quantityInput}
//             value={quantity}
//             min={1}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//           />
//         </div>
//       )}

//       {/* Promo code section */}
//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <button className={styles.applyButton} onClick={handleApplyPromo}>
//             Apply
//           </button>
//         </div>
//       </div>

//       {/* Delivery type section */}
//       <div className={styles.deliveryContainer}>
//         <p className={styles.deliveryText}>Delivery Type</p>
//         <div className={styles.deliverySection}>
//           <select className={styles.deliverySelect}>
//             <option>Standard Delivery</option>
//             <option>Express Delivery</option>
//           </select>
//         </div>
//       </div>

//       {/* Charges breakdown */}
//       <div className={styles.chargesSection}>
//         <p className={styles.chargeItem}>
//           <span>Additional Charges</span>
//           <span>₹{additionalCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Delivery Charges</span>
//           <span>₹{deliveryCharges}</span>
//         </p>
//         <p className={styles.chargeItem}>
//           <span>Coupon Applied</span>
//           <span>-₹{discount}</span>
//         </p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>{customTotalHeading || "Total"}</span>{" "}
//           <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout (
//         {showQuantityInput
//           ? cartItems && cartItems.some((item) => item.checked)
//             ? 1
//             : 0
//           : cartItems && cartItems.filter((item) => item.checked).length}
//         )
//       </button>
//     </div>
//   );
// }