import React from "react";
import styles from "./banner.module.css";
import Image from "./assets/image.png";

function Banner () {
    return(
        <div className={styles.container}>
            <div className={styles.containerLeft}>
                <div className={styles.containerLeftTag}>
                Let’s Create Sweet<br/>Memories Together!
                </div>
                <div className={styles.containerLeftContent}>
                Whether you’re here for a delightful treat or<br/>planning a grand event, Gokul Sweets is<br/>here to make it extra special.
                </div>
                <div className={styles.containerLeftBtn}>
                    <span>Contact us</span>
                </div>
            </div>
            <div className={styles.containerRight}>
                <img src={Image} alt="image"></img>
            </div>
        </div>
    )
}
export default Banner;