import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import styles from './userMng.module.css';
import { BASE_URL } from '../../../Const/Const';
const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await fetch(`${BASE_URL}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        console.log('Fetched users:', result);
        if (result.success) {
          setUsers(result.data);
        } else {
          console.error('Failed to fetch users:', result.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ name: user.name, email: user.email });
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      if (response.ok) {
        setUsers(users.map(user => (user._id === userId ? { ...user, ...editFormData } : user)));
        setEditingUserId(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={styles.usersManagement}>
      <div className={styles.header}>
        <h2>👤 Users Management 👤</h2>
      </div>
      <table className={styles.usersTable}>
        <thead>
          <tr>
 
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                <>
          
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <button className={styles.saveButton} onClick={() => handleSaveClick(user._id)}><FaSave /> Save</button>
                    <button className={styles.cancelButton} onClick={handleCancelClick}><FaTimes /> Cancel</button>
                  </td>
                </>
              ) : (
                <>
  
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className={styles.editButton} onClick={() => handleEditClick(user)}><FaEdit /> Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteClick(user._id)}><FaTrashAlt /> Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
