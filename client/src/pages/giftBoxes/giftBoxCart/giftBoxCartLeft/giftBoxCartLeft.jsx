

import React, { useEffect, useState } from "react";
import styles from "./giftBoxCartLeft.module.css";
import axios from "axios";
import { useToaster } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import backIcon from "./Assets/backIcon.svg";
import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary
// Helper to determine the sweets limit based on box size.
const getSweetsLimit = (size) => {
  // For example, a mapping could be:
  // "500 gm" => 3 sweets, "1 Kg" => 5 sweets, "2 Kg" => 8 sweets.
  const mapping = {
    "500 gm": 2,
    "1 kg": 2,  // Note: Changed to lowercase to match your filter in GiftBoxes component
    "2 kg": 6,  // Note: Changed to lowercase to match your filter in GiftBoxes component
  };
  return mapping[size] || 5;
};
const FestiveSweet = ({ product, addToCart, removeFromCart, basket = [] }) => {
  // Check if the sweet is already selected
  const isInBasket = basket.some((item) => item._id === product._id);

  return (
    <div className={styles.card}>
      <img
        src={
          product.image?.contentType && product.image?.data
            ? `data:${product.image.contentType};base64,${product.image.data}`
            : product.image
        }
        alt={product.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{product.price}</span>
          <button
            className={styles.button}
            onClick={() =>
              isInBasket
                ? removeFromCart(product._id) // Remove only this sweet
                : addToCart(product) // Add only this sweet
            }
          >
            {isInBasket ? "REMOVE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

const GiftBoxCartLeft = ({
  customMessage,
  setCustomMessage,
  setStoredSelections,
  setselectedQuantity,
  selectedQuantity,
  selectedGiftBox,
  refreshSummaryForm=false,
  setRefreshSummaryForm,
  onFinalize,    // Callback when user clicks "Add"
  onBack         // Callback when user clicks "Back"
}) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  // Local state to hold the user's selection for sweets.
  const [selectedSweets, setSelectedSweets] = useState([]);
  const setToast = useToaster();
  const navigate = useNavigate();

  // Make sure selectedGiftBox exists and has necessary properties
  if (!selectedGiftBox || !selectedGiftBox.title || !selectedGiftBox.size) {
    console.error("Missing or invalid selectedGiftBox prop:", selectedGiftBox);
    // You might want to handle this case more gracefully
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        const filteredSweets =
          response.data?.products?.filter(
            (product) => product?.category?.toLowerCase() === "sweets"
          ) || [];
        setSweets(filteredSweets);
      } catch (error) {
        console.error("Error fetching products:", error);
        setToast("Failed to load products. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Remove setToast from dependency array to prevent unnecessary fetches
  }, []);


  useEffect(() => {
    const editingIndex = localStorage.getItem("editingBoxIndex");
    if (editingIndex !== null) {
      const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        setSelectedSweets(selections[index].selectedSweets);
      }
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    setSelectedSweets((prev) => {
      const updatedSweets = prev.filter((p) => p._id !== productId);
      
      // Update local storage
      const selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
      const editingIndex = localStorage.getItem("editingBoxIndex");
      if (editingIndex !== null) {
        const index = parseInt(editingIndex, 10);
        if (!isNaN(index) && index >= 0 && index < selections.length) {
          selections[index].selectedSweets = updatedSweets;
          localStorage.setItem("giftBoxSelections", JSON.stringify(selections));
        }
      }
  
      return updatedSweets;
    });
  };
  


  const handleAddToCart = (product) => {
    setSelectedSweets((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev; // Prevent duplicates
  
      return [...prev, product]; // ✅ Append but don't update GiftBoxCartRight yet
    });
  };



  const handleFinalizeSelection = () => {
    const sweetsLimit = getSweetsLimit(selectedGiftBox.size);
  
    if (selectedSweets.length > sweetsLimit) {
      setToast(`You can only select up to ${sweetsLimit} sweets.`, "error");
      return;
    }
  
    if (selectedSweets.length === 0) {
      setToast("Please select at least one sweet.", "error");
      return;
    }
  
    let selections = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
    const editingIndex = localStorage.getItem("editingBoxIndex");
  
    if (editingIndex !== null && selections.length > 0) {
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        const existingSweets = selections[index].selectedSweets;
  
        // ✅ Ensure sweets are merged correctly without duplicates
        const mergedSweets = [...existingSweets, ...selectedSweets].filter(
          (sweet, idx, self) =>
            self.findIndex((s) => s._id === sweet._id) === idx
        );
  
        selections[index].selectedSweets = mergedSweets;
        localStorage.removeItem("editingBoxIndex"); // Clear editing mode after update
      }
    } else {
      selections.push({
        selectedGiftBox: {
          title: selectedGiftBox.title,
          size: selectedGiftBox.size,
          price: selectedGiftBox.price,
        },
        selectedSweets: selectedSweets.map(sweet => ({
          _id: sweet._id,  // ✅ Ensure _id is used to track duplicates
          name: sweet.name,
          price: sweet.price,
        })),
        quantity: selectedQuantity,
      });
    }
  
    localStorage.setItem("giftBoxSelections", JSON.stringify(selections));
    
    // ✅ Update UI immediately
    setStoredSelections([...selections]);
    setRefreshSummaryForm(true)
  
    console.log("Updated gift box selections:", selections);
    onBack();
  };


  // Safe guard for when selectedGiftBox is not available yet
  if (!selectedGiftBox) {
    return <div className={styles.loading}>Loading gift box details...</div>;
  }

  return (
    <div className={styles.giftBoxCartLeft}>
      <div className={styles.container}>
        {/* {loading && <p>Loading...</p>} */}
        <div className={styles.header}>
          <div className={styles.backButton}>
            <img src={backIcon} alt="back" className={styles.backIcon} />
            <button 
              className={styles.back} 
              onClick={onBack || (() => console.warn("onBack is not provided"))}
            >
              Back
            </button>
          </div>
      
          <div className={styles.notes}>
          <div className={styles.selectedBoxNameAndSize}>
  {selectedGiftBox ? `${selectedGiftBox.title} (${selectedGiftBox.size})` : "No box selected"}
</div>
            <div className={styles.itemsLimit}>
              Note: You can select up to{" "}
              <strong>{getSweetsLimit(selectedGiftBox.size)}</strong> sweets.
            </div>
          </div>
        </div>
        {/* {loading && <p>Loading...</p>} */}
        <div className={styles.grid}>
          {sweets.map((sweet) => (
            <FestiveSweet
              key={sweet._id}
              product={sweet}
              // Use local selectedSweets for display.
              basket={selectedSweets}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
        {/* "View More" button for pagination if needed */}
        {!loading && sweets.length > 0 && (
          <p
            className={styles.viewMoreContainer}
            onClick={() => {
              // Increase page and fetch more sweets accordingly.
              console.log("View more clicked - Implement pagination here");
            }}
          >
            View More
          </p>
        )}
        
        {/* Show a message if no sweets are found */}
        {!loading && sweets.length === 0 && (
          <p className={styles.noItems}>No sweets available</p>
        )}


          <div className={styles.quantityWrapper}>
                  <div>Select the Quantity:</div>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    defaultValue="1"
                    className={styles.quantityInput}
                    value={selectedQuantity}
                    onChange={
                      (e) => {
                        setselectedQuantity(Number(e.target.value));
                      }
                    }
                  />
                </div>

                
        <div>If any other requirements please mention below</div>
     <div>
             <div className={styles.textareaLabel}>Write your message here:</div>
             <textarea
               className={styles.textarea}
               rows="4"
               cols="50"
               placeholder="Type your message here..."
               value={customMessage}
               onChange={(e) => setCustomMessage(e.target.value)}
             ></textarea>
           </div>
        <div className={styles.addButton}>
          <button 
            className={styles.add} 
            onClick={handleFinalizeSelection}
            disabled={selectedSweets.length === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxCartLeft;