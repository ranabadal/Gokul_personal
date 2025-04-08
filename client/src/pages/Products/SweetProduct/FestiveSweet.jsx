

import React from 'react';
import styles from './FestiveSweet.module.css';
import star from "./SweetProduct/imgs/star.svg";
import heart from "./SweetProduct/imgs/wishlist.svg";
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
  
          {/* Conditionally Render Rating Section */}
          {(product.rating > 0 || product.reviewCount > 0) && (
            <div className={styles.ratingContainer}>
              <span className={styles.rating}>
                <img src={star} alt="Star" className={styles.starIcon} /> {product.rating}
              </span>
              <span className={styles.reviews}>({product.reviewCount} Reviews)</span>
            </div>
          )}
  
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
  
  export default FestiveSweet;