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
    refreshSummaryForm=true,
    setRefreshSummaryForm,
    handleCheckout,
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
    if(refreshSummaryForm){
        setStoredSelections(JSON.parse(localStorage.getItem("giftBoxSelections")) || []);
        setRefreshSummaryForm(false); // Reset the refresh flag
    }
  }, [refreshSummaryForm]); // ✅ Add an empty dependency array to prevent endless re-renders
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
      const boxTotal = (box.selectedGiftBox.price + sweetsTotal) * (box.quantity || 1); // ✅ Multiply by quantity
      return sum + boxTotal;
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
<div className={styles.quantityContainer}>
        <div>Quantity</div>
<div>{box.quantity || 0}</div>
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
