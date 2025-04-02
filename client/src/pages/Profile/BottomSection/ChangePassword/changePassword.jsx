// import React, { useState } from 'react';
// import InputField from '../../components/InputComponent/inputComp';
// import Button from '../../components/Button/button';
// import styles from './changePassword.module.css';
// import { useToaster } from '../../utils';
// import PasswordIcon from './Assets/password.svg';

// const ChangePassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmNewPassword: ''
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
// };

//   const [errors, setErrors] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmNewPassword: ''
//   });

//   const setToast = useToaster();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData({
//       ...passwordData,
//       [name]: value
//     });
//     setErrors({
//       ...errors,
//       [name]: ''
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate input fields
//     let valid = true;
//     const newErrors = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

//     if (!passwordData.oldPassword) {
//       newErrors.oldPassword = 'Please enter your old password';
//       valid = false;
//     }
//     if (!passwordData.newPassword) {
//       newErrors.newPassword = 'Please enter your new password';
//       valid = false;
//     }
//     if (passwordData.oldPassword && passwordData.newPassword && passwordData.newPassword === passwordData.oldPassword) {
//       newErrors.newPassword = 'New password cannot be the same as the old password';
//       valid = false;
//     }
//     if (passwordData.newPassword !== passwordData.confirmNewPassword) {
//       newErrors.confirmNewPassword = 'Passwords do not match';
//       valid = false;
//     }

//     if (!valid) {
//       setErrors(newErrors);
//       return;
//     }

//     // Update user password in backend
//     try {
//       const token = localStorage.getItem('jwtToken');
//       if (!token) {
//         console.error('No token found');
//         return;
//       }
//       const response = await fetch('http://localhost:8080/profile/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(passwordData) // Ensure the body is correctly formatted as JSON
//       });
//       const result = await response.json();
//       if (result.success) {
//         setToast('Password changed successfully', 'success');
//         setPasswordData({
//           oldPassword: '',
//           newPassword: '',
//           confirmNewPassword: ''
//         });
//       } else {
//         if (result.message === 'Old password is incorrect') {
//           setErrors({ ...newErrors, oldPassword: 'Old password is incorrect' });
//         } else {
//           console.error(result.message);
//         }
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//     }
//   };

//   return (
//     <div className={styles.changePasswordContainer}>
//       <div className={styles.header}>
//         <img src={PasswordIcon} alt="" className={styles.img} />
//         <h2 className={styles.heading}>Change Password</h2>
//       </div>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <InputField
//           type="password"
//           name="oldPassword"
//           placeholder="Old Password"
//           value={passwordData.oldPassword}
//           onChange={handleChange}
//           error={errors.oldPassword}
//           togglePasswordVisibility={togglePasswordVisibility}
//           showPassword={showPassword}
//         />
//         <InputField
//           type="password"
//           name="newPassword"
//           placeholder="New Password"
//           value={passwordData.newPassword}
//           onChange={handleChange}
//           error={errors.newPassword}
//           togglePasswordVisibility={togglePasswordVisibility}
//           showPassword={showPassword}
//         />
//         <InputField
//           type="password"
//           name="confirmNewPassword"
//           placeholder="Confirm New Password"
//           value={passwordData.confirmNewPassword}
//           onChange={handleChange}
//           error={errors.confirmNewPassword}
//           togglePasswordVisibility={togglePasswordVisibility}
//           showPassword={showPassword}
//         />
//         <Button type="submit" text="Change Password" />
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;



import React, { useState } from 'react';
import InputField from '../../../../components/InputComponent/inputComp';
import Button from '../../../../components/ButtonNew/button';
import styles from './changePassword.module.css';
import { useToaster } from '../../../../utils';
import PasswordIcon from './Assets/password.svg';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const setToast = useToaster();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields
    let valid = true;
    const newErrors = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = 'Please enter your old password';
      valid = false;
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Please enter your new password';
      valid = false;
    }
    if (passwordData.oldPassword && passwordData.newPassword && passwordData.newPassword === passwordData.oldPassword) {
      newErrors.newPassword = 'New password cannot be the same as the old password';
      valid = false;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Update user password in backend
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch('http://localhost:8080/profile/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData) // Ensure the body is correctly formatted as JSON
      });
      const result = await response.json();
      if (result.success) {
        setToast('Password changed successfully', 'success');
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        if (result.message === 'Old password is incorrect') {
          setErrors({ ...newErrors, oldPassword: 'Old password is incorrect' });
        } else {
          console.error(result.message);
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className={styles.changePasswordMain}>
      <div className={styles.changePasswordContainer}>
      <div className={styles.header}>
        {/* <img src={PasswordIcon} alt="" className={styles.img} /> */}
        <h2 className={styles.heading}>Change Password</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
    icon={PasswordIcon} 
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={passwordData.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
          togglePasswordVisibility={() => togglePasswordVisibility('oldPassword')}
          showPassword={showPassword.oldPassword}
        />
        <InputField
        icon={PasswordIcon} 
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          togglePasswordVisibility={() => togglePasswordVisibility('newPassword')}
          showPassword={showPassword.newPassword}
        />
        <InputField
           icon={PasswordIcon} 
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={passwordData.confirmNewPassword}
          onChange={handleChange}
          error={errors.confirmNewPassword}
          togglePasswordVisibility={() => togglePasswordVisibility('confirmNewPassword')}
          showPassword={showPassword.confirmNewPassword}
        />
        <Button type="submit" text="Change Password" />
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
