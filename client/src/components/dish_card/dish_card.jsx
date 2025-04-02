import React from "react";
import styles from "./dish_card.module.css";
import pizza from "./assets/pizza.svg";
const Dishcard = () => {
    return (
        <div className={styles.deals_card_container}>
            <div className={styles.deals_card_content}>
                <div className={styles.deals_card_content_left}>
                    <img src={pizza} alt="pizza" />
                </div>
                <div className={styles.deals_card_content_right}>
                    <div className={styles.deals_card_content_right_box}>
                        <div className={styles.deals_card_content_right_box_heading}>Uttapam</div>
                        <div className={styles.deals_card_content_right_box_price}>
                            Just @ Rs. 222
                        </div>
                        <div className={styles.deals_card_content_right_box_previous_price}>Rs. 300.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dishcard;