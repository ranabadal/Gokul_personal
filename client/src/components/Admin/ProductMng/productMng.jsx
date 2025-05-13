

import React, { useState, useEffect } from 'react';
import styles from './productMng.module.css';
import axios from 'axios';
import { BASE_URL } from '../../../Const/Const'; // Adjust the import path as necessary
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
    isTodaysDeal: false,
    bulkOrderAvailable: false
  });
  const [editProductId, setEditProductId] = useState(null);

  // Filter state variables
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
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

  // Input handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData(prevState => ({ ...prevState, image: reader.result }));
    };
  };

  // Add and Edit product handlers
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setProducts([...products, result.product]);
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
          isTodaysDeal: false,
          bulkOrderAvailable: false
        });
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
      const response = await fetch(`${BASE_URL}/api/products/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
          isTodaysDeal: false,
          bulkOrderAvailable: false
        });
      } else {
        console.error('Failed to edit product:', result.message);
      }
    } catch (error) {
      console.error('Error editing product:', error);
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
      image: product.image,
      discountPrice: product.discountPrice || '',
      oldPrice: product.oldPrice || '',
      discountPercent: product.discountPercent || '',
      isTodaysDeal: product.isTodaysDeal || false,
      bulkOrderAvailable: product.bulkOrderAvailable || false
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
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

  // --- Filter Handlers ---
  const handleFilterCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setSelectedProduct('');
  };

  const handleFilterSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSelectedSubcategory(subcategory);
    setSelectedProduct('');
  };

  const handleFilterProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
  };

  // Compute filtered products based on the selected filters
  const computedFilteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
    if (selectedProduct && product._id !== selectedProduct) return false;
    return true;
  });

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  // Based on selected category, get unique subcategories
  const uniqueSubcategories = selectedCategory 
    ? [...new Set(products.filter(product => product.category === selectedCategory)
                          .map(product => product.subcategory))]
    : [];

  // Based on category & subcategory, get products for the third dropdown
  const productsForDropdown = (selectedCategory && selectedSubcategory)
    ? products.filter(product => product.category === selectedCategory && product.subcategory === selectedSubcategory)
    : [];

  return (
    <div className={styles.productManagement}>
      <h2>Product Management</h2>
      
      {/* Product Add/Edit Form */}
      <form onSubmit={editProductId ? handleEditProduct : handleAddProduct} className={styles.form}>
        {/* Category Dropdown */}
        <select
          className={styles.input}
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Sweets">Sweets</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        {/* Subcategory, Name, Description, Price Inputs */}
        <input 
          className={styles.input} 
          type="text" 
          name="subcategory" 
          placeholder="Subcategory" 
          value={formData.subcategory} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          className={styles.input} 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleInputChange} 
          required 
        />
        <input
          className={styles.input}
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          maxLength={216}
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

        {/* Conditionally Render Bulk Order Checkbox */}
        {formData.category === "Restaurant" && (
          <label>
            <input 
              type="checkbox" 
              name="bulkOrderAvailable" 
              checked={formData.bulkOrderAvailable} 
              onChange={handleInputChange} 
            />
            Available for Bulk Order
          </label>
        )}

        <input 
          id="fileInput"
          className={styles.input} 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <button className={styles.button} type="submit">
          {editProductId ? "Save Changes" : "Add Product"}
        </button>
        {editProductId && 
          <button type="button" onClick={() => setEditProductId(null)}>
            Cancel
          </button>
        }
      </form>

      {/* Filter Section */}
      <div 
        className={styles.filterRow}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Category Filter Dropdown */}
          <select value={selectedCategory} onChange={handleFilterCategoryChange}>
            <option value="">Select Category</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Subcategory Filter Dropdown (only shows if a category is selected) */}
          {selectedCategory && (
            <select value={selectedSubcategory} onChange={handleFilterSubcategoryChange}>
              <option value="">Select Subcategory</option>
              {uniqueSubcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          )}

          {/* Product Filter Dropdown (only shows if category and subcategory are selected) */}
          {selectedCategory && selectedSubcategory && (
            <select value={selectedProduct} onChange={handleFilterProductChange}>
              <option value="">Select Product</option>
              {productsForDropdown.map(product => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          )}
        </div>
        <button 
          className={styles.viewAllButton} 
          onClick={() => { 
            setSelectedCategory('');
            setSelectedSubcategory('');
            setSelectedProduct('');
          }}
        >
          View All
        </button>
      </div>

      {/* Products Table */}
      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Bulk Order Available</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {computedFilteredProducts.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.bulkOrderAvailable ? 'Yes' : 'No'}</td>
              <td>
                <img className={styles.imgg} src={product.image} alt={product.name} width="50" />
              </td>
              <td>
                <button className={styles.button} onClick={() => handleEditClick(product)}>
                  Edit
                </button>
                <button className={styles.button} onClick={() => handleDeleteProduct(product._id)}>
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

export default ProductManagement;