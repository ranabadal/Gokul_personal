import React from 'react';
import styles from './wishlist.module.css';
import WishlistLeftSec from './WishlistLeftSec/wishlistLeftSec';
import WishlistRightSection from "./WishlistRhtSec/wishlistRhtSec";
import AboveHeader from "../../components/above_header/above_header";  // ✅ Import Above Header
import Header from "../../components/header/header"; 
import Footer from "../../components/footer/footer"; 


const Wishlist = () => {
  return (
    <>
    <AboveHeader />
    <Header />
    <div className={styles.container}>
  
      <div className={styles.leftSection}>
        <WishlistLeftSec />
      </div>
      <div className={styles.rightSection}>
        <WishlistRightSection />
      </div>
     
    </div>
    <Footer />
    </>
  );
};

export default Wishlist;
