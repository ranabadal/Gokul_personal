import React from 'react';
import styles from './header.module.css';
import { useUser } from '../../Context/userContext'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useUser(); // Use user context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>Admin Panel</h1>
      </div>
      <div className={styles.headerRight}>
     
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;