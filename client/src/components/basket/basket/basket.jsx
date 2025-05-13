



//17-3-25
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./basket.module.css";
import AboveHeader from "../../../components/above_header/above_header";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import Basket from "./basketLeftSec/basketLeftSec";
import BasketRight from "./basketRhtSec/basketRhtSec";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchCartItems();

  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.data) {
        setCartItems(response.data);
      } else {
        console.error("Response does not contain data");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error.message || error);
    }
  };


  // };

  return (
    <>
      <AboveHeader />
      <Header />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Basket cartItems={cartItems} updateCartItems={setCartItems} />
        </div>
        <div className={styles.rightSection}>
  <BasketRight
  updateCartItems={setCartItems}
    cartItems={cartItems}
    addresses={addresses}
    showQuantityInput={false} // Do not show the quantity input in Basket page
  />
</div>

      </div>
      <Footer />
    </>
  );
};

export default Cart;


