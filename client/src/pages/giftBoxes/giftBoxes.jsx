


// import React, { useState, useEffect } from "react";
// import styles from "./giftBoxes.module.css";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import Loader from '../../components/Loader/loader1/sweetLoader';
// import { useToaster } from "../../utils";



// const GiftBoxes = () => {
//       const [Orders, setOrders] = useState([]);
//     const [giftBoxes, setGiftBoxes] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [currentFilter, setCurrentFilter] = useState("All");


//       const setToast = useToaster();
//       const navigate = useNavigate();


//     useEffect(() => {
//         const fetchGiftBoxes = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/giftBoxes");
//                 if (!response.ok) throw new Error("Failed to fetch gift box data.");

//                 const data = await response.json();
//                 if (data.success) {
//                     const updatedGiftBoxes = data.giftBoxes.map((box) => ({
//                         ...box,
//                         selectedImage: box.images[0]?.data
//                             ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
//                             : null,
//                     }));
//                     setGiftBoxes(updatedGiftBoxes);
//                 } else {
//                     throw new Error("No gift box data found.");
//                 }
//             } catch (error) {
//                 console.error("Error:", error.message);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchGiftBoxes();
//     }, []);

//     const handleImageClick = (boxId, image) => {
//         setGiftBoxes((prevGiftBoxes) =>
//             prevGiftBoxes.map((box) =>
//                 box._id === boxId ? { ...box, selectedImage: image } : box
//             )
//         );
//     };

//     const handleFilterClick = (filterValue) => {
      
//         setCurrentFilter(filterValue);
//     };


//     const normalizeFilterLabel = (label) => {
//         switch (label) {
//           case "Small (500 gm)":
//             return "500 gm";
//           case "Medium (1 kg)":
//             return "1 kg";
//           case "Large (2 kg)":
//             return "2 kg";
//           default:
//             return label;
//         }
//       };

//     const filteredGiftBoxes =
//         currentFilter === "All"
//             ? giftBoxes
//             : giftBoxes.filter((box) => box.size === normalizeFilterLabel(currentFilter));



            
//   const handleClick = (order) => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast('Please log in first!', 'error');
//         return;
//       }

//       const selectedOrderDetails = {
//         name: order.title,
//         size: order.size,
//         image: order.images && order.images.length > 0
//           ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//           : null
//       };

//       console.log("Selected Order Details:", selectedOrderDetails);

//       navigate("/giftboxCart", { state: selectedOrderDetails });
//     } catch (error) {
//       console.error("Error in handleClick:", error);
//       setToast('An unexpected error occurred!', 'error');
//     }
//   };

//     return (
//         <div className={styles.giftBoxes}>
//             <div className={styles.above_header}>
//                 <AboveHeader />
//             </div>
//             <div className={styles.header}>
//                 <Header />
//             </div>
//             <div className={styles.gokul_heading}>
//                 <div>Gift Boxes</div>
//             </div>

//             {/* Show loader or error while keeping the above layout */}
//             {isLoading && <Loader />}
//             {error && <div className={styles.error}>Error: {error}</div>}

//             {/* Render gift boxes when not loading */}
//             {!isLoading && !error && (
//                 <>
//                     <div className={styles.filtersection}>
//                     <div className={styles.filters}>
//                     <FilterChip
//                         label="All"
//                         isActive={currentFilter === "All"}
//                         onClick={() => handleFilterClick("All")}
//                     />
//                     <FilterChip
//                         label="Small (500 gm)"
//                         isActive={currentFilter === "Small (500 gm)"}
//                         onClick={() => handleFilterClick("Small (500 gm)")}
//                     />
//                     <FilterChip
//                         label="Medium (1 kg)"
//                         isActive={currentFilter === "Medium (1 kg)"}
//                         onClick={() => handleFilterClick("Medium (1 kg)")}
//                     />
//                     <FilterChip
//                         label="Large (2 kg)"
//                         isActive={currentFilter === "Large (2 kg)"}
//                         onClick={() => handleFilterClick("Large (2 kg)")}
//                     />
//                 </div>
//                     </div>

//                     {filteredGiftBoxes.map((box) => (
//                         <div key={box._id} className={styles.hall_details}>
//                             <GiftBoxAndBulkTemplate
//                                 name={box.title}
//                                 price={`₹ ${box.price}`}
//                                 description={box.description}
//                                 selectedImage={box.selectedImage}
//                                 images={box.images.map(
//                                     (img) =>
//                                         `data:${img.contentType};base64,${img.data}`
//                                 )}
//                                 onImageClick={(image) => handleImageClick(box._id, image)}
//                                 showMoreImages={box.images.length > 5}
//                                 onClick={() => handleClick(box)}
//                             />
//                         </div>
//                     ))}
//                 </>
//             )}

//             <div className={styles.footer}>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default GiftBoxes;


// import React, { useState, useEffect } from "react";
// import styles from "./giftBoxes.module.css";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import Loader from "../../components/Loader/loader1/sweetLoader";
// import { useToaster } from "../../utils";

// const GiftBoxes = () => {
//   const [giftBoxes, setGiftBoxes] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentFilter, setCurrentFilter] = useState("All");
//   const [selectedGiftBoxQuantity, setSelectedGiftBoxQuantity] = useState(1);

//   const setToast = useToaster();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGiftBoxes = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/giftBoxes");
//         if (!response.ok) throw new Error("Failed to fetch gift box data.");
//         const data = await response.json();
//         if (data.success) {
//           const updatedGiftBoxes = data.giftBoxes.map((box) => ({
//             ...box,
//             selectedImage: box.images[0]?.data
//               ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
//               : null,
//           }));
//           setGiftBoxes(updatedGiftBoxes);
//         } else {
//           throw new Error("No gift box data found.");
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGiftBoxes();
//   }, []);

//   const handleImageClick = (boxId, image) => {
//     setGiftBoxes((prevGiftBoxes) =>
//       prevGiftBoxes.map((box) =>
//         box._id === boxId ? { ...box, selectedImage: image } : box
//       )
//     );
//   };

//   const handleFilterClick = (filterValue) => {
//     setCurrentFilter(filterValue);
//   };

//   const normalizeFilterLabel = (label) => {
//     switch (label) {
//       case "Small (500 gm)":
//         return "500 gm";
//       case "Medium (1 kg)":
//         return "1 kg";
//       case "Large (2 kg)":
//         return "2 kg";
//       default:
//         return label;
//     }
//   };

//   const filteredGiftBoxes =
//     currentFilter === "All"
//       ? giftBoxes
//       : giftBoxes.filter(
//           (box) => box.size === normalizeFilterLabel(currentFilter)
//         );

//   const handleClick = (order) => {
    
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         setToast("Please log in first!", "error");
//         return;
//       }


//   };

//   return (
//     <div className={styles.giftBoxes}>
//       <div className={styles.above_header}>
//         <AboveHeader />
//       </div>
//       <div className={styles.header}>
//         <Header />
//       </div>
//       <div className={styles.gokul_heading}>
//         <div>Gift Boxes</div>
//       </div>

//       {isLoading && <Loader />}
//       {error && <div className={styles.error}>Error: {error}</div>}

//       {!isLoading && !error && (
//         <>
//           <div className={styles.filtersection}>
//             <div className={styles.filters}>
//               <FilterChip
//                 label="All"
//                 isActive={currentFilter === "All"}
//                 onClick={() => handleFilterClick("All")}
//               />
//               <FilterChip
//                 label="Small (500 gm)"
//                 isActive={currentFilter === "Small (500 gm)"}
//                 onClick={() => handleFilterClick("Small (500 gm)")}
//               />
//               <FilterChip
//                 label="Medium (1 kg)"
//                 isActive={currentFilter === "Medium (1 kg)"}
//                 onClick={() => handleFilterClick("Medium (1 kg)")}
//               />
//               <FilterChip
//                 label="Large (2 kg)"
//                 isActive={currentFilter === "Large (2 kg)"}
//                 onClick={() => handleFilterClick("Large (2 kg)")}
//               />
//             </div>
//           </div>

//           {filteredGiftBoxes.length === 0 ? (
//             <p className={styles.noItems}>
//               🎁 No gift boxes available for this selection.
//             </p>
//           ) : (
//             filteredGiftBoxes.map((box) => (
//               <div key={box._id} className={styles.hall_details}>
//                 <GiftBoxAndBulkTemplate
//                   name={box.title}
//                   price={`₹ ${box.price}`}
//                   description={box.description}
//                   size={box.size}
//                   selectedImage={box.selectedImage}
//                   images={box.images.map(
//                     (img) =>
//                       `data:${img.contentType};base64,${img.data}`
//                   )}
//                   onImageClick={(image) => handleImageClick(box._id, image)}
//                   showMoreImages={box.images.length > 5}
//                   onClick={() => handleClick(box)}
//                 />
//               </div>
//             ))
//           )}
//         </>
//       )}

//       <div className={styles.footer}>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default GiftBoxes;





import React, { useState, useEffect } from "react";
import styles from "./giftBoxes.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GokulHeading from "../../components/gokul_heading/gokul_heading";
import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
import Footer from "../../components/footer/footer";
import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
import Loader from "../../components/Loader/loader1/sweetLoader";
import { useToaster } from "../../utils";

// Import the two new components
import GiftBoxCartRight from "./giftBoxCart/giftBoxCartRight/giftBoxCartRight";
import GiftBoxCartLeft from "./giftBoxCart/giftBoxCartLeft/giftBoxCartLeft";

const GiftBoxes = () => {
  // Existing states
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("All");

  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
  const [selectedSweets, setSelectedSweets] = useState([]);
  const [isViewingSelection, setIsViewingSelection] = useState(false);
  const [storedSelections, setStoredSelections] = useState([]);

  const setToast = useToaster();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGiftBoxes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/giftBoxes");
        if (!response.ok) throw new Error("Failed to fetch gift box data.");
        const data = await response.json();
        if (data.success) {
          const updatedGiftBoxes = data.giftBoxes.map((box) => ({
            ...box,
            selectedImage: box.images[0]?.data
              ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
              : null,
          }));
          setGiftBoxes(updatedGiftBoxes);
        } else {
          throw new Error("No gift box data found.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftBoxes();
  }, []);

  // Handle image selection within a gift box card
  const handleImageClick = (boxId, image) => {
    setGiftBoxes((prevGiftBoxes) =>
      prevGiftBoxes.map((box) =>
        box._id === boxId ? { ...box, selectedImage: image } : box
      )
    );
  };


  useEffect(() => {
    const editingIndex = localStorage.getItem("editingBoxIndex");
    if (editingIndex !== null) {
      const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        setSelectedGiftBox(selections[index].selectedGiftBox);
        setSelectedSweets(selections[index].selectedSweets);
        setIsViewingSelection(true); 
      }
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("giftBoxSelections");
    if (savedData) {
      const { selectedGiftBox, selectedSweets } = JSON.parse(savedData);
      setSelectedGiftBox(selectedGiftBox);
      setSelectedSweets(selectedSweets);
    }
  }, []);

 // ✅ Re-render when selections change

  // Handle filter chip clicks to update the current filter
  const handleFilterClick = (filterValue) => {
    setCurrentFilter(filterValue);
  };

  // Normalize the filter label for proper matching
  const normalizeFilterLabel = (label) => {
    switch (label) {
      case "Small (500 gm)":
        return "500 gm";
      case "Medium (1 kg)":
        return "1 kg";
      case "Large (2 kg)":
        return "2 kg";
      default:
        return label;
    }
  };

  // Filter the gift boxes based on the current selection
  const filteredGiftBoxes =
    currentFilter === "All"
      ? giftBoxes
      : giftBoxes.filter(
          (box) => box.size === normalizeFilterLabel(currentFilter)
        );

const handleClick = (box) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    setToast("Please log in first!", "error");
    return;
  }
  setSelectedGiftBox(box);
  setIsViewingSelection(true);  // Switch to selection view
};

    // Callback function to update selected sweets
    const handleFinalizeSelection = (sweets) => {
      setSelectedSweets(sweets); // Store selected sweets when the user clicks "Add"
    };


    const handleBack = () => {
      setSelectedGiftBox(null); // ✅ Clear selection
      setSelectedSweets([]); // ✅ Reset sweets
      setIsViewingSelection(false); // ✅ Switch back to GiftBoxAndBulkTemplate
    };

  return (
    <div className={styles.giftBoxes}>
      <div className={styles.above_header}>
        <AboveHeader />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.gokul_heading}>
        <div>Gift Boxes</div>
      </div>

      {isLoading && <Loader />}
      {error && <div className={styles.error}>Error: {error}</div>}

      {!isLoading && !error && (
        <div className={styles.mainContainer}>
          {/* Left side: conditionally render GiftBoxCartLeft or the gift boxes grid */}
          <div className={styles.leftSection}>
            {selectedGiftBox ? (
          <GiftBoxCartLeft
          basket={[]} 
          size={selectedGiftBox?.size}
          selectedGiftBox={selectedGiftBox}
          onFinalize={handleFinalizeSelection}
          onBack={handleBack}
          setStoredSelections={setStoredSelections} // ✅ Pass it down
        />
            ) : (
              <>
                <div className={styles.filtersection}>
                  <div className={styles.filters}>
                    <FilterChip
                      label="All"
                      isActive={currentFilter === "All"}
                      onClick={() => handleFilterClick("All")}
                    />
                    <FilterChip
                      label="Small (500 gm)"
                      isActive={currentFilter === "Small (500 gm)"}
                      onClick={() => handleFilterClick("Small (500 gm)")}
                    />
                    <FilterChip
                      label="Medium (1 kg)"
                      isActive={currentFilter === "Medium (1 kg)"}
                      onClick={() => handleFilterClick("Medium (1 kg)")}
                    />
                    <FilterChip
                      label="Large (2 kg)"
                      isActive={currentFilter === "Large (2 kg)"}
                      onClick={() => handleFilterClick("Large (2 kg)")}
                    />
                  </div>
                </div>

                {filteredGiftBoxes.length === 0 ? (
                  <p className={styles.noItems}>
                    🎁 No gift boxes available for this selection.
                  </p>
                ) : (
                  filteredGiftBoxes.map((box) => (
                    <div key={box._id} className={styles.hall_details}>
                      <GiftBoxAndBulkTemplate
                        name={box.title}
                        price={`₹ ${box.price}`}
                        description={box.description}
                        size={box.size}
                        selectedImage={box.selectedImage}
                        images={box.images.map(
                          (img) =>
                            `data:${img.contentType};base64,${img.data}`
                        )}
                        onImageClick={(image) => handleImageClick(box._id, image)}
                        showMoreImages={box.images.length > 5}
                        onClick={() => handleClick(box)} // Clicking calls handleClick which sets selectedGiftBox
                      />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
          {/* Right side: permanently visible order summary */}
          <div className={styles.rightSection}>
          <GiftBoxCartRight 
  storedSelections={storedSelections} // ✅ Use updated state
  setStoredSelections={setStoredSelections} // ✅ Pass setter
  selectedGiftBox={selectedGiftBox}
  setSelectedGiftBox={setSelectedGiftBox}
  selectedSweets={selectedSweets}
  setSelectedSweets={setSelectedSweets}
  isViewingSelection={isViewingSelection}
  setIsViewingSelection={setIsViewingSelection}
/>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default GiftBoxes;