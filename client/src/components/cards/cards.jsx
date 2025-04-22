import React from "react";
import styles from "./cards.module.css";

import heart from "./assets/heart.svg";
import star from "./assets/Star 1.svg";


const Cards = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className={styles.cards_content}>
                    <div className={styles.cards_content_image}>
                        <img src={data?.img} alt="sweets" />
                    </div>
                    <div className={styles.cards_content_text}>
                        <span className={styles.cards_content_text_name}>
                            {data.name}
                        </span>
                        <span className={styles.cards_content_heart}>
                            <img src={heart} alt="heart" />
                        </span>
                    </div>

                    <div className={styles.cards_bottom}>
                        <div className={styles.cards_content_rating}>
                            <div className={styles.cards_content_rating_left}>
                                <span className={styles.cards_content_rating_star}>
                                    <img src={star} alt="star" />
                                </span>
                                <span className={styles.cards_content_rating_num}>
                                    4.8
                                </span>
                            </div>

                            <div className={styles.cards_content_review_right}>
                                <span className={styles.cards_content_review}>
                                    (1102 Review)
                                </span>
                            </div>
                        </div>

                        <div className={styles.cards_content_details}>
                            <span className={styles.cards_content_details_detail}>
                                Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                            </span>
                        </div>
                        
                        <div className={styles.cards_content_price}>
                            <div className={styles.cards_content_price_left}>
                                $1499
                            </div>
                            <div className={styles.cards_content_price_right_button}>
                                <button>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default Cards;