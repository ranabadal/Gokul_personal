


// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./cateringForm.module.css";
// import CateringFormLeft from "./CateringFormLeft/cateringFormLeft";
// import OrderSummary from "./CateringFormRight/cateringFormRight";
// import AboveHeader from "../../../components/above_header/above_header";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";

// const CateringForm = () => {
//   const location = useLocation();

//   // Extract passed hall details from location.state
//   const { seatingCapacity, hallTitle, hallImage, hallPrice } = location.state || {};

//   const [guestCount, setGuestCount] = useState("");
//   const [selectedCart, setSelectedCart] = useState("");

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       <div className={styles.container}>
//         <CateringFormLeft
//           seatingCapacity={seatingCapacity}
//           guestCount={guestCount}
//           setGuestCount={setGuestCount}
//           selectedCart={selectedCart}
//           setSelectedCart={setSelectedCart}
//         />
//         <OrderSummary
//           hallTitle={hallTitle}
//           hallImage={hallImage}
//           guestCount={guestCount}
//           selectedCart={selectedCart}
//           hallPrice={hallPrice}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CateringForm;




// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./cateringForm.module.css";
// import CateringFormLeft from "./CateringFormLeft/cateringFormLeft";
// import OrderSummary from "./CateringFormRight/cateringFormRight";
// import AboveHeader from "../../../components/above_header/above_header";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";
// import PreviewScreen from "./PreviewScreen/previewScreen";
// import Popup from "./MenuPopUp/menuPopup";

// const CateringForm = () => {
//   const location = useLocation();

//   // Extract passed hall details
//   const { hallTitle, hallImage, seatingCapacity, hallPrice } = location.state || {};

//   // Define states for form inputs and preview data
//   const [occasion, setOccasion] = useState("");
//   const [guestCount, setGuestCount] = useState("");
//   const [selectedCart, setSelectedCart] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [preferredTimings, setPreferredTimings] = useState([]);
//   const [comments, setComments] = useState("");
//   const [menuPreferences, setMenuPreferences] = useState({});
//   const [showPreview, setShowPreview] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   // Menu prices
//   const menuPrices = {
//     Basic: 499,
//     Premium: 999,
//     Deluxe: 1499,
//     Royal: 1999,
//   };

//   // Calculate total cost
//   const totalCost =
//     guestCount && selectedCart
//       ? parseInt(guestCount, 10) * menuPrices[selectedCart]
//       : 0;

//   const handleCheckoutClick = () => {
//     setShowPreview(true); // Show preview screen
//   };

//   const handleMenuPopupSave = (preferences) => {
//     setMenuPreferences(preferences); // Save menu preferences
//     setShowPopup(false); // Close popup
//   };

//   const handleBackClick = () => {
//     setShowPreview(false); // Navigate back to form
//   };

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       {!showPreview ? (
//         <div className={styles.container}>
//           {/* Left Section */}
//           <CateringFormLeft
//             seatingCapacity={seatingCapacity}
//             occasion={occasion}
//             setOccasion={setOccasion}
//             guestCount={guestCount}
//             setGuestCount={setGuestCount}
//             selectedCart={selectedCart}
//             setSelectedCart={setSelectedCart}
//             menuPreferences={menuPreferences}
//             setMenuPreferences={setMenuPreferences}
//             selectedDates={selectedDates}
//             setSelectedDates={setSelectedDates}
//             preferredTimings={preferredTimings}
//             setPreferredTimings={setPreferredTimings}
//             comments={comments}
//             setComments={setComments}
//             onCustomize={() => setShowPopup(true)} // Show popup
//           />

//           {/* Popup */}
//           {showPopup && (
//             <Popup
//               selectedCart={selectedCart}
//               onClose={() => setShowPopup(false)} // Close popup
//               onSave={handleMenuPopupSave} // Save menu preferences
//             />
//           )}

//           {/* Right Section */}
//           <OrderSummary
//             hallTitle={hallTitle}
//             hallImage={hallImage}
//             hallPrice={hallPrice}
//             guestCount={guestCount}
//             selectedCart={selectedCart}
//             onCheckout={handleCheckoutClick} // Navigate to preview screen
//           />
//         </div>
//       ) : (
//         <PreviewScreen
//           hallTitle={hallTitle}
//           hallImage={hallImage}
//           occasion={occasion}
//           guestCount={guestCount}
//           selectedCart={selectedCart}
//           selectedDates={selectedDates}
//           preferredTimings={preferredTimings}
//           comments={comments}
//           menuPreferences={menuPreferences}
//           totalCost={totalCost}
//           onBack={handleBackClick} // Pass the callback to navigate back
//         />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default CateringForm;



// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./cateringForm.module.css";
// import CateringFormLeft from "./CateringFormLeft/cateringFormLeft";
// import OrderSummary from "./CateringFormRight/cateringFormRight";
// import AboveHeader from "../../../components/above_header/above_header";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";
// import PreviewScreen from "./PreviewScreen/previewScreen";
// import Popup from "./MenuPopUp/menuPopup";

// const CateringForm = () => {
//   const location = useLocation();

//   // Extract passed hall details
//   const { hallTitle, hallImage, seatingCapacity, hallPrice } = location.state || {};

//   // States for form inputs and preview data
//   const [occasion, setOccasion] = useState("");
//   const [guestCount, setGuestCount] = useState("");
//   const [selectedCart, setSelectedCart] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [preferredTimings, setPreferredTimings] = useState([]);
//   const [comments, setComments] = useState("");
//   const [menuPreferences, setMenuPreferences] = useState({});
//   const [isMenuCustomized, setIsMenuCustomized] = useState(false); // Track menu customization
//   const [showPreview, setShowPreview] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   // Menu prices
//   const menuPrices = {
//     Basic: 499,
//     Premium: 999,
//     Deluxe: 1499,
//     Royal: 1999,
//   };

//   // Calculate total cost
//   const totalCost =
//     guestCount && selectedCart
//       ? parseInt(guestCount, 10) * menuPrices[selectedCart]
//       : 0;

//       const handleCheckoutClick = () => {
//         console.log("Checking menu customization state:", isMenuCustomized);
//         if (!isMenuCustomized) {
//           alert("Please customize and save your menu before proceeding to checkout.");
//           return;
//         }
//         setShowPreview(true);
//       };

//   const handleMenuPopupSave = (isCustomized) => {
//     console.log("Menu customization received:", isCustomized);
//     setIsMenuCustomized(isCustomized); // Mark menu as customized
//   };


//   const handleBackClick = () => {
//     setShowPreview(false); // Navigate back to form
//   };

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       {!showPreview ? (
//         <div className={styles.container}>
//           {/* Left Section */}
//           <CateringFormLeft
//             seatingCapacity={seatingCapacity}
//             occasion={occasion}
//             setOccasion={setOccasion}
//             guestCount={guestCount}
//             setGuestCount={setGuestCount}
//             selectedCart={selectedCart}
//             setSelectedCart={setSelectedCart}
//             menuPreferences={menuPreferences}
//             setMenuPreferences={setMenuPreferences}
//             isMenuCustomized={isMenuCustomized}
//             setIsMenuCustomized={setIsMenuCustomized}
//             selectedDates={selectedDates}
//             setSelectedDates={setSelectedDates}
//             preferredTimings={preferredTimings}
//             setPreferredTimings={setPreferredTimings}
//             comments={comments}
//             setComments={setComments}
//             onCustomize={() => setShowPopup(true)} // Show popup
//           />

//           {/* Popup */}
//           {showPopup && (
//             <Popup
//               menuPreferences={menuPreferences}
//               setMenuPreferences={setMenuPreferences}
//               selectedCart={selectedCart}
//               onSave={handleMenuPopupSave} // Save menu preferences
//               onClose={() => setShowPopup(false)} // Close popup
//             />
//           )}

//           {/* Right Section */}
//           <OrderSummary
//             hallTitle={hallTitle}
//             hallImage={hallImage}
//             hallPrice={hallPrice}
//             guestCount={guestCount}
//             selectedCart={selectedCart}
//             onCheckout={handleCheckoutClick} // Navigate to preview screen
//           />
//         </div>
//       ) : (
//         <PreviewScreen
//           hallTitle={hallTitle}
//           hallImage={hallImage}
//           occasion={occasion}
//           guestCount={guestCount}
//           selectedCart={selectedCart}
//           selectedDates={selectedDates}
//           preferredTimings={preferredTimings}
//           comments={comments}
//           menuPreferences={menuPreferences}
//           totalCost={totalCost}
//           onBack={handleBackClick} // Pass the callback to navigate back
//         />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default CateringForm;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./cateringForm.module.css";
import CateringFormLeft from "./CateringFormLeft/cateringFormLeft";
import OrderSummary from "./CateringFormRight/cateringFormRight";
import AboveHeader from "../../../components/above_header/above_header";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import PreviewScreen from "./PreviewScreen/previewScreen";
import Popup from "./MenuPopUp/menuPopup";

const CateringForm = () => {
  const location = useLocation();
  const { hallTitle, hallImage, seatingCapacity, hallPrice } = location.state || {};

  // States for our form
  const [occasion, setOccasion] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [selectedCart, setSelectedCart] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [preferredTimings, setPreferredTimings] = useState([]);
  const [comments, setComments] = useState("");
  const [menuPreferences, setMenuPreferences] = useState({});
  const [isMenuCustomized, setIsMenuCustomized] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const menuPrices = {
    Basic: 499,
    Premium: 999,
    Deluxe: 1499,
    Royal: 1999,
  };

  const totalCost =
    guestCount && selectedCart
      ? parseInt(guestCount, 10) * menuPrices[selectedCart]
      : 0;

  const handleCheckoutClick = () => {
    console.log("Checking menu customization state:", isMenuCustomized);
    if (!isMenuCustomized) {
      alert("Please customize and save your menu before proceeding to checkout.");
      return;
    }
    setShowPreview(true);
  };

  const handleMenuPopupSave = (isCustomized) => {
    console.log("Menu customization received:", isCustomized);
    setIsMenuCustomized(isCustomized);
  };

  const handleBackClick = () => {
    setShowPreview(false);
  };

  return (
    <>
      <AboveHeader />
      <Header />
      {!showPreview ? (
        <div className={styles.container}>
          <CateringFormLeft
            seatingCapacity={seatingCapacity}
            occasion={occasion}
            setOccasion={setOccasion}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            selectedCart={selectedCart}
            setSelectedCart={setSelectedCart}
            menuPreferences={menuPreferences}
            setMenuPreferences={setMenuPreferences}
            isMenuCustomized={isMenuCustomized}
            setIsMenuCustomized={setIsMenuCustomized}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            preferredTimings={preferredTimings}
            setPreferredTimings={setPreferredTimings}
            comments={comments}
            setComments={setComments}
            onCustomize={() => setShowPopup(true)}
          />

{showPopup && (
  <Popup
    menuPreferences={menuPreferences}
    setMenuPreferences={setMenuPreferences}
    selectedCart={selectedCart}
    onSave={handleMenuPopupSave}
    onClose={() => setShowPopup(false)}
  />
)}

          <OrderSummary
            hallTitle={hallTitle}
            hallImage={hallImage}
            hallPrice={hallPrice}
            guestCount={guestCount}
            selectedCart={selectedCart}
            onCheckout={handleCheckoutClick}
          />
        </div>
      ) : (
        <PreviewScreen
          hallTitle={hallTitle}
          hallImage={hallImage}
          occasion={occasion}
          guestCount={guestCount}
          selectedCart={selectedCart}
          selectedDates={selectedDates}
          preferredTimings={preferredTimings}
          comments={comments}
          menuPreferences={menuPreferences}
          totalCost={totalCost}
          onBack={handleBackClick}
        />
      )}
      <Footer />
    </>
  );
};

export default CateringForm;