// import React from "react";
// import styles from "./todaysDeal.module.css";
// import Header from "../../components/header/header";
// import Footer from "../../components/footer/footer";
// import TodayDeals from "./TodayDeals/todayDeals";
// import Timer from "./Timer/Timer/timer";
// import Deals from "./Deals/Deals/deals";
// import Filter from "./FilterSection/FilterSection/filterSection";
// const TodaysDeal = () => {
//     return (
//         <div>
//             <div className = {styles.header}>
//             < Header  />
//             </div>
//             <div className={styles.deals}>
//                 <Deals />   
//             </div>
//             <div className={styles.timer}>
//                 <Timer />
//             </div>

//             <div className={styles.mainContainer}>
//           <TodayDeals />
//             </div>
//             <div className={styles.Filter}>
//             <Filter/>
//             </div>

//             <div className={styles.footer}>
//             <Footer />
//             </div>

//         </div>
//       )
//     }
    
// export default TodaysDeal;

import React from "react";
import styles from "./todaysDeal.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import TodayDeals from "./TodayDeals/todayDeals";
import Timer from "./Timer/Timer/timer";
import Deals from "./Deals/Deals/deals";
import Filter from "./FilterSection/FilterSection/filterSection";
const TodaysDeal = () => {
    return (
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            
            <div className={styles.deals}>
                <Deals />
            </div>

            {/* Wrapping Timer, TodayDeals, and Filter in one container */}
            <div className={styles.mainContent}>
                <div className={styles.timer}>
                    <Timer />
                    <TodayDeals />
                </div>

               

                <div className={styles.filter}>
                    <Filter />
                </div>
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default TodaysDeal;
