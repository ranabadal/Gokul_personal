import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./giftBoxAndBulkOrderCartTotal.module.css";

const OrderCard = ({ item, bulkQuantity, size }) => {
  const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
  console.log(`Item Size: ${item.size}, Price: ${item.productId.price}`);

  // Adjust price based on size
  const adjustedPrice = (() => {
    if (size === "500 gm") {
      return item.productId.price / 2; // Halve the price for 500 gm
    } else if (size === "2 kg") {
      return item.productId.price * 2; // Double the price for 2 kg
    }
    return item.productId.price; // Default price for 1 kg
  })();

  return (
    <div className={styles.orderItem}>
      {/* <img
        src={`data:${
          item.productId.image && item.productId.image.contentType
            ? item.productId.image.contentType
            : ""
        };base64,${
          item.productId.image && item.productId.image.data
            ? item.productId.image.data
            : ""
        }`}
        alt={item.productId.name}
        className={styles.itemImage}
      /> */}
      <img src={item.productId.image} alt={item.productId.name} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <h3 className={styles.itemTitle}>{item.productId.name}</h3>
        <p className={styles.itemQuantity}>
          ₹{adjustedPrice} × {quantity}
        </p>
        <p className={styles.itemPrice}>
          ₹{adjustedPrice * quantity}
        </p>
      </div>
    </div>
  );
};

export default function OrderSummary({
  cartItems = [],
  addresses,
  customTitle,
  customTotalHeading,
  showQuantityInput = false,
  onCheckout,
  size,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, discount, additionalCharges, deliveryCharges, quantity]);

  const calculateTotal = () => {
    // Count the number of checked items
    const checkedItems = cartItems.filter((item) => item.checked);
    // Calculate the total price for checked items
    const total = checkedItems.reduce((total, item) => {
      // Adjust price based on size
      const adjustedPrice =
        size === "500 gm"
          ? item.productId.price / 2
          : size === "2 kg"
          ? item.productId.price * 2
          : item.productId.price;
  
      // Use quantity for each individual item
      const itemQuantity = showQuantityInput ? quantity : item.quantity;
      return total + adjustedPrice * itemQuantity;
    }, 0);
    // Calculate the average price if there is more than one checked item
    const averagePrice =
      checkedItems.length > 1 ? total / checkedItems.length : total;
    // Apply additional charges, discounts, and delivery fees
    const adjustedTotal = 
      averagePrice - discount + additionalCharges + deliveryCharges;
  
    setBasketTotal(Math.round(adjustedTotal));
  };

  const handleApplyPromo = () => {
    if (promoCode === "badal2004") {
      setDiscount(500);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    if (cartItems.filter((item) => item.checked).length === 0) {
      alert("Please select at least one product before checkout!");
      return;
    }
    // Pass `quantity` and `basketTotal` to the `onCheckout` callback.
    onCheckout({ quantity, basketTotal });
  };

  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <h2 className={styles.orderTitle}>{customTitle || "Your Order"}</h2>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>
<div>Selected Box Size is {size}</div>
      {cartItems
        .filter((item) => item.checked)
        .map((item, index) => (
          <OrderCard
            key={index}
            item={item}
            size={size}
            bulkQuantity={showQuantityInput ? quantity : undefined}
          />
        ))}

      {showQuantityInput &&
        cartItems.filter((item) => item.checked).length > 0 && (
          <div className={styles.quantityContainer}>
            <label htmlFor="quantity" className={styles.quantityLabel}>
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className={styles.quantityInput}
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
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
          <span>{customTotalHeading || "Total"}</span> <span>₹{basketTotal}</span>
        </p>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout (
        {showQuantityInput
          ? cartItems && cartItems.some((item) => item.checked)
            ? 1
            : 0
          : cartItems && cartItems.filter((item) => item.checked).length}
        )
      </button>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./giftBoxAndBulkOrderCartTotal.module.css";
// const OrderCard = ({ item, bulkQuantity, size }) => {
//   const quantity = bulkQuantity !== undefined ? bulkQuantity : item.quantity;
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
//       <img src={item.productId.image} alt={item.productId.name} className={styles.itemImage} />
//       <div className={styles.itemDetails}>
//         <h3 className={styles.itemTitle}>{item.productId.name}</h3>
//         <p className={styles.itemQuantity}>₹{adjustedPrice} × {quantity}</p>
//         <p className={styles.itemPrice}>₹{adjustedPrice * quantity}</p>
//       </div>
//     </div>
//   );
// };
// export default function GiftBoxCartRight({ onCheckout }) {
//   const [selectedBoxes, setSelectedBoxes] = useState([]);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const storedBoxes = JSON.parse(localStorage.getItem("selectedBoxes")) || [];
//     setSelectedBoxes(storedBoxes);
//     calculateTotal(storedBoxes);
//   }, []);
//   const calculateTotal = (boxes) => {
//     const total = boxes.reduce((acc, box) => {
//       const boxTotal = box.basket.reduce((subTotal, item) => {
//         return subTotal + (item.productId.price * item.quantity);
//       }, 0);
//       return acc + boxTotal;
//     }, 0);
//     setBasketTotal(total);
//   };
//   const handleCheckout = () => {
//     if (selectedBoxes.length === 0) {
//       alert("Please select at least one box before checkout!");
//       return;
//     }
//     navigate("/previewScreen", { state: { selectedBoxes, totalPrice: basketTotal } });
//   };
//   return (
//     <div className={styles.orderSummary}>
//       <h2>Your Selected Boxes</h2>
//       {selectedBoxes.map((box, index) => (
//         <div key={index} className={styles.boxSummary}>
//           <h3>Box {index + 1} - {box.size}</h3>
//           {box.basket.map((item) => (
//             <OrderCard key={item.productId._id} item={item} size={box.size} />
//           ))}
//         </div>
//       ))}
//       <h3>Total Price: ₹{basketTotal}</h3>
//       <button onClick={handleCheckout} className={styles.checkoutButton}>
//         Checkout 🚀
//       </button>
//     </div>
//   );
// }