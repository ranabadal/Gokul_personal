// import React, { createContext, useState, useContext } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);



// // banquet query 
// import React, { createContext, useState, useContext, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";


// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const initializeUserFromToken = () => {
//     const token = localStorage.getItem("jwtToken"); // Assuming the JWT is stored in localStorage
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); // Decode the token
//         const userInfo = {
//           name: decoded.name || "Guest", // Extract the user's name
//           number: decoded.number || "", // Extract the user's number
//         };
//         setUser(userInfo); // Set the user information in context
//       } catch (error) {
//         console.error("Invalid token:", error);
//         setUser(null); // Clear user info if token is invalid
//       }
//     }
//   };

//   useEffect(() => {
//     initializeUserFromToken(); // Initialize user details on component mount
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


import React, { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Make sure this library is installed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initializeUser = () => {
    // Step 1: Check if a user object exists in local storage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("jwtToken");

    if (storedUser) {
      // Load user from local storage
      setUser(JSON.parse(storedUser));
    } else if (token) {
      // Decode token to extract user info
      try {
        const decoded = jwtDecode(token);
        const userInfo = {
          name: decoded.name || "Guest", // Extract user name
          number: decoded.number || "", // Extract user number
          // Add additional fields as necessary
        };
        setUser(userInfo); // Set the user object
        // Optionally save the decoded user info to local storage
        localStorage.setItem("user", JSON.stringify(userInfo));
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null); // Clear user info if token is invalid
      }
    }
  };

  useEffect(() => {
    initializeUser(); // Initialize user from token or local storage on mount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);