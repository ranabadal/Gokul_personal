// import React from "react";
// import styles from "./footer.module.css";
// import gokul from "./assets/gokul.svg";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();
//   const handleMenuItemClick = (path) => {
//     navigate(path);
//   };
//   return (
//     <div className={styles.footer}>
//       <div className={styles.footer_content}>
//         <div className={styles.footer_content_top}>
//           <div className={styles.footer_content_top_left}>
//             <span className={styles.footer_content_top_left_text}>
//               <span className={styles.footer_content_top_left_text_title}>
//                 Connect with us on social media
//               </span>
//               <div className={styles.footer_content_top_left_icons}>
//                 <a
//                   href="https://www.facebook.com/merogokul/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaFacebook />
//                 </a>
//                 {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
//                 <a
//                   href="https://www.instagram.com/new_gokulsweets/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaInstagram />
//                 </a>
//                 {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                                     <FaLinkedin />
//                                 </a> */}
//               </div>
//             </span>
//           </div>
//           <div className={styles.footer_content_top_right}>
//             <div className={styles.footer_content_top_right_logo}>
              // <img src={gokul} alt="logo" />
//             </div>
//           </div>
//         </div>
//         {/* Newsletter section is commented out */}
//         <div className={styles.footer_content_bottom}>
//           <div className={styles.footer_content_bottom_line}>
//             <span className={styles.footer_content_bottom_line_title}>
//               Policy Info
//             </span>
//             <p>Terms & Conditions</p>
//             <p>Privacy policy</p>
//             <p>Terms of Use</p>
//             {/* <p>Disclaimer</p> */}
//           </div>
//           <div className={styles.footer_content_bottom_line}>
//             <span className={styles.footer_content_bottom_line_title}>
//               Business
//             </span>
//             {/* <p>Franchise</p> */}
//             <p>Stores</p>
//             <p>Decorations Service</p>
//             <p>Gifts</p>
//           </div>
//           <div className={styles.footer_content_bottom_line}>
//             <span
//               className={styles.footer_content_bottom_line_title}
//               onClick={() => handleMenuItemClick("/about")}
//             >
//               About Us
//             </span>
//             <p onClick={() => handleMenuItemClick("/about")}>About Us</p>
//             <p>Our Teams</p>
//             {/* <p>Testimonials</p> */}
//             <p>Upcoming Products</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Footer;

import React from "react";
import styles from "./footer.module.css";
import gokul from "./assets/gokul.svg";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.left}>
          {/* <h2 className={styles.logo}>Gokul</h2> */}
   

          {/* <img  src={gokul} alt="logo" /> */}

          <ul className={styles.navLinks}>
          <li>About Gokul</li>
          <li>      Policy Info
</li>
          <li>Upcoming Products</li>
          <li>Gifts</li>
          <li>Foodservice</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          <ul className={styles.policyLinks}>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>CA Transparency in Supply Chains Act</li>
          </ul>
          <p className={styles.copyright}>
            ©2025 Gokul, LLC. All Rights Reserved.
          </p>
        </div>
        <div className={styles.socialIcons}>
          <FaYoutube />
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaPinterestP />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
