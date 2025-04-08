
import React, { useState, useEffect } from 'react';
import styles from './productMng.module.css';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    name: '',
    description: '',
    price: '',
    rating: '',
    reviewCount: '',
    image: '',
    discountPrice: '',
    oldPrice: '',
    discountPercent: '',
    isTodaysDeal: false
  });

  const [editProductId, setEditProductId] = useState(null);


  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        const result = await response.json();
        if (result.success) {
          setProducts(result.products);
        } else {
          console.error('Failed to fetch products:', result.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToSet = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({ ...prevState, [name]: valueToSet }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData(prevState => ({ ...prevState, image: reader.result }));
    };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setProducts([...products, result.product]);
  
        // Reset formData state
        setFormData({
          category: '',
          subcategory: '',
          name: '',
          description: '',
          price: '',
          rating: '',
          reviewCount: '',
          image: '',
          discountPrice: '',
          oldPrice: '',
          discountPercent: '',
          isTodaysDeal: false
        });
  
        // Reset file input field
        document.getElementById("fileInput").value = "";
      } else {
        console.error('Failed to add product:', result.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/products/${editProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setProducts(products.map(product => (product._id === editProductId ? result.product : product)));
        setEditProductId(null);
        setFormData({
          category: '',
          subcategory: '',
          name: '',
          description: '',
          price: '',
          rating: '',
          reviewCount: '',
          image: '',
          discountPrice: '',
          oldPrice: '',
          discountPercent: '',
          isTodaysDeal: false
        });
      } else {
        console.error('Failed to edit product:', result.message);
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setFormData({
      category: product.category,
      subcategory: product.subcategory,
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: `data:${product.image.contentType};base64,${product.image.data}`,
      discountPrice: product.discountPrice || '',
      oldPrice: product.oldPrice || '',
      discountPercent: product.discountPercent || '',
      isTodaysDeal: product.isTodaysDeal || false
    });
  };

  return (
    <div className={styles.productManagement}>
      <h2>Product Management</h2>
      <form onSubmit={editProductId ? handleEditProduct : handleAddProduct} className={styles.form}>
        <input className={styles.input} type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required />
        <input className={styles.input} type="text" name="subcategory" placeholder="Subcategory" value={formData.subcategory} onChange={handleInputChange} required />
        <input className={styles.input} type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input className={styles.input} type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
        <input className={styles.input} type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
        <input className={styles.input} type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleInputChange} />
        <input className={styles.input} type="number" name="reviewCount" placeholder="Review Count" value={formData.reviewCount} onChange={handleInputChange} />
        {/* <label>
          <input type="checkbox" name="isTodaysDeal" checked={formData.isTodaysDeal} onChange={handleInputChange} />
          Today's Deal
        </label>
        {formData.isTodaysDeal && (
          <>
            <input className={styles.input} type="number" name="discountPrice" placeholder="Discount Price" value={formData.discountPrice} onChange={handleInputChange} />
            <input className={styles.input} type="number" name="oldPrice" placeholder="Old Price" value={formData.oldPrice} onChange={handleInputChange} />
            <input className={styles.input} type="number" name="discountPercent" placeholder="Discount Percent" value={formData.discountPercent} onChange={handleInputChange} />
          </>
        )} */}
        <input id="fileInput" className={styles.input} type="file" accept="image/*" onChange={handleFileChange} />
        <button className={styles.button} type="submit">{editProductId ? 'Save Changes' : 'Add Product'}</button>
        {editProductId && <button type="button" onClick={() => setEditProductId(null)}>Cancel</button>}
      </form>
      <table className={styles.productsTable}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Category</th>
      <th>Subcategory</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Discount Price</th>
      <th>Old Price</th>
      <th>Discount Percent</th>
      <th>Is Today's Deal</th>
      <th>Rating</th>
      <th>Review Count</th>
      <th>Image</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map(product => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.category}</td>
        <td>{product.subcategory}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.discountPrice}</td>
        <td>{product.oldPrice}</td>
        <td>{product.discountPercent}</td>
        <td>{product.isTodaysDeal ? 'Yes' : 'No'}</td>
        <td>{product.rating}</td>
        <td>{product.reviewCount}</td>
        <td>
         {
            <img className={styles.imgg} src={product.image} alt={product.name} width="50" />
         }
        </td>
        <td>
          <button className={styles.button} onClick={() => handleEditClick(product)}>Edit</button>
          <button className={styles.button} onClick={() => handleDeleteProduct(product._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default ProductManagement;
