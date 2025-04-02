import React from "react";
import styles from "./sweetProduct2.module.css";
import laddu from './imgs/laddu.svg';
import star from './imgs/star.svg';
import heart from './imgs/wishlist.svg';

const FestiveSweet = ({ name, image, price, rating, reviews }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.content1}>
          <h2 className={styles.title}>{name}</h2>
          <a href="#">
            <img src={heart} alt="Heart Icon" className={styles.heartIcon} />
          </a>
        </div>
        <div className={styles.ratingContainer}>
          <span className={styles.rating}>
            <img src={star} alt="Star Icon" className={styles.starIcon} /> {rating}
          </span>
          <span className={styles.reviews}>({reviews} Reviews)</span>
        </div>
        <p className={styles.description}>
          Dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry’s standard dummy text ever since the 1500s.
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{price}</span>
          <button className={styles.button}>ADD TO BASKET</button>
        </div>
      </div>
    </div>
  );
};

const FestSweet2 = () => {
  const sweets = [
    { name: "Lalmohan", image: laddu, price: "1499", rating: "4.8", reviews: "1102" },
    { name: "Pedaa", image: laddu, price: "1499", rating: "4.8", reviews: "1102" },
    { name: "Laddu", image: laddu, price: "1499", rating: "4.8", reviews: "1102" },
  ];

  return (
    <div className={styles.container} >
        <div className={styles.header}>
        <h1 className={styles.titleMain}>Sweet Boxes</h1>
        </div>
       <div className={styles.grid}>
        {sweets.map((sweet, index) => (
          <FestiveSweet key={index + "top"} {...sweet} />
        ))}
      </div>


      
     
     
    </div>
  );
  
};

export default FestSweet2;