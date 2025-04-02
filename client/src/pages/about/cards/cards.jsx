import React from "react";
import styles from "./cards.module.css";
import Arrow from "./assets/Arrow.svg";
import cardImage from "./assets/cardImage.png";

function Cards () {
    return(
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.subcontainercard1}>
                    <div className={styles.subcontainercardorder}>Order</div>
                    <div className={styles.subcontainercardtitle}>Gokul Sweets</div>
                    <div className={styles.subcontainercardimg}>
                        <img src={Arrow} alt="Arrow"></img>
                    </div>
                </div>
                <div className={styles.subcontainercard2}>
                    <div className={styles.subcontainercardorder}>Order</div>
                    <div className={styles.subcontainercardtitle}>Takeaways</div>
                    <div className={styles.subcontainercardimg}>
                        <img src={Arrow} alt="Arrow"></img>
                    </div>
                </div>
                <div className={styles.subcontainercard3}>
                    <div className={styles.subcontainercardorder}>Order</div>
                    <div className={styles.subcontainercardtitle}>Banquet Hall</div>
                    <div className={styles.subcontainercardimg}>
                        <img src={Arrow} alt="Arrow"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}export default Cards;