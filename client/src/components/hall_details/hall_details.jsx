

import React, { useState , useEffect} from "react";
import styles from "./hall_detail.module.css";
import { useNavigate } from "react-router-dom";

const HallDetails = ({
    name,
    price,
    seating,
    platePrice,
    description,
    rating,
    images,
    icons,
    onImageClick,
    showMoreImages,
    onAddToWishlist,
    selectedImage,
    
     onCheckAvailability
}) => {
    const [showExtraImages, setShowExtraImages] = useState(false); // State to toggle extra images
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-cycle images every 3 seconds
    useEffect(() => {
      if (images && images.length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1900);
        return () => clearInterval(interval);
      }
    }, [images]);


  // When a user clicks a bottom image, update the current index to display it immediately.
  const handleCardClick = (index) => {
    if (index === 4 && !showExtraImages) {
      // If clicking the 5th image (index 4) and extra images are not yet shown,
      // toggle to show extra images.
      setShowExtraImages(true);
    } else {
      setCurrentImageIndex(index);
    }
  };

  // For extra images, adjust the index offset by 4.
  const handleExtraImageClick = (index) => {
    setCurrentImageIndex(index + 4);
  };


      const navigate = useNavigate();

    return (
        <div className={`${styles.hall_details} ${showExtraImages ? styles.expanded : ""}`}>
            <div className={styles.hall_details_left}>
                <div className={styles.hall_details_left_top}>
                    <div className={styles.hall_details_left_top_line1}>
                        <div className={styles.hall_details_left_top_left_heading}>{name}</div>
                        {/* <div className={styles.hall_details_left_top_right}>
                            <img src={icons.heart} alt="heart"  onClick={onAddToWishlist}/>
                        </div> */}
                    </div>
                    <div className={styles.hall_details_left_top_line2}>
                        <div className={styles.hall_details_left_top_price}>{price}</div>
                        <div className={styles.hall_details_left_rating}>
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className={styles.hall_details_left_rating_star}>
                                    <img src={icons.star} alt="star" />
                                </div>
                            ))}
                            <div className={styles.hall_details_left_rating_number}>{rating}</div>
                        </div>
                    </div>
                    <div className={styles.hall_details_left_top_seating}>
                        <div className={styles.hall_details_left_top_seating_left}>{seating}</div>
                        {/* <div className={styles.hall_details_left_top_seating_right}>{platePrice}</div> */}
                    </div>
                </div>

                <div className={styles.hall_details_left_descption}>{description}</div>

                <div className={styles.hall_details_left_cards}>
          {images.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className={`${styles.hall_details_left_cards_left} ${
                currentImageIndex === index ? styles.selected : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <img src={img} alt={`card${index + 1}`} className={currentImageIndex === index ? "selected" : ""} />
            </div>
          ))}
          {images.length > 4 && !showExtraImages && (
            <div
              className={`${styles.hall_details_left_cards_left} ${
                currentImageIndex === 4 ? styles.selected : ""
              }`}
              onClick={() => handleCardClick(4)}
            >
              <img src={images[4]} alt="card5" className={currentImageIndex === 4 ? "selected" : ""} />
              {images.length > 5 && <div className={styles.more_images_overlay}>+{images.length - 5}</div>}
            </div>
          )}
        </div>

        {showExtraImages && (
          <div className={styles.extra_images}>
            {images.slice(4).map((img, index) => (
              <div
                key={index}
                className={styles.hall_details_left_cards_left}
                onClick={() => handleExtraImageClick(index)}
              >
                <img src={img} alt={`extra_img_${index + 1}`} />
              </div>
            ))}
          </div>
        )}



                <div className={styles.hall_details_left_bottom_box}>
                    {/* <button className={styles.hall_details_left_bottom_box_button} onClick={() => navigate("/cartringForm")}>Check Availability</button> */}
                                        <button className={styles.hall_details_left_bottom_box_button}   onClick={() => onCheckAvailability({
      title: name, // Hall title
      seatingCapacity: seating, // Seating capacity
      images: images ,
      hallPrice: price
    })}>Check Availability</button>
                </div>
            </div>
            <div className={styles.hall_details_right}>
        {images && images.length > 0 && (
          <img src={images[currentImageIndex]} alt="selected" className="selected" />
        )}
      </div>
        </div>
    );
};

export default HallDetails;



// import React, { useState, useEffect } from "react";
// import styles from "./hall_detail.module.css";
// import { useNavigate } from "react-router-dom";

// const HallDetails = ({
//   name,
//   price,
//   seating,
//   platePrice,
//   description,
//   rating,
//   images,
//   icons,
//   onImageClick, // You can still pass this if needed
//   showMoreImages,
//   onAddToWishlist,
//   selectedImage, // This prop is no longer used for right side; we use auto-cycle
//   onCheckAvailability,
// }) => {
//   const [showExtraImages, setShowExtraImages] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Auto-cycle images every 3 seconds
//   useEffect(() => {
//     if (images && images.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//       }, 1900);
//       return () => clearInterval(interval);
//     }
//   }, [images]);

//   // When a user clicks a bottom image, update the current index to display it immediately.
//   const handleCardClick = (index) => {
//     if (index === 4 && !showExtraImages) {
//       // If clicking the 5th image (index 4) and extra images are not yet shown,
//       // toggle to show extra images.
//       setShowExtraImages(true);
//     } else {
//       setCurrentImageIndex(index);
//     }
//   };

//   // For extra images, adjust the index offset by 4.
//   const handleExtraImageClick = (index) => {
//     setCurrentImageIndex(index + 4);
//   };

//   const navigate = useNavigate();

//   return (
//     <div className={`${styles.hall_details} ${showExtraImages ? styles.expanded : ""}`}>
//       <div className={styles.hall_details_left}>
//         <div className={styles.hall_details_left_top}>
//           <div className={styles.hall_details_left_top_line1}>
//             <div className={styles.hall_details_left_top_left_heading}>{name}</div>
//             {/* Wishlist icon can be added if needed */}
//           </div>
//           <div className={styles.hall_details_left_top_line2}>
//             <div className={styles.hall_details_left_top_price}>{price}</div>
//             <div className={styles.hall_details_left_rating}>
//               {[...Array(5)].map((_, index) => (
//                 <div key={index} className={styles.hall_details_left_rating_star}>
//                   <img src={icons.star} alt="star" />
//                 </div>
//               ))}
//               <div className={styles.hall_details_left_rating_number}>{rating}</div>
//             </div>
//           </div>
//           <div className={styles.hall_details_left_top_seating}>
//             <div className={styles.hall_details_left_top_seating_left}>{seating}</div>
//           </div>
//         </div>

//         <div className={styles.hall_details_left_descption}>{description}</div>

        // <div className={styles.hall_details_left_cards}>
        //   {images.slice(0, 4).map((img, index) => (
        //     <div
        //       key={index}
        //       className={`${styles.hall_details_left_cards_left} ${
        //         currentImageIndex === index ? styles.selected : ""
        //       }`}
        //       onClick={() => handleCardClick(index)}
        //     >
        //       <img src={img} alt={`card${index + 1}`} className={currentImageIndex === index ? "selected" : ""} />
        //     </div>
        //   ))}
        //   {images.length > 4 && !showExtraImages && (
        //     <div
        //       className={`${styles.hall_details_left_cards_left} ${
        //         currentImageIndex === 4 ? styles.selected : ""
        //       }`}
        //       onClick={() => handleCardClick(4)}
        //     >
        //       <img src={images[4]} alt="card5" className={currentImageIndex === 4 ? "selected" : ""} />
        //       {images.length > 5 && <div className={styles.more_images_overlay}>+{images.length - 5}</div>}
        //     </div>
        //   )}
        // </div>

        // {showExtraImages && (
        //   <div className={styles.extra_images}>
        //     {images.slice(4).map((img, index) => (
        //       <div
        //         key={index}
        //         className={styles.hall_details_left_cards_left}
        //         onClick={() => handleExtraImageClick(index)}
        //       >
        //         <img src={img} alt={`extra_img_${index + 1}`} />
        //       </div>
        //     ))}
        //   </div>
        // )}

//         <div className={styles.hall_details_left_bottom_box}>
//           <button
//             className={styles.hall_details_left_bottom_box_button}
//             onClick={() =>
//               onCheckAvailability({
//                 title: name,
//                 seatingCapacity: seating,
//                 images: images,
//                 hallPrice: price,
//               })
//             }
//           >
//             Check Availability
//           </button>
//         </div>
//       </div>
    //   <div className={styles.hall_details_right}>
    //     {images && images.length > 0 && (
    //       <img src={images[currentImageIndex]} alt="selected" className="selected" />
    //     )}
    //   </div>
//     </div>
//   );
// };

// export default HallDetails;