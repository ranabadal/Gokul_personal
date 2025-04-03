import React from "react";
import styles from "./horizontal_card.module.css";
import capacity from "./assets/capacity.svg";
import heart from "./assets/heart.svg";
import star from "./assets/Star.svg";
import { useNavigate } from "react-router-dom";

const HorizontalCard = () => {
    const navigate = useNavigate();


    return(
        <div className={styles.card_container}>
            <div className={styles.card_container_left}>
                <img src={capacity} alt="capacity" />
            </div>
            <div className={styles.card_container_right}>
                <div className={styles.card_container_right_heading}>
                    <div className={styles.card_container_right_heading_left}>
                        Gokul Hall 1
                    </div>
                    <div className={styles.card_container_right_heading_right}>
                        <img src={heart} alt="heart" />
                    </div>
                </div>
                <div className={styles.card_container_right_rating}>
                    <div className={styles.card_container_right_rating_left}>
                        <div className={styles.card_container_right_rating_left_star}>
                            <img src={star} alt="star" />
                        </div>
                        <div className={styles.card_container_right_rating_left_no}>
                            4.8
                        </div>
                    </div>
                    <div className={styles.card_container_right_rating_right}>
                        (1102 Review)
                    </div>
                </div>
                <div className={styles.card_container_right_capacity}>20 Seating :</div>
                <div className={styles.card_container_right_discription}>
                    Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                </div>
                <div className={styles.card_container_right_bottom}>
                    <div className={styles.card_container_right_bottom_left}>₹14959</div>
                    <div className={styles.card_container_right_bottom_right}>
                    <button onClick={() => navigate("/banquets")}>
              Proceed Booking
            </button>                    </div>
                </div>
            </div>
        </div>
    );

};

export default HorizontalCard;