// import React, { useState, useEffect } from "react";
// import styles from "./todaysDeal.module.css";
// import CountdownTimer from "../CountdownTimer/countdownTimer"; // Adjust the import path as necessary
// import image from '../Assets/img.png'       

// const TodaysDeal = () => {
//   const deal = {
//     title: "15% Off on Tandoori Snacks!",
//     description: "Enjoy sizzling flavors every Tuesday at Gokuls!",
//     imageUrl: image, // Replace with real image later
//     endTime: new Date().getTime() + 3600 * 1000, // Example: 1 hour remaining
//   };

//   return (
//     <div className={styles.todaysDeal}>
//       <div className={styles.imageContainer}>
//       <img src={deal.imageUrl} alt={deal.title} />
//       <div className={styles.description}>{deal.description}</div>
//       <div className={styles.OfferEndDate}>Valid Through: 10/05/2025</div>
//       </div>
//       <div className={styles.details}>
//         <div className={styles.title}>{deal.title}</div>
//        <div className={styles.timer}>
//         <CountdownTimer  endTime={deal.endTime} /></div>
//         <button className={styles.grabButton}>GRAB THE DEAL</button>
//       </div>
//     </div>
//   );
// };

// export default TodaysDeal;



import React, { useState, useEffect } from "react";
import styles from "./todaysDeal.module.css";
import CountdownTimer from "../CountdownTimer/countdownTimer"; // Adjust the import path as necessary
import noDeal from "../Assets/noDeal.png"; // Adjust the import path as necessary


const TodaysDeal = () => {
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/deals/active");
        const data = await response.json();

        if (data.success && data.todayDeal) {
          setDeal(data.todayDeal);
        } else {
          console.error("No active deal found.");
          setDeal(null);
        }
      } catch (error) {
        console.error("Error fetching deal:", error);
        setDeal(null);
      }
    };

    fetchDeal();
  }, []);

  return (
    <div className={styles.todaysDeal}>
      {deal ? (
        <>
          <div className={styles.imageContainer}>
            <img src={`data:image/png;base64,${deal.image}`} alt={deal.title} />
            <div className={styles.description}>{deal.description}</div>
            <div className={styles.OfferEndDate}>Valid Through: {new Date(deal.endTime).toLocaleDateString()}</div>
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{deal.title}</div>
            <div className={styles.timer}>
              <CountdownTimer endTime={new Date(deal.endTime).getTime()} />
            </div>
            <button className={styles.grabButton}>GRAB THE DEAL</button>
          </div>
        </>
      ) : (
        <img src={noDeal} className={styles.noDeal}/>
      )}
    </div>
  );
};

export default TodaysDeal;