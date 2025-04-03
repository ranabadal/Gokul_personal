


import React, { useState } from "react";
import styles from "./order_history.module.css";
import TakeAwayHistory from "./TakeAwayHistory/takeAwayHistory";
import GiftBoxesHistory from "./GiftBoxesHistory/giftBoxesHistory";
import BulkOrderHistory from "./BulkOrderHistory/bulkOrderHistory";

const OrderHistory = () => {
    const [activePage, setActivePage] = useState("takeaway");

    // Function to dynamically render selected page
    const renderPage = () => {
        switch (activePage) {
            case "takeaway":
                return <TakeAwayHistory />;
            case "giftboxes":
                return <GiftBoxesHistory />;
            case "bulkorder":
                return <BulkOrderHistory />;
            default:
                return <TakeAwayHistory />;
        }
    };

    return (
        <div className={styles.order_history}>
            <div className={styles.container}>
                {/* Left Section: Sidebar Navigation */}
                <div className={styles.sidebar}>
                    <button 
                        className={activePage === "takeaway" ? styles.active : ""}
                        onClick={() => setActivePage("takeaway")}>
                        Take Away History
                    </button>
                    <button 
                        className={activePage === "giftboxes" ? styles.active : ""}
                        onClick={() => setActivePage("giftboxes")}>
                        GiftBoxes History
                    </button>
                    <button 
                        className={activePage === "bulkorder" ? styles.active : ""}
                        onClick={() => setActivePage("bulkorder")}>
                        Bulk Order History
                    </button>
                </div>

                {/* Right Section: Dynamic History Content */}
                <div className={styles.content}>
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
