

import React, { useState, useEffect, useRef } from "react";
import styles from "./expiredDeals.module.css"; // Update styles
import DealCard from "../DealCard/dealCard"; // Adjust the import path
import Loader from "../../../components/Loader/loader5/loader5"; // Import the loader
import { BASE_URL } from "../../../Const/Const";
const TomorrowDeals = () => {
  const [tomorrowDeals, setTomorrowDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  
  useEffect(() => {
    const fetchTomorrowDeals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/deals/tomorrow`);
        const data = await response.json();
  
        console.log("Raw API response:", data.deals); // Debugging
  
        if (data.success && Array.isArray(data.deals)) {
          setTomorrowDeals(data.deals);
        } else {
          console.warn("No deals found for tomorrow.");
          setTomorrowDeals([]);
        }
      } catch (error) {
        console.error("Error fetching tomorrow deals:", error);
        setTomorrowDeals([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTomorrowDeals();
  }, []);
  
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className={styles.tomorrowDeals}>
      <h2 className={styles.title}>Tomorrow's Deals</h2>

      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      {!isLoading && (
        <div className={styles.controls}>
          <button onClick={scrollLeft} className={styles.arrowButton}>
            &#10094;
          </button>
          <div className={styles.dealsGrid} ref={scrollRef}>
            {tomorrowDeals.length > 0 ? (
              tomorrowDeals.map((deal, index) => <DealCard key={index} deal={deal} />)
            ) : (
              <p className={styles.noDeals}>No deals available for tomorrow.</p>
            )}
          </div>
          <button onClick={scrollRight} className={styles.arrowButton}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default TomorrowDeals;