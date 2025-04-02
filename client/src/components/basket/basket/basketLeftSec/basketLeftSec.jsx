// import React, { useState } from "react";
// import styles from "./basketLeftSec.module.css";
// import deleteIcon from "./Assets/deleteIcon.svg";
// import productImage from "./Assets/productImage.svg";
// import star from "./Assets/Star.svg";
// import Button from "../../../../components/button/button";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: "Dosa Sambar", price: 111, rating: 4.8, count: 2, checked: true },
//     { id: 2, name: "Dosa Sambar", price: 111, rating: 4.8, count: 2, checked: true },
//     { id: 3, name: "Dosa Sambar", price: 925, rating: 4.8, count: 2, checked: false },
//   ]);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => (item.checked ? total + item.price * item.count : total), 0);
//   };

//   const handleIncrement = (id) => {
//     setCartItems(cartItems.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
//   };

//   const handleDecrement = (id) => {
//     setCartItems(cartItems.map(item => item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item));
//   };

//   const handleDelete = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const handleCheck = (id) => {
//     setCartItems(cartItems.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
//   };

//   return (
//     <div className={styles.cartContainer}>
//                 <h2 className={styles.cartTitle}>My Basket</h2>
//                 <p className={styles.cartTotal}>Basket Total: Rs. {calculateTotal()}</p>

//       <div className={styles.cartItems}>
//         {cartItems.map((item) => (
//           <div key={item.id} className={styles.cartItem}>
//             <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} className={styles.checkbox} />
//             <img src={productImage} alt={item.name} className={styles.productImage} />
//             <div className={styles.productDetails}>
//               <h3>{item.name}</h3>
//               <p className={styles.productPrice}>Rs. {item.price}</p>
//               <p className={styles.productRating}><img src={star} alt="rating" /> {item.rating} (1102 Reviews)</p>
//             </div>
//             <div className={styles.productActions}>
//               <button onClick={() => handleDecrement(item.id)} className={styles.quantityBtn}>-</button>
//               <div className={styles.productActionsnumb}><span className={styles.count}>{item.count}</span></div>
//               <button onClick={() => handleIncrement(item.id)} className={styles.quantityBtn}>+</button>
//               <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} onClick={() => handleDelete(item.id)} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cart;



// import React from "react";
// import styles from "./basketLeftSec.module.css";
// import deleteIcon from "./Assets/deleteIcon.svg";
// import star from "./Assets/Star.svg";
// import Button from "../../../../components/button/button";
// import axios from 'axios';

// const Cart = ({ cartItems, updateCartItems }) => {
//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (total, item) =>
//         item.checked ? total + item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price * item.quantity : total,
//       0
//     );
//   };

//   console.log(cartItems);
//   const handleIncrement = (id) => {
//     updateCartItems((prev) =>
//       prev.map((item) =>
//         item.productId._id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const handleDecrement = (id) => {
//     updateCartItems((prev) =>
//       prev.map((item) =>
//         item.productId._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDelete = async (id) => {
//     try {
//       updateCartItems((prev) =>
//         prev.filter((item) => item.productId._id !== id)
//       );
    
  
//       await axios.delete(`http://localhost:8080/api/cart/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
//         }
//       });
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   const handleCheck = (id) => {
//     updateCartItems((prev) =>
//       prev.map((item) =>
//         item.productId._id === id ? { ...item, checked: !item.checked } : item
//       )
//     );
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.cartTitle}>My Basket</h2>
//       <p className={styles.cartTotal}>Basket Total: ₹{calculateTotal()}</p>

//       <div className={styles.cartItems}>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cartItems.map(
//             (item) =>
//               item.productId ? (
//                 <div key={item.productId._id} className={styles.cartItem}>
//                   <input
//                     type="checkbox"
//                     checked={item.checked || false}
//                     onChange={() => handleCheck(item.productId._id)}
//                     className={styles.checkbox}
//                   />
//                   <img
//                     src={`data:${item.productId.image.contentType};base64,${item.productId.image.data}`}
//                     alt={item.productId.name}
//                     className={styles.productImage}
//                   />
//                   <div className={styles.productDetails}>
//                     <h3>{item.productId.name}</h3>
//                     <p className={styles.productPrice}>
//                       ₹{item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price}
//                     </p>
//                     <p className={styles.productRating}>
//                       <img src={star} alt="rating" /> {item.productId.rating}{" "}
//                       {'('}{item.productId.reviewCount}{')'}
//                     </p>
//                   </div>
//                   <div className={styles.productActions}>
//                     <button
//                       onClick={() => handleDecrement(item.productId._id)}
//                       className={styles.quantityBtn}
//                     >
//                       -
//                     </button>
//                     <div className={styles.productActionsnumb}>
//                       <span className={styles.count}>{item.quantity}</span>
//                     </div>
//                     <button
//                       onClick={() => handleIncrement(item.productId._id)}
//                       className={styles.quantityBtn}
//                     >
//                       +
//                     </button>
//                     <img
//                       src={deleteIcon}
//                       alt="Delete"
//                       className={styles.deleteIcon}
//                       onClick={() => handleDelete(item.productId._id)}
//                     />
//                   </div>
//                 </div>
//               ) : null // Skip rendering if productId is null
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;




import React from "react";
import styles from "./basketLeftSec.module.css";
import deleteIcon from "./Assets/deleteIcon.svg";
import star from "./Assets/Star.svg";
import axios from 'axios';

const Basket = ({ cartItems, updateCartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price;
      return item.checked ? total + price * item.quantity : total;
    }, 0);
  };
  

  const handleIncrement = async (id) => {
    const updatedCartItems = cartItems.map(item => item.productId._id === id ? { ...item, quantity: item.quantity + 1 } : item);
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(id, { quantity: updatedCartItems.find(item => item.productId._id === id).quantity });
  };

  const handleDecrement = async (id) => {
    const updatedCartItems = cartItems.map(item => item.productId._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(id, { quantity: updatedCartItems.find(item => item.productId._id === id).quantity });
  };

  const handleDelete = async (id) => {
    try {
      updateCartItems(prev => prev.filter(item => item.productId._id !== id));

      // Remove item from the backend/database
      await axios.delete(`http://localhost:8080/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheck = async (id) => {
    const updatedCartItems = cartItems.map(item => item.productId._id === id ? { ...item, checked: !item.checked } : item);
    updateCartItems(updatedCartItems);
    await updateCartItemInDB(id, { checked: updatedCartItems.find(item => item.productId._id === id).checked });
  };

  const updateCartItemInDB = async (productId, updateData) => {
    try {
      await axios.put(`http://localhost:8080/api/cart`, { productId, ...updateData }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>My Basket</h2>
      <p className={styles.cartTotal}>Basket Total: ₹{calculateTotal()}</p>

      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId._id} className={styles.cartItem}>
              <input type="checkbox" checked={item.checked || false} onChange={() => handleCheck(item.productId._id)} className={styles.checkbox} />
              <img src={`data:${item.productId.image.contentType};base64,${item.productId.image.data}`} alt={item.productId.name} className={styles.productImage} />
              <div className={styles.productDetails}>
                <h3>{item.productId.name}</h3>
                 <p className={styles.productPrice}>₹{item.productId.isTodaysDeal ? item.productId.discountPrice : item.productId.price}</p>
                    <p className={styles.productRating}>
<img src={star} alt="rating" /> {item.productId.rating}{" "}
{'('}{item.productId.reviewCount}{')'}
</p>
</div>
               <div className={styles.productActions}>
                 <button onClick={() => handleDecrement(item.productId._id)} className={styles.quantityBtn}>-</button>
                 <div className={styles.productActionsnumb}><span className={styles.count}>{item.quantity}</span></div>
                 <button onClick={() => handleIncrement(item.productId._id)} className={styles.quantityBtn}>+</button>
                 <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} onClick={() => handleDelete(item.productId._id)} />
               </div>
             </div>
          ))
        )}
      </div>
    </div>
  );
};

 export default Basket;
