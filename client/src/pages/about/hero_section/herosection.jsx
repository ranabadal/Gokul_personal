// import react from "react";
// import styles from "./herosection.module.css";
// import Pic from "./assets/pic.png";

// function Hero_Section() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.containertitle}>
//        About Gokul's
//       </div>
//       <div className={styles.containercontent}>
//         <div className={styles.containercontentleft}>
//           <img src={Pic}></img>
//         </div>
//         <div className={styles.containercontentright}>
//           <div className={styles.containercontentrighttext}>
//             <p>
//               🍽️ Gokul's Sweets & Fast Food – Ambala Gokul's is a popular spot
//               in Ambala known for its mouthwatering Indian sweets and a variety
//               of fast food options. From sponge rasgullas to crispy Manchurian
//               and South Indian delicacies, it’s a go-to place for foodies. With
//               outlets in Mahesh Nagar and near Congress Bhawan, it's loved for
//               its taste, hygiene, and quick service.
//             </p>
//           </div>
//           <div className={styles.containercontentrightbtn}>
//             <button className={styles.orderbutton}>Order Now</button>
//             <button className={styles.explorebutton}>Explore More</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Hero_Section;


import React from "react";
import styles from "./herosection.module.css";

function Hero_Section({ img, title, desc }) {
  return (
    <div className={styles.container}>
      <div className={styles.containertitle}>
        {title} {/* Dynamically pass title */}
      </div>
      <div className={styles.containercontent}>
        <div className={styles.containercontentleft}>
          <img src={img} alt={title} /> {/* Dynamically pass img */}
        </div>
        <div className={styles.containercontentright}>
          <div className={styles.containercontentrighttext}>
            <p>{desc}</p> {/* Dynamically pass desc */}
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Hero_Section;