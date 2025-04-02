

// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

// const CateringFormLeft = ({seatingCapacity}) => {

//   const [guestCount, setGuestCount] = useState("");
//   const [error, setError] = useState("");

//   const handleGuestInputChange = (event) => {
//       const value = event.target.value.replace(/[^0-9]/g, ""); // Restrict input to numbers
//       setGuestCount(value);

//       if (value > seatingCapacity) {
//           setError(`Maximum allowed guests: ${seatingCapacity}`);
//       } else {
//           setError("");
//       }
//   };
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [selectedCart, setSelectedCart] = useState(null); // State for selected cart


//   const [showPopup, setShowPopup] = useState(false); // State for showing popup


//   const handlePopupClose = () => {
//     setShowPopup(false); // Close the popup
//   };


//   // Predefined booked dates
//   const bookedDates = [
//     new Date(2025, 2, 21), // March 21, 2025
//     new Date(2025, 2, 22), // March 22, 2025
//     new Date(2025, 2, 25), // March 25, 2025
//   ];

//   // Handle date selection for calendar
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

//   // Disable specific dates in the calendar
//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   // Handle cart selection/unselection
//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? null : cartName
//     ); // Toggle the selected cart
//   };

//   // Reset cart selection when clicking outside
//   // const handleClickOutside = (event) => {
//   //   const clickedOutside = !event.target.closest(`.${styles.carts}`);
//   //   if (clickedOutside) {
//   //     setSelectedCart(null); // Reset selection
//   //   }
//   // };

//   // Add click event listener for outside clicks
//   // useEffect(() => {
//   //   document.addEventListener("click", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("click", handleClickOutside);
//   //   };
//   // }, []);

//   const handleInput = (event) => {
//     // Restrict input to numbers only
//     event.target.value = event.target.value.replace(/[^0-9]/g, ""); // Replace non-numeric characters
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>

//       {/* Form Fields */}
//       <div className={styles.fields}>
//         <div className={styles.inputWrapper}>
//           <input className={styles.input} type="text" name="occasion" placeholder="Occasion" required />
//           <img src={ocassion} alt="ocassion img" className={styles.icon} />
//         </div>
//         {/* <div className={styles.inputWrapper}>
//           <input
//           className={styles.input}
//             type="text"
//             name="guests"
//             placeholder="No. of Guests"
//             onInput={handleInput}
//             required
//           />
//           <img src={people} alt="guests img" className={styles.icon} />
//         </div> */}
//         <div className={styles.inputWrapper}>
//                     <input
//                         className={styles.input}
//                         type="text"
//                         name="guests"
//                         placeholder="No. of Guests"
//                         value={guestCount}
//                         onChange={handleGuestInputChange}
//                         required
//                     />
//                     <img src={people} alt="guests img" className={styles.icon} />
//                 </div>
//                 {seatingCapacity > 0 && (
//                     <div className={styles.maxCapacityNote}>
//                         {/* Max number of people allowed: {seatingCapacity} */}
//                     </div>
//                 )}
//                 {error && <div className={styles.error}>{error}</div>}
//       </div>

//       {/* Menu Cart Section */}
//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
//         <div className={styles.carts}>
//           <MenuCart
//             menuName="Basic"
//             description="Simple menu with essential items."
//             price="₹ 499/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Basic"} // Pass selection state
//             onSelect={() => handleCartSelection("Basic")} // Pass handler
//           />
//           <MenuCart
//             menuName="Premium"
//             description="Includes premium dishes and beverages."
//             price="₹ 999/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Premium"}
//             onSelect={() => handleCartSelection("Premium")}
//           />
//           <MenuCart
//             menuName="Deluxe"
//             description="A luxurious menu for grand occasions."
//             price="₹ 1499/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Deluxe"}
//             onSelect={() => handleCartSelection("Deluxe")}
//           />
//           <MenuCart
//             menuName="Royal"
//             description="A royal feast with exquisite delicacies."
//             price="₹ 1999/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Royal"}
//             onSelect={() => handleCartSelection("Royal")}
//           />
//         </div>
//         <div className={styles.note}>
//           Note: No Hall Charge for Food Cost above ₹10K
//         </div>
//         <div>
//           <button className={styles.heroSecButton}  onClick={() => setShowPopup(true)}>Customize</button>
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.calendar}>
//           <div className={styles.calendarHeading}>SELECT DATES</div>
//           <div>
//             <Calendar
//               onChange={handleDateChange}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//               tileClassName={({ date }) =>
//                 bookedDates.some(
//                   (bookedDate) => bookedDate.getTime() === date.getTime()
//                 )
//                   ? styles.bookedDate
//                   : selectedDates.some(
//                       (selectedDate) =>
//                         selectedDate.getTime() === date.getTime()
//                     )
//                   ? styles.selectedDate
//                   : null
//               }
//               selectRange={false}
//             />
//           </div>
//         </div>

//         {/* Time Selection Section */}
//         <div className={styles.time}>
//           <div className={styles.timeSection}>
//             <div className={styles.timeHeading}>SELECT TIME</div>
//             <div className={styles.timeOptions}>
//               <label className={styles.timeOption}>
//                 <input  className={styles.input} type="checkbox" value="Morning" />
//                 <span>Morning (6 AM - 10 AM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input className={styles.input} type="checkbox" value="Afternoon" />
//                 <span>Afternoon (11 AM - 4 PM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input className={styles.input} type="checkbox" value="Evening" />
//                 <span>Evening (5 PM - 10 PM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input className={styles.input} type="checkbox" value="All Day" />
//                 <span>All Day (7 AM - 10 PM)</span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.comments}>
//         <div className={styles.commentHeading}>Additional Requirements</div>
//         <textarea
//           className={styles.textarea}
//           placeholder="Add comments/ concerns"
//         ></textarea>
//       </div>
//       {/* {showPopup && (
//         <Popup selectedCart={selectedCart || "Gold"} onClose={handlePopupClose} />
//       )} */}
//       {showPopup && selectedCart && (
//   <Popup selectedCart={selectedCart} onClose={handlePopupClose} />
// )}

     
//     </div>
//   );
// };

// export default CateringFormLeft;



// CateringFormLeft.jsx


// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

// // Now the component accepts guestCount and selectedCart states from props
// const CateringFormLeft = ({
//   seatingCapacity,
//   guestCount,
//   setGuestCount,
//   selectedCart,
//   setSelectedCart,
// }) => {
//   const [error, setError] = useState("");
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [showPopup, setShowPopup] = useState(false); // State for showing popup

//   const handleGuestInputChange = (event) => {
//     const value = event.target.value.replace(/[^0-9]/g, ""); // Restrict input to numbers
//     setGuestCount(value);

//     if (value > seatingCapacity) {
//       setError(`Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
//   };

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

//   // Predefined booked dates
//   const bookedDates = [
//     new Date(2025, 2, 21),
//     new Date(2025, 2, 22),
//     new Date(2025, 2, 25),
//   ];

//   // Disable specific dates in the calendar
//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   // Handle cart selection/unselection using parent's state
//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? "" : cartName
//     );
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false); // Close the popup
//   };

//   // Restrict input to numbers only (alternative, if needed)
//   const handleInput = (event) => {
//     event.target.value = event.target.value.replace(/[^0-9]/g, "");
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>

//       {/* Form Fields */}
//       <div className={styles.fields}>
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="occasion"
//             placeholder="Occasion"
//             required
//           />
//           <img src={ocassion} alt="occasion img" className={styles.icon} />
//         </div>
//         <div className={styles.inputWrapper}>
//           <input
//             className={styles.input}
//             type="text"
//             name="guests"
//             placeholder="No. of Guests"
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="guests img" className={styles.icon} />
//         </div>
//         {seatingCapacity > 0 && (
//           <div className={styles.maxCapacityNote}>
//             {/* Optionally display a note about the seating capacity */}
//           </div>
//         )}
//         {error && <div className={styles.error}>{error}</div>}
//       </div>

//       {/* Menu Cart Section */}
//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
//         <div className={styles.carts}>
//           <MenuCart
//             menuName="Basic"
//             description="Simple menu with essential items."
//             price="₹ 499/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Basic"}
//             onSelect={() => handleCartSelection("Basic")}
//           />
//           <MenuCart
//             menuName="Premium"
//             description="Includes premium dishes and beverages."
//             price="₹ 999/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Premium"}
//             onSelect={() => handleCartSelection("Premium")}
//           />
//           <MenuCart
//             menuName="Deluxe"
//             description="A luxurious menu for grand occasions."
//             price="₹ 1499/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Deluxe"}
//             onSelect={() => handleCartSelection("Deluxe")}
//           />
//           <MenuCart
//             menuName="Royal"
//             description="A royal feast with exquisite delicacies."
//             price="₹ 1999/ Plate"
//             menuImage={menu}
//             isSelected={selectedCart === "Royal"}
//             onSelect={() => handleCartSelection("Royal")}
//           />
//         </div>
//         <div className={styles.note}>
//           Note: No Hall Charge for Food Cost above ₹10K
//         </div>
//         <div>
//           <button
//             className={styles.heroSecButton}
//             onClick={() => setShowPopup(true)}
//           >
//             Customize
//           </button>
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.calendar}>
//           <div className={styles.calendarHeading}>SELECT DATES</div>
//           <Calendar
//             onChange={handleDateChange}
//             tileDisabled={({ date }) => isDateDisabled(date)}
//             tileClassName={({ date }) =>
//               bookedDates.some(
//                 (bookedDate) => bookedDate.getTime() === date.getTime()
//               )
//                 ? styles.bookedDate
//                 : selectedDates.some(
//                     (selectedDate) =>
//                       selectedDate.getTime() === date.getTime()
//                   )
//                 ? styles.selectedDate
//                 : null
//             }
//             selectRange={false}
//           />
//         </div>

//         {/* Time Selection Section */}
//         <div className={styles.time}>
//           <div className={styles.timeSection}>
//             <div className={styles.timeHeading}>SELECT TIME</div>
//             <div className={styles.timeOptions}>
//               <label className={styles.timeOption}>
//                 <input
//                   className={styles.input}
//                   type="checkbox"
//                   value="Morning"
//                 />
//                 <span>Morning (6 AM - 10 AM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input
//                   className={styles.input}
//                   type="checkbox"
//                   value="Afternoon"
//                 />
//                 <span>Afternoon (11 AM - 4 PM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input
//                   className={styles.input}
//                   type="checkbox"
//                   value="Evening"
//                 />
//                 <span>Evening (5 PM - 10 PM)</span>
//               </label>
//               <label className={styles.timeOption}>
//                 <input
//                   className={styles.input}
//                   type="checkbox"
//                   value="All Day"
//                 />
//                 <span>All Day (7 AM - 10 PM)</span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.comments}>
//         <div className={styles.commentHeading}>
//           Additional Requirements
//         </div>
//         <textarea
//           className={styles.textarea}
//           placeholder="Add comments/ concerns"
//         ></textarea>
//       </div>

//       {showPopup && selectedCart && (
//         <Popup selectedCart={selectedCart} onClose={handlePopupClose} />
//       )}
//     </div>
//   );
// };

// export default CateringFormLeft;



// // // banquet query



// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

// const CateringFormLeft = ({
//   seatingCapacity,
//   guestCount,
//   setGuestCount,
//   occasion,
//   setOccasion,
//   selectedDates,
//   setSelectedDates,
//   preferredTimings,
//   setPreferredTimings,
//   menuPreferences={},
//   comments,
//   setComments,
//   selectedCart,
//   setSelectedCart,
//   setMenuPreferences,
//   isMenuCustomized, // Read customization state
//   setIsMenuCustomized, 
// }) => {
//   const [error, setError] = React.useState(""); // Local error state
//   const [showPopup, setShowPopup] = React.useState(false); // Popup state

//   // Handle guest input change
//   const handleGuestInputChange = (event) => {
//     const value = event.target.value.replace(/[^0-9]/g, ""); // Restrict input to numbers
//     setGuestCount(value);

//     if (value > seatingCapacity) {
//       setError(`Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
//   };

//   // Handle occasion change
//   const handleOccasionChange = (event) => {
//     setOccasion(event.target.value); // Update occasion state
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

//   // Handle comments input
//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   // Booked dates
//   const bookedDates = [
//     new Date(2025, 2, 21),
//     new Date(2025, 2, 22),
//     new Date(2025, 2, 25),
//   ];

//   // Check if a date is disabled
//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   // Handle cart selection
//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? "" : cartName
//     );
//   };

//   // Close popup
//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>

//       {/* Form Fields */}
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
//             placeholder="No. of Guests"
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="Guests Icon" className={styles.icon} />
//         </div>
//         {error && <div className={styles.error}>{error}</div>}
//       </div>

//       {/* Menu Cart Section */}
//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
//         <div className={styles.carts}>
//           {["Basic", "Premium", "Deluxe", "Royal"].map((menuName) => (
//             <MenuCart
//               key={menuName}
//               menuName={menuName}
//               description={`Menu description for ${menuName}`}
//               price={`₹ ${
//                 menuName === "Basic"
//                   ? 499
//                   : menuName === "Premium"
//                   ? 999
//                   : menuName === "Deluxe"
//                   ? 1499
//                   : 1999
//               }/Plate`}
//               menuImage={menu}
//               isSelected={selectedCart === menuName}
//               onSelect={() => handleCartSelection(menuName)}
//             />
//           ))}
//         </div>
//         <button
//           className={styles.heroSecButton}
//           onClick={() => setShowPopup(true)}
//         >
//           Customize
//         </button>
//       </div>

//       {/* Calendar Section */}
//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.calendar}>
//           <Calendar
//             onChange={handleDateChange}
//             tileDisabled={({ date }) => isDateDisabled(date)}
//           />
//         </div>
//         <div className={styles.timeOptions}>
//           {["Morning", "Afternoon", "Evening", "All Day"].map((timeSlot) => (
//             <label key={timeSlot}>
//               <input
//                 type="checkbox"
//                 value={timeSlot}
//                 checked={preferredTimings.includes(timeSlot)}
//                 onChange={handlePreferredTimingsChange}
//               />
//               {timeSlot}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Comments Section */}
//       <textarea
//         className={styles.textarea}
//         placeholder="Add comments/ concerns"
//         value={comments}
//         onChange={handleCommentsChange}
//       />

//       {/* Popup */}
//       {showPopup && selectedCart && (
//         <Popup menuPreferences={menuPreferences} setMenuPreferences={setMenuPreferences} selectedCart={selectedCart} onClose={handlePopupClose} />
//       )}
//     </div>
//   );
// };

// export default CateringFormLeft;



// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styles from "./cateringFormLeft.module.css";
// import MenuCart from "../MenuCart/menuCart";
// import menu from "../Assets/menu.jpg"; // Shared image for all carts
// import ocassion from "../Assets/ocassion.svg";
// import people from "../Assets/people.svg";
// import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

// const CateringFormLeft = ({
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
//   isMenuCustomized, // Read customization state
//   setIsMenuCustomized, // Update customization state
// }) => {
//   const [error, setError] = React.useState(""); // Local error state
//   const [showPopup, setShowPopup] = React.useState(false); // Popup state

//   // Handle guest input change
//   const handleGuestInputChange = (event) => {
//     const value = event.target.value.replace(/[^0-9]/g, ""); // Restrict input to numbers
//     setGuestCount(value);

//     if (value > seatingCapacity) {
//       setError(`Maximum allowed guests: ${seatingCapacity}`);
//     } else {
//       setError("");
//     }
//   };

//   // Handle occasion change
//   const handleOccasionChange = (event) => {
//     setOccasion(event.target.value); // Update occasion state
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

//   // Handle comments input
//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   // Booked dates
//   const bookedDates = [
//     new Date(2025, 2, 21),
//     new Date(2025, 2, 22),
//     new Date(2025, 2, 25),
//   ];

//   // Check if a date is disabled
//   const isDateDisabled = (date) => {
//     return bookedDates.some(
//       (bookedDate) => bookedDate.getTime() === date.getTime()
//     );
//   };

//   // Handle cart selection
//   const handleCartSelection = (cartName) => {
//     setSelectedCart((prevSelectedCart) =>
//       prevSelectedCart === cartName ? "" : cartName
//     );
//     setIsMenuCustomized(false); // Reset customization state when menu cart changes
//   };

//   // Close popup
//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   // Handle menu customization
//   const handleMenuCustomization = () => {
//     setIsMenuCustomized(false); // Reset customization state
//     setShowPopup(true); // Open popup
//   };

//   return (
//     <div className={styles.cateringForm}>
//       <div className={styles.mainHeading}>Fill in your requirements</div>

//       {/* Form Fields */}
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
//             placeholder="No. of Guests"
//             value={guestCount}
//             onChange={handleGuestInputChange}
//             required
//           />
//           <img src={people} alt="Guests Icon" className={styles.icon} />
//         </div>
//         {error && <div className={styles.error}>{error}</div>}
//       </div>

//       {/* Menu Cart Section */}
//       <div className={styles.heroSec}>
//         <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
//         <div className={styles.carts}>
//           {["Basic", "Premium", "Deluxe", "Royal"].map((menuName) => (
//             <MenuCart
//               key={menuName}
//               menuName={menuName}
//               description={`Menu description for ${menuName}`}
//               price={`₹ ${
//                 menuName === "Basic"
//                   ? 499
//                   : menuName === "Premium"
//                   ? 999
//                   : menuName === "Deluxe"
//                   ? 1499
//                   : 1999
//               }/Plate`}
//               menuImage={menu}
//               isSelected={selectedCart === menuName}
//               onSelect={() => handleCartSelection(menuName)}
//             />
//           ))}
//         </div>
//         <button className={styles.heroSecButton} onClick={handleMenuCustomization}>
//           Customize
//         </button>
//       </div>

//       {/* Calendar Section */}
//       <div className={styles.eventTimeAndDate}>
//         <div className={styles.calendar}>
//           <Calendar
//             onChange={handleDateChange}
//             tileDisabled={({ date }) => isDateDisabled(date)}
//           />
//         </div>
//         <div className={styles.timeOptions}>
//           {["Morning", "Afternoon", "Evening", "All Day"].map((timeSlot) => (
//             <label key={timeSlot}>
//               <input
//                 type="checkbox"
//                 value={timeSlot}
//                 checked={preferredTimings.includes(timeSlot)}
//                 onChange={handlePreferredTimingsChange}
//               />
//               {timeSlot}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Comments Section */}
//       <textarea
//         className={styles.textarea}
//         placeholder="Add comments/ concerns"
//         value={comments}
//         onChange={handleCommentsChange}
//       />

//       {/* Popup */}
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
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./cateringFormLeft.module.css";
import MenuCart from "../MenuCart/menuCart";
import menu from "../Assets/menu.jpg"; // Shared image for all carts
import ocassion from "../Assets/ocassion.svg";
import people from "../Assets/people.svg";
import Popup from "../MenuPopUp/menuPopup"; // Import the Popup component

const CateringFormLeft = ({
  seatingCapacity,
  guestCount,
  setGuestCount,
  occasion,
  setOccasion,
  selectedDates,
  setSelectedDates,
  preferredTimings,
  setPreferredTimings,
  menuPreferences = {},
  comments,
  setComments,
  selectedCart,
  setSelectedCart,
  setMenuPreferences,
  isMenuCustomized, // read customization state
  setIsMenuCustomized, // update customization state
}) => {
  const [error, setError] = React.useState("");

  const [showPopup, setShowPopup] = React.useState(false);

  // Handle guest input change
  const handleGuestInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setGuestCount(value);

    if (value > seatingCapacity) {
      setError(`Maximum allowed guests: ${seatingCapacity}`);
    } else {
      setError("");
    }
  };

  // Handle occasion change
  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  };

  // Handle date selection/deselection
  const handleDateChange = (date) => {
    const isAlreadySelected = selectedDates.find(
      (d) => d.getTime() === date.getTime()
    );
    if (isAlreadySelected) {
      setSelectedDates(
        selectedDates.filter((d) => d.getTime() !== date.getTime())
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  // Handle preferred timings change
  const handlePreferredTimingsChange = (event) => {
    const value = event.target.value;
    setPreferredTimings((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  // Handle comments input (optional)
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Demo booked dates—feel free to adjust
  const bookedDates = [
    new Date(2025, 2, 21),
    new Date(2025, 2, 22),
    new Date(2025, 2, 25),
  ];

  // Disable booked dates
  const isDateDisabled = (date) => {
    return bookedDates.some(
      (bookedDate) => bookedDate.getTime() === date.getTime()
    );
  };

  // Handle cart selection; also resets customization state if the cart changes
  const handleCartSelection = (cartName) => {
    setSelectedCart((prevSelectedCart) =>
      prevSelectedCart === cartName ? "" : cartName
    );
    setIsMenuCustomized(false);
  };

  // Close popup
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Handle menu customization (open popup)
  const handleMenuCustomization = () => {
    setIsMenuCustomized(false);
    setShowPopup(true);
  };

  return (
    <div className={styles.cateringForm}>
      <div className={styles.mainHeading}>Fill in your requirements</div>

      {/* Form Fields */}
      <div className={styles.fields}>
        {/* Occasion */}
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            name="occasion"
            placeholder="Occasion"
            value={occasion}
            onChange={handleOccasionChange}
            required
          />
          <img src={ocassion} alt="Occasion Icon" className={styles.icon} />
        </div>

        {/* Guest Count */}
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

        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Menu Cart Section */}
      <div className={styles.heroSec}>
        <div className={styles.heroSecHeading}>Choose your Buffet Plan</div>
        <div className={styles.carts}>
          {["Basic", "Premium", "Deluxe", "Royal"].map((menuName) => (
            <MenuCart
              key={menuName}
              menuName={menuName}
              description={`Menu description for ${menuName}`}
              price={`₹ ${
                menuName === "Basic"
                  ? 499
                  : menuName === "Premium"
                  ? 999
                  : menuName === "Deluxe"
                  ? 1499
                  : 1999
              }/Plate`}
              menuImage={menu}
              isSelected={selectedCart === menuName}
              onSelect={() => handleCartSelection(menuName)}
            />
          ))}
        </div>
        {/* Display inline error if no menu is selected */}
        {!selectedCart && (
          <p className={styles.error}>Please select a buffet plan And Cutomize it as per your Requirements.</p>
        )}
        <button className={styles.heroSecButton} onClick={handleMenuCustomization}>
          Customize
        </button>
      </div>

      {/* Calendar Section */}
      <div className={styles.eventTimeAndDate}>
        <div className={styles.calendar}>
          <Calendar
            onChange={handleDateChange}
            tileDisabled={({ date }) => isDateDisabled(date)}
          />
        </div>
        <div className={styles.timeOptions}>
          {["Morning", "Afternoon", "Evening", "All Day"].map((timeSlot) => (
            <label key={timeSlot}>
              <input
                type="checkbox"
                value={timeSlot}
                checked={preferredTimings.includes(timeSlot)}
                onChange={handlePreferredTimingsChange}
              />
              {timeSlot}
            </label>
          ))}
        </div>
        {/* Required validation for dates and timings */}
        {selectedDates.length === 0 && (
          <p className={styles.error}>Please select at least one date.</p>
        )}
        {preferredTimings.length === 0 && (
          <p className={styles.error}>Please select at least one preferred timing.</p>
        )}
      </div>

      {/* Comments Section (Optional) */}
      <textarea
        className={styles.textarea}
        placeholder="Add comments/ concerns (optional)"
        value={comments}
        onChange={handleCommentsChange}
      />

      {/* Popup for customizing menu */}
      {showPopup && selectedCart && (
        <Popup
          menuPreferences={menuPreferences}
          setMenuPreferences={setMenuPreferences}
          selectedCart={selectedCart}
          onClose={handlePopupClose}
          setIsMenuCustomized={setIsMenuCustomized}
        />
      )}
    </div>
  );
};

export default CateringFormLeft;