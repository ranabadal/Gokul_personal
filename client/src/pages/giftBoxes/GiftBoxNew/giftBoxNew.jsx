import React from "react";
import styles from "./giftBoxNew.module.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GiftBoxNew = () => {
  return (
    <div className={styles.container}>
<div className={styles.header}>
        <Header />
    </div>   

<div className={styles.content}>

<div className={styles.hero}>
<div>



</div>
</div>
        
<div className={styles.cards}>

</div>

</div>


    <div className={styles.footer}>
        <Footer />
    </div>

    </div>
  );
}   

export default GiftBoxNew;

