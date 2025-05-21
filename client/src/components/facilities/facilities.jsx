import React from "react";
import styles from "./facilities.module.css";
import truck from "./assets/truck.svg";
import support from "./assets/support.svg";
import badge from "./assets/badge.svg";
import giftBoxsvg from "./assets/giftbox2.svg"
const Facilities = () => {
    return(
        <div className={styles.facilities_section}>

            <div className={styles.facilities_section_left}>

                <div className={styles.facilities_section_left_top}>
                    <img src={truck} alt="truck" />
                </div>
                <div className={styles.facilities_section_left_mid}>
                    <span>
                    Delivery
                    </span>
                </div>
                <div className={styles.facilities_section_left_bottom}>
                    <span>
                    Explore our edit of everything that ships
                    </span>
                </div>

            </div>
            <div className={styles.facilities_section_middle}>
            
                <div className={styles.facilities_section_middle_top}>
                    <img src={badge} alt="badge" />
                </div>
                <div className={styles.facilities_section_middle_mid}>
                    <span>
                     Best Quality
                    </span>
                </div>
                <div className={styles.facilities_section_middle_bottom}>
                    <span>
                    Don't worry about quality<br/>We provide best quality to you
                    </span>
                </div>

            </div>
            <div className={styles.facilities_section_right}>
                <div className={styles.facilities_section_right_top}>
                    <img src={giftBoxsvg} alt="support" />
                </div>
                <div className={styles.facilities_section_right_mid}>
                    <span>
                    {/* Support*/}
                  GiftBoxes
                    </span>
                </div>
                <div className={styles.facilities_section_right_bottom}>
                    <span>
                    {/* We are here to help you */}
                    We provide gift boxes for<br/>your loved ones
                    </span>
                </div>
            </div>

        </div>
    );

};

export default Facilities;