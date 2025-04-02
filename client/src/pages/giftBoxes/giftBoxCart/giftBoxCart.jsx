
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../bulkOrders/bulkOrderCart/bulkOrderCart.module.css";
import AboveHeader from "../../../components/above_header/above_header";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import GiftBoxCartLeft from "../giftBoxCart/giftBoxCartLeft/giftBoxCartLeft";
import BulkOrderCartRight from "../../../components/GiftBoxAndBulkOrderCartTotal/giftBoxAndBulkOrderCartTotal";
import axios from "axios";
import PreviewScreen from "../PreviewScreen/previewScreen"

const GiftBoxCart = () => {
  const location = useLocation();
  const { name, image, size } = location.state || {};
  // Log to check if values are being received.

  const [basket, setBasket] = useState([]);
 const [addresses, setAddresses] = useState([]);
 const [selectedQuantity, setSelectedQuantity] = useState(1);
 const [selectedBasketTotal, setSelectedBasketTotal] = useState(0);
 const [showPreview, setShowPreview] = useState(false);

 
   
   useEffect(() => {
  
     fetchAddresses();
   }, []);
  // Optionally, load basket from localStorage on mount
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  // Sync basket state back to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Determine the maximum items allowed in the cart based on the size
  const getMaxItemsBySize = () => {
    switch (size) {
      case "500 gm":
        return 1;
      case "1 kg":
        return 2;
      case "2 kg":
        return 3;
      default:
        return Infinity; // No limit for unsupported sizes
    }
  };

  // Updated addToCart function with dynamic limit enforcement
  const addToCart = (product) => {
    const maxItems = getMaxItemsBySize();
    if (basket.length >= maxItems) {
      alert(`You can only select up to ${maxItems} items for a ${size} gift box.`);
      return;
    }
    const orderItem = { productId: product, quantity: 1, checked: true };
    setBasket((prevBasket) => [...prevBasket, orderItem]); // Add item to the basket
  };


  const removeFromCart = (productId) => {
    const updatedBasket = basket.filter(
      (item) => item.productId._id !== productId
    );
    setBasket(updatedBasket);
  };

  const handleBackClick = () => {
    setShowPreview(false);
  };

  const handleCheckoutClick = ({ quantity, basketTotal }) => {
    setSelectedQuantity(quantity);
    setSelectedBasketTotal(basketTotal);
    setShowPreview(true);
  };




  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/addresses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.data.success) {
        setAddresses(response.data.data);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };
  return (
    <>
      <AboveHeader />
      <Header />
      {!showPreview ? (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <GiftBoxCartLeft
          size={size}
            basket={basket}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
        <div className={styles.rightSection}>
          {/* Pass the basket as "cartItems" for BasketRight */}
          <BulkOrderCartRight  cartItems={basket} showQuantityInput={true} size={size} onCheckout={handleCheckoutClick}/>
        </div>
      </div>
         ) : (
          <PreviewScreen  
          name={name}
          image={image}
          // selectedCartPrice={price}
          size={size}
          selectedQuantity={selectedQuantity}
          basketTotal={selectedBasketTotal}
 onBack={handleBackClick} />

      )}
      <Footer />
    </>
  );
};

export default GiftBoxCart;