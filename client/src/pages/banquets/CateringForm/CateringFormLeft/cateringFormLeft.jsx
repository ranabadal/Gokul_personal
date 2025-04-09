

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
          {["Silver", "Golden", "Platinum", "Royal"].map((menuName) => (
            <MenuCart
              key={menuName}
              menuName={menuName}
              description={`Menu description for ${menuName}`}
              price={`₹ ${
                menuName === "Silver"
                  ? 580
                  : menuName === "Golden"
                  ? 680
                  : menuName === "Platinum"
                  ? 780
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
           className={styles.customCalendar} 
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