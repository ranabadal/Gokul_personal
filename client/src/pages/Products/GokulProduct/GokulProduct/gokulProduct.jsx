import React from 'react';
import styles from "../GokulProduct/gokulProduct.module.css";

function GokulProduct() {
    return (
        <div className={styles.searchcontainer}>
            <h1>Gokul <span>Products</span></h1>
            
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

export default GokulProduct;
