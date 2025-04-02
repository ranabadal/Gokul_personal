// import React from "react";
// import styles from "./filter.module.css";
// const Filterchip = () => {
//   return (
//     <div className={styles.filtersection}>
//         <div className={styles.filters}>
//           <div className={styles.filterCards}>
//             <div className={styles.filterCardschip}>All</div>
//             <div className={styles.filterCardschip1}>Small (500 gm)</div>
//             <div className={styles.filterCardschip2}>Medium (1 kg)</div>
//             <div className={styles.filterCardschip3}>Large (2 kg)</div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Filterchip;


import React from "react";
import styles from "./filter.module.css";

const FilterChip = ({ label, isActive, onClick }) => {
  // Map specific labels to the corresponding class
  let chipClass = styles.filterCardschip;
  if (label === "Small (500 gm)") {
    chipClass = styles.filterCardschip1;
  } else if (label === "Medium (1 kg)") {
    chipClass = styles.filterCardschip2;
  } else if (label === "Large (2 kg)") {
    chipClass = styles.filterCardschip3;
  }
  return (
    <div
      className={`${chipClass} ${isActive ? styles.active : ""}`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

export default FilterChip;