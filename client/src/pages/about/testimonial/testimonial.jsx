import React from "react";
import styles from "./testimonial.module.css";
import star from "./assets/star.svg";
import divider from "./assets/divider.svg";
import stars from "./assets/stars.svg";

function Testimonial () {
    return(
        <div className={styles.container}>
            <div className={styles.containerleft}>
                <div className={styles.containerleftnumber}>4.9</div>
                <div className={styles.containerleftreviews}>Based on 500+ reviews</div>
                <div className={styles.containerleftrating}>
                    <div  className={styles.containerleftratingstar}>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                    </div>
                    <div  className={styles.containerleftratingbar}>
                        <div className={styles.containerleftratingbarfilled}></div>
                    </div>
                    <div  className={styles.containerleftratingpercentage}>95%</div>
                </div>
                <div className={styles.containerleftrating}>
                <div  className={styles.containerleftratingstar}>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                    </div>
                    <div  className={styles.containerleftratingbar}></div>
                    <div  className={styles.containerleftratingpercentage}>5%</div>
                </div>
                <div className={styles.containerleftrating}>
                <div  className={styles.containerleftratingstar}>
                        <img src={star}></img>
                        <img src={star}></img>
                        <img src={star}></img>
                    </div>
                    <div  className={styles.containerleftratingbar}></div>
                    <div  className={styles.containerleftratingpercentage}>0%</div>
                </div>
                <div className={styles.containerleftrating}>
                <div  className={styles.containerleftratingstar}>
                        <img src={star}></img>
                        <img src={star}></img>
                    </div>
                    <div  className={styles.containerleftratingbar}></div>
                    <div  className={styles.containerleftratingpercentage}>0%</div>
                </div>
                <div className={styles.containerleftrating}>
                <div  className={styles.containerleftratingstar}>
                        <img src={star}></img>
                    </div>
                    <div  className={styles.containerleftratingbar}></div>
                    <div  className={styles.containerleftratingpercentage}>0%</div>
                </div>
            </div>
            <div className={styles.containermiddle}>
                <img src={divider}></img>
            </div>
            <div className={styles.containerright}>
                <div className={styles.rightcontainertitle}>Client’s Testimonial</div>
                <div className={styles.containerrightstars}>
                    <img src={stars}></img>
                    <img src={stars}></img>
                    <img src={stars}></img>
                    <img src={stars}></img>
                    <img src={stars}></img>
                </div>
                <div className={styles.containerrighttext}>
                    “They are a healthier alternative to sweets, but still satisfy my craving for<br/>
                    something sweet and crunchy. Chilli garlic flavor pizza is my personal<br/>
                    favorite - it's so delicious!"
                </div>
                <div  className={styles.containerrightfrom}>
                Jiya Sinha - From<br/>Kurukshetra
                </div>
                <div className={styles.containerrighttabbar}>
                    <div className={styles.containerrighttabs}>
                        <div className={styles.containerrighttab}>
                            <div className={styles.containerrighttabcircle}></div>
                        </div>
                        <div className={styles.containerrighttab}>
                            <div className={styles.containerrighttabcircle}></div>
                        </div>
                        <div className={styles.containerrighttab}>
                            <div className={styles.containerrighttabcircle}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Testimonial;