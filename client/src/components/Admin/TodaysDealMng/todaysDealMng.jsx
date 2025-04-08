import React, { useState, useEffect } from "react";
import styles from "./todaysDealMng.module.css";

const TodaysDealManagement = () => {
  const [deals, setDeals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "upcoming",
    startTime: "",
    endTime: "",
    image: "",
  });

  const [editDealId, setEditDealId] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/deals/all");
        const data = await response.json();

        if (data.success) {
          setDeals([...data.todayDeals, ...data.upcomingDeals]);
        } else {
          setDeals([]);
        }
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result.split(",")[1] });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editDealId ? "PUT" : "POST";
    const url = editDealId ? `http://localhost:8080/api/deals/${editDealId}` : "http://localhost:8080/api/deals/add";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setDeals(deals.map(deal => (deal._id === editDealId ? result.deal : deal)));
        setEditDealId(null);
        setFormData({ title: "", description: "", type: "upcoming", startTime: "", endTime: "", image: "" });
    
      } else {
        console.error("Failed to update deal:", result.message);
      }
    } catch (error) {
      console.error("Error processing deal:", error);
    }
  };

  const handleEditClick = (deal) => {
    setFormData(deal);
    setEditDealId(deal._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/deals/${id}`, { method: "DELETE" });
      if (response.ok) {
        setDeals(deals.filter(deal => deal._id !== id));
      } else {
        console.error("Failed to delete deal");
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
    }
  };

  return (
    <div className={styles.dealManagement}>
      <h2>Admin Panel - Manage Today's Deals</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="today">Today's Deal</option>
          <option value="upcoming">Upcoming Deal</option>
        </select>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleInputChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">{editDealId ? "Update Deal" : "Add Deal"}</button>
        {editDealId && <button type="button" onClick={() => setEditDealId(null)}>Cancel</button>}
      </form>

      <h3>Existing Deals</h3>
      {deals.length === 0 ? (
        <p className={styles.noDeals}>No deals available</p>
      ) : (
        <div className={styles.dealsList}>
          {deals.map((deal) => (
            <div key={deal._id} className={styles.dealItem}>
              <h4>{deal.title}</h4>
              <p>{deal.description}</p>
              <p>Type: {deal.type}</p>
              <img src={`data:image/png;base64,${deal.image}`} alt={deal.title} width="50" />
              <button className={styles.editButton} onClick={() => handleEditClick(deal)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDelete(deal._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysDealManagement;