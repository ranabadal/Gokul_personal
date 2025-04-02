import React from 'react';
import styles from './modal.module.css';

const Modal = ({ src, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <img src={src} alt="Profile" className={styles.modalImg} />
      </div>
    </div>
  );
};

export default Modal;
