
// import React, { useEffect, useState } from "react";
// import styles from "./giftBoxCartLeft.module.css";
// import axios from "axios";
// import { useToaster } from "../../../../utils";
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, basket }) => {
//   // Determine if the product is in the basket already
//   const isInBasket = basket.some((item) => item.productId._id === product._id);

//   return (
//     <div className={styles.card}>
//       <img
//         src={`data:${product.image.contentType};base64,${product.image.data}`}
//         alt={product.name}
//         className={styles.image}
//       />
//       <div className={styles.content}>
//         <h2 className={styles.title}>{product.name}</h2>
//         <p className={styles.description}>{product.description}</p>
//         <div className={styles.footer}>
//           <span className={styles.price}>₹{product.price}</span>
//           <button
//             className={styles.button}
//             onClick={() =>
//               isInBasket
//                 ? removeFromCart(product._id)
//                 : addToCart(product)
//             }
//           >
//             {isInBasket ? "REMOVE" : "ADD"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GiftBoxCartLeft = ({ filters, basket, addToCart, removeFromCart ,size}) => {
//   const [sweets, setSweets] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const setToast = useToaster();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8080/api/products", {
//           params: { ...filters, page, isTodaysDeal: false },
//         });
//         setSweets((prevSweets) => [...prevSweets, ...response.data.products]);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setToast("Failed to load products. Please try again.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [filters, page, setToast]);

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const Loader = () => (
//     <div className={styles.loaderOverlay}>
//       <div className={styles.loader}>
//         <p>Loading...</p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <button onClick={handleBackClick} className={styles.backButton}>
//         &#8592; Back
//       </button>
//       <div className={styles.container}>
//         {loading && <Loader />}
//         <div className={styles.header}>
//           <h1 className={styles.titleMain}>Select a Sweet</h1>
//           <p>Note: You can only select one item at a time for a 500gm gift box Order.</p>
//         </div>
//         <div className={styles.grid}>
//           {sweets.map((sweet) => (
//             <FestiveSweet
//               key={sweet._id}
//               product={sweet}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//               basket={basket}
//             />
//           ))}
//         </div>
//         <div>
//           {!loading && sweets.length > 0 && (
//             <p
//               className={styles.viewMoreContainer}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               View More
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GiftBoxCartLeft;


import React, { useEffect, useState } from "react";
import styles from "./giftBoxCartLeft.module.css";
import axios from "axios";
import { useToaster } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const FestiveSweet = ({ product, addToCart, removeFromCart, basket }) => {
  // Determine if the product is in the basket already
  const isInBasket = basket.some((item) => item.productId._id === product._id);

  return (
    <div className={styles.card}>
    <img 
  src={product.image && product.image.contentType && product.image.data 
    ? `data:${product.image.contentType};base64,${product.image.data}` 
    : product.image}
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
                ? removeFromCart(product._id)
                : addToCart(product)
            }
          >
            {isInBasket ? "REMOVE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};


const GiftBoxCartLeft = ({ filters, basket, addToCart, removeFromCart, size }) => {
    const [sweets, setSweets] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const setToast = useToaster();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:8080/api/products", {
            params: { ...filters, page, isTodaysDeal: false }
          });
    
          // Apply category filtering manually (if API does not support it)
          const filteredSweets = response.data?.products?.filter(
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
    }, [filters, page, setToast]);


    const handleBackClick = () => {
      navigate(-1);
    };

    const handleAddAnotherBox = () => {
      navigate("/giftbox"); // Redirect to GiftBox Main Page
    };
  
    const getDynamicMessage = () => {
      switch (size) {
        case "500 gm":
          return "Note: You can only select one item at a time for a 500 gm gift box order.";
        case "1 kg":
          return "Note: You can select up to 2 sweets or items for a 1 kg gift box order.";
        case "2 kg":
          return "Note: You can select up to 3 sweets or items for a 2 kg gift box order.";
        default:
          return "Note: Please select the appropriate items based on the gift box size.";
      }
    };
  
    const getMaxItemsBySize = () => {
      switch (size) {
        case "500 gm":
          return 1;
        case "1 kg":
          return 2;
        case "2 kg":
          return 3;
        default:
          return Infinity; // Allow unlimited items for unsupported sizes.
      }
    };
  
    const enhancedAddToCart = (product) => {
      const maxItems = getMaxItemsBySize();
      if (basket.length >= maxItems) {
        setToast(`You can only select up to ${maxItems} items for a ${size} gift box.`, "error");
        return;
      }
      addToCart(product);
    };
  
    const Loader = () => (
      <div className={styles.loaderOverlay}>
        <div className={styles.loader}>
          <p>Loading...</p>
        </div>
      </div>
    );
  
    return (
      <>
        <button onClick={handleBackClick} className={styles.backButton}>
          &#8592; Back
        </button>

        <button onClick={handleAddAnotherBox} className={styles.addBoxButton}>
          ➕ Add Another Box
        </button>
        <div className={styles.container}>
          {loading && <Loader />}
          <div className={styles.header}>
            <h1 className={styles.titleMain}>Select a Sweet</h1>
            <p>{getDynamicMessage()}</p> {/* Dynamic message */}
          </div>
          <div className={styles.grid}>
            {sweets.map((sweet) => (
              <FestiveSweet
                key={sweet._id}
                product={sweet}
                addToCart={enhancedAddToCart} // Use the enhanced addToCart function
                removeFromCart={removeFromCart}
                basket={basket}
              />
            ))}
          </div>
          <div>
            {!loading && sweets.length > 0 && (
              <p
                className={styles.viewMoreContainer}
                onClick={() => setPage((prev) => prev + 1)}
              >
                View More
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

 export default GiftBoxCartLeft;


// import React, { useEffect, useState } from "react";
// import styles from "./giftBoxCartLeft.module.css";
// import axios from "axios";
// import { useToaster } from "../../../../utils";
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, basket }) => {
//   const isInBasket = basket.some((item) => item.productId._id === product._id);

//   return (
//     <div className={styles.card}>
//       <img
//         src={product.image?.contentType && product.image?.data
//           ? `data:${product.image.contentType};base64,${product.image.data}`
//           : product.image}
//         alt={product.name}
//         className={styles.image}
//       />
//       <div className={styles.content}>
//         <h2 className={styles.title}>{product.name}</h2>
//         <p className={styles.description}>{product.description}</p>
//         <div className={styles.footer}>
//           <span className={styles.price}>₹{product.price}</span>
//           <button
//             className={styles.button}
//             onClick={() => isInBasket ? removeFromCart(product._id) : addToCart(product)}
//           >
//             {isInBasket ? "REMOVE" : "ADD"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GiftBoxCartLeft = ({ basket, addToCart, removeFromCart, size }) => {
//   const [sweets, setSweets] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [previousBoxes, setPreviousBoxes] = useState([]);
//   const [expandedBoxIndex, setExpandedBoxIndex] = useState(null);
//   const setToast = useToaster();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8080/api/products");
//         const filteredSweets = response.data?.products?.filter(
//           (product) => product?.category?.toLowerCase() === "sweets"
//         ) || [];
//         setSweets(filteredSweets);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setToast("Failed to load products. Please try again.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//     const storedBoxes = JSON.parse(localStorage.getItem("selectedBoxes")) || [];
//     setPreviousBoxes(storedBoxes);
//   }, []);

//   const handleAddAnotherBox = () => {
//     const currentBox = {
//       size,
//       basket,
//     };
//     const updatedBoxes = [...previousBoxes, currentBox];
//     localStorage.setItem("selectedBoxes", JSON.stringify(updatedBoxes));
//     navigate("/giftbox"); // Redirect to GiftBox Main Page
//   };

//   const toggleBoxDetails = (index) => {
//     setExpandedBoxIndex(expandedBoxIndex === index ? null : index);
//   };

//   const handleRemoveBox = (index) => {
//     const updatedBoxes = previousBoxes.filter((_, i) => i !== index);
//     localStorage.setItem("selectedBoxes", JSON.stringify(updatedBoxes));
//     setPreviousBoxes(updatedBoxes);
//   };

//   return (
//     <>
//       <button onClick={handleAddAnotherBox} className={styles.addBoxButton}>
//         ➕ Add Another Box
//       </button>

//       {previousBoxes.length > 0 && (
//         <div className={styles.previousBoxesContainer}>
//           {previousBoxes.map((box, index) => (
//             <div key={index} className={styles.boxSummary}>
//               <div className={styles.boxHeader} onClick={() => toggleBoxDetails(index)}>
//                 <span>Box {index + 1} - {box.size} 📦</span>
//                 <button onClick={() => handleRemoveBox(index)}>❌ Remove</button>
//               </div>
//               {expandedBoxIndex === index && (
//                 <div className={styles.boxDetails}>
//                   {box.basket.map((item) => (
//                     <div key={item.productId._id} className={styles.sweetItem}>
//                       <span>{item.productId.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className={styles.container}>
//         {loading ? <p>Loading...</p> : null}
//         <div className={styles.header}>
//           <h1 className={styles.titleMain}>Select a Sweet</h1>
//           <p>Note: You can select items based on the box size ({size}).</p>
//         </div>
//         <div className={styles.grid}>
//           {sweets.map((sweet) => (
//             <FestiveSweet
//               key={sweet._id}
//               product={sweet}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//               basket={basket}
//             />
//           ))}
//         </div>
//         {!loading && sweets.length > 0 && (
//           <p className={styles.viewMoreContainer} onClick={() => setPage((prev) => prev + 1)}>View More</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default GiftBoxCartLeft;