// // import React, { useEffect, useState } from "react";
// // import styles from "./bulkOrderCart.module.css";
// // import axios from "axios";
// // import AboveHeader from '../../../components/above_header/above_header';
// // import Header from '../../../components/header/header';
// // import Footer from '../../../components/footer/footer';
// // import { useNavigate } from "react-router-dom";
// // import BulkOrderCartLeft from "./BulkOrderCartLeft/bulkOrderCartLeft";
// // import BasketRight from "../../../components/basket/basket/basketRhtSec/basketRhtSec";

// // const BulkOrderCart = () => {
// //   return (
// //     <>
// //     <AboveHeader />
// //     <Header />
// //     <div className={styles.container}>
// //       <div className={styles.leftSection}>
// //         <BulkOrderCartLeft/>
// //       </div>
// //       <div className={styles.rightSection}>
// // <BasketRight
// //   showQuantityInput={true} // Do not show the quantity input in Basket page
// // />
// // </div>

// //     </div>
// //     <Footer />
// //   </>
// //   )
// // }

// // export default BulkOrderCart

// // BulkOrderCart.jsx



// // import React, { useEffect, useState } from "react";
// // import styles from "./bulkOrderCart.module.css";
// // import AboveHeader from "../../../components/above_header/above_header";
// // import Header from "../../../components/header/header";
// // import Footer from "../../../components/footer/footer";
// // import { useNavigate } from "react-router-dom";
// // import BulkOrderCartLeft from "./BulkOrderCartLeft/bulkOrderCartLeft";
// // import BulkOrderCartRight from "../../../components/GiftBoxAndBulkOrderCartTotal/giftBoxAndBulkOrderCartTotal";
// // import axios from "axios";


// // const BulkOrderCart = () => {
// //   const [basket, setBasket] = useState([]);
// //  const [addresses, setAddresses] = useState([]);


// //    useEffect(() => {
  
// //      fetchAddresses();
// //    }, []);
// //   // Optionally, load basket from localStorage on mount
// //   useEffect(() => {
// //     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
// //     setBasket(storedBasket);
// //   }, []);

// //   // Sync basket state back to localStorage when it changes
// //   useEffect(() => {
// //     localStorage.setItem("basket", JSON.stringify(basket));
// //   }, [basket]);

// //   // Add a product to the basket. Note that for bulk orders you allow only one.
// //   const addToCart = (product) => {
// //     if (basket.length > 0) {
// //       alert("You can only select one item for a bulk order.");
// //       return;
// //     }
// //     // Structure the basket item as needed by BasketRight.
// //     const orderItem = { productId: product, quantity: 1, checked: true };
// //     setBasket([orderItem]);
// //   };

// //   const removeFromCart = (productId) => {
// //     const updatedBasket = basket.filter(
// //       (item) => item.productId._id !== productId
// //     );
// //     setBasket(updatedBasket);
// //   };


// //   const fetchAddresses = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:8080/addresses", {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
// //         },
// //       });

// //       if (response.data.success) {
// //         setAddresses(response.data.data);
// //       } else {
// //         console.error("Failed to fetch addresses");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching addresses:", error.message || error);
// //     }
// //   };
// //   return (
// //     <>
// //       <AboveHeader />
// //       <Header />
// //       <div className={styles.container}>
// //         <div className={styles.leftSection}>
// //           <BulkOrderCartLeft
// //             basket={basket}
// //             addToCart={addToCart}
// //             removeFromCart={removeFromCart}
// //           />
// //         </div>
// //         <div className={styles.rightSection}>
// //           {/* Pass the basket as "cartItems" for BasketRight */}
// //           <BulkOrderCartRight  cartItems={basket} showQuantityInput={true} />
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default BulkOrderCart;




// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./bulkOrderCart.module.css";
// import AboveHeader from "../../../components/above_header/above_header";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";
// import { useNavigate } from "react-router-dom";
// import BulkOrderCartLeft from "./BulkOrderCartLeft/bulkOrderCartLeft";
// import BulkOrderCartRight from "../../../components/GiftBoxAndBulkOrderCartTotal/giftBoxAndBulkOrderCartTotal";
// import axios from "axios";
// import PreviewScreen from "../PreviewScreen/previewScreen"

// const BulkOrderCart = () => {
//   const location = useLocation();
//   const { name, image, size } = location.state || {};
//   // Log to check if values are being received.

//   const [basket, setBasket] = useState([]);
//  const [addresses, setAddresses] = useState([]);
//  const [selectedQuantity, setSelectedQuantity] = useState(1);
//  const [selectedBasketTotal, setSelectedBasketTotal] = useState(0);
//  const [showPreview, setShowPreview] = useState(false);

 
   
//    useEffect(() => {
  
//      fetchAddresses();
//    }, []);
//   // Optionally, load basket from localStorage on mount
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   // Sync basket state back to localStorage when it changes
//   useEffect(() => {
//     localStorage.setItem("basket", JSON.stringify(basket));
//   }, [basket]);

//   // Add a product to the basket. Note that for bulk orders you allow only one.
//   const addToCart = (product) => {
//     if (basket.length > 0) {
//       alert("You can only select one item for a bulk order.");
//       return;
//     }
//     // Structure the basket item as needed by BasketRight.
//     const orderItem = { productId: product, quantity: 1, checked: true };
//     setBasket([orderItem]);
//   };

//   const removeFromCart = (productId) => {
//     const updatedBasket = basket.filter(
//       (item) => item.productId._id !== productId
//     );
//     setBasket(updatedBasket);
//   };

//   const handleBackClick = () => {
//     setShowPreview(false);
//   };

//   const handleCheckoutClick = ({ quantity, basketTotal }) => {
//     setSelectedQuantity(quantity);
//     setSelectedBasketTotal(basketTotal);
//     setShowPreview(true);
//   };




//   const fetchAddresses = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/addresses", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//         },
//       });

//       if (response.data.success) {
//         setAddresses(response.data.data);
//       } else {
//         console.error("Failed to fetch addresses");
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error.message || error);
//     }
//   };
//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       {!showPreview ? (
//       <div className={styles.container}>
//         <div className={styles.leftSection}>
//           <BulkOrderCartLeft
//             basket={basket}
//             addToCart={addToCart}
//             removeFromCart={removeFromCart}
//           />
//         </div>
//         <div className={styles.rightSection}>
//           {/* Pass the basket as "cartItems" for BasketRight */}
//           <BulkOrderCartRight  cartItems={basket} showQuantityInput={true} size={size} onCheckout={handleCheckoutClick}/>
//         </div>
//       </div>
//          ) : (
//           <PreviewScreen  
//           name={name}
//           image={image}
//           // selectedCartPrice={price}
//           size={size}
//           selectedQuantity={selectedQuantity}
//           basketTotal={selectedBasketTotal}
//  onBack={handleBackClick} />

//       )}
//       <Footer />
//     </>
//   );
// };

// export default BulkOrderCart;