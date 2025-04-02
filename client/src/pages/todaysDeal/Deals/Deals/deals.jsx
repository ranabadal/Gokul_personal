import React from 'react';
import styles from "./deals.module.css";

function Deals() {
    return (
        <div className={styles.searchcontainer}>
            <h1>Today's <span>Deal</span></h1>
            
            {/* Search bar wrapper to position button inside */}
            <div className={styles.searchbar}>
                <input 
                    type="text" 
                    className={styles.searchinput} 
                    placeholder="Search for products" 
                />
                <button className={styles.searchbutton}>SEARCH</button>
            </div>
        </div>
    );
}

export default Deals;
