import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = () => {
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return <div>{timeLeft > 0 ? formatTime() : "Expired!"}</div>;
};

export default CountdownTimer;