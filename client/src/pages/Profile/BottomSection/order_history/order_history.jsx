// import React from "react";
// import styles from "./order_history.module.css";
// import AboveHeader from "../../../../components/above_header/above_header";
// import Header from "../../../../components/header/header";
// import BelowHeader from "../../../../components/below_header/below_header";
// import Order from "../../../../components/order_history/order";
// import Footer from "../../../../components/footer/footer";
// import pizza from "./assets/pizza.svg";
// import dosa from "./assets/dosa.svg";

// const orderData = [
//     {
//         date: "27 Feb 2024",
//         items: [
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "5+ Items" },
//         total: 1500
//     },
//     {
//         date: "27 Feb 2024",
//         items: [
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "5+ Items" },
//         total: 1500
//     },
//     {
//         date: "27 Feb 2024",
//         items: [
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza },
//             { name: "Matar Paneer", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "5+ Items" },
//         total: 1500
//     },
//     // Add more orders as needed
// ];

// const orderDataPage2 = [
//     {
//         date: "28 Feb 2024",
//         items: [
//             { name: "Butter Chicken", quantity: 1, image: pizza },
//             { name: "Garlic Naan", quantity: 3, image: pizza },
//             { name: "Garlic Naan", quantity: 3, image: pizza },
//         ],
//         moreItems: { image: dosa, text: "2+ Items" },
//         total: 1200
//     },{
//         date: "28 Feb 2024",
//         items: [
//             { name: "Butter Chicken", quantity: 1, image: pizza },
//             { name: "Garlic Naan", quantity: 3, image: pizza },
//             { name: "Garlic Naan", quantity: 3, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "2+ Items" },
//         total: 1200
//     },{
//         date: "28 Feb 2024",
//         items: [
//             { name: "Butter Chicken", quantity: 1, image: pizza },
//             { name: "Garlic Naan", quantity: 3, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "2+ Items" },
//         total: 1200
//     },
//     // Add more orders as needed
// ];

// const orderDataPage3 = [
//     {
//         date: "1 Mar 2024",
//         items: [
//             { name: "Paneer Tikka", quantity: 2, image: pizza },
//             { name: "Lassi", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "3+ Items" },
//         total: 1000
//     },{
//         date: "1 Mar 2024",
//         items: [
//             { name: "Paneer Tikka", quantity: 2, image: pizza },
//             { name: "Lassi", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "3+ Items" },
//         total: 1000
//     },{
//         date: "1 Mar 2024",
//         items: [
//             { name: "Paneer Tikka", quantity: 2, image: pizza },
//             { name: "Lassi", quantity: 2, image: pizza }
//         ],
//         moreItems: { image: dosa, text: "3+ Items" },
//         total: 1000
//     },
//     // Add more orders as needed
// ];

// const OrderHistory = () => {
//     return (
//         <div className={styles.order_history}>

//             <div className={styles.order_history_container}>
//                 <Order 
//                     orderDataPage1={orderData || []} 
//                     orderDataPage2={orderDataPage2 || []} 
//                     orderDataPage3={orderDataPage3 || []} 
//                 />
//             </div>
//         </div>
//     );
// };

// export default OrderHistory;




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
