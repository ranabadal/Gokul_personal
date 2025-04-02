import React from "react";
import styles from "./below_header.module.css";

const BelowHeader = () => {
    return (
        <div className={styles.below_header}>
            <div className={styles.below_header_container}>
                <div className={styles.below_header_container_name}>Update Profile</div>
                <div className={styles.below_header_container_name}>Manage Address</div>
                <div className={styles.below_header_container_name}>My Orders</div>
                <div className={styles.below_header_container_name}>My Bookings</div>
                <div className={styles.below_header_container_name}>Change Password</div>

            </div>
        </div>
    );
};  

export default BelowHeader;