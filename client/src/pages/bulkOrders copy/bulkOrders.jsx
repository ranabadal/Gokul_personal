



import React, { useState, useEffect } from "react";
import styles from "./bulkOrders.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Sweets from "./Assets/sweets.png";
import Snacks from "./Assets/snacks.png";
import GiftBox from "./GiftBoxesForBulkPage/giftBoxesForBulkPage";
import RegularBoxModal from "./RegularBoxModal";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../Const/Const";
import { useToaster } from "../../utils";

const BulkOrder = () => {
  // Standard state definitions
  const [selectedBox, setSelectedBox] = useState("Sweet Box");
  const [selectedType, setSelectedType] = useState("Gift Box");
  const [selectedItems, setSelectedItems] = useState({});
  const [comments, setComments] = useState("");
  const [sweets, setSweets] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const setToast = useToaster();
  // Load Gift Box Selection from localStorage (or default structure)
  const [finalSelection, setFinalSelection] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("GiftBoxSelectionforBulkOrders")) || {
        giftBoxes: [],
        generalHandbags: [],
      }
    );
  });

  // Updated state initialization for Regular Boxes with extra type checking.
  const [selectedRegularBoxes, setSelectedRegularBoxes] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("RegularBoxSelection")) || {};
    return Object.entries(storedData).map(([id, data]) => {
      // If data is a number, assume it's the quantity.
      if (typeof data === "number") {
        return {
          id,
          label: id, // Fall back to id as label.
          quantity: data,
        };
      }
      // If data is an object, ensure the label is a string.
      let label = data.label;
      if (typeof label !== "string") {
        // If label is an object, try to pull a string out of it or stringify it.
        label = label?.label ? label.label : JSON.stringify(label);
      }
      return {
        id,
        label,
        quantity: data.quantity || 1,
      };
    });
  });

  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showRegularBoxModal, setShowRegularBoxModal] = useState(false);
  const [selectedGiftBoxItems, setSelectedGiftBoxItems] = useState(null);

  // Fetch addresses only when the address modal opens.
  useEffect(() => {
    if (showAddressModal) {
      fetchAddresses();
    }
  }, [showAddressModal]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;
      const response = await axios.get(`${BASE_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };

  // Fetch products (sweets and snacks)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
  
        setSweets(response.data.products.filter((p) => p.category === "Sweets"));
        setSnacks(response.data.products.filter((p) => p.category === "Restaurant" && p.bulkOrderAvailable === true));
  
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Increase or decrease quantity for sweets/snacks.
  const handleQuantityChange = (item, operation) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]:
        operation === "increase"
          ? (prev[item] || 0) + 1
          : Math.max((prev[item] || 0) - 1, 0),
    }));
  };

  // Delete an item from the order for a given category.
  const handleDeleteItem = (id, category) => {
    let updatedData;
    if (category === "selectedItems") {
      updatedData = { ...selectedItems };
      delete updatedData[id];
      setSelectedItems(updatedData);
      localStorage.setItem("selectedItems", JSON.stringify(updatedData));
    } else if (category === "selectedRegularBoxes") {
      updatedData = selectedRegularBoxes.filter((box) => box.id !== id);
      setSelectedRegularBoxes(updatedData);
      localStorage.setItem(
        "RegularBoxSelection",
        JSON.stringify(Object.fromEntries(updatedData.map((box) => [box.id, box.quantity])))
      );
    } else if (category === "giftBoxes") {
      updatedData = {
        ...finalSelection,
        giftBoxes: finalSelection.giftBoxes.filter((box) => box.id !== id),
      };
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    } else if (category === "matchingHandbags") {
      updatedData = { ...finalSelection };
      updatedData.giftBoxes.forEach((box) => {
        box.matchingHandbags = box.matchingHandbags.filter((handbag) => handbag.id !== id);
      });
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    } else if (category === "generalHandbags") {
      updatedData = {
        ...finalSelection,
        generalHandbags: finalSelection.generalHandbags.filter((handbag) => handbag.id !== id),
      };
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    }
  };

  // Handler to place an order – validates that user is logged in and that the order is nonempty.
  const handlePlaceOrder = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setToast("Please log in to place an order.");
      return;
    }
    if (
      Object.keys(selectedItems).length === 0 &&
      selectedRegularBoxes.length === 0 &&
      finalSelection.giftBoxes.length === 0 &&
      finalSelection.generalHandbags.length === 0
    ) {
      setToast("Your order is empty! Please add items before placing an order.");
      return;
    }
    setShowAddressModal(true);
  };



// Confirm the order – validates that a proper address is selected, then send order data.
const handleConfirmOrder = async (selectedAddress) => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setToast("User authentication required. Please log in.");
      return;
    }
    if (!selectedAddress || typeof selectedAddress !== "object" || Object.keys(selectedAddress).length === 0) {
      setToast("Please select a valid delivery address before confirming the order.");
      return;
    }
    if (
      Object.keys(selectedItems).length === 0 &&
      selectedRegularBoxes.length === 0 &&
      finalSelection.giftBoxes.length === 0 &&
      finalSelection.generalHandbags.length === 0
    ) {
      setToast("Your order is empty! Please add items before placing an order.");
      return;
    }

    const totalCost = calculateTotalCost();
    const orderData = {
      selectedItems,
      selectedRegularBoxes,
      giftBoxes: finalSelection.giftBoxes,
      generalHandbags: finalSelection.generalHandbags,
      comments,
      totalCost,
      address: selectedAddress,
    };

    console.log("Sending Order Data:", orderData);
    const response = await axios.post(`${BASE_URL}/api/bulkOrderQueries`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      setToast("Order placed successfully!");
      console.log("Server Response:", response.data);

      // Clear all order data from state.
      setSelectedItems({});
      setSelectedRegularBoxes([]);
      setFinalSelection({ giftBoxes: [], generalHandbags: [] });
      setComments("");

      // (Optional) Remove the corresponding local storage data.
      localStorage.removeItem("selectedItems");
      localStorage.removeItem("RegularBoxSelection");
      localStorage.removeItem("GiftBoxSelectionforBulkOrders");
    } else {
      setToast(response.data.message || "Failed to place order.");
    }
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message || error);
    setToast(error.response?.data?.message || "Failed to place order. Please try again.");
  }
   // Clear all order data from state.
   setSelectedItems({});
   setSelectedRegularBoxes([]);
   setFinalSelection({ giftBoxes: [], generalHandbags: [] });
   setComments("");

   // (Optional) Remove the corresponding local storage data.
   localStorage.removeItem("selectedItems");
   localStorage.removeItem("RegularBoxSelection");
   localStorage.removeItem("GiftBoxSelectionforBulkOrders");
  // Finally, close the address modal.
  setShowAddressModal(false);
};


  // Calculate the total cost based on sweets/snacks and any box or handbag selections.
  const calculateTotalCost = () => {
    let total = 0;
    // Cost for sweets/snacks.
    Object.entries(selectedItems).forEach(([itemName, qty]) => {
      const itemDetails =
        sweets.find((s) => s.name === itemName) ||
        snacks.find((s) => s.name === itemName);
      if (itemDetails?.price) {
        total += itemDetails.price * qty;
      }
    });
    // Gift boxes cost (including matching handbags).
    finalSelection.giftBoxes.forEach((box) => {
      if (box.price) total += box.price * box.quantity;
      box.matchingHandbags?.forEach((handbag) => {
        if (handbag.price) total += handbag.price * handbag.quantity;
      });
    });
    // General handbags cost.
    finalSelection.generalHandbags.forEach((handbag) => {
      if (handbag.price) total += handbag.price * handbag.quantity;
    });
    return total;
  };

  // Callback when Gift Box selection is complete.
  const handleGiftBoxSelection = (items) => {
    setSelectedGiftBoxItems(items);
    setShowGiftBox(false);
  };

  // Callback when Regular Boxes are selected from the modal.
  const handleRegularBoxSelection = (boxes) => {
    setSelectedRegularBoxes(boxes);
    setShowRegularBoxModal(false);
  };

  return (
    <>
    
      <Header />
      <div className={`${styles.bulkOrderContainer} ${(showGiftBox || showRegularBoxModal) ? styles.hidden : ""}`}>
        {/* Left Section – Product Selection */}
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>Place Bulk Order</h2>
          <div className={styles.boxSelection}>
            <button
              className={selectedBox === "Sweet Box" ? styles.active : ""}
              onClick={() => setSelectedBox("Sweet Box")}
            >
              <img src={Sweets} alt="Sweets" className={styles.boxImage} />
              <span>Sweets</span>
            </button>
            <button
              className={selectedBox === "Snacks Box" ? styles.active : ""}
              onClick={() => setSelectedBox("Snacks Box")}
            >
              <img src={Snacks} alt="Snacks" className={styles.boxImage} />
              <span>Snacks</span>
            </button>
          </div>
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <div>
              <h3 className={styles.sectionHeading}>
                {selectedBox === "Sweet Box" ? "Select Sweets" : "Select Snacks"}
              </h3>
              <div className={styles.selectionGrid}>
                {(selectedBox === "Sweet Box" ? sweets : snacks).map((item) => (
                  <div key={item._id} className={styles.item}>
                    <div className={styles.imageContainer}>
                      <img src={item.image} alt={item.name} className={styles.image} />
                    </div>
                    <div className={styles.detailsContainer}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.price}>{item.price}/- kg</div>
                      <div className={styles.controls}>
                        <button onClick={() => handleQuantityChange(item.name, "decrease")}>-</button>
                        <span>{selectedItems[item.name] || 0}</span>
                        <button onClick={() => handleQuantityChange(item.name, "increase")}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Box Type Selector */}
          <div className={styles.boxType}>
            <button
              className={selectedType === "Regular Box" ? styles.active : ""}
              onClick={() => setShowRegularBoxModal(true)}
            >
              Regular Box
            </button>
            <button
              className={selectedType === "Gift Box" ? styles.active : ""}
              onClick={() => setShowGiftBox(true)}
            >
              Gift Box
            </button>
          </div>
          {/* Comments Section */}
          <div className={styles.commentsSection}>
            <label className={styles.commentsLabel}>Add special requests:</label>
            <textarea
              className={styles.comments}
              placeholder="Write your custom message..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Right Section – Order Summary */}
        <div className={styles.rightSection}>
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            {/* Selected Sweets/Snacks */}
            {Object.entries(selectedItems)
              .filter(([itemName, qty]) => qty > 0)
              .map(([itemName, qty]) => {
                const itemDetails =
                  sweets.find((s) => s.name === itemName) ||
                  snacks.find((s) => s.name === itemName);
                return (
                  <div key={itemName} className={styles.summaryItem}>
                    <p>
                      <strong>{itemName}</strong>: {qty} kg
                    </p>
                    <p>Cost: ₹{itemDetails?.price ? itemDetails.price * qty : "Price not available"}</p>
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(itemName, "selectedItems")}>
                      <FaTrash />
                    </button>
                  </div>
                );
              })}

            {/* Selected Regular Boxes (FREE) */}
            {selectedRegularBoxes.length > 0 && (
              <div className={styles.summarySection}>
                <h4>Regular Box Selection (Free)</h4>
                {selectedRegularBoxes.map((box) => (
                  <div key={box.id} className={styles.summaryItem}>
                    <p>
                      {/* Ensure label is a string */}
                      <strong>
                        {typeof box.label === "object"
                          ? box.label.label || JSON.stringify(box.label)
                          : box.label}
                      </strong>
                      : Quantity: {box.quantity}
                    </p>
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(box.id, "selectedRegularBoxes")}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Gift Box Selections */}
            {finalSelection.giftBoxes.length > 0 && (
              <div className={styles.summarySection}>
                <h4>Gift Box Selection</h4>
                {finalSelection.giftBoxes.map((box) => (
                  <div key={box.id} className={styles.summaryItem}>
                    <p>
                      <strong>{box.name}</strong>: Quantity: {box.quantity}
                    </p>
                    <p>Cost: ₹{box.price * box.quantity}</p>
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(box.id, "giftBoxes")}>
                      <FaTrash />
                    </button>
                    {box.matchingHandbags?.length > 0 && (
                      <ul>
                        {box.matchingHandbags.map((handbag) => (
                          <li key={handbag.id}>
                            <strong>{handbag.name}</strong>: {handbag.quantity}
                            <p>Cost: ₹{handbag.price * handbag.quantity}</p>
                            <button className={styles.deleteButton} onClick={() => handleDeleteItem(handbag.id, "matchingHandbags")}>
                              <FaTrash />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* General Handbags */}
            {finalSelection.generalHandbags.length > 0 && (
              <div className={styles.summarySection}>
                <h4>General Handbags</h4>
                {finalSelection.generalHandbags.map((handbag) => (
                  <div key={handbag.id} className={styles.summaryItem}>
                    <p>
                      <strong>{handbag.name}</strong>: Quantity: {handbag.quantity}
                    </p>
                    <p>Cost: ₹{handbag.price * handbag.quantity}</p>
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(handbag.id, "generalHandbags")}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Total Cost Calculation */}
            <div className={styles.totalCost}>
              <h3>Total Cost approx.: ₹{calculateTotalCost()}</h3>
            </div>

            {/* Place Order Button */}
            <div className={styles.orderActions}>
              <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Box Modal */}
      {showGiftBox && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowGiftBox(false)}>
              ×
            </button>
            <GiftBox
              selectedItems={selectedItems}
              comments={comments}
              onSelect={handleGiftBoxSelection}
              setFinalSelection={setFinalSelection}
            />
          </div>
        </div>
      )}

      {/* Regular Box Modal */}
      {showRegularBoxModal && (
        <RegularBoxModal onClose={() => setShowRegularBoxModal(false)} onSelect={handleRegularBoxSelection} />
      )}

      <Footer />

      {/* Inline Address Selection Modal */}
      {showAddressModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Select Delivery Address</h2>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <label key={address._id || address.id} className={styles.addressOption}>
                  <input
                    type="radio"
                    name="address"
                    value={address._id || address.id}
                    onChange={() => setSelectedAddress(address)}
                    checked={
                      selectedAddress &&
                      (selectedAddress._id === address._id || selectedAddress.id === address.id)
                    }
                  />
                  {address.province}, {address.city}, {address.area}, {address.landmark}
                </label>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
            <div className={styles.modalActions}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowAddressModal(false);
                  setSelectedAddress(null);
                }}
              >
                Close
              </button>
              <button className={styles.confirmButton} onClick={() => handleConfirmOrder(selectedAddress)}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkOrder;