// import React, { useState, useRef } from "react";
// import styles from "./giftBoxesForBulkPage.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import pic from '../Assets/snacks.png';


// const giftBoxCategories = [
//   { _id: "1", name: "Wedding", image: pic},
//   { _id: "2", name: "Birthday", image: pic },
//   { _id: "3", name: "Festive", image: pic },
//   { _id: "4", name: "Corporate", image:pic},
// ];

// const sampleGiftBoxes = {
//   Wedding: [
//     {
//       _id: "wb1",
//       name: "Royal Wedding Gift Box",
//       image: pic,
//       description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//       price: 1500,
//       minOrderQuantity: 5,
//       designs: [
//         { name: "Golden Design", image: {pic} },
//         { name: "Floral Design", image:{pic} },
//       ],
//     },
//     {
//       _id: "wb3",
//       name: "Elegant Wedding Box",
//       image: pic,
//       description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//       price: 1200,
//       minOrderQuantity: 3,
//       designs: [
//         { name: "Silk Wrap", image: {pic} },
//         { name: "Lace Design", image: {pic} },
//         { name: "Royal Embroidery", image: {pic} },
//       ],
//     },
//     {
//         _id: "wb1",
//         name: "Royal Wedding Gift Box",
//         image: pic,
//         description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//         price: 1500,
//         minOrderQuantity: 5,
//         designs: [
//           { name: "Golden Design", image: {pic} },
//           { name: "Floral Design", image:{pic} },
//         ],
//       },
//       {
//         _id: "wb4",
//         name: "Elegant Wedding Box",
//         image: pic,
//         description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//         price: 1200,
//         minOrderQuantity: 3,
//         designs: [
//           { name: "Silk Wrap", image: {pic} },
//           { name: "Lace Design", image: {pic} },
//           { name: "Royal Embroidery", image: {pic} },
//         ],
//       },
//       {
//         _id: "wb1",
//         name: "Royal Wedding Gift Box",
//         image: pic,
//         description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//         price: 1500,
//         minOrderQuantity: 5,
//         designs: [
//           { name: "Golden Design", image: {pic} },
//           { name: "Floral Design", image:{pic} },
//         ],
//       },
//       {
//         _id: "wb3",
//         name: "Elegant Wedding Box",
//         image: pic,
//         description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//         price: 1200,
//         minOrderQuantity: 3,
//         designs: [
//           { name: "Silk Wrap", image: {pic} },
//           { name: "Lace Design", image: {pic} },
//           { name: "Royal Embroidery", image: {pic} },
//         ],
//       },
//       {
//           _id: "wb1",
//           name: "Royal Wedding Gift Box",
//           image: pic,
//           description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//           price: 1500,
//           minOrderQuantity: 5,
//           designs: [
//             { name: "Golden Design", image: {pic} },
//             { name: "Floral Design", image:{pic} },
//           ],
//         },
//         {
//           _id: "wb4",
//           name: "Elegant Wedding Box",
//           image: pic,
//           description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//           price: 1200,
//           minOrderQuantity: 3,
//           designs: [
//             { name: "Silk Wrap", image: {pic} },
//             { name: "Lace Design", image: {pic} },
//             { name: "Royal Embroidery", image: {pic} },
//           ],
//         },
//   ],
//   Birthday: [
//     {
//       _id: "bb1",
//       name: "Colorful Birthday Gift Box",
//         image: pic,
//       description: "Fun and vibrant packaging filled with sweets and chocolates.",
//       price: 800,
//       minOrderQuantity: 2,
//       designs: [],
//     },
//   ],
// };

// const GiftBox = () => {
//   const [selectedCategory, setSelectedCategory] = useState(giftBoxCategories[0].name);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const categoriesRef = useRef(null);

//   const scrollCategories = (direction) => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollLeft += direction === "left" ? -200 : 200;
//     }
//   };

//   return (
//     <div className={styles.giftBoxContainer}>
//       {/* Gift Box Categories */}
//       <div className={styles.subcategoriesWrapper}>
//         <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
//         <div className={styles.subcategories} ref={categoriesRef}>
//           {giftBoxCategories.map((category) => (
//             <div
//               key={category._id}
//               className={`${styles.subcategoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
//               onClick={() => {
//                 setSelectedCategory(category.name);
//                 setSelectedBox(null);
//                 setSelectedDesign(null);
//                 setQuantity(1);
//               }}
//             >
//               <img src={category.image} alt={category.name} className={styles.subcategoryImage} />
//               <p className={styles.subcategoryName}>{category.name}</p>
//             </div>
//           ))}
//         </div>
//         <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
//       </div>

//       {/* Display Gift Boxes */}
//       <div className={styles.boxSelection}>
//         {sampleGiftBoxes[selectedCategory]?.map((box) => (
//           <div key={box._id} className={styles.boxCard} onClick={() => setSelectedBox(box)}>
//             <img src={box.image} alt={box.name} className={styles.boxImage} />
//             <h3>{box.name}</h3>
//             <p>{box.description}</p>
//             <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
//           </div>
//         ))}
//       </div>

//       {/* Selected Gift Box Details */}
//       {selectedBox && (
//         <div className={styles.selectedBoxContainer}>
//           <h2>{selectedBox.name}</h2>
//           <img src={selectedBox.image} alt={selectedBox.name} className={styles.selectedBoxImage} />
//           <p>{selectedBox.description}</p>
//           <p>Price: ₹{selectedBox.price} | Min Order: {selectedBox.minOrderQuantity}</p>

//           {/* Display Designs if Available */}
//           {selectedBox.designs.length > 0 && (
//             <>
//               <h3>Select a Design:</h3>
//               <div className={styles.designSelection}>
//                 {selectedBox.designs.map((design) => (
//                   <div
//                     key={design.name}
//                     className={`${styles.designCard} ${selectedDesign?.name === design.name ? styles.active : ""}`}
//                     onClick={() => setSelectedDesign(design)}
//                   >
//                     <img src={design.image} alt={design.name} className={styles.designImage} />
//                     <p>{design.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Quantity Selection */}
//           <div className={styles.quantitySelector}>
//             <button onClick={() => setQuantity((prev) => Math.max(prev - 1, selectedBox.minOrderQuantity))}>-</button>
//             <span>{quantity}</span>
//             <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
//           </div>

//           {/* Select Button */}
//           <button className={styles.selectButton}>Select</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiftBox;


// import React, { useState, useRef, useEffect } from "react";
// import styles from "./giftBoxesForBulkPage.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import pic from '../Assets/snacks.png';

// const giftBoxCategories = [
//   { _id: "1", name: "Wedding", image: pic },
//   { _id: "2", name: "Birthday", image: pic },
//   { _id: "3", name: "Festive", image: pic },
//   { _id: "4", name: "Corporate", image: pic },
//   { _id: "5", name: "Wedding", image: pic },
 
// ];
// const sampleGiftBoxes = {
//     Wedding: [
//       {
//         _id: "wb1",
//         name: "Royal Wedding Gift Box",
//         image: pic,
//         description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//         price: 1500,
//         minOrderQuantity: 5,
//         designs: [
//             { name: "Silk Wrap", image: pic },
//             { name: "Lace Design", image: pic },
//             { name: "Royal Embroidery", image: pic },
//         ],
//       },
//       {
//         _id: "wb2",
//         name: "Elegant Wedding Box",
//         image: pic,
//         description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//         price: 1200,
//         minOrderQuantity: 3,
//         designs: [
//             { name: "Silk Wrap", image: pic },
//             { name: "Lace Design", image: pic },
//             { name: "Royal Embroidery", image: pic },
//         ],
//       },
//       {
//           _id: "wb3",
//           name: "Royal Wedding Gift Box",
//           image: pic,
//           description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//           price: 1500,
//           minOrderQuantity: 5,
//           designs: [
//             { name: "Silk Wrap", image: pic },
//             { name: "Lace Design", image: pic },
//             { name: "Royal Embroidery", image: pic },
//           ],
//         },
//         {
//           _id: "wb4",
//           name: "Elegant Wedding Box",
//           image: pic,
//           description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//           price: 1200,
//           minOrderQuantity: 3,
//           designs: [
//             { name: "Silk Wrap", image: pic },
//             { name: "Lace Design", image: pic },
//             { name: "Royal Embroidery", image: pic },
//           ],
//         },
//         {
//           _id: "wb5",
//           name: "Royal Wedding Gift Box",
//           image: pic,
//           description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//           price: 1500,
//           minOrderQuantity: 5,
//           designs: [
//             { name: "Golden Design", image: pic },
//             { name: "Floral Design", image:pic },
//           ],
//         },
//         {
//           _id: "wb6",
//           name: "Elegant Wedding Box",
//           image: pic,
//           description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//           price: 1200,
//           minOrderQuantity: 3,
//           designs: [
//             { name: "Silk Wrap", image: pic },
//             { name: "Lace Design", image: pic },
//             { name: "Royal Embroidery", image: pic },
//           ],
//         },
//         {
//             _id: "wb7",
//             name: "Royal Wedding Gift Box",
//             image: pic,
//             description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//             price: 1500,
//             minOrderQuantity: 5,
//             designs: [
//               { name: "Golden Design", image: pic },
//               { name: "Floral Design", image:pic },
//             ],
//           },
//           {
//             _id: "wb8",
//             name: "Elegant Wedding Box",
//             image: pic,
//             description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//             price: 1200,
//             minOrderQuantity: 3,
//             designs: [
//               { name: "Silk Wrap", image: pic },
//               { name: "Lace Design", image: pic },
//               { name: "Royal Embroidery", image: pic },
//             ],
//           },
//     ],
//     Birthday: [
//       {
//         _id: "bb1",
//         name: "Colorful Birthday Gift Box",
//           image: pic,
//         description: "Fun and vibrant packaging filled with sweets and chocolates.",
//         price: 800,
//         minOrderQuantity: 2,
//         designs: [],
//       },
//     ],
//   };

// const GiftBox = () => {
//   const [selectedCategory, setSelectedCategory] = useState(giftBoxCategories[0].name);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [quantity, setQuantity] = useState();
//   const categoriesRef = useRef(null);


//   useEffect(() => {
//     if (selectedBox) {
//       setQuantity(selectedBox.minOrderQuantity); // ✅ Set default quantity to min order
//     }
//   }, [selectedBox]); // ✅ Runs whenever a new box is selected

//   const scrollCategories = (direction) => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className={styles.giftBoxContainer}>
//       {/* Categories at the Top */}
//       <div className={styles.subcategoriesWrapper}>
//         <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
//         <div className={styles.subcategories} ref={categoriesRef}>
//           {giftBoxCategories.map((category) => (
//             <div
//               key={category._id}
//               className={`${styles.subcategoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
//               onClick={() => {
//                 setSelectedCategory(category.name);
//                 setSelectedBox(null);
//                 setSelectedDesign(null);
//                 setQuantity(1);
//               }}
//             >
//               <img src={category.image} alt={category.name} className={styles.subcategoryImage} />
//               <p className={styles.subcategoryName}>{category.name}</p>
//             </div>
//           ))}
//         </div>
//         <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
//       </div>

//       {/* If a Box is Selected, Show Back Button */}
//       {selectedBox && (
//         <>
         

//           {/* Display Selected Gift Box */}
//             <div className={styles.selectedBoxMainConatiner}>
//           <div className={styles.selectedBoxContainer}>
//           <button className={styles.backButton} onClick={() => setSelectedBox(null)}>← Back</button>
//           <h2>{selectedDesign?.name || selectedBox.designs[0].name}</h2>
//               <img src={selectedDesign?.image || selectedBox.image} alt={selectedBox.name} className={styles.selectedBoxImage} />

//               <p>{selectedBox.description}</p>
//               <p>Price: ₹{selectedBox.price} | Min Order: {selectedBox.minOrderQuantity}</p>

//               {/* Display Designs if Available */}
//               {selectedBox.designs.length > 0 && (
//                 <>
//                   <h3>Select a Design:</h3>
//                   <div className={styles.designSelection}>
//                     {selectedBox.designs.map((design) => (
//                       <div
//                         key={design.name}
//                         className={`${styles.designCard} ${selectedDesign?.name === design.name ? styles.active : ""}`}
//                         onClick={() => setSelectedDesign(design)}
//                       >
//                         <img src={design.image} alt={design.name} className={styles.designImage} />
//                         <p>{design.name}</p>
//                       </div>

//                   ))}
//                 </div>
//               </>
//             )}

//             {/* Quantity Selection */}
//             <div className={styles.quantitySelector}>
//   <button onClick={() => setQuantity((prev) => Math.max(prev - 1, selectedBox.minOrderQuantity))} disabled={quantity <= selectedBox.minOrderQuantity}>
//     -
//   </button>
//   <span>{quantity}</span>
//   <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
// </div>

//             {/* Select Button */}
//             <button className={styles.selectButton}>Select</button>
//           </div>

//           {/* Other Boxes in the Same Category */}
//           <div className={styles.otherBoxes}>
//   <h3 className={styles.otherBoxesHeading}>Other Boxes in {selectedCategory}</h3>
//   <div className={styles.boxSelection}>
//     {sampleGiftBoxes[selectedCategory]
//       ?.filter((box) => box._id !== selectedBox?._id) /* ✅ Exclude selected box */
//       .map((box) => (
//         <div key={box._id} className={styles.boxCard} onClick={() => setSelectedBox(box)}>
//           <img src={box.image} alt={box.name} className={styles.boxImage} />
//           <h3>{box.name}</h3>
//           <p>{box.description}</p>
//           <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
//         </div>
//       ))}
//   </div>
// </div>
//             </div>
//         </>
//       )}

//       {/* Default Gift Box Selection */}
//       {!selectedBox && (
//         <div className={styles.boxSelection}>
//           {sampleGiftBoxes[selectedCategory]?.map((box) => (
//             <div key={box._id} className={styles.boxCard} onClick={() => setSelectedBox(box)}>
//               <img src={box.image} alt={box.name} className={styles.boxImage} />
//               <h3>{box.name}</h3>
//               <p>{box.description}</p>
//               <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiftBox;



// import React, { useState, useRef, useEffect } from "react";
// import styles from "./giftBoxesForBulkPage.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import pic from '../Assets/snacks.png';

// const giftBoxCategories = [
//   { _id: "1", name: "Wedding", image: pic },
//   { _id: "2", name: "Birthday", image: pic },
//   { _id: "3", name: "Festive", image: pic },
//   { _id: "4", name: "Corporate", image: pic },
// ];

// const sampleGiftBoxes = {
//   Wedding: [
//     {
//       _id: "wb1",
//       name: "Royal Wedding Gift Box",
//       image: pic,
//       description: "Includes premium sweets, dry fruits, and a luxurious presentation.",
//       price: 1500,
//       minOrderQuantity: 5,
//       matchingHandbags: [
//         { _id: "hb1", name: "Royal Wedding Handbag", image: pic, price: 500, minOrderQuantity: 2 },
//         { _id: "hb2", name: "Elegant Wedding Handbag", image: pic, price: 600, minOrderQuantity: 3 },
//       ],
//     },
//     {
//       _id: "wb2",
//       name: "Elegant Wedding Box",
//       image: pic,
//       description: "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//       price: 1200,
//       minOrderQuantity: 3,
//       matchingHandbags: [
//         { _id: "hb3", name: "Luxury Wedding Handbag", image: pic, price: 700, minOrderQuantity: 2 },
//       ],
//     },
//   ],
// };

// const sampleHandbags = {
//   Wedding: [
//     { _id: "ghw1", name: "Classic Wedding Handbag", image: pic, price: 800, minOrderQuantity: 5},
//     { _id: "ghw2", name: "Golden Embroidered Wedding Bag", image: pic, price: 1200, minOrderQuantity: 2 },
//   ],
//   Birthday: [
//     { _id: "ghb1", name: "Vibrant Birthday Handbag", image: pic, price: 600, minOrderQuantity: 1 },
//     { _id: "ghb2", name: "Sparkling Party Handbag", image: pic, price: 900, minOrderQuantity: 2 },
//   ],
//   Festive: [
//     { _id: "ghf1", name: "Elegant Festive Handbag", image: pic, price: 1100, minOrderQuantity: 1 },
//     { _id: "ghf2", name: "Colorful Celebration Handbag", image: pic, price: 950, minOrderQuantity: 1 },
//   ],
//   Corporate: [
//     { _id: "ghc1", name: "Premium Leather Corporate Handbag", image: pic, price: 1500, minOrderQuantity: 1 },
//     { _id: "ghc2", name: "Minimalist Executive Handbag", image: pic, price: 1300, minOrderQuantity: 2 },
//   ],
// };

// const GiftBox = () => {
//   const [selectedCategory, setSelectedCategory] = useState(giftBoxCategories[0].name);
//   const [selectedBox, setSelectedBox] = useState(null);
//   const [quantity, setQuantity] = useState();
//   const [selectedHandbags, setSelectedHandbags] = useState({});
//   const [zoomedImage, setZoomedImage] = useState(null);

//   const categoriesRef = useRef(null);
//   const [selectedGiftBoxes, setSelectedGiftBoxes] = useState([]); // ✅ Allows multiple gift box selections
// const [selectedHandbag, setSelectedHandbag] = useState(null); // ✅ Track selected general handbag


// const handleGeneralHandbagSelection = (handbag) => {
//   setSelectedHandbags((prev) => ({
//     ...prev,
//     [handbag._id]: prev[handbag._id] ? undefined : handbag.minOrderQuantity, // ✅ Ensure default quantity is set
//   }));
// };

// const handleGiftBoxSelection = (box) => {
//   setSelectedGiftBoxes((prev) => {
//     const exists = prev.some((selected) => selected.id === box._id);
//     return exists
//       ? prev.filter((selected) => selected.id !== box._id) // ✅ Remove if already selected
//       : [...prev, { id: box._id, name: box.name, quantity: box.minOrderQuantity, matchingHandbags: [] }]; // ✅ Store multiple selections properly
//   });
// };

// const handleFinalSelection = () => {
//   const selectedData = {
//     giftBoxes: selectedGiftBoxes.map((box) => ({
//       id: box._id,
//       name: box.name,
//       quantity: box.quantity || box.minOrderQuantity, // ✅ Ensure quantity is stored
//       matchingHandbags: box.matchingHandbags.map(h => ({
//         id: h.id,
//         name: h.name,
//         quantity: selectedHandbags[h.id] || h.quantity,
//       }))
      
//       // ✅ Track handbags for each gift box
//         ? Object.entries(selectedHandbags)
//             .filter(([handbagId]) => selectedBox?.matchingHandbags.some((h) => h._id === handbagId))
//             .map(([handbagId, qty]) => ({
//               id: handbagId,
//               name: selectedBox?.matchingHandbags?.find((h) => h._id === handbagId)?.name,
//               quantity: qty,
//             }))
//         : [],
//     })),

//     generalHandbags: Object.entries(selectedHandbags)
//       .filter(([handbagId]) => !selectedBox?.matchingHandbags.some((h) => h._id === handbagId)) // ✅ Track independent handbags
//       .map(([handbagId, qty]) => ({
//         id: handbagId,
//         name: sampleHandbags[selectedCategory]?.find((h) => h._id === handbagId)?.name,
//         quantity: qty,
//       })),
//   };

//   console.log("Final Selection:", selectedData);
//   alert("Selection made successfully!");
// };

//   useEffect(() => {
//     if (selectedBox) {
//       setQuantity(selectedBox.minOrderQuantity); // ✅ Set default quantity to min order
//     }
//   }, [selectedBox]);

//   const handleImageClick = (imageSrc) => {
//     setZoomedImage(imageSrc);
//   };

//   const handleCloseModal = () => {
//     setZoomedImage(null);
//   };


//   const scrollCategories = (direction) => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
//     }
//   };

//   const handleHandbagSelection = (handbag, giftBoxId) => {
//     setSelectedGiftBoxes((prev) => {
//       return prev.map((box) => 
//         box.id === giftBoxId 
//           ? {
//               ...box,
//               matchingHandbags: box.matchingHandbags.some(h => h.id === handbag._id)
//                 ? box.matchingHandbags.filter(h => h.id !== handbag._id) // ✅ Remove if deselected
//                 : [...box.matchingHandbags, { id: handbag._id, name: handbag.name, quantity: handbag.minOrderQuantity }],
//             }
//           : box
//       );
//     });
//   };
  
 

//   const handleHandbagQuantity = (handbagId, action, handbag) => {
//     setSelectedHandbags(prev => ({
//       ...prev,
//       [handbagId]: action === "increase"
//         ? (prev[handbagId] || handbag.minOrderQuantity) + 1
//         : Math.max((prev[handbagId] || handbag.minOrderQuantity) - 1, handbag.minOrderQuantity)
//     }));
//   };
  

 
//   return (
//     <div className={styles.giftBoxContainer}>

// {zoomedImage && (
//         <div className={styles.imageModal} onClick={handleCloseModal}>
//           <div className={styles.imageModalContent}>
//             <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
//             <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
//           </div>
//         </div>
//       )}

//       {/* Categories at the Top */}
//       <div className={styles.subcategoriesWrapper}>
//         <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
//         <div className={styles.subcategories} ref={categoriesRef}>
//           {giftBoxCategories.map((category) => (
//             <div
//               key={category._id}
//               className={`${styles.subcategoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
//               onClick={() => {
//                 setSelectedCategory(category.name);
//                 setSelectedBox(null);
//                 setQuantity(1);
//               }}
//             >
//               <img src={category.image} alt={category.name} className={styles.subcategoryImage} />
//               <p className={styles.subcategoryName}>{category.name}</p>
//             </div>
//           ))}
//         </div>
//         <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
//       </div>

//       {/* If a Box is Selected, Show Back Button */}
//       {selectedBox && (
//         <>
//           <div className={styles.selectedBoxMainContainer}>
//             <div className={styles.selectedBoxContainer}>
//               <button className={styles.backButton} onClick={() => setSelectedBox(null)}>← Back</button>
//               <h2>{selectedBox.name}</h2>
//               <img
//               src={selectedBox.image}
//               alt={selectedBox.name}
//               className={styles.selectedBoxImage}
//               onClick={() => handleImageClick(selectedBox.image)}
//             />

//               <p>{selectedBox.description}</p>
//               <p>Price: ₹{selectedBox.price} | Min Order: {selectedBox.minOrderQuantity}</p>

//               <div className={styles.quantitySelector}>
//                 <button onClick={() => setQuantity((prev) => Math.max(prev - 1, selectedBox.minOrderQuantity))} disabled={quantity <= selectedBox.minOrderQuantity}>
//                   -
//                 </button>
//                 <span>{quantity}</span>
//                 <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
//               </div>

          

//               {/* Matching Handbags */}
//               {selectedBox.matchingHandbags?.length > 0 && (
//                 <>
//                   <h3>Matching Handbags</h3>
//                   <div className={styles.handbagSelection}>
//   {selectedBox.matchingHandbags.map((handbag) => (
//     <div key={handbag._id} className={styles.handbagCard}>
//       <input
//         type="checkbox"
//         checked={selectedHandbags[handbag._id] !== undefined}
//         onChange={() => handleHandbagSelection(handbag)}
//         className={styles.handbagCheckbox}
//       />
//       <img
//                         src={handbag.image}
//                         alt={handbag.name}
//                         className={styles.handbagImage}
//                         onClick={() => handleImageClick(handbag.image)}
//                       />

//       <h3>{handbag.name}</h3>
//       <p>Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}</p>

//       {selectedHandbags[handbag._id] !== undefined && (
//         <div className={styles.quantitySelector}>
//           <button
//             onClick={() => handleHandbagQuantity(handbag._id, "decrease")}
//             disabled={selectedHandbags[handbag._id] <= handbag.minOrderQuantity}
//           >
//             -
//           </button>
//           <span>{selectedHandbags[handbag._id]}</span>
//           <button onClick={() => handleHandbagQuantity(handbag._id, "increase")}>+</button>
//         </div>
//       )}
//     </div>
//   ))}
// </div>
//                 </>
//               )}
//                <button className={styles.selectButton} onClick={handleFinalSelection}>Select</button>
//             </div>
           
//             <div className={styles.otherBoxes}>
//   <h3 className={styles.otherBoxesHeading}>Other Boxes in {selectedCategory}</h3>
//   <div className={styles.boxSelection}>
//     {sampleGiftBoxes[selectedCategory]
//       ?.filter((box) => box._id !== selectedBox?._id) /* ✅ Exclude selected box */
//       .map((box) => (
//         <div key={box._id} className={styles.boxCard} onClick={() => setSelectedBox(box)}>
//           <img src={box.image} alt={box.name} className={styles.boxImage} />
//           <h3>{box.name}</h3>
//           <p>{box.description}</p>
//           <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
//         </div>
//       ))}
//   </div>
// </div>
//             </div>
//         </>
//       )}
// {selectedHandbag && (
//   <>
//     <div className={styles.selectedBoxMainContainer}>
//       <div className={styles.selectedBoxContainer}>
//         <button className={styles.backButton} onClick={() => setSelectedHandbag(null)}>← Back</button>
//         <h2>{selectedHandbag.name}</h2>
//         <img
//           src={selectedHandbag.image}
//           alt={selectedHandbag.name}
//           className={styles.selectedBoxImage}
//           onClick={() => handleImageClick(selectedHandbag.image)}
//         />
//         <p>Price: ₹{selectedHandbag.price} | Min Order: {selectedHandbag.minOrderQuantity}</p>

//         <div className={styles.quantitySelector}>
//   <button 
//     onClick={() => setSelectedHandbags((prev) => ({
//       ...prev,
//       [selectedHandbag._id]: Math.max(prev[selectedHandbag._id] - 1, selectedHandbag.minOrderQuantity), // ✅ Prevent `NaN`
//     }))}
//     disabled={selectedHandbags[selectedHandbag._id] <= selectedHandbag.minOrderQuantity}
//   >
//     -
//   </button>
  
//   <span>{selectedHandbags[selectedHandbag._id] || selectedHandbag.minOrderQuantity}</span> {/* ✅ Ensure quantity shows properly */}

//   <button 
//     onClick={() => setSelectedHandbags((prev) => ({
//       ...prev,
//       [selectedHandbag._id]: prev[selectedHandbag._id] + 1,
//     }))}
//   >
//     +
//   </button>
// </div>

//         <button className={styles.selectButton} onClick={handleFinalSelection}>Select</button>
//       </div>

//       {/* ✅ Similar Handbags Section */}
//       <div className={styles.otherBoxes}>
//         <h3 className={styles.otherBoxesHeading}>Other Handbags in {selectedCategory}</h3>
//         <div className={styles.boxSelection}>
//           {sampleHandbags[selectedCategory]
//             ?.filter((handbag) => handbag._id !== selectedHandbag._id) /* ✅ Exclude the currently selected handbag */
//             .map((handbag) => (
//               <div key={handbag._id} className={styles.boxCard} onClick={() => setSelectedHandbag(handbag)}>
//                 <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
//                 <h3>{handbag.name}</h3>
//                 <p>Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}</p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   </>
// )}


// {!selectedBox && !selectedHandbag && (
//       <div className={styles.boxSelection}>
//        {sampleGiftBoxes[selectedCategory]?.map((box) => (
//           <div key={box._id} className={styles.boxCard}onClick={() => { 
//             handleGiftBoxSelection(box); 
//             setSelectedBox(box); // ✅ Ensures the selected box is displayed
//         }}>
//             <img src={box.image} alt={box.name} className={styles.boxImage} />
//             <h3>{box.name}</h3>
//             <p>{box.description}</p>
//             <p>Price: ₹{box.price} | Min Order: {box.minOrderQuantity}</p>
//           </div>

//         ))}
//     {sampleHandbags[selectedCategory]?.map((handbag) => (
//           <div key={handbag._id} className={styles.boxCard} onClick={() => { 
//             handleGeneralHandbagSelection(handbag); 
//             setSelectedHandbag(handbag); // ✅ Ensures the selected handbag is displayed
//         }}>
//             <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
//             <h3>{handbag.name}</h3>
//             <p>Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}</p>
//           </div>
//         ))}
//       </div>

//     )}
//   </div>

//   );
// };

// export default GiftBox;

// const mongoose = require("mongoose");

// // Schema for different designs within a gift box
// const GiftBoxDesignSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true }, // URL of design image
// });

// // Main Product Schema for both Gift Boxes and Handbags
// const ProductSchema = new mongoose.Schema({
//   type: { type: String, enum: ["GiftBox", "Handbag"], required: true }, // ✅ Defines if it's a gift box or handbag
//   category: { type: String, required: true }, // Wedding, Birthday, Festive, etc.
//   name: { type: String, required: true },
//   image: { type: String, required: true }, // Primary product image
//   description: { type: String }, // Details about the product
//   price: { type: Number, required: true },
//   minOrderQuantity: { type: Number, required: true }, // Minimum order required (applies to both)
//   designs: [GiftBoxDesignSchema], // ✅ If it's a gift box, store multiple designs
//   matchingHandbags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // ✅ Handbags linked to a gift box
//   isGeneralHandbag: { type: Boolean, default: false }, // ✅ Defines whether a handbag is general or linked
// });

// module.exports = mongoose.model("Product", ProductSchema);



// import React, { useState, useRef } from "react";
// import styles from "./giftBoxesForBulkPage.module.css";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import pic from "../Assets/snacks.png";

// const giftBoxCategories = [
//   { _id: "1", name: "Wedding", image: pic },
//   { _id: "2", name: "Birthday", image: pic },
//   { _id: "3", name: "Festive", image: pic },
//   { _id: "4", name: "Corporate", image: pic },
// ];

// const sampleGiftBoxes = {
//   Wedding: [
//     {
//       _id: "wb1",
//       name: "Royal Wedding Gift Box",
//       image: pic,
//       description:
//         "Includes premium sweets, dry fruits, and a luxurious presentation.",
//       price: 1500,
//       minOrderQuantity: 5,
//       matchingHandbags: [
//         { _id: "hb1", name: "Royal Wedding Handbag", image: pic, price: 500, minOrderQuantity: 2 },
//         { _id: "hb2", name: "Elegant Wedding Handbag", image: pic, price: 600, minOrderQuantity: 3 },
//       ],
//     },
//     {
//       _id: "wb2",
//       name: "Elegant Wedding Box",
//       image: pic,
//       description:
//         "An elegant mix of chocolates, nuts, and custom wedding packaging.",
//       price: 1200,
//       minOrderQuantity: 3,
//       matchingHandbags: [
//         { _id: "hb3", name: "Luxury Wedding Handbag", image: pic, price: 700, minOrderQuantity: 2 },
//       ],
//     },
//   ],
// };

// const sampleHandbags = {
//   Wedding: [
//     { _id: "ghw1", name: "Classic Wedding Handbag", image: pic, price: 800, minOrderQuantity: 5 },
//     { _id: "ghw2", name: "Golden Embroidered Wedding Bag", image: pic, price: 1200, minOrderQuantity: 2 },
//   ],
//   Birthday: [
//     { _id: "ghb1", name: "Vibrant Birthday Handbag", image: pic, price: 600, minOrderQuantity: 1 },
//     { _id: "ghb2", name: "Sparkling Party Handbag", image: pic, price: 900, minOrderQuantity: 2 },
//   ],
//   Festive: [
//     { _id: "ghf1", name: "Elegant Festive Handbag", image: pic, price: 1100, minOrderQuantity: 1 },
//     { _id: "ghf2", name: "Colorful Celebration Handbag", image: pic, price: 950, minOrderQuantity: 1 },
//   ],
//   Corporate: [
//     { _id: "ghc1", name: "Premium Leather Corporate Handbag", image: pic, price: 1500, minOrderQuantity: 1 },
//     { _id: "ghc2", name: "Minimalist Executive Handbag", image: pic, price: 1300, minOrderQuantity: 2 },
//   ],
// };

// const GiftBox = ({setFinalSelection}) => {
//   // Category selection
//   const [selectedCategory, setSelectedCategory] = useState(giftBoxCategories[0].name);

//   // For gift boxes: "active" state holds the gift box you are currently editing.
//   const [activeGiftBox, setActiveGiftBox] = useState(null);
//   const [giftBoxQuantity, setGiftBoxQuantity] = useState(0);
//   // This object holds matching handbag selections for the active gift box (keyed by handbag _id).
//   const [activeGiftBoxHandbags, setActiveGiftBoxHandbags] = useState({});

//   // For general handbags (not attached to a gift box)
//   const [activeGeneralHandbag, setActiveGeneralHandbag] = useState(null);
//   const [generalHandbagQuantity, setGeneralHandbagQuantity] = useState(0);

//   // Final selections (each gift box selection may contain its chosen matching handbags)
//   const [selectedGiftBoxes, setSelectedGiftBoxes] = useState([]);
//   const [selectedGeneralHandbags, setSelectedGeneralHandbags] = useState([]);

//   // For zooming images
//   const [zoomedImage, setZoomedImage] = useState(null);
//   const categoriesRef = useRef(null);

//   // Scroll the categories row left or right
//   const scrollCategories = (direction) => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollBy({
//         left: direction === "left" ? -200 : 200,
//         behavior: "smooth",
//       });
//     }
//   };

//   // ----- GIFT BOX SELECTION LOGIC -----

//   // When a gift box is clicked, open its detail view
//   const handleGiftBoxSelect = (box) => {
//     setActiveGiftBox(box);
//     setGiftBoxQuantity(box.minOrderQuantity);
//     setActiveGiftBoxHandbags({}); // Clear any previous matching handbag selections
//   };

//   // Toggle a matching handbag within the active gift box
//   const toggleGiftBoxHandbag = (handbag) => {
//     setActiveGiftBoxHandbags((prev) => {
//       if (prev[handbag._id] !== undefined) {
//         // Remove if already selected
//         const { [handbag._id]: removed, ...rest } = prev;
//         return rest;
//       } else {
//         return { ...prev, [handbag._id]: handbag.minOrderQuantity };
//       }
//     });
//   };

//   // Update the quantity for a matching handbag
//   const updateGiftBoxHandbagQuantity = (handbag, action) => {
//     setActiveGiftBoxHandbags((prev) => ({
//       ...prev,
//       [handbag._id]:
//         action === "increase"
//           ? prev[handbag._id] + 1
//           : Math.max(prev[handbag._id] - 1, handbag.minOrderQuantity),
//     }));
//   };

// const handleGiftBoxFinalSelect = () => {
//   if (!activeGiftBox) return;

//   const giftBoxData = {
//     id: activeGiftBox._id,
//     name: activeGiftBox.name,
//     quantity: giftBoxQuantity,
//     price: activeGiftBox.price, // ✅ Store price
//     matchingHandbags: Object.entries(activeGiftBoxHandbags).map(([handbagId, qty]) => {
//       const handbag = activeGiftBox.matchingHandbags.find((h) => h._id === handbagId);
//       return { id: handbagId, name: handbag.name, quantity: qty, price: handbag.price }; // ✅ Store price
//     }),
//   };

//   setSelectedGiftBoxes((prev) => [...prev, giftBoxData]);

//   // Clear active state
//   setActiveGiftBox(null);
//   setGiftBoxQuantity(0);
//   setActiveGiftBoxHandbags({});
// };

//   // ----- GENERAL HANDBAG SELECTION LOGIC -----

//   // When a general handbag card is clicked, open its detail view
//   const handleGeneralHandbagSelect = (handbag) => {
//     setActiveGeneralHandbag(handbag);
//     setGeneralHandbagQuantity(handbag.minOrderQuantity);
//   };

//   // Finalize the general handbag selection
//   const handleGeneralHandbagFinalSelect = () => {
//     if (!activeGeneralHandbag) return;
//     const handbagData = {
//       id: activeGeneralHandbag._id,
//       name: activeGeneralHandbag.name,
//       quantity: generalHandbagQuantity,
//       price: activeGeneralHandbag.price, // ✅ Store price
//     };
  
//     setSelectedGeneralHandbags((prev) => {
//       const exists = prev.find((h) => h.id === activeGeneralHandbag._id);
//       if (exists) {
//         return prev.map((h) =>
//           h.id === activeGeneralHandbag._id ? { ...h, quantity: generalHandbagQuantity, price: h.price } : h
//         );
//       }
//       return [...prev, handbagData];
//     });
  
//     setActiveGeneralHandbag(null);
//     setGeneralHandbagQuantity(0);
//   };

//   // ----- FINAL SUBMISSION -----
//   const handleFinalSubmission = () => {
//     // ✅ Retrieve existing selection from local storage
//     const existingSelection = JSON.parse(localStorage.getItem("GiftBoxSelectionforBulkOrders")) || { giftBoxes: [], generalHandbags: [] };
  
//     // ✅ Merge new selections with previous selections, ensuring price is included
//     const updatedSelection = {
//       giftBoxes: [
//         ...existingSelection.giftBoxes,
//         ...selectedGiftBoxes.map(box => ({
//           id: box.id,
//           name: box.name,
//           quantity: box.quantity,
//           price: box.price, // ✅ Storing price
//           matchingHandbags: box.matchingHandbags.map(handbag => ({
//             id: handbag.id,
//             name: handbag.name,
//             quantity: handbag.quantity,
//             price: handbag.price, // ✅ Storing price
//           }))
//         }))
//       ],
//       generalHandbags: [
//         ...existingSelection.generalHandbags,
//         ...selectedGeneralHandbags.map(handbag => ({
//           id: handbag.id,
//           name: handbag.name,
//           quantity: handbag.quantity,
//           price: handbag.price, // ✅ Storing price
//         }))
//       ],
//     };
  
//     // ✅ Store updated selection in local storage
//     localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedSelection));
  
//     // ✅ Immediately update state so UI updates without refresh
//     setFinalSelection(updatedSelection);
  
//     console.log("Updated Selection (with price):", updatedSelection);
//     alert("Selection saved successfully!");
//     handleCloseModal();
//   };;


//   // Image modal controls
//   const handleImageClick = (imageSrc) => {
//     setZoomedImage(imageSrc);
//   };

//   const handleCloseModal = () => {
//     setZoomedImage(null);
//   };

//   return (
//     <div className={styles.giftBoxContainer}>
//       {zoomedImage && (
//         <div className={styles.imageModal} onClick={handleCloseModal}>
//           <div className={styles.imageModalContent}>
//             <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
//             <button className={styles.closeButton} onClick={handleCloseModal}>
//               ✖
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ----- Category Selector ----- */}
//       <div className={styles.subcategoriesWrapper}>
//         <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
//         <div className={styles.subcategories} ref={categoriesRef}>
//           {giftBoxCategories.map((category) => (
//             <div
//               key={category._id}
//               className={`${styles.subcategoryCard} ${
//                 selectedCategory === category.name ? styles.active : ""
//               }`}
//               onClick={() => {
//                 setSelectedCategory(category.name);
//                 // Clear any active selections when the category changes
//                 setActiveGiftBox(null);
//                 setActiveGeneralHandbag(null);
//               }}
//             >
//               <img src={category.image} alt={category.name} className={styles.subcategoryImage} />
//               <p className={styles.subcategoryName}>{category.name}</p>
//             </div>
//           ))}
//         </div>
//         <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
//       </div>

//       {/* ----- Gift Box Detail View (if active) ----- */}
//       {activeGiftBox && (
//         <div className={styles.selectedBoxMainContainer}>
//           <div className={styles.selectedBoxContainer}>
//             <button className={styles.backButton} onClick={() => setActiveGiftBox(null)}>
//               ← Back
//             </button>
//             <h2>{activeGiftBox.name}</h2>
//             <img
//               src={activeGiftBox.image}
//               alt={activeGiftBox.name}
//               className={styles.selectedBoxImage}
//               onClick={() => handleImageClick(activeGiftBox.image)}
//             />
//             <p>{activeGiftBox.description}</p>
//             <p>
//               Price: ₹{activeGiftBox.price} | Min Order: {activeGiftBox.minOrderQuantity}
//             </p>

//             <div className={styles.quantitySelector}>
//               <button
//                 onClick={() =>
//                   setGiftBoxQuantity((prev) =>
//                     Math.max(prev - 1, activeGiftBox.minOrderQuantity)
//                   )
//                 }
//                 disabled={giftBoxQuantity <= activeGiftBox.minOrderQuantity}
//               >
//                 -
//               </button>
//               <span>{giftBoxQuantity}</span>
//               <button onClick={() => setGiftBoxQuantity((prev) => prev + 1)}>+</button>
//             </div>

//             {/* Matching Handbags for this gift box */}
//             {activeGiftBox.matchingHandbags?.length > 0 && (
//               <>
//                 <h3>Matching Handbags</h3>
//                 <div className={styles.handbagSelection}>
//                   {activeGiftBox.matchingHandbags.map((handbag) => (
//                     <div key={handbag._id} className={styles.handbagCard}>
//                       <input
//                         type="checkbox"
//                         checked={activeGiftBoxHandbags[handbag._id] !== undefined}
//                         onChange={() => toggleGiftBoxHandbag(handbag)}
//                         className={styles.handbagCheckbox}
//                       />
//                       <img
//                         src={handbag.image}
//                         alt={handbag.name}
//                         className={styles.handbagImage}
//                         onClick={() => handleImageClick(handbag.image)}
//                       />
//                       <h3>{handbag.name}</h3>
//                       <p>
//                         Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
//                       </p>
//                       {activeGiftBoxHandbags[handbag._id] !== undefined && (
//                         <div className={styles.quantitySelector}>
//                           <button
//                             onClick={() => updateGiftBoxHandbagQuantity(handbag, "decrease")}
//                             disabled={activeGiftBoxHandbags[handbag._id] <= handbag.minOrderQuantity}
//                           >
//                             -
//                           </button>
//                           <span>{activeGiftBoxHandbags[handbag._id]}</span>
//                           <button onClick={() => updateGiftBoxHandbagQuantity(handbag, "increase")}>
//                             +
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//             <button className={styles.selectButton} onClick={handleGiftBoxFinalSelect}>
//               Select Gift Box
//             </button>
//           </div>

//           {/* Display other gift boxes in this category (excluding the active one) */}
//           <div className={styles.otherBoxes}>
//             <h3 className={styles.otherBoxesHeading}>Other Boxes in {selectedCategory}</h3>
//             <div className={styles.boxSelection}>
//               {sampleGiftBoxes[selectedCategory]
//                 ?.filter((box) => box._id !== activeGiftBox._id)
//                 .map((box) => (
//                   <div
//                     key={box._id}
//                     className={styles.boxCard}
//                     onClick={() => handleGiftBoxSelect(box)}
//                   >
//                     <img src={box.image} alt={box.name} className={styles.boxImage} />
//                     <h3>{box.name}</h3>
//                     <p>{box.description}</p>
//                     <p>
//                       Price: ₹{box.price} | Min Order: {box.minOrderQuantity}
//                     </p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ----- General Handbag Detail View (if active) ----- */}
//       {activeGeneralHandbag && (
//         <div className={styles.selectedBoxMainContainer}>
//           <div className={styles.selectedBoxContainer}>
//             <button className={styles.backButton} onClick={() => setActiveGeneralHandbag(null)}>
//               ← Back
//             </button>
//             <h2>{activeGeneralHandbag.name}</h2>
//             <img
//               src={activeGeneralHandbag.image}
//               alt={activeGeneralHandbag.name}
//               className={styles.selectedBoxImage}
//               onClick={() => handleImageClick(activeGeneralHandbag.image)}
//             />
//             <p>
//               Price: ₹{activeGeneralHandbag.price} | Min Order:{" "}
//               {activeGeneralHandbag.minOrderQuantity}
//             </p>
//             <div className={styles.quantitySelector}>
//               <button
//                 onClick={() =>
//                   setGeneralHandbagQuantity((prev) =>
//                     Math.max(prev - 1, activeGeneralHandbag.minOrderQuantity)
//                   )
//                 }
//                 disabled={generalHandbagQuantity <= activeGeneralHandbag.minOrderQuantity}
//               >
//                 -
//               </button>
//               <span>{generalHandbagQuantity}</span>
//               <button onClick={() => setGeneralHandbagQuantity((prev) => prev + 1)}>+</button>
//             </div>
//             <button className={styles.selectButton} onClick={handleGeneralHandbagFinalSelect}>
//               Select Handbag
//             </button>
//           </div>

//           {/* Display other general handbags in this category */}
//           <div className={styles.otherBoxes}>
//             <h3 className={styles.otherBoxesHeading}>Other Handbags in {selectedCategory}</h3>
//             <div className={styles.boxSelection}>
//               {sampleHandbags[selectedCategory]
//                 ?.filter((handbag) => handbag._id !== activeGeneralHandbag._id)
//                 .map((handbag) => (
//                   <div
//                     key={handbag._id}
//                     className={styles.boxCard}
//                     onClick={() => handleGeneralHandbagSelect(handbag)}
//                   >
//                     <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
//                     <h3>{handbag.name}</h3>
//                     <p>
//                       Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
//                     </p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ----- Default View: List both gift boxes and general handbags ----- */}
//       {!activeGiftBox && !activeGeneralHandbag && (
//         <div className={styles.boxSelection}>
//           {sampleGiftBoxes[selectedCategory]?.map((box) => (
//             <div
//               key={box._id}
//               className={styles.boxCard}
//               onClick={() => handleGiftBoxSelect(box)}
//             >
//               <img src={box.image} alt={box.name} className={styles.boxImage} />
//               <h3>{box.name}</h3>
//               <p>{box.description}</p>
//               <p>
//                 Price: ₹{box.price} | Min Order: {box.minOrderQuantity}
//               </p>
//             </div>
//           ))}
//           {sampleHandbags[selectedCategory]?.map((handbag) => (
//             <div
//               key={handbag._id}
//               className={styles.boxCard}
//               onClick={() => handleGeneralHandbagSelect(handbag)}
//             >
//               <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
//               <h3>{handbag.name}</h3>
//               <p>
//                 Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ----- Final Submission Button ----- */}
//       {!activeGiftBox &&
//         !activeGeneralHandbag &&
//         ((selectedGiftBoxes.length > 0) || (selectedGeneralHandbags.length > 0)) && (
//           <div className={styles.finalSubmission}>
//             <button className={styles.selectButton} onClick={handleFinalSubmission}>
//               Submit Final Selection
//             </button>
//           </div>
//         )}
//     </div>
//   );
// };

// export default GiftBox;









import React, { useState, useRef, useEffect } from "react";
import styles from "./giftBoxesForBulkPage.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import pic from "../Assets/snacks.png";

const GiftBox = ({ setFinalSelection }) => {
  // ----- Dynamic Data States -----
  // These replace your static data for categories, gift boxes, and handbags.
  const [giftBoxCategories, setGiftBoxCategories] = useState([]);
  const [sampleGiftBoxes, setSampleGiftBoxes] = useState({});
  const [sampleHandbags, setSampleHandbags] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, giftBoxRes, handbagRes] = await Promise.all([
        axios.get("http://localhost:8080/api/bulkorders/categories"),
        axios.get("http://localhost:8080/api/bulkorders/giftBoxes"),
        axios.get("http://localhost:8080/api/bulkorders/generalHandbags"),
      ]);

      // Store the fetched categories.
      setGiftBoxCategories(catRes.data);
      // If categories exist, set the selected category to the first one.
      if (catRes.data.length > 0) {
        setSelectedCategory(catRes.data[0].name);
      }

      // Organize gift boxes by category name.
      const boxesByCat = {};
      giftBoxRes.data.forEach((box) => {
        const catName = box.category?.name || "Uncategorized";
        if (!boxesByCat[catName]) {
          boxesByCat[catName] = [];
        }
        boxesByCat[catName].push(box);
      });
      setSampleGiftBoxes(boxesByCat);

      // Organize handbags by category name.
      const handbagsByCat = {};
      handbagRes.data.forEach((hb) => {
        const catName = hb.category?.name || "Uncategorized";
        if (!handbagsByCat[catName]) {
          handbagsByCat[catName] = [];
        }
        handbagsByCat[catName].push(hb);
      });
      setSampleHandbags(handbagsByCat);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message || error);
    }
  };

  // ----- Existing States -----
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState("");

  // For gift boxes: active state holds the gift box you are currently editing.
  const [activeGiftBox, setActiveGiftBox] = useState(null);
  const [giftBoxQuantity, setGiftBoxQuantity] = useState(0);
  // This object holds matching handbag selections for the active gift box (keyed by handbag _id).
  const [activeGiftBoxHandbags, setActiveGiftBoxHandbags] = useState({});

  // For general handbags (not attached to a gift box)
  const [activeGeneralHandbag, setActiveGeneralHandbag] = useState(null);
  const [generalHandbagQuantity, setGeneralHandbagQuantity] = useState(0);

  // Final selections (each gift box selection may contain its chosen matching handbags)
  const [selectedGiftBoxes, setSelectedGiftBoxes] = useState([]);
  const [selectedGeneralHandbags, setSelectedGeneralHandbags] = useState([]);

  // For zooming images
  const [zoomedImage, setZoomedImage] = useState(null);
  const categoriesRef = useRef(null);

  // ----- Utility: Scroll Categories -----
  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // ----- GIFT BOX SELECTION LOGIC -----
  // When a gift box is clicked, open its detail view.
  const handleGiftBoxSelect = (box) => {
    setActiveGiftBox(box);
    setGiftBoxQuantity(box.minOrderQuantity);
    setActiveGiftBoxHandbags({}); // Clear any previous matching handbag selections
  };

  // Toggle a matching handbag within the active gift box.
  const toggleGiftBoxHandbag = (handbag) => {
    setActiveGiftBoxHandbags((prev) => {
      if (prev[handbag._id] !== undefined) {
        // Remove if already selected
        const { [handbag._id]: removed, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [handbag._id]: handbag.minOrderQuantity };
      }
    });
  };

  // Update the quantity for a matching handbag.
  const updateGiftBoxHandbagQuantity = (handbag, action) => {
    setActiveGiftBoxHandbags((prev) => ({
      ...prev,
      [handbag._id]:
        action === "increase"
          ? prev[handbag._id] + 1
          : Math.max(prev[handbag._id] - 1, handbag.minOrderQuantity),
    }));
  };

  const handleGiftBoxFinalSelect = () => {
    if (!activeGiftBox) return;

    const giftBoxData = {
      id: activeGiftBox._id,
      name: activeGiftBox.name,
      quantity: giftBoxQuantity,
      price: activeGiftBox.price, // Store price
      matchingHandbags: Object.entries(activeGiftBoxHandbags).map(([handbagId, qty]) => {
        const handbag = activeGiftBox.matchingHandbags.find((h) => h._id === handbagId);
        return { id: handbagId, name: handbag.name, quantity: qty, price: handbag.price }; // Store price
      }),
    };

    setSelectedGiftBoxes((prev) => [...prev, giftBoxData]);

    // Clear active state
    setActiveGiftBox(null);
    setGiftBoxQuantity(0);
    setActiveGiftBoxHandbags({});
  };

  // ----- GENERAL HANDBAG SELECTION LOGIC -----
  // When a general handbag card is clicked, open its detail view.
  const handleGeneralHandbagSelect = (handbag) => {
    setActiveGeneralHandbag(handbag);
    setGeneralHandbagQuantity(handbag.minOrderQuantity);
  };

  // Finalize the general handbag selection.
  const handleGeneralHandbagFinalSelect = () => {
    if (!activeGeneralHandbag) return;
    const handbagData = {
      id: activeGeneralHandbag._id,
      name: activeGeneralHandbag.name,
      quantity: generalHandbagQuantity,
      price: activeGeneralHandbag.price, // Store price
    };

    setSelectedGeneralHandbags((prev) => {
      const exists = prev.find((h) => h.id === activeGeneralHandbag._id);
      if (exists) {
        return prev.map((h) =>
          h.id === activeGeneralHandbag._id ? { ...h, quantity: generalHandbagQuantity, price: h.price } : h
        );
      }
      return [...prev, handbagData];
    });

    setActiveGeneralHandbag(null);
    setGeneralHandbagQuantity(0);
  };

  // ----- FINAL SUBMISSION -----
  const handleFinalSubmission = () => {
    // Retrieve existing selection from local storage
    const existingSelection = JSON.parse(localStorage.getItem("GiftBoxSelectionforBulkOrders")) || {
      giftBoxes: [],
      generalHandbags: [],
    };

    // Merge new selections with previous selections, ensuring price is included
    const updatedSelection = {
      giftBoxes: [
        ...existingSelection.giftBoxes,
        ...selectedGiftBoxes.map((box) => ({
          id: box.id,
          name: box.name,
          quantity: box.quantity,
          price: box.price, // Storing price
          matchingHandbags: box.matchingHandbags.map((handbag) => ({
            id: handbag.id,
            name: handbag.name,
            quantity: handbag.quantity,
            price: handbag.price, // Storing price
          })),
        })),
      ],
      generalHandbags: [
        ...existingSelection.generalHandbags,
        ...selectedGeneralHandbags.map((handbag) => ({
          id: handbag.id,
          name: handbag.name,
          quantity: handbag.quantity,
          price: handbag.price, // Storing price
        })),
      ],
    };

    // Store updated selection in local storage
    localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedSelection));

    // Immediately update state so UI updates without refresh
    setFinalSelection(updatedSelection);

    console.log("Updated Selection (with price):", updatedSelection);
    alert("Selection saved successfully!");
    handleCloseModal();
  };

  // ----- IMAGE MODAL CONTROLS -----
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setZoomedImage(null);
  };

  return (
    <div className={styles.giftBoxContainer}>
      {zoomedImage && (
        <div className={styles.imageModal} onClick={handleCloseModal}>
          <div className={styles.imageModalContent}>
            <img src={zoomedImage} alt="Zoomed Preview" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ----- Category Selector ----- */}
      <div className={styles.subcategoriesWrapper}>
        <FiChevronLeft className={styles.arrow} onClick={() => scrollCategories("left")} />
        <div className={styles.subcategories} ref={categoriesRef}>
          {giftBoxCategories.map((category) => (
            <div
              key={category._id}
              className={`${styles.subcategoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
              onClick={() => {
                setSelectedCategory(category.name);
                // Clear any active selections when the category changes
                setActiveGiftBox(null);
                setActiveGeneralHandbag(null);
              }}
            >
              <img src={category.image || pic} alt={category.name} className={styles.subcategoryImage} />
              <p className={styles.subcategoryName}>{category.name}</p>
            </div>
          ))}
        </div>
        <FiChevronRight className={styles.arrow} onClick={() => scrollCategories("right")} />
      </div>

      {/* ----- Gift Box Detail View (if active) ----- */}
      {activeGiftBox && (
        <div className={styles.selectedBoxMainContainer}>
          <div className={styles.selectedBoxContainer}>
            <button className={styles.backButton} onClick={() => setActiveGiftBox(null)}>
              ← Back
            </button>
            <h2>{activeGiftBox.name}</h2>
            <img
              src={activeGiftBox.image}
              alt={activeGiftBox.name}
              className={styles.selectedBoxImage}
              onClick={() => handleImageClick(activeGiftBox.image)}
            />
            <p>{activeGiftBox.description}</p>
            <p>
              Price: ₹{activeGiftBox.price} | Min Order: {activeGiftBox.minOrderQuantity}
            </p>

            <div className={styles.quantitySelector}>
              <button
                onClick={() =>
                  setGiftBoxQuantity((prev) => Math.max(prev - 1, activeGiftBox.minOrderQuantity))
                }
                disabled={giftBoxQuantity <= activeGiftBox.minOrderQuantity}
              >
                -
              </button>
              <span>{giftBoxQuantity}</span>
              <button onClick={() => setGiftBoxQuantity((prev) => prev + 1)}>+</button>
            </div>

            {/* Matching Handbags for this gift box */}
            {activeGiftBox.matchingHandbags?.length > 0 && (
              <>
                <h3>Matching Handbags</h3>
                <div className={styles.handbagSelection}>
                  {activeGiftBox.matchingHandbags.map((handbag) => (
                    <div key={handbag._id} className={styles.handbagCard}>
                      <input
                        type="checkbox"
                        checked={activeGiftBoxHandbags[handbag._id] !== undefined}
                        onChange={() => toggleGiftBoxHandbag(handbag)}
                        className={styles.handbagCheckbox}
                      />
                      <img
                        src={handbag.image}
                        alt={handbag.name}
                        className={styles.handbagImage}
                        onClick={() => handleImageClick(handbag.image)}
                      />
                      <h3>{handbag.name}</h3>
                      <p>
                        Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
                      </p>
                      {activeGiftBoxHandbags[handbag._id] !== undefined && (
                        <div className={styles.quantitySelector}>
                          <button
                            onClick={() => updateGiftBoxHandbagQuantity(handbag, "decrease")}
                            disabled={activeGiftBoxHandbags[handbag._id] <= handbag.minOrderQuantity}
                          >
                            -
                          </button>
                          <span>{activeGiftBoxHandbags[handbag._id]}</span>
                          <button onClick={() => updateGiftBoxHandbagQuantity(handbag, "increase")}>+</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            <button className={styles.selectButton} onClick={handleGiftBoxFinalSelect}>
              Select Gift Box
            </button>
          </div>

          {/* Display other gift boxes in this category (excluding the active one) */}
          <div className={styles.otherBoxes}>
            <h3 className={styles.otherBoxesHeading}>Other Boxes in {selectedCategory}</h3>
            <div className={styles.boxSelection}>
              {sampleGiftBoxes[selectedCategory]
                ?.filter((box) => box._id !== activeGiftBox._id)
                .map((box) => (
                  <div key={box._id} className={styles.boxCard} onClick={() => handleGiftBoxSelect(box)}>
                    <img src={box.image} alt={box.name} className={styles.boxImage} />
                    <h3>{box.name}</h3>
                    <p>{box.description}</p>
                    <p>
                      Price: ₹{box.price} | Min Order: {box.minOrderQuantity}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ----- General Handbag Detail View (if active) ----- */}
      {activeGeneralHandbag && (
        <div className={styles.selectedBoxMainContainer}>
          <div className={styles.selectedBoxContainer}>
            <button className={styles.backButton} onClick={() => setActiveGeneralHandbag(null)}>
              ← Back
            </button>
            <h2>{activeGeneralHandbag.name}</h2>
            <img
              src={activeGeneralHandbag.image}
              alt={activeGeneralHandbag.name}
              className={styles.selectedBoxImage}
              onClick={() => handleImageClick(activeGeneralHandbag.image)}
            />
            <p>
              Price: ₹{activeGeneralHandbag.price} | Min Order: {activeGeneralHandbag.minOrderQuantity}
            </p>
            <div className={styles.quantitySelector}>
              <button
                onClick={() =>
                  setGeneralHandbagQuantity((prev) =>
                    Math.max(prev - 1, activeGeneralHandbag.minOrderQuantity)
                  )
                }
                disabled={generalHandbagQuantity <= activeGeneralHandbag.minOrderQuantity}
              >
                -
              </button>
              <span>{generalHandbagQuantity}</span>
              <button onClick={() => setGeneralHandbagQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button className={styles.selectButton} onClick={handleGeneralHandbagFinalSelect}>
              Select Handbag
            </button>
          </div>

          {/* Display other general handbags in this category */}
          <div className={styles.otherBoxes}>
            <h3 className={styles.otherBoxesHeading}>Other Handbags in {selectedCategory}</h3>
            <div className={styles.boxSelection}>
              {sampleHandbags[selectedCategory]
                ?.filter((handbag) => handbag._id !== activeGeneralHandbag._id)
                .map((handbag) => (
                  <div key={handbag._id} className={styles.boxCard} onClick={() => handleGeneralHandbagSelect(handbag)}>
                    <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
                    <h3>{handbag.name}</h3>
                    <p>
                      Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ----- Default Box Selection (if no detail view active) ----- */}
      {!activeGiftBox && !activeGeneralHandbag && (
        <div className={styles.boxSelection}>
          {sampleGiftBoxes[selectedCategory]?.map((box) => (
            <div key={box._id} className={styles.boxCard} onClick={() => handleGiftBoxSelect(box)}>
              <img src={box.image} alt={box.name} className={styles.boxImage} />
              <h3>{box.name}</h3>
              <p>{box.description}</p>
              <p>
                Price: ₹{box.price} | Min Order: {box.minOrderQuantity}
              </p>
            </div>
          ))}
          {sampleHandbags[selectedCategory]?.map((handbag) => (
            <div key={handbag._id} className={styles.boxCard} onClick={() => handleGeneralHandbagSelect(handbag)}>
              <img src={handbag.image} alt={handbag.name} className={styles.boxImage} />
              <h3>{handbag.name}</h3>
              <p>
                Price: ₹{handbag.price} | Min Order: {handbag.minOrderQuantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ----- Final Submission ----- */}
      {!activeGiftBox &&
        !activeGeneralHandbag &&
        ((selectedGiftBoxes.length > 0) || (selectedGeneralHandbags.length > 0)) && (
          <div className={styles.finalSubmission}>
            <button className={styles.selectButton} onClick={handleFinalSubmission}>
              Submit Final Selection
            </button>
          </div>
        )}
    </div>
  );
};

export default GiftBox;