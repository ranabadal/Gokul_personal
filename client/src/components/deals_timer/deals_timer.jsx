// import React from "react";
// import styles from "./deals_timer.module.css";
// import Dishcard from "../dish_card/dish_card";
// import { CountdownTimer } from "../hero_section/hero_section";


// const DealsTimer = () => {
//     return (
//         <div className={styles.deals_timer_container}>
//             <div className={styles.deals_timer_container_left}>
//                 <div className={styles.deals_timer_heading}>Today’s Deal Ends in</div>
//                 <div className={styles.deals_timer}>  <CountdownTimer /> </div>
//                 <div className={styles.deals_timer_button}>
//                     <button>Check Out Now !!</button>
//                 </div>
//             </div>
//             <div className={styles.deals_timer_container_right}>
//                 <div className={styles.deals_timer_container_right_top}>
//                     <div className={styles.deals_timer_container_right_top_left}><Dishcard /></div>
//                     <div className={styles.deals_timer_container_right_top_right}><Dishcard /></div>
//                 </div>
//                 <div className={styles.deals_timer_container_right_bottom}>
//                     <div className={styles.deals_timer_container_right_bottom_left}><Dishcard /></div>
//                     <div className={styles.deals_timer_container_right_bottom_right}><Dishcard /></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DealsTimer;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import styles from "./deals_timer.module.css";
import { CountdownTimer } from "../hero_section/hero_section";
import noDeal from "./Assets/noDeal.png";
import Loader from "../../components/Loader/loader5/loader5";
const DealsTimer = () => {
  const [deal, setDeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [endTime, setEndTime] = useState(null);

  const navigate = useNavigate(); // ✅ Initialize navigation function

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/deals/active");
        const data = await response.json();

        if (data.success && data.todayDeal) {
          setDeal(data.todayDeal);
          setEndTime(new Date(data.todayDeal.endTime).getTime());
        } else {
          setDeal(null);
          setEndTime(null);
        }
      } catch (error) {
        console.error("Error fetching deal:", error);
        setDeal(null);
        setEndTime(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeal();
  }, []);

  const handleCheckoutClick = () => {
    if (deal) {
      navigate("/todaysDeal"); // ✅ Navigate to the Today's Deal page
    }
  };

  return (
    <div className={styles.deals_timer_container}>
      <div className={styles.deals_timer_container_left}>
        <div className={styles.deals_timer_heading}>
          {deal ? "Today’s Deal Ends in" : "No Active Deal"}
        </div>
        <div className={styles.deals_timer}>
          {deal ? <CountdownTimer endTime={endTime} /> : <p className={styles.noDealMessage}>Check back later for new deals!</p>}
        </div>
        <div className={styles.deals_timer_button}>
          <button disabled={!deal} onClick={handleCheckoutClick} >Check Out Now !!</button> {/* ✅ Add navigation */}
        </div>
      </div>

      <div className={styles.deals_timer_container_right}>
        {isLoading ? (
          <Loader />
        ) : deal ? (
          <div className={styles.imageContainer}>
            <img src={`data:image/png;base64,${deal.image}`} alt={deal.title} className={styles.dealImage} />
          </div>
        ) : (
          // <div className={styles.noDealContainer}>
          <div className={styles.noDeal}>
            <img src={noDeal} alt="No Deal Today" />
          </div>
          // </div>

        )}
      </div>
    </div>
  );
};

export default DealsTimer;