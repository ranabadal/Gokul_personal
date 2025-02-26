import React from "react";
import styles from "./hall_detail.module.css";
import space from"./assets/space.svg";
import heart from"./assets/red heart.svg";
import star from"./assets/star.svg";
import card1 from"./assets/card1.svg";
import card2_3 from"./assets/card2_3.svg";
import callender_logo from"./assets/callender logo.svg";
import clock_logo from"./assets/clock logo.svg";

const HallDetails = () => {
    return (
        <div className={styles.hall_details}>
            <div className={styles.hall_details_left}>

                <div className={styles.hall_details_left_top}>

                    <div className={styles.hall_details_left_top_line1}>
                        <div className={styles.hall_details_left_top_left_heading}>
                            Banquet Hall 3
                        </div>
                        <div className={styles.hall_details_left_top__right}>
                            <img src={heart} alt="heart" />
                        </div>
                    </div>

                    <div className={styles.hall_details_left_rating}>
                        <div className={styles.hall_details_left_rating_star}><img src={star} alt="star" /></div>
                        <div className={styles.hall_details_left_rating_star}><img src={star} alt="star" /></div>
                        <div className={styles.hall_details_left_rating_star}><img src={star} alt="star" /></div>
                        <div className={styles.hall_details_left_rating_star}><img src={star} alt="star" /></div>
                        <div className={styles.hall_details_left_rating_star}><img src={star} alt="star" /></div>
                        <div className={styles.hall_details_left_rating_number}>5.0</div>
                    </div>
                    <div className={styles.hall_details_left_top_price}>₹ 14999/day</div>
                    <div className={styles.hall_details_left_top_seating}>
                        <div className={styles.hall_details_left_top_seating_left}>80 Seating</div>
                        <div className={styles.hall_details_left_top_seating_right}>580/plate</div>
                    </div>

                </div>

                <div className={styles.hall_details_left_descption}>
                Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                </div>
                <div className={styles.hall_details_left_cards}>
                    <div className={styles.hall_details_left_cards_left}>
                        <img src={card1} alt="card1" />
                    </div>
                    <div className={styles.hall_details_left_cards_left}>
                        <img src={card2_3} alt="card2_3" />
                    </div>
                    <div className={styles.hall_details_left_cards_left}>
                        <img src={card2_3} alt="card2_3" />
                    </div>
                    <div className={styles.hall_details_left_cards_left}>
                        <img src={card2_3} alt="card2_3" />
                    </div>
                </div>
                <div className={styles.hall_details_left_bottom}>

                    <div className={styles.hall_details_left_bottom_box}>
                        <div className={styles.hall_details_left_bottom_box_left}>
                            <div className={styles.hall_details_left_bottom_box_left_heading}>From</div>
                            <div className={styles.hall_details_left_bottom_box_left_logo}><img src={callender_logo} alt="logo" /></div>
                        </div>
                        <div className={styles.hall_details_left_bottom_box_right}>
                            <div className={styles.hall_details_left_bottom_box_right_heading}>To</div> 
                            <div className={styles.hall_details_left_bottom_box_right_logo}><img src={callender_logo} alt="logo" /></div>
                        </div>
                    </div>

                    <div className={styles.hall_details_left_bottom_box}>
                        <div className={styles.hall_details_left_bottom_box_left}>
                            <div className={styles.hall_details_left_bottom_box_left_heading}>From</div>
                            <div className={styles.hall_details_left_bottom_box_left_logo}><img src={clock_logo} alt="logo" /></div>
                        </div>
                        <div className={styles.hall_details_left_bottom_box_right}>
                            <div className={styles.hall_details_left_bottom_box_right_heading}>To</div> 
                            <div className={styles.hall_details_left_bottom_box_right_logo}><img src={clock_logo} alt="logo" /></div>
                        </div>
                    </div>
                    <div className={styles.hall_details_left_bottom_box}>
                        <button className={styles.hall_details_left_bottom_box_button}>Check Availability</button>
                    </div>
                </div>
            </div>
            <div className={styles.hall_details_right}>
                <img src={space} alt="space" />
            </div>
        </div>
    );
};


export default HallDetails;