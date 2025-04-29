import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Added navigation hooks
import styles from "../../../giftBoxes/giftBoxCart/giftBoxCartLeft/giftBoxCartLeft.module.css";
import axios from "axios";
import { useToaster } from "../../../../utils";
import backIcon from "../../../giftBoxes/giftBoxCart/giftBoxCartLeft/Assets/backIcon.svg";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/footer";

const GiftBoxCartLeft = ({ customMessage, setCustomMessage, setStoredSelections, selectedGiftBox, setselectedQuantity, selectedQuantity, refreshSummaryForm = false, setRefreshSummaryForm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const setToast = useToaster();
  const category = location.state?.category || "Sweets"; // ✅ Get category dynamically
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const filteredProducts = response.data?.products?.filter((product) => product.category === category) || [];
        setItems(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setToast("Failed to load products. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleFinalizeSelection = () => {
    if (selectedItems.length === 0) {
      setToast(`Please select at least one ${category}.`, "error");
      return;
    }

    const selections = JSON.parse(localStorage.getItem("bulkOrderSelections")) || [];
    selections.push({
      selectedGiftBox: {
        title: selectedGiftBox?.title || "Unknown Gift Box",
        size: selectedGiftBox?.size || "Unknown Size",
        price: selectedGiftBox?.price || 0,
      },
      selectedItems: selectedItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
      })),
      quantity: selectedQuantity,
    });

    localStorage.setItem("bulkOrderSelections", JSON.stringify(selections));
    setStoredSelections([...selections]);
    setRefreshSummaryForm(true);
    navigate(-1); // ✅ Navigate back
  };

  return (
    <div className={styles.giftBoxCartLeft}>
      <Header />
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        <div className={styles.header}>
          <div className={styles.backButton}>
            <img src={backIcon} alt="back" className={styles.backIcon} />
            <button className={styles.back} onClick={() => navigate(-1)}>Back</button> {/* ✅ Navigate back */}
          </div>
          <h2>Bulk Order: {category}</h2>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item._id} className={styles.card}>
              {/* <img src={`data:${item.image.contentType};base64,${item.image.data}`} alt={item.name} className={styles.image} /> */}
              <img src={item.image} alt={item.name}  className={styles.image} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => setSelectedItems([...selectedItems, item])}>
                {selectedItems.some((selected) => selected._id === item._id) ? "Remove" : "Add"}
              </button>
            </div>
          ))}
        </div>

        <button className={styles.addButton} onClick={handleFinalizeSelection}>
          Confirm Selection
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default GiftBoxCartLeft;