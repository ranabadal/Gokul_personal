



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
import PreviewScreen from "./PreviewScreen/previewScreen";
import { BASE_URL } from "../../Const/Const";

// Import the two new components
import GiftBoxCartRight from "./giftBoxCart/giftBoxCartRight/giftBoxCartRight";
import GiftBoxCartLeft from "./giftBoxCart/giftBoxCartLeft/giftBoxCartLeft";

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
const [customMessage, setCustomMessage] = useState(""); // Store the user's message


  const setToast = useToaster();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGiftBoxes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/giftBoxes`);
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

    const  orderConfirmed = () => {
      setShowPreview(false); // Close preview when order is confirmed
    };

    const handleCheckoutClick = () => {
      setShowPreview(true); // ✅ Only trigger preview when checkout is clicked
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
            {showPreview ? (
                  <PreviewScreen
                  customMessage={customMessage}
                    showPreview={showPreview}
                    setShowPreview={setShowPreview}
                    onBack={() => setShowPreview(false)}
                    orderConfirmed={orderConfirmed}
                  //  onBack={(navigate(-1))}
                  />
                ) : (
                  <>
          {/* Left side: conditionally render GiftBoxCartLeft or the gift boxes grid */}
          <div className={styles.leftSection}>
            {selectedGiftBox ? (
          <GiftBoxCartLeft
          customMessage={customMessage}
          setCustomMessage=
          {setCustomMessage}
          basket={[]} 
          setRefreshSummaryForm={setRefreshSummaryForm}
          refreshSummaryForm={refreshSummaryForm}
          size={selectedGiftBox?.size}
          selectedGiftBox={selectedGiftBox}
          onFinalize={handleFinalizeSelection}
          onBack={handleBack}
          setselectedQuantity={setselectedQuantity}
          selectedQuantity={selectedQuantity} 
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
               handleCheckout={handleCheckoutClick} 
  storedSelections={storedSelections} // ✅ Use updated state
  setStoredSelections={setStoredSelections} // ✅ Pass setter
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