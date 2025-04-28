// import React, { useEffect, useState } from "react";
// import styles from "./bulkOrderCartLeft.module.css";
// import axios from "axios";
// // import star from "./imgs/star.svg";
// // import heart from "./imgs/wishlist.svg";
// import { useToaster } from '../../../../utils';
// import AboveHeader from '../../../../components/above_header/above_header';
// import Header from '../../../../components/header/header';
// import Footer from '../../../../components/footer/footer';
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, addToWishlist, isInBasket }) => {

//   return (
//     <div className={styles.card}>
//       <img
//         src={`data:${product.image.contentType};base64,${product.image.data}`}
//         alt={product.name}
//         className={styles.image}
//       />
//       <div className={styles.content}>
//         <div className={styles.content1}>
//           <h2 className={styles.title}>{product.name}</h2>
//           {/* <a href="#" onClick={(e) => { e.preventDefault(); addToWishlist(product._id); }}>
//             <img src={heart} alt="Wishlist" className={styles.heartIcon} />
//           </a> */}
//         </div>
//         {/* <div className={styles.ratingContainer}>
//           <span className={styles.rating}>
//             <img src={star} alt="Star" className={styles.starIcon} /> {product.rating}
//           </span>
//           <span className={styles.reviews}>({product.reviewCount} Reviews)</span>
//         </div> */}
//         <p className={styles.description}>{product.description}</p>
//         <div className={styles.footer}>
//           <span className={styles.price}>₹{product.price}</span>
//           <button
//             className={styles.button}
//             onClick={() => isInBasket ? removeFromCart(product._id) : addToCart(product._id)}
//           >
//             {isInBasket ? 'REMOVE' : 'ADD'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BulkOrderCartLeft = ({ filters }) => {
//   const [sweets, setSweets] = useState([]);
//   const [basket, setBasket] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true); // Add loading state

//   const setToast = useToaster();
//     const navigate = useNavigate();

//   // Load basket from localStorage on mount
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
//     setBasket(storedBasket);
//   }, []);

//   // Update localStorage whenever basket state changes
//   useEffect(() => {
//     localStorage.setItem('basket', JSON.stringify(basket));
//   }, [basket]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Set loading to true before fetching data
//       try {
//         const response = await axios.get("http://localhost:8080/api/products", { params: { ...filters, page, isTodaysDeal: false  } });
//         setSweets(response.data.products);
//         setLoading(false); // Set loading to false after fetching data
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false); // Set loading to false even if there's an error
//       }
//     };
//     fetchProducts();
//   }, [filters, page]);

//   const handleAddToCart = async (productId) => {
//     console.log('Product ID before sending:', typeof productId, productId); // Log the type and value

//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast('Please log in first!', 'error');
//         return;
//       }

//       // Ensure productId is a simple string and not an object
//       const flatProductId = (typeof productId === 'object' && productId._id) ? productId._id : productId;

//       const response = await fetch("http://localhost:8080/api/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           productId: flatProductId.toString(), // Ensure productId is a string
//           quantity: 1
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         setToast('Product added to cart successfully!', 'success');
//         setBasket([...basket, flatProductId]);
//       } else {
//         alert(`Error adding to cart: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setToast('An error occurred while adding the product to the cart.', 'error');
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast('Please log in first!', 'error');
//         return;
//       }

//       await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setBasket(basket.filter(id => id !== productId));
//       setToast('Product removed from cart successfully!', 'error');
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       setToast('An error occurred while removing the product to the cart.', 'error');
//     }
//   };

//   const handleAddToWishlist = async (productId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast('Please log in first!', 'error');
//         return;
//       }

//       const productIdStr = productId.toString(); // Ensure productId is a string

//       const response = await axios.post("http://localhost:8080/api/wishlist", { productId: productIdStr }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setToast('Product added to wishlist successfully!', 'success');
//       } else {
//         alert(`Error adding to wishlist: ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       setToast('An error occurred while adding the product to the wishlist.', 'error');
//     }
//   };

//   // Loader component
//   const Loader = () => (
//     <div className={styles.loaderOverlay}>
//       <div className={styles.loader}>
//         <p>Loading...</p>
//       </div>
//     </div>
//   );

//   const handleBackClick = () => {
//     navigate(-1); // Navigates to the previous page
// };

//   return (
//     <>

//        <button onClick={handleBackClick} className={styles.backButton}>
//                 &#8592; Back
//             </button>
//     <div className={styles.container}>
//       {loading && <Loader />} {/* Render the loader when loading is true */}
//       <div className={styles.header}>
//         <h1 className={styles.titleMain}>Select a Sweet</h1>
//         <p>Note : You can only select 1 items at a time for Bulk Order.</p>
//       </div>
//       <div className={styles.grid}>
//         {sweets.map((sweet) => (
//           <FestiveSweet
//             key={sweet._id}
//             product={sweet}
//             addToCart={handleAddToCart}
//             removeFromCart={handleRemoveFromCart}
//             // addToWishlist={handleAddToWishlist}
//             isInBasket={basket.includes(sweet._id)}
//           />
//         ))}
//       </div>
//       <div>
//         {!loading && (
//           <a href="#" onClick={() => setPage((prev) => prev + 1)}>
//             <p className={styles.viewMoreContainer}>View More</p>
//           </a>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default BulkOrderCartLeft;

// import React, { useEffect, useState } from "react";
// import styles from "./bulkOrderCartLeft.module.css";
// import axios from "axios";
// // import star from "./imgs/star.svg";
// // import heart from "./imgs/wishlist.svg";
// import { useToaster } from '../../../../utils';
// import AboveHeader from '../../../../components/above_header/above_header';
// import Header from '../../../../components/header/header';
// import Footer from '../../../../components/footer/footer';
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, addToWishlist, isInBasket }) => {

//   return (
//     <div className={styles.card}>
//       <img
//         src={`data:${product.image.contentType};base64,${product.image.data}`}
//         alt={product.name}
//         className={styles.image}
//       />
//       <div className={styles.content}>
//         <div className={styles.content1}>
//           <h2 className={styles.title}>{product.name}</h2>
//           {/* <a href="#" onClick={(e) => { e.preventDefault(); addToWishlist(product._id); }}>
//             <img src={heart} alt="Wishlist" className={styles.heartIcon} />
//           </a> */}
//         </div>
//         {/* <div className={styles.ratingContainer}>
//           <span className={styles.rating}>
//             <img src={star} alt="Star" className={styles.starIcon} /> {product.rating}
//           </span>
//           <span className={styles.reviews}>({product.reviewCount} Reviews)</span>
//         </div> */}
//         <p className={styles.description}>{product.description}</p>
//         <div className={styles.footer}>
//           <span className={styles.price}>₹{product.price}</span>
//           <button
//             className={styles.button}
//             onClick={() => isInBasket ? removeFromCart(product._id) : addToCart(product._id)}
//           >
//             {isInBasket ? 'REMOVE' : 'ADD'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BulkOrderCartLeft = ({ filters }) => {
//   const [sweets, setSweets] = useState([]);
//   const [basket, setBasket] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true); // Add loading state

//   const setToast = useToaster();
//     const navigate = useNavigate();

//   // Load basket from localStorage on mount
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
//     setBasket(storedBasket);
//   }, []);

//   // Update localStorage whenever basket state changes
//   useEffect(() => {
//     localStorage.setItem('basket', JSON.stringify(basket));
//   }, [basket]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Set loading to true before fetching data
//       try {
//         const response = await axios.get("http://localhost:8080/api/products", { params: { ...filters, page, isTodaysDeal: false  } });
//         setSweets(response.data.products);
//         setLoading(false); // Set loading to false after fetching data
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false); // Set loading to false even if there's an error
//       }
//     };
//     fetchProducts();
//   }, [filters, page]);

//     // Loader component
//   const Loader = () => (
//     <div className={styles.loaderOverlay}>
//       <div className={styles.loader}>
//         <p>Loading...</p>
//       </div>
//     </div>
//   );

//   const handleBackClick = () => {
//     navigate(-1); // Navigates to the previous page
// };

//   return (
//     <>

//        <button onClick={handleBackClick} className={styles.backButton}>
//                 &#8592; Back
//             </button>
//     <div className={styles.container}>
//       {loading && <Loader />} {/* Render the loader when loading is true */}
//       <div className={styles.header}>
//         <h1 className={styles.titleMain}>Select a Sweet</h1>
//         <p>Note : You can only select 1 items at a time for Bulk Order.</p>
//       </div>
//       <div className={styles.grid}>
//         {sweets.map((sweet) => (
//           <FestiveSweet
//             key={sweet._id}
//             product={sweet}

//             // addToWishlist={handleAddToWishlist}
//             isInBasket={basket.includes(sweet._id)}
//           />
//         ))}
//       </div>
//       <div>
//         {!loading && (
//           <a href="#" onClick={() => setPage((prev) => prev + 1)}>
//             <p className={styles.viewMoreContainer}>View More</p>
//           </a>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default BulkOrderCartLeft;

// import React, { useEffect, useState } from "react";
// import styles from "./bulkOrderCartLeft.module.css";
// import axios from "axios";
// import { useToaster } from '../../../../utils';
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, isInBasket }) => {
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
//               isInBasket ? removeFromCart(product._id) : addToCart(product._id)
//             }
//           >
//             {isInBasket ? "REMOVE" : "ADD"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BulkOrderCartLeft = ({ filters }) => {
//   const [sweets, setSweets] = useState([]);
//   const [basket, setBasket] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true); // Loading state

//   const setToast = useToaster();
//   const navigate = useNavigate();

//   // Load basket from localStorage on mount
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   // Update localStorage whenever basket state changes
//   useEffect(() => {
//     localStorage.setItem("basket", JSON.stringify(basket));
//   }, [basket]);

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Start loader
//       try {
//         const response = await axios.get("http://localhost:8080/api/products", {
//           params: { ...filters, page, isTodaysDeal: false },
//         });
//         setSweets((prevSweets) => [...prevSweets, ...response.data.products]);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setToast("Failed to load products. Please try again.", "error");
//       } finally {
//         setLoading(false); // Stop loader
//       }
//     };
//     fetchProducts();
//   }, [filters, page]);

//   const addToCart = (id) => {
//     if (basket.length > 0) {
//       setToast("You can only select one item for a bulk order.", "error");
//       return;
//     }
//     setBasket((prevBasket) => [...prevBasket, id]);
//   };

//   const removeFromCart = (id) => {
//     setBasket((prevBasket) => prevBasket.filter((item) => item !== id));
//   };

//   const handleBackClick = () => {
//     navigate(-1); // Navigate to the previous page
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
//           <p>Note: You can only select one item at a time for a Bulk Order.</p>
//         </div>
//         <div className={styles.grid}>
//           {sweets.map((sweet) => (
//             <FestiveSweet
//               key={sweet._id}
//               product={sweet}
//               addToCart={addToCart}
//               removeFromCart={removeFromCart}
//               isInBasket={basket.includes(sweet._id)}
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

// export default BulkOrderCartLeft;

// bulkOrderCartLeft.jsx

// import React, { useEffect, useState } from "react";
// import styles from "./bulkOrderCartLeft.module.css";
// import axios from "axios";
// import { useToaster } from "../../../../utils";
// import { useNavigate } from "react-router-dom";

// const FestiveSweet = ({ product, addToCart, removeFromCart, basket }) => {
//   // Determine if the product is in the basket already
//   const isInBasket = basket.some((item) => item.productId._id === product._id);

//   return (
//     <div className={styles.card}>
//      <img
//       src={product.image && product.image.contentType && product.image.data
//         ? `data:${product.image.contentType};base64,${product.image.data}`
//         : product.image}
//       alt={product.name}
//       className={styles.image}
//     />
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

// const BulkOrderCartLeft = ({ filters, basket, addToCart, removeFromCart }) => {
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
//           params: { ...filters, page, isTodaysDeal: false }
//         });

//         // Apply category filtering manually (if API does not support it)
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
//           <p>Note: You can only select one item at a time for a Bulk Order.</p>
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

// export default BulkOrderCartLeft;

import React, { useEffect, useState } from "react";
import styles from "../../../giftBoxes/giftBoxCart/giftBoxCartLeft/giftBoxCartLeft.module.css";
import axios from "axios";
import { useToaster } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../giftBoxes/giftBoxCart/giftBoxCartLeft/Assets/backIcon.svg";

// Helper to determine the sweets limit based on box size.
const getSweetsLimit = (size) => {
  // For example, a mapping could be:
  // "500 gm" => 3 sweets, "1 Kg" => 5 sweets, "2 Kg" => 8 sweets.
  const mapping = {
    "500 gm": 2,
    "1 kg": 2, // Note: Changed to lowercase to match your filter in GiftBoxes component
    "2 kg": 6, // Note: Changed to lowercase to match your filter in GiftBoxes component
  };
  return mapping[size] || 5;
};
const FestiveSweet = ({ product, addToCart, removeFromCart, basket = [] }) => {
  // Check if the sweet is already selected
  const isInBasket = basket.some((item) => item._id === product._id);

  return (
    <div className={styles.card}>
      <img
        src={
          product.image?.contentType && product.image?.data
            ? `data:${product.image.contentType};base64,${product.image.data}`
            : product.image
        }
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
            onClick={
              () =>
                isInBasket
                  ? removeFromCart(product._id) // Remove only this sweet
                  : addToCart(product) // Add only this sweet
            }
          >
            {isInBasket ? "REMOVE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

const GiftBoxCartLeft = ({
  customMessage,
  setCustomMessage,
  setStoredSelections,
  selectedGiftBox,
  setselectedQuantity,
  selectedQuantity,
  refreshSummaryForm = false,
  setRefreshSummaryForm,
  onFinalize, // Callback when user clicks "Add"
  onBack, // Callback when user clicks "Back"
}) => {
  const [sweets, setSweets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Sweets");
  const [loading, setLoading] = useState(true);
  // Local state to hold the user's selection for sweets.
  const [selectedSweets, setSelectedSweets] = useState([]);
  const [showTextarea, setShowTextarea] = useState(false);
  
  // const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const setToast = useToaster();
  const navigate = useNavigate();

  // Make sure selectedGiftBox exists and has necessary properties
  if (!selectedGiftBox || !selectedGiftBox.title || !selectedGiftBox.size) {
    console.error("Missing or invalid selectedGiftBox prop:", selectedGiftBox);
    // You might want to handle this case more gracefully
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/products");

        const filteredProducts =
          response.data?.products?.filter(
            (products) =>
              products?.category ===
              (selectedCategory === "Sweets" ? "Sweets" : "Restaurant")
          ) || [];

        setSweets(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setToast("Failed to load products. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Add `selectedCategory` as a dependency so it updates dynamically

  useEffect(() => {
    const editingIndex = localStorage.getItem("editingBoxIndex");
    if (editingIndex !== null) {
      const selections =
        JSON.parse(localStorage.getItem("bulkOrderSelections")) || [];
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        setSelectedSweets(selections[index].selectedSweets);
      }
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    setSelectedSweets((prev) => {
      const updatedSweets = prev.filter((p) => p._id !== productId);

      // Update local storage
      const selections =
        JSON.parse(localStorage.getItem("bulkOrderSelections")) || [];
      const editingIndex = localStorage.getItem("editingBoxIndex");
      if (editingIndex !== null) {
        const index = parseInt(editingIndex, 10);
        if (!isNaN(index) && index >= 0 && index < selections.length) {
          selections[index].selectedSweets = updatedSweets;
          localStorage.setItem("bulkOrderSelections", JSON.stringify(selections));
        }
      }

      return updatedSweets;
    });
  };

  const handleAddToCart = (product) => {
    setSelectedSweets((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev; // Prevent duplicates

      return [...prev, product]; // ✅ Append but don't update GiftBoxCartRight yet
    });
  };

  const handleFinalizeSelection = () => {
    const sweetsLimit = getSweetsLimit(selectedGiftBox.size);

    if (selectedSweets.length > sweetsLimit) {
      setToast(`You can only select up to ${sweetsLimit} sweets.`, "error");
      return;
    }

    if (selectedSweets.length === 0) {
      setToast("Please select at least one sweet.", "error");
      return;
    }

    let selections = JSON.parse(localStorage.getItem("bulkOrderSelections")) || [];
    const editingIndex = localStorage.getItem("editingBoxIndex");

    if (editingIndex !== null && selections.length > 0) {
      const index = parseInt(editingIndex, 10);
      if (!isNaN(index) && index >= 0 && index < selections.length) {
        const existingSweets = selections[index].selectedSweets;

        // ✅ Ensure sweets are merged correctly without duplicates
        const mergedSweets = [...existingSweets, ...selectedSweets].filter(
          (sweet, idx, self) => self.findIndex((s) => s._id === sweet._id) === idx
        );

        selections[index].selectedSweets = mergedSweets;
        selections[index].quantity = selectedQuantity; // ✅ Update quantity when editing
        localStorage.removeItem("editingBoxIndex"); // Clear editing mode after update
      }
    } else {
      selections.push({
        selectedGiftBox: {
          title: selectedGiftBox.title,
          size: selectedGiftBox.size,
          price: selectedGiftBox.price,
        },
        selectedSweets: selectedSweets.map((sweet) => ({
          _id: sweet._id, // ✅ Ensure _id is used to track duplicates
          name: sweet.name,
          price: sweet.price,
        })),
        quantity: selectedQuantity, // ✅ Store new quantity
      });
    }

    localStorage.setItem("bulkOrderSelections", JSON.stringify(selections));

    // ✅ Update UI immediately
    setStoredSelections([...selections]);
    setRefreshSummaryForm(true);

    console.log("Updated gift box selections:", selections);
    onBack();
};

  // Safe guard for when selectedGiftBox is not available yet
  if (!selectedGiftBox) {
    return <div className={styles.loading}>Loading gift box details...</div>;
  }

  return (
    <div className={styles.giftBoxCartLeft}>
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        <div className={styles.header}>
          <div className={styles.backButton}>
            <img src={backIcon} alt="back" className={styles.backIcon} />
            <button
              className={styles.back}
              onClick={onBack || (() => console.warn("onBack is not provided"))}
            >
              Back
            </button>
          </div>

          <div className={styles.notes}>
            <div className={styles.selectedBoxNameAndSize}>
              {selectedGiftBox
                ? `${selectedGiftBox.title} (${selectedGiftBox.size})`
                : "No box selected"}
            </div>
            <div className={styles.itemsLimit}>
              Note: You can select up to{" "}
              <strong>{getSweetsLimit(selectedGiftBox.size)}</strong> sweets.
            </div>
          </div>

          {/* Filter Section */}
          <div className={styles.filterWrapper}>
            <span
              className={
                selectedCategory === "Sweets"
                  ? styles.activeFilter
                  : styles.filter
              }
              onClick={() => setSelectedCategory("Sweets")}
            >
              Sweets
            </span>
            <span
              className={
                selectedCategory === "Snacks"
                  ? styles.activeFilter
                  : styles.filter
              }
              onClick={() => setSelectedCategory("Snacks")}
            >
              Snacks
            </span>
          </div>
        </div>
        <div className={styles.grid}>
          {sweets.map((sweet) => (
            <FestiveSweet
              key={sweet._id}
              product={sweet}
              // Use local selectedSweets for display.
              basket={selectedSweets}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
        {/* "View More" button for pagination if needed */}
        {!loading && sweets.length > 0 && (
          <p
            className={styles.viewMoreContainer}
            onClick={() => {
              // Increase page and fetch more sweets accordingly.
              console.log("View more clicked - Implement pagination here");
            }}
          >
            View More
          </p>
        )}

        {/* Show a message if no sweets are found */}
        {!loading && sweets.length === 0 && (
          <p className={styles.noItems}>No sweets available</p>
        )}

        <div className={styles.quantityWrapper}>
          <div>Select the Quantity:</div>
          <input
            type="number"
            min="1"
            max="500"
            defaultValue="1"
            className={styles.quantityInput}
            value={selectedQuantity}
            onChange={
              (e) => {
                setselectedQuantity(Number(e.target.value));
              }
            }
          />
        </div>



  <div>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        onChange={(e) => setShowTextarea(e.target.checked)}
      />
      Do you want to customize a Gift Box for your loved ones?
    </label>

    {showTextarea && (
      <div>
        <div className={styles.textareaLabel}>Write your message here:</div>
        <textarea
          className={styles.textarea}
          rows="4"
          cols="50"
          placeholder="Type your message here..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
        ></textarea>
      </div>
    )}
  </div>

        <div className={styles.addButton}>
          <button
            className={styles.add}
            onClick={handleFinalizeSelection}
            disabled={selectedSweets.length === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxCartLeft;
