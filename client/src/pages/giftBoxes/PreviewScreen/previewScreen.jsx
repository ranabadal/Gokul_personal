import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./previewScreen.module.css";
import Header from "../../../components/header/header";
import AboveHeader from "../../../components/above_header/above_header";
import Footer from "../../../components/footer/footer";

const PreviewScreen = ({
  name,
  image,
  size,
  selectedQuantity,
  basketTotal,
  onBack,
}) => {
  const [basket, setBasket] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [modalSelectedAddress, setModalSelectedAddress] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);

    const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    setSelectedAddress(storedAddress);
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.log("No JWT token found.");
        return;
      }
      const response = await axios.get("http://localhost:8080/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      } else {
        console.error("Failed to fetch addresses.");
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
    const selected = addresses.find(
      (addr) => addr._id === modalSelectedAddress
    );
    if (selected) {
      setSelectedAddress(selected);
    }
    setShowAddressModal(false);
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address first!");
      return;
    }

    const requestData = {
      boxName: name,
      boxSize: size,
      products: basket.map((item) => ({
        productName: item.productId.name,
        productPrice: item.productId.price,
        quantity: selectedQuantity,
      })),
      totalCost: basketTotal,
      address: {
        province: selectedAddress.province,
        city: selectedAddress.city,
        area: selectedAddress.area,
        landmark: selectedAddress.landmark,
      },
      userEmail: localStorage.getItem('userEmail'),
    };

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("You must be logged in to confirm the order.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/giftBoxOrderQueries",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message || "Order confirmed successfully!");
      } else {
        alert(response.data.message || "Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error.message || error);
      alert("An error occurred while confirming the order. Please try again later.");
    }

    navigate("/giftbox");
    localStorage.removeItem("basket");
    
  };

  if (basket.length === 0) {
    return (
      <div className={styles.emptyScreen}>
        <AboveHeader />
        <Header />
        <div className={styles.container}>
          <h2>No Gift Box Order Selected</h2>
          <p>Please go back and select a product before previewing your order.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.previewScreen}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={onBack}>
          &#8592; Back
        </button>

        <h2>Gift Box Order Preview</h2>
        <div className={styles.previewContent}>
          {/* Selected Gift Cart Section */}
          <div>Selected Box</div>
          <div className={styles.giftCart}>
            <div className={styles.productCart}>
              <div className={styles.productImage}>
                <img src={image} alt={"image"} />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{name}</div>
                <p className={styles.productQuantity}>Size: {size}</p>
              </div>
            </div>
          </div>

          {/* Selected Products Section */}
          <div>Selected Products</div>
          {basket.map((orderItem) => {
            const product = orderItem.productId;
            return (
              <div key={product._id} className={styles.productCart}>
                <div className={styles.productImage}>
                  <img
                    src={`data:${product.image.contentType};base64,${product.image.data}`}
                    alt={product.name}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.name}</div>
                  <p className={styles.productPrice}>₹{product.price}</p>
                  <p className={styles.productQuantity}>
                    Quantity: {selectedQuantity}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Delivery Address Section */}
          {/* <div className={styles.addressSection}>
            <h3>Delivery Address</h3>
            {selectedAddress ? (
              <div>
                <p>
                  {selectedAddress.province}, {selectedAddress.city}
                </p>
                <p>
                  {selectedAddress.area}, {selectedAddress.landmark}
                </p>
                <button onClick={handleOpenAddressModal}>Change Address</button>
              </div>
            ) : (
              <div>
                <p>No address selected.</p>
                <button onClick={handleOpenAddressModal}>Select Address</button>
              </div>
            )}
          </div> */}
          <div className={styles.addressSection}>
  <h3>Delivery Address</h3>
  {selectedAddress ? (
    <div>
      <p>
        {selectedAddress.province || ''}{selectedAddress.province && selectedAddress.city ? ', ' : ''}{selectedAddress.city || ''}
      </p>
      <p>
        {selectedAddress.area || ''}{selectedAddress.area && selectedAddress.landmark ? ', ' : ''}{selectedAddress.landmark || ''}
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
        </div>

        <div className={styles.confirmOrderWrapper}>
          <p className={styles.productTotalPrice}>Total: ₹{basketTotal}</p>
          <button
            className={styles.confirmOrderButton}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>

      {showAddressModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Select Address</h2>
            {addresses.length === 0 ? (
               <div>
               <p>Please first add your Address in the Profile Page</p>
               <p 
                 className={styles.navigateLink} 
                 onClick={() => navigate("/profile")} 
                 style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
               >
                 Click Me!! to go to Profile Page
               </p>
             </div>
           
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