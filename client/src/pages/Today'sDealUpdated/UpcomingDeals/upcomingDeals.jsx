// import React, { useRef } from "react";
// import styles from "./upcomingDeals.module.css";
// import DealCard from "../DealCard/dealCard"; // Adjust the import path as necessary
// import image from "../Assets/img.png";

// const upcomingDeals = [
//   { title: "Buy 1 Get 1 Free on Bengali Sweets", imageUrl: image, startTime: "April 10, 2025" },
//   { title: "20% Off on all Kulfi!", imageUrl: image, startTime: "April 12, 2025" },
//   { title: "Flat ₹100 Off on Rasmalai", imageUrl: image, startTime: "April 14, 2025" },
//   { title: "Special Discount on Chocolate Barfi", imageUrl: image, startTime: "April 16, 2025" },
//   { title: "Get 30% Off on Gulab Jamun", imageUrl: image, startTime: "April 18, 2025" },
//   { title: "Buy 1 Get 1 Free on Bengali Sweets", imageUrl: image, startTime: "April 10, 2025" },
//   { title: "20% Off on all Kulfi!", imageUrl: image, startTime: "April 12, 2025" },
//   { title: "Flat ₹100 Off on Rasmalai", imageUrl: image, startTime: "April 14, 2025" },
//   { title: "Special Discount on Chocolate Barfi", imageUrl: image, startTime: "April 16, 2025" },
//   { title: "Get 30% Off on Gulab Jamun", imageUrl: image, startTime: "April 18, 2025" },
// ];

// const UpcomingDeals = () => {
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     scrollRef.current.scrollLeft -= 300; // Scroll left by 300px
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollLeft += 300; // Scroll right by 300px
//   };

//   return (
//     <div className={styles.upcomingDeals}>
//       <h2 className={styles.title}>Upcoming Deals</h2>
//       <div className={styles.controls}>
//         <button onClick={scrollLeft} className={styles.arrowButton}>&#10094;</button>
//         <div className={styles.dealsGrid} ref={scrollRef}>
//           {upcomingDeals.map((deal, index) => (
//             <DealCard key={index} deal={deal} />
//           ))}
//         </div>
//         <button onClick={scrollRight} className={styles.arrowButton}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default UpcomingDeals;

import React, { useState, useEffect, useRef } from "react";
import styles from "./upcomingDeals.module.css";
import DealCard from "../DealCard/dealCard"; // Adjust the import path
import Loader from "../../../components/Loader/loader5/loader5"; // Import the loader
import { BASE_URL } from "../../../Const/Const";
const UpcomingDeals = () => {
  const [upcomingDeals, setUpcomingDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const scrollRef = useRef(null);

  // Fetch upcoming deals from backend
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/deals/upcoming`);
        const data = await response.json();

        if (data.success && Array.isArray(data.upcomingDeals)) {
          setUpcomingDeals(data.upcomingDeals);
        } else {
          console.error("No upcoming deals found.");
          setUpcomingDeals([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming deals:", error);
        setUpcomingDeals([]);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchDeals();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300; // Scroll left by 300px
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300; // Scroll right by 300px
  };

  return (
    <div className={styles.upcomingDeals}>
      <h2 className={styles.title}>Upcoming Deals</h2>

      {/* Show Loader while fetching data */}
       {isLoading && <div className={styles.loaderContainer}>
            <Loader />
            </div>}

      {!isLoading && (
        <div className={styles.controls}>
          <button onClick={scrollLeft} className={styles.arrowButton}>&#10094;</button>
          <div className={styles.dealsGrid} ref={scrollRef}>
            {upcomingDeals.length > 0 ? (
              upcomingDeals.map((deal, index) => (
                <DealCard key={index} deal={deal} />
              ))
            ) : (
              <p className={styles.noDeals}>No upcoming deals available.</p>
            )}
          </div>
          <button onClick={scrollRight} className={styles.arrowButton}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeals;