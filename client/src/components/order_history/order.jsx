import React, { useState } from "react";
import styles from "./order.module.css";

const Order = ({ orderDataPage1, orderDataPage2, orderDataPage3 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentOrders = () => {
        switch (currentPage) {
            case 1:
                return orderDataPage1 ? orderDataPage1.slice(0, ordersPerPage) : [];
            case 2:
                return orderDataPage2 ? orderDataPage2.slice(0, ordersPerPage) : [];
            case 3:
                return orderDataPage3 ? orderDataPage3.slice(0, ordersPerPage) : [];
            default:
                return [];
        }
    };

    const currentOrders = getCurrentOrders();

    return (
        <div className={styles.order_history}>
            <div className={styles.order_history_container}>
                <div className={styles.order_history_container_upper}>
                    <div className={styles.order_history_container_upper_heading}>Order History</div>
                    {currentOrders.map((order, index) => (
                        <div key={index} className={styles.order_history_container_upper_container}>
                            <div className={styles.order_history_container_upper_container_left}>
                                <div className={styles.order_history_container_upper_container_left_top}>Ordered on: {order.date} ({order.items.length} items)</div>
                                <div className={styles.order_history_container_upper_container_left_bottom}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className={styles.order_history_container_upper_container_left_bottom_box}>
                                            <div className={styles.order_history_container_upper_container_left_bottom_box_img}>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className={styles.order_history_container_upper_container_left_bottom_box_text}>
                                                {item.name} ({item.quantity})
                                            </div>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className={styles.order_history_container_upper_container_left_bottom_box_more_items}>
                                            <img src={order.moreItems.image} alt="more items" />
                                            <span className={styles.order_history_container_upper_container_left_bottom_box_more_items_text}>{order.moreItems.text}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.order_history_container_upper_container_right}>
                                <div className={styles.order_history_container_upper_container_right_top}>
                                    <div className={styles.order_history_container_upper_container_right_top_heading}>Order Total</div>
                                    <div className={styles.order_history_container_upper_container_right_bottom_price}>₹ {order.total}</div>
                                </div>
                                <div className={styles.order_history_container_upper_container_right_bottom}>
                                    <button>Reorder</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.order_history_container_page_no}>
                    <div className={styles.order_history_container_page_no_1} onClick={() => handlePageChange(1)}>1</div>
                    <div className={styles.order_history_container_page_no_2} onClick={() => handlePageChange(2)}>2</div>
                    <div className={styles.order_history_container_page_no_3} onClick={() => handlePageChange(3)}>3</div>
                </div>
            </div>
        </div>
    );
};

export default Order;