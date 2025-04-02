import react from "react";
import styles from "./searchBar.module.css";

function SearchBar () {
    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBarTitle}>
                <div className={styles.searchBarTitle1}>Product</div>
                <div className={styles.searchBarTitle2}>Details</div>
            </div>
            <div className={styles.searchBarSpace}>
                <div className={styles.searchBarSpaceText}>
                    <span>Search for products</span>
                </div>
                <div className={styles.searchBarSpaceBtn}>
                    <span>SEARCH</span>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;