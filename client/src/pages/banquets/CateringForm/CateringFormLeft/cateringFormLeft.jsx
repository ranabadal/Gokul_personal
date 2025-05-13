

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./cateringFormLeft.module.css";
import MenuCart from "../MenuCart/menuCart";
import ocassion from "../Assets/ocassion.svg";
import people from "../Assets/people.svg";
import Popup from "../MenuPopUp/menuPopup";
import axios from "axios";
import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary
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
      const response = await axios.get(`${BASE_URL}/api/menuCart`);
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
