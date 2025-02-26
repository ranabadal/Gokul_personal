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
                    Free Delivery 
                    </span>
                </div>
                <div className={styles.facilities_section_left_bottom}>
                    <span>
                    Explore our edit of everything that ships within 24 hours
                    </span>
                </div>

            </div>
            <div className={styles.facilities_section_middle}>
            
                <div className={styles.facilities_section_middle_top}>
                    <img src={badge} alt="badge" />
                </div>
                <div className={styles.facilities_section_middle_mid}>
                    <span>
                    100% Money back guarantee
                    </span>
                </div>
                <div className={styles.facilities_section_middle_bottom}>
                    <span>
                    Don't worry about that<br/>you will have money back
                    </span>
                </div>

            </div>
            <div className={styles.facilities_section_right}>
                <div className={styles.facilities_section_right_top}>
                    <img src={support} alt="support" />
                </div>
                <div className={styles.facilities_section_right_mid}>
                    <span>
                    24X7 Support
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