import React, { useState } from "react";
import styles from "./boking_history.module.css";
import AboveHeader from "../../../../components/above_header/above_header";
import Header from "../../../../components/header/header";
import BelowHeader from "../../../../components/below_header/below_header";
import Footer from "../../../../components/footer/footer";
import Boking from "../../../../components/boking/boking";

const Boking_history = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const bookingDataPage1 = [
        {
            date: "27 Feb 2024",
            duration: "2 days",
            hall: "Gokul Hall 1",
            seating: "20 Seating",
            price: "₹14959",
        },
        {
            date: "26 Feb 2024",
            duration: "1 day",
            hall: "Gokul Hall 1",
            seating: "15 Seating",
            price: "₹12959",
        },
    ];

    const bookingDataPage2 = [
        {
            date: "28 Feb 2024",
            duration: "3 days",
            hall: "Gokul Hall 2",
            seating: "30 Seating",
            price: "₹19959",
        },
        {
            date: "27 Feb 2024",
            duration: "2 days",
            hall: "Gokul Hall 2",
            seating: "25 Seating",
            price: "₹17959",
        },
    ];

    const bookingDataPage3 = [
        {
            date: "1 Mar 2024",
            duration: "1 day",
            hall: "Gokul Hall 3",
            seating: "50 Seating",
            price: "₹24959",
        },
        {
            date: "28 Feb 2024",
            duration: "3 days",
            hall: "Gokul Hall 3",
            seating: "40 Seating",
            price: "₹22959",
        },
    ];

    const combinedBookingData = [...bookingDataPage1, ...bookingDataPage2, ...bookingDataPage3];

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.boking_history}>
           
            <div className={styles.boking_history_container}>
                <Boking  />
            </div>
          

        </div>
    );
};

export default Boking_history;