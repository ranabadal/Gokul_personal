


// import React, { useState, useEffect } from "react";
// import styles from "./cateringFormRight.module.css";

// const OrderCard = ({
//   hallTitle,
//   hallImage,
//   guestCount,
//   selectedCart,
//   pricePerPlate,
//   hallCateringTotal,
//   hallPrice,
// }) => {
//   const isFoodFreeHall = hallCateringTotal > 10000;

//   return (
//     <div className={styles.orderItem}>
//       <img
//         src={hallImage || "https://via.placeholder.com/150"}
//         alt={hallTitle || "Default Hall"}
//         className={styles.itemImage}
//       />
//       <div className={styles.itemDetails}>
//         <h3 className={styles.itemTitle}>{hallTitle || "No Hall Selected"}</h3>
//         <p className={styles.itemQuantity}>
//           {guestCount || 0} Guests × {selectedCart || "No Menu Selected"} (₹{pricePerPlate}/plate)
//         </p>
//         {isFoodFreeHall ? (
//           <p className={styles.itemNote}>
//             🎉 Food costs exceed ₹10,000! The hall is now <strong>FREE</strong>.
//           </p>
//         ) : (
//           <p className={styles.itemPrice}>₹{hallPrice}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default function OrderSummary({
//   hallTitle,
//   hallImage,
//   guestCount,
//   selectedCart,
//   hallPrice,
//   onCheckout,
// }) {
//   const [menuPrices, setMenuPrices] = useState({
//     Basic: 499,
//     Premium: 999,
//     Deluxe: 1499,
//     Royal: 1999,
//   });

//   const pricePerPlate =
//     selectedCart && menuPrices[selectedCart] ? menuPrices[selectedCart] : 0;

//   const hallCateringTotal =
//     guestCount && !isNaN(guestCount) ? parseInt(guestCount, 10) * pricePerPlate : 0;

//   const [basketTotal, setBasketTotal] = useState(0);
//   useEffect(() => {
//     const hallCost = hallCateringTotal > 10000 ? 0 : hallPrice;
//     const total = hallCateringTotal + hallCost;
//     setBasketTotal(total);
//   }, [hallCateringTotal, hallPrice]);

//   return (
//     <div className={styles.orderSummary}>
//       <div className={styles.hallSection}>
//         <OrderCard
//           hallTitle={hallTitle}
//           hallImage={hallImage}
//           guestCount={guestCount}
//           selectedCart={selectedCart}
//           pricePerPlate={pricePerPlate}
//           hallCateringTotal={hallCateringTotal}
//           hallPrice={hallPrice}
//         />
//       </div>
//       {/* <h2 className={styles.orderPrice}>₹{basketTotal}</h2> */}
//       <div className={styles.chargesSection}>
//       <p className={styles.chargeTotal}>
//         <span>Total (approx)</span> <span>₹{basketTotal}</span>
//          </p>
//      </div>
//       <button className={styles.checkoutButton} onClick={onCheckout}>
//         Checkout
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import styles from "./cateringFormRight.module.css";



const OrderCard = ({
  hallTitle,
  hallImage,
  guestCount,
  selectedCart,
  pricePerPlate,
  hallCateringTotal,
  hallPrice,
}) => {
  const isFoodFreeHall = hallCateringTotal > 10000;

  return (
    <div className={styles.orderItem}>
      <img
        src={hallImage || "https://via.placeholder.com/150"}
        alt={hallTitle || "Default Hall"}
        className={styles.itemImage}
      />
      <div className={styles.itemDetails}>
        <h3 className={styles.itemTitle}>{hallTitle || "No Hall Selected"}</h3>
        <p className={styles.itemQuantity}>
          {guestCount || 0} Guests × {selectedCart || "No Menu Selected"} (₹{pricePerPlate}/plate)
        </p>
        {isFoodFreeHall ? (
          <p className={styles.itemNote}>
            🎉 Food costs exceed ₹10,000! The hall is now <strong>FREE</strong>.
          </p>
        ) : (
          <p className={styles.itemPrice}>₹{hallPrice}</p>
        )}
      </div>
    </div>
  );
};

export default function OrderSummary({
  hallTitle,
  hallImage,
  guestCount,
  selectedCart,
  hallPrice,
  selectedDates,
  preferredTimings,
  onCheckout, // Callback that triggers when checkout is allowed
}) {
  // Set menu prices (could be fetched from an API)
  const [menuPrices, setMenuPrices] = useState({
    Silver: 580,
    Golden: 680,
    Platinum: 780,
    Royal: 1999,
  });

  // Calculate price per plate based on the selected menu
  const pricePerPlate =
    selectedCart && menuPrices[selectedCart] ? menuPrices[selectedCart] : 0;

  // Calculate total food cost based on guest count and price per plate
  const hallCateringTotal =
    guestCount && !isNaN(guestCount)
      ? parseInt(guestCount, 10) * pricePerPlate
      : 0;

  // Compute total basket cost. If food cost exceeds ₹10,000, hall price becomes free
  const [basketTotal, setBasketTotal] = useState(0);
  useEffect(() => {
    // If food cost exceeds ₹10,000 then hall is free (cost is 0), otherwise use hallPrice prop.
    const hallCost = hallCateringTotal > 10000 ? 0 : hallPrice;
    const total = hallCateringTotal + hallCost;
    setBasketTotal(total);
  }, [hallCateringTotal, hallPrice]);

  // Optional: Promo code logic can be added here.

  // Checkout Handler with required field validation.
  const handleCheckout = () => {
    // Validate required fields; modify these checks if your state can be empty differently.
    if (
      !guestCount ||
      guestCount.toString().trim() === "" ||
      !selectedCart ||
      selectedCart.trim() === "" 

    ) {
      alert("Please fill all required fields before checking out.");
      return;
    }
    // If all validations pass, trigger the parent's onCheckout callback.
    onCheckout();
  };

  return (
    <div className={styles.orderSummary}>
      <div className={styles.hallSection}>
        <OrderCard
          hallTitle={hallTitle}
          hallImage={hallImage}
          guestCount={guestCount}
          selectedCart={selectedCart}
          pricePerPlate={pricePerPlate}
          hallCateringTotal={hallCateringTotal}
          hallPrice={hallPrice}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.orderTitle}>Your Total</div>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>

      <div className={styles.chargesSection}>
        <p className={styles.chargeTotal}>
          <span>Total (approx)</span> <span>₹{basketTotal}</span>
        </p>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}