
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./restaurentNavMng.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
export default function RestaurentNavMng() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Restaurant"); // Default filter
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch categories from a single API
  useEffect(() => {
    axios.get(`${BASE_URL}/api/navbar`)
      .then(res => setCategories(res.data))
      .catch(error => setErrorMessage("Error fetching categories!"));
  }, []);

  // Convert image to Base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  // Add Category
  const handleAddCategory = () => {
    if (!name || !image) {
      setErrorMessage("Please provide both name and image.");
      return;
    }

    axios.post(`${BASE_URL}/api/navbar`, { category: selectedCategory, name, image })
      .then(res => {
        setCategories([...categories, res.data]);
        resetForm();
      })
      .catch(error => setErrorMessage("Error adding category!"));
  };

  // Edit Category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setSelectedCategory(category.category);
    setName(category.name);
    setImage(category.image);
  };

  // Update Category
  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    axios.put(`${BASE_URL}/api/navbar/${editingCategory._id}`, { category: selectedCategory, name, image })
      .then((res) => {
        setCategories(categories.map((cat) => cat._id === editingCategory._id ? res.data : cat));
        resetForm();
      })
      .catch(error => setErrorMessage("Error updating category!"));
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    axios.delete(`${BASE_URL}/api/navbar/${id}`)
      .then(() => setCategories(categories.filter(category => category._id !== id)))
      .catch(error => setErrorMessage("Error deleting category!"));
  };

  // Reset Form
  const resetForm = () => {
    setEditingCategory(null);
    setSelectedCategory("Restaurant");
    setName("");
    setImage("");
    setErrorMessage("");
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel - Manage Navbar</h1>

      {/* Error Message */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {/* Category Filter */}
      <div className={styles.filterWrapper}>
        <span className={selectedCategory === "Sweets" ? styles.activeFilter : styles.filter}
          onClick={() => setSelectedCategory("Sweets")}>
          Sweets
        </span>
        <span className={selectedCategory === "Restaurant" ? styles.activeFilter : styles.filter}
          onClick={() => setSelectedCategory("Restaurant")}>
          Restaurant
        </span>
      </div>

      {/* Add or Edit Category */}
      <div className={styles.adminForm}>
        <select className={styles.adminSelect} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="Restaurant">Restaurant</option>
          <option value="Sweets">Sweets</option>
        </select>
        <input className={styles.adminInput} type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={styles.adminInput} type="file" onChange={handleImageUpload} />

        {editingCategory ? (
          <>
            <button className={`${styles.adminButton} ${styles.adminEdit}`} onClick={handleUpdateCategory}>Update Category</button>
            <button className={`${styles.adminButton} ${styles.adminCancel}`} onClick={resetForm}>Cancel</button>
          </>
        ) : (
          <button className={`${styles.adminButton} ${styles.adminAdd}`} onClick={handleAddCategory}>Add Category</button>
        )}
      </div>

      {/* List Categories Based on Selected Category */}
      {/* <div className={styles.adminCategoryList}>
        {categories.filter(category => category.category === selectedCategory).map((category) => (
          <div key={category._id} className={styles.adminCategoryCard}>
            <img className={styles.adminCategoryImage} src={category.image} alt={category.name} />
            <p>{category.name}</p>
            <button className={`${styles.adminButton} ${styles.adminEdit}`} onClick={() => handleEditCategory(category)}>Edit</button>
            <button className={`${styles.adminButton} ${styles.adminDelete}`} onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </div>
        ))}
      </div> */}
      {/* List All Categories Without Filtering */}
<div className={styles.adminCategoryList}>
  {categories.map((category) => (
    <div key={category._id} className={styles.adminCategoryCard}>
      <img className={styles.adminCategoryImage} src={category.image} alt={category.name} />
      <p>{category.name}</p>
      <button className={`${styles.adminButton} ${styles.adminEdit}`} onClick={() => handleEditCategory(category)}>Edit</button>
      <button className={`${styles.adminButton} ${styles.adminDelete}`} onClick={() => handleDeleteCategory(category._id)}>Delete</button>
    </div>
  ))}
</div>
    </div>
  );
}