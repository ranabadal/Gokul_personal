// import React, { useState } from "react";
// import styles from "./dealCard.module.css";

// const DealCard = ({ deal }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <div className={styles.dealCard}>
//         <img src={deal.imageUrl} alt={deal.title} onClick={openModal} className={styles.thumbnail} />
//         <h3>{deal.title}</h3>
//         {deal.startTime && <p>Starts on: {deal.startTime}</p>}
//       </div>

//       {/* Full-Screen Image Modal */}
//       {isModalOpen && (
//         <div className={styles.modal} onClick={closeModal}>
//           <img src={deal.imageUrl} alt={deal.title} className={styles.fullscreenImage} />
//           <button className={styles.closeButton} onClick={closeModal}>&#10006;</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default DealCard;



import React, { useState } from "react";
import styles from "./dealCard.module.css";

const DealCard = ({ deal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.dealCard}>
        <img src={`data:image/png;base64,${deal.image}`} alt={deal.title} onClick={openModal} className={styles.thumbnail} />
        <h3>{deal.title}</h3>

        {/* {deal.startTime && <p>Starts on: {deal.startTime}</p>} */}
        <div className={styles.startTime}>
  <strong>Starts On:</strong> {new Date(deal.startTime).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
</div>
<div className={styles.expiredText}>
  <strong>Ends On:</strong> {new Date(deal.endTime).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
</div>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <img src={`data:image/png;base64,${deal.image}`} alt={deal.title} className={styles.fullscreenImage} />
          <button className={styles.closeButton} onClick={closeModal}>&#10006;</button>
        </div>
      )}
    </>
  );
};

export default DealCard;