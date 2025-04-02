// import React, { useState } from "react";
// import styles from "./filterSection.module.css";

// const FilterSection = () => {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [selectedCategories, setSelectedCategories] = useState({
//     category1: ["Fruits Infused"],
//     category2: ["Fruits Infused"],
//     category3: ["Fruits Infused"],
//   });

//   const categories = [
//     "Fruits Infused",
//     "Biscuits & Snacks",
//     "Fast Food",
//     "Egg Free",
//     "Sweets",
//     "Savory",
//   ];

//   const handleCheckboxChange = (categoryKey, categoryName) => {
//     setSelectedCategories((prev) => {
//       const updated = { ...prev };
//       if (updated[categoryKey].includes(categoryName)) {
//         updated[categoryKey] = updated[categoryKey].filter(
//           (item) => item !== categoryName
//         );
//       } else {
//         updated[categoryKey].push(categoryName);
//       }
//       return updated;
//     });
//   };

//   return (
//     <div className={styles.container}>
//       {/* Price Range Section */}
//       <div className={styles.priceInput}>
//         <div>
//           <label>Min price</label>
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className={styles.inputField}
//           />
//         </div>

//         {/* Minus Sign in Between */}
//         <span className={styles.minusSign}>-</span>

//         <div>
//           <label>Max price</label>
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className={styles.inputField}
//           />
//         </div>
//       </div>

//       {/* Price Slider */}
//       <input
//         type="range"
//         min="0"
//         max="300"
//         value={maxPrice}
//         onChange={(e) => setMaxPrice(e.target.value)}
//         className={styles.priceSlider}
//       />

//       {/* Price & Filter Button in one row */}
//       <div className={styles.priceFilterContainer}>
//         <p className={styles.priceText}>
//           Price: Rs. {minPrice} <span className={styles.minusSign}>-</span> Rs. {maxPrice}
//         </p>
//         <button className={styles.filterButton}>Filter</button>
//       </div>

//       {/* Categories Section */}
//       {[1, 2, 3].map((num) => (
//         <div key={num} className={styles.categoryContainer}>
//           <h3 className={styles.categoryTitle}>Product Categories {num}</h3>
//           <ul>
//             {categories.map((category, index) => (
//               <li key={index} className={styles.checkboxContainer}>
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories[`category${num}`].includes(category)}
//                   onChange={() => handleCheckboxChange(`category${num}`, category)}
//                   className={styles.customCheckbox}
//                 />
//                 <label
//                   className={
//                     selectedCategories[`category${num}`].includes(category)
//                       ? styles.redHighlight
//                       : styles.normalLabel
//                   }
//                 >
//                   {category}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterSection;


import React, { useState } from "react";
import styles from "./filterSection.module.css";

const FilterSection = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Fruits Infused",
    "Biscuits & Snacks",
    "Fast Food",
    "Egg Free",
    "Sweets",
    "Savory",
  ];

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleFilter = () => {
    onFilterChange({ minPrice, maxPrice, category: selectedCategories.join(",") });
  };

  return (
    <div className={styles.container}>
      {/* Price Range Section */}
      <div className={styles.priceInput}>
        <div>
          <label>Min price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <span className={styles.minusSign}>-</span>

        <div>
          <label>Max price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.inputField}
          />
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="300"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className={styles.priceSlider}
      />

      <div className={styles.priceFilterContainer}>
        <p className={styles.priceText}>
          Price: Rs. {minPrice} <span className={styles.minusSign}>-</span> Rs. {maxPrice}
        </p>
        <button className={styles.filterButton} onClick={handleFilter}>Filter</button>
      </div>

      {[1, 2, 3].map((num) => (
        <div key={num} className={styles.categoryContainer}>
          <h3 className={styles.categoryTitle}>Product Categories {num}</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className={styles.customCheckbox}
                />
                <label
                  className={
                    selectedCategories.includes(category)
                      ? styles.redHighlight
                      : styles.normalLabel
                  }
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
