import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/userContext"; 
import styles from "./header.module.css";
import logo from "./assets/images/Vector.svg";
import cart from "./assets/images/cart.svg";
import heart from "./assets/images/heart.svg";
import downarrow from "./assets/images/down_arrow.svg";
import userIcon from "./assets/images/userIcon.svg";
import logoutIcon from "./assets/images/exit.png";
import cx from "classnames";
const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Use user context
  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  const handleLogout = () => {
    // Clear user data from context and local storage
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };
  return (
    <header className={styles.header}>
      <div className={cx(styles.pointer, styles.left)}>
        <div className={styles.left_logo} onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={styles.middle}>
        <span
          className={styles.middle_about}
          onClick={() => navigate("/todaysDeal")}
        >
          Today's deal
        </span>
        <span
          className={styles.middle_todays_deals}
          onClick={() => navigate("/products")}
        >
          TakeAway{" "}
        </span>
        {/*
         <span
          className={styles.middle_products}
          onClick={() => navigate("/products")}
        >
          Products
        </span> */}
        <span className={styles.about} onClick={() => navigate("/banquets")}>
          Banquet Hall
        </span>
        <span className={styles.about} onClick={() => navigate("/giftbox")}>
          Gift Boxes
        </span>
        <span className={styles.about} onClick={() => navigate("/bulkOrders")}>
          Bulk Order
        </span>
        <span className={styles.contact} onClick={() => navigate("/contact")}>
          Contact
        </span>
      </div>
      <div className={styles.right}>
        <div className={styles.right_cart}>
          <img src={cart} alt="cart" onClick={() => navigate("/basket")} />
        </div>
        <div className={styles.right_heart}>
          <img src={heart} alt="heart" onClick={() => navigate("/wishlist")} />
        </div>
        <div className={styles.right_image}>
          {user?.profilePic ? (
            <img
              className={styles.profilePicc}
              src={`data:image/jpeg;base64,${user.profilePic}`}
              alt="user"
            />
          ) : (
            <img src={userIcon} alt="user" />
          )}
        </div>
        <div className={styles.right_user} onClick={handleUserClick}>
          {user ? user.name : "Login"}
        </div>
        {user && (  
          <>
            <div className={styles.right_downarrow} onClick={() => navigate("/profile")}>
              <img src={downarrow} alt="downarrow" />
            </div>
            <div className={styles.right_logout} onClick={handleLogout}>
              <img src={logoutIcon} alt="Logout" />
              <span className={styles.logout_text}>Logout</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;