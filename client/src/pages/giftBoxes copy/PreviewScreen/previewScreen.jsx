

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./previewScreen.module.css";
import Header from "../../../components/header/header";
import AboveHeader from "../../../components/above_header/above_header";
import Footer from "../../../components/footer/footer";
import { BASE_URL } from "../../../Const/Const";
const PreviewScreen = ({ orderConfirmed,customMessage}) => {
  const [storedSelections, setStoredSelections] = useState([]);
  const [basketTotal, setBasketTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [modalSelectedAddress, setModalSelectedAddress] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("giftBoxSelections")) || [];
    setStoredSelections(data);

    // Calculate total cost
    const total = data.reduce((acc, box) => {
      const boxCost = box.selectedGiftBox?.price || 0;
      const quantity = box.quantity || 0;
      return acc + boxCost * quantity;
    }, 0);

    setBasketTotal(total);
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };

  const handleOpenAddressModal = async () => {
    await fetchAddresses();
    setShowAddressModal(true);
  };




  const handleConfirmModalSelection = () => {
    if (!modalSelectedAddress) {
      alert("Please select an address to proceed!");
      return;
    }
    const selected = addresses.find(addr => addr._id === modalSelectedAddress);
    if (selected) {
      setSelectedAddress(selected);
    }
    setShowAddressModal(false);
  };

  
  const handleConfirmOrder = async () => {
    if (!selectedAddress || Object.keys(selectedAddress).length === 0) {
      alert("Please select a delivery address first!");
      return;
    }
  
    setLoading(true);
  
    const groupedOrders = [];
  
    storedSelections.forEach((box) => {
      const existing = groupedOrders.find(
        (item) =>
          item.boxName === box.selectedGiftBox.title &&
          item.boxSize === box.selectedGiftBox.size &&
          item.quantity === box.quantity
      );
  
      const sweets = box.selectedSweets.map((sweet) => ({
        productName: sweet.name,
        productPrice: sweet.price,
      }));
  
      if (existing) {
        existing.sweets.push(...sweets);
        existing.totalCost += sweets.reduce((acc, curr) => acc + curr.productPrice * box.quantity, 0);
      } else {
        groupedOrders.push({
          boxName: box.selectedGiftBox.title,
          boxSize: box.selectedGiftBox.size,
          sweets: sweets,
          quantity: box.quantity,
          totalCost: sweets.reduce((acc, curr) => acc + curr.productPrice * box.quantity, 0),
          address: {
            province: selectedAddress.province,
            city: selectedAddress.city,
            area: selectedAddress.area,
            landmark: selectedAddress.landmark,
          },
          customMessage: customMessage || "",
        });
      }
    });
  
    const requestData = {
      orders: groupedOrders,
      totalCost: basketTotal,
      address: {
        province: selectedAddress.province,
        city: selectedAddress.city,
        area: selectedAddress.area,
        landmark: selectedAddress.landmark,
      },
 
    };
  
    console.log("Final Query Data:", requestData);
  
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("You must be logged in to confirm the order.");
        setLoading(false);
        return;
      }
  
      const response = await axios.post(
        `${BASE_URL}/api/giftBoxOrderQueries`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.data.success) {
        alert(response.data.message || "Order confirmed successfully!");
      
        // ✅ Remove stored selections from localStorage after order confirmation
        
      } else {
        alert(response.data.message || "Failed to confirm order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error.message || error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    localStorage.removeItem("giftBoxSelections");
    orderConfirmed();
   

  };
  
  

  if (!storedSelections || storedSelections.length === 0) {
    return (
      <div className={styles.emptyScreen}>
        <div className={styles.container}>
          <h2>No Bulk Order Selected</h2>
          <p>Please go back and select a product before previewing your order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.previewScreen}>
      <div className={styles.container}>
        {/* <button className={styles.backButton} onClick={onBack}>
          &#8592; Back
        </button> */}
        <h2>Bulk Order Preview</h2>

        {storedSelections.map((box, index) => (
          <div key={index} className={styles.orderItem}>
            <h3>Box {index + 1}</h3>
            <div className={styles.giftCart}>
              <div className={styles.productCart}>
                {/* <div className={styles.productImage}>
                  <img
                    src={box.selectedGiftBox.selectedImage}
                    alt="Gift Box"
                  />
                </div> */}
                <div className={styles.productInfo}>
                  <div className={styles.productName}>
                    {box.selectedGiftBox.title}
                  </div>
                  <p className={styles.productQuantity}>
                    Size: {box.selectedGiftBox.size}
                  </p>
                  <p className={styles.productQuantity}>
                    Quantity: {box.quantity}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.selectedSweets}>
              <h4>Selected Sweets:</h4>
              <ul>
                {box.selectedSweets.map((sweet, idx) => (
                  <li key={idx}>
                    {sweet.name} - ₹{sweet.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className={styles.addressSection}>
          <h3>Delivery Address</h3>
          {selectedAddress ? (
            <div>
              <p>
                {selectedAddress.province}
                {selectedAddress.province && selectedAddress.city ? ", " : ""}
                {selectedAddress.city}
              </p>
              <p>
                {selectedAddress.area}
                {selectedAddress.area && selectedAddress.landmark ? ", " : ""}
                {selectedAddress.landmark}
              </p>
              <button onClick={handleOpenAddressModal}>Change Address</button>
            </div>
          ) : (
            <div>
              <p>No address selected.</p>
              <button onClick={handleOpenAddressModal}>Select Address</button>
            </div>
          )}
        </div>
        <h3>Custom Message</h3>
          <p>{customMessage || "No custom message provided."}</p>

       

        <div className={styles.confirmOrderWrapper}>
          <p className={styles.productTotalPrice}>Total: ₹{basketTotal}</p>
          <button
            className={styles.confirmOrderButton}
            onClick={handleConfirmOrder}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm and Save"}
          </button>
        </div>
      </div>

      {showAddressModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Select Address</h2>
            {addresses.length === 0 ? (
              <p>Please first add your Address in Profile Section</p>
            ) : (
              <div className={styles.addressList}>
                {addresses.map((address) => (
                  <div key={address._id} className={styles.addressItem}>
                    <input
                      type="radio"
                      id={address._id}
                      name="selectedAddress"
                      value={address._id}
                      checked={modalSelectedAddress === address._id}
                      onChange={() => setModalSelectedAddress(address._id)}
                    />
                    <label htmlFor={address._id}>
                      <p>{`${address.province}, ${address.city}`}</p>
                      <p>{`${address.area}, ${address.landmark}`}</p>
                    </label>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowAddressModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModalSelection}
                className={styles.confirmButton}
              >
                Confirm Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;

