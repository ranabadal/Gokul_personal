
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./basketRhtsec.module.css";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item, bulkQuantity }) => {
  const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
  return (
    <div className={styles.orderItem}>
      <img src={item.productId.image} alt={item.productId.name} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <h3 className={styles.itemTitle}>{item.productId.name}</h3>
        <p className={styles.itemQuantity}>{item.productId.price} × {quantity}</p>
        <p className={styles.itemPrice}>₹{item.productId.price * quantity}</p>
      </div>
    </div>
  );
};

export default function OrderSummary({ cartItems = [], addresses, customTitle, customTotalHeading, updateCartItems, showQuantityInput = false }) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discount, additionalCharges, deliveryCharges, quantity]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => item.checked ? total + item.productId.price * item.quantity : total,
      0
    );

    const adjustedTotal = showQuantityInput
      ? total * quantity - discount + additionalCharges + deliveryCharges
      : total - discount + additionalCharges + deliveryCharges;

    setBasketTotal(adjustedTotal);
  };

  const handleApplyPromo = () => {
    if (promoCode === "badal2004") {
      setDiscount(500);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  // const handleCheckout = async () => {
  //   const selectedProducts = cartItems.filter(item => item.checked).map(item => ({
  //     product: item.productId._id,
  //     quantity: item.quantity
  //   }));
  
  //   if (selectedProducts.length === 0) {
  //     alert("Please select at least one product before checkout!");
  //     return;
  //   }
  
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     const response = await axios.post("http://localhost:8080/api/takeawayOrders/checkout", {
  //       products: selectedProducts,
  //       totalPrice: basketTotal,
  //     }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  
  //     if (response.status === 201) {
  //       alert("Order placed successfully!");
        
  //       // ✅ Remove selected items from the cart
  //       const updatedCart = cartItems.filter(item => !item.checked);
  //       updateCartItems(updatedCart); // Make sure `updateCartItems` is passed as a prop
  

  //     } else {
  //       alert("Failed to place order.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error placing order:", error.response?.data || error.message);
  //     alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
  //   }
  // };


  const handleCheckout = async () => {
    const selectedProducts = cartItems.filter(item => item.checked).map(item => ({
      product: item.productId._id,
      quantity: item.quantity
    }));
  
    if (selectedProducts.length === 0) {
      alert("Please select at least one product before checkout!");
      return;
    }
  
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:8080/api/takeawayOrders/checkout", {
        products: selectedProducts,
        totalPrice: basketTotal,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.status === 201) {
        alert("Order placed successfully!");
  
        // ✅ Remove only ordered items from the cart, keeping the user on the same page
        const updatedCart = cartItems.filter(item => !item.checked);
        updateCartItems(updatedCart); // ✅ Ensure `updateCartItems` updates the cart state
  
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };


  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <h2 className={styles.orderTitle}>{customTitle || "Your Order"}</h2>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>

      {cartItems.filter(item => item.checked).map((item, index) => (
        <OrderCard key={index} item={item} bulkQuantity={showQuantityInput ? quantity : undefined} />
      ))}

      {showQuantityInput && cartItems.filter(item => item.checked).length > 0 && (
        <div className={styles.quantityContainer}>
          <label htmlFor="quantity" className={styles.quantityLabel}>Quantity</label>
          <input type="number" id="quantity" className={styles.quantityInput} value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>
      )}

      <div className={styles.promoContainer}>
        <p className={styles.promoAppliedText}>Promo Code Applied</p>
        <div className={styles.promoSection}>
          <input type="text" placeholder="Promo Code" className={styles.promoInput} value={promoCode} onChange={e => setPromoCode(e.target.value)} />
          <button className={styles.applyButton} onClick={handleApplyPromo}>Apply</button>
        </div>
      </div>

      <div className={styles.chargesSection}>
        <p className={styles.chargeItem}><span>Additional Charges</span> <span>₹{additionalCharges}</span></p>
        <p className={styles.chargeItem}><span>Coupon Applied</span> <span>-₹{discount}</span></p>
      </div>

      <div className={styles.chargesSection}>
        <p className={styles.chargeTotal}><span>{customTotalHeading || "Total"}</span> <span>₹{basketTotal}</span></p>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout ({showQuantityInput ? (cartItems.some(item => item.checked) ? 1 : 0) : cartItems.filter(item => item.checked).length})
      </button>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import AddressSelectionModal from "../addressSelectionModal/addressSelectionModal"; // Import the Address Selection Modal
// import styles from "./basketRhtsec.module.css";
// import { useNavigate } from "react-router-dom";



// const OrderCard = ({ item, bulkQuantity  }) => {

//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
//   return (
//     <div className={styles.orderItem}>
//       {/* <img
//         src={`data:${
//           item.productId.image && item.productId.image.contentType
//             ? item.productId.image.contentType
//             : ""
//         };base64,${
//           item.productId.image && item.productId.image.data
//             ? item.productId.image.data
//             : ""
//         }`}
//         alt={item.productId.name}
//         className={styles.itemImage}
//       /> */}

//       <img
//         src={item.productId.image}
//         alt={item.productId.name}
//         className={styles.itemImage}
//         />
//       <div className={styles.itemDetails}>
//         <h3 className={styles.itemTitle}>{item.productId.name}</h3>
//         <p className={styles.itemQuantity}>
//           {item.productId.price} × { quantity}
//         </p>
//         <p className={styles.itemPrice}>
//           ₹{item.productId.price * quantity}
//         </p>
//       </div>
//     </div>
//   );
// };
// export default function OrderSummary({ cartItems = [], addresses, customTitle, customTotalHeading, showQuantityInput = false }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quantity, setQuantity] = useState(1); // State for quantity input


//   const navigate = useNavigate();


  
//   useEffect(() => {
//     calculateTotal();
//   }, [cartItems, discount, additionalCharges, deliveryCharges, quantity]);

//   const calculateTotal = () => {
//     const total = cartItems.reduce(
//       (total, item) =>
//         item.checked ? total + item.productId.price * item.quantity : total,
//       0
//     );

//     const adjustedTotal = showQuantityInput
//       ? total * quantity - discount + additionalCharges + deliveryCharges // Quantity multiplier for BulkOrderCart
//       : total - discount + additionalCharges + deliveryCharges; // Normal calculation for Basket page

//     setBasketTotal(adjustedTotal);
//   };

//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   const handleCheckout = () => {
//     if (cartItems.filter(item => item.checked).length === 0) {
//       alert("Please select at least one product before checkout!");
//       return;
//     }
//     // setIsModalOpen(true);
//   };

//   // const handleConfirmOrder = (selectedAddress) => {
//   //   // Save the selected address (for example, to localStorage)
//   //   localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
//   //   // Close the modal
//   //   setIsModalOpen(false);
//   //   // Route to the preview screen
    
//   // };


//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>{customTitle || "Your Order"}</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {cartItems.filter(item => item.checked).map((item, index) => (
//         <OrderCard key={index} item={item} bulkQuantity={showQuantityInput ? quantity : undefined}
// />
//       ))}

//       {/* Conditionally Render Quantity Input */}
//       {showQuantityInput && cartItems.filter(item => item.checked).length > 0 && (
//   <div className={styles.quantityContainer}>
//     <label htmlFor="quantity" className={styles.quantityLabel}>
//       Quantity
//     </label>
//     <input
//       type="number"
//       id="quantity"
//       className={styles.quantityInput}
//       value={quantity}
//       min={1}
//       onChange={(e) => setQuantity(Number(e.target.value))}
//     />
//   </div>
// )}


//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             onChange={e => setPromoCode(e.target.value)}
//           />
//           <button className={styles.applyButton} onClick={handleApplyPromo}>
//             Apply
//           </button>
//         </div>
//       </div>

//       {/* <div className={styles.deliveryContainer}>
//         <p className={styles.deliveryText}>Delivery Type</p>
//         <div className={styles.deliverySection}>
//           <select className={styles.deliverySelect}>
//             <option>Standard Delivery</option>
//             <option>Express Delivery</option>
//           </select>
//         </div>
//       </div> */}

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeItem}>
//           <span>Additional Charges</span> <span>₹{additionalCharges}</span>
//         </p>
//         {/* <p className={styles.chargeItem}>
//           <span>Delivery Charges</span> <span>₹{deliveryCharges}</span>
//         </p> */}
//         <p className={styles.chargeItem}>
//           <span>Coupon Applied</span> <span>-₹{discount}</span>
//         </p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>{customTotalHeading || "Total"}</span> <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//   Checkout (
//   {showQuantityInput
//     ? (cartItems && cartItems.some(item => item.checked) ? 1 : 0)
//     : (cartItems && cartItems.filter(item => item.checked).length)}
//   )
// </button>

// {/* {isModalOpen && (
//   <AddressSelectionModal
//     addresses={addresses || []}
//     onClose={() => setIsModalOpen(false)}
//     onConfirm={handleConfirmOrder}
//   />
// )} */}
//     </div>
//   );
// }


// //17-3-25
// import React, { useState, useEffect } from "react";
// import AddressSelectionModal from "../addressSelectionModal/addressSelectionModal"; // Import the Address Selection Modal
// import styles from "./basketRhtsec.module.css";

// const OrderCard = ({ item }) => {
//   return (
//     <div className={styles.orderItem}>
//       <img
//         src={`data:${
//           item.productId.image && item.productId.image.contentType
//             ? item.productId.image.contentType
//             : ""
//         };base64,${
//           item.productId.image && item.productId.image.data
//             ? item.productId.image.data
//             : ""
//         }`}
//         alt={item.productId.name}
//         className={styles.itemImage}
//       />
//       <div className={styles.itemDetails}>
//         <h3 className={styles.itemTitle}>{item.productId.name}</h3>
//         <p className={styles.itemQuantity}>
//           {item.productId.price} × {item.quantity}
//         </p>
//         <p className={styles.itemPrice}>
//           ₹{item.productId.price * item.quantity}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({ cartItems, addresses }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Address selection modal state

//   useEffect(() => {
//     calculateTotal();
//   }, [cartItems, discount, additionalCharges, deliveryCharges]);

//   const calculateTotal = () => {
//     const total = cartItems.reduce((total, item) => 
//       item.checked ? total + item.productId.price * item.quantity : total, 0);
//     setBasketTotal(total - discount + additionalCharges + deliveryCharges);
//   };

//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   const handleCheckout = () => {
//     // Open modal to select address
//     if (cartItems.filter(item => item.checked).length === 0) {
//       alert("Please select at least one product before checkout!");
//       return;
//     }
//     setIsModalOpen(true);
//   };

//   const handleConfirmOrder = (selectedAddress) => {
//     console.log("Order confirmed for address:", selectedAddress);
//     setIsModalOpen(false);

//     // Call backend API to confirm order
//     // Example:
//     // axios.post('/api/orders', { cartItems, selectedAddress }).then(response => { ... })
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>Your Order</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {cartItems.filter(item => item.checked).map((item, index) => (
//         <OrderCard key={index} item={item} />
//       ))}

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
//           <span>Total</span> <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout ({cartItems.filter(item => item.checked).length})
//       </button>

//       {/* Render AddressSelectionModal if modal is open */}
//       {isModalOpen && (
//         <AddressSelectionModal
//           addresses={addresses}
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={handleConfirmOrder}
//         />
//       )}
//     </div>
//   );
// }












//oder confirm popup

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./basketRhtsec.module.css";

// const OrderCard = ({ item }) => {
//   return (
//     <div className={styles.orderItem}>
//       <img
//         src={`data:${
//           item.productId.image && item.productId.image.contentType
//             ? item.productId.image.contentType
//             : ""
//         };base64,${
//           item.productId.image && item.productId.image.data
//             ? item.productId.image.data
//             : ""
//         }`}
//         alt={item.productId.name}
//         className={styles.itemImage}
//       />
//       <div className={styles.itemDetails}>
//         <h3 className={styles.itemTitle}>{item.productId.name}</h3>
//         <p className={styles.itemQuantity}>{item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price} × {item.quantity}</p>
//         <p className={styles.itemPrice}>₹{item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price * item.quantity}</p>
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({ cartItems, setCartItems }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(50); // Initial delivery charge is 50
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     calculateTotal();
//   }, [cartItems, discount, additionalCharges, deliveryCharges]);

//   const calculateTotal = () => {
//     const total = cartItems.reduce((total, item) => {
//       const price = item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price;
//       return item.checked ? total + price * item.quantity : total;
//     }, 0);
  
//     setBasketTotal(total - discount + additionalCharges + deliveryCharges);
//   };
  

//   const handleApplyPromo = () => {
//     if (promoCode === "badal2004") {
//       setDiscount(500);
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code");
//     }
//   };

//   const checkedItemsCount = cartItems.filter(item => item.checked).length;

//   const handleCheckout = async () => {
//     try {
//       // Simulate an API call to remove items from the basket in the database
//       const token = localStorage.getItem('jwtToken');
//       await axios.delete('http://localhost:8080/api/cart', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setShowPopup(true);
//       setTimeout(() => {
//         setShowPopup(false);
//         setCartItems([]); // Clear the basket
//       }, 2000); // Hide popup after 2 seconds and clear the basket
//     } catch (error) {
//       console.error('Error removing items from basket:', error);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setCartItems([]); // Clear the basket
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>Your Order</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       {cartItems.filter(item => item.checked).map((item, index) => (
//         <OrderCard key={index} item={item} />
//       ))}

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
//           <button className={styles.applyButton} onClick={handleApplyPromo}>Apply</button>
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
//         <p className={styles.chargeItem}><span>Additional Charges</span> <span>₹{additionalCharges}</span></p>
//         <p className={styles.chargeItem}><span>Delivery Charges</span> <span>₹{deliveryCharges}</span></p>
//         <p className={styles.chargeItem}><span>Coupon Applied</span> <span>-₹{discount}</span></p>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}><span>Total</span> <span>₹{basketTotal}</span></p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout ({checkedItemsCount})</button>
      
//       {showPopup && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <p>Order Confirmed!</p>
//             <button className={styles.closeButton} onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
