import React from "react";
import styles from "./header.module.css";
import logo from "./assets/images/Vector.svg";
import cart from "./assets/images/cart.svg";
import heart from "./assets/images/heart.svg";
import image from "./assets/images/photo.svg";
import downarrow from "./assets/images/down_arrow.svg";
import cx from "classnames";


const Header = () => {
  return (
    <header className={styles.header}>

      <div className={cx(styles.pointer,styles.left)}>
        <div className={styles.left_logo}>
            <img src={logo} alt="logo" />
        </div>
        
      </div>
      <div className={styles.middle}>
        <span className={styles.middle_about}>
            About
        </span>
        <span className={styles.middle_todays_deals}>
            Todays Deals
        </span>
        <span className={styles.middle_products}>
            Products
        </span>
        <span className={styles.about}>
            About
        </span>
        <span className={styles.contact}>
            Contact
        </span>
      </div>

      <div className={styles.right}>

        <div className={styles.right_cart}>
            <img src={cart} alt="cart" />
        </div>

        <div className={styles.right_heart}>
            <img src={heart} alt="heart" />
        </div>
        <div className={styles.right_image}>
            <img src={image} alt="image" />
        </div>
        <div className={styles.right_peterparker}>
        Peter parker
        </div>
        <div className={styles.right_downarrow}>
            <img src={downarrow} alt="downarrow" />
        </div>
      </div>
        
    </header>
  );
};

export default Header;
