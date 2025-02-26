import React from "react";
import styles from "./banquets.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GokulHeading from "../../components/gokul_heading/gokul_heading";
import HallDetails from "../../components/hall_details/hall_details";
import Footer from "../../components/footer/footer";

const Banquets = () => {
    return (
        <div className={styles.banquets}>
            <div className={styles.above_header}><AboveHeader /></div>
            <div className={styles.header}><Header /></div>
            <div className={styles.gokul_heading}><GokulHeading /></div>
            <div className={styles.hall_details}><HallDetails /><HallDetails /><HallDetails /></div>
            <div className={styles.footer}><Footer /></div>
        </div>
    );
};

export default Banquets;