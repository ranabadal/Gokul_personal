import React, { createContext, useState, useContext } from 'react';
import Toaster from "./components/React Toaster/toaster";
 
const ToasterContext = createContext();
 
export const useToaster = () => {
  return useContext(ToasterContext);
};
 
export const ToasterProvider = ({ children }) => {
  const [toaster, setToaster] = useState({
    message: '',
    type: '',
    isVisible: false
  });
 
  // const showToaster = (message, type = 'info') => {
  //   setToaster({ message, type, isVisible: true });
 
  //   setTimeout(() => {
  //     setToaster({ message: '', type: '', isVisible: false });
  //   }, 5000); // Change timeout duration if needed
  // };
 
 
 
  const showToaster = (message, type = 'info') => {
    setToaster((prev) => {
      // If the same message is already visible, reset visibility briefly
      if (prev.isVisible && prev.message === message && prev.type === type) {
        setToaster({ message: '', type: '', isVisible: false });
        setTimeout(() => {
          setToaster({ message, type, isVisible: true });
        }, 100); // Delay before showing the same message again
        return prev; // Return previous state temporarily
      }
 
      // Show the toaster with the new message
      return { message, type, isVisible: true };
    });
 
    // Automatically hide the toaster after a timeout
    setTimeout(() => {
      setToaster({ message: '', type: '', isVisible: false });
    }, 3000); // Adjust timeout duration as needed
  };
 
 
 
  return (
    <ToasterContext.Provider value={showToaster}>
      {children}
      {toaster.isVisible && (
        <Toaster message={toaster.message} type={toaster.type} />
      )}
    </ToasterContext.Provider>
  );
};
 