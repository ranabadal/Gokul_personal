// import React from "react";
// import styles from "./hall_detail.module.css";

// const HallDetails = ({ name, price, seating, platePrice, description, rating, images, icons, fromDate, toDate, fromTime, toTime, onDateChange, onImageClick, showMoreImages, selectedImage }) => {
//     const handleCardClick = (index) => {
//         if (index === 4 && showMoreImages) {
//             alert("Show more images");
//         } else {
//             onImageClick(images[index]);
//         }
//     };

//     return (
//         <div className={styles.hall_details}>
//             <div className={styles.hall_details_left}>

//                 <div className={styles.hall_details_left_top}>

//                     <div className={styles.hall_details_left_top_line1}>
//                         <div className={styles.hall_details_left_top_left_heading}>
//                             {name}
//                         </div>
//                         <div className={styles.hall_details_left_top__right}>
//                             <img src={icons.heart} alt="heart" />
//                         </div>
                        
//                     </div>
//                     <div className={styles.hall_details_left_top_line2}>
//                     <div className={styles.hall_details_left_top_price}>{price}</div>
//                         <div className={styles.hall_details_left_rating}>
//                             {[...Array(5)].map((_, index) => (
//                                 <div key={index} className={styles.hall_details_left_rating_star}>
//                                     <img src={icons.star} alt="star" />
//                                 </div>
                                
//                             ))}
//                             <div className={styles.hall_details_left_rating_number}>{rating}</div>
                            
//                         </div>
//                     </div>
                    
//                     <div className={styles.hall_details_left_top_seating}>
//                         <div className={styles.hall_details_left_top_seating_left}>{seating}</div>
//                         <div className={styles.hall_details_left_top_seating_right}>{platePrice}</div>
//                     </div>

//                 </div>

//                 <div className={styles.hall_details_left_descption}>
//                     {description}
//                 </div>
//                 <div className={styles.hall_details_left_cards}>
//                     {images.slice(0, 4).map((image, index) => (
//                         <div key={index} className={`${styles.hall_details_left_cards_left} ${selectedImage === image ? styles.selected : ''}`} onClick={() => handleCardClick(index)}>
//                             <img src={image} alt={`card${index + 1}`} className={selectedImage === image ? 'selected' : ''} />
//                         </div>
//                     ))}
//                     {images.length > 4 && (
//                         <div className={`${styles.hall_details_left_cards_left} ${selectedImage === images[4] ? styles.selected : ''}`} onClick={() => handleCardClick(4)}>
//                             <img src={images[4]} alt="card5" className={selectedImage === images[4] ? 'selected' : ''} />
//                             <div className={styles.more_images_overlay}>+{images.length - 5}</div>
//                         </div>
//                     )}
//                 </div>
                
//                 <div className={styles.hall_details_left_bottom_box}>
//                         <button className={styles.hall_details_left_bottom_box_button}>Check Availability</button>
//                 </div>
//             </div>
//             <div className={styles.hall_details_right}>
//                 <img src={selectedImage} alt="selected" className="selected" />
//             </div>
//         </div>
//     );
// };

// export default HallDetails;



import React, { useState } from "react";
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

    const handleCardClick = (index) => {
        if (index === 4 && showMoreImages) {
            // Toggle visibility of extra images
            setShowExtraImages(true);
        } else {
            onImageClick(images[index]); // Pass the clicked image to the parent
        }
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
                    {images.slice(0, 4).map((image, index) => (
                        <div
                            key={index}
                            className={`${styles.hall_details_left_cards_left} ${
                                selectedImage === image ? styles.selected : ""
                            }`}
                            onClick={() => handleCardClick(index)}
                        >
                            <img
                                src={image}
                                alt={`card${index + 1}`}
                                className={selectedImage === image ? "selected" : ""}
                            />
                        </div>
                    ))}
                    {images.length > 4 && !showExtraImages && (
                        <div
                            className={`${styles.hall_details_left_cards_left} ${
                                selectedImage === images[4] ? styles.selected : ""
                            }`}
                            onClick={() => handleCardClick(4)}
                        >
                            <img
                                src={images[4]}
                                alt="card5"
                                className={selectedImage === images[4] ? "selected" : ""}
                            />
                            <div className={styles.more_images_overlay}>+{images.length - 5}</div>
                        </div>
                    )}
                </div>

                {/* Render extra images in a row with the same style */}
                {showExtraImages && (
                    <div className={styles.extra_images}>
                        {images.slice(4).map((image, index) => (
                            <div
                                key={index}
                                className={styles.hall_details_left_cards_left}
                                onClick={() => onImageClick(image)}
                            >
                                <img src={image} alt={`extra_img_${index + 1}`} />
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
                <img src={selectedImage} alt="selected" className="selected" />
            </div>
        </div>
    );
};

export default HallDetails;




