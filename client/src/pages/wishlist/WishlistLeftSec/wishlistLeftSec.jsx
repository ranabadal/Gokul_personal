

import React, { useState, useEffect } from "react";
import styles from "./wishlistLeftSec.module.css";
import axios from "axios";
import deleteIcon from "./Assets/deleteIcon.svg";
import star from "./Assets/Star.svg";
import Button from "../../../components/button/button";
import { useToaster } from '../../../utils';
import { BASE_URL } from "../../../Const/Const";
const WishlistLeftSec = () => {
   const setToast = useToaster();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true); // Set loading to true
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          console.error("No token found");
          setLoading(false); // Set loading to false if no token
          return;
        }
        const response = await axios.get(`${BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWishlistItems(response.data.items);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false); // Set loading to false even in case of error
      }
    };

    fetchWishlist();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.delete(`${BASE_URL}/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      setToast('Product removed from wishlist successfully!', 'success');
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        alert("Please log in first!");
        return;
      }

      await axios.post(
        `${BASE_URL}/api/cart`,
        {
          productId: item._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove from wishlist after adding to cart
      handleRemove(item._id);
      setToast('Product added to cart successfully!', 'success');

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };
  const handleAddAllToCart = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        setToast("Please log in first!", "error"); // Show error if not logged in
        return;
    }

    if (wishlistItems.length === 0) {
        setToast("Your wishlist is empty. Add products before adding to cart!", "error"); // Show error if wishlist is empty
        return;
    }

    try {
        const failedItems = []; // Track items that failed to add
        for (let item of wishlistItems) {
            try {
                await axios.post(
                    `${BASE_URL}/api/cart`,
                    {
                        productId: item._id,
                        quantity: 1
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (err) {
                console.error(`Error adding item ${item.name} to cart:`, err);
                failedItems.push(item.name); // Collect failed items
            }
        }

        if (failedItems.length > 0) {
            setToast(`Some items failed to add: ${failedItems.join(", ")}`, "error");
        } else {
            setToast("All products added to cart successfully!", "success");
            setWishlistItems([]); // Clear wishlist only if everything succeeded
        }
    } catch (error) {
        console.error("Error processing cart:", error);
        setToast("An unexpected error occurred. Please try again.", "error");
    }
};

  const totalAmount = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
      <div className={styles.wishlistContainer}>
        <div className={styles.wishlistHeader}>
          <h2 className={styles.wishlistTitle}>Wishlist</h2>
          <div className={styles.buttonContainer}>
            <Button
              text={`Add all to Basket (${wishlistItems.length})`}
              onClick={handleAddAllToCart}
              disabled={wishlistItems.length === 0} // Disable if empty
              className={wishlistItems.length === 0 ? styles.disabledButton : styles.button}
            />
          </div>
        </div>
    
        {loading && (
          <p className={styles.loadingText}>Loading wishlist, please wait...</p>
        )}
    
        {!loading && wishlistItems.length === 0 ? (
          <p className={styles.emptyWishlistText}>No products in your wishlist. Add products to get started!</p>
        ) : (
          <>
            <p className={styles.totalPrice}>Wishlist Total: ₹{totalAmount}</p>
            <div className={styles.wishlistItemsContainer}>
              {currentItems.map((item, index) => (
                <div key={index} className={styles.wishlistItem}>
                  <img src={item.image} alt={item.name} className={styles.productImage} />
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{item.name}</h3>
                    <p className={styles.productPrice}>₹{item.price}</p>
                  </div>
                  <div className={styles.productActions}>
                    <button className={styles.button} onClick={() => handleAddToCart(item)}>
                      Add to Basket
                    </button>
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className={styles.deleteIcon}
                      onClick={() => handleRemove(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
    
        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? styles.pageButtonActive : styles.pageButton}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
};

export default WishlistLeftSec;