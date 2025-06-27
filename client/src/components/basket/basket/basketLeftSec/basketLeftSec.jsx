


// import React, { useState, useEffect } from "react";
// import styles from "./basketLeftSec.module.css";
// import deleteIcon from "./Assets/deleteIcon.svg";
// import star from "./Assets/Star.svg";
// import axios from "axios";
// import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary

// const Basket = ({ cartItems, updateCartItems }) => {
//   console.log("Cart Items Data:", cartItems); // Debug received cartItems

//   // Calculate total price
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       if (!item.productId) return total; // Avoid error if productId is missing

//       const price = item.productId.isTodaysDeal
//         ? item.productId.discountPrice || item.productId.price // Fallback if discountPrice is undefined
//         : item.productId.price;

//       return item.checked ? total + price * item.quantity : total;
//     }, 0);
//   };

//   // Update cart item in the database
//   const updateCartItemInDB = async (productId, updateData) => {
//     try {
//       await axios.put(`${BASE_URL}/api/cart`, { productId, ...updateData }, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
//         }
//       });
//     } catch (error) {
//       console.error("Error updating cart item:", error);
//     }
//   };

//   // Handle Increment Quantity
//   const handleIncrement = async (id) => {
//     const updatedCartItems = cartItems.map(item =>
//       item.productId?._id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     updateCartItems(updatedCartItems);
//     await updateCartItemInDB(id, { quantity: updatedCartItems.find(item => item.productId?._id === id)?.quantity });
//   };

//   // Handle Decrement Quantity
//   const handleDecrement = async (id) => {
//     const updatedCartItems = cartItems.map(item =>
//       item.productId?._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//     );
//     updateCartItems(updatedCartItems);
//     await updateCartItemInDB(id, { quantity: updatedCartItems.find(item => item.productId?._id === id)?.quantity });
//   };

//   // Handle Delete Item
//   const handleDelete = async (id) => {
//     try {
//       updateCartItems(prev => prev.filter(item => item.productId?._id !== id));

//       // Remove item from backend/database
//       await axios.delete(`${BASE_URL}/api/cart/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
//         }
//       });
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Handle Checkbox Selection
//   const handleCheck = async (id) => {
//     const updatedCartItems = cartItems.map(item =>
//       item.productId?._id === id ? { ...item, checked: !item.checked } : item
//     );
//     updateCartItems(updatedCartItems);
//     await updateCartItemInDB(id, { checked: updatedCartItems.find(item => item.productId?._id === id)?.checked });
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.cartTitle}>My Basket</h2>
//       <p className={styles.cartTotal}>Basket Total: ₹{calculateTotal()}</p>

//       <div className={styles.cartItems}>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cartItems.map((item) => {
//             console.log("Item Data:", item.productId); // Debug each productId

//             return (
//               <div key={item.productId?._id} className={styles.cartItem}>
//                 <input
//                   type="checkbox"
//                   checked={item.checked || false}
//                   onChange={() => handleCheck(item.productId?._id)}
//                   className={styles.checkbox}
//                 />
                
//                 {/* Product Image */}
//                 <img
//                   src={item.productId?.image?.data
//                     ? `data:${item.productId.image.contentType};base64,${item.productId.image.data}`
//                     : item.productId?.image || "fallback-image-url.jpg"}
//                   alt={item.productId?.name || "Product Image"}
//                   className={styles.productImage}
//                 />
                
//                 <div className={styles.productDetails}>
//                   <h3>{item.productId?.name}</h3>
//                   <p className={styles.productPrice}>₹{item.productId?.isTodaysDeal ? item.productId?.discountPrice : item.productId?.price}</p>

//                   {/* Conditional Rating Display */}
//                   {item.productId?.rating > 0 && item.productId?.reviewCount > 0 && (
//                     <p className={styles.productRating}>
//                       <img src={star} alt="rating" /> {item.productId?.rating} {" "}
//                       ({item.productId?.reviewCount})
//                     </p>
//                   )}
//                 </div>

//                 <div className={styles.productActions}>
//                   <button onClick={() => handleDecrement(item.productId?._id)} className={styles.quantityBtn}>-</button>
//                   <div className={styles.productActionsnumb}><span className={styles.count}>{item.quantity}</span></div>
//                   <button onClick={() => handleIncrement(item.productId?._id)} className={styles.quantityBtn}>+</button>
//                   <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} onClick={() => handleDelete(item.productId?._id)} />
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default Basket;









import React, { useState, useEffect } from "react";
import styles from "./basketLeftSec.module.css";
import deleteIcon from "./Assets/deleteIcon.svg";
import star from "./Assets/Star.svg";
import axios from "axios";
import { BASE_URL } from "../../../../Const/Const"; // Adjust the import path as necessary

const Basket = ({ cartItems, updateCartItems }) => {
  console.log("Cart Items Data:", cartItems); // Debug received cartItems

  // Loader state added here (one-time, only on mount)
  const [loading, setLoading] = useState(true);

  // Only on mount, show loader for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust delay as necessary
    return () => clearTimeout(timer);
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item.productId) return total; // Avoid error if productId is missing

      const price = item.productId.isTodaysDeal
        ? item.productId.discountPrice || item.productId.price // Fallback if discountPrice is undefined
        : item.productId.price;

      return item.checked ? total + price * item.quantity : total;
    }, 0);
  };

  // Update cart item in the database
  const updateCartItemInDB = async (productId, updateData) => {
    try {
      await axios.put(
        `${BASE_URL}/api/cart`,
        { productId, ...updateData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Handle Increment Quantity
  const handleIncrement = async (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId?._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(
      id,
      { quantity: updatedCartItems.find((item) => item.productId?._id === id)?.quantity }
    );
  };

  // Handle Decrement Quantity
  const handleDecrement = async (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId?._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(
      id,
      { quantity: updatedCartItems.find((item) => item.productId?._id === id)?.quantity }
    );
  };

  // Handle Delete Item
  const handleDelete = async (id) => {
    try {
      updateCartItems((prev) => prev.filter((item) => item.productId?._id !== id));

      // Remove item from backend/database
      await axios.delete(`${BASE_URL}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Handle Checkbox Selection
  const handleCheck = async (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId?._id === id ? { ...item, checked: !item.checked } : item
    );
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(
      id,
      { checked: updatedCartItems.find((item) => item.productId?._id === id)?.checked }
    );
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>My Basket</h2>
      <p className={styles.cartTotal}>Basket Total: ₹{calculateTotal()}</p>

      <div className={styles.cartItems}>
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            console.log("Item Data:", item.productId); // Debug each productId

            return (
              <div key={item.productId?._id} className={styles.cartItem}>
                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={() => handleCheck(item.productId?._id)}
                  className={styles.checkbox}
                />

                {/* Product Image */}
                <img
               src={
  item.productId?.image?.url
    ? item.productId.image.url
    : "fallback-image-url.jpg"
}
                  alt={item.productId?.name || "Product Image"}
                  className={styles.productImage}
                />

                <div className={styles.productDetails}>
                  <h3>{item.productId?.name}</h3>
                  <p className={styles.productPrice}>
                    ₹
                    {item.productId?.isTodaysDeal
                      ? item.productId?.discountPrice
                      : item.productId?.price}
                  </p>

                  {/* Conditional Rating Display */}
                  {item.productId?.rating > 0 && item.productId?.reviewCount > 0 && (
                    <p className={styles.productRating}>
                      <img src={star} alt="rating" /> {item.productId?.rating}{" "}
                      ({item.productId?.reviewCount})
                    </p>
                  )}
                </div>

                <div className={styles.productActions}>
                  <button
                    onClick={() => handleDecrement(item.productId?._id)}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <div className={styles.productActionsnumb}>
                    <span className={styles.count}>{item.quantity}</span>
                  </div>
                  <button
                    onClick={() => handleIncrement(item.productId?._id)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className={styles.deleteIcon}
                    onClick={() => handleDelete(item.productId?._id)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Basket;