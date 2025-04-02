import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./giftBoxMng.module.css";

const GiftBoxManagement = () => {
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    size: '',
    description: "",
    price: "",
    oldPrice: "",
    images: [],
  });
  const [editGiftBoxId, setEditGiftBoxId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all gift boxes
  useEffect(() => {
    const fetchGiftBoxes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/giftBoxes");
        setGiftBoxes(response.data.giftBoxes);
      } catch (error) {
        console.error("Error fetching gift boxes:", error);
      }
    };
    fetchGiftBoxes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file uploads and convert to Base64
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(promises).then((images) => {
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...images],
      }));
    });
  };

  // Add new gift box
  const handleAddGiftBox = async (e) => {
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
    try {
      const response = await axios.post("http://localhost:8080/api/giftBoxes", formData);
      setGiftBoxes([...giftBoxes, response.data.giftBox]);
      resetFormData();
    } catch (error) {
      console.error("Error adding gift box:", error);
    }
  };

  // Edit existing gift box
  const handleEditGiftBox = async (e) => {
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
              data: img.split(",")[1],
              contentType: img.split(";")[0].split(":")[1],
            }))
          : [],
        existingImages: existingImages,
      };

      const response = await axios.put(`http://localhost:8080/api/giftBoxes/${editGiftBoxId}`, updateData);

      if (response.data.success) {
        setGiftBoxes(
          giftBoxes.map((giftBox) =>
            giftBox._id === editGiftBoxId ? response.data.giftBox : giftBox
          )
        );
        setEditGiftBoxId(null);
        resetFormData();
      } else {
        console.error("Error editing gift box:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing gift box:", error);
    }
  };

  // Delete gift box
  const handleDeleteGiftBox = async (giftBoxId) => {
    try {
      await axios.delete(`http://localhost:8080/api/giftBoxes/${giftBoxId}`);
      setGiftBoxes(giftBoxes.filter((giftBox) => giftBox._id !== giftBoxId));
    } catch (error) {
      console.error("Error deleting gift box:", error);
    }
  };

  // Delete an image
  const handleDeleteImage = async (index) => {
    if (editGiftBoxId) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/giftBoxes/${editGiftBoxId}/images/${index}`);
        if (response.data.success) {
          setExistingImages(existingImages.filter((_, i) => i !== index));
        } else {
          console.error("Error deleting image:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    } else {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    }
  };

  // Handle image selection (modal preview)
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      size: "",
      customSize: "",
      price: "",
      oldPrice: "",
      images: [],
    });
    setExistingImages([]);
    document.getElementById("fileInput").value = "";
  };

  const handleEditClick = (giftBox) => {
    setEditGiftBoxId(giftBox._id);
    setFormData({
      title: giftBox.title,
      size: giftBox.size,
      customSize: giftBox.size === "Other" ? giftBox.customSize : "",
      description: giftBox.description,
      price: giftBox.price,
      oldPrice: giftBox.oldPrice,
      images: [],
    });
    setExistingImages(giftBox.images);
  };

  return (
    <div className={styles.giftBoxManagement}>
      <h2>Gift Box Management</h2>
      <form onSubmit={editGiftBoxId ? handleEditGiftBox : handleAddGiftBox} className={styles.form}>
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
                  className={styles.imagePreview}
                  src={`data:${image.contentType};base64,${image.data}`}
                  alt={`gift-box-${index}`}
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

        <input id="fileInput" className={styles.input} type="file" accept="image/*" multiple onChange={handleFileChange} />
        <button className={styles.button} type="submit">
          {editGiftBoxId ? "Save Changes" : "Add Gift Box"}
        </button>
        {editGiftBoxId && (
          <button type="button" onClick={() => setEditGiftBoxId(null)}>
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

      <table className={styles.giftBoxesTable}>
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
          {giftBoxes.map((giftBox) => (
            <tr key={giftBox._id}>
              <td>{giftBox._id}</td>
              <td>{giftBox.title}</td>
              <td>{giftBox.size}</td>
              <td>{giftBox.description}</td>
              <td>{giftBox.price}</td>
              <td>{giftBox.oldPrice}</td>
              <td>
                {giftBox.images.map((image, index) => (
                  <img
                    key={index}
                    className={styles.imagePreview}
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`gift-box-${giftBox._id}-${index}`}
                    width="50"
                  />
                ))}
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEditClick(giftBox)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDeleteGiftBox(giftBox._id)}
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

export default GiftBoxManagement;

