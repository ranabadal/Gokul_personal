

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./todayDeals.module.css";
import baskett from "./Assets/basket.svg";
import wish from "./Assets/wish.svg";
import { useToaster } from '../../../utils';
import { BASE_URL } from "../../../Const/Const";
const TodayDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState([]);
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

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`, { params: { isTodaysDeal: true } });
        setProducts(response.data.products);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/cart`, { productId, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
       
        setToast('Product added to cart successfully!', 'success');
        setBasket([...basket, productId]);
      } else {
        alert(`Error adding to cart: ${response.data.message}`);
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
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
  
        setToast('Please log in first!', 'error');
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/wishlist`, { productId }, {
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
    <div className={styles.loader}>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className={styles.productList}>
      {loading ? (
        <Loader /> // Render the loader when loading is true
      ) : (
        products.length > 0 ? (
          Array.from({ length: Math.ceil(products.length / 2) }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.rowContainer}>
              {products.slice(rowIndex * 2, rowIndex * 2 + 2).map((product) => (
                <div key={product._id} className={styles.card}>
                  {/* Product Image */}
                  <div className={styles.imageContainer}>
                    <span className={styles.discountBadge}>{product.discountPercent}% Off</span>
                    <img
                      src={`data:${product.image.contentType};base64,${product.image.data}`}
                      alt={product.name}
                      className={styles.image}
                    />
                    <div className={styles.overlayIcons}>
                      <a href="" className={styles.cart} onClick={(e) => { e.preventDefault(); handleAddToCart(product._id); }}>
                        <img src={baskett} alt="cart" />
                      </a>
                      <a href="" className={styles.wishlist} onClick={(e) => { e.preventDefault(); handleAddToWishlist(product._id); }}>
                        <img src={wish} alt="wishlist" />
                      </a>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className={styles.details}>
                    <div className={styles.rating}>★★★★★ ({product.reviewCount})</div>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>
                      <span className={styles.discountPrice}>Rs. {product.discountPrice}</span>
                      <span className={styles.originalPrice}>Rs. {product.oldPrice}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No products available</p>
        )
      )}
    </div>
  );
};

export default TodayDeals;
