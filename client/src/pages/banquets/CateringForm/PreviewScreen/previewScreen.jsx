

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./previewScreen.module.css";
import { useToaster } from '../../../../utils';
import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary
// ✅ Image Slider Component
const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval); // Cleanup
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.imageSlider}>
      <img
        src={images[currentIndex]}
        alt="Hall Preview"
        className={styles.sliderImage}
      />
      <div className={styles.navigationButtons}>
        <button onClick={goToPrevious} className={styles.prevButton}>◀</button>
        <button onClick={goToNext} className={styles.nextButton}>▶</button>
      </div>
    </div>
  );
};

const PreviewScreen = ({
  hallPrice,
  hallTitle,
  hallImages = [],
  occasion,
  guestCount,
  selectedCart,
  selectedDates,
  preferredTimings,
  comments,
  menuPreferences,
  totalCost,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const setToast = useToaster();

  const handleSaveQuery = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${BASE_URL}/api/queries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hallTitle,
          // hallImages, // send hallImages array
          occasion,
          guestCount,
          selectedCart,
          selectedDates,
          preferredTimings,
          comments,
          menuPreferences,
          totalCost,
        }),
      });

      // if (response.ok) {
      //   const data = await response.json();
      //   setToast("Your banquet query has been submitted successfully!");
      //   setLoading(false);
      //   navigate("/banquets");
      // } 
      
      if (response.ok) {
  let data = {};
  try {
    data = await response.json(); // try parsing only if response has content
  } catch (err) {
    // Ignore JSON parsing errors if response body is empty
  }

  setToast("Your banquet query has been submitted successfully!");
  setSuccessMessage("Your banquet query has been submitted successfully!");
  setLoading(false);

  setTimeout(() => {
    navigate("/banquets");
  }, 1500);
}

      else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to submit query. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.previewContainer}>
      <h2 className={styles.heading}>Preview of Your Selections</h2>

      <div className={styles.details}>
        <p><strong>Hall Name:</strong> {hallTitle || "No Hall Selected"}</p>

        {/* ✅ Use Image Slider */}
        {hallImages.length > 0 ? (
          <ImageSlider images={hallImages} />
        ) : (
          <p>No hall images available.</p>
        )}

        <p><strong>Occasion:</strong> {occasion || "Not Specified"}</p>
        <p><strong>Number of Guests:</strong> {guestCount || 0}</p>
        <p><strong>Selected Menu:</strong> {selectedCart || "No Menu Selected"}</p>

        <p><strong>Selected Dates:</strong>{" "}
          {selectedDates.length > 0
            ? selectedDates.map((date) => new Date(date).toDateString()).join(", ")
            : "No Dates Selected"}
        </p>

        <p><strong>Preferred Timings:</strong>{" "}
          {preferredTimings.start && preferredTimings.end
            ? `${new Date(`1970-01-01T${preferredTimings.start}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })} to ${new Date(`1970-01-01T${preferredTimings.end}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`
            : "Not Specified"}
        </p>

        <p><strong>Additional Comments:</strong> {comments || "None"}</p>
        <p><strong>Total Estimated Cost:</strong> ₹{totalCost || hallPrice}</p>

        {menuPreferences && Object.keys(menuPreferences).length > 0 && (
          <>
            <h3>Menu Preferences</h3>
            <ul>
              {Object.entries(menuPreferences).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value || ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Messages */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={onBack}>Back</button>
        <button
          className={styles.confirmButton}
          onClick={handleSaveQuery}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Confirm and Save"}
        </button>
      </div>
    </div>
  );
};

export default PreviewScreen;

