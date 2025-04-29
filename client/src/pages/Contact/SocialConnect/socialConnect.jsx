// import React from 'react';
// import ContactLine from './Assets/contactLine.svg';
// import styles from './socialConnect.module.css';
// import icon1 from './Assets/icon1.png';
// import icon2 from './Assets/icon2.svg';
// import icon3 from './Assets/icon3.svg';
// import icon4 from './Assets/icon4.svg';
// import snapIcon from './Assets/snapIcon.png';


// const socialConnect = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.upperDiv}>
//     <img src={ContactLine} alt="Contact Line" className={styles.line}/>
//     <div className={styles.upperDivText}>Connect with us on</div>
//     <img src={ContactLine} alt="Contact Line" className={styles.line}/>
//       </div>
//       <div className={styles.lowerDiv}>
//             <img src={icon1} alt="icon"   href="https://facebook.com"
//                   target="_blank" className={styles.icons}/>
//             {/* <img src={snapIcon} alt="icon" className={styles.icons}/> */}
//             {/* <img src={icon3} alt="icon" className={styles.icons}/> */}
//             <img src={icon4} alt="icon" href="https://www.instagram.com/new_gokulsweets?igsh=OGQyZWh2ZDkzM2c2"
//                   target="_blank" className={styles.icons}/>
//       </div>
//     </div>
//   )
// }

// export default socialConnect


import React from 'react';
import ContactLine from './Assets/contactLine.svg';
import styles from './socialConnect.module.css';
import icon1 from './Assets/icon1.png';
import icon4 from './Assets/icon4.svg';

const SocialConnect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upperDiv}>
        <img src={ContactLine} alt="Contact Line" className={styles.line} />
        <div className={styles.upperDivText}>Connect with us on</div>
        <img src={ContactLine} alt="Contact Line" className={styles.line} />
      </div>

      <div className={styles.lowerDiv}>
        {/* ✅ Wrap images in `<a>` tags */}
        <a href="https://www.facebook.com/merogokul/" target="_blank" rel="noopener noreferrer">
          <img src={icon1} alt="Facebook" className={styles.icons} />
        </a>

        <a href="https://www.instagram.com/new_gokulsweets/" 
           target="_blank" rel="noopener noreferrer">
          <img src={icon4} alt="Instagram" className={styles.icons} />
        </a>
      </div>
    </div>
  );
};

export default SocialConnect;