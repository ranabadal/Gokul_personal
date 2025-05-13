import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './adminLogin.module.css';

const AdminLogin = () => {



  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // const { data } = await axios.post('http://localhost:8080/api/admin/login', credentials);
            const { data } = await axios.post(`${BASE_URL}api/admin/login`, credentials);

      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (error) {
      setError('🚨 Invalid Username or Password!');
    }
  };

  return (
     <div className={styles.adminLoginWrapper}>

    <div className={styles.loginContainer}>
      <h2 className={styles.heading}>🍬 Admin Login 🍬</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="👤 Username"
          className={styles.inputField}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="🔒 Password"
          className={styles.inputField}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        {error && <p className={styles.errorMsg}>{error}</p>}
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>

    </div>
  );
};

export default AdminLogin;