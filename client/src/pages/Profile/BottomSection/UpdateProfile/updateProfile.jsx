
import React, { useState, useEffect } from 'react';
import styles from './updateProfile.module.css';
import { useUser } from '../../../../components/Context/userContext'; // Adjus
import { useToaster } from '../../../../utils';
import InputField from '../../../../components/InputComponent/inputComp';
import Button from '../../../../components/ButtonNew/button';
import defaultProfilePic from './Assets/userIcon.svg';
import Modal from './Modal/modal'; // Import the new Modal component
import { BASE_URL } from '../../../../Const/Const';
const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    number: '',
    profilePic: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: ''
});

const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
const setToast = useToaster();
const { user, setUser } = useUser(); // Use user context

useEffect(() => {
  // Fetch user profile data from backend
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setProfileData(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setProfileData({
    ...profileData,
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
    const newErrors = { name: '', email: '', number: '' };
  
    if (!profileData.name) {
      newErrors.name = 'Please enter your name';
      valid = false;
    }
    if (!profileData.email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    }
    if (!profileData.number) {
      newErrors.number = 'Please enter your phone number';
      valid = false;
    }
  
    if (!valid) {
      setErrors(newErrors);
      return;
    }
  
    // Update user profile data in backend
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const result = await response.json();
      if (result.success) {
        setToast('Profile updated successfully', 'success');
        setUser({ ...user, ...profileData }); // Update user context
        localStorage.setItem('user', JSON.stringify({ ...user, ...profileData })); // Update localStorage
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

const handleProfilePicChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profilePic", file);

  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch(`${BASE_URL}/api/profile/profile-pic`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` }, // ✅ REMOVE 'Content-Type': 'application/json'
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      setProfileData({ ...profileData, profilePic: result.profilePicUrl }); // ✅ Assume backend returns a URL
      setToast("Profile picture updated successfully", "success");
      setUser({ ...user, profilePic: result.profilePicUrl }); // ✅ Update user context
      localStorage.setItem("user", JSON.stringify({ ...user, profilePic: result.profilePicUrl })); // ✅ Save URL instead of base64
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};


const handleProfilePicClick = () => {
  setIsModalOpen(true); // Open modal on profile pic click
};

const closeModal = () => {
  setIsModalOpen(false); // Close modal on clicking outside of the image
};

return (
  <div className={styles.updateProfileMain}>
    <div className={styles.profileContainer}>
      <h2 className={styles.heading}>My Profile</h2>
      <div className={styles.profilePicContainer}>
        <img
          src={profileData.profilePic ? `data:image/jpeg;base64,${profileData.profilePic}` : defaultProfilePic}
          alt="Profile"
          className={styles.profilePic}
          onClick={handleProfilePicClick} // Add click handler to profile pic
        />
        <label htmlFor="profilePic" className={styles.uploadLabel}>
          Upload new image
        </label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          className={styles.uploadInput}
          onChange={handleProfilePicChange}
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Full Name"
          value={profileData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={profileData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          type="text"
          name="number"
          placeholder="Phone Number"
          value={profileData.number}
          onChange={handleChange}
          error={errors.number}
        />
        <Button className={styles.button} type="submit" text="Update Profile" />
      </form>
    </div>
    {isModalOpen && (
      <Modal
        src={profileData.profilePic ? `data:image/jpeg;base64,${profileData.profilePic}` : defaultProfilePic}
        onClose={closeModal}
      />
    )}
  </div>
);
};

export default UpdateProfile;




