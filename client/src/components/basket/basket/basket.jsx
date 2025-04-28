



//17-3-25
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./basket.module.css";
import AboveHeader from "../../../components/above_header/above_header";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import Basket from "./basketLeftSec/basketLeftSec";
import BasketRight from "./basketRhtSec/basketRhtSec";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchCartItems();

  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cart", {
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

  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/addresses", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //       },
  //     });

  //     if (response.data.success) {
  //       setAddresses(response.data.data);
  //     } else {
  //       console.error("Failed to fetch addresses");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching addresses:", error.message || error);
  //   }
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





// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import styles from "./basket.module.css";
// import AboveHeader from "../../../components/above_header/above_header";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";
// import Basket from "./basketLeftSec/basketLeftSec";
// import OrderSummary from "./basketRhtSec/basketRhtSec"; // Adjust import path accordingly

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);


//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/cart', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
//         }
//       });

//       if (response.data) {
//         setCartItems(response.data);
//       } else {
//         console.error('Response does not contain data');
//       }
//     } catch (error) {
//       console.error('Error fetching cart items:', error.message || error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//       } else if (error.request) {
//         console.error('Request data:', error.request);
//       }
//     }
//   };

//   const updateCartItems = async (updatedCartItems) => {
//     setCartItems(updatedCartItems);
//     try {
//       await axios.put(`http://localhost:8080/api/cart`, { cartItems: updatedCartItems }, {
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
//         }
//       });
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//       } else if (error.request) {
//         console.error('Request data:', error.request);
//       }
//     }
//   };

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       <div className={styles.container}>
//         <div className={styles.leftSection}>
//           <Basket cartItems={cartItems} updateCartItems={updateCartItems} />
//         </div>
//         <div className={styles.rightSection}>
//           <OrderSummary cartItems={cartItems} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cart;


