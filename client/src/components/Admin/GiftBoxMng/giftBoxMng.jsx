
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./giftBoxMng.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
const AdminDashboard = () => {
  // Data lists
  const [categories, setCategories] = useState([]);
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [handbags, setHandbags] = useState([]);

  // Option to add: "category", "giftBox", or "handbag"
  const [selectedOption, setSelectedOption] = useState("category");

  // Form state for Category
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  // Form state for Gift Box
  const [newGiftBox, setNewGiftBox] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    minOrderQuantity: "",
    hasMatchingHandbag: false,
    matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
  });

  // Form state for General Handbag
  const [newHandbag, setNewHandbag] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    minOrderQuantity: "",
  });

  // States for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editType, setEditType] = useState(""); // "category", "giftBox", "handbag"
  const [editId, setEditId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all lists from the server
  const fetchData = async () => {
    try {
      const [categoryRes, giftBoxRes, handbagRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/giftboxpage/categories`),
        axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes`),
        axios.get(`${BASE_URL}/api/giftboxpage/generalHandbags`),
      ]);
      setCategories(categoryRes.data);
      setGiftBoxes(giftBoxRes.data);
      setHandbags(handbagRes.data);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
    }
  };

  // ----------------- File Upload Helpers -----------------
  // Convert a file to a Base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCategoryImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewCategory(prev => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting category image to Base64:", error);
      }
    }
  };


  
    // Deletion and Edit remain unchanged
    const handleDelete = async (id, type) => {
      const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
      try {
        await axios.delete(endpoint);
        fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };
  

  const handleGiftBoxImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewGiftBox(prev => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting gift box image to Base64:", error);
      }
    }
  };

  const handleGiftBoxMatchingHandbagImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewGiftBox(prev => ({
          ...prev,
          matchingHandbag: { ...prev.matchingHandbag, image: base64 },
        }));
      } catch (error) {
        console.error("Error converting matching handbag image to Base64:", error);
      }
    }
  };

  const handleHandbagImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewHandbag(prev => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting handbag image to Base64:", error);
      }
    }
  };

  // ----------------- Add Data Functions -----------------

  const handleAddCategory = async () => {
    try {
      await axios.post(`${BASE_URL}/api/giftboxpage/categories`, newCategory);
      setNewCategory({ name: "", image: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddGiftBox = async () => {
    try {
      // Debug: log the current state so you can verify that matchingHandbag details are present.
      console.log("newGiftBox state before payload preparation:", newGiftBox);
  
      // Prepare the payload. We wrap the matchingHandbag object into an array if the checkbox is checked.
      // Removing any extra condition (e.g., checking that name exists) lets you inspect the resulting payload.
      const payload = {
        ...newGiftBox,
        matchingHandbags: newGiftBox.hasMatchingHandbag ? [newGiftBox.matchingHandbag] : [],
      };
  
      // Remove the singular matchingHandbag field if your backend expects only matchingHandbags.
      delete payload.matchingHandbag;
  
      console.log("Payload being sent:", payload);
  
      await axios.post(`${BASE_URL}/api/giftboxpage/giftBoxes`, payload);
  
      // Reset the form state after a successful submission.
      setNewGiftBox({
        name: "",
        description: "",
        category: "",
        image: "",
        price: "",
        minOrderQuantity: "",
        hasMatchingHandbag: false,
        matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
      });
      fetchData();
    } catch (error) {
      console.error("Error adding gift box:", error);
    }
  };

  const handleAddHandbag = async () => {
    try {
      await axios.post(`${BASE_URL}/api/giftboxpage/generalHandbags`, newHandbag);
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding handbag:", error);
    }
  };

  // ----------------- Update Data Functions -----------------

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`${BASE_URL}/api/giftboxpage/categories/${editId}`, newCategory);
      setNewCategory({ name: "", image: "" });
      setEditMode(false);
      setEditType("");
      setEditId("");
      fetchData();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleUpdateGiftBox = async () => {
    try {
      await axios.put(`${BASE_URL}/api/giftboxpage/giftBoxes/${editId}`, newGiftBox);
      setNewGiftBox({
        name: "",
        description: "",
        category: "",
        image: "",
        price: "",
        minOrderQuantity: "",
        hasMatchingHandbag: false,
        matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
      });
      setEditMode(false);
      setEditType("");
      setEditId("");
      fetchData();
    } catch (error) {
      console.error("Error updating gift box:", error);
    }
  };

  const handleUpdateHandbag = async () => {
    try {
      await axios.put(`${BASE_URL}/api/giftboxpage/generalHandbags/${editId}`, newHandbag);
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
      setEditMode(false);
      setEditType("");
      setEditId("");
      fetchData();
    } catch (error) {
      console.error("Error updating handbag:", error);
    }
  };

  // Cancel edit mode and reset the respective form
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditType("");
    setEditId("");
    if (selectedOption === "category") {
      setNewCategory({ name: "", image: "" });
    } else if (selectedOption === "giftBox") {
      setNewGiftBox({
        name: "",
        description: "",
        category: "",
        image: "",
        price: "",
        minOrderQuantity: "",
        hasMatchingHandbag: false,
        matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
      });
    } else if (selectedOption === "handbag") {
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
    }
  };

  // ----------------- Edit Button Handler -----------------
  const handleEdit = (item, type) => {
    // Switch form type based on what is being edited
    setSelectedOption(type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag");
    setEditMode(true);
    setEditType(type);
    setEditId(item._id);

    if (type === "category") {
      setNewCategory({ name: item.name, image: item.image });
    } else if (type === "giftBox") {
      setNewGiftBox({
        name: item.name,
        description: item.description,
        category: item.category && item.category._id ? item.category._id : item.category,
        image: item.image,
        price: item.price,
        minOrderQuantity: item.minOrderQuantity,
        hasMatchingHandbag: item.matchingHandbags && item.matchingHandbags.length > 0,
        matchingHandbag:
          item.matchingHandbags && item.matchingHandbags.length > 0
            ? item.matchingHandbags[0]
            : { name: "", image: "", price: "", minOrderQuantity: "" },
      });
    } else if (type === "handbag") {
      setNewHandbag({
        name: item.name,
        category: item.category && item.category._id ? item.category._id : item.category,
        image: item.image,
        price: item.price,
        minOrderQuantity: item.minOrderQuantity,
      });
    }
  };

  // ----------------- Render -----------------
  return (
    <div className={styles.adminContainer}>
      <h1>Admin Dashboard</h1>

      {/* ----- Form to Add or Edit Data ----- */}
      <div className={styles.formContainer}>
        <h2>{editMode ? "Edit Data" : "Add New Data"}</h2>
        <div className={styles.selectionContainer}>
          <label htmlFor="addOption">Select Type to Add:</label>
          <select
            id="addOption"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              if (editMode) handleCancelEdit();
            }}
          >
            <option value="category">Category</option>
            <option value="giftBox">Gift Box</option>
            <option value="handbag">General Handbag</option>
          </select>
        </div>

        {/* ----- Category Form ----- */}
        {selectedOption === "category" && (
          <div className={styles.formSection}>
            <h3>{editMode && editType === "category" ? "Edit Category" : "Add New Category"}</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            {/* Show previous image preview (if editing and image exists) */}
            {editMode && editType === "category" && newCategory.image && (
              <div className={styles.imagePreviewContainer}>
                <img
                  src={newCategory.image}
                  alt="Current Category"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <button
                  className={styles.imageDeleteButton}
                  onClick={() => setNewCategory({ ...newCategory, image: "" })}
                >
                  X
                </button>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleCategoryImageUpload} />
            <button
              onClick={
                editMode && editType === "category" ? handleUpdateCategory : handleAddCategory
              }
            >
              {editMode && editType === "category" ? "Update Category" : "Save Category"}
            </button>
            {editMode && editType === "category" && (
              <button onClick={handleCancelEdit}>Cancel</button>
            )}
          </div>
        )}

        {/* ----- Gift Box Form ----- */}
       {/* ----- Gift Box Form ----- */}
{selectedOption === "giftBox" && (
  <div className={styles.formSection}>
    <h3>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h3>
    <input
      type="text"
      placeholder="Gift Box Name"
      value={newGiftBox.name}
      onChange={(e) =>
        setNewGiftBox({ ...newGiftBox, name: e.target.value })
      }
    />
    <input
      type="text"
      placeholder="Description"
      value={newGiftBox.description}
      onChange={(e) =>
        setNewGiftBox({ ...newGiftBox, description: e.target.value })
      }
    />
    <label>Select Category:</label>
    <select
      value={newGiftBox.category}
      onChange={(e) =>
        setNewGiftBox({ ...newGiftBox, category: e.target.value })
      }
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      ))}
    </select>
    {/* Gift Box Image Preview */}
    {editMode && editType === "giftBox" && newGiftBox.image && (
      <div className={styles.imagePreviewContainer}>
        <img
          src={newGiftBox.image}
          alt="Current Gift Box"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <button
          className={styles.imageDeleteButton}
          onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}
        >
          X
        </button>
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={handleGiftBoxImageUpload}
    />
    <input
      type="number"
      placeholder="Price"
      value={newGiftBox.price}
      onChange={(e) =>
        setNewGiftBox({ ...newGiftBox, price: e.target.value })
      }
    />
    <input
      type="number"
      placeholder="Min Order Quantity"
      value={newGiftBox.minOrderQuantity}
      onChange={(e) =>
        setNewGiftBox({
          ...newGiftBox,
          minOrderQuantity: e.target.value,
        })
      }
    />
    <div>
      <input
        type="checkbox"
        checked={newGiftBox.hasMatchingHandbag}
        onChange={(e) =>
          setNewGiftBox({
            ...newGiftBox,
            hasMatchingHandbag: e.target.checked,
            // Initialize matchingHandbag object if checked; remove otherwise.
            matchingHandbag: e.target.checked
              ? newGiftBox.matchingHandbag || {}
              : null,
          })
        }
      />
      <label>Has Matching Handbag</label>
    </div>
    {/* Matching Handbag Details */}
    {newGiftBox.hasMatchingHandbag && (
      <div className={styles.matchingHandbagDetails}>
        <input
          type="text"
          placeholder="Matching Handbag Name"
          value={
            (newGiftBox.matchingHandbag &&
              newGiftBox.matchingHandbag.name) ||
            ""
          }
          onChange={(e) =>
            setNewGiftBox({
              ...newGiftBox,
              matchingHandbag: {
                ...newGiftBox.matchingHandbag,
                name: e.target.value,
              },
            })
          }
        />
        <input
          type="number"
          placeholder="Matching Handbag Price"
          value={
            (newGiftBox.matchingHandbag &&
              newGiftBox.matchingHandbag.price) ||
            ""
          }
          onChange={(e) =>
            setNewGiftBox({
              ...newGiftBox,
              matchingHandbag: {
                ...newGiftBox.matchingHandbag,
                price: e.target.value,
              },
            })
          }
        />
        <input
          type="number"
          placeholder="Matching Handbag Min Order Quantity"
          value={
            (newGiftBox.matchingHandbag &&
              newGiftBox.matchingHandbag.minOrderQuantity) ||
            ""
          }
          onChange={(e) =>
            setNewGiftBox({
              ...newGiftBox,
              matchingHandbag: {
                ...newGiftBox.matchingHandbag,
                minOrderQuantity: e.target.value,
              },
            })
          }
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleGiftBoxMatchingHandbagImageUpload}
        />
        {newGiftBox.matchingHandbag &&
          newGiftBox.matchingHandbag.image && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={newGiftBox.matchingHandbag.image}
                alt="Current Matching Handbag"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <button
                className={styles.imageDeleteButton}
                onClick={() =>
                  setNewGiftBox({
                    ...newGiftBox,
                    matchingHandbag: {
                      ...newGiftBox.matchingHandbag,
                      image: "",
                    },
                  })
                }
              >
                X
              </button>
            </div>
          )}
      </div>
    )}
    <button
      onClick={
        editMode && editType === "giftBox"
          ? handleUpdateGiftBox
          : handleAddGiftBox
      }
    >
      {editMode && editType === "giftBox"
        ? "Update Gift Box"
        : "Save Gift Box"}
    </button>
    {editMode && editType === "giftBox" && (
      <button onClick={handleCancelEdit}>Cancel</button>
    )}
  </div>
)}
        {/* ----- General Handbag Form ----- */}
        {selectedOption === "handbag" && (
          <div className={styles.formSection}>
            <h3>{editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}</h3>
            <label>Select Category:</label>
            <select
              value={newHandbag.category}
              onChange={(e) => setNewHandbag({ ...newHandbag, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Handbag Name"
              value={newHandbag.name}
              onChange={(e) => setNewHandbag({ ...newHandbag, name: e.target.value })}
            />
            {/* Preview for Handbag Image */}
            {editMode && editType === "handbag" && newHandbag.image && (
              <div className={styles.imagePreviewContainer}>
                <img
                  src={newHandbag.image}
                  alt="Current Handbag"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <button
                  className={styles.imageDeleteButton}
                  onClick={() => setNewHandbag({ ...newHandbag, image: "" })}
                >
                  X
                </button>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleHandbagImageUpload} />
            <input
              type="number"
              placeholder="Price"
              value={newHandbag.price}
              onChange={(e) => setNewHandbag({ ...newHandbag, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Min Order Quantity"
              value={newHandbag.minOrderQuantity}
              onChange={(e) => setNewHandbag({ ...newHandbag, minOrderQuantity: e.target.value })}
            />
            <button
              onClick={editMode && editType === "handbag" ? handleUpdateHandbag : handleAddHandbag}
            >
              {editMode && editType === "handbag" ? "Update Handbag" : "Save Handbag"}
            </button>
            {editMode && editType === "handbag" && (
              <button onClick={handleCancelEdit}>Cancel</button>
            )}
          </div>
        )}
      </div>

      {/* ---------------- Data Tables ---------------- */}
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
              <td>
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className={styles.previewImage} />
                ) : (
                  "NA"
                )}
              </td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(cat, "category")}>
                  Edit
                </button>
                <button className={styles.delete} onClick={() => handleDelete(cat._id, "categories")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <td>
                {box.image ? (
                  <img src={box.image} alt={box.name} className={styles.previewImage} />
                ) : (
                  "NA"
                )}
              </td>
              <td>{box.price !== undefined ? `₹${box.price}` : "NA"}</td>
              <td>{box.minOrderQuantity !== undefined ? box.minOrderQuantity : "NA"}</td>
              <td>
                {box.matchingHandbags && box.matchingHandbags.length > 0
                  ? box.matchingHandbags.map((hb) => `${hb.name} (₹${hb.price})`).join(", ")
                  : "NA"}
              </td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(box, "giftBox")}>
                  Edit
                </button>
                <button className={styles.delete} onClick={() => handleDelete(box._id, "giftBoxes")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <td>
                {hb.image ? (
                  <img src={hb.image} alt={hb.name} className={styles.previewImage} />
                ) : (
                  "NA"
                )}
              </td>
              <td>{hb.price !== undefined ? `₹${hb.price}` : "NA"}</td>
              <td>{hb.minOrderQuantity !== undefined ? hb.minOrderQuantity : "NA"}</td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(hb, "handbag")}>
                  Edit
                </button>
                <button className={styles.delete} onClick={() => handleDelete(hb._id, "generalHandbags")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;