import React from "react";
import styles from "./bulkOrderNewCards.module.css";

const BulkOrderNewCards = () => {
    
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.card1}>
          <div className={styles.img}></div>
          <div className={styles.cardConatent}>
            <div className={styles.titleConatiner}>
              <div className={styles.cardTitle}>Sweets</div>
              <div className={styles.likeButton}></div>
            </div>
            <div className={styles.ratingConatiner}></div>
            <div className={styles.desc}>
              Dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown
            </div>
            <div className={styles.sizeButtons}>
            
            </div>
            <div className={styles.priceConatiner}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderNewCards;
