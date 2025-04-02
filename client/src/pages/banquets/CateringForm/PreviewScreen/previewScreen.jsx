// import React from "react";
// import styles from "./previewScreen.module.css";

// const PreviewScreen = ({
//   hallTitle,
//   hallImage,
//   occasion,
//   guestCount,
//   selectedCart,
//   selectedDates,
//   preferredTimings,
//   comments,
//   menuPreferences,
//   totalCost, // New prop for total pricing
// }) => {
//   return (
//     <div className={styles.previewContainer}>
//       <h2 className={styles.heading}>Preview of Your Selections</h2>
//       <div className={styles.details}>
//         <p><strong>Hall Name:</strong> {hallTitle || "No Hall Selected"}</p>
//         {hallImage && <img src={hallImage} alt="Hall Preview" className={styles.hallImage} />}
//         <p><strong>Occasion:</strong> {occasion || "Not Specified"}</p>
//         <p><strong>Number of Guests:</strong> {guestCount || 0}</p>
//         <p><strong>Selected Menu:</strong> {selectedCart || "No Menu Selected"}</p>
//         <p>
//           <strong>Selected Dates:</strong> {selectedDates.length > 0
//             ? selectedDates.map((date) => date.toDateString()).join(", ")
//             : "No Dates Selected"}
//         </p>
//         <p>
//           <strong>Preferred Timings:</strong> {preferredTimings.length > 0
//             ? preferredTimings.join(", ")
//             : "Not Specified"}
//         </p>
//         <p><strong>Additional Comments:</strong> {comments || "None"}</p>
//         <p><strong>Total Cost:</strong> ₹{totalCost || 0}</p>
//         {menuPreferences && Object.keys(menuPreferences).length > 0 && (
//           <>
//             <h3>Menu Preferences</h3>
//             <ul>
//               {Object.entries(menuPreferences).map(([key, value]) => (
//                 <li key={key}>
//                   <strong>{key}:</strong>{" "}
//                   {Array.isArray(value) ? value.join(", ") : value || ""}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//       <button className={styles.backButton} onClick={() => window.history.back()}>
//         Back
//       </button>
//       <button className={styles.confirmButton}>
//         Confirm and Proceed
//       </button>
//     </div>
//   );
// };

// export default PreviewScreen;


// import React from "react";
// import styles from "./previewScreen.module.css";

// const PreviewScreen = ({
//   hallTitle,
//   hallImage,
//   occasion,
//   guestCount,
//   selectedCart,
//   selectedDates,
//   preferredTimings,
//   comments,
//   menuPreferences,
//   totalCost, // Total pricing
//   onBack, // Callback for navigation
// }) => {
//   return (
//     <div className={styles.previewContainer}>
//       <h2 className={styles.heading}>Preview of Your Selections</h2>
//       <div className={styles.details}>
//         <p><strong>Hall Name:</strong> {hallTitle || "No Hall Selected"}</p>
//         {hallImage && <img src={hallImage} alt="Hall Preview" className={styles.hallImage} />}
//         <p><strong>Occasion:</strong> {occasion || "Not Specified"}</p>
//         <p><strong>Number of Guests:</strong> {guestCount || 0}</p>
//         <p><strong>Selected Menu:</strong> {selectedCart || "No Menu Selected"}</p>
//         <p>
//           <strong>Selected Dates:</strong> {selectedDates.length > 0
//             ? selectedDates.map((date) => date.toDateString()).join(", ")
//             : "No Dates Selected"}
//         </p>
//         <p>
//           <strong>Preferred Timings:</strong> {preferredTimings.length > 0
//             ? preferredTimings.join(", ")
//             : "Not Specified"}
//         </p>
//         <p><strong>Additional Comments:</strong> {comments || "None"}</p>
//         <p><strong>Total Cost:</strong> ₹{totalCost || 0}</p>
//         {menuPreferences && Object.keys(menuPreferences).length > 0 && (
//           <>
//             <h3>Menu Preferences</h3>
//             <ul>
//               {Object.entries(menuPreferences).map(([key, value]) => (
//                 <li key={key}>
//                   <strong>{key}:</strong>{" "}
//                   {Array.isArray(value) ? value.join(", ") : value || ""}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//       <button className={styles.backButton} onClick={onBack}>
//         Back
//       </button>
//       <button className={styles.confirmButton}>Confirm and Proceed</button>
//     </div>
//   );
// };

// export default PreviewScreen;



// import React, { useState } from "react";
// import styles from "./previewScreen.module.css";

// const PreviewScreen = ({
//   hallTitle,
//   hallImage,
//   occasion,
//   guestCount,
//   selectedCart,
//   selectedDates,
//   preferredTimings,
//   comments,
//   menuPreferences,
//   totalCost,
//   onBack,
// }) => {
//   const [loading, setLoading] = useState(false); // Manage loading state
//   const [successMessage, setSuccessMessage] = useState(null); // Success message
//   const [errorMessage, setErrorMessage] = useState(null); // Error message

//   // Function to handle the data submission
//   const handleSaveQuery = async () => {
//     try {
//       setLoading(true); // Enable loading state
//       setErrorMessage(null); // Clear error state
//       setSuccessMessage(null); // Clear success state

//       const token = localStorage.getItem("jwtToken"); 
     
//       // Retrieve the JWT token
//       const response = await fetch("http://localhost:8080/api/queries/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Send token for authentication
//         },
//         body: JSON.stringify({
//           hallTitle,
//           hallImage,
//           occasion,
//           guestCount,
//           selectedCart,
//           selectedDates,
//           preferredTimings,
//           comments,
//           menuPreferences,
//           totalCost,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage("Your banquet query has been submitted successfully!");
//         setLoading(false);

//         // Optionally, redirect to a thank-you page or clear form
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.error || "Failed to submit query. Please try again.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error submitting query:", error);
//       setErrorMessage("An error occurred. Please try again later.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.previewContainer}>
//       <h2 className={styles.heading}>Preview of Your Selections</h2>
//       <div className={styles.details}>
//         <p><strong>Hall Name:</strong> {hallTitle || "No Hall Selected"}</p>
//         {hallImage && <img src={hallImage} alt="Hall Preview" className={styles.hallImage} />}
//         <p><strong>Occasion:</strong> {occasion || "Not Specified"}</p>
//         <p><strong>Number of Guests:</strong> {guestCount || 0}</p>
//         <p><strong>Selected Menu:</strong> {selectedCart || "No Menu Selected"}</p>
//         <p>
//           <strong>Selected Dates:</strong> {selectedDates.length > 0
//             ? selectedDates.map((date) => date.toDateString()).join(", ")
//             : "No Dates Selected"}
//         </p>
//         <p>
//           <strong>Preferred Timings:</strong> {preferredTimings.length > 0
//             ? preferredTimings.join(", ")
//             : "Not Specified"}
//         </p>
//         <p><strong>Additional Comments:</strong> {comments || "None"}</p>
//         <p><strong>Total Cost:</strong> ₹{totalCost || 0}</p>
//         {menuPreferences && Object.keys(menuPreferences).length > 0 && (
//           <>
//             <h3>Menu Preferences</h3>
//             <ul>
//               {Object.entries(menuPreferences).map(([key, value]) => (
//                 <li key={key}>
//                   <strong>{key}:</strong>{" "}
//                   {Array.isArray(value) ? value.join(", ") : value || ""}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//       {/* Success and Error Messages */}
//       {successMessage && <p className={styles.success}>{successMessage}</p>}
//       {errorMessage && <p className={styles.error}>{errorMessage}</p>}

//       {/* Action Buttons */}
//       <button className={styles.backButton} onClick={onBack}>
//         Back
//       </button>
//       <button
//         className={styles.confirmButton}
//         onClick={handleSaveQuery}
//         disabled={loading}
//       >
//         {loading ? "Submitting..." : "Confirm and Save"}
//       </button>
//     </div>
//   );
// };

// export default PreviewScreen;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./previewScreen.module.css";
import { useToaster } from '../../../../utils';

const PreviewScreen = ({
  hallTitle,
  hallImage,
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
  const [loading, setLoading] = useState(false); // Manage loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const [errorMessage, setErrorMessage] = useState(null); // Error message

  // useNavigate hook for routing
  const navigate = useNavigate();

  const setToast = useToaster();
  // Function to handle the data submission
  const handleSaveQuery = async () => {
    try {
      setLoading(true); // Enable loading state
      setErrorMessage(null); // Clear error state
      setSuccessMessage(null); // Clear success state

      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/api/queries/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({
          hallTitle,
          hallImage,
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

      if (response.ok) {
        const data = await response.json();
        setToast("Your banquet query has been submitted successfully!");
        setLoading(false);

        // Route to the Banquet Hall page after successful submission.
        // Change "/banquet-hall" to the desired route.
        navigate("/banquets");
      } else {
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
        <p>
          <strong>Hall Name:</strong> {hallTitle || "No Hall Selected"}
        </p>
        {hallImage && <img src={hallImage} alt="Hall Preview" className={styles.hallImage} />}
        <p>
          <strong>Occasion:</strong> {occasion || "Not Specified"}
        </p>
        <p>
          <strong>Number of Guests:</strong> {guestCount || 0}
        </p>
        <p>
          <strong>Selected Menu:</strong> {selectedCart || "No Menu Selected"}
        </p>
        <p>
          <strong>Selected Dates:</strong>{" "}
          {selectedDates.length > 0
            ? selectedDates.map((date) => new Date(date).toDateString()).join(", ")
            : "No Dates Selected"}
        </p>
        <p>
          <strong>Preferred Timings:</strong>{" "}
          {preferredTimings.length > 0 ? preferredTimings.join(", ") : "Not Specified"}
        </p>
        <p>
          <strong>Additional Comments:</strong> {comments || "None"}
        </p>
        <p>
          <strong>Total Cost:</strong> ₹{totalCost || 0}
        </p>
        {menuPreferences && Object.keys(menuPreferences).length > 0 && (
          <>
            <h3>Menu Preferences</h3>
            <ul>
              {Object.entries(menuPreferences).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {Array.isArray(value) ? value.join(", ") : value || ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {/* Success and Error Messages */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {/* Action Buttons */}
      <button className={styles.backButton} onClick={onBack}>
        Back
      </button>
      <button
        className={styles.confirmButton}
        onClick={handleSaveQuery}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Confirm and Save"}
      </button>
    </div>
  );
};

export default PreviewScreen;