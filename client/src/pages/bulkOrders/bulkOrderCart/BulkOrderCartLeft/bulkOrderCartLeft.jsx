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


import React, { useEffect, useState } from "react";
import styles from "./bulkOrderCartLeft.module.css";
import axios from "axios";
import { useToaster } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const FestiveSweet = ({ product, addToCart, removeFromCart, basket }) => {
  // Determine if the product is in the basket already
  const isInBasket = basket.some((item) => item.productId._id === product._id);

  return (
    <div className={styles.card}>
      <img
        src={`data:${product.image.contentType};base64,${product.image.data}`}
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

const BulkOrderCartLeft = ({ filters, basket, addToCart, removeFromCart }) => {
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
          params: { ...filters, page, isTodaysDeal: false },
        });
        setSweets((prevSweets) => [...prevSweets, ...response.data.products]);
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
      <div className={styles.container}>
        {loading && <Loader />}
        <div className={styles.header}>
          <h1 className={styles.titleMain}>Select a Sweet</h1>
          <p>Note: You can only select one item at a time for a Bulk Order.</p>
        </div>
        <div className={styles.grid}>
          {sweets.map((sweet) => (
            <FestiveSweet
              key={sweet._id}
              product={sweet}
              addToCart={addToCart}
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

export default BulkOrderCartLeft;