import React from "react";
import styles from "../wishlistRhtSec.module.css";

const ProductCard = ({ image, name, price, originalPrice, discount }) => {
  return (
    <div className={styles.productCard}>
      <img src={image} alt={name} className={styles.productImage} />
      <div className={styles.productDetails}>
        <span className={styles.productName}>{name}</span>
        <span className={styles.productPrice}>Just @ Rs. {price}</span>
        <span className={styles.originalPrice}>Rs. {originalPrice}</span>
      </div>
      <span className={styles.discount}>{discount} OFF</span>
    </div>
  );
};

export default ProductCard;
