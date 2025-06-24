// import React, { useState, useEffect, useRef } from "react";
// import styles from "./TakeawayPage.module.css";
// import axios from "axios";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Header from "../../components/header/header";
// import Footer from "../../components/footer/footer";
// import SweetProduct from "./SweetProduct/SweetProduct/sweetProduct";
// import Background from "./Assets/bg1.png";
// import { useToaster } from "../../utils";
// import { FiSearch } from "react-icons/fi";
// import Loader from "../../components/Loader/loader5/loader5"; // Import the loader
// import { BASE_URL } from "../../Const/Const";
// export default function TakeawayPage() {
//   const [selectedCategory, setSelectedCategory] = useState("Restaurant");
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const subcategoriesRef = useRef(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loadingSubcategories, setLoadingSubcategories] = useState(true);
//   const [errorSubcategories, setErrorSubcategories] = useState("");
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [errorProducts, setErrorProducts] = useState("");
//   const [heroIndex, setHeroIndex] = useState(0);
//   const [selectedSweetsSubcategory, setSelectedSweetsSubcategory] = useState(null);
//   const sweetsSubcategoriesRef = useRef(null);
//   const [sweetsSubcategories, setSweetsSubcategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [basket, setBasket] = useState([]);

//   // Load basket from localStorage on mount
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);
//   }, []);

//   // Update localStorage whenever basket state changes
//   useEffect(() => {
//     localStorage.setItem("basket", JSON.stringify(basket));
//   }, [basket]);

//   const setToast = useToaster();

//   const handleAddToCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast("Please log in first!", "error");
//         return;
//       }      
//       const response = await fetch(`${BASE_URL}/api/cart`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ productId, quantity: 1 }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setToast("Product added to cart successfully!", "success");
//         setBasket([...basket, productId]);
//       } else {
//         alert(`Error adding to cart: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setToast(
//         "An error occurred while adding the product to the cart.",
//         "error"
//       );
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//         setToast("Please log in first!", "error");
//         return;
//       }

//       await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBasket(basket.filter((id) => id !== productId));
//       setToast("Product removed from cart successfully!", "error");
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       setToast(
//         "An error occurred while removing the product from the cart.",
//         "error"
//       );
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/api/navbar`)
//       .then((response) => {
//         console.log("Navbar API Response:", response.data); // Debugging
//         setSubcategories(
//           response.data.filter((sub) => sub.category === "Restaurant")
//         );
//         setSweetsSubcategories(
//           response.data.filter((sub) => sub.category === "Sweets")
//         );
//         setLoadingSubcategories(false);
//       })
//       .catch(() => {
//         setErrorSubcategories("Error fetching subcategories!");
//         setLoadingSubcategories(false);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/api/products`)
//       .then((response) => {
//         console.log("Products API Response:", response.data); // Debugging
//         setProducts(response.data.products || []); // ✅ Extract only the products array
//         setLoadingProducts(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setErrorProducts("Error fetching products!");
//         setLoadingProducts(false);
//       });
//   }, []);

//   const heroContent = [
//     { text: "Authentic Sweets & Pure Vegetarian Delights" },
//     { text: "Experience the Taste of Tradition" },
//     { text: "Fresh Ingredients, Timeless Recipes" },
//   ];

//   // Auto-switching hero section
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeroIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll subcategories smoothly
//   const scrollSubcategories = (direction) => {
//     if (subcategoriesRef.current) {
//       subcategoriesRef.current.scrollBy({
//         left: direction === "left" ? -200 : 200,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Header />

//       {/* Hero Section */}
//       <header
//         className={styles.heroSection}
//         style={{ backgroundImage: `url(${Background})` }}
//       >
//         <h1 className={styles.title}>Gokul</h1>
//         <h2 className={styles.subtitle}>Takeaway</h2>
//         <p className={styles.herodescription}>{heroContent[heroIndex].text}</p>
//       </header>

//       <div className={styles.searchWrapper}>
//         <div className={styles.searchContainer}>
//           <FiSearch className={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className={styles.searchInput}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className={styles.filterWrapper}>
//         <span
//           className={
//             selectedCategory === "Sweets" ? styles.activeFilter : styles.filter
//           }
//           onClick={() => setSelectedCategory("Sweets")}
//         >
//           Sweets
//         </span>
//         <span
//           className={
//             selectedCategory === "Restaurant"
//               ? styles.activeFilter
//               : styles.filter
//           }
//           onClick={() => setSelectedCategory("Restaurant")}
//         >
//           Restaurant
//         </span>
//       </div>

//       <div className={styles.viewAllButtonWrapper}>
//         <button
//           className={styles.viewAllButton}
//           onClick={() => {
//             setSelectedSubcategory("");
//           }}
//         >
//           View All
//         </button>
//       </div>

//       {/* Display Based on Filter */}
//       {/* Display Based on Filter */}
//       {selectedCategory === "Sweets" && (
//         <section className={styles.sweetsSection}>
//           <h2 className={styles.sectionRestaurentTitle}>Sweets</h2>

//           <div className={styles.subcategoriesWrapper}>
//             <FiChevronLeft
//               className={styles.arrow}
//               onClick={() =>
//                 scrollSubcategories("left", sweetsSubcategoriesRef)
//               }
//             />
//             <div className={styles.subcategories} ref={sweetsSubcategoriesRef}>
//               {sweetsSubcategories.map((sub) => (
//                 <div
//                   key={sub._id}
//                   className={`${styles.subcategoryCard} ${
//                     selectedSubcategory === sub.name ? styles.active : ""
//                   }`}
//                   onClick={() => setSelectedSubcategory(sub.name)}
//                 >
//                   <img
//                     src={sub.image}
//                     alt={sub.name}
//                     className={styles.subcategoryImage}
//                   />
//                   <p className={styles.subcategoryName}>{sub.name}</p>
//                 </div>
//               ))}
//             </div>
//             <FiChevronRight
//               className={styles.arrow}
//               onClick={() =>
//                 scrollSubcategories("right", sweetsSubcategoriesRef)
//               }
//             />
//           </div>

//           {/* 
// <div className={styles.viewAllButtonWrapper}>
  
//          <button 
//                     className={styles.viewAllButton} 
//                     onClick={() => { 
                     
//                       setSelectedSubcategory('');
                     
//                     }}
//                   >
//                     View All
//                   </button>
// </div>  */}
//           {/* Product Grid for Sweets */}
          
//           <div className={styles.productGrid}>
//             {loadingProducts ? (
//               <div className={styles.loaderContainer}>
//                 <Loader />
//               </div>
//             ) : errorProducts ? (
//               <p>{errorProducts}</p>
//             ) : (
//               products
//                 .filter(
//                   (product) =>
//                     product.category === "Sweets" &&
//                     (!selectedSubcategory ||
//                       product.subcategory === selectedSubcategory) &&
//                     product.name
//                       .toLowerCase()
//                       .includes(searchQuery.toLowerCase())
//                 )
//                 .map((product) => (
//                   <div key={product._id} className={styles.productCard}>
//                     <div className={styles.productImageWrapper}>
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className={styles.productImage}
//                       />
//                     </div>
//                     <div className={styles.productInfo}>
//                       <h3 className={styles.productName}>{product.name}</h3>
//                       <p className={styles.productDescription}>
//                         {product.description}
//                       </p>
//                     </div>
//                     <div className={styles.productBottom}>
//                       <span className={styles.price}>₹{product.price}/-</span>
//                       <button
//                         className={styles.addToCart}
//                         onClick={() =>
//                           basket.includes(product._id)
//                             ? handleRemoveFromCart(product._id)
//                             : handleAddToCart(product._id)
//                         }
//                       >
//                         {basket.includes(product._id)
//                           ? "Remove from Cart"
//                           : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )
//             )
//             }      
//           </div>
//         </section>
//       )}

//       {selectedCategory === "Restaurant" && (
//         <section className={styles.restaurantSection}>
//           <h2 className={styles.sectionRestaurentTitle}>Restaurant</h2>
//           {/* Subcategories Carousel */}
//           <div className={styles.subcategoriesWrapper}>
//             <FiChevronLeft
//               className={styles.arrow}
//               onClick={() => scrollSubcategories("left")}
//             />
//             <div className={styles.subcategories} ref={subcategoriesRef}>
//               {loadingSubcategories ? (
//                 <div className={styles.loaderContainer}>
//                   <Loader />
//                 </div>
//                 ) : errorSubcategories ? (
//                 <p>{errorSubcategories}</p>
//               ) : (
//                 subcategories.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className={`${styles.subcategoryCard} ${
//                       selectedSubcategory === sub.name ? styles.active : ""
//                     }`}
//                     onClick={() => setSelectedSubcategory(sub.name)}
//                     >
//                     <img
//                       src={sub.image}
//                       alt={sub.name}
//                       className={styles.subcategoryImage}
//                     />
//                     <p className={styles.subcategoryName}>{sub.name}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//             <FiChevronRight
//               className={styles.arrow}
//               onClick={() => scrollSubcategories("right")}
//             />
//           </div>

//           {/* <div className={styles.viewAllButtonWrapper}>
  
//          <button 
//                     className={styles.viewAllButton} 
//                     onClick={() => { 
                     
//                       setSelectedSubcategory('');
                     
//                     }}
//                   >
//                     View All
//                   </button>
// </div> */}

//           {/* Product Grid */}
//           <div className={styles.productGrid}>
//             {loadingProducts ? (
//               <div className={styles.loaderContainer}>
//                 <Loader />
//               </div>
//             ) : errorProducts ? (
//               <p>{errorProducts}</p>
//             ) : (
//               products
//                 .filter(
//                   (product) =>
//                     product.category === "Restaurant" &&
//                     (!selectedSubcategory ||
//                       product.subcategory === selectedSubcategory) &&
//                     product.name
//                       .toLowerCase()
//                       .includes(searchQuery.toLowerCase())
//                 )
//                 .map((product) => (
//                   <div key={product._id} className={styles.productCard}>
//                     <div className={styles.productImageWrapper}>
//                       <img
//                        src={product.image?.url || product.image}
//                         alt={product.name}
//                         className={styles.productImage}
//                       />
//                     </div>
//                     <div className={styles.productInfo}>
//                       <div className={styles.productNameWrapper}>
//                         <h3 className={styles.productName}>{product.name}</h3>
//                       </div>
//                       <div className={styles.productDescriptionWrapper}>
//                         <p className={styles.productDescription}>
//                           {product.description}
//                         </p>
//                       </div>
//                     </div>
//                     <div className={styles.productBottom}>
//                       <div className={styles.productPriceWrapper}>
//                         <span className={styles.price}>₹{product.price}/-</span>
//                       </div>
//                       <button
//                         className={styles.addToCart}
//                         onClick={() =>
//                           basket.includes(product._id)
//                             ? handleRemoveFromCart(product._id)
//                             : handleAddToCart(product._id)
//                         }
//                       >
//                         {basket.includes(product._id)
//                           ? "Remove from Cart"
//                           : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 ))
//             )}
//           </div>
//         </section>
//       )
//       }
//       <Footer />
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import styles from "./TakeawayPage.module.css";
import axios from "axios";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Loader from "../../components/Loader/loader5/loader5";
import Background from "./Assets/bg1.png";
import { useToaster } from "../../utils";
import { BASE_URL } from "../../Const/Const";

export default function TakeawayPage() {
  const [selectedCategory, setSelectedCategory] = useState("Restaurant");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [sweetsSubcategories, setSweetsSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [errorSubcategories, setErrorSubcategories] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [basket, setBasket] = useState([]);

  const subcategoriesRef = useRef(null);
  const sweetsSubcategoriesRef = useRef(null);

  const setToast = useToaster();

  // Load basket from localStorage
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);

  // Update localStorage when basket changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Fetch subcategories from navbar API
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/navbar`)
      .then((response) => {
        console.log("Navbar API Response:", response.data);
        // Filter subcategories based on category
        setSubcategories(
          response.data.filter((sub) => sub.category === "Restaurant")
        );
        setSweetsSubcategories(
          response.data.filter((sub) => sub.category === "Sweets")
        );
        setLoadingSubcategories(false);
      })
      .catch(() => {
        setErrorSubcategories("Error fetching subcategories!");
        setLoadingSubcategories(false);
      });
  }, []);

  // Fetch products from API
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((response) => {
        console.log("Products API Response:", response.data);
        setProducts(response.data.products || []);
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setErrorProducts("Error fetching products!");
        setLoadingProducts(false);
      });
  }, []);

  const heroContent = [
    { text: "Authentic Sweets & Pure Vegetarian Delights" },
    { text: "Experience the Taste of Tradition" },
    { text: "Fresh Ingredients, Timeless Recipes" },
  ];

  // Auto-cycle hero text every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroContent.length]);

  // Smooth scroll for subcategories carousel
  const scrollSubcategories = (direction, ref) => {
    if (ref && ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Compute filtered products based on selected filters and search query
  const computedFilteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategory !== selectedSubcategory)
      return false;
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Add to cart handler
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setToast("Please log in first!", "error");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        setToast("Product added to cart successfully!", "success");
        setBasket([...basket, productId]);
      } else {
        alert(`Error adding to cart: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToast("An error occurred while adding the product to the cart.", "error");
    }
  };

  // Remove from cart handler
  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setToast("Please log in first!", "error");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBasket(basket.filter((id) => id !== productId));
      setToast("Product removed from cart successfully!", "error");
    } catch (error) {
      console.error("Error removing from cart:", error);
      setToast(
        "An error occurred while removing the product from the cart.",
        "error"
      );
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <header
        className={styles.heroSection}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <h1 className={styles.title}>Gokul</h1>
        <h2 className={styles.subtitle}>Takeaway</h2>
        <p className={styles.herodescription}>{heroContent[heroIndex].text}</p>
      </header>

      {/* Search Box */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterWrapper}>
        <span
          className={
            selectedCategory === "Sweets" ? styles.activeFilter : styles.filter
          }
          onClick={() => setSelectedCategory("Sweets")}
        >
          Sweets
        </span>
        <span
          className={
            selectedCategory === "Restaurant"
              ? styles.activeFilter
              : styles.filter
          }
          onClick={() => setSelectedCategory("Restaurant")}
        >
          Restaurant
        </span>
      </div>

      <div className={styles.viewAllButtonWrapper}>
        <button
          className={styles.viewAllButton}
          onClick={() => {
            setSelectedSubcategory("");
          }}
        >
          View All
        </button>
      </div>

      {/* Sweets Section */}
      {selectedCategory === "Sweets" && (
        <section className={styles.sweetsSection}>
          <h2 className={styles.sectionRestaurentTitle}>Sweets</h2>

          {/* Subcategories Carousel for Sweets */}
          <div className={styles.subcategoriesWrapper}>
            <FiChevronLeft
              className={styles.arrow}
              onClick={() =>
                scrollSubcategories("left", sweetsSubcategoriesRef)
              }
            />
            <div className={styles.subcategories} ref={sweetsSubcategoriesRef}>
              {sweetsSubcategories.map((sub) => (
                <div
                  key={sub._id}
                  className={`${styles.subcategoryCard} ${
                    selectedSubcategory === sub.name ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSubcategory(sub.name)}
                >
                  <img
                    src={sub.image?.url || sub.image}
                    alt={sub.name}
                    className={styles.subcategoryImage}
                  />
                  <p className={styles.subcategoryName}>{sub.name}</p>
                </div>
              ))}
            </div>
            <FiChevronRight
              className={styles.arrow}
              onClick={() =>
                scrollSubcategories("right", sweetsSubcategoriesRef)
              }
            />
          </div>

          {/* Product Grid for Sweets */}
          <div className={styles.productGrid}>
            {loadingProducts ? (
              <div className={styles.loaderContainer}>
                <Loader />
              </div>
            ) : errorProducts ? (
              <p>{errorProducts}</p>
            ) : (
              products
                .filter(
                  (product) =>
                    product.category === "Sweets" &&
                    (!selectedSubcategory ||
                      product.subcategory === selectedSubcategory) &&
                    product.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <div key={product._id} className={styles.productCard}>
                    <div className={styles.productImageWrapper}>
                      <img
                        src={product.image?.url}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                    </div>
                    <div className={styles.productBottom}>
                      <span className={styles.price}>₹{product.price}/-</span>
                      <button
                        className={styles.addToCart}
                        onClick={() =>
                          basket.includes(product._id)
                            ? handleRemoveFromCart(product._id)
                            : handleAddToCart(product._id)
                        }
                      >
                        {basket.includes(product._id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      )}

      {/* Restaurant Section */}
      {selectedCategory === "Restaurant" && (
        <section className={styles.restaurantSection}>
          <h2 className={styles.sectionRestaurentTitle}>Restaurant</h2>

          {/* Subcategories Carousel for Restaurant */}
          <div className={styles.subcategoriesWrapper}>
            <FiChevronLeft
              className={styles.arrow}
              onClick={() => scrollSubcategories("left", subcategoriesRef)}
            />
            <div className={styles.subcategories} ref={subcategoriesRef}>
              {loadingSubcategories ? (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>
              ) : errorSubcategories ? (
                <p>{errorSubcategories}</p>
              ) : (
                subcategories.map((sub) => (
                  <div
                    key={sub._id}
                    className={`${styles.subcategoryCard} ${
                      selectedSubcategory === sub.name ? styles.active : ""
                    }`}
                    onClick={() => setSelectedSubcategory(sub.name)}
                  >
                    <img
                      src={sub.image?.url || sub.image}
                      alt={sub.name}
                      className={styles.subcategoryImage}
                    />
                    <p className={styles.subcategoryName}>{sub.name}</p>
                  </div>
                ))
              )}
            </div>
            <FiChevronRight
              className={styles.arrow}
              onClick={() => scrollSubcategories("right", subcategoriesRef)}
            />
          </div>

          {/* Product Grid for Restaurant */}
          <div className={styles.productGrid}>
            {loadingProducts ? (
              <div className={styles.loaderContainer}>
                <Loader />
              </div>
            ) : errorProducts ? (
              <p>{errorProducts}</p>
            ) : (
              products
                .filter(
                  (product) =>
                    product.category === "Restaurant" &&
                    (!selectedSubcategory ||
                      product.subcategory === selectedSubcategory) &&
                    product.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <div key={product._id} className={styles.productCard}>
                    <div className={styles.productImageWrapper}>
                      <img
                        src={product.image?.url}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.productNameWrapper}>
                        <h3 className={styles.productName}>{product.name}</h3>
                      </div>
                      <div className={styles.productDescriptionWrapper}>
                        <p className={styles.productDescription}>
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className={styles.productBottom}>
                      <div className={styles.productPriceWrapper}>
                        <span className={styles.price}>₹{product.price}/-</span>
                      </div>
                      <button
                        className={styles.addToCart}
                        onClick={() =>
                          basket.includes(product._id)
                            ? handleRemoveFromCart(product._id)
                            : handleAddToCart(product._id)
                        }
                      >
                        {basket.includes(product._id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}