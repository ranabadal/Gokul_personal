// // GiftBoxCartRight.jsx
// import React from "react";
// import styles from "./giftBoxCartRight.module.css";

// const GiftBoxCartRight = ({
//   cartItems,         // Array of items: { type, details, quantity, matchingHandbags }
//   basketTotal,       // Total price
//   additionalCharges, // Additional charges
//   deliveryCharges,   // Delivery charges
//   discount,          // Discount
//   promoCode,         // Promo code string
//   handleCheckout,    // Callback for checkout
//   handleEditBox,     // Callback for editing an item (id, type)
//   handleDeleteBox,   // Callback for deleting an item (id, type)
// }) => {
//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.header}>
//         <h2 className={styles.orderTitle}>Your Order Summary</h2>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>
//       {cartItems && cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={`${item.id}_${item.type}`} className={styles.orderItem}>
//             <div className={styles.orderItemRow}>
//               <div className={styles.itemImage}>
//                 <img
//                   src={item.details.image}
//                   alt={item.details.name}
//                   className={styles.orderImage}
//                 />
//               </div>
//               <div className={styles.itemDetails}>
//                 <div className={styles.topSection}>
//                   <div className={styles.selectedBoxName}>{item.details.name}</div>
//                   <div className={styles.icons}>
//                     <div
//                       className={styles.editIcon}
//                       onClick={() => handleEditBox(item.id, item.type)}
//                     >
//                       <img
//                         src="/path/to/editIcon.png"
//                         alt="edit"
//                         className={styles.editIconImage}
//                       />
//                     </div>
//                     <div
//                       className={styles.deleteIcon}
//                       onClick={() => handleDeleteBox(item.id, item.type)}
//                     >
//                       <img
//                         src="/path/to/deleteIcon.png"
//                         alt="delete"
//                         className={styles.deleteIconImage}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.quantityContainer}>
//                   <div>Quantity:</div>
//                   <div>{item.quantity}</div>
//                 </div>
//                 <div className={styles.priceContainer}>
//                   <div>Unit Price: ₹{item.details.price}</div>
//                   <div>
//   Total: ₹{Number(item.details.price) * Number(item.quantity) + 
//   (item.matchingHandbags ? item.matchingHandbags.reduce((sum, mh) => sum + (Number(mh.price) * Number(mh.quantity)), 0) : 0)}
// </div>
//                 </div>
//               </div>
//             </div>
//             {item.type === "giftBox" &&
//               item.matchingHandbags &&
//               item.matchingHandbags.length > 0 && (
//                 <div className={styles.matchingHandbagsSection}>
//                   <h3>Matching Handbags:</h3>
//                   {item.matchingHandbags.map((mh, idx) => (
//                     <div key={idx} className={styles.matchingHandbagItem}>
//                       <div className={styles.matchingItemRow}>
//                         <div className={styles.matchingImage}>
//                           <img
//                             src={mh.image}
//                             alt={mh.name}
//                             className={styles.orderImage}
//                           />
//                         </div>
//                         <div className={styles.matchingDetails}>
//                           <div>{mh.name}</div>
//                           <div>Qty: {mh.quantity}</div>
//                           <div>Unit Price: ₹{mh.price}</div>
//                           <div>
//                             Total: ₹{Number(mh.price) * Number(mh.quantity)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             {item.type === "handbag" && (
//               <div className={styles.priceContainer}>
//                 <div>Total: ₹{Number(item.details.price) * Number(item.quantity)}</div>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No items selected.</p>
//       )}
//       <div className={styles.promoContainer}>
//         <p className={styles.promoAppliedText}>Promo Code Applied: {promoCode}</p>
//         <div className={styles.promoSection}>
//           <input
//             type="text"
//             placeholder="Promo Code"
//             className={styles.promoInput}
//             value={promoCode}
//             readOnly
//           />
//           <button className={styles.applyButton}>Apply</button>
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
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default GiftBoxCartRight;





import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./giftBoxCartRight.module.css";
import { BASE_URL } from "../../../../Const/Const";
import Delete from "../giftBoxCartRight/Assets/icons8-delete.svg"
const GiftBoxCartRight = ({
  cartItems,         // Array of items: { type, details, quantity, matchingHandbags }
  basketTotal,       // Total price calculated from cart items
  additionalCharges, // Additional charges
  deliveryCharges,   // Delivery charges
  discount,          // Discount amount
  promoCode,         // Promo code applied
  handleEditBox,     // Callback to edit an item (id, type)
  handleDeleteBox,   // Callback to delete an item (id, type)
  onClearCart        // Callback to clear the cart (passed from the parent)
}) => {
  // State for modal popup (full-screen overlay)
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Function to fetch addresses using the provided logic
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;
      const response = await axios.get(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };

  // const handleConfirmOrder = async () => {
  //   if (!selectedAddress) {
  //     alert("Please select an address before confirming the order.");
  //     return;
  //   }
  


  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address before confirming the order.");
      return;
    }
  
    // Ensure every cart item has `details.quantity`
    const formattedCartItems = cartItems.map((item) => ({
      type: item.type,
      details: {
        name: item.details.name,
        price: item.details.price,
        quantity: item.quantity || 1,
        image: item.details.image,
      },
      matchingHandbags: item.matchingHandbags.map((mh) => ({
        name: mh.name,
        price: mh.price,
        quantity: mh.quantity || 1,
        image: mh.image,
      })),
    }));
  
    const orderData = {
      user: localStorage.getItem("userId"),
      cartItems: formattedCartItems,
      totalPrice: basketTotal,
      additionalCharges,
      deliveryCharges,
      discount,
      promoCode,
      address: selectedAddress,
    };
  
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${BASE_URL}/api/giftBoxOrderQueries/`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.data.success) {
        alert("Order has been placed! For more details, check your profile.");
        setShowAddressModal(false);
        onClearCart(); // ✅ Clears the cart after order placement
      } else {
        throw new Error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      alert(`Error creating order: ${error.message || "Something went wrong"}`);
    }
  };


  
  // Fetch addresses when the address modal is opened
  useEffect(() => {
    if (showAddressModal) {
      fetchAddresses();
    }
  }, [showAddressModal]);

  // Open the address modal on Checkout
  const openAddressModal = () => {
    setShowAddressModal(true);
  };

  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <h2 className={styles.orderTitle}>Your Order Summary</h2>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>

      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={`${item.id}_${item.type}`} className={styles.orderItem}>
            <div className={styles.orderItemRow}>
              <div className={styles.itemImage}>
                <img
                  src={item.details.image}
                  alt={item.details.name}
                  className={styles.orderImage}
                />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.topSection}>
                  <div className={styles.selectedBoxName}>
                    {item.details.name}
                  </div>
                  <div className={styles.icons}>
                    {/* <div
                      className={styles.editIcon}
                      onClick={() => handleEditBox(item.id, item.type)}
                    >
                      <img
                        src="/path/to/editIcon.png"
                        alt="edit"
                        className={styles.editIconImage}
                      />
                    </div> */}
                    <div
                      className={styles.deleteIcon}
                      onClick={() => handleDeleteBox(item.id, item.type)}
                    >
                      <img
                        src={Delete}
                        alt="delete"
                        className={styles.deleteIconImage}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.quantityContainer}>
                  <div>Quantity:</div>
                  <div>{item.quantity}</div>
                </div>
                <div className={styles.priceContainer}>
                  <div>Unit Price: ₹{item.details.price}</div>
                  <div>
                    Total: ₹
                    {Number(item.details.price) * Number(item.quantity) +
                      (item.matchingHandbags
                        ? item.matchingHandbags.reduce(
                            (sum, mh) =>
                              sum + Number(mh.price) * Number(mh.quantity),
                            0
                          )
                        : 0)}
                  </div>
                </div>
              </div>
            </div>
            {item.type === "giftBox" &&
              item.matchingHandbags &&
              item.matchingHandbags.length > 0 && (
                <div className={styles.matchingHandbagsSection}>
                  <h3>Matching Handbags:</h3>
                  {item.matchingHandbags.map((mh, idx) => (
                    <div key={idx} className={styles.matchingHandbagItem}>
                      <div className={styles.matchingItemRow}>
                        <div className={styles.matchingImage}>
                          <img
                            src={mh.image}
                            alt={mh.name}
                            className={styles.orderImage}
                          />
                        </div>
                        <div className={styles.matchingDetails}>
                          <div>{mh.name}</div>
                          <div>Qty: {mh.quantity}</div>
                          <div>Unit Price: ₹{mh.price}</div>
                          <div>
                            Total: ₹{Number(mh.price) * Number(mh.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))
      ) : (
        <p>No items selected.</p>
      )}

      <div className={styles.promoContainer}>
        <p className={styles.promoAppliedText}>
          Promo Code Applied: {promoCode}
        </p>
        <div className={styles.promoSection}>
          <input
            type="text"
            placeholder="Promo Code"
            className={styles.promoInput}
            value={promoCode}
            readOnly
          />
          <button className={styles.applyButton}>Apply</button>
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
      <button className={styles.checkoutButton} onClick={openAddressModal}>
        Checkout
      </button>

      {/* Full-screen Modal Popup for Address Selection */}
      {showAddressModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select Delivery Address</h3>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <label key={address.id} className={styles.addressOption}>
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <span>
                    {address.province}, {address.city}, {address.area},{" "}
                    {address.landmark}
                  </span>
                </label>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
            <button
              className={styles.confirmButton}
              onClick={handleConfirmOrder}
              disabled={!selectedAddress}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBoxCartRight;