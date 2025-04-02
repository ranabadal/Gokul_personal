import React from 'react';
import styles from './inputComp.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ icon, type, name, placeholder, showPassword, togglePasswordVisibility, onChange, value, error }) => {
    return (
        <div className={styles.inputField}>
            {icon && <img src={icon} alt="icon" className={styles.inputIcon} />}
            <input 
                type={type === 'password' && showPassword ? 'text' : type} 
                placeholder={placeholder} 
                className={`${styles.input} ${!icon ? styles.noIcon : ''}`} // Apply different padding if no icon
                name={name}
                onChange={onChange}
                value={value}
            />
            {type === 'password' && (
                <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
            )}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default InputField;
