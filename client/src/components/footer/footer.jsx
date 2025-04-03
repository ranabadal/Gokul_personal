import React from "react";
import styles from "./footer.module.css";
import logo from "./assets/gokul logo.svg";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_content_top}>
          <div className={styles.footer_content_top_left}>
            <span className={styles.footer_content_top_left_text}>
              <span className={styles.footer_content_top_left_text_title}>
                Subscribe to our newsletter
              </span>
              <span className={styles.footer_content_top_left_text_description}>
                Get updates on upcoming sale, offers and discounts.
              </span>
            </span>
          </div>
          <div className={styles.footer_content_top_right}>
            {/* <div className={styles.footer_content_top_right_logo}>
                            <img src={logo} alt="logo" />
                        </div>  */}
            <div className={styles.footer_content_top_right_gokul}>
              {/* <div className={styles.footer_content_top_right_logo}> */}
                <img src={logo} alt="logo" />
              {/* </div>{" "} */}
            </div>
          </div>
        </div>

        <div className={styles.footer_content_serachbar}>
          <div className={styles.footer_content_serachbar_input}>
            <input type="text" placeholder="Your email address" />
          </div>
          <div className={styles.footer_content_serachbar_button}>
            <button>SUBSCRIBE</button>
          </div>
        </div>

        <div className={styles.footer_content_bottom}>
          <div className={styles.footer_content_bottom_line}>
            <span className={styles.footer_content_bottom_line_title}>
              Policy Info
            </span>
            <p>Terms & Conditions</p>
            <p>Privacy policy</p>
            <p>Terms of Use</p>
            <p>Disclaimer</p>
          </div>
          <div className={styles.footer_content_bottom_line}>
            <span className={styles.footer_content_bottom_line_title}>
              About Us
            </span>
            <p>About Us</p>
            <p>Our Team</p>
            <p>Testimonials</p>
            <p>Upcoming Products</p>
          </div>
          <div className={styles.footer_content_bottom_line}>
            <span className={styles.footer_content_bottom_line_title}>
              Business
            </span>
            <p>Franchise</p>
            <p>Stores</p>
            <p>Decoration Service</p>
            <p>Gifts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
