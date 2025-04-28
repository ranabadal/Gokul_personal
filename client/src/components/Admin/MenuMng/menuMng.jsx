import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./menuMng.module.css";

const MenuMng = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({ menuName: "", description: "", price: "", image: "" });
  const [editMenuId, setEditMenuId] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const response = await axios.get("http://localhost:8080/api/menuCart");
    setMenus(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMenuId) {
//       await axios.put(`http://localhost:8080/api/menuCart/${editMenuId}`, formData);
//       setEditMenuId(null);
//     } else {
//       await axios.post("http://localhost:8080/api/menuCart", formData);
//     }
//     setFormData({ menuName: "", description: "", price: "", image: "" });
//     fetchMenus();
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image) {
      alert("Please upload an image!");
      return;
    }
  
    const requestData = {
      menuName: formData.menuName,
      description: formData.description,
      price: formData.price,
      menuImage: formData.image, // ✅ Ensure image is included
    };
  
    if (editMenuId) {
      await axios.put(`http://localhost:8080/api/menuCart/${editMenuId}`, requestData);
      setEditMenuId(null);
    } else {
      await axios.post("http://localhost:8080/api/menuCart", requestData);
    }
  
    setFormData({ menuName: "", description: "", price: "", image: "" });
    fetchMenus();
  };

  
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/menuCart/${id}`);
    fetchMenus();
  };

  const handleEdit = (menu) => {
    setEditMenuId(menu._id);
    setFormData({ menuName: menu.menuName, description: menu.description, price: menu.price, image: "" });
  };

  return (
    <div className={styles.adminPanel}>
      <h2>Manage Menus</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} type="text" name="menuName" placeholder="Menu Name" value={formData.menuName} onChange={handleInputChange} required />
        <textarea className={styles.textarea} name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        <input className={styles.input} type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
        <input className={styles.fileInput} type="file" accept="image/*" onChange={handleFileChange} />
        <button className={styles.button} type="submit">{editMenuId ? "Update Menu" : "Add Menu"}</button>
      </form>

      <h3>Menu List</h3>
      {menus.map((menu) => (
        <div key={menu._id} className={styles.menuItem}>
           {/* <img className={styles.menuImage} src={`data:${menu.image.contentType};base64,${menu.image.data}`} alt={menu.menuName} width="50" /> */}
           <img className={styles.menuImage} src={menu.menuImage.startsWith("data:image") ? menu.menuImage : `data:image/png;base64,${menu.menuImage}`} alt={menu.menuName} width="50" />
          <h4>{menu.menuName}</h4>
          <p>{menu.description}</p>
          <p>₹{menu.price}</p>
          <button className={styles.editBtn} onClick={() => handleEdit(menu)}>Edit</button>
          <button className={styles.deleteBtn} onClick={() => handleDelete(menu._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MenuMng;