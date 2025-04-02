import React from "react";
import styles from "./bulkOrder.module.css";
import sweet from "./assets/sweet.svg";

const BulkOrder = () => {
    return (
        <div className={styles.bulk_order_container}>
            <div className={styles.bulk_order_container_left}>
                <div className={styles.bulk_order_container_left_heading}>
                Upto 30% off on Bulk Orders !
                </div>
                <div className={styles.bulk_order_container_left_btn}>
                    <div className={styles.bulk_order_container_left_btn_left}>
                        <button>Order Now</button>
                    </div>
                    <div className={styles.bulk_order_container_left_btn_right}>
                        <button>Explore More</button>
                    </div>
                </div>
            </div>
            <div className={styles.bulk_order_container_right}>
                <img src={sweet} alt="sweet" />
            </div>
        </div>
    );
};

export default BulkOrder;