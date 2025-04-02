import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";

const CountdownTimer = ({ durationInSeconds = 3600 }) => {
  const [timer, setTimer] = useState(durationInSeconds);

  useEffect(() => {
    if (timer <= 0) return; // Stop if timer is 0

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop when 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Convert time
  const hours = String(Math.floor((timer % (24 * 60 * 60)) / (60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timer % (60 * 60)) / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <div className={styles.countdown}>
      <h2 className={styles.Diwali}>Today’s Deal Ends in</h2> 
      <div className={styles.countdownTimer}>
        <span className={styles.countdownElement}>{hours[0]}</span>
        <span className={styles.countdownElement}>{hours[1]}</span>
        <span className={styles.countdownElement1}>:</span>
        <span className={styles.countdownElement}>{minutes[0]}</span>
        <span className={styles.countdownElement}>{minutes[1]}</span>
        <span className={styles.countdownElement1}>:</span>
        <span className={styles.countdownElement}>{seconds[0]}</span>
        <span className={styles.countdownElement}>{seconds[1]}</span>
      </div>
    </div>
  );
  
};

export default CountdownTimer;
