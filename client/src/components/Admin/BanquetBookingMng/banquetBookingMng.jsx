

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './banquetBookingMng.module.css';
// import { BASE_URL } from '../../../Const/Const';

// const BanquetManagement = () => {
//     const [banquets, setBanquets] = useState([]);
//     const [formData, setFormData] = useState({
//       title: '',
//       description: '',
//       price: '',
//       oldPrice: '',
//       perPlatePrice: '',
//       seatingCapacity: '',
//       rating: '',
//       images: []
//     });
//     const [editBanquetId, setEditBanquetId] = useState(null);
//     const [existingImages, setExistingImages] = useState([]);
//     const [selectedImage, setSelectedImage] = useState(null);
  
//     useEffect(() => {
//       const fetchBanquets = async () => {
//         try {
//               const response = await axios.get(`${BASE_URL}/api/banquets`);

//           setBanquets(response.data.banquets);
//         } catch (error) {
//           console.error('Error fetching banquets:', error);
//         }
//       };
//       fetchBanquets();
//     }, []);
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData(prevState => ({ ...prevState, [name]: value }));
//     };
  
//     const handleFileChange = (e) => {
//       const files = Array.from(e.target.files);
//       const promises = files.map(file => {
//         const reader = new FileReader();
//         return new Promise((resolve) => {
//           reader.readAsDataURL(file);
//           reader.onloadend = () => {
//             resolve(reader.result);
//           };
//         });
//       });
  
//       Promise.all(promises).then(images => {
//         setFormData(prevState => ({ ...prevState, images: [...prevState.images, ...images] }));
//       });
//     };
  
//     const handleAddBanquet = async (e) => {
//       e.preventDefault();
//       try {
//             const response = await axios.post(`${BASE_URL}/api/banquets`, formData);

//         setBanquets([...banquets, response.data.banquet]);
//         resetFormData();
//       } catch (error) {
//         console.error('Error adding banquet:', error);
//       }
//     };

    
//     const handleEditBanquet = async (e) => {
//         e.preventDefault();
//         try {
//           const updateData = { 
//             title: formData.title,
//             description: formData.description,
//             price: formData.price,
//             oldPrice: formData.oldPrice,
//             perPlatePrice: formData.perPlatePrice,
//             seatingCapacity: formData.seatingCapacity,
//             rating: formData.rating,
//             newImages: formData.images.length > 0
//               ? formData.images.map(img => ({
//                   data: img.split(',')[1],
//                   contentType: img.split(';')[0].split(':')[1]
//                 }))
//               : [], // Send new images separately
//             existingImages: existingImages // Send existing images separately
//           };
      
//           console.log('Sending Update Data:', updateData);
      
//                         const response = await axios.put(`${BASE_URL}/api/banquets/${editBanquetId}`, updateData);


      
//           if (response.data.success) {
//             setBanquets(banquets.map(banquet => (banquet._id === editBanquetId ? response.data.banquet : banquet)));
//             setEditBanquetId(null);
//             resetFormData();
//           } else {
//             console.error('Error editing banquet:', response.data.message);
//           }
//         } catch (error) {
//           console.error('Error editing banquet:', error.response ? error.response.data : error.message);
//         }
//       };
      

//       const handleDeleteBanquet = async (banquetId) => {
//       try {
//             await axios.delete(`${BASE_URL}/api/banquets/${banquetId}`);

//         setBanquets(banquets.filter(banquet => banquet._id !== banquetId));
//       } catch (error) {
//         console.error('Error deleting banquet:', error);
//       }
//     };
  
//     const handleEditClick = (banquet) => {
//       setEditBanquetId(banquet._id);
//       setFormData({
//         title: banquet.title,
//         description: banquet.description,
//         price: banquet.price,
//         oldPrice: banquet.oldPrice,
//         perPlatePrice: banquet.perPlatePrice,
//         seatingCapacity: banquet.seatingCapacity,
//         rating: banquet.rating,
//         images: [] // Clear the form images to avoid duplication
//       });
//       setExistingImages(banquet.images); // Set the existing images separately
//     };
//     const handleDeleteImage = async (index) => {
//         if (editBanquetId) {
//           try {
//                             const response = await axios.delete(`${BASE_URL}/api/banquets/${editBanquetId}/images/${index}`);


//             if (response.data.success) {
//               setExistingImages(existingImages.filter((_, i) => i !== index));
//             } else {
//               console.error('Error deleting image:', response.data.message);
//             }
//           } catch (error) {
//             console.error('Error deleting image:', error.response ? error.response.data : error.message);
//           }
//         } else {
//           setExistingImages(existingImages.filter((_, i) => i !== index));
//         }
//       };
      
//     const handleImageClick = (image) => {
//       setSelectedImage(image);
//     };
  
//     const handleCloseModal = () => {
//       setSelectedImage(null);
//     };
  
//     const resetFormData = () => {
//       setFormData({
//         title: '',
//         description: '',
//         price: '',
//         oldPrice: '',
//         perPlatePrice: '',
//         seatingCapacity: '',
//         rating: '',
//         images: []
//       });
//       setExistingImages([]);
//       document.getElementById("fileInput").value = "";
//     };

//   return (
//     <div className={styles.banquetManagement}>
//       <h2>Banquet Management</h2>
//       <form onSubmit={editBanquetId ? handleEditBanquet : handleAddBanquet} className={styles.form}>
//         <input className={styles.input} type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
//         <input className={styles.input} type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
//         <input className={styles.input} type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
//         <input className={styles.input} type="number" name="oldPrice" placeholder="Old Price" value={formData.oldPrice} onChange={handleInputChange} />
//         {/* <input className={styles.input} type="number" name="perPlatePrice" placeholder="Per Plate Price" value={formData.perPlatePrice} onChange={handleInputChange} required /> */}
//         <input className={styles.input} type="number" name="seatingCapacity" placeholder="Seating Capacity" value={formData.seatingCapacity} onChange={handleInputChange} required />
//         <input className={styles.input} type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleInputChange} />
        
//         {existingImages.length > 0 && (
//           <div className={styles.existingImages}>
//             {existingImages.map((image, index) => (
//               <div key={index} className={styles.imageContainer}>
//                 <img className={styles.imgg} src={`data:${image.contentType};base64,${image.data}`} alt={`banquet-${index}`} width="100" height="100" onClick={() => handleImageClick(image)} />
//                 <button type="button" className={styles.deleteImageButton} onClick={() => handleDeleteImage(index)}>Delete</button>
//               </div>
//             ))}
//           </div>
//         )}

//         <input id="fileInput" className={styles.input} type="file" accept="image/*" multiple onChange={handleFileChange} />
//         <button className={styles.button} type="submit">{editBanquetId ? 'Save Changes' : 'Add Banquet'}</button>
//         {editBanquetId && <button type="button" onClick={() => setEditBanquetId(null)}>Cancel</button>}
//       </form>

//       {selectedImage && (
//         <div className={styles.modal} onClick={handleCloseModal}>
//           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <span className={styles.close} onClick={handleCloseModal}>&times;</span>
//             <img src={`data:${selectedImage.contentType};base64,${selectedImage.data}`} alt="Selected" className={styles.modalImage} />
//           </div>
//         </div>
//       )}

//       <table className={styles.banquetsTable}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             {/* <th>Per Plate Price</th> */}
//             <th>Seating Capacity</th>
//             <th>Rating</th>
//             <th>Images</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {banquets.map(banquet => (
//             <tr key={banquet._id}>
//               <td>{banquet._id}</td>
//               <td>{banquet.title}</td>
//               <td>{banquet.description}</td>
//               <td>{banquet.price}</td>
//               <td>{banquet.oldPrice}</td>
//               {/* <td>{banquet.perPlatePrice}</td> */}
//               <td>{banquet.seatingCapacity}</td>
//               <td>{banquet.rating}</td>
//               <td>
//                 {banquet.images.map((image, index) => (
//                   <img key={index} className={styles.imgg} src={`data:${image.contentType};base64,${image.data}`} alt={`banquet-${banquet._id}-${index}`} width="50" />
//                 ))}
//               </td>
//               <td>
//                 <button className={styles.button} onClick={() => handleEditClick(banquet)}>Edit</button>
//                 <button className={styles.button} onClick={() => handleDeleteBanquet(banquet._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default BanquetManagement;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './banquetBookingMng.module.css';
import { BASE_URL } from '../../../Const/Const';

const BanquetManagement = () => {
  // formData now holds text fields and a FileList for images.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    // oldPrice: '',
    perPlatePrice: '',
    seatingCapacity: '',
    // rating: '',
    images: null, // Will store a FileList (or an array of File objects)
  });

  const [banquets, setBanquets] = useState([]);
  const [editBanquetId, setEditBanquetId] = useState(null);
  const [existingImages, setExistingImages] = useState([]); // These will be Cloudinary image URLs/objects
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banquets`);
        setBanquets(response.data.banquets);
      } catch (error) {
        console.error('Error fetching banquets:', error);
      }
    };
    fetchBanquets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Update state with selected File objects (instead of reading as base64)
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevState) => ({ ...prevState, images: files }));
  };

  // Build FormData and POST to /banquets endpoint to add a new banquet.
  const handleAddBanquet = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      // data.append('oldPrice', formData.oldPrice);
      data.append('perPlatePrice', formData.perPlatePrice);
      data.append('seatingCapacity', formData.seatingCapacity);
      // data.append('rating', formData.rating);

      // Append image files if there are any selected.
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images', formData.images[i]);
        }
      }

      const response = await axios.post(`${BASE_URL}/api/banquets`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setBanquets([...banquets, response.data.banquet]);
      resetForm();
    } catch (error) {
      console.error(
        'Error adding banquet:',
        error.response ? error.response.data : error.message
      );
    }
  };

  // Build FormData and PUT to /banquets/:id endpoint, sending both existing image info and new files.
  const handleEditBanquet = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      // data.append('oldPrice', formData.oldPrice);
      data.append('perPlatePrice', formData.perPlatePrice);
      data.append('seatingCapacity', formData.seatingCapacity);
      // data.append('rating', formData.rating);

      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images', formData.images[i]);
        }
      }
      // Append existing images so your backend knows which ones to keep.
      data.append('existingImages', JSON.stringify(existingImages));

      const response = await axios.put(
        `${BASE_URL}/api/banquets/${editBanquetId}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        setBanquets(
          banquets.map((banquet) =>
            banquet._id === editBanquetId ? response.data.banquet : banquet
          )
        );
        setEditBanquetId(null);
        resetForm();
      } else {
        console.error('Error updating banquet:', response.data.message);
      }
    } catch (error) {
      console.error(
        'Error updating banquet:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteBanquet = async (banquetId) => {
    try {
      await axios.delete(`${BASE_URL}/api/banquets/${banquetId}`);
      setBanquets(banquets.filter((banquet) => banquet._id !== banquetId));
    } catch (error) {
      console.error('Error deleting banquet:', error);
    }
  };

  const handleEditClick = (banquet) => {
    setEditBanquetId(banquet._id);
    setFormData({
      title: banquet.title,
      description: banquet.description,
      price: banquet.price,
      // oldPrice: banquet.oldPrice,
      perPlatePrice: banquet.perPlatePrice,
      seatingCapacity: banquet.seatingCapacity,
      // rating: banquet.rating,
      images: null, // Clear new images
    });
    // Assume banquet.images contains objects with a URL property (or just URLs)
    setExistingImages(banquet.images);
  };

  const handleDeleteImage = async (index) => {
    // If editing, call the delete image endpoint.
    if (editBanquetId) {
      try {
        const response = await axios.delete(
          `${BASE_URL}/api/banquets/${editBanquetId}/images/${index}`
        );
        if (response.data.success) {
          setExistingImages(existingImages.filter((_, i) => i !== index));
        } else {
          console.error('Error deleting image:', response.data.message);
        }
      } catch (error) {
        console.error(
          'Error deleting image:',
          error.response ? error.response.data : error.message
        );
      }
    } else {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      // oldPrice: '',
      perPlatePrice: '',
      seatingCapacity: '',
      // rating: '',
      images: null,
    });
    setExistingImages([]);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className={styles.banquetManagement}>
      <h2>Banquet Management</h2>
      <form
        onSubmit={editBanquetId ? handleEditBanquet : handleAddBanquet}
        className={styles.form}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        {/* <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleInputChange}
          className={styles.input}
        /> */}
        <input
          type="number"
          name="seatingCapacity"
          placeholder="Seating Capacity"
          value={formData.seatingCapacity}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
        {/* <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleInputChange}
          className={styles.input}
        /> */}

        {/* Show existing (Cloudinary) images when editing */}
        {existingImages.length > 0 && (
          <div className={styles.existingImages}>
            {existingImages.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={image.url || image}
                  alt={`banquet-${index}`}
                  width="100"
                  height="100"
                  onClick={() => handleImageClick(image)}
                  className={styles.imgg}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className={styles.deleteImageButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* File input for new images */}
        <input
          id="fileInput"
          className={styles.input}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" className={styles.button}>
          {editBanquetId ? 'Save Changes' : 'Add Banquet'}
        </button>
        {editBanquetId && (
          <button
            type="button"
            onClick={() => {
              setEditBanquetId(null);
              resetForm();
            }}
            className={styles.button}
          >
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
              src={selectedImage.url || selectedImage}
              alt="Selected"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}

      <table className={styles.banquetsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            {/* <th>Old Price</th> */}
            <th>Seating Capacity</th>
            {/* <th>Rating</th> */}
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banquets.map((banquet) => (
            <tr key={banquet._id}>
              <td>{banquet._id}</td>
              <td>{banquet.title}</td>
              <td>{banquet.description}</td>
              <td>{banquet.price}</td>
              {/* <td>{banquet.oldPrice}</td> */}
              <td>{banquet.seatingCapacity}</td>
              {/* <td>{banquet.rating}</td> */}
              <td>
                {banquet.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url || img}
                    alt={`banquet-${banquet._id}-${index}`}
                    width="50"
                    className={styles.imgg}
                  />
                ))}
              </td>
              <td>
                <button onClick={() => handleEditClick(banquet)} className={styles.button}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBanquet(banquet._id)}
                  className={styles.button}
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

export default BanquetManagement;