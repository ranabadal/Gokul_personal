import React from "react";
import styles from "./loginIn.module.css";
import above_header from "../../components/above_header/above_header";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import LoginPopup from "./LoginPopup/loginPopup";
const LoginIn = () =>{
return ( 
    <div>
    <div className={styles.header}>

  <Header />
  
    </div>
    <div className={styles.popup}>
    <LoginPopup />
    </div>
    <div className={styles.Footer}>
        <Footer />
    </div>
    </div>
);
}
export default LoginIn; 
