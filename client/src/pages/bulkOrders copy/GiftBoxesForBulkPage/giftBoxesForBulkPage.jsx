



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