
// import React, { useState, useEffect } from "react";
// import styles from "./menuCart.module.css";

// const MenuCart = ({ menuName, description, price, menuImage }) => {
//   const [selected, setSelected] = useState(false);

//   const handleSelection = (event) => {
//     event.stopPropagation(); // Prevent propagation when clicking inside the cart
//     setSelected((prevSelected) => !prevSelected); // Toggle selection state
//   };

//   const handleClickOutside = (event) => {
//     // Check if the click is outside the cart
//     if (!event.target.closest(`.${styles.main}`)) {
//       setSelected(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className={styles.body}>
//       <div
//         className={`${styles.main} ${selected ? styles.selected : ""}`}
//         onClick={handleSelection}
//       >
//         <img className={styles.image} src={menuImage} alt={menuName} />
//         <div className={`${styles.content} ${selected ? styles.selectedContent : ""}`}>
//           <div className={styles.menuName}>{menuName}</div>
//           <div className={styles.description}>{description}</div>
//           <div>
//             <div className={styles.price}>{price}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuCart;


// import React from "react";
// import styles from "./menuCart.module.css";

// const MenuCart = ({ menuName, description, price, menuImage, isSelected, onSelect }) => {
//   return (
//     <div
//       className={`${styles.body} ${isSelected ? styles.selected : ""}`}
//       onClick={onSelect} // Call parent-provided function
//     >
//       <div className={`${styles.main} ${isSelected ? styles.selected : ""}`}>
//         <img className={styles.image} src={menuImage} alt={menuName} />
//         <div className={`${styles.content} ${isSelected ? styles.selectedContent : ""}`}>
//           <div className={styles.menuName}>{menuName}</div>
//           <div className={styles.description}>{description}</div>
//           <div>
//             <div className={styles.price}>{price}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuCart;



// import React, { useState } from "react";
// import styles from "./menuCart.module.css";

// const MenuCart = ({ menuName, description, price, menuImage, isSelected, onSelect }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ State for image popup

//   return (
//     <div
//       className={`${styles.body} ${isSelected ? styles.selected : ""}`}
//       onClick={onSelect}
//     >
//       <div className={`${styles.main} ${isSelected ? styles.selected : ""}`}>
//         <img
//           className={styles.image}
//           src={menuImage}
//           alt={menuName}
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent selection event
//             setIsPopupOpen(true);
//           }}
//         />
//         <div className={`${styles.content} ${isSelected ? styles.selectedContent : ""}`}>
//           <div className={styles.menuName}>{menuName}</div>
//           <div className={styles.description}>{description}</div>
//           <div>
//             <div className={styles.price}>{price}</div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Image Popup */}
//       {isPopupOpen && (
//         <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
//           <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
//             <img
//               src={menuImage}
//               alt={menuName}
//               className={styles.popupImage}
//               width="500"
//               height="500"
//             />
//             <button className={styles.closeButton} onClick={() => setIsPopupOpen(false)}>
//               ✖
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuCart;
import React, { useState } from "react";
import styles from "./menuCart.module.css";

const MenuCart = ({ menuName, description, price, menuImage, isSelected, isActive, onSelect }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ Image popup state

  return (
    <div
      className={`${styles.body} ${isSelected ? styles.selected : ""} ${!isActive ? styles.inactiveMenu : ""}`}
      onClick={isActive ? onSelect : null} // ✅ Prevent selection of inactive menus
    >
      <div className={`${styles.main} ${isSelected ? styles.selected : ""}`}>
        <img
          className={styles.image}
          src={menuImage}
          alt={menuName}
          onClick={(e) => {
            if (!isActive) return; // ✅ Prevent popup for inactive menus
            e.stopPropagation(); // Prevent selection event
            setIsPopupOpen(true);
          }}
        />
        <div className={`${styles.content} ${isSelected ? styles.selectedContent : ""}`}>
          <div className={styles.menuName}>{menuName}</div>
          <div className={styles.description}>{description}</div>
          <div>
            <div className={styles.price}>{price}</div>
          </div>
        </div>
      </div>

      {/* ✅ Image Popup with smooth fade-in effect */}
      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <img src={menuImage} alt={menuName} className={styles.popupImage} width="500" height="500" />
            <button className={styles.closeButton} onClick={() => setIsPopupOpen(false)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCart;