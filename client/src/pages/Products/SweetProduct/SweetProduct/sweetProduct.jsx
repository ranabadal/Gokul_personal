

import React, { useEffect, useState } from "react";
import styles from "./sweetProduct.module.css";
import axios from "axios";
import star from "./imgs/star.svg";
import heart from "./imgs/wishlist.svg";
import { useToaster } from '../../../../utils';
import { BASE_URL } from "../../../../Const/Const";
const FestiveSweet = ({ product, addToCart, removeFromCart, addToWishlist, isInBasket }) => {

     
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
        <div className={styles.content1}>
          <h2 className={styles.title}>{product.name}</h2>
          <a href="#" onClick={(e) => { e.preventDefault(); addToWishlist(product._id); }}>
            <img src={heart} alt="Wishlist" className={styles.heartIcon} />
          </a>
        </div>
        <div className={styles.ratingContainer}>
          <span className={styles.rating}>
            <img src={star} alt="Star" className={styles.starIcon} /> {product.rating}
          </span>
          <span className={styles.reviews}>({product.reviewCount} Reviews)</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{product.price}</span>
          <button
            className={styles.button}
            onClick={() => isInBasket ? removeFromCart(product._id) : addToCart(product._id)}
          >
            {isInBasket ? 'REMOVE FROM BASKET' : 'ADD TO BASKET'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FestSweet = ({ filters }) => {
  const [sweets, setSweets] = useState([]);
  const [basket, setBasket] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state


  const setToast = useToaster();


  // Load basket from localStorage on mount
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasket(storedBasket);
  }, []);

  // Update localStorage whenever basket state changes
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`${BASE_URL}/api/products`, { params: { ...filters, page, isTodaysDeal: false  } });
        setSweets(response.data.products);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchProducts();
  }, [filters, page]);

  const handleAddToCart = async (productId) => {
    console.log('Product ID before sending:', typeof productId, productId); // Log the type and value
  
    try {
      const token = localStorage.getItem("jwtToken");
  
      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }
  
      // Ensure productId is a simple string and not an object
      const flatProductId = (typeof productId === 'object' && productId._id) ? productId._id : productId;
  
      const response = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: flatProductId.toString(), // Ensure productId is a string
          quantity: 1
        })
      });
  
      const data = await response.json();
      if (data.success) {
        setToast('Product added to cart successfully!', 'success');
        setBasket([...basket, flatProductId]);
      } else {
        alert(`Error adding to cart: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToast('An error occurred while adding the product to the cart.', 'error');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }

      await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBasket(basket.filter(id => id !== productId));
      setToast('Product removed from cart successfully!', 'error');
    } catch (error) {
      console.error("Error removing from cart:", error);
      setToast('An error occurred while removing the product to the cart.', 'error');
    }
  };

  const handleAddToWishlist = async (productId) => {
    console.log("Wishlist click detected for product ID:", productId); 
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }

      const productIdStr = productId.toString(); // Ensure productId is a string

      const response = await axios.post(`${BASE_URL}/api/wishlist`, { productId: productIdStr }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setToast('Product added to wishlist successfully!', 'success');
      } else {
        alert(`Error adding to wishlist: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setToast('An error occurred while adding the product to the wishlist.', 'error');
    }
  };

  // Loader component
  const Loader = () => (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {loading && <Loader />} {/* Render the loader when loading is true */}
      <div className={styles.header}>
        <h1 className={styles.titleMain}>Festive Sweets</h1>
      </div>
      <div className={styles.grid}>
        {sweets.map((sweet) => (
          <FestiveSweet
            key={sweet._id}
            product={sweet}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            addToWishlist={handleAddToWishlist}
            isInBasket={basket.includes(sweet._id)}
          />
        ))}
      </div>
      <div>
        {!loading && (
         <button onClick={() => setPage((prev) => prev + 1)} className={styles.viewMoreContainer}>
         View More
       </button>
        )}
      </div>
    </div>
  );
};

export default FestSweet;
