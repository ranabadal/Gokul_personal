// import React, { useState, useEffect } from "react";
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
//   const { hallTitle, hallImage, seatingCapacity, hallPrice } = location.state || {};

//   // Form states
//   const [occasion, setOccasion] = useState("");
//   const [guestCount, setGuestCount] = useState("");
//   const [selectedCart, setSelectedCart] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [preferredTimings, setPreferredTimings] = useState({ start: null, end: null });
//   const [comments, setComments] = useState("");
//   const [menuPreferences, setMenuPreferences] = useState({});
//   const [isMenuCustomized, setIsMenuCustomized] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [existingBookings, setExistingBookings] = useState([]);
//   const [error, setError] = useState(""); // ✅ Added error state here

//   const menuPrices = {
//     Silver: 580,
//     Golden: 680,
//     Platinum: 780,
//     Royal: 1999,
//   };

//   const totalCost =
//     guestCount && selectedCart ? parseInt(guestCount, 10) * menuPrices[selectedCart] : 0;

//   // ✅ Fetch hall bookings from backend API
//   useEffect(() => {
//     const fetchHallBookings = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch("http://localhost:8080/api/queries/", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch hall bookings.");

//         const data = await response.json();
//         setExistingBookings(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching hall bookings:", error);
//         setExistingBookings([]);
//       }
//     };

//     fetchHallBookings();
//   }, []);

//   // ✅ Ensure availability is checked when date/time updates & reset error when values change
//   useEffect(() => {
//     if (preferredTimings.start && preferredTimings.end && selectedDates.length > 0) {
//       console.log("🔄 Running hall availability check...");
//       checkHallAvailability();
//     }

//     setError(""); // ✅ Reset error when user updates date or time
//   }, [preferredTimings, selectedDates]);

//   const checkHallAvailability = () => {
//     if (!preferredTimings.start || !preferredTimings.end || selectedDates.length === 0) {
//       console.log("❌ Missing values: preferredTimings or selectedDates");
//       return;
//     }

//     const userSelectedDate = selectedDates[0]?.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
//     const userStart = new Date(`1970-01-01T${preferredTimings.start}`);
//     const userEnd = new Date(`1970-01-01T${preferredTimings.end}`);

//     if (!Array.isArray(existingBookings)) {
//       console.error("existingBookings is not an array:", existingBookings);
//       return;
//     }

//     const isHallBooked = existingBookings.some((booking) => {
//       const bookedDate = new Date(booking.selectedDates[0]).toISOString().split("T")[0];
//       const bookedStart = new Date(`1970-01-01T${booking.preferredTimings.start}`);
//       const bookedEnd = new Date(`1970-01-01T${booking.preferredTimings.end}`);

//       return (
//         booking.hallTitle === hallTitle &&
//         bookedDate === userSelectedDate &&
//         bookedStart < userEnd &&
//         bookedEnd > userStart
//       );
//     });

//     setError(isHallBooked ? `🚫 ${hallTitle} is already booked for this date and time.` : "");
//   };

//   const handleCheckoutClick = () => {
//     console.log("Checking menu customization state:", isMenuCustomized);
//     if (!isMenuCustomized) {
//       alert("Please customize and save your menu before proceeding to checkout.");
//       return;
//     }
//     setShowPreview(true);
//   };

//   const handleMenuPopupSave = (isCustomized) => {
//     console.log("Menu customization received:", isCustomized);
//     setIsMenuCustomized(isCustomized);
//   };

//   const handleBackClick = () => {
//     setShowPreview(false);
//   };

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       {!showPreview ? (
//         <div className={styles.container}>
//           <CateringFormLeft
//             hallTitle={hallTitle}
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
//             existingBookings={existingBookings} // ✅ Pass fetched booking data
//             error={error} // ✅ Pass error message to CateringFormLeft
//             onCustomize={() => setShowPopup(true)}
//           />

//           {showPopup && (
//             <Popup
//               menuPreferences={menuPreferences}
//               setMenuPreferences={setMenuPreferences}
//               selectedCart={selectedCart}
//               onSave={handleMenuPopupSave}
//               onClose={() => setShowPopup(false)}
//             />
//           )}

//           <OrderSummary
//             hallTitle={hallTitle}
//             hallImage={hallImage}
//             hallPrice={hallPrice}
//             guestCount={guestCount}
//             selectedCart={selectedCart}
//             onCheckout={handleCheckoutClick}
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
//           onBack={handleBackClick}
//         />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default CateringForm;

import React, { useState, useEffect } from "react";
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
  // const { hallTitle, hallImages, seatingCapacity, hallPrice } = location.state || {};
  const { hallTitle, hallImages = [], seatingCapacity, hallPrice } = location.state || {};
  // Form states
  const [occasion, setOccasion] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [selectedCart, setSelectedCart] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // ⬅️ Changed from array to single date
  const [preferredTimings, setPreferredTimings] = useState({ start: null, end: null });
  const [comments, setComments] = useState("");
  const [menuPreferences, setMenuPreferences] = useState({});
  const [isMenuCustomized, setIsMenuCustomized] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);
  const [error, setError] = useState("");
 const [menuPrices, setMenuPrices] = useState({});


  useEffect(() => {
     fetchMenuNames();
   }, []);


 const fetchMenuNames = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/menuCart"); // ✅ Replace with your API URL
    if (!res.ok) throw new Error("Failed to fetch menu names");
    const data = await res.json();

    // ✅ Convert API response into a price mapping
    const prices = {};
    data.forEach((menu) => {
      prices[menu.menuName] = menu.price;
    });

    setMenuPrices(prices);
    
  } catch (error) {
    console.error("❌ Error fetching menu names:", error);
   
  }
};


  const totalCost =
    guestCount && selectedCart ? parseInt(guestCount, 10) * menuPrices[selectedCart] : hallPrice;

  useEffect(() => {
    const fetchHallBookings = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/api/queries/", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch hall bookings.");

        const data = await response.json();
        setExistingBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching hall bookings:", error);
        setExistingBookings([]);
      }
    };

    fetchHallBookings();
  }, []);

  useEffect(() => {
    if (preferredTimings.start && preferredTimings.end && selectedDate) {
      checkHallAvailability();
    }
    setError("");
  }, [preferredTimings, selectedDate]);

  const checkHallAvailability = () => {
    if (!preferredTimings.start || !preferredTimings.end || !selectedDate) return;

    const userSelectedDate = selectedDate.toISOString().split("T")[0];
    const userStart = new Date(`1970-01-01T${preferredTimings.start}`);
    const userEnd = new Date(`1970-01-01T${preferredTimings.end}`);

    const isHallBooked = existingBookings.some((booking) => {
      const bookedDate = new Date(booking.selectedDates[0]).toISOString().split("T")[0];
      const bookedStart = new Date(`1970-01-01T${booking.preferredTimings.start}`);
      const bookedEnd = new Date(`1970-01-01T${booking.preferredTimings.end}`);

      return (
        booking.hallTitle === hallTitle &&
        bookedDate === userSelectedDate &&
        bookedStart < userEnd &&
        bookedEnd > userStart
      );
    });

    setError(isHallBooked ? `🚫 ${hallTitle} is already booked for this date and time.` : "");
  };

  const handleCheckoutClick = () => {
    if (!isMenuCustomized) {
      alert("Please customize and save your menu before proceeding to checkout.");
      return;
    }
    setShowPreview(true);
  };

  const handleMenuPopupSave = (isCustomized) => {
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
            hallTitle={hallTitle}
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
            selectedDate={selectedDate} // ⬅️ Pass single date
            setSelectedDate={setSelectedDate}
            preferredTimings={preferredTimings}
            setPreferredTimings={setPreferredTimings}
            comments={comments}
            setComments={setComments}
            existingBookings={existingBookings}
            error={error}
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
            // hallImage={hallImage}
            hallImage={hallImages.length > 0 ? hallImages[0] : null}
            hallImages={hallImages}
            hallPrice={hallPrice}
            guestCount={guestCount}
            selectedCart={selectedCart}
            onCheckout={handleCheckoutClick}
          />
        </div>
      ) : (
        <PreviewScreen
        hallPrice={hallPrice}
          hallTitle={hallTitle}
hallImages={hallImages}
          occasion={occasion}
          guestCount={guestCount}
          selectedCart={selectedCart}
          selectedDates={[selectedDate]} // ⬅️ wrap single date in array if needed downstream
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
