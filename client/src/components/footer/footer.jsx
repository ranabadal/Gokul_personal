// import React from "react";
// import styles from "./footer.module.css";
// import logo from "./assets/gokul logo.svg";
// const Footer = () => {
//   return (
//     <div className={styles.footer}>
//       <div className={styles.footer_content}>
//         <div className={styles.footer_content_top}>
//           <div className={styles.footer_content_top_left}>
//             <span className={styles.footer_content_top_left_text}>
//               <span className={styles.footer_content_top_left_text_title}>
//                 Subscribe to our newsletter
//               </span>
//               <span className={styles.footer_content_top_left_text_description}>
//                 Get updates on upcoming sale, offers and discounts.
//               </span>
//             </span>
//           </div>
//           <div className={styles.footer_content_top_right}>
//             {/* <div className={styles.footer_content_top_right_logo}>
//                             <img src={logo} alt="logo" />
//                         </div>  */}
//             <div className={styles.footer_content_top_right_gokul}>
//               {/* <div className={styles.footer_content_top_right_logo}> */}
//                 <img src={logo} alt="logo" />
//               {/* </div>{" "} */}
//             </div>
//           </div>
//         </div>
//         <div className={styles.footer_content_serachbar}>
//           <div className={styles.footer_content_serachbar_input}>
//             <input type="text" placeholder="Your email address" />
//           </div>
//           <div className={styles.footer_content_serachbar_button}>
//             <button>SUBSCRIBE</button>
//           </div>
//         </div>
//         <div className={styles.footer_content_bottom}>
//           <div className={styles.footer_content_bottom_line}>
//             <span className={styles.footer_content_bottom_line_title}>
//               Policy Info
//             </span>
//             <p>Terms & Conditions</p>
//             <p>Privacy policy</p>
//             <p>Terms of Use</p>
//             <p>Disclaimer</p>
//           </div>
//           <div className={styles.footer_content_bottom_line}>
//             <span className={styles.footer_content_bottom_line_title}>
//               About Us
//             </span>
//             <p>About Us</p>
//             <p>Our Team</p>
//             <p>Testimonials</p>
//             <p>Upcoming Products</p>
//           </div>
//           <div className={styles.footer_content_bottom_line}>
//             <span className={styles.footer_content_bottom_line_title}>
//               Business
//             </span>
//             <p>Franchise</p>
//             <p>Stores</p>
//             <p>Decoration Service</p>
//             <p>Gifts</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Footer;

// import React from "react";
// import styles from "./footer.module.css";
// import gokul from "./assets/gokul.svg";
// import socialConnect from "../../pages/Contact/SocialConnect/socialConnect";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// const Footer = () => {
// const navigate = useNavigate();
// return (
// <div className={styles.footer}>
//             <div className={styles.footer_content}>
//                 <div className={styles.footer_content_top}>
//                     <div className={styles.footer_content_top_left}>
//                         <span className={styles.footer_content_top_left_text}>
//                             <span className={styles.footer_content_top_left_text_title}>
//                                 Connect with us on social media
//                             </span>
//                             <div className={styles.footer_content_top_left_icons}>
//                                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                                     <FaFacebook />
//                                 </a>
//                                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                                     <FaTwitter />
//                                 </a>
//                                 <a href="#" target="_blank" rel="noopener noreferrer">
//                                     <FaInstagram />
//                                 </a>
//                                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                                     <FaLinkedin />
//                                 </a>
//                             </div>
//                         </span>
//                     </div>
//                     <div className={styles.footer_content_top_right}>
//                         <div className={styles.footer_content_top_right_logo}>
//                             <img src={gokul} alt="logo" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* <div className={styles.footer_content_serachbar}>
//                     <div className={styles.footer_content_serachbar_input}>
//                         <input type="text" placeholder="Your email address" />
//                     </div>
//                     <div className={styles.footer_content_serachbar_button}>
//                         <button>SUBSCRIBE</button>
//                     </div>
//                 </div> */}

//                 <div className={styles.footer_content_bottom}>
//                     <div className={styles.footer_content_bottom_line}>
//                             <span className={styles.footer_content_bottom_line_title}>Policy Info</span>
//                             <p>Terms & Conditions</p>
//                             <p>Privacy policy</p>
//                             <p>Terms of Use</p>
//                             <p>Disclaimer</p>
//                     </div>
//                     <div className={styles.footer_content_bottom_line}>
//                             <span className={styles.footer_content_bottom_line_title}>Business</span>
//                             <p>Franchise</p>
//                             <p>Stores</p>
//                             <p>Decorations Service</p>
//                             <p>Gifts</p>
//                     </div>
//                     <div className={styles.footer_content_bottom_line}>
//                             <span className={styles.footer_content_bottom_line_title}>About Us</span>
//                             <p onClick={() => handleMenuItemClick("/about")}>About Us</p>
//                             <p>Our Teams</p>
//                             <p>Testimonials</p>
//                             <p>Upcoming Products</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Footer;

// import React from "react";
// import styles from "./footer.module.css";
// import gokul from "./assets/gokul.svg";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// const Footer = () => {
// const navigate = useNavigate();
// const handleMenuItemClick = (path) => { navigate(path);};
// return (
// <div className={styles.footer}>
// <div className={styles.footer_content}>
// <div className={styles.footer_content_top}>
// <div className={styles.footer_content_top_left}>
// <span className={styles.footer_content_top_left_text}>
// <span className={styles.footer_content_top_left_text_title}>
// Connect with us on social media
// </span>
// <div className={styles.footer_content_top_left_icons}>
// <a
// href="https://facebook.com"
// target="_blank"
// rel="noopener noreferrer"
// >
// <FaFacebook />
// </a>
// {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
// <a href="https://www.instagram.com/new_gokulsweets?igsh=OGQyZWh2ZDkzM2c2" target="_blank" rel="noopener noreferrer" >
// <FaInstagram />
// </a>
//                 {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                                     <FaLinkedin />
//                                 </a> */}
//               </div>
//             </span>
//           </div>
//           <div className={styles.footer_content_top_right}>
//             <div className={styles.footer_content_top_right_logo}>
//               <img src={gokul} alt="logo" />
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
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleMenuItemClick = (path) => {
    navigate(path);
  };
  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_content_top}>
          <div className={styles.footer_content_top_left}>
            <span className={styles.footer_content_top_left_text}>
              <span className={styles.footer_content_top_left_text_title}>
                Connect with us on social media
              </span>
              <div className={styles.footer_content_top_left_icons}>
                <a
                  href="https://www.facebook.com/merogokul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
                <a
                  href="https://www.instagram.com/new_gokulsweets/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a> */}
              </div>
            </span>
          </div>
          <div className={styles.footer_content_top_right}>
            <div className={styles.footer_content_top_right_logo}>
              <img src={gokul} alt="logo" />
            </div>
          </div>
        </div>
        {/* Newsletter section is commented out */}
        <div className={styles.footer_content_bottom}>
          <div className={styles.footer_content_bottom_line}>
            <span className={styles.footer_content_bottom_line_title}>
              Policy Info
            </span>
            <p>Terms & Conditions</p>
            <p>Privacy policy</p>
            <p>Terms of Use</p>
            {/* <p>Disclaimer</p> */}
          </div>
          <div className={styles.footer_content_bottom_line}>
            <span className={styles.footer_content_bottom_line_title}>
              Business
            </span>
            {/* <p>Franchise</p> */}
            <p>Stores</p>
            <p>Decorations Service</p>
            <p>Gifts</p>
          </div>
          <div className={styles.footer_content_bottom_line}>
            <span
              className={styles.footer_content_bottom_line_title}
              onClick={() => handleMenuItemClick("/about")}
            >
              About Us
            </span>
            <p onClick={() => handleMenuItemClick("/about")}>About Us</p>
            <p>Our Teams</p>
            {/* <p>Testimonials</p> */}
            <p>Upcoming Products</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
