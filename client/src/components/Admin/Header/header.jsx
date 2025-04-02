import React from 'react';
import styles from './header.module.css';
import { useUser } from '../../Context/userContext'; // Adjust the path as necessary

const Header = () => {
  const { user } = useUser(); // Use user context

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>Admin Panel</h1>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.userName}>{user ? user.name : 'Admin'}</span>
      </div>
    </header>
  );
};

export default Header;
