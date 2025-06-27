
// import React, { useState } from "react";
// import { TextField, Button, Tabs, Tab } from "@mui/material";
// import { Google, Facebook } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useUser } from '../../../components/Context/userContext'; // Adjust the path as necessary
// import styles from "./loginPopup.module.css";
// import { useToaster } from '../../../utils';
// import { BASE_URL } from "../../../Const/Const";
// const LoginSignupPopup = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [signupData, setSignupData] = useState({ name: '', email: '', password: '', number: '' });
//   const setToast = useToaster();
//   const navigate = useNavigate();
//   const { setUser } = useUser(); // Use user context

//   const handleChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSignupChange = (e) => {
//     setSignupData({ ...signupData, [e.target.name]: e.target.value });
//   };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/auth/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(loginData),
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       setToast('Logged in successfully', 'success');
  //       const user = { name: result.name, profilePic: result.profilePic, jwtToken: result.token };
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('jwtToken', result.token);
  //       setUser(user); // Update user context
  //       navigate('/');
  //     } else {
  //       setToast(result.message, 'error');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setToast('Error logging in', 'error');
  //   }
  // };

  // const handleSignup = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/auth/signup`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(signupData),
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       setToast('Account created successfully', 'success');
  //       // Handle successful signup (e.g., redirect, store token)
  //     } else {
  //       setToast(result.message, 'error');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setToast('Error signing up', 'error');
  //   }
  // };

//   return (
//     <div className={styles.popupContainer}>
//       {/* Tabs for Login and Signup */}
//       {/* <Tabs
//         value={tabIndex}
//         onChange={handleChange}
//         className={styles.tabs}
//         TabIndicatorProps={{ style: { backgroundColor: "#E1353C" } }}
//       >
//         <Tab label="Login" className={tabIndex === 0 ? styles.activeTab : styles.inactiveTab} style={{ width: "317.52px" }} />
//         <Tab label="Sign Up" className={tabIndex === 1 ? styles.activeTab : styles.inactiveTab} style={{ width: "317.52px" }} />
//       </Tabs> */}
//        <Tabs
//         value={tabIndex}
//         onChange={handleChange}
//         className={styles.tabs}
//         TabIndicatorProps={{ style: { backgroundColor: "#E1353C" } }}
//       >
//         <Tab label="Login" className={tabIndex === 0 ? styles.activeTab : styles.inactiveTab} />
//         <Tab label="Sign Up" className={tabIndex === 1 ? styles.activeTab : styles.inactiveTab} />
//       </Tabs>


//       {tabIndex === 0 ? (
//         // Login Form
//         <div className={styles.formContainer}>
//           <p className={styles.title}>Log In to your account</p>
//           <div className={styles.inputContainer}>
//             <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
//           </div>
//           <div className={styles.inputContainer}>
//             <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
//           </div>
//           <p className={styles.forgotPassword}>Forgot password?</p>
//           <Button fullWidth className={styles.loginButton} onClick={handleLogin}>Login</Button>
//           <div className={styles.dividerContainer}>
//             <span className={styles.divider}></span>
//             {/* <p className={styles.orText}>Or Login with</p> */}
//             <span className={styles.divider}></span>
//           </div>
//           <div className={styles.socialButtons}>
//             {/* <Button variant="outlined" className={styles.socialButton}>
//               <Google className={styles.icon} /> Google
//             </Button> */}
//             {/* <Button variant="outlined" className={styles.socialButton}>
//               <Facebook className={styles.icon} /> Facebook
//             </Button> */}
//           </div>
//         </div>
//       ) : (
//         // Signup Form
//         <div className={styles.formContainer}>
//           <p className={styles.title}>Create an account</p>
//           <TextField fullWidth label="User Name" name="name" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Phone No." name="number" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <Button fullWidth className={styles.signupButton} onClick={handleSignup}>Sign Up</Button>
//           <div className={styles.dividerContainer}>
//             <span className={styles.divider}></span>
//             {/* <p className={styles.orText}>Or Login with</p> */}
//             <span className={styles.divider}></span>
//           </div>
//           <div className={styles.socialButtons}>
//             {/* <Button variant="outlined" className={styles.socialButton}>
//               <Google className={styles.icon} /> Google
//             </Button>
//             <Button variant="outlined" className={styles.socialButton}>
//               <Facebook className={styles.icon} /> Facebook
//             </Button> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginSignupPopup;






// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useUser } from '../../../components/Context/userContext'; // Adjust the path as necessary
// import styles from "./loginPopup.module.css";
// import { useToaster } from '../../../utils';
// import { BASE_URL } from "../../../Const/Const";

// const LoginSignupPopup = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [signupData, setSignupData] = useState({ name: '', email: '', password: '', number: '' });
//   const setToast = useToaster();
//   const navigate = useNavigate();
//   const { setUser } = useUser(); // Use user context

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSignupChange = (e) => {
//     setSignupData({ ...signupData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setToast('Logged in successfully', 'success');
//         const user = { name: result.name, profilePic: result.profilePic, jwtToken: result.token };
//         localStorage.setItem('user', JSON.stringify(user));
//         localStorage.setItem('jwtToken', result.token);
//         setUser(user); // Update user context
//         navigate('/');
//       } else {
//         setToast(result.message, 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       setToast('Error logging in', 'error');
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(signupData),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setToast('Account created successfully', 'success');
//       } else {
//         setToast(result.message, 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       setToast('Error signing up', 'error');
//     }
//   };

//   return (
//     <div className={styles.popupContainer}>
//       {/* Toggle Buttons for Login and Signup */}
//       <div className={styles.toggleContainer}>
//         <button 
//           className={tabIndex === 0 ? styles.activeToggle : styles.inactiveToggle} 
//           onClick={() => setTabIndex(0)}
//         >
//           Login
//         </button>
//         <button 
//           className={tabIndex === 1 ? styles.activeToggle : styles.inactiveToggle} 
//           onClick={() => setTabIndex(1)}
//         >
//           Sign Up
//         </button>
//       </div>

//       {tabIndex === 0 ? (
//         // Login Form
//         <div className={styles.formContainer}>
//           <p className={styles.title}>Log In to your account</p>
//           <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
//           <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleLoginChange} />
//           <p className={styles.forgotPassword}>Forgot password?</p>
//           <div  className={styles.loginButton} onClick={handleLogin}>
//             Login
//             </div>
//         </div>
//       ) : (
//         // Signup Form
//         <div className={styles.formContainer}>
//           <p className={styles.title}>Create an account</p>
//           <TextField fullWidth label="User Name" name="name" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Phone No." name="number" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Email" name="email" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <TextField fullWidth label="Password" name="password" type="password" variant="outlined" className={styles.inputField} onChange={handleSignupChange} />
//           <div  className={styles.signupButton} onClick={handleSignup}>Sign Up</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginSignupPopup;

import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../components/Context/userContext';
import styles from "./loginPopup.module.css";
import { useToaster } from '../../../utils';
import { BASE_URL } from "../../../Const/Const";

const LoginSignupPopup = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', number: '' });

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const setToast = useToaster();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  // Login change and live validation
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...loginData, [name]: value };
    setLoginData(updated);

    const errors = { ...loginErrors };

    if (name === 'email') {
      errors.email = !value ? "Email is required" : !validateEmail(value) ? "Invalid email" : "";
    }

    if (name === 'password') {
      errors.password = !value ? "Password is required" : "";
    }

    setLoginErrors(errors);
  };

  // Signup change and live validation
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...signupData, [name]: value };
    setSignupData(updated);

    const errors = { ...signupErrors };

    if (name === 'name') {
      errors.name = !value ? "Name is required" : "";
    }

    if (name === 'number') {
      errors.number = !value ? "Phone number is required" : !validatePhone(value) ? "Must be 10 digits" : "";
    }

    if (name === 'email') {
      errors.email = !value ? "Email is required" : !validateEmail(value) ? "Invalid email" : "";
    }

    if (name === 'password') {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Minimum 6 characters";
      } else {
        errors.password = "";
      }
    }

    setSignupErrors(errors);
  };

  const isLoginValid = () => {
    return !loginErrors.email && !loginErrors.password && loginData.email && loginData.password;
  };

  const isSignupValid = () => {
    return (
      !signupErrors.name &&
      !signupErrors.number &&
      !signupErrors.email &&
      !signupErrors.password &&
      signupData.name &&
      signupData.number &&
      signupData.email &&
      signupData.password
    );
  };

  const handleLogin = async () => {
    if (!isLoginValid()) {
      setToast("Please fix the errors before logging in.", "error");
      return;
    }

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
        setUser(user);
        navigate('/');
      } else {
        setToast(result.message, 'error');
      }
    } catch (error) {
      console.error(error);
      setToast('Error logging in', 'error');
    }
  };

  // const handleSignup = async () => {
  //   if (!isSignupValid()) {
  //     setToast("Please fix the errors before signing up.", "error");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${BASE_URL}/api/auth/signup`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(signupData),
  //     });

  //     const result = await response.json();
  //     if (result.success) {
  //       setToast('Account created successfully', 'success');
  //     } else {
  //       setToast(result.message, 'error');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setToast('Error signing up', 'error');
  //   }
  // };

  const handleSignup = async () => {
  if (!isSignupValid()) {
    setToast("Please fix the errors before signing up.", "error");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });

    const result = await response.json();
    if (result.success) {
      setToast('Account created successfully. Please login.', 'success');
      setSignupData({ name: '', email: '', password: '', number: '' }); // Clear form
      setSignupErrors({}); // Clear errors
      setTabIndex(0); // Switch to login form
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
      <div className={styles.toggleContainer}>
        <button
          className={tabIndex === 0 ? styles.activeToggle : styles.inactiveToggle}
          onClick={() => setTabIndex(0)}
        >
          Login
        </button>
        <button
          className={tabIndex === 1 ? styles.activeToggle : styles.inactiveToggle}
          onClick={() => setTabIndex(1)}
        >
          Sign Up
        </button>
      </div>

      {tabIndex === 0 ? (
        <div className={styles.formContainer}>
          <p className={styles.title}>Log In to your account</p>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            className={styles.inputField}
            value={loginData.email}
            onChange={handleLoginChange}
            error={!!loginErrors.email}
            helperText={loginErrors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            className={styles.inputField}
            value={loginData.password}
            onChange={handleLoginChange}
            error={!!loginErrors.password}
            helperText={loginErrors.password}
          />
          <p className={styles.forgotPassword}>Forgot password?</p>
          <div className={styles.loginButton} onClick={handleLogin}>
            Login
          </div>
        </div>
      ) : (
        <div className={styles.formContainer}>
          <p className={styles.title}>Create an account</p>
          <TextField
            fullWidth
            label="User Name"
            name="name"
            variant="outlined"
            className={styles.inputField}
            value={signupData.name}
            onChange={handleSignupChange}
            error={!!signupErrors.name}
            helperText={signupErrors.name}
          />
          <TextField
            fullWidth
            label="Phone No."
            name="number"
            variant="outlined"
            className={styles.inputField}
            value={signupData.number}
            onChange={handleSignupChange}
            error={!!signupErrors.number}
            helperText={signupErrors.number}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            className={styles.inputField}
            value={signupData.email}
            onChange={handleSignupChange}
            error={!!signupErrors.email}
            helperText={signupErrors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            className={styles.inputField}
            value={signupData.password}
            onChange={handleSignupChange}
            error={!!signupErrors.password}
            helperText={signupErrors.password}
          />
          
          <div className={styles.signupButton} onClick={handleSignup}>
            Sign Up
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupPopup;
