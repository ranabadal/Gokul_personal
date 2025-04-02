import react from "react";
import styles from "./herosection.module.css";
import Pic from "./assets/pic.png";

function Hero_Section () {
    return(
        <div className={styles.container}>
            <div className={styles.containertitle}>
            Where Sweetness Meets Celebration
            </div>
            <div className={styles.containercontent}>
                <div className={styles.containercontentleft}>
                    <img src={Pic} ></img>
                </div>
                <div className={styles.containercontentright}>
                    <div className={styles.containercontentrighttext}>
                    <p>At Gokul’s, we believe that every moment of joy<br/>
                    deserves to be cherished with something sweet and<br/>
                    celebrated in a memorable way. Whether it's a family<br/>
                    gathering, a grand wedding, or a simple indulgence,<br/>
                    we bring you the finest handcrafted sweets and an<br/>
                    elegant banquet hall to make your special occasions<br/>
                    truly unforgettable.
                    </p>
                    </div>
                    <div className={styles.containercontentrightbtn}>
                        <button className={styles.orderbutton}>Order Now</button>
                        <button className={styles.explorebutton}>Explore More</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Hero_Section;