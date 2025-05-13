import React from "react";
import styles from "./above_header.module.css";

const AboveHeader = () => {

    const[offfer, setOffer] = React.useState(true);

    return(
        <>
        <header className={styles.above_header}>
            { <div className={styles.above_header_content}>
                {offfer ? "10% Discount for Wedding this month" : "Free" }
            </div> }
        </header>
        </>
    );
};

export default AboveHeader;