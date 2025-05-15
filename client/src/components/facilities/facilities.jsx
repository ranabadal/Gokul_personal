import React from "react";
import styles from "./facilities.module.css";
import truck from "./assets/truck.svg";
import support from "./assets/support.svg";
import badge from "./assets/badge.svg";

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
                    <img src={support} alt="support" />
                </div>
                <div className={styles.facilities_section_right_mid}>
                    <span>
                  Support
                    </span>
                </div>
                <div className={styles.facilities_section_right_bottom}>
                    <span>
                    We are here to help you
                    </span>
                </div>
            </div>

        </div>
    );

};

export default Facilities;