import React, { useState, useRef } from "react";
import styles from "./giftBoxesForBulkPage.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import pic from './Assets/snacks.png';


const giftBoxCategories = [
  { _id: "1", name: "Wedding", image: {pic}},
  { _id: "2", name: "Birthday", image: {pic} },
  { _id: "3", name: "Festive", image: {pic} },
  { _id: "4", name: "Corporate", image:{pic} },
];

const sampleGiftBoxes = {
  Wedding: [
    {
      _id: "wb1",
      name: "Royal Wedding Gift Box",
      image: {pic},
      description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
      price: 1500,
      minOrderQuantity: 5,
      designs: [
        { name: "Golden Design", image: {pic} },
        { name: "Floral Design", image:{pic} },
      ],
    },
    {
      _id: "wb2",
      name: "Elegant Wedding Box",
      image: {pic},
      description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
      price: 1200,
      minOrderQuantity: 3,
      designs: [
        { name: "Silk Wrap", image: {pic} },
        { name: "Lace Design", image: {pic} },
        { name: "Royal Embroidery", image: {pic} },
      ],
    },
  ],
  Birthday: [
    {
      _id: "bb1",
      name: "Colorful Birthday Gift Box",
        image: {pic},
      description: "Fun and vibrant packaging filled with sweets and chocolates.",
      price: 800,
      minOrderQuantity: 2,
      designs: [],
    },
  ],
};

const GiftBox = () => {
  const [selectedCategory, setSelectedCategory] = useState(giftBoxCategories[0].name);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += direction === "left" ? -200 : 200;
    }
  };

  return (
    <div className={styles.giftBoxContainer}>
      {/* Gift Box Categories */}
      <div className={styles.subcategoriesWrapper}>
        <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
        <div className={styles.subcategories} ref={categoriesRef}>
          {giftBoxCategories.map((category) => (
            <div
              key={category._id}
              className={`${styles.subcategoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
              onClick={() => {
                setSelectedCategory(category.name);
                setSelectedBox(null);
                setSelectedDesign(null);
                setQuantity(1);
              }}
            >
              <img src={category.image} alt={category.name} className={styles.subcategoryImage} />
              <p className={styles.subcategoryName}>{category.name}</p>
            </div>
          ))}
        </div>
        <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
      </div>

      {/* Display Gift Boxes */}
      <div className={styles.boxSelection}>
        {sampleGiftBoxes[selectedCategory]?.map((box) => (
          <div key={box._id} className={styles.boxCard} onClick={() => setSelectedBox(box)}>
            <img src={box.image} alt={box.name} className={styles.boxImage} />
            <h3>{box.name}</h3>
            <p>{box.description}</p>
            <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
          </div>
        ))}
      </div>

      {/* Selected Gift Box Details */}
      {selectedBox && (
        <div className={styles.selectedBoxContainer}>
          <h2>{selectedBox.name}</h2>
          <img src={selectedBox.image} alt={selectedBox.name} className={styles.selectedBoxImage} />
          <p>{selectedBox.description}</p>
          <p>Price: ₹{selectedBox.price} | Min Order: {selectedBox.minOrderQuantity}</p>

          {/* Display Designs if Available */}
          {selectedBox.designs.length > 0 && (
            <>
              <h3>Select a Design:</h3>
              <div className={styles.designSelection}>
                {selectedBox.designs.map((design) => (
                  <div
                    key={design.name}
                    className={`${styles.designCard} ${selectedDesign?.name === design.name ? styles.active : ""}`}
                    onClick={() => setSelectedDesign(design)}
                  >
                    <img src={design.image} alt={design.name} className={styles.designImage} />
                    <p>{design.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Quantity Selection */}
          <div className={styles.quantitySelector}>
            <button onClick={() => setQuantity((prev) => Math.max(prev - 1, selectedBox.minOrderQuantity))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>

          {/* Select Button */}
          <button className={styles.selectButton}>Select</button>
        </div>
      )}
    </div>
  );
};

export default GiftBox;