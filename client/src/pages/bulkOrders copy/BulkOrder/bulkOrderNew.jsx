import React from "react";
import styles from "./bulkOrderNew.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import AboveHeader from "../../../components/above_header/above_header";
const BulkOrderNew = () => {
    return (

       <div className={styles.conatiner}>

        <div className={styles.header}>
            <AboveHeader />
            <Header />
        </div>

        <div className={styles.title}>
            Bulk Order
        </div>

        <div className={styles.titleSlider}>
            <div className={styles.titleSliderName}>SNAKCS</div>
            <div className={styles.titleSliderName}>SWEETS</div>
        </div>

        <div className={styles.cards}>
        
        </div>
       
       </div>
    );
}   

export default BulkOrderNew;