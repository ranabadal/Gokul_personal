import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RegularBoxesMng.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
const RegularBoxAdmin = () => {
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    boxName: "",
    size: "",
    minOrder: "",
  });

  // Fetch all Regular Boxes on mount
  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    try {
                  // await axios.post(`${BASE_URL}/api/bulkorders/giftBoxes`, payload);
      const res = await axios.get(`${BASE_URL}/api/regularBoxes`);
      setBoxes(res.data);
    } catch (error) {
      console.error("Error fetching boxes:", error.response?.data || error.message || error);
    }
  };

  // Update form data on input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle add or update operation
  const handleSave = async () => {
    if (!formData.boxName || !formData.size || !formData.minOrder) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (formData.id) {
        await axios.put(`${BASE_URL}/api/regularBoxes/${formData.id}`, {
          boxName: formData.boxName,
          size: formData.size,
          minOrder: Number(formData.minOrder),
        });
      } else {
        await axios.post(`${BASE_URL}/api/regularBoxes`, {
          boxName: formData.boxName,
          size: formData.size,
          minOrder: Number(formData.minOrder),
        });
      }
      // Reset the form and fetch the list again
      setFormData({ id: "", boxName: "", size: "", minOrder: "" });
      fetchBoxes();
    } catch (error) {
      console.error("Error saving box:", error.response?.data || error.message || error);
    }
  };

  // Pre-fill the form when admin clicks on Edit
  const handleEdit = (box) => {
    setFormData({
      id: box._id,
      boxName: box.boxName,
      size: box.size,
      minOrder: box.minOrder,
    });
  };

  // Delete a box by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/regularBoxes/${id}`);
      fetchBoxes();
    } catch (error) {
      console.error("Error deleting box:", error.response?.data || error.message || error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Regular Boxes Admin</h1>

      {/* ----- Form Section ----- */}
      <div className={styles.formContainer}>
        <input
          type="text"
          name="boxName"
          placeholder="Box Name"
          value={formData.boxName}
          onChange={handleInputChange}
        />

        {/* Use a text input for size so admin can create their own size */}
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="minOrder"
          placeholder="Min Order"
          value={formData.minOrder}
          onChange={handleInputChange}
        />

        <button onClick={handleSave}>{formData.id ? "Update" : "Add"} Box</button>
      </div>

      {/* ----- Table Listing ----- */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Box Name</th>
            <th>Size</th>
            <th>Min Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, index) => (
            <tr key={box._id}>
              <td>{index + 1}</td>
              <td>{box.boxName}</td>
              <td>{box.size}</td>
              <td>{box.minOrder}</td>
              <td>
                <button onClick={() => handleEdit(box)}>Edit</button>
                <button onClick={() => handleDelete(box._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegularBoxAdmin;