


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
//   selectedDates,
//   preferredTimings,
//   onCheckout, // Callback that triggers when checkout is allowed
// }) {
//   // Set menu prices (could be fetched from an API)
//   const [menuPrices, setMenuPrices] = useState({
//     Silver: 580,
//     Golden: 680,
//     Platinum: 780,
//     Royal: 1999,
//   });

//   // Calculate price per plate based on the selected menu
//   const pricePerPlate =
//     selectedCart && menuPrices[selectedCart] ? menuPrices[selectedCart] : 0;

//   // Calculate total food cost based on guest count and price per plate
//   const hallCateringTotal =
//     guestCount && !isNaN(guestCount)
//       ? parseInt(guestCount, 10) * pricePerPlate
//       : 0;

//   // Compute total basket cost. If food cost exceeds ₹10,000, hall price becomes free
//   const [basketTotal, setBasketTotal] = useState(0);
//   useEffect(() => {
//     // If food cost exceeds ₹10,000 then hall is free (cost is 0), otherwise use hallPrice prop.
//     const hallCost = hallCateringTotal > 10000 ? 0 : hallPrice;
//     const total = hallCateringTotal + hallCost;
//     setBasketTotal(total);
//   }, [hallCateringTotal, hallPrice]);

//   // Optional: Promo code logic can be added here.

//   // Checkout Handler with required field validation.
//   const handleCheckout = () => {
//     // Validate required fields; modify these checks if your state can be empty differently.
//     if (
//       !guestCount ||
//       guestCount.toString().trim() === "" ||
//       !selectedCart ||
//       selectedCart.trim() === "" 

//     ) {
//       alert("Please fill all required fields before checking out.");
//       return;
//     }
//     // If all validations pass, trigger the parent's onCheckout callback.
//     onCheckout();
//   };

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
//       <div className={styles.header}>
//         <div className={styles.orderTitle}>Your Total</div>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>Total (approx)</span> <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       <button className={styles.checkoutButton} onClick={handleCheckout}>
//         Checkout
//       </button>
//     </div>
//   );
// }

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
//   const isFoodFreeHall = hallPrice === hallCateringTotal || hallCateringTotal > hallPrice; // ✅ Updated condition

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
//             🎉 Food costs exceed ₹{hallPrice}! The hall is now <strong>FREE</strong>.
//           </p>
//         ) : (
//           <p className={styles.itemPrice}>₹{hallPrice}</p>
//         )}
//       </div>
//     </div>
//   );
// };



// const ImageSlider = ({ hallImages }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % hallImages.length); // ✅ Auto-slide images
//     }, 3000); // ✅ Change image every 3 seconds

//     return () => clearInterval(interval); // ✅ Cleanup interval on unmount
//   }, [hallImages.length]);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? hallImages.length - 1 : prevIndex - 1));
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % hallImages.length);
//   };

//   return (
//     <div className={styles.imageSlider}>
//       {hallImages.length > 0 && (
//         <>
//           <img className={styles.sliderImage} src={hallImages[currentIndex]} alt="Hall Image" />
//           <div className={styles.navigationButtons}>
//             <button onClick={goToPrevious} className={styles.prevButton}>◀</button>
//             <button onClick={goToNext} className={styles.nextButton}>▶</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default function OrderSummary({
//   hallTitle,
//   hallImage,
//   hallImages = [],
//   guestCount,
//   selectedCart,
//   hallPrice,
//   selectedDates,
//   preferredTimings,
//   onCheckout,
// }) {
//   const [menuPrices, setMenuPrices] = useState({});
//   const [loadingMenus, setLoadingMenus] = useState(true);

//   useEffect(() => {
//     fetchMenuNames();
//   }, []);

//   const fetchMenuNames = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/menuCart");
//       if (!res.ok) throw new Error("Failed to fetch menu names");
//       const data = await res.json();

//       const prices = {};
//       data.forEach((menu) => {
//         prices[menu.menuName] = menu.price;
//       });

//       setMenuPrices(prices);
//       setLoadingMenus(false);
//     } catch (error) {
//       console.error("❌ Error fetching menu names:", error);
//       setLoadingMenus(false);
//     }
//   };

//   const pricePerPlate = selectedCart && menuPrices[selectedCart] ? menuPrices[selectedCart] : 0;
//   const hallCateringTotal = guestCount && !isNaN(guestCount) ? parseInt(guestCount, 10) * pricePerPlate : 0;

//   const [basketTotal, setBasketTotal] = useState(0);
//   useEffect(() => {
//     const hallCost = hallCateringTotal >= hallPrice ? 0 : hallPrice;
//     setBasketTotal(hallCateringTotal + hallCost);
//   }, [hallCateringTotal, hallPrice]);

//   const handleCheckout = () => {
//     if (!guestCount || guestCount.toString().trim() === "" || !selectedCart || selectedCart.trim() === "") {
//       alert("Please fill all required fields before checking out.");
//       return;
//     }
//     onCheckout();
//   };

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

//       <div className={styles.header}>
//         <div className={styles.orderTitle}>Your Total</div>
//         <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
//       </div>

//       <div className={styles.chargesSection}>
//         <p className={styles.chargeTotal}>
//           <span>Total (approx)</span> <span>₹{basketTotal}</span>
//         </p>
//       </div>

//       {loadingMenus ? <p>Loading menu options...</p> : null}

//       <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>

//       {/* ✅ Hall Image Slider Below Checkout */}
//       <ImageSlider hallImages={Array.isArray(hallImages) ? hallImages : []} />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import styles from "./cateringFormRight.module.css";

// Single Hall Summary Card
const OrderCard = ({
  hallTitle,
  hallImage,
  guestCount,
  selectedCart,
  pricePerPlate,
  hallCateringTotal,
  hallPrice,
}) => {
  const isFoodFreeHall = hallCateringTotal >= hallPrice;

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
            🎉 Food cost exceeds ₹{hallPrice}! Hall is now <strong>FREE</strong>.
          </p>
        ) : (
          <p className={styles.itemPrice}>₹{hallPrice}</p>
        )}
      </div>
    </div>
  );
};

// Slider for multiple hall images
const ImageSlider = ({ hallImages = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!hallImages.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hallImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hallImages]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? hallImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hallImages.length);
  };

  if (!hallImages.length) {
    return (
      <div className={styles.imageSlider}>
        <img
          className={styles.sliderImage}
          src="https://via.placeholder.com/400x300?text=No+Image+Available"
          alt="No Images"
        />
      </div>
    );
  }

  return (
    <div className={styles.imageSlider}>
      <img
        className={styles.sliderImage}
        src={hallImages[currentIndex]}
        alt={`Hall ${currentIndex + 1}`}
      />
      <div className={styles.navigationButtons}>
        <button onClick={goToPrevious} className={styles.prevButton}>◀</button>
        <button onClick={goToNext} className={styles.nextButton}>▶</button>
      </div>
    </div>
  );
};

// Main Order Summary
export default function OrderSummary({
  hallTitle,
  hallImage,
  hallImages = [],
  guestCount,
  selectedCart,
  hallPrice,
  selectedDates,
  preferredTimings,
  onCheckout,
}) {
  const [menuPrices, setMenuPrices] = useState({});
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [basketTotal, setBasketTotal] = useState(0);

  useEffect(() => {
    fetchMenuPrices();
  }, []);

  const fetchMenuPrices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/menuCart");
      if (!res.ok) throw new Error("Failed to fetch menu names");
      const data = await res.json();

      const prices = data.reduce((acc, menu) => {
        acc[menu.menuName] = menu.price;
        return acc;
      }, {});

      setMenuPrices(prices);
    } catch (error) {
      console.error("❌ Error fetching menu names:", error);
    } finally {
      setLoadingMenus(false);
    }
  };

  const pricePerPlate = selectedCart && menuPrices[selectedCart] ? menuPrices[selectedCart] : 0;
  const hallCateringTotal = guestCount && !isNaN(guestCount) ? parseInt(guestCount, 10) * pricePerPlate : 0;

  useEffect(() => {
    const hallCost = hallCateringTotal >= hallPrice ? 0 : hallPrice;
    setBasketTotal(hallCateringTotal + hallCost);
  }, [hallCateringTotal, hallPrice]);

  const handleCheckout = () => {
    if (!guestCount || !selectedCart) {
      alert("Please fill all required fields before checking out.");
      return;
    }
    onCheckout();
  };

  return (
    <div className={styles.orderSummary}>
      {/* Hall Selection Summary */}
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

      {/* Order Total Section */}
      <div className={styles.header}>
        <div className={styles.orderTitle}>Your Total</div>
        <h2 className={styles.orderPrice}>₹{basketTotal}</h2>
      </div>

      {/* Charges */}
      <div className={styles.chargesSection}>
        <p className={styles.chargeTotal}>
          <span>Total (approx)</span> <span>₹{basketTotal}</span>
        </p>
      </div>

      {loadingMenus && <p>Loading menu options...</p>}

      {/* Checkout Button */}
      <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>

      {/* Hall Image Carousel */}
      <ImageSlider hallImages={Array.isArray(hallImages) ? hallImages : []} />
    </div>
  );
}
