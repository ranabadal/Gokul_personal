import React from "react";
import styles from "./deals_timer.module.css";
import Dishcard from "../dish_card/dish_card";
import { CountdownTimer } from "../hero_section/hero_section";


const DealsTimer = () => {
    return (
        <div className={styles.deals_timer_container}>
            <div className={styles.deals_timer_container_left}>
                <div className={styles.deals_timer_heading}>Today’s Deal Ends in</div>
                <div className={styles.deals_timer}>  <CountdownTimer /> </div>
                <div className={styles.deals_timer_button}>
                    <button>Check Out Now !!</button>
                </div>
            </div>
            <div className={styles.deals_timer_container_right}>
                <div className={styles.deals_timer_container_right_top}>
                    <div className={styles.deals_timer_container_right_top_left}><Dishcard /></div>
                    <div className={styles.deals_timer_container_right_top_right}><Dishcard /></div>
                </div>
                <div className={styles.deals_timer_container_right_bottom}>
                    <div className={styles.deals_timer_container_right_bottom_left}><Dishcard /></div>
                    <div className={styles.deals_timer_container_right_bottom_right}><Dishcard /></div>
                </div>
            </div>
        </div>
    );
};

export default DealsTimer;