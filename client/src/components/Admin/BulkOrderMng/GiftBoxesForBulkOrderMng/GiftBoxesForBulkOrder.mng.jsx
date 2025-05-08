import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GiftBoxesForBulkOrder.mng.module.css";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [handbags, setHandbags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoryRes, giftBoxRes, handbagRes] = await Promise.all([
        axios.get("http://localhost:8080/api/bulkorders/categories"),
        axios.get("http://localhost:8080/api/bulkorders/giftBoxes"),
        axios.get("http://localhost:8080/api/bulkorders/generalHandbags"),
      ]);

      setCategories(categoryRes.data);
      setGiftBoxes(giftBoxRes.data);
      setHandbags(handbagRes.data);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message || error);
    }
  };

  const handleDelete = async (id, type) => {
    const endpoint = `http://localhost:8080/api/bulkorders/${type}/${id}`;
    try {
      await axios.delete(endpoint);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item, type) => {
    alert(`Editing ${type}: ${item.name}`);
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Dashboard</h1>

      {/* ✅ Table for Categories */}
      <h2>Categories</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name || "NA"}</td>
              <td>{cat.image ? <img src={cat.image} alt={cat.name} className={styles.previewImage} /> : "NA"}</td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(cat, "category")}>Edit</button>
                <button className={styles.delete} onClick={() => handleDelete(cat._id, "categories")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Table for Gift Boxes */}
      <h2>Gift Boxes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Min Order</th>
            <th>Matching Handbags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {giftBoxes.map((box) => (
            <tr key={box._id}>
              <td>{box.name || "NA"}</td>
              <td>{box.category?.name || "NA"}</td>
              <td>{box.image ? <img src={box.image} alt={box.name} className={styles.previewImage} /> : "NA"}</td>
              <td>{box.price !== undefined ? `₹${box.price}` : "NA"}</td>
              <td>{box.minOrderQuantity !== undefined ? box.minOrderQuantity : "NA"}</td>
              <td>
                {box.matchingHandbags.length > 0
                  ? box.matchingHandbags.map((hb) => `${hb.name} (₹${hb.price})`).join(", ")
                  : "NA"}
              </td>
              <td>
                <button  className={styles.edit} onClick={() => handleEdit(box, "giftBox")}>Edit</button>
                <button className={styles.delete} onClick={() => handleDelete(box._id, "giftBoxes")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Table for General Handbags */}
      <h2>General Handbags</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Min Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {handbags.map((hb) => (
            <tr key={hb._id}>
              <td>{hb.name || "NA"}</td>
              <td>{hb.category?.name || "NA"}</td>
              <td>{hb.image ? <img src={hb.image} alt={hb.name} className={styles.previewImage} /> : "NA"}</td>
              <td>{hb.price !== undefined ? `₹${hb.price}` : "NA"}</td>
              <td>{hb.minOrderQuantity !== undefined ? hb.minOrderQuantity : "NA"}</td>
              <td>
                <button  className={styles.edit} onClick={() => handleEdit(hb, "handbag")}>Edit</button>
                <button className={styles.delete} onClick={() => handleDelete(hb._id, "generalHandbags")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;