// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './bulkOrderMng.module.css';

// const BulkOrderManagement = () => {
//   const [bulkOrders, setBulkOrders] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     size: '',
//     oldPrice: '',
//     images: []
//   });
//   const [editOrderId, setEditOrderId] = useState(null);
//   const [existingImages, setExistingImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Fetch bulk orders on component load
//   useEffect(() => {
//     const fetchBulkOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/bulkOrders');
//         setBulkOrders(response.data.bulkOrders);
//       } catch (error) {
//         console.error('Error fetching bulk orders:', error);
//       }
//     };
//     fetchBulkOrders();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   // Handle file uploads and convert them to Base64
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const promises = files.map((file) => {
//       const reader = new FileReader();
//       return new Promise((resolve) => {
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           resolve(reader.result);
//         };
//       });
//     });

//     Promise.all(promises).then((images) => {
//       setFormData((prevState) => ({
//         ...prevState,
//         images: [...prevState.images, ...images]
//       }));
//     });
//   };

//   // Add a new bulk order
//   const handleAddBulkOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/bulkOrders', formData);
//       setBulkOrders([...bulkOrders, response.data.bulkOrder]);
//       resetFormData();
//     } catch (error) {
//       console.error('Error adding bulk order:', error);
//     }
//   };

//   // Edit an existing bulk order
//   const handleEditBulkOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const updateData = {
//         title: formData.title,
//         title: formData.size,
//         description: formData.description,
//         price: formData.price,
//         oldPrice: formData.oldPrice,
//         newImages: formData.images.length > 0
//           ? formData.images.map((img) => ({
//               data: img.split(',')[1],
//               contentType: img.split(';')[0].split(':')[1]
//             }))
//           : [],
//         existingImages: existingImages
//       };

//       const response = await axios.put(`http://localhost:8080/api/bulkOrders/${editOrderId}`, updateData);

//       if (response.data.success) {
//         setBulkOrders(
//           bulkOrders.map((order) =>
//             order._id === editOrderId ? response.data.bulkOrder : order
//           )
//         );
//         setEditOrderId(null);
//         resetFormData();
//       } else {
//         console.error('Error editing bulk order:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error editing bulk order:', error.response ? error.response.data : error.message);
//     }
//   };

//   // Delete a bulk order
//   const handleDeleteBulkOrder = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/bulkOrders/${orderId}`);
//       setBulkOrders(bulkOrders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error('Error deleting bulk order:', error);
//     }
//   };

//   // Handle the edit click
//   const handleEditClick = (order) => {
//     setEditOrderId(order._id);
//     setFormData({
//       title: order.title,
//       size: order.size,
//       description: order.description,
//       price: order.price,
//       oldPrice: order.oldPrice,
//       images: [] // Clear form images to avoid duplication
//     });
//     setExistingImages(order.images); // Set existing images separately
//   };

//   // Delete an image from the existing images
//   const handleDeleteImage = async (index) => {
//     if (editOrderId) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:8080/api/bulkOrders/${editOrderId}/images/${index}`
//         );
//         if (response.data.success) {
//           setExistingImages(existingImages.filter((_, i) => i !== index));
//         } else {
//           console.error('Error deleting image:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error deleting image:', error.response ? error.response.data : error.message);
//       }
//     } else {
//       setExistingImages(existingImages.filter((_, i) => i !== index));
//     }
//   };

//   // Handle image click (preview)
//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   // Close modal for image preview
//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   // Reset the form data
//   const resetFormData = () => {
//     setFormData({
//       title: '',
//       size: '',
//       description: '',
//       price: '',
//       oldPrice: '',
//       images: []
//     });
//     setExistingImages([]);
//     document.getElementById('fileInput').value = '';
//   };

//   return (
//     <div className={styles.bulkOrderManagement}>
//       <h2>Bulk Order Management</h2>
//       <form
//         onSubmit={editOrderId ? handleEditBulkOrder : handleAddBulkOrder}
//         className={styles.form}
//       >
//         <input
//           className={styles.input}
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           className={styles.input}
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           className={styles.input}
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           className={styles.input}
//           type="number"
//           name="oldPrice"
//           placeholder="Old Price"
//           value={formData.oldPrice}
//           onChange={handleInputChange}
//         />

//         {existingImages.length > 0 && (
//           <div className={styles.existingImages}>
//             {existingImages.map((image, index) => (
//               <div key={index} className={styles.imageContainer}>
//                 <img
//                   className={styles.imgg}
//                   src={`data:${image.contentType};base64,${image.data}`}
//                   alt={`bulk-order-${index}`}
//                   width="100"
//                   height="100"
//                   onClick={() => handleImageClick(image)}
//                 />
//                 <button
//                   type="button"
//                   className={styles.deleteImageButton}
//                   onClick={() => handleDeleteImage(index)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <input
//           id="fileInput"
//           className={styles.input}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleFileChange}
//         />
//         <button className={styles.button} type="submit">
//           {editOrderId ? 'Save Changes' : 'Add Bulk Order'}
//         </button>
//         {editOrderId && (
//           <button type="button" onClick={() => setEditOrderId(null)}>
//             Cancel
//           </button>
//         )}
//       </form>

//       {selectedImage && (
//         <div className={styles.modal} onClick={handleCloseModal}>
//           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <span className={styles.close} onClick={handleCloseModal}>
//               &times;
//             </span>
//             <img
//               src={`data:${selectedImage.contentType};base64,${selectedImage.data}`}
//               alt="Selected"
//               className={styles.modalImage}
//             />
//           </div>
//         </div>
//       )}

//       <table className={styles.bulkOrdersTable}>
//       <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             <th>Images</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bulkOrders.map((order) => (
//             <tr key={order._id}>
//               <td>{order._id}</td>
//               <td>{order.title}</td>
//               <td>{order.description}</td>
//               <td>{order.price}</td>
//               <td>{order.oldPrice}</td>
//               <td>
//                 {order.images.map((image, index) => (
//                   <img
//                     key={index}
//                     className={styles.imgg}
//                     src={`data:${image.contentType};base64,${image.data}`}
//                     alt={`bulk-order-${order._id}-${index}`}
//                     width="50"
//                   />
//                 ))}
//               </td>
//               <td>
//                 <button
//                   className={styles.button}
//                   onClick={() => handleEditClick(order)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={styles.button}
//                   onClick={() => handleDeleteBulkOrder(order._id)}
//                 >
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

// export default BulkOrderManagement;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './bulkOrderMng.module.css';

const BulkOrderManagement = () => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    size: '',
    customSize: '',
    description: '',
    price: '',
    oldPrice: '',
    images: []
  });
  const [editOrderId, setEditOrderId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch bulk orders on component load
  useEffect(() => {
    const fetchBulkOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bulkOrders');
        setBulkOrders(response.data.bulkOrders);
      } catch (error) {
        console.error('Error fetching bulk orders:', error);
      }
    };
    fetchBulkOrders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file uploads and convert them to Base64
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });
    Promise.all(promises).then((images) => {
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...images]
      }));
    });
  };

  // Add a new bulk order
  const handleAddBulkOrder = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.size ||
      (formData.size === "Other" && !formData.customSize) ||
      !formData.description ||
      !formData.price ||
      formData.images.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    
    console.log("Submitting bulk order with the following data:", formData);

    try {
      const response = await axios.post("http://localhost:8080/api/bulkOrders", formData);
      setBulkOrders([...bulkOrders, response.data.bulkOrder]);
      resetFormData();
    } catch (error) {
      console.error("Error adding bulk order:", error);
    }
  };


  // Edit an existing bulk order
  const handleEditBulkOrder = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        title: formData.title,
        size: formData.size,
        customSize: formData.customSize,
        description: formData.description,
        price: formData.price,
        oldPrice: formData.oldPrice,
        newImages: formData.images.length > 0
          ? formData.images.map((img) => ({
              data: img.split(',')[1],
              contentType: img.split(';')[0].split(':')[1]
            }))
          : [],
        existingImages: existingImages
      };

      const response = await axios.put(`http://localhost:8080/api/bulkOrders/${editOrderId}`, updateData);
      if (response.data.success) {
        setBulkOrders(
          bulkOrders.map((order) =>
            order._id === editOrderId ? response.data.bulkOrder : order
          )
        );
        setEditOrderId(null);
        resetFormData();
      } else {
        console.error('Error editing bulk order:', response.data.message);
      }
    } catch (error) {
      console.error('Error editing bulk order:', error.response ? error.response.data : error.message);
    }
  };

  // Delete a bulk order
  const handleDeleteBulkOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/bulkOrders/${orderId}`);
      setBulkOrders(bulkOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting bulk order:', error);
    }
  };

  // Handle the edit click
  const handleEditClick = (order) => {
    setEditOrderId(order._id);
    setFormData({
      title: order.title,
      size: order.size,
      customSize: order.size === "Other" ? order.customSize : "",
      description: order.description,
      price: order.price,
      oldPrice: order.oldPrice,
      images: [] // Clear form images to avoid duplication
    });
    setExistingImages(order.images);
  };

  // Delete an image from the existing images
  const handleDeleteImage = async (index) => {
    if (editOrderId) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/bulkOrders/${editOrderId}/images/${index}`
        );
        if (response.data.success) {
          setExistingImages(existingImages.filter((_, i) => i !== index));
        } else {
          console.error('Error deleting image:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting image:', error.response ? error.response.data : error.message);
      }
    } else {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    }
  };

  // Handle image click (preview)
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close modal for image preview
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Reset the form data
  const resetFormData = () => {
    setFormData({
      title: '',
      size: '',
      customSize: '',
      description: '',
      price: '',
      oldPrice: '',
      images: []
    });
    setExistingImages([]);
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className={styles.bulkOrderManagement}>
      <h2>Bulk Order Management</h2>
      <form
        onSubmit={editOrderId ? handleEditBulkOrder : handleAddBulkOrder}
        className={styles.form}
      >
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        
        {/* Dropdown for size */}
        <div className={styles.inputWrapper}>
          <label htmlFor="size" className={styles.label}>Size</label>
          <select
            id="size"
            name="size"
            className={styles.input}
            value={formData.size}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Size --</option>
            <option value="500 gm">500 gm</option>
            <option value="1 kg">1 kg</option>
            <option value="2 kg">2 kg</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formData.size === "Other" && (
          <input
            className={styles.input}
            type="text"
            name="customSize"
            placeholder="Enter custom size"
            value={formData.customSize}
            onChange={handleInputChange}
            required
          />
        )}
        
        <input
          className={styles.input}
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.input}
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.input}
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />

        {existingImages.length > 0 && (
          <div className={styles.existingImages}>
            {existingImages.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  className={styles.imgg}
                  src={`data:${image.contentType};base64,${image.data}`}
                  alt={`bulk-order-${index}`}
                  width="100"
                  height="100"
                  onClick={() => handleImageClick(image)}
                />
                <button
                  type="button"
                  className={styles.deleteImageButton}
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          id="fileInput"
          className={styles.input}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button className={styles.button} type="submit">
          {editOrderId ? 'Save Changes' : 'Add Bulk Order'}
        </button>
        {editOrderId && (
          <button type="button" onClick={() => setEditOrderId(null)}>
            Cancel
          </button>
        )}
      </form>

      {selectedImage && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <img
              src={`data:${selectedImage.contentType};base64,${selectedImage.data}`}
              alt="Selected"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}

      <table className={styles.bulkOrdersTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Size</th>
            <th>Description</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bulkOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.title}</td>
              <td>{order.size}</td>
              <td>{order.description}</td>
              <td>{order.price}</td>
              <td>{order.oldPrice}</td>
              <td>
                {order.images.map((image, index) => (
                  <img
                    key={index}
                    className={styles.imgg}
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`bulk-order-${order._id}-${index}`}
                    width="50"
                  />
                ))}
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEditClick(order)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDeleteBulkOrder(order._id)}
                >
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

export default BulkOrderManagement;

