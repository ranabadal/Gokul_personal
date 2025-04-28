import React from 'react';
import styles from './button.module.css';

const Button = ({ text, type, onClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button type={type} className={styles.button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;