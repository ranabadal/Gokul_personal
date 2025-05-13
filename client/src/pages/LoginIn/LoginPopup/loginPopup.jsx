
import React, { useState } from "react";
import { TextField, Button, Tabs, Tab } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../components/Context/userContext'; // Adjust the path as necessary
import styles from "./loginPopup.module.css";
import { useToaster } from '../../../utils';

const LoginSignupPopup = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', number: '' });
  const setToast = useToaster();
  const navigate = useNavigate();
  const { setUser } = useUser(); // Use user context

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (result.success) {
        setToast('Logged in successfully', 'success');
        const user = { name: result.name, profilePic: result.profilePic, jwtToken: result.token };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', result.token);
        setUser(user); // Update user context
        navigate('/');
      } else {
        setToast(result.message, 'error');
      }
    } catch (error) {
      console.error(error);
      setToast('Error logging in', 'error');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const result = await response.json();
      if (result.success) {
        setToast('Account created successfully', 'success');
        // Handle successful signup (e.g., redirect, store token)
      } else {
        setToast(result.message, 'error');
      }
    } catch (error) {
      console.error(error);
      setToast('Error signing up', 'error');
    }
  };

  return (
    <div className={styles.popupContainer}>
      {/* Tabs for Login and Signup */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        className={styles.tabs}
        TabIndicatorProps={{ style: { backgroundColor: "#E1353C" } }}
      >
        <Tab label="Login" className={tabIndex === 0 ? styles.activeTab : styles.inactiveTab} style={{ width: "317.52px" }} />
        <Tab label="Sign Up" className={tabIndex === 1 ? styles.activeTab : styles.inactiveTab} style={{ width: "317.52px" }} />
      </Tabs>

      {tabIndex === 0 ? (
        // Login Form
        <div className={styles.formContainer}>
          <p className={styles.title}>Log In to your account</p>
          <div className={styles.inputContainer}>
            <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
          </div>
          <div className={styles.inputContainer}>
            <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
          </div>
          <p className={styles.forgotPassword}>Forgot password?</p>
          <Button fullWidth className={styles.loginButton} onClick={handleLogin}>Login</Button>
          <div className={styles.dividerContainer}>
            <span className={styles.divider}></span>
            {/* <p className={styles.orText}>Or Login with</p> */}
            <span className={styles.divider}></span>
          </div>
          <div className={styles.socialButtons}>
            {/* <Button variant="outlined" className={styles.socialButton}>
              <Google className={styles.icon} /> Google
            </Button> */}
            {/* <Button variant="outlined" className={styles.socialButton}>
              <Facebook className={styles.icon} /> Facebook
            </Button> */}
          </div>
        </div>
      ) : (
        // Signup Form
        <div className={styles.formContainer}>
          <p className={styles.title}>Create an account</p>
          <TextField fullWidth label="User Name" name="name" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
          <TextField fullWidth label="Phone No." name="number" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
          <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
          <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
          <Button fullWidth className={styles.signupButton} onClick={handleSignup}>Sign Up</Button>
          <div className={styles.dividerContainer}>
            <span className={styles.divider}></span>
            {/* <p className={styles.orText}>Or Login with</p> */}
            <span className={styles.divider}></span>
          </div>
          <div className={styles.socialButtons}>
            {/* <Button variant="outlined" className={styles.socialButton}>
              <Google className={styles.icon} /> Google
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Facebook className={styles.icon} /> Facebook
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupPopup;
