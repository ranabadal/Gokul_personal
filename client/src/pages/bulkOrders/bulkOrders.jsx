


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import { useToaster } from "../../utils";
// import Loader from "../../components/Loader/loader2/loader2";
// import bulkOrderPic from "./Assets/bulk_pic.png";


// const BulkOrders = () => {
//   const [bulkOrders, setBulkOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentFilter, setCurrentFilter] = useState("All");

//   const setToast = useToaster();
//   const navigate = useNavigate();

//   // Fetch bulk orders from the API
//   useEffect(() => {
//     const fetchBulkOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/bulkOrders");
//         if (!response.ok) throw new Error("Failed to fetch bulk order data.");

//         const data = await response.json();
//         if (data.success) {
//           const updatedBulkOrders = data.bulkOrders.map((order) => ({
//             ...order,
//             selectedImage:
//               order.images?.[0]
//                 ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//                 : null,
//           }));
//           setBulkOrders(updatedBulkOrders);
//         } else {
//           throw new Error("No bulk order data found.");
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBulkOrders();
//   }, []);

//   const handleImageClick = (bulkOrderId, image) => {
//     setBulkOrders((prevBulkOrders) =>
//       prevBulkOrders.map((order) =>
//         order._id === bulkOrderId ? { ...order, selectedImage: image } : order
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

//   const filteredOrders =
//     currentFilter === "All"
//       ? bulkOrders
//       : bulkOrders.filter(
//           (order) => order.size === normalizeFilterLabel(currentFilter)
//         );

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

//       navigate("/bulkOrderCart", { state: selectedOrderDetails });
//     } catch (error) {
//       console.error("Error in handleClick:", error);
//       setToast('An unexpected error occurred!', 'error');
//     }
//   };

//   return (
//     <div className={styles.bulkOrders}>
//       <AboveHeader />
//       <Header />
//       <div className={styles.img} >
//        <img className={styles.gokul_img} src={bulkOrderPic} alt="bulk order pic"/>

//       </div>
// {/* 
//       {isLoading && <Loader>Loading bulk order data...</Loader>}

//       {!isLoading && error && <div className={styles.error}>Error: {error}</div>} */}

//       {/* Filter Section */}
//       {/* {!isLoading && !error && (
//         <div className={styles.filtersection}>
//           <div className={styles.filters}>
//             <FilterChip
//               label="All"
//               isActive={currentFilter === "All"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Small (500 gm)"
//               isActive={currentFilter === "Small (500 gm)"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Medium (1 kg)"
//               isActive={currentFilter === "Medium (1 kg)"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Large (2 kg)"
//               isActive={currentFilter === "Large (2 kg)"}
//               onClick={handleFilterClick}
//             />
//           </div>
//         </div>
//       )} */}

//       {/* Display filtered orders */}
//       {/* {!isLoading && !error && filteredOrders.map((order) => (
//         <div key={order._id} className={styles.hall_details}>
//           <GiftBoxAndBulkTemplate
//             name={order.title}
//             size={order.size}
//             price={`₹ ${order.price}`}
//             selectedImage={order.selectedImage}
//             description={order.description}
//             images={order.images.map(
//               (img) => `data:${img.contentType};base64,${img.data}`
//             )}
//             onImageClick={(image) => handleImageClick(order._id, image)}
//             showMoreImages={order.images.length > 5}
//             onClick={() => handleClick(order)}
//           />
//         </div>
//       ))} */}

//       <Footer />
//     </div>
//   );
// };

// export default BulkOrders;




import React, { useState, useEffect } from "react";
import styles from "../giftBoxes/giftBoxes.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GokulHeading from "../../components/gokul_heading/gokul_heading";
import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
import Footer from "../../components/footer/footer";
import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
import Loader from "../../components/Loader/loader2/loader2";
import { useToaster } from "../../utils";
import PreviewScreen from "./PreviewScreen/previewScreen";

// Import the two new components
import GiftBoxCartRight from "./bulkOrderCart/BulkOrderCartRight/bulkOrderCartRight";
import GiftBoxCartLeft from "./bulkOrderCart/BulkOrderCartLeft/bulkOrderCartLeft";

const GiftBoxes = () => {
  // Existing states
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [refreshSummaryForm, setRefreshSummaryForm] = useState(true);

  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
  const [selectedSweets, setSelectedSweets] = useState([]);
  const [isViewingSelection, setIsViewingSelection] = useState(false);
  const [storedSelections, setStoredSelections] = useState([]);
  const [selectedQuantity, setselectedQuantity] = useState(1); // New state for quantity
  const [showPreview, setShowPreview] = useState(false);
  const [basketTotal, setBasketTotal] = useState(0); // New state for basket total

const [customMessage, setCustomMessage] = useState(""); // Store the user's message


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
      const selections = JSON.parse(localStorage.getItem("bulkOrderSelections")) || [];
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        setSelectedGiftBox(selections[index].selectedGiftBox);
        setSelectedSweets(selections[index].selectedSweets);
        setIsViewingSelection(true); 
      }
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("bulkOrderSelections");
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

  const  orderConfirmed = () => {
      setShowPreview(false); // Close preview when order is confirmed
    };



    const handleCheckoutClick = () => {
      setShowPreview(true); // ✅ Only trigger preview when checkout is clicked
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
    <div>Bulk Order</div>
  </div>

  {isLoading && <Loader />}
  {error && <div className={styles.error}>Error: {error}</div>}

  {!isLoading && !error && (
    <div className={styles.mainContainer}>
      {showPreview ? (
        <PreviewScreen
        customMessage={customMessage}
          // storedSelections={storedSelections} // ✅ Pass all selected boxes
          // basketTotal={basketTotal}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          onBack={() => setShowPreview(false)}
          orderConfirmed={orderConfirmed}
        //  onBack={(navigate(-1))}
        />
      ) : (
        <>
          <div className={styles.leftSection}>
            {selectedGiftBox ? (
              <GiftBoxCartLeft
              customMessage={customMessage} // Pass the custom message
              setCustomMessage=
{setCustomMessage} // Pass the setter function
                basket={[]} 
                setRefreshSummaryForm={setRefreshSummaryForm}
                refreshSummaryForm={refreshSummaryForm}
                size={selectedGiftBox?.size}
                selectedGiftBox={selectedGiftBox}
                onFinalize={handleFinalizeSelection}
                onBack={handleBack}
                setStoredSelections={setStoredSelections} 
                setselectedQuantity={setselectedQuantity}
                selectedQuantity={selectedQuantity} // ✅ Pass quantity
              />
            ) : (
              <>
                <div className={styles.filtersection}>
                  <div className={styles.filters}>
                    <FilterChip label="All" isActive={currentFilter === "All"} onClick={() => handleFilterClick("All")} />
                    <FilterChip label="Small (500 gm)" isActive={currentFilter === "Small (500 gm)"} onClick={() => handleFilterClick("Small (500 gm)")} />
                    <FilterChip label="Medium (1 kg)" isActive={currentFilter === "Medium (1 kg)"} onClick={() => handleFilterClick("Medium (1 kg)")} />
                    <FilterChip label="Large (2 kg)" isActive={currentFilter === "Large (2 kg)"} onClick={() => handleFilterClick("Large (2 kg)")} />
                  </div>
                </div>
                {filteredGiftBoxes.length === 0 ? (
                  <p className={styles.noItems}>🎁 No gift boxes available for this selection.</p>
                ) : (
                  filteredGiftBoxes.map((box) => (
                    <div key={box._id} className={styles.hall_details}>
                      <GiftBoxAndBulkTemplate
                        name={box.title}
                        price={`₹ ${box.price}`}
                        description={box.description}
                        size={box.size}
                        selectedImage={box.selectedImage}
                        images={box.images.map((img) => `data:${img.contentType};base64,${img.data}`)}
                        onImageClick={(image) => handleImageClick(box._id, image)}
                        showMoreImages={box.images.length > 5}
                        onClick={() => handleClick(box)}
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
              handleCheckout={handleCheckoutClick} // ✅ Checkout triggers preview
              storedSelections={storedSelections}
              setStoredSelections={setStoredSelections}
              selectedGiftBox={selectedGiftBox}
              setSelectedGiftBox={setSelectedGiftBox}
              selectedSweets={selectedSweets}
              setRefreshSummaryForm={setRefreshSummaryForm}
              setSelectedSweets={setSelectedSweets}
              isViewingSelection={isViewingSelection}
              setIsViewingSelection={setIsViewingSelection}
              refreshSummaryForm={refreshSummaryForm}
              selectedQuantity={selectedQuantity}
              setselectedQuantity={setselectedQuantity}
              setBasketTotal={setBasketTotal} // Pass the setter function
            />
          </div>
        </>
      )}
    </div>
  )}
  <div className={styles.footer}>
    <Footer />
  </div>
</div>
  );
};

export default GiftBoxes;
