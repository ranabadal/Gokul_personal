
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./giftBoxMng.module.css";
// import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
// const AdminDashboard = () => {
//   // Data lists
//   const [categories, setCategories] = useState([]);
//   const [giftBoxes, setGiftBoxes] = useState([]);
//   const [handbags, setHandbags] = useState([]);

//   // Option to add: "category", "giftBox", or "handbag"
//   const [selectedOption, setSelectedOption] = useState("category");

//   // Form state for Category
//   const [newCategory, setNewCategory] = useState({ name: "", image: "" });

//   // Form state for Gift Box
//   const [newGiftBox, setNewGiftBox] = useState({
//     name: "",
//     description: "",
//     category: "",
//     image: "",
//     price: "",
//     minOrderQuantity: "",
//     hasMatchingHandbag: false,
//     matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
//   });

//   // Form state for General Handbag
//   const [newHandbag, setNewHandbag] = useState({
//     name: "",
//     category: "",
//     image: "",
//     price: "",
//     minOrderQuantity: "",
//   });

//   // States for edit mode
//   const [editMode, setEditMode] = useState(false);
//   const [editType, setEditType] = useState(""); // "category", "giftBox", "handbag"
//   const [editId, setEditId] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Fetch all lists from the server
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

//   // ----------------- File Upload Helpers -----------------
//   // Convert a file to a Base64 string
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleCategoryImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewCategory(prev => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting category image to Base64:", error);
//       }
//     }
//   };


  
//     // Deletion and Edit remain unchanged
//     const handleDelete = async (id, type) => {
//       const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
//       try {
//         await axios.delete(endpoint);
//         fetchData();
//       } catch (error) {
//         console.error("Error deleting item:", error);
//       }
//     };
  

//   const handleGiftBoxImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewGiftBox(prev => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting gift box image to Base64:", error);
//       }
//     }
//   };

//   const handleGiftBoxMatchingHandbagImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewGiftBox(prev => ({
//           ...prev,
//           matchingHandbag: { ...prev.matchingHandbag, image: base64 },
//         }));
//       } catch (error) {
//         console.error("Error converting matching handbag image to Base64:", error);
//       }
//     }
//   };

//   const handleHandbagImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewHandbag(prev => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting handbag image to Base64:", error);
//       }
//     }
//   };

//   // ----------------- Add Data Functions -----------------

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
//       // Debug: log the current state so you can verify that matchingHandbag details are present.
//       console.log("newGiftBox state before payload preparation:", newGiftBox);
  
//       // Prepare the payload. We wrap the matchingHandbag object into an array if the checkbox is checked.
//       // Removing any extra condition (e.g., checking that name exists) lets you inspect the resulting payload.
//       const payload = {
//         ...newGiftBox,
//         matchingHandbags: newGiftBox.hasMatchingHandbag ? [newGiftBox.matchingHandbag] : [],
//       };
  
//       // Remove the singular matchingHandbag field if your backend expects only matchingHandbags.
//       delete payload.matchingHandbag;
  
//       console.log("Payload being sent:", payload);
  
//       await axios.post(`${BASE_URL}/api/giftboxpage/giftBoxes`, payload);
  
//       // Reset the form state after a successful submission.
//       setNewGiftBox({
//         name: "",
//         description: "",
//         category: "",
//         image: "",
//         price: "",
//         minOrderQuantity: "",
//         hasMatchingHandbag: false,
//         matchingHandbag: { name: "", image: "", price: "", minOrderQuantity: "" },
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

//   // ----------------- Update Data Functions -----------------

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

//   // Cancel edit mode and reset the respective form
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
//       });
//     } else if (selectedOption === "handbag") {
//       setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
//     }
//   };

//   // ----------------- Edit Button Handler -----------------
//   const handleEdit = (item, type) => {
//     // Switch form type based on what is being edited
//     setSelectedOption(type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag");
//     setEditMode(true);
//     setEditType(type);
//     setEditId(item._id);

//     if (type === "category") {
//       setNewCategory({ name: item.name, image: item.image });
//     } else if (type === "giftBox") {
//       setNewGiftBox({
//         name: item.name,
//         description: item.description,
//         category: item.category && item.category._id ? item.category._id : item.category,
//         image: item.image,
//         price: item.price,
//         minOrderQuantity: item.minOrderQuantity,
//         hasMatchingHandbag: item.matchingHandbags && item.matchingHandbags.length > 0,
//         matchingHandbag:
//           item.matchingHandbags && item.matchingHandbags.length > 0
//             ? item.matchingHandbags[0]
//             : { name: "", image: "", price: "", minOrderQuantity: "" },
//       });
//     } else if (type === "handbag") {
//       setNewHandbag({
//         name: item.name,
//         category: item.category && item.category._id ? item.category._id : item.category,
//         image: item.image,
//         price: item.price,
//         minOrderQuantity: item.minOrderQuantity,
//       });
//     }
//   };

//   // ----------------- Render -----------------
//   return (
//     <div className={styles.adminContainer}>
//       <h1>Admin Dashboard</h1>

//       {/* ----- Form to Add or Edit Data ----- */}
//       <div className={styles.formContainer}>
//         <h2>{editMode ? "Edit Data" : "Add New Data"}</h2>
//         <div className={styles.selectionContainer}>
//           <label htmlFor="addOption">Select Type to Add:</label>
//           <select
//             id="addOption"
//             value={selectedOption}
//             onChange={(e) => {
//               setSelectedOption(e.target.value);
//               if (editMode) handleCancelEdit();
//             }}
//           >
//             <option value="category">Category</option>
//             <option value="giftBox">Gift Box</option>
//             <option value="handbag">General Handbag</option>
//           </select>
//         </div>

//         {/* ----- Category Form ----- */}
//         {selectedOption === "category" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "category" ? "Edit Category" : "Add New Category"}</h3>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={newCategory.name}
//               onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//             />
//             {/* Show previous image preview (if editing and image exists) */}
//             {editMode && editType === "category" && newCategory.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newCategory.image}
//                   alt="Current Category"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button
//                   className={styles.imageDeleteButton}
//                   onClick={() => setNewCategory({ ...newCategory, image: "" })}
//                 >
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleCategoryImageUpload} />
//             <button
//               onClick={
//                 editMode && editType === "category" ? handleUpdateCategory : handleAddCategory
//               }
//             >
//               {editMode && editType === "category" ? "Update Category" : "Save Category"}
//             </button>
//             {editMode && editType === "category" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}

//         {/* ----- Gift Box Form ----- */}
//        {/* ----- Gift Box Form ----- */}
// {selectedOption === "giftBox" && (
//   <div className={styles.formSection}>
//     <h3>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h3>
//     <input
//       type="text"
//       placeholder="Gift Box Name"
//       value={newGiftBox.name}
//       onChange={(e) =>
//         setNewGiftBox({ ...newGiftBox, name: e.target.value })
//       }
//     />
//     <input
//       type="text"
//       placeholder="Description"
//       value={newGiftBox.description}
//       onChange={(e) =>
//         setNewGiftBox({ ...newGiftBox, description: e.target.value })
//       }
//     />
//     <label>Select Category:</label>
//     <select
//       value={newGiftBox.category}
//       onChange={(e) =>
//         setNewGiftBox({ ...newGiftBox, category: e.target.value })
//       }
//     >
//       <option value="">Select Category</option>
//       {categories.map((cat) => (
//         <option key={cat._id} value={cat._id}>
//           {cat.name}
//         </option>
//       ))}
//     </select>
//     {/* Gift Box Image Preview */}
//     {editMode && editType === "giftBox" && newGiftBox.image && (
//       <div className={styles.imagePreviewContainer}>
//         <img
//           src={newGiftBox.image}
//           alt="Current Gift Box"
//           style={{ width: "100px", height: "100px", objectFit: "cover" }}
//         />
//         <button
//           className={styles.imageDeleteButton}
//           onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}
//         >
//           X
//         </button>
//       </div>
//     )}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handleGiftBoxImageUpload}
//     />
//     <input
//       type="number"
//       placeholder="Price"
//       value={newGiftBox.price}
//       onChange={(e) =>
//         setNewGiftBox({ ...newGiftBox, price: e.target.value })
//       }
//     />
//     <input
//       type="number"
//       placeholder="Min Order Quantity"
//       value={newGiftBox.minOrderQuantity}
//       onChange={(e) =>
//         setNewGiftBox({
//           ...newGiftBox,
//           minOrderQuantity: e.target.value,
//         })
//       }
//     />
//     <div>
//       <input
//         type="checkbox"
//         checked={newGiftBox.hasMatchingHandbag}
//         onChange={(e) =>
//           setNewGiftBox({
//             ...newGiftBox,
//             hasMatchingHandbag: e.target.checked,
//             // Initialize matchingHandbag object if checked; remove otherwise.
//             matchingHandbag: e.target.checked
//               ? newGiftBox.matchingHandbag || {}
//               : null,
//           })
//         }
//       />
//       <label>Has Matching Handbag</label>
//     </div>
//     {/* Matching Handbag Details */}
//     {newGiftBox.hasMatchingHandbag && (
//       <div className={styles.matchingHandbagDetails}>
//         <input
//           type="text"
//           placeholder="Matching Handbag Name"
//           value={
//             (newGiftBox.matchingHandbag &&
//               newGiftBox.matchingHandbag.name) ||
//             ""
//           }
//           onChange={(e) =>
//             setNewGiftBox({
//               ...newGiftBox,
//               matchingHandbag: {
//                 ...newGiftBox.matchingHandbag,
//                 name: e.target.value,
//               },
//             })
//           }
//         />
//         <input
//           type="number"
//           placeholder="Matching Handbag Price"
//           value={
//             (newGiftBox.matchingHandbag &&
//               newGiftBox.matchingHandbag.price) ||
//             ""
//           }
//           onChange={(e) =>
//             setNewGiftBox({
//               ...newGiftBox,
//               matchingHandbag: {
//                 ...newGiftBox.matchingHandbag,
//                 price: e.target.value,
//               },
//             })
//           }
//         />
//         <input
//           type="number"
//           placeholder="Matching Handbag Min Order Quantity"
//           value={
//             (newGiftBox.matchingHandbag &&
//               newGiftBox.matchingHandbag.minOrderQuantity) ||
//             ""
//           }
//           onChange={(e) =>
//             setNewGiftBox({
//               ...newGiftBox,
//               matchingHandbag: {
//                 ...newGiftBox.matchingHandbag,
//                 minOrderQuantity: e.target.value,
//               },
//             })
//           }
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleGiftBoxMatchingHandbagImageUpload}
//         />
//         {newGiftBox.matchingHandbag &&
//           newGiftBox.matchingHandbag.image && (
//             <div className={styles.imagePreviewContainer}>
//               <img
//                 src={newGiftBox.matchingHandbag.image}
//                 alt="Current Matching Handbag"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                 }}
//               />
//               <button
//                 className={styles.imageDeleteButton}
//                 onClick={() =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     matchingHandbag: {
//                       ...newGiftBox.matchingHandbag,
//                       image: "",
//                     },
//                   })
//                 }
//               >
//                 X
//               </button>
//             </div>
//           )}
//       </div>
//     )}
//     <button
//       onClick={
//         editMode && editType === "giftBox"
//           ? handleUpdateGiftBox
//           : handleAddGiftBox
//       }
//     >
//       {editMode && editType === "giftBox"
//         ? "Update Gift Box"
//         : "Save Gift Box"}
//     </button>
//     {editMode && editType === "giftBox" && (
//       <button onClick={handleCancelEdit}>Cancel</button>
//     )}
//   </div>
// )}
//         {/* ----- General Handbag Form ----- */}
//         {selectedOption === "handbag" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}</h3>
//             <label>Select Category:</label>
//             <select
//               value={newHandbag.category}
//               onChange={(e) => setNewHandbag({ ...newHandbag, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Handbag Name"
//               value={newHandbag.name}
//               onChange={(e) => setNewHandbag({ ...newHandbag, name: e.target.value })}
//             />
//             {/* Preview for Handbag Image */}
//             {editMode && editType === "handbag" && newHandbag.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newHandbag.image}
//                   alt="Current Handbag"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button
//                   className={styles.imageDeleteButton}
//                   onClick={() => setNewHandbag({ ...newHandbag, image: "" })}
//                 >
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleHandbagImageUpload} />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newHandbag.price}
//               onChange={(e) => setNewHandbag({ ...newHandbag, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Min Order Quantity"
//               value={newHandbag.minOrderQuantity}
//               onChange={(e) => setNewHandbag({ ...newHandbag, minOrderQuantity: e.target.value })}
//             />
//             <button
//               onClick={editMode && editType === "handbag" ? handleUpdateHandbag : handleAddHandbag}
//             >
//               {editMode && editType === "handbag" ? "Update Handbag" : "Save Handbag"}
//             </button>
//             {editMode && editType === "handbag" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}
//       </div>

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
//     </div>
//   );
// };

// export default AdminDashboard;











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./giftBoxMng.module.css"; // Ensure your CSS module defines .modal, .modalContent, and .loader
// import { BASE_URL } from "../../../Const/Const";

// const AdminDashboard = () => {
//   // Data lists: categories, gift boxes, and handbags
//   const [categories, setCategories] = useState([]);
//   const [giftBoxes, setGiftBoxes] = useState([]);
//   const [handbags, setHandbags] = useState([]);

//   // Currently selected option: "category", "giftBox", or "handbag"
//   const [selectedOption, setSelectedOption] = useState("category");

//   // Form state for Category
//   const [newCategory, setNewCategory] = useState({ name: "", image: "" });

//   // Form state for Gift Box including new sweets fields
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
//     selectedSweets: [],
//   });

//   // Form state for General Handbag
//   const [newHandbag, setNewHandbag] = useState({
//     name: "",
//     category: "",
//     image: "",
//     price: "",
//     minOrderQuantity: "",
//   });

//   // Edit mode states
//   const [editMode, setEditMode] = useState(false);
//   const [editType, setEditType] = useState(""); // "category", "giftBox", "handbag"
//   const [editId, setEditId] = useState("");

//   // Sweets modal and sweets list state
//   const [sweets, setSweets] = useState([]);
//   const [showSweetsModal, setShowSweetsModal] = useState(false);
//   const [loadingSweets, setLoadingSweets] = useState(false); // Loader state for sweets fetching

//   // Debugging: Log modal visibility changes
//   useEffect(() => {
//     console.log("Modal visibility:", showSweetsModal);
//   }, [showSweetsModal]);

//   useEffect(() => {
//     fetchData();
//     // Note: fetchSweets is only called when opening the sweets modal.
//   }, []);

//   // Fetch all general data: categories, gift boxes, handbags
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

//   // Fetch sweets: here we check if response contains a "products" array.
//   const fetchSweets = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/products`, {
//         params: { category: "Sweets" },
//       });
//       console.log("Fetched sweets data:", response.data);
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

//   // Helper: convert file to Base64
//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // Image upload handlers
//   const handleCategoryImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewCategory((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting category image:", error);
//       }
//     }
//   };

//   const handleGiftBoxImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewGiftBox((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting gift box image:", error);
//       }
//     }
//   };

//   const handleGiftBoxMatchingHandbagImageUpload = async (e) => {
//     if (e.target.files && e.target.files[0]) {
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
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const base64 = await convertToBase64(e.target.files[0]);
//         setNewHandbag((prev) => ({ ...prev, image: base64 }));
//       } catch (error) {
//         console.error("Error converting handbag image:", error);
//       }
//     }
//   };

//   // Delete handler
//   const handleDelete = async (id, type) => {
//     const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
//     try {
//       await axios.delete(endpoint);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   // Add functions for each type
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
//         matchingHandbags: newGiftBox.hasMatchingHandbag
//           ? [newGiftBox.matchingHandbag]
//           : [],
//       };
//       // Remove singular matchingHandbag field as backend expects matchingHandbags array.
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
//         selectedSweets: [],
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

//   // Update functions for edit mode
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
//         selectedSweets: [],
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

//   // Cancel edit: reset the respective form
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
//         selectedSweets: [],
//       });
//     } else if (selectedOption === "handbag") {
//       setNewHandbag({ name: "", category: "", image: "", price: "", minOrderQuantity: "" });
//     }
//   };

//   // Edit handler for pre-populating form for editing
//   const handleEdit = (item, type) => {
//     setSelectedOption(type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag");
//     setEditMode(true);
//     setEditType(type);
//     setEditId(item._id);

//     if (type === "category") {
//       setNewCategory({ name: item.name, image: item.image });
//     } else if (type === "giftBox") {
//       setNewGiftBox({
//         name: item.name,
//         description: item.description,
//         category: item.category && item.category._id ? item.category._id : item.category,
//         image: item.image,
//         price: item.price,
//         minOrderQuantity: item.minOrderQuantity,
//         hasMatchingHandbag: item.matchingHandbags && item.matchingHandbags.length > 0,
//         matchingHandbag:
//           item.matchingHandbags && item.matchingHandbags.length > 0
//             ? item.matchingHandbags[0]
//             : { name: "", image: "", price: "", minOrderQuantity: "" },
//         sweetsQuantity: item.sweetsQuantity || "",
//         selectedSweets: item.selectedSweets || [],
//       });
//     } else if (type === "handbag") {
//       setNewHandbag({
//         name: item.name,
//         category: item.category && item.category._id ? item.category._id : item.category,
//         image: item.image,
//         price: item.price,
//         minOrderQuantity: item.minOrderQuantity,
//       });
//     }
//   };

//   // Handler for toggling sweets selection in the modal
//   const handleSweetsCheckboxChange = (sweetId) => {
//     setNewGiftBox((prev) => {
//       const { selectedSweets } = prev;
//       if (selectedSweets.includes(sweetId)) {
//         return { ...prev, selectedSweets: selectedSweets.filter((id) => id !== sweetId) };
//       } else {
//         return { ...prev, selectedSweets: [...selectedSweets, sweetId] };
//       }
//     });
//   };

//   // Open the sweets modal immediately and then load sweets with a loader.
//   const openSweetsModal = async () => {
//     console.log("Button clicked! Opening modal...");
//     setShowSweetsModal(true);
//     setLoadingSweets(true);
//     await fetchSweets();
//     setLoadingSweets(false);
//   };

//   return (
//     <div className={styles.adminContainer}>
//       <h1>Admin Dashboard</h1>

//       {/* ----- Form to Add or Edit Data ----- */}
//       <div className={styles.formContainer}>
//         <h2>{editMode ? "Edit Data" : "Add New Data"}</h2>
//         <div className={styles.selectionContainer}>
//           <label htmlFor="addOption">Select Type to Add:</label>
//           <select
//             id="addOption"
//             value={selectedOption}
//             onChange={(e) => {
//               setSelectedOption(e.target.value);
//               if (editMode) handleCancelEdit();
//             }}
//           >
//             <option value="category">Category</option>
//             <option value="giftBox">Gift Box</option>
//             <option value="handbag">General Handbag</option>
//           </select>
//         </div>

//         {/* ----- Category Form ----- */}
//         {selectedOption === "category" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "category" ? "Edit Category" : "Add New Category"}</h3>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={newCategory.name}
//               onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//             />
//             {editMode && editType === "category" && newCategory.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newCategory.image}
//                   alt="Current Category"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button
//                   className={styles.imageDeleteButton}
//                   onClick={() => setNewCategory({ ...newCategory, image: "" })}
//                 >
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleCategoryImageUpload} />
//             <button onClick={editMode && editType === "category" ? handleUpdateCategory : handleAddCategory}>
//               {editMode && editType === "category" ? "Update Category" : "Save Category"}
//             </button>
//             {editMode && editType === "category" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}

//         {/* ----- Gift Box Form ----- */}
//         {selectedOption === "giftBox" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h3>
//             <input
//               type="text"
//               placeholder="Gift Box Name"
//               value={newGiftBox.name}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newGiftBox.description}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, description: e.target.value })}
//             />
//             <label>Select Category:</label>
//             <select
//               value={newGiftBox.category}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {editMode && editType === "giftBox" && newGiftBox.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newGiftBox.image}
//                   alt="Current Gift Box"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button
//                   className={styles.imageDeleteButton}
//                   onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}
//                 >
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleGiftBoxImageUpload} />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newGiftBox.price}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Min Order Quantity"
//               value={newGiftBox.minOrderQuantity}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, minOrderQuantity: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Sweets Quantity"
//               value={newGiftBox.sweetsQuantity}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, sweetsQuantity: e.target.value })}
//             />
//             <button onClick={openSweetsModal}>
//               Select the Preferable Sweets
//             </button>

//             {/* Modal for selecting sweets */}
//             {showSweetsModal && (
//               <div className={styles.modal}>
//                 <div className={styles.modalContent}>
//                   <h3>Select Sweets</h3>
//                   {loadingSweets ? (
//                     <div className={styles.loader}>Loading...</div>
//                   ) : (
//                     <>
//                       {Array.isArray(sweets) && sweets.length > 0 ? (
//                         sweets.map((sweet) => (
//                           <div key={sweet._id} className={styles.sweetItem}>
//                             <input
//                               type="checkbox"
//                               checked={newGiftBox.selectedSweets.includes(sweet._id)}
//                               onChange={() => handleSweetsCheckboxChange(sweet._id)}
//                             />
//                             <img
//                               src={sweet.image}
//                               alt={sweet.name}
//                               style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                             />
//                             <span>
//                               {sweet.name} - ₹{sweet.price}
//                             </span>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No sweets available.</p>
//                       )}
//                     </>
//                   )}
//                   <button onClick={() => setShowSweetsModal(false)}>
//                     Done
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Matching Handbag Section */}
//             <div>
//               <input
//                 type="checkbox"
//                 checked={newGiftBox.hasMatchingHandbag}
//                 onChange={(e) =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     hasMatchingHandbag: e.target.checked,
//                     matchingHandbag: e.target.checked
//                       ? newGiftBox.matchingHandbag || {}
//                       : null,
//                   })
//                 }
//               />
//               <label>Has Matching Handbag</label>
//             </div>
//             {newGiftBox.hasMatchingHandbag && (
//               <div className={styles.matchingHandbagDetails}>
//                 <input
//                   type="text"
//                   placeholder="Matching Handbag Name"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.name : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: {
//                         ...newGiftBox.matchingHandbag,
//                         name: e.target.value,
//                       },
//                     })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Matching Handbag Price"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.price : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: {
//                         ...newGiftBox.matchingHandbag,
//                         price: e.target.value,
//                       },
//                     })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Matching Handbag Min Order Quantity"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.minOrderQuantity : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: {
//                         ...newGiftBox.matchingHandbag,
//                         minOrderQuantity: e.target.value,
//                       },
//                     })
//                   }
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleGiftBoxMatchingHandbagImageUpload}
//                 />
//                 {newGiftBox.matchingHandbag && newGiftBox.matchingHandbag.image && (
//                   <div className={styles.imagePreviewContainer}>
//                     <img
//                       src={newGiftBox.matchingHandbag.image}
//                       alt="Current Matching Handbag"
//                       style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                     />
//                     <button
//                       className={styles.imageDeleteButton}
//                       onClick={() =>
//                         setNewGiftBox({
//                           ...newGiftBox,
//                           matchingHandbag: {
//                             ...newGiftBox.matchingHandbag,
//                             image: "",
//                           },
//                         })
//                       }
//                     >
//                       X
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             <button onClick={editMode && editType === "giftBox" ? handleUpdateGiftBox : handleAddGiftBox}>
//               {editMode && editType === "giftBox" ? "Update Gift Box" : "Save Gift Box"}
//             </button>
//             {editMode && editType === "giftBox" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}

//         {/* ----- General Handbag Form ----- */}
//         {selectedOption === "handbag" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}</h3>
//             <label>Select Category:</label>
//             <select
//               value={newHandbag.category}
//               onChange={(e) => setNewHandbag({ ...newHandbag, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Handbag Name"
//               value={newHandbag.name}
//               onChange={(e) => setNewHandbag({ ...newHandbag, name: e.target.value })}
//             />
//             {editMode && editType === "handbag" && newHandbag.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newHandbag.image}
//                   alt="Current Handbag"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button className={styles.imageDeleteButton} onClick={() => setNewHandbag({ ...newHandbag, image: "" })}>
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleHandbagImageUpload} />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newHandbag.price}
//               onChange={(e) => setNewHandbag({ ...newHandbag, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Min Order Quantity"
//               value={newHandbag.minOrderQuantity}
//               onChange={(e) => setNewHandbag({ ...newHandbag, minOrderQuantity: e.target.value })}
//             />
//             <button onClick={editMode && editType === "handbag" ? handleUpdateHandbag : handleAddHandbag}>
//               {editMode && editType === "handbag" ? "Update Handbag" : "Save Handbag"}
//             </button>
//             {editMode && editType === "handbag" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}
//       </div>

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
//               <td>{cat.image ? <img src={cat.image} alt={cat.name} className={styles.previewImage} /> : "NA"}</td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(cat, "category")}>Edit</button>
//                 <button className={styles.delete} onClick={() => handleDelete(cat._id, "categories")}>Delete</button>
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
//             <th>Selected Sweets</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {giftBoxes.map((box) => (
//             <tr key={box._id}>
//               <td>{box.name || "NA"}</td>
//               <td>{box.category?.name || "NA"}</td>
//               <td>{box.image ? <img src={box.image} alt={box.name} className={styles.previewImage} /> : "NA"}</td>
//               <td>{box.price !== undefined ? `₹${box.price}` : "NA"}</td>
//               <td>{box.minOrderQuantity !== undefined ? box.minOrderQuantity : "NA"}</td>
//               <td>
//                 {box.matchingHandbags && box.matchingHandbags.length > 0
//                   ? box.matchingHandbags.map((hb) => `${hb.name} (₹${hb.price})`).join(", ")
//                   : "NA"}
//               </td>
//               <td>{box.sweetsQuantity || "NA"}</td>
//               <td>
//                 {box.selectedSweets && box.selectedSweets.length > 0 ? box.selectedSweets.join(", ") : "NA"}
//               </td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(box, "giftBox")}>Edit</button>
//                 <button className={styles.delete} onClick={() => handleDelete(box._id, "giftBoxes")}>Delete</button>
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
//               <td>{hb.image ? <img src={hb.image} alt={hb.name} className={styles.previewImage} /> : "NA"}</td>
//               <td>{hb.price !== undefined ? `₹${hb.price}` : "NA"}</td>
//               <td>{hb.minOrderQuantity !== undefined ? hb.minOrderQuantity : "NA"}</td>
//               <td>
//                 <button className={styles.edit} onClick={() => handleEdit(hb, "handbag")}>Edit</button>
//                 <button className={styles.delete} onClick={() => handleDelete(hb._id, "generalHandbags")}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;










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

  // // EDIT HANDLER: Prepopulate form fields for editing
  // const handleEdit = (item, type) => {
  //   setSelectedOption(type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag");
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
  //       hasMatchingHandbag: item.matchingHandbags && item.matchingHandbags.length > 0,
  //       matchingHandbag:
  //         item.matchingHandbags && item.matchingHandbags.length > 0
  //           ? item.matchingHandbags[0]
  //           : { name: "", image: "", price: "", minOrderQuantity: "" },
  //       sweetsQuantity: item.sweetsQuantity || "",
  //       preferredSweets: item.preferredSweets || [],
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

//   // Open the sweets modal immediately; show a loader while fetching sweets data.
//   const openSweetsModal = async () => {
//     console.log("Button clicked! Opening modal...");
//     setShowSweetsModal(true);
//     setLoadingSweets(true);
//     await fetchSweets();
//     setLoadingSweets(false);
//   };

//   return (
//     <div className={styles.adminContainer}>
//       <h1>Admin Dashboard</h1>

//       {/* ----- Form to Add or Edit Data ----- */}
//       <div className={styles.formContainer}>
//         <h2>{editMode ? "Edit Data" : "Add New Data"}</h2>
//         <div className={styles.selectionContainer}>
//           <label htmlFor="addOption">Select Type to Add:</label>
//           <select
//             id="addOption"
//             value={selectedOption}
//             onChange={(e) => {
//               setSelectedOption(e.target.value);
//               if (editMode) handleCancelEdit();
//             }}
//           >
//             <option value="category">Category</option>
//             <option value="giftBox">Gift Box</option>
//             <option value="handbag">General Handbag</option>
//           </select>
//         </div>

//         {/* ----- Category Form ----- */}
//         {selectedOption === "category" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "category" ? "Edit Category" : "Add New Category"}</h3>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={newCategory.name}
//               onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//             />
//             {editMode && editType === "category" && newCategory.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newCategory.image}
//                   alt="Current Category"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button className={styles.imageDeleteButton} onClick={() => setNewCategory({ ...newCategory, image: "" })}>
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleCategoryImageUpload} />
//             <button onClick={editMode && editType === "category" ? handleUpdateCategory : handleAddCategory}>
//               {editMode && editType === "category" ? "Update Category" : "Save Category"}
//             </button>
//             {editMode && editType === "category" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}

//         {/* ----- Gift Box Form ----- */}
//         {selectedOption === "giftBox" && (
//           <div className={styles.formSection}>
//             <h3>{editMode && editType === "giftBox" ? "Edit Gift Box" : "Add New Gift Box"}</h3>
//             <input
//               type="text"
//               placeholder="Gift Box Name"
//               value={newGiftBox.name}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newGiftBox.description}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, description: e.target.value })}
//             />
//             <label>Select Category:</label>
//             <select
//               value={newGiftBox.category}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {editMode && editType === "giftBox" && newGiftBox.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newGiftBox.image}
//                   alt="Current Gift Box"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button className={styles.imageDeleteButton} onClick={() => setNewGiftBox({ ...newGiftBox, image: "" })}>
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleGiftBoxImageUpload} />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newGiftBox.price}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Min Order Quantity"
//               value={newGiftBox.minOrderQuantity}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, minOrderQuantity: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Sweets Quantity"
//               value={newGiftBox.sweetsQuantity}
//               onChange={(e) => setNewGiftBox({ ...newGiftBox, sweetsQuantity: e.target.value })}
//             />
//             {/* Button to open sweets modal */}
//             <button onClick={openSweetsModal}>Select the Preferable Sweets</button>

//             {/* Sweet selection modal */}
//             {showSweetsModal && (
//               <div className={styles.modal}>
//                 <div className={styles.modalContent}>
//                   <h3>Select Sweets</h3>
//                   {loadingSweets ? (
//                     <div className={styles.loader}>Loading...</div>
//                   ) : (
//                     <>
//                       {Array.isArray(sweets) && sweets.length > 0 ? (
//                         sweets.map((sweet) => (
//                           <div key={sweet._id} className={styles.sweetItem}>
//                             <input
//                               type="checkbox"
//                               checked={newGiftBox.preferredSweets.includes(sweet._id)}
//                               onChange={() => handleSweetsCheckboxChange(sweet._id)}
//                             />
//                             <img
//                               src={sweet.image}
//                               alt={sweet.name}
//                               className={styles.sweetImage}
//                             />
//                             <span>
//                               {sweet.name} - ₹{sweet.price}
//                             </span>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No sweets available.</p>
//                       )}
//                     </>
//                   )}
//                   <button onClick={() => setShowSweetsModal(false)}>Done</button>
//                 </div>
//               </div>
//             )}

//             {/* Matching Handbag Section */}
//             <div>
//               <input
//                 type="checkbox"
//                 checked={newGiftBox.hasMatchingHandbag}
//                 onChange={(e) =>
//                   setNewGiftBox({
//                     ...newGiftBox,
//                     hasMatchingHandbag: e.target.checked,
//                     matchingHandbag: e.target.checked ? newGiftBox.matchingHandbag || {} : null,
//                   })
//                 }
//               />
//               <label>Has Matching Handbag</label>
//             </div>
//             {newGiftBox.hasMatchingHandbag && (
//               <div className={styles.matchingHandbagDetails}>
//                 <input
//                   type="text"
//                   placeholder="Matching Handbag Name"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.name : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: { ...newGiftBox.matchingHandbag, name: e.target.value },
//                     })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Matching Handbag Price"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.price : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: { ...newGiftBox.matchingHandbag, price: e.target.value },
//                     })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Matching Handbag Min Order Quantity"
//                   value={newGiftBox.matchingHandbag ? newGiftBox.matchingHandbag.minOrderQuantity : ""}
//                   onChange={(e) =>
//                     setNewGiftBox({
//                       ...newGiftBox,
//                       matchingHandbag: { ...newGiftBox.matchingHandbag, minOrderQuantity: e.target.value },
//                     })
//                   }
//                 />
//                 <input type="file" accept="image/*" onChange={handleGiftBoxMatchingHandbagImageUpload} />
//                 {newGiftBox.matchingHandbag && newGiftBox.matchingHandbag.image && (
//                   <div className={styles.imagePreviewContainer}>
//                     <img
//                       src={newGiftBox.matchingHandbag.image}
//                       alt="Current Matching Handbag"
//                       style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                     />
//                     <button
//                       className={styles.imageDeleteButton}
//                       onClick={() =>
//                         setNewGiftBox({
//                           ...newGiftBox,
//                           matchingHandbag: { ...newGiftBox.matchingHandbag, image: "" },
//                         })
//                       }
//                     >
//                       X
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             <button onClick={editMode && editType === "giftBox" ? handleUpdateGiftBox : handleAddGiftBox}>
//               {editMode && editType === "giftBox" ? "Update Gift Box" : "Save Gift Box"}
//             </button>
//             {editMode && editType === "giftBox" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}

//         {/* ----- General Handbag Form ----- */}
//         {selectedOption === "handbag" && (
//           <div className={styles.formSection}>
//             <h3>
//               {editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}
//             </h3>
//             <label>Select Category:</label>
//             <select
//               value={newHandbag.category}
//               onChange={(e) => setNewHandbag({ ...newHandbag, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Handbag Name"
//               value={newHandbag.name}
//               onChange={(e) => setNewHandbag({ ...newHandbag, name: e.target.value })}
//             />
//             {editMode && editType === "handbag" && newHandbag.image && (
//               <div className={styles.imagePreviewContainer}>
//                 <img
//                   src={newHandbag.image}
//                   alt="Current Handbag"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <button className={styles.imageDeleteButton} onClick={() => setNewHandbag({ ...newHandbag, image: "" })}>
//                   X
//                 </button>
//               </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleHandbagImageUpload} />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newHandbag.price}
//               onChange={(e) => setNewHandbag({ ...newHandbag, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Min Order Quantity"
//               value={newHandbag.minOrderQuantity}
//               onChange={(e) => setNewHandbag({ ...newHandbag, minOrderQuantity: e.target.value })}
//             />
//             <button onClick={editMode && editType === "handbag" ? handleUpdateHandbag : handleAddHandbag}>
//               {editMode && editType === "handbag" ? "Update Handbag" : "Save Handbag"}
//             </button>
//             {editMode && editType === "handbag" && (
//               <button onClick={handleCancelEdit}>Cancel</button>
//             )}
//           </div>
//         )}
//       </div>

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
//                       {/* <img src={sweet.image} alt={sweet.name} className={styles.sweetImage} /> */}
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

  // For debugging modal updates
  useEffect(() => {
    console.log("Modal visibility:", showSweetsModal);
  }, [showSweetsModal]);

  // Fetch all categories, gift boxes, and general handbags on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data for categories, gift boxes, and general handbags
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

  // Fetch sweets from products where category is "Sweets"
  const fetchSweets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`, {
        params: { category: "Sweets" },
      });
      console.log("Fetched sweets data:", response.data);
      // Expect API response to be: { products: [...] }
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

  // Utility: convert a file to a Base64-encoded string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // IMAGE UPLOAD HANDLERS
  const handleCategoryImageUpload = async (e) => {
    if (e.target.files?.[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewCategory((prev) => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting category image:", error);
      }
    }
  };

  const handleGiftBoxImageUpload = async (e) => {
    if (e.target.files?.[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewGiftBox((prev) => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting gift box image:", error);
      }
    }
  };

  const handleGiftBoxMatchingHandbagImageUpload = async (e) => {
    if (e.target.files?.[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewGiftBox((prev) => ({
          ...prev,
          matchingHandbag: { ...prev.matchingHandbag, image: base64 },
        }));
      } catch (error) {
        console.error("Error converting matching handbag image:", error);
      }
    }
  };

  const handleHandbagImageUpload = async (e) => {
    if (e.target.files?.[0]) {
      try {
        const base64 = await convertToBase64(e.target.files[0]);
        setNewHandbag((prev) => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error("Error converting handbag image:", error);
      }
    }
  };

  // DELETE HANDLER
  const handleDelete = async (id, type) => {
    const endpoint = `${BASE_URL}/api/giftboxpage/${type}/${id}`;
    try {
      await axios.delete(endpoint);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // CREATE / ADD FUNCTIONS
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
      const payload = {
        ...newGiftBox,
        // If matchingHandbag exists, store it as an array.
        matchingHandbags: newGiftBox.hasMatchingHandbag ? [newGiftBox.matchingHandbag] : [],
      };
      // Remove singular matchingHandbag field if necessary.
      delete payload.matchingHandbag;
      await axios.post(`${BASE_URL}/api/giftboxpage/giftBoxes`, payload);
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

  // UPDATE FUNCTIONS
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


  // EDIT HANDLER: Prepopulate form fields for editing
const handleEdit = (item, type) => {
  setSelectedOption(
    type === "category" ? "category" : type === "giftBox" ? "giftBox" : "handbag"
  );
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
      hasMatchingHandbag:
        item.matchingHandbags && item.matchingHandbags.length > 0,
      matchingHandbag:
        item.matchingHandbags && item.matchingHandbags.length > 0
          ? item.matchingHandbags[0]
          : { name: "", image: "", price: "", minOrderQuantity: "" },
      sweetsQuantity: item.sweetsQuantity || "",
      // Ensure preferredSweets is always an array
      preferredSweets: Array.isArray(item.preferredSweets)
        ? item.preferredSweets
        : [],
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
        sweetsQuantity: "",
        preferredSweets: [],
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
      if (preferredSweets.includes(sweetId)) {
        return { ...prev, preferredSweets: preferredSweets.filter((id) => id !== sweetId) };
      } else {
        return { ...prev, preferredSweets: [...preferredSweets, sweetId] };
      }
    });
  };

  // Utility function to get the full sweet objects based on IDs selected by admin.
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

      {selectedOption === "category" && (
        <div className={styles.formContainer}>
          <h2>Add Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input type="file" onChange={handleCategoryImageUpload} />
          <button onClick={handleAddCategory}>Add Category</button>
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
              <img
                src={newGiftBox.image}
                alt="Current Gift Box"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
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
                  <img
                    src={newGiftBox.matchingHandbag.image}
                    alt="Current Matching Handbag"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
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
          <h2>{editMode && editType === "handbag" ? "Edit General Handbag" : "Add New General Handbag"}</h2>
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
              <img
                src={newHandbag.image}
                alt="Current Handbag"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
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
              <td>{box.sweetsQuantity || "NA"}</td>
              <td>
                {box.preferredSweets && box.preferredSweets.length > 0 ? (
                  box.preferredSweets.map((sweet) => (
                    <div key={sweet._id} className={styles.preferredSweet}>
                      <div>
                        {sweet.name} - ₹{sweet.price}
                      </div>
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
                      <img src={sweet.image} alt={sweet.name} className={styles.sweetImage} />
                      <span>
                        {sweet.name} - ₹{sweet.price}
                      </span>
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