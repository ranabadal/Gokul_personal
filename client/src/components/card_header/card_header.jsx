
import React from "react";
import styles from "./card_header.module.css";  
import right_arro from "./assets/arrow.svg";
import { useNavigate } from "react-router-dom";

const CardHeader = ({ title = "Mero Gokul Sweets" }) => {
const navigate = useNavigate();
    return (
        <div className={styles.card_header}>
            <div className={styles.card_header_left}>{title}</div>
            <div className={styles.card_header_right}>
                <div className={styles.card_header_right_text} onClick={() => navigate("/banquets")}>   
                    VIEW ALL
                </div>
                <div className={styles.card_header_right_arrow}>
                    <img src={right_arro} alt="right_arro" />
                </div>
            </div>
        </div>
    );
};

export default CardHeader;
