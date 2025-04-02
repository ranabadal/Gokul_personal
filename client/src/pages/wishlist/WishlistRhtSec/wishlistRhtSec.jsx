import React from "react";  
import ProductCard from "./ProductCard/productcard";
import styles from './wishlistRhtSec.module.css';
import ProductImg from './Assets/product.svg'
const WishlistRightSection = () => {
  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.dealSection}>
        <h2>Today's Deal Ends in</h2>
        <div className={styles.timer}>
          <span>1</span>:<span>2</span>:<span>2</span>:<span>5</span>:<span>1</span>:<span>3</span>
        </div>
        <button className={styles.checkoutBtn}>Check Out Now !!</button>
      </div>

      <ProductCard 
        image={ProductImg}
        name="Uttapam"
        price={222}
        originalPrice={300}
        discount="10%" 
      />
      <ProductCard 
        image={ProductImg}
        name="Uttapam"
        price={222}
        originalPrice={300}
        discount="10%" 
      />
    </div>
  );
};

export default WishlistRightSection;
