// // import React from "react";
// // import styles from "./expiredDeals.module.css";
// // import DealCard from "../DealCard/dealCard"; // Adjust the import path as necessary
// // import image from '../Assets/img.png'

// // const expiredDeals = [
// //   {
// //     title: "Expired: 15% Off on Tandoori Snacks!",
// //     imageUrl: image,
// //   },
// //   {
// //     title: "Expired: Buy 1 Get 1 Free on Bengali Sweets",
// //     imageUrl: image,
// //   },
// // ];

// // const ExpiredDeals = () => {
// //   return (
// //     <div className={styles.expiredDeals}>
// //       <h2>Expired Deals</h2>
// //       <div className={styles.dealsGrid}>
// //         {expiredDeals.map((deal, index) => (
// //           <DealCard key={index} deal={deal} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ExpiredDeals;



// import React, { useRef } from "react";
// import styles from "./expiredDeals.module.css";
// import DealCard from "../DealCard/dealCard"; // Adjust the import path as necessary
// import image from "../Assets/img.png";

// const expiredDeals = [
//   { title: "Buy 1 Get 1 Free on Bengali Sweets", imageUrl: image, endDate: "April 10, 2025" },
//   { title: "20% Off on all Kulfi!", imageUrl: image, endDate: "April 12, 2025" },
//   { title: "Flat ₹100 Off on Rasmalai", imageUrl: image, endDate: "April 14, 2025" },
//   { title: "Special Discount on Chocolate Barfi", imageUrl: image, endDate: "April 16, 2025" },
//   { title: "Get 30% Off on Gulab Jamun", imageUrl: image, endDate: "April 18, 2025" },
//   { title: "Buy 1 Get 1 Free on Bengali Sweets", imageUrl: image, endDate: "April 10, 2025" },
//   { title: "20% Off on all Kulfi!", imageUrl: image, endDate: "April 12, 2025" },
//   { title: "Flat ₹100 Off on Rasmalai", imageUrl: image, endDate: "April 14, 2025" },
//   { title: "Special Discount on Chocolate Barfi", imageUrl: image, endDate: "April 16, 2025" },
//   { title: "Get 30% Off on Gulab Jamun", imageUrl: image, endDate: "April 18, 2025" },
// ];

// const ExpiredDeals = () => {
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     scrollRef.current.scrollLeft -= 300; // Scroll left by 300px
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollLeft += 300; // Scroll right by 300px
//   };

//   return (
//     <div className={styles.deals}>
//       <h2 className={styles.title}>Expired Deals</h2>
//       <div className={styles.controls}>
//         <button onClick={scrollLeft} className={styles.arrowButton}>&#10094;</button>
//         <div className={styles.dealsGrid} ref={scrollRef}>
//           {expiredDeals.map((deal, index) => (
//             <DealCard key={index} deal={deal} />
//           ))}
//         </div>
//         <button onClick={scrollRight} className={styles.arrowButton}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default ExpiredDeals;

// import React, { useState, useEffect, useRef } from "react";
// import styles from "./expiredDeals.module.css";
// import DealCard from "../DealCard/dealCard"; // Adjust the import path
// import Loader from "../../../components/Loader/loader5/loader5"; // Import the loader

// const ExpiredDeals = () => {
//   const [expiredDeals, setExpiredDeals] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const scrollRef = useRef(null);

//   // Fetch expired deals from backend
//   useEffect(() => {
//     const fetchExpiredDeals = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/deals/expired");
//         const data = await response.json();

//         if (data.success && Array.isArray(data.expiredDeals)) {
//           setExpiredDeals(data.expiredDeals);
//         } else {
//           console.error("No expired deals found.");
//           setExpiredDeals([]);
//         }
//       } catch (error) {
//         console.error("Error fetching expired deals:", error);
//         setExpiredDeals([]);
//       } finally {
//         setIsLoading(false); // Stop loading once data is fetched
//       }
//     };

//     fetchExpiredDeals();
//   }, []);

//   const scrollLeft = () => {
//     scrollRef.current.scrollLeft -= 300; // Scroll left by 300px
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollLeft += 300; // Scroll right by 300px
//   };

//   return (
//     <div className={styles.expiredDeals}>
//       <h2 className={styles.title}>Expired Deals</h2>
      
//       {/* Show Loader while fetching data */}
//       {isLoading && <div className={styles.loaderContainer}>
//         <Loader />
//         </div>}

//       {!isLoading && (
//         <div className={styles.controls}>
//           <button onClick={scrollLeft} className={styles.arrowButton}>&#10094;</button>
//           <div className={styles.dealsGrid} ref={scrollRef}>
//             {expiredDeals.length > 0 ? (
//               expiredDeals.map((deal, index) => (
//                 <DealCard key={index} deal={deal} />
//               ))
//             ) : (
//               <p className={styles.noDeals}>No expired deals available.</p>
//             )}
//           </div>
//           <button onClick={scrollRight} className={styles.arrowButton}>&#10095;</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpiredDeals;


import React, { useState, useEffect, useRef } from "react";
import styles from "./expiredDeals.module.css"; // Update styles
import DealCard from "../DealCard/dealCard"; // Adjust the import path
import Loader from "../../../components/Loader/loader5/loader5"; // Import the loader

const TomorrowDeals = () => {
  const [tomorrowDeals, setTomorrowDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  
  useEffect(() => {
    const fetchTomorrowDeals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/deals/tomorrow");
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