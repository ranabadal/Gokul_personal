import React, { useState } from "react";
import styles from "./boking_history.module.css";
import AboveHeader from "../../../../components/above_header/above_header";
import Header from "../../../../components/header/header";
import BelowHeader from "../../../../components/below_header/below_header";
import Footer from "../../../../components/footer/footer";
import Boking from "../../../../components/boking/boking";


const Boking_history = () => {
   

    return (
        <div className={styles.boking_history}>
           
            <div className={styles.boking_history_container}>
                <Boking  />
            </div>
          

        </div>
    );
};

export default Boking_history;