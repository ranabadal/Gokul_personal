// import React,{useEffect} from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

// const CateringFormLeft = ({
//   hallTitle,
//   seatingCapacity,
//   guestCount,
//   setGuestCount,
//   occasion,
//   setOccasion,
//   selectedDates,
//   setSelectedDates,
//   preferredTimings,
//   setPreferredTimings,
//   menuPreferences = {},
//   comments,
//   setComments,
//   selectedCart,
//   setSelectedCart,
//   setMenuPreferences,
//   existingBookings,
//   isMenuCustomized, // read customization state
//   setIsMenuCustomized, // update customization state
// }) => {
//   const [error, setError] = React.useState("");

//   const [showPopup, setShowPopup] = React.useState(false);

//   // Handle guest input change
//   const handleGuestInputChange = (event) => {
//     const value = event.target.value.replace(/[^0-9]/g, "");
//     setGuestCount(value);

//     if (value > seatingCapacity) {
//       setError(`Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
//   };


//   const validateForm = () => {
//     if (!preferredTimings.start || !preferredTimings.end || selectedDates.length === 0) {
//       setError(""); // Don't show booking error if inputs are incomplete
//       return;
//     }
  
//     const isBooked = checkHallAvailability();
  
//     if (isBooked) {
//       setError(`🚫 ${hallTitle} is already booked for this date and time.`);
//     } else {
//       setError(""); // Clear error if available
//     }
//   };
  


//   const checkHallAvailability = () => {
//     if (!preferredTimings.start || !preferredTimings.end || selectedDates.length === 0) {
//       console.log("❌ Missing values: preferredTimings or selectedDates");
//       return false;
//     }
  
//     console.log("🔄 Checking availability for:", hallTitle);
//     console.log("Selected Dates:", selectedDates);
//     console.log("Preferred Timings:", preferredTimings);
//     console.log("Existing Bookings:", existingBookings);
  
//     const userSelectedDate = selectedDates[0]?.toISOString().split("T")[0]; 
//     const userStart = new Date(`1970-01-01T${preferredTimings.start}`);
//     const userEnd = new Date(`1970-01-01T${preferredTimings.end}`);
  
//     if (!Array.isArray(existingBookings)) {
//       console.error("❌ existingBookings is not an array:", existingBookings);
//       return false;
//     }
  
//     const isHallBooked = existingBookings.some((booking) => {
//       const bookedDate = new Date(booking.selectedDates[0]).toISOString().split("T")[0];
//       const bookedStart = new Date(`1970-01-01T${booking.preferredTimings.start}`);
//       const bookedEnd = new Date(`1970-01-01T${booking.preferredTimings.end}`);
  
//       console.log("🔎 Comparing with booked hall:", booking.hallTitle, bookedDate, bookedStart, bookedEnd);
  
//       return (
//         booking.hallTitle === hallTitle &&
//         bookedDate === userSelectedDate &&
//         bookedStart < userEnd &&
//         bookedEnd > userStart
//       );
//     });
  
//     console.log("⏳ Is Hall Already Booked?", isHallBooked);
  
//     return isHallBooked;
//   };


//   useEffect(() => {
//     validateForm();
//   }, [preferredTimings, selectedDates, existingBookings]);
//    // ✅ Re-run when any of these values change

//   // Handle occasion change
//   const handleOccasionChange = (event) => {
//     setOccasion(event.target.value);
//   };

//   // Handle date selection/deselection
//   const handleDateChange = (date) => {
//     const isAlreadySelected = selectedDates.find(
//       (d) => d.getTime() === date.getTime()
//     );
//     if (isAlreadySelected) {
//       setSelectedDates(
//         selectedDates.filter((d) => d.getTime() !== date.getTime())
//       );
//     } else {
//       setSelectedDates([...selectedDates, date]);
//     }
//   };

//   // Handle preferred timings change
//   const handlePreferredTimingsChange = (event) => {
//     const value = event.target.value;
//     setPreferredTimings((prev) =>
//       prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
//     );
//   };

//   // Handle comments input (optional)
//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   // Demo booked dates—feel free to adjust
//   const bookedDates = [
//     new Date(2025, 2, 21),
//     new Date(2025, 2, 22),
//     new Date(2025, 2, 25),
//   ];

//   // Disable booked dates
//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   // Handle cart selection; also resets customization state if the cart changes
//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? "" : cartName
//     );
//     setIsMenuCustomized(false);
//   };

//   // Close popup
//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   // Handle menu customization (open popup)
//   const handleMenuCustomization = () => {
//     setIsMenuCustomized(false);
//     setShowPopup(true);
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>

//       {/* Form Fields */}
//       <div className={styles.fields}>
//         {/* Occasion */}
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="occasion"
//             placeholder="Occasion"
//             value={occasion}
//             onChange={handleOccasionChange}
//             required
//           />
//           <img src={ocassion} alt="Occasion Icon" className={styles.icon} />
//         </div>

//         {/* Guest Count */}
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="guests"
//             placeholder={`No. of Guests (Max ${seatingCapacity})`}
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="Guests Icon" className={styles.icon} />
//           {error && <div className={styles.error}>{error}</div>}
//         </div>

//         {/* {error && <div className={styles.error}>{error}</div>} */}
//       </div>

//       {/* Menu Cart Section */}
//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
//         <div className={styles.carts}>
//           {["Silver", "Golden", "Platinum", "Royal"].map((menuName) => (
//             <MenuCart
//               key={menuName}
//               menuName={menuName}
//               description={`Menu description for ${menuName}`}
//               price={`₹ ${
//                 menuName === "Silver"
//                   ? 580
//                   : menuName === "Golden"
//                   ? 680
//                   : menuName === "Platinum"
//                   ? 780
//                   : 1999
//               }/Plate`}
//               menuImage={menu}
//               isSelected={selectedCart === menuName}
//               onSelect={() => handleCartSelection(menuName)}
//             />
//           ))}
//         </div>
//         {/* Display inline error if no menu is selected */}
//         {!selectedCart && (
//           <p className={styles.error}>
//             Please select a buffet plan And Cutomize it as per your
//             Requirements.
//           </p>
//         )}
//         <button
//           className={styles.heroSecButton}
//           onClick={handleMenuCustomization}
//         >
//           Customize
//         </button>
//       </div>

//       {/* Calendar Section */}
//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.eventTimeAndDateContainer}>
//           <div className={styles.calendar}>
//             <Calendar
//               className={styles.customCalendar}
//               onChange={handleDateChange}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//             />
//           </div>


// <label>Preferred Delivery Time:</label>
// <div className={styles.timeSelection}>
// <input
//   type="time"
//   value={preferredTimings.start || ""}
//   onChange={(e) =>
//     setPreferredTimings((prev) => ({
//       ...prev,
//       start: e.target.value,
//     }))
//   }
//   className={styles.timeInput}
// />

// <input
//   type="time"
//   value={preferredTimings.end || ""}
//   onChange={(e) =>
//     setPreferredTimings((prev) => ({
//       ...prev,
//       end: e.target.value,
//     }))
//   }
//   className={styles.timeInput}
// />

// </div>

// {/* ✅ Validation for missing dates and timings */}
// <div className={styles.errorContainer}>
//   {selectedDates.length === 0 && (
//     <p className={styles.error}>Please select at least one date.</p>
//   )}
  
//   {(!preferredTimings.start || !preferredTimings.end) && (
//     <p className={styles.error}>Please select a valid preferred timing range.</p>
//   )}

//   {/* ✅ Warning for exceeding 3 hours */}
//   {preferredTimings.start && preferredTimings.end && (() => {
//     const startTime = new Date(`1970-01-01T${preferredTimings.start}`);
//     const endTime = new Date(`1970-01-01T${preferredTimings.end}`);
//     const durationHours = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours

//     return durationHours > 3 ? (
//       <p className={styles.error}>
//         ⏳ Your selected duration exceeds **3 hours**. Additional charges apply per extra hour.
//       </p>
//     ) : null;
//   })()}
// </div>
//       </div>
//       </div>
//       {error && <p className={styles.error}>{error}</p>}

//       {/* Comments Section (Optional) */}
//       <textarea
//         className={styles.textarea}
//         placeholder="Add comments/ concerns (optional)"
//         value={comments}
//         onChange={handleCommentsChange}
//       />

//       {/* Popup for customizing menu */}
//       {showPopup && selectedCart && (
//         <Popup
//           menuPreferences={menuPreferences}
//           setMenuPreferences={setMenuPreferences}
//           selectedCart={selectedCart}
//           onClose={handlePopupClose}
//           setIsMenuCustomized={setIsMenuCustomized}
//         />
//       )}
//     </div>
//   );
// };

// export default CateringFormLeft;


// import React,{useState, useEffect} from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; 
// import axios from "axios"; // Import axios for API calls

// const CateringFormLeft = ({
//   hallTitle,
//   seatingCapacity,
//   guestCount,
//   setGuestCount,
//   occasion,
//   setOccasion,
//   selectedDate,
//   setSelectedDate,
//   preferredTimings,
//   setPreferredTimings,
//   menuPreferences = {},
//   comments,
//   setComments,
//   selectedCart,
//   setSelectedCart,
//   setMenuPreferences,
//   existingBookings,
//   isMenuCustomized,
//   setIsMenuCustomized,
// }) => {
//   const [error, setError] = React.useState("");
//   const [showPopup, setShowPopup] = React.useState(false);
//  const [menus, setMenus] = useState([]);
 
 
//    useEffect(() => {
//      fetchMenus();
//    }, []);


//    const fetchMenus = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/menuCart");
//       setMenus(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching menus:", error);
//     }
//   };


//   const handleGuestInputChange = (event) => {
//     const value = event.target.value.replace(/[^0-9]/g, "");
//     setGuestCount(value);
//     if (value > seatingCapacity) {
//       setError(`Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
//   };

//   const validateForm = () => {
//     if (!preferredTimings.start || !preferredTimings.end || !selectedDate) {
//       setError("");
//       return;
//     }
//     const isBooked = checkHallAvailability();
//     if (isBooked) {
//       setError(`🚫 ${hallTitle} is already booked for this date and time.`);
//     } else {
//       setError("");
//     }
//   };


//   const checkHallAvailability = () => {
//     if (!preferredTimings.start || !preferredTimings.end || !selectedDate) {
//       return false;
//     }
  
//     const userSelectedDate = selectedDate.toISOString().split("T")[0];
//     const userStart = new Date(`1970-01-01T${preferredTimings.start}`);
//     const userEnd = new Date(`1970-01-01T${preferredTimings.end}`);
  
//     return existingBookings?.some((booking) => {
//       const bookingDate = new Date(booking.selectedDates[0]).toISOString().split("T")[0];
  
//       if (booking.hallTitle !== hallTitle || bookingDate !== userSelectedDate) {
//         return false; // Not the same hall or not the same date, so skip
//       }
  
//       const bookedStart = new Date(`1970-01-01T${booking.preferredTimings.start}`);
//       const bookedEnd = new Date(`1970-01-01T${booking.preferredTimings.end}`);
  
//       // Check for actual time overlap
//       const timeOverlap = bookedStart < userEnd && bookedEnd > userStart;
//       return timeOverlap;
//     });
//   };
  

//   useEffect(() => {
//     validateForm();
//   }, [preferredTimings, selectedDate, existingBookings]);

//   const handleOccasionChange = (event) => {
//     setOccasion(event.target.value);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handlePreferredTimingsChange = (event) => {
//     const value = event.target.value;
//     setPreferredTimings((prev) =>
//       prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
//     );
//   };

//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   const bookedDates = [
//     new Date(2025, 2, 21),
//     new Date(2025, 2, 22),
//     new Date(2025, 2, 25),
//   ];

//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? "" : cartName
//     );
//     setIsMenuCustomized(false);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   const handleMenuCustomization = () => {
//     setIsMenuCustomized(false);
//     setShowPopup(true);
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>
//       <div className={styles.fields}>
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="occasion"
//             placeholder="Occasion"
//             value={occasion}
//             onChange={handleOccasionChange}
//             required
//           />
//           <img src={ocassion} alt="Occasion Icon" className={styles.icon} />
//         </div>

//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="guests"
//             placeholder={`No. of Guests (Max ${seatingCapacity})`}
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="Guests Icon" className={styles.icon} />
//           {error && <div className={styles.error}>{error}</div>}
//         </div>
//       </div>

//       <div className={styles.heroSec}>


// <div className={styles.heroSecHeading}>Choose Your Buffet Plan</div>

// <div className={styles.carts}>
//   {menus.length > 0 ? (
//     menus.map((menu) => (
//       <MenuCart
//         key={menu._id}
//         menuName={menu.menuName}
//         description={menu.description}
//         price={`₹${menu.price}/Plate`}
//         menuImage={menu.menuImage}
//         isSelected={selectedCart === menu.menuName}
//         onSelect={() => handleCartSelection(menu.menuName)}
//       />
//     ))
//   ) : (
//     <p className={styles.error}>No buffet plans available. Please check back later.</p>
//   )}
// </div>

// {!selectedCart && (
//   <p className={styles.error}>
//     Please select a buffet plan and customize it as per your requirements.
//   </p>
// )}

// <button className={styles.heroSecButton} onClick={handleMenuCustomization}>
//   Customize
// </button>

// </div>

//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.eventTimeAndDateContainer}>
//           <div className={styles.calendar}>
//             <Calendar
//               className={styles.customCalendar}
//               onChange={handleDateChange}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//               value={selectedDate}
//             />
//           </div>

//           <label>Preferred Delivery Time:</label>
//           <div className={styles.timeSelection}>
//             <input
//               type="time"
//               value={preferredTimings.start || ""}
//               onChange={(e) =>
//                 setPreferredTimings((prev) => ({
//                   ...prev,
//                   start: e.target.value,
//                 }))
//               }
//               className={styles.timeInput}
//             />

//             <input
//               type="time"
//               value={preferredTimings.end || ""}
//               onChange={(e) =>
//                 setPreferredTimings((prev) => ({
//                   ...prev,
//                   end: e.target.value,
//                 }))
//               }
//               className={styles.timeInput}
//             />
//           </div>

//           <div className={styles.errorContainer}>
//             {!selectedDate && (
//               <p className={styles.error}>Please select a date.</p>
//             )}

//             {(!preferredTimings.start || !preferredTimings.end) && (
//               <p className={styles.error}>Please select a valid preferred timing range.</p>
//             )}

//             {preferredTimings.start && preferredTimings.end && (() => {
//               const startTime = new Date(`1970-01-01T${preferredTimings.start}`);
//               const endTime = new Date(`1970-01-01T${preferredTimings.end}`);
//               const durationHours = (endTime - startTime) / (1000 * 60 * 60);
//               return durationHours > 3 ? (
//                 <p className={styles.error}>
//                   ⏳ Your selected duration exceeds <strong>3 hours</strong>. Additional charges apply per extra hour.
//                 </p>
//               ) : null;
//             })()}
//           </div>
//         </div>
//       </div>

//       {error && <p className={styles.error}>{error}</p>}

//       <textarea
//         className={styles.textarea}
//         placeholder="Add comments/ concerns (optional)"
//         value={comments}
//         onChange={handleCommentsChange}
//       />

//       {showPopup && selectedCart && (
//         <Popup
//           menuPreferences={menuPreferences}
//           setMenuPreferences={setMenuPreferences}
//           selectedCart={selectedCart}
//           onClose={handlePopupClose}
//           setIsMenuCustomized={setIsMenuCustomized}
//         />
//       )}
//     </div>
//   );
// };

// export default CateringFormLeft;


// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup";
// import axios from "axios";

// const CateringFormLeft = ({
//   hallTitle,
//   seatingCapacity,
//   guestCount,
//   setGuestCount,
//   occasion,
//   setOccasion,
//   selectedDate,
//   setSelectedDate,
//   preferredTimings,
//   setPreferredTimings,
//   menuPreferences = {},
//   comments,
//   setComments,
//   selectedCart,
//   setSelectedCart,
//   setMenuPreferences,
//   existingBookings,
//   isMenuCustomized,
//   setIsMenuCustomized,
// }) => {
//   const [error, setError] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     fetchMenus();
//   }, []);

//   const fetchMenus = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/menuCart");
//       setMenus(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching menus:", error);
//     }
//   };

//   const getActiveMenus = (guestCount) => {
//     if (guestCount <= 20) {
//       return ["Buffet Menu"];
//     } else if (guestCount > 20 && guestCount <= 40) {
//       return ["Buffet Menu", "Chinese Buffet"];
//     } else if (guestCount > 40) {
//       return ["Silver", "Golden", "Platinum"];
//     }
//     return [];
//   };

//   const activeMenus = getActiveMenus(guestCount);

//   const handleGuestInputChange = (event) => {
//     let value = event.target.value.replace(/[^0-9]/g, ""); // ✅ Allow only numbers
  
//     if (parseInt(value, 10) > seatingCapacity) {
//       value = seatingCapacity; // ✅ Prevent exceeding max capacity
//       setError(`🚫 Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
  
//     setGuestCount(value);
//   };

//   const handleCartSelection = (cartName) => {
//     if (!activeMenus.includes(cartName)) return; // Prevent selection of inactive menus
//     setSelectedCart((prevSelectedCart) => (prevSelectedCart === cartName ? "" : cartName));
//     setIsMenuCustomized(false);
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>
//       <div className={styles.fields}>
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="occasion"
//             placeholder="Occasion"
//             value={occasion}
//             onChange={(e) => setOccasion(e.target.value)}
//             required
//           />
//           <img src={ocassion} alt="Occasion Icon" className={styles.icon} />
//         </div>

//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="guests"
//             placeholder={`No. of Guests (Max ${seatingCapacity})`}
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="Guests Icon" className={styles.icon} />
//         </div>
//       </div>

//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose Your Buffet Plan</div>
//         <div className={styles.carts}>
//           {menus.length > 0 ? (
//             menus.map((menu) => {
//               const isActive = activeMenus.includes(menu.menuName);
//               return (
//                 <MenuCart
//                 key={menu._id}
//                 menuName={menu.menuName}
//                 description={menu.description}
//                 price={`₹${menu.price}/Plate`}
//                 menuImage={menu.menuImage}
//                 isSelected={selectedCart === menu.menuName}
//                 isActive={activeMenus.includes(menu.menuName)} // ✅ Dynamically determine if it's active
//                 onSelect={() => handleCartSelection(menu.menuName)}
//                 className={activeMenus.includes(menu.menuName) ? styles.activeMenu : styles.inactiveMenu}
//               />
//               );
//             })
//           ) : (
//             <p className={styles.error}>No buffet plans available. Please check back later.</p>
//           )}
//         </div>

//         {!selectedCart && (
//           <p className={styles.error}>Please select a buffet plan and customize it as per your requirements.</p>
//         )}

//         <button className={styles.heroSecButton} onClick={() => setShowPopup(true)}>Customize</button>
//       </div>

//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.eventTimeAndDateContainer}>
//           <div className={styles.calendar}>
//             <Calendar
//               className={styles.customCalendar}
//               onChange={setSelectedDate}
//               value={selectedDate}
//             />
//           </div>

//                 <div className={styles.eventTimeAndDate}>
//               <div className={styles.eventTimeAndDateContainer}>
//          <div className={styles.calendar}>
//            <Calendar
//               className={styles.customCalendar}
//               onChange={handleDateChange}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//               value={selectedDate}
//             />
//           </div>

//           <label>Preferred Delivery Time:</label>
//           <div className={styles.timeSelection}>
//             <input
//               type="time"
//               value={preferredTimings.start || ""}
//               onChange={(e) =>
//                 setPreferredTimings((prev) => ({
//                   ...prev,
//                   start: e.target.value,
//                 }))
//               }
//               className={styles.timeInput}
//             />

//             <input
//               type="time"
//               value={preferredTimings.end || ""}
//               onChange={(e) =>
//                 setPreferredTimings((prev) => ({
//                   ...prev,
//                   end: e.target.value,
//                 }))
//               }
//               className={styles.timeInput}
//             />
//           </div>

//           <div className={styles.errorContainer}>
//             {!selectedDate && (
//               <p className={styles.error}>Please select a date.</p>
//             )}

//             {(!preferredTimings.start || !preferredTimings.end) && (
//               <p className={styles.error}>Please select a valid preferred timing range.</p>
//             )}

//             {preferredTimings.start && preferredTimings.end && (() => {
//               const startTime = new Date(`1970-01-01T${preferredTimings.start}`);
//               const endTime = new Date(`1970-01-01T${preferredTimings.end}`);
//               const durationHours = (endTime - startTime) / (1000 * 60 * 60);
//               return durationHours > 3 ? (
//                 <p className={styles.error}>
//                   ⏳ Your selected duration exceeds <strong>3 hours</strong>. Additional charges apply per extra hour.
//                 </p>
//               ) : null;
//             })()}
//           </div>
//         </div>
//        </div>

//       {error && <p className={styles.error}>{error}</p>}

//       <textarea
//         className={styles.textarea}
//         placeholder="Add comments/ concerns (optional)"
//         value={comments}
//         onChange={(e) => setComments(e.target.value)}
//       />

//       {showPopup && selectedCart && (
//         <Popup
//           menuPreferences={menuPreferences}
//           setMenuPreferences={setMenuPreferences}
//           selectedCart={selectedCart}
//           onClose={() => setShowPopup(false)}
//           setIsMenuCustomized={setIsMenuCustomized}
//         />
//       )}
//     </div>
//   );
// };

// export default CateringFormLeft;


import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./cateringFormLeft.module.css";
import MenuCart from "../MenuCart/menuCart";
import ocassion from "../Assets/ocassion.svg";
import people from "../Assets/people.svg";
import Popup from "../MenuPopUp/menuPopup";
import axios from "axios";

const CateringFormLeft = ({
  hallTitle,
  seatingCapacity,
  guestCount,
  setGuestCount,
  occasion,
  setOccasion,
  selectedDate,
  setSelectedDate,
  preferredTimings,
  setPreferredTimings,
  menuPreferences = {},
  comments,
  setComments,
  selectedCart,
  setSelectedCart,
  setMenuPreferences,
  existingBookings,
  isMenuCustomized,
  setIsMenuCustomized,
}) => {
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menuCart");
      setMenus(response.data);
    } catch (error) {
      console.error("❌ Error fetching menus:", error);
    }
  };

  // const getActiveMenus = (guestCount) => {
  //   if (guestCount <= 20) {
  //     return ["Buffet Menu"];
  //   } else if (guestCount > 20 && guestCount <= 40) {
  //     return ["Buffet Menu", "Chinese Buffet"];
  //   } else if (guestCount > 40) {
  //     return ["Silver", "Golden", "Platinum"];
  //   }
  //   return [];
  // };

  const getActiveMenus = (guestCount, seatingCapacity) => {
    if (seatingCapacity > 40) {
      return ["Silver", "Golden", "Platinum"]; // ✅ Seating capacity exceeds 40, return premium menus
    } else if (guestCount <= 20) {
      return ["Buffet Menu"];
    } else if (guestCount > 20 && guestCount <= 40) {
      return ["Buffet Menu", "Chinese Buffet"];
    }
    return [];
  };

  // const activeMenus = getActiveMenus(guestCount);

  const activeMenus = getActiveMenus(guestCount, seatingCapacity);

  
  const handleGuestInputChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Allow only numbers

    if (parseInt(value, 10) > seatingCapacity) {
      value = seatingCapacity;
      setError(`🚫 Maximum allowed guests: ${seatingCapacity}`);
    } else {
      setError("");
    }

    setGuestCount(value);
  };

  const handleCartSelection = (cartName) => {
    if (!activeMenus.includes(cartName)) return; // Prevent selection of inactive menus
    setSelectedCart((prevSelectedCart) =>
      prevSelectedCart === cartName ? "" : cartName
    );
    setIsMenuCustomized(false);
  };

  const isDateDisabled = (date) => {
    // Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className={styles.cateringForm}>
      <div className={styles.mainHeading}>Fill in your requirements</div>

      <div className={styles.fields}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            name="occasion"
            placeholder="Occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            required
          />
          <img src={ocassion} alt="Occasion Icon" className={styles.icon} />
        </div>

        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            name="guests"
            placeholder={`No. of Guests (Max ${seatingCapacity})`}
            value={guestCount}
            onChange={handleGuestInputChange}
            required
          />
          <img src={people} alt="Guests Icon" className={styles.icon} />
        </div>
      </div>

      <div className={styles.heroSec}>
        <div className={styles.heroSecHeading}>Choose Your Buffet Plan</div>
        <div className={styles.carts}>
          {menus.length > 0 ? (
            menus.map((menu) => {
              const isActive = activeMenus.includes(menu.menuName);
              return (
                <MenuCart
                  key={menu._id}
                  menuName={menu.menuName}
                  description={menu.description}
                  price={`₹${menu.price}/Plate`}
                  menuImage={menu.menuImage}
                  isSelected={selectedCart === menu.menuName}
                  isActive={isActive}
                  onSelect={() => handleCartSelection(menu.menuName)}
                  className={isActive ? styles.activeMenu : styles.inactiveMenu}
                />
              );
            })
          ) : (
            <p className={styles.error}>No buffet plans available. Please check back later.</p>
          )}
        </div>

        {!selectedCart && (
          <p className={styles.error}>Please select a buffet plan and customize it as per your requirements.</p>
        )}

        <button
          className={styles.heroSecButton}
          onClick={() => setShowPopup(true)}
          disabled={!selectedCart}
        >
          Customize
        </button>
      </div>

      <div className={styles.eventTimeAndDate}>
      <div className={styles.eventTimeAndDateContainer}>
        <div className={styles.calendar}>
          <Calendar
            className={styles.customCalendar}
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={({ date }) => isDateDisabled(date)}
          />
        </div>

        <label>Preferred Delivery Time:</label>
        <div className={styles.timeSelection}>
          <input
            type="time"
            value={preferredTimings.start || ""}
            onChange={(e) =>
              setPreferredTimings((prev) => ({ ...prev, start: e.target.value }))
            }
            className={styles.timeInput}
          />

          <input
            type="time"
            value={preferredTimings.end || ""}
            onChange={(e) =>
              setPreferredTimings((prev) => ({ ...prev, end: e.target.value }))
            }
            className={styles.timeInput}
          />
        </div>

   
        </div>

        <div className={styles.errorContainer}>
          {!selectedDate && <p className={styles.error}>Please select a date.</p>}
          {(!preferredTimings.start || !preferredTimings.end) && (
            <p className={styles.error}>Please select a valid preferred timing range.</p>
          )}
          {preferredTimings.start && preferredTimings.end && (() => {
            const startTime = new Date(`1970-01-01T${preferredTimings.start}`);
            const endTime = new Date(`1970-01-01T${preferredTimings.end}`);
            const durationHours = (endTime - startTime) / (1000 * 60 * 60);
            return durationHours > 3 ? (
              <p className={styles.error}>
                ⏳ Your selected duration exceeds <strong>3 hours</strong>. Additional charges apply per extra hour.
              </p>
            ) : null;
          })()}
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <textarea
        className={styles.textarea}
        placeholder="Add comments/ concerns (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      {showPopup && selectedCart && (
        <Popup
          menuPreferences={menuPreferences}
          setMenuPreferences={setMenuPreferences}
          selectedCart={selectedCart}
          onClose={() => setShowPopup(false)}
          setIsMenuCustomized={setIsMenuCustomized}
        />
      )}
    </div>
  );
};

export default CateringFormLeft;
