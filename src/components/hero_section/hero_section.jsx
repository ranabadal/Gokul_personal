import React, { useState, useEffect } from "react";
import styles from "./hero_section.module.css";
import box from "./assets/images/box.svg";

const CountdownTimer = () => {
    const [time, setTime] = useState({ hours: 12, minutes: 53, seconds: 21 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.hero_section_left_bottom}>
            <span className={styles.hero_section_left_bottom_box}>{String(time.hours).padStart(2, "0")}</span>:
            <span className={styles.hero_section_left_bottom_box}>{String(time.minutes).padStart(2, "0")}</span>:
            <span className={styles.hero_section_left_bottom_box}>{String(time.seconds).padStart(2, "0")}</span>
        </div>
    );
};

const HeroSection = () => {
    return (
        <div>
        <div className={styles.hero_section_container}>
            <div className={styles.hero_section}>
                <button className={styles.hero_section_bttn_left}><span>&larr;</span></button>
                <div className={styles.hero_section_left}>
                    <div className={styles.hero_section_left_div_1}>
                        <div className={styles.hero_section_left_top}>Diwali Offer Ends in</div>
                        <CountdownTimer />
                    </div>
                    <div className={styles.hero_section_left_bottom}>
                        <img src={box} className={styles.image} alt="Offer Box" />
                    </div>
                </div>
                <div className={styles.hero_section_right_container}>
                    <h2 className={styles.hero_section_right_title}>Handmade Happiness in Every Bite!</h2>
                    <p className={styles.hero_section_right_description}>
                        Elevate every occasion with Evara, where we offer premium gifts that illuminate life’s special moments.
                    </p>
                    <div className={styles.hero_section_right_buttons}>
                        <button className={styles.order_button}>Order Now</button>
                        <button className={styles.explore_button}>Explore More</button>
                    </div>
                </div>
                <button className={styles.hero_section_bttn_right}><span>&rarr;</span></button>
            </div>
        </div>
        
        <div className={styles.hero_section_bottom_dots}>
            <div className={styles.hero_section_bottom_dot}></div>
            <div className={styles.hero_section_bottom_dot}></div>
            <div className={styles.hero_section_bottom_dot}></div>
        </div>

    </div>
    );
};

export default HeroSection;
