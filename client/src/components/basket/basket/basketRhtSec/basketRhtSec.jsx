
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./basketRhtsec.module.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary
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
      const response = await axios.post(`${BASE_URL}/api/takeawayOrders/checkout`, {
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
