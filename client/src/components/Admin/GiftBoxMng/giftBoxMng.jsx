


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./giftBoxMng.module.css";
// import { BASE_URL } from "../../../Const/Const";

// const AdminDashboard = () => {
//   // Data lists: categories, gift boxes, and general handbags
//   const [categories, setCategories] = useState([]);
//   const [giftBoxes, setGiftBoxes] = useState([]);
//   const [handbags, setHandbags] = useState([]);

//   // Which form to display: "category", "giftBox", or "handbag"
//   const [selectedOption, setSelectedOption] = useState("category");

//   // Form state for Category
//   const [newCategory, setNewCategory] = useState({ name: "", image: "" });

//   // Form state for Gift Box with sweets – note use of preferredSweets field
//   const [newGiftBox, setNewGiftBox] = useState({
//     name: "",
//     description: "",
//     category: "",
//     image: "",
//     price: "",
//     minOrderQuantity: "",
//     hasMatchingHandbag: false,
//     matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//     sweetsQuantity: "",
//     preferredSweets: [],
//   });

//   // Form state for General Handbag
//   const [newHandbag, setNewHandbag] = useState({
//     name: "",
//     category: "",
//     image: "",
//     price: "",
//     minOrderQuantity: "",
//   });

//   // Edit mode states and corresponding type information
//   const [editMode, setEditMode] = useState(false);
//   const [editType, setEditType] = useState(""); // "category", "giftBox", "handbag"
//   const [editId, setEditId] = useState("");

//   // Sweets modal state + loader flag
//   const [sweets, setSweets] = useState([]);
//   const [showSweetsModal, setShowSweetsModal] = useState(false);
//   const [loadingSweets, setLoadingSweets] = useState(false);

//   // For debugging modal updates
//   useEffect(() => {
//     console.log("Modal visibility:", showSweetsModal);
//   }, [showSweetsModal]);

//   // Fetch all categories, gift boxes, and general handbags on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Fetch data for categories, gift boxes, and general handbags
//   const fetchData = async () => {
//     try {
//       const [categoryRes, giftBoxRes, handbagRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/giftboxpage/categories`),
//         axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes`),
//         axios.get(`${BASE_URL}/api/giftboxpage/generalHandbags`),
//       ]);
//       setCategories(categoryRes.data);
//       setGiftBoxes(giftBoxRes.data);
//       setHandbags(handbagRes.data);
//     } catch (error) {
//       console.error("Error fetching data:", error.response?.data || error.message);
//     }
//   };

//   // Fetch sweets from products where category is "Sweets"
//   const fetchSweets = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/products`, {
//         params: { category: "Sweets" },
//       });
//       console.log("Fetched sweets data:", response.data);
//       // Expect API response to be: { products: [...] }
//       if (response.data && Array.isArray(response.data.products)) {
//         setSweets(response.data.products);
//       } else {
//         setSweets([]);
//       }
//     } catch (error) {
//       console.error("Error fetching sweets:", error);
//       setSweets([]);
//     }
//   };

//   // Utility: convert a file to a Base64-encoded string
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // IMAGE UPLOAD HANDLERS
//   const handleCategoryImageUpload = async (e) => {
//     if (e.target.files?.[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewCategory((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting category image:", error);
//       }
//     }
//   };

//   const handleGiftBoxImageUpload = async (e) => {
//     if (e.target.files?.[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewGiftBox((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting gift box image:", error);
//       }
//     }
//   };

//   const handleGiftBoxMatchingHandbagImageUpload = async (e) => {
//     if (e.target.files?.[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewGiftBox((prev) => ({
//           ...prev,
//           matchingHandbag: { ...prev.matchingHandbag, image: base64 },
//         }));
//       } catch (error) {
//         console.error("Error converting matching handbag image:", error);
//       }
//     }
//   };

//   const handleHandbagImageUpload = async (e) => {
//     if (e.target.files?.[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewHandbag((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting handbag image:", error);
//       }
//     }
//   };

//   // DELETE HANDLER
//   const handleDelete = async (id, type) => {
//     const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
//     try {
//       await axios.delete(endpoint);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   // CREATE / ADD FUNCTIONS
//   const handleAddCategory = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/giftboxpage/categories`, newCategory);
//       setNewCategory({ name: "", image: "" });
//       fetchData();
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   const handleAddGiftBox = async () => {
//     try {
//       const payload = {
//         ...newGiftBox,
//         // If matchingHandbag exists, store it as an array.
//         matchingHandbags: newGiftBox.hasMatchingHandbag ? [newGiftBox.matchingHandbag] : [],
//       };
//       // Remove singular matchingHandbag field if necessary.
//       delete payload.matchingHandbag;
//       await axios.post(`${BASE_URL}/api/giftboxpage/giftBoxes`, payload);
//       setNewGiftBox({
//         name: "",
//         description: "",
//         category: "",
//         image: "",
//         price: "",
//         minOrderQuantity: "",
//         hasMatchingHandbag: false,
//         matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//         sweetsQuantity: "",
//         preferredSweets: [],
//       });
//       fetchData();
//     } catch (error) {
//       console.error("Error adding gift box:", error);
//     }
//   };

//   const handleAddHandbag = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/giftboxpage/generalHandbags`, newHandbag);
//       setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
//       fetchData();
//     } catch (error) {
//       console.error("Error adding handbag:", error);
//     }
//   };

//   // UPDATE FUNCTIONS
//   const handleUpdateCategory = async () => {
//     try {
//       await axios.put(`${BASE_URL}/api/giftboxpage/categories/${editId}`, newCategory);
//       setNewCategory({ name: "", image: "" });
//       setEditMode(false);
//       setEditType("");
//       setEditId("");
//       fetchData();
//     } catch (error) {
//       console.error("Error updating category:", error);
//     }
//   };


//   // EDIT HANDLER: Prepopulate form fields for editing
// const handleEdit = (item, type) => {
//   setSelectedOption(
//     type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag"
//   );
//   setEditMode(true);
//   setEditType(type);
//   setEditId(item._id);

//   if (type === "category") {
//     setNewCategory({ name: item.name, image: item.image });
//   } else if (type === "giftBox") {
//     setNewGiftBox({
//       name: item.name,
//       description: item.description,
//       category: item.category && item.category._id ? item.category._id : item.category,
//       image: item.image,
//       price: item.price,
//       minOrderQuantity: item.minOrderQuantity,
//       hasMatchingHandbag:
//         item.matchingHandbags && item.matchingHandbags.length > 0,
//       matchingHandbag:
//         item.matchingHandbags && item.matchingHandbags.length > 0
//           ? item.matchingHandbags[0]
//           : { name: "", image: "", price: "", minOrderQuantity: "" },
//       sweetsQuantity: item.sweetsQuantity || "",
//       // Ensure preferredSweets is always an array
//       preferredSweets: Array.isArray(item.preferredSweets)
//         ? item.preferredSweets
//         : [],
//     });
//   } else if (type === "handbag") {
//     setNewHandbag({
//       name: item.name,
//       category: item.category && item.category._id ? item.category._id : item.category,
//       image: item.image,
//       price: item.price,
//       minOrderQuantity: item.minOrderQuantity,
//     });
//   }
// };

//   const handleUpdateGiftBox = async () => {
//     try {
//       await axios.put(`${BASE_URL}/api/giftboxpage/giftBoxes/${editId}`, newGiftBox);
//       setNewGiftBox({
//         name: "",
//         description: "",
//         category: "",
//         image: "",
//         price: "",
//         minOrderQuantity: "",
//         hasMatchingHandbag: false,
//         matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//         sweetsQuantity: "",
//         preferredSweets: [],
//       });
//       setEditMode(false);
//       setEditType("");
//       setEditId("");
//       fetchData();
//     } catch (error) {
//       console.error("Error updating gift box:", error);
//     }
//   };

//   const handleUpdateHandbag = async () => {
//     try {
//       await axios.put(`${BASE_URL}/api/giftboxpage/generalHandbags/${editId}`, newHandbag);
//       setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
//       setEditMode(false);
//       setEditType("");
//       setEditId("");
//       fetchData();
//     } catch (error) {
//       console.error("Error updating handbag:", error);
//     }
//   };

//   // CANCEL EDIT MODE: Reset the form fields
//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setEditType("");
//     setEditId("");
//     if (selectedOption === "category") {
//       setNewCategory({ name: "", image: "" });
//     } else if (selectedOption === "giftBox") {
//       setNewGiftBox({
//         name: "",
//         description: "",
//         category: "",
//         image: "",
//         price: "",
//         minOrderQuantity: "",
//         hasMatchingHandbag: false,
//         matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//         sweetsQuantity: "",
//         preferredSweets: [],
//       });
//     } else if (selectedOption === "handbag") {
//       setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
//     }
//   };

//   // Sweets Modal Functions for Admin (selecting preferred sweets for a gift box)
//   const openSweetsModal = async () => {
//     console.log("Button clicked! Opening modal...");
//     setShowSweetsModal(true);
//     setLoadingSweets(true);
//     await fetchSweets();
//     setLoadingSweets(false);
//   };

//   // TOGGLE a sweet selection in the modal: update preferredSweets array
//   const handleSweetsCheckboxChange = (sweetId) => {
//     setNewGiftBox((prev) => {
//       const { preferredSweets } = prev;
//       if (preferredSweets.includes(sweetId)) {
//         return { ...prev, preferredSweets: preferredSweets.filter((id) => id !== sweetId) };
//       } else {
//         return { ...prev, preferredSweets: [...preferredSweets, sweetId] };
//       }
//     });
//   };

//   // Utility function to get the full sweet objects based on IDs selected by admin.
//   const getSelectedSweetsDetails = () => {
//     return sweets.filter((sweet) => newGiftBox.preferredSweets.includes(sweet._id));
//   };

//   return (
//     <div className={styles.adminContainer}>
//       <h1>Admin Dashboard - Gift Box Management</h1>
//       <div className={styles.navigation}>
//         <button onClick={() => setSelectedOption("category")}>Categories</button>
//         <button onClick={() => setSelectedOption("giftBox")}>Gift Boxes</button>
//         <button onClick={() => setSelectedOption("handbag")}>Handbags</button>
//       </div>

//       {selectedOption === "category" && (
//         <div className={styles.formContainer}>
//           <h2>Add Category</h2>
//           <input
//             type="text"
//             placeholder="Category Name"
//             value={newCategory.name}
//             onChange={(e) =>
//               setNewCategory({ ...newCategory, name: e.target.value })
//             }
//           />
//           <input type="file" onChange={handleCategoryImageUpload} />
//           <button onClick={handleAddCategory}>Add Category</button>
//         </div>
//       )}

//       {selectedOption === "giftBox" && (
//         <div className={styles.formContainer}>
//           <h2>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h2>
//           <input
//             type="text"
//             placeholder="Gift Box Name"
//             value={newGiftBox.name}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newGiftBox.description}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, description: e.target.value })}
//           />
//           <label>Select Category:</label>
//           <select
//             value={newGiftBox.category}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, category: e.target.value })}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {editMode && editType === "giftBox" && newGiftBox.image && (
//             <div className={styles.imagePreviewContainer}>
//               <img
//                 src={newGiftBox.image}
//                 alt="Current Gift Box"
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//               <button className={styles.imageDeleteButton} onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}>
//                 X
//               </button>
//             </div>
//           )}
//           <input type="file" accept="image/*" onChange={handleGiftBoxImageUpload} />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newGiftBox.price}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, price: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Min Order Quantity"
//             value={newGiftBox.minOrderQuantity}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, minOrderQuantity: e.target.value })}
//           />
//           {/* Matching Handbag Section */}
//           <div>
//             <input
//               type="checkbox"
//               checked={newGiftBox.hasMatchingHandbag}
//               onChange={(e) =>
//                 setNewGiftBox({
//                   ...newGiftBox,
//                   hasMatchingHandbag: e.target.checked,
//                   matchingHandbag: e.target.checked ? newGiftBox.matchingHandbag || {} : null,
//                 })
//               }
//             />
//             <label>Has Matching Handbag</label>
//           </div>
//           {newGiftBox.hasMatchingHandbag && (
//             <div className={styles.matchingHandbagDetails}>
//               <input
//                 type="text"
//                 placeholder="Matching Handbag Name"
//                 value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.name : ""}
//                 onChange={(e) =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     matchingHandbag: { ...newGiftBox.matchingHandbag, name: e.target.value },
//                   })
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Matching Handbag Price"
//                 value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.price : ""}
//                 onChange={(e) =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     matchingHandbag: { ...newGiftBox.matchingHandbag, price: e.target.value },
//                   })
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Matching Handbag Min Order Quantity"
//                 value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.minOrderQuantity : ""}
//                 onChange={(e) =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     matchingHandbag: { ...newGiftBox.matchingHandbag, minOrderQuantity: e.target.value },
//                   })
//                 }
//               />
//               <input type="file" accept="image/*" onChange={handleGiftBoxMatchingHandbagImageUpload} />
//               {newGiftBox.matchingHandbag && newGiftBox.matchingHandbag.image && (
//                 <div className={styles.imagePreviewContainer}>
//                   <img
//                     src={newGiftBox.matchingHandbag.image}
//                     alt="Current Matching Handbag"
//                     style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                   />
//                   <button
//                     className={styles.imageDeleteButton}
//                     onClick={() =>
//                       setNewGiftBox({
//                         ...newGiftBox,
//                         matchingHandbag: { ...newGiftBox.matchingHandbag, image: "" },
//                       })
//                     }
//                   >
//                     X
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//           <input
//             type="number"
//             placeholder="Sweets Quantity Allowed"
//             value={newGiftBox.sweetsQuantity}
//             onChange={(e) => setNewGiftBox({ ...newGiftBox, sweetsQuantity: e.target.value })}
//           />
//           <div>
//             <button onClick={openSweetsModal}>Select the Preferable Sweets</button>
//             {newGiftBox.preferredSweets.length > 0 && (
//               <div>
//                 <h3>Selected Sweets:</h3>
//                 <ul>
//                   {getSelectedSweetsDetails().map((sweet) => (
//                     <li key={sweet._id}>
//                       {sweet.name} - ₹{sweet.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div>
//             {editMode && editType === "giftBox" ? (
//               <button onClick={handleUpdateGiftBox}>Update Gift Box</button>
//             ) : (
//               <button onClick={handleAddGiftBox}>Add Gift Box</button>
//             )}
//             {editMode && editType === "giftBox" && (
//               <button onClick={handleCancelEdit}>Cancel Edit</button>
//             )}
//           </div>
//         </div>
//       )}

//       {selectedOption === "handbag" && (
//         <div className={styles.formContainer}>
//           <h2>{editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}</h2>
//           <label>Select Category:</label>
//           <select
//             value={newHandbag.category}
//             onChange={(e) => setNewHandbag({ ...newHandbag, category: e.target.value })}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             placeholder="Handbag Name"
//             value={newHandbag.name}
//             onChange={(e) => setNewHandbag({ ...newHandbag, name: e.target.value })}
//           />
//           {editMode && editType === "handbag" && newHandbag.image && (
//             <div className={styles.imagePreviewContainer}>
//               <img
//                 src={newHandbag.image}
//                 alt="Current Handbag"
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//               <button className={styles.imageDeleteButton} onClick={() => setNewHandbag({ ...newHandbag, image: "" })}>
//                 X
//               </button>
//             </div>
//           )}
//           <input type="file" accept="image/*" onChange={handleHandbagImageUpload} />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newHandbag.price}
//             onChange={(e) => setNewHandbag({ ...newHandbag, price: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Min Order Quantity"
//             value={newHandbag.minOrderQuantity}
//             onChange={(e) => setNewHandbag({ ...newHandbag, minOrderQuantity: e.target.value })}
//           />
//           <div>
//             {editMode && editType === "handbag" ? (
//               <button onClick={handleUpdateHandbag}>Update Handbag</button>
//             ) : (
//               <button onClick={handleAddHandbag}>Add Handbag</button>
//             )}
//             {editMode && editType === "handbag" && (
//               <button onClick={handleCancelEdit}>Cancel Edit</button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ---------------- Data Tables ---------------- */}
//       <h2>Categories</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((cat) => (
//             <tr key={cat._id}>
//               <td>{cat.name || "NA"}</td>
//               <td>
//                 {cat.image ? (
//                   <img src={cat.image} alt={cat.name} className={styles.previewImage} />
//                 ) : (
//                   "NA"
//                 )}
//               </td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(cat, "category")}>
//                   Edit
//                 </button>
//                 <button className={styles.delete} onClick={() => handleDelete(cat._id, "categories")}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Gift Boxes</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Min Order</th>
//             <th>Matching Handbags</th>
//             <th>Sweets Qty</th>
//             <th>Preferred Sweets</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {giftBoxes.map((box) => (
//             <tr key={box._id}>
//               <td>{box.name || "NA"}</td>
//               <td>{box.category?.name || "NA"}</td>
//               <td>
//                 {box.image ? (
//                   <img src={box.image} alt={box.name} className={styles.previewImage} />
//                 ) : (
//                   "NA"
//                 )}
//               </td>
//               <td>{box.price !== undefined ? `₹${box.price}` : "NA"}</td>
//               <td>{box.minOrderQuantity !== undefined ? box.minOrderQuantity : "NA"}</td>
//               <td>
//                 {box.matchingHandbags && box.matchingHandbags.length > 0
//                   ? box.matchingHandbags.map((hb) => `${hb.name} (₹${hb.price})`).join(", ")
//                   : "NA"}
//               </td>
//               <td>{box.sweetsQuantity || "NA"}</td>
//               <td>
//                 {box.preferredSweets && box.preferredSweets.length > 0 ? (
//                   box.preferredSweets.map((sweet) => (
//                     <div key={sweet._id} className={styles.preferredSweet}>
//                       <div>
//                         {sweet.name} - ₹{sweet.price}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   "NA"
//                 )}
//               </td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(box, "giftBox")}>
//                   Edit
//                 </button>
//                 <button className={styles.delete} onClick={() => handleDelete(box._id, "giftBoxes")}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>General Handbags</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Min Order</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {handbags.map((hb) => (
//             <tr key={hb._id}>
//               <td>{hb.name || "NA"}</td>
//               <td>{hb.category?.name || "NA"}</td>
//               <td>
//                 {hb.image ? (
//                   <img src={hb.image} alt={hb.name} className={styles.previewImage} />
//                 ) : (
//                   "NA"
//                 )}
//               </td>
//               <td>{hb.price !== undefined ? `₹${hb.price}` : "NA"}</td>
//               <td>{hb.minOrderQuantity !== undefined ? hb.minOrderQuantity : "NA"}</td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(hb, "handbag")}>
//                   Edit
//                 </button>
//                 <button className={styles.delete} onClick={() => handleDelete(hb._id, "generalHandbags")}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Sweets Selection Modal */}
//       {showSweetsModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h3>Select Sweets</h3>
//             {loadingSweets ? (
//               <div className={styles.loader}>Loading...</div>
//             ) : (
//               <>
//                 {Array.isArray(sweets) && sweets.length > 0 ? (
//                   sweets.map((sweet) => (
//                     <div key={sweet._id} className={styles.sweetItem}>
//                       <input
//                         type="checkbox"
//                         checked={newGiftBox.preferredSweets.includes(sweet._id)}
//                         onChange={() => handleSweetsCheckboxChange(sweet._id)}
//                       />
//                       <img src={sweet.image} alt={sweet.name} className={styles.sweetImage} />
//                       <span>
//                         {sweet.name} - ₹{sweet.price}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No sweets available.</p>
//                 )}
//               </>
//             )}
//             <button onClick={() => setShowSweetsModal(false)}>Done</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;








import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./giftBoxMng.module.css";
import { BASE_URL } from "../../../Const/Const";

const AdminDashboard = () => {
  // Data lists: categories, gift boxes, and general handbags
  const [categories, setCategories] = useState([]);
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [handbags, setHandbags] = useState([]);

  // Which form to display: "category", "giftBox", or "handbag"
  const [selectedOption, setSelectedOption] = useState("category");

  // Form state for Category
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  // Form state for Gift Box with sweets – note use of preferredSweets field
  const [newGiftBox, setNewGiftBox] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    minOrderQuantity: "",
    hasMatchingHandbag: false,
    matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
    sweetsQuantity: "",
    preferredSweets: [],
  });


  // outside your component
const initialGiftBox = {
  name: "",
  description: "",
  category: "",
  image: "",               // File or ""
  price: "",
  minOrderQuantity: "",
  hasMatchingHandbag: false,
  matchingHandbag: {
    name: "",
    image: "",             // File or ""
    price: "",
    minOrderQuantity: ""
  },
  sweetsQuantity: "",
  preferredSweets: []
};

  // Form state for General Handbag
  const [newHandbag, setNewHandbag] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    minOrderQuantity: "",
  });

  // Edit mode states and corresponding type information
  const [editMode, setEditMode] = useState(false);
  const [editType, setEditType] = useState(""); // "category", "giftBox", "handbag"
  const [editId, setEditId] = useState("");

  // Sweets modal state + loader flag
  const [sweets, setSweets] = useState([]);
  const [showSweetsModal, setShowSweetsModal] = useState(false);
  const [loadingSweets, setLoadingSweets] = useState(false);

  // --------------------
  // Missing function definitions
  // --------------------
  const handleDelete = async (id, type) => {
    const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
    try {
      await axios.delete(endpoint);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item, type) => {
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
        sweetsQuantity: item.sweetsQuantity || "",
        preferredSweets: Array.isArray(item.preferredSweets) ? item.preferredSweets : [],
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

  const handleAddHandbag = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newHandbag.name);
      formData.append("category", newHandbag.category);
      formData.append("price", newHandbag.price);
      formData.append("minOrderQuantity", newHandbag.minOrderQuantity);
      if (newHandbag.image instanceof File) {
        formData.append("image", newHandbag.image);
      }
      await axios.post(`${BASE_URL}/api/giftboxpage/generalHandbags`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding handbag:", error);
    }
  };

  // --------------------
  // End missing functions
  // --------------------

  // Fetch all categories, gift boxes, and general handbags on component mount
  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchSweets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`, {
        params: { category: "Sweets" },
      });
      console.log("Fetched sweets data:", response.data);
      if (response.data && Array.isArray(response.data.products)) {
        setSweets(response.data.products);
      } else {
        setSweets([]);
      }
    } catch (error) {
      console.error("Error fetching sweets:", error);
      setSweets([]);
    }
  };

  // IMAGE UPLOAD HANDLERS
  const handleCategoryImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setNewCategory((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleGiftBoxImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setNewGiftBox((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleGiftBoxMatchingHandbagImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setNewGiftBox((prev) => ({
        ...prev,
        matchingHandbag: { ...prev.matchingHandbag, image: e.target.files[0] },
      }));
    }
  };

  const handleHandbagImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setNewHandbag((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

 const handleAddCategory = async () => {
  const fd = new FormData();
  fd.append("name", newCategory.name);
  if (newCategory.image instanceof File) {
    fd.append("image", newCategory.image);
  }
  await axios.post(`${BASE_URL}/api/giftboxpage/categories`, fd, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  fetchData();
};

const handleUpdateCategory = async () => {
  const fd = new FormData();
  fd.append("name", newCategory.name);
  if (newCategory.image instanceof File) {
    fd.append("image", newCategory.image);
  }
  await axios.put(
    `${BASE_URL}/api/giftboxpage/categories/${editId}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  fetchData();
  handleCancelEdit();
};
  // const handleAddGiftBox = async () => {
  //   try {
  //     const payload = { ...newGiftBox };
  //     if (newGiftBox.hasMatchingHandbag) {
  //       payload.matchingHandbags = [newGiftBox.matchingHandbag];
  //     } else {
  //       payload.matchingHandbags = [];
  //     }
  //     delete payload.matchingHandbag;
  //     await axios.post(`${BASE_URL}/api/giftboxpage/giftBoxes`, payload);
  //     setNewGiftBox({
  //       name: "",
  //       description: "",
  //       category: "",
  //       image: "",
  //       price: "",
  //       minOrderQuantity: "",
  //       hasMatchingHandbag: false,
  //       matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
  //       sweetsQuantity: "",
  //       preferredSweets: [],
  //     });
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error adding gift box:", error);
  //   }
  // };

 const handleAddGiftBox = async () => {
  try {
    const fd = new FormData();
    // primitives:
    fd.append("name", newGiftBox.name);
    fd.append("description", newGiftBox.description);
    fd.append("category", newGiftBox.category);
    fd.append("price", newGiftBox.price);
    fd.append("minOrderQuantity", newGiftBox.minOrderQuantity);
    fd.append("sweetsQuantity", newGiftBox.sweetsQuantity);

    // main image
    if (newGiftBox.image instanceof File) {
      fd.append("image", newGiftBox.image);
    }

    // matching handbag data + file
    if (newGiftBox.hasMatchingHandbag) {
      const meta = {
        name: newGiftBox.matchingHandbag.name,
        price: newGiftBox.matchingHandbag.price,
        minOrderQuantity: newGiftBox.matchingHandbag.minOrderQuantity,
      };
      fd.append("matchingHandbags", JSON.stringify([meta]));

      if (newGiftBox.matchingHandbag.image instanceof File) {
        fd.append("matchingHandbagImage", newGiftBox.matchingHandbag.image);
      }
    }

    // preferredSweets (just IDs)
    newGiftBox.preferredSweets.forEach((sId) => {
      fd.append("preferredSweets", sId);
    });

    await axios.post(
      `${BASE_URL}/api/giftboxpage/giftBoxes`,
      fd,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
      setNewGiftBox(initialGiftBox);
    // reset state + refetch...
  } catch (err) {
    console.error("Error adding gift box:", err.response?.data || err);
  }
};

//  const handleUpdateGiftBox = async () => {
//   try {
//     const formData = new FormData();

//     // 1) Primitives
//     formData.append("name", newGiftBox.name);
//     formData.append("description", newGiftBox.description);
//     formData.append("category", newGiftBox.category);
//     formData.append("price", newGiftBox.price);
//     formData.append("minOrderQuantity", newGiftBox.minOrderQuantity);
//     formData.append("sweetsQuantity", newGiftBox.sweetsQuantity);

//     // 2) Main image (only if changed)
//     if (newGiftBox.image instanceof File) {
//       formData.append("image", newGiftBox.image);
//     }

//     // 3) preferredSweets as multiple fields
//     newGiftBox.preferredSweets.forEach((id) => {
//       formData.append("preferredSweets", id);
//     });

//     // 4) matchingHandbag metadata + optional file
//     if (newGiftBox.hasMatchingHandbag) {
//       // send the object as JSON so server can parse it
//       formData.append(
//         "matchingHandbags",
//         JSON.stringify([{
//           name: newGiftBox.matchingHandbag.name,
//           price: newGiftBox.matchingHandbag.price,
//           minOrderQuantity: newGiftBox.matchingHandbag.minOrderQuantity,
//         }])
//       );
//       if (newGiftBox.matchingHandbag.image instanceof File) {
//         formData.append("matchingHandbagImage", newGiftBox.matchingHandbag.image);
//       }
//     }

//     // 5) Debug payload (optional)
//     // for (let [k,v] of formData.entries()) console.log(k, v);

//     // 6) Send
//     await axios.put(
//       `${BASE_URL}/api/giftboxpage/giftBoxes/${editId}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     // 7) Reset UI
//     setNewGiftBox({
//       name: "",
//       description: "",
//       category: "",
//       image: "",
//       price: "",
//       minOrderQuantity: "",
//       hasMatchingHandbag: false,
//       matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//       sweetsQuantity: "",
//       preferredSweets: [],
//     });
//     setEditMode(false);
//     setEditType("");
//     setEditId("");
//     fetchData();
//   }
//   catch (error) {
//     console.error(
//       "Error updating gift box:",
//       error.response?.data || error.message
//     );
//   }
// };



const handleUpdateGiftBox = async () => {
  try {
    const formData = new FormData();

    // 1) Primitives
    formData.append("name", newGiftBox.name);
    formData.append("description", newGiftBox.description);
    formData.append("category", newGiftBox.category);
    formData.append("price", newGiftBox.price);
    formData.append("minOrderQuantity", newGiftBox.minOrderQuantity);
    formData.append("sweetsQuantity", newGiftBox.sweetsQuantity);

    // 2) Main image (only if the user picked a new File)
    if (newGiftBox.image instanceof File) {
      formData.append("image", newGiftBox.image);
    }

    // 3) preferredSweets: ALWAYS send just the ID
    newGiftBox.preferredSweets.forEach((item) => {
      // if item is an object, pull out its _id; otherwise assume it’s already a string
      const id = item && typeof item === "object" && item._id 
        ? item._id 
        : item;
      formData.append("preferredSweets", id);
    });

    // 4) matchingHandbags metadata + optional file
    if (newGiftBox.hasMatchingHandbag) {
      // metadata as JSON array
      formData.append(
        "matchingHandbags",
        JSON.stringify([{
          name: newGiftBox.matchingHandbag.name,
          price: newGiftBox.matchingHandbag.price,
          minOrderQuantity: newGiftBox.matchingHandbag.minOrderQuantity,
        }])
      );
      // optional handbag image file
      if (newGiftBox.matchingHandbag.image instanceof File) {
        formData.append(
          "matchingHandbagImage",
          newGiftBox.matchingHandbag.image
        );
      }
    }

    // 5) Send to server
    await axios.put(
      `${BASE_URL}/api/giftboxpage/giftBoxes/${editId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // 6) Reset form state & exit edit mode
    setNewGiftBox({
      name: "",
      description: "",
      category: "",
      image: "",
      price: "",
      minOrderQuantity: "",
      hasMatchingHandbag: false,
      matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
      sweetsQuantity: "",
      preferredSweets: [],
    });
    setEditMode(false);
    setEditType("");
    setEditId("");
    fetchData();
  } catch (error) {
    console.error(
      "Error updating gift box:",
      error.response?.data || error.message
    );
  }
};



  const handleUpdateHandbag = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newHandbag.name);
      formData.append("category", newHandbag.category);
      formData.append("price", newHandbag.price);
      formData.append("minOrderQuantity", newHandbag.minOrderQuantity);
      if (newHandbag.image instanceof File) {
        formData.append("image", newHandbag.image);
      }
      await axios.put(`${BASE_URL}/api/giftboxpage/generalHandbags/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
      setEditMode(false);
      setEditType("");
      setEditId("");
      fetchData();
    } catch (error) {
      console.error("Error updating handbag:", error);
    }
  };

  // CANCEL EDIT MODE: Reset the form fields
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
        sweetsQuantity: "",
        preferredSweets: [],
      });
    } else if (selectedOption === "handbag") {
      setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
    }
  };

  // Sweets Modal Functions for Admin (selecting preferred sweets for a gift box)
  const openSweetsModal = async () => {
    console.log("Button clicked! Opening modal...");
    setShowSweetsModal(true);
    setLoadingSweets(true);
    await fetchSweets();
    setLoadingSweets(false);
  };

  // TOGGLE a sweet selection in the modal: update preferredSweets array
  const handleSweetsCheckboxChange = (sweetId) => {
    setNewGiftBox((prev) => {
      const { preferredSweets } = prev;
      return preferredSweets.includes(sweetId)
        ? { ...prev, preferredSweets: preferredSweets.filter((id) => id !== sweetId) }
        : { ...prev, preferredSweets: [...preferredSweets, sweetId] };
    });
  };

  // Utility function to get selected sweets details
  const getSelectedSweetsDetails = () => {
    return sweets.filter((sweet) => newGiftBox.preferredSweets.includes(sweet._id));
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Admin Dashboard - Gift Box Management</h1>
      <div className={styles.navigation}>
        <button onClick={() => setSelectedOption("category")}>Categories</button>
        <button onClick={() => setSelectedOption("giftBox")}>Gift Boxes</button>
        <button onClick={() => setSelectedOption("handbag")}>Handbags</button>
      </div>

      {/* {selectedOption === "category" && (
        <div className={styles.formContainer}>
          <h2>Add Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <input type="file" onChange={handleCategoryImageUpload} />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
      )} */}
      {selectedOption === "category" && (
  <div className={styles.formContainer}>
    <h2>
      {editMode && editType === "category"
        ? "Edit Category"
        : "Add New Category"}
    </h2>

    {/* Name field */}
    <input
      type="text"
      placeholder="Category Name"
      value={newCategory.name}
      onChange={e =>
        setNewCategory(prev => ({ ...prev, name: e.target.value }))
      }
    />

    {/* Image preview when editing */}
    {editMode && editType === "category" && newCategory.image?.url && (
      <div className={styles.imagePreviewContainer}>
        <img
          src={newCategory.image.url}
          alt="Current Category"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <button
          className={styles.imageDeleteButton}
          onClick={() =>
            setNewCategory(prev => ({ ...prev, image: "" }))
          }
        >
          X
        </button>
      </div>
    )}

    {/* File input */}
    <input
      type="file"
      accept="image/*"
      onChange={handleCategoryImageUpload}
    />

    {/* Action buttons */}
    <div className={styles.formActions}>
      {editMode && editType === "category" ? (
        <>
          <button onClick={handleUpdateCategory}>
            Update Category
          </button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddCategory}>Add Category</button>
      )}
    </div>
  </div>
)}

      {selectedOption === "giftBox" && (
        <div className={styles.formContainer}>
          <h2>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h2>
          <input
            type="text"
            placeholder="Gift Box Name"
            value={newGiftBox.name}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newGiftBox.description}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, description: e.target.value })}
          />
          <label>Select Category:</label>
          <select
            value={newGiftBox.category}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {editMode && editType === "giftBox" && newGiftBox.image && (
            <div className={styles.imagePreviewContainer}>
              {typeof newGiftBox.image === "object" && newGiftBox.image.url ? (
                <img
                  src={newGiftBox.image.url}
                  alt="Current Gift Box"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ) : (
                "NA"
              )}
              <button className={styles.imageDeleteButton} onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}>
                X
              </button>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleGiftBoxImageUpload} />
          <input
            type="number"
            placeholder="Price"
            value={newGiftBox.price}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Min Order Quantity"
            value={newGiftBox.minOrderQuantity}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, minOrderQuantity: e.target.value })}
          />
          {/* Matching Handbag Section */}
          <div>
            <input
              type="checkbox"
              checked={newGiftBox.hasMatchingHandbag}
              onChange={(e) =>
                setNewGiftBox({
                  ...newGiftBox,
                  hasMatchingHandbag: e.target.checked,
                  matchingHandbag: e.target.checked ? newGiftBox.matchingHandbag || {} : null,
                })
              }
            />
            <label>Has Matching Handbag</label>
          </div>
          {newGiftBox.hasMatchingHandbag && (
            <div className={styles.matchingHandbagDetails}>
              <input
                type="text"
                placeholder="Matching Handbag Name"
                value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.name : ""}
                onChange={(e) =>
                  setNewGiftBox({
                    ...newGiftBox,
                    matchingHandbag: { ...newGiftBox.matchingHandbag, name: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="Matching Handbag Price"
                value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.price : ""}
                onChange={(e) =>
                  setNewGiftBox({
                    ...newGiftBox,
                    matchingHandbag: { ...newGiftBox.matchingHandbag, price: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="Matching Handbag Min Order Quantity"
                value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.minOrderQuantity : ""}
                onChange={(e) =>
                  setNewGiftBox({
                    ...newGiftBox,
                    matchingHandbag: { ...newGiftBox.matchingHandbag, minOrderQuantity: e.target.value },
                  })
                }
              />
              <input type="file" accept="image/*" onChange={handleGiftBoxMatchingHandbagImageUpload} />
              {newGiftBox.matchingHandbag && newGiftBox.matchingHandbag.image && (
                <div className={styles.imagePreviewContainer}>
                  {typeof newGiftBox.matchingHandbag.image === "object" && newGiftBox.matchingHandbag.image.url ? (
                    <img
                      src={newGiftBox.matchingHandbag.image.url}
                      alt="Current Matching Handbag"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    "NA"
                  )}
                  <button
                    className={styles.imageDeleteButton}
                    onClick={() =>
                      setNewGiftBox({
                        ...newGiftBox,
                        matchingHandbag: { ...newGiftBox.matchingHandbag, image: "" },
                      })
                    }
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          )}
          <input
            type="number"
            placeholder="Sweets Quantity Allowed"
            value={newGiftBox.sweetsQuantity}
            onChange={(e) => setNewGiftBox({ ...newGiftBox, sweetsQuantity: e.target.value })}
          />
          <div>
            <button onClick={openSweetsModal}>Select the Preferable Sweets</button>
            {newGiftBox.preferredSweets.length > 0 && (
              <div>
                <h3>Selected Sweets:</h3>
                <ul>
                  {getSelectedSweetsDetails().map((sweet) => (
                    <li key={sweet._id}>
                      {sweet.name} - ₹{sweet.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            {editMode && editType === "giftBox" ? (
              <button onClick={handleUpdateGiftBox}>Update Gift Box</button>
            ) : (
              <button onClick={handleAddGiftBox}>Add Gift Box</button>
            )}
            {editMode && editType === "giftBox" && (
              <button onClick={handleCancelEdit}>Cancel Edit</button>
            )}
          </div>
        </div>
      )}

      {selectedOption === "handbag" && (
        <div className={styles.formContainer}>
          <h2>
            {editMode && editType === "handbag"
              ? "Edit General Handbag"
              : "Add New General Handbag"}
          </h2>
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
          {editMode && editType === "handbag" && newHandbag.image && (
            <div className={styles.imagePreviewContainer}>
              {typeof newHandbag.image === "object" && newHandbag.image.url ? (
                <img
                  src={newHandbag.image.url}
                  alt="Current Handbag"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ) : (
                "NA"
              )}
              <button className={styles.imageDeleteButton} onClick={() => setNewHandbag({ ...newHandbag, image: "" })}>
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
          <div>
            {editMode && editType === "handbag" ? (
              <button onClick={handleUpdateHandbag}>Update Handbag</button>
            ) : (
              <button onClick={handleAddHandbag}>Add Handbag</button>
            )}
            {editMode && editType === "handbag" && (
              <button onClick={handleCancelEdit}>Cancel Edit</button>
            )}
          </div>
        </div>
      )}

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
                {cat.image && typeof cat.image === "object" && cat.image.url ? (
                  <img
                    src={cat.image.url}
                    alt={cat.name}
                    className={styles.previewImage}
                  />
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
            <th>Sweets Qty</th>
            <th>Preferred Sweets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {giftBoxes.map((box) => (
            <tr key={box._id}>
              <td>{box.name || "NA"}</td>
              <td>{box.category?.name || "NA"}</td>
              <td>
                {box.image && typeof box.image === "object" && box.image.url ? (
                  <img
                    src={box.image.url}
                    alt={box.name}
                    className={styles.previewImage}
                  />
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
              <td>{box.sweetsQuantity || "NA"}</td>
              <td>
                {box.preferredSweets && box.preferredSweets.length > 0 ? (
                  box.preferredSweets.map((sweet) => (
                    <div key={sweet._id} className={styles.preferredSweet}>
                      <div>{sweet.name} - ₹{sweet.price}</div>
                    </div>
                  ))
                ) : (
                  "NA"
                )}
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
                {hb.image && typeof hb.image === "object" && hb.image.url ? (
                  <img
                    src={hb.image.url}
                    alt={hb.name}
                    className={styles.previewImage}
                  />
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

      {/* Sweets Selection Modal */}
      {showSweetsModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Sweets</h3>
            {loadingSweets ? (
              <div className={styles.loader}>Loading...</div>
            ) : (
              <>
                {Array.isArray(sweets) && sweets.length > 0 ? (
                  sweets.map((sweet) => (
                    <div key={sweet._id} className={styles.sweetItem}>
                      <input
                        type="checkbox"
                        checked={newGiftBox.preferredSweets.includes(sweet._id)}
                        onChange={() => handleSweetsCheckboxChange(sweet._id)}
                      />
                      {sweet.image && typeof sweet.image === "object" && sweet.image.url ? (
                        <img
                          src={sweet.image.url}
                          alt={sweet.name}
                          className={styles.sweetImage}
                        />
                      ) : (
                        "NA"
                      )}
                      <span>{sweet.name} - ₹{sweet.price}</span>
                    </div>
                  ))
                ) : (
                  <p>No sweets available.</p>
                )}
              </>
            )}
            <button onClick={() => setShowSweetsModal(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;