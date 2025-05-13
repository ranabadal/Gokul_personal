import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import styles from './contactQueryMng.module.css';
import { BASE_URL } from '../../../Const/Const'; // Adjust the import path as necessary

const ContactQueriesManagement = () => {
  const [queries, setQueries] = useState([]);
  const [editingQueryId, setEditingQueryId] = useState(null);
  const [editFormData, setEditFormData] = useState({ status: '' });

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await fetch(`${BASE_URL}/contact/queries`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setQueries(result.data);
        } else {
          console.error('Failed to fetch queries:', result.message);
        }
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };
    fetchQueries();
  }, []);

  const handleEditClick = (query) => {
    setEditingQueryId(query._id);
    setEditFormData({ status: query.status });
  };

  const handleCancelClick = () => {
    setEditingQueryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async (queryId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/contact/queries/${queryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      if (response.ok) {
        setQueries(queries.map(query => (query._id === queryId ? { ...query, ...editFormData } : query)));
        setEditingQueryId(null);
      } else {
        console.error('Failed to update query');
      }
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  const handleDeleteClick = async (queryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this query?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`${BASE_URL}/contact/queries/${queryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setQueries(queries.filter(query => query._id !== queryId));
      } else {
        console.error('Failed to delete query');
      }
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  return (
    <div className={styles.contactQueriesManagement}>
      <div className={styles.header}>
        <h2>📧 Contact Queries Management 📧</h2>
      </div>
      <table className={styles.queriesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map(query => (
            <tr key={query._id}>
              {editingQueryId === query._id ? (
                <>
                  <td>{query._id}</td>
                  <td>{query.name || 'N/A'}</td>
                  <td>{query.mobile || 'N/A'}</td>
                  <td>{query.message || 'N/A'}</td>
                  <td>{new Date(query.createdAt).toLocaleString()}</td>
                  <td>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleInputChange}
                      className={styles.dropdown}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>
                    <button className={styles.saveButton} onClick={() => handleSaveClick(query._id)}><FaSave /> Save</button>
                    <button className={styles.cancelButton} onClick={handleCancelClick}><FaTimes /> Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{query._id}</td>
                  <td>{query.name || 'N/A'}</td>
                  <td>{query.mobile || 'N/A'}</td>
                  <td>{query.message || 'N/A'}</td>
                  <td>{new Date(query.createdAt).toLocaleString()}</td>
                  <td className={styles[query.status.toLowerCase()]}>{query.status}</td>
                  <td>
                    <button className={styles.editButton} onClick={() => handleEditClick(query)}><FaEdit /> Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteClick(query._id)}><FaTrashAlt /> Delete</button>
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

export default ContactQueriesManagement;
