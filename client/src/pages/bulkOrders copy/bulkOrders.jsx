// import React from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import Footer from "../../components/footer/footer";
// import Sweets from "./Assets/SweetsCategory.png";
// import Snacks from "./Assets/SnacksCategory.png";

// const BulkOrder = () => {
//   const navigate = useNavigate(); // ✅ Use navigation

//   return (
//     <div className={styles.giftBoxes}>
//       <div className={styles.above_header}><AboveHeader /></div>
//       <div className={styles.header}><Header /></div>
//       <div className={styles.selectionContainer}>
//         <div className={styles.heading}>What do you want in bulk orders?</div>
//         <div className={styles.imageSelection}>
//           <img
//             src={Sweets}
//             alt="Sweets"
//             onClick={() => navigate("/bulkOrdercartLeft", { state: { category: "Sweets" } })} // ✅ Route to GiftBoxCartLeft
//           />
//           <img
//             src={Snacks}
//             alt="Snacks"
//             onClick={() => navigate("/bulkOrdercartLeft", { state: { category: "Restaurant" } })} // ✅ Route to GiftBoxCartLeft
//           />
//         </div>
//       </div>
//       <div className={styles.footer}><Footer /></div>
//     </div>
//   );
// };

// export default BulkOrder;



import React, { useEffect, useState } from "react";
import styles from "./bulkOrders.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Sweets from "./Assets/sweets.png";
import Snacks from "./Assets/snacks.png";

const BulkOrder = () => {
  const [selectedBox, setSelectedBox] = useState("Sweet Box");
  const [selectedType, setSelectedType] = useState("Gift Box");
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [comments, setComments] = useState("");
  const [sweets, setSweets] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setSweets(response.data.products.filter((p) => p.category === "Sweets"));
        setSnacks(response.data.products.filter((p) => p.category === "Restaurant"));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (item, operation) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: operation === "increase" ? (prev[item] || 0) + 1 : Math.max((prev[item] || 0) - 1, 0),
    }));
  };

  const handleSizeChange = (size, operation) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [size]: operation === "increase" ? (prev[size] || 0) + 1 : Math.max((prev[size] || 0) - 1, 0),
    }));
  };

  const calculateTotal = () =>
    Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      <AboveHeader />
      <Header />
      <div className={styles.bulkOrderContainer}>
        {/* Left Section - Selection & Items */}
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>Place Bulk Order</h2>

          {/* Box Selection */}
          <div className={styles.boxSelection}>
            <button className={selectedBox === "Sweet Box" ? styles.active : ""} onClick={() => setSelectedBox("Sweet Box")}>
              <img src={Sweets} alt="Sweet Box" className={styles.boxImage} />
              <span>Sweet Box</span>
            </button>
            <button className={selectedBox === "Snacks Box" ? styles.active : ""} onClick={() => setSelectedBox("Snacks Box")}>
              <img src={Snacks} alt="Snacks Box" className={styles.boxImage} />
              <span>Snacks Box</span>
            </button>
          </div>

          {/* Item Selection */}
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <div className={styles.selectionGrid}>
              {(selectedBox === "Sweet Box" ? sweets : snacks).map((item) => (
                <div key={item._id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.image} />
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.controls}>
                    <button onClick={() => handleQuantityChange(item.name, "decrease")}>-</button>
                    <span>{selectedItems[item.name] || 0}</span>
                    <button onClick={() => handleQuantityChange(item.name, "increase")}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Box Type Selection */}
          <div className={styles.boxType}>
            <button className={selectedType === "Regular Box" ? styles.active : ""} onClick={() => setSelectedType("Regular Box")}>
              Regular Box
            </button>
            <button className={selectedType === "Gift Box" ? styles.active : ""} onClick={() => setSelectedType("Gift Box")}>
              Gift Box
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className={styles.rightSection}>
          <div className={styles.summary}>
            <h3>Box Order Summary</h3>
            <p>{selectedType === "Gift Box" ? "Gift Box Selected" : "Regular Box Selected"}</p>
            {Object.keys(selectedSizes).length > 0 && (
              <p>
                {selectedType} x {Object.values(selectedSizes).reduce((sum, qty) => sum + qty, 0)}
              </p>
            )}
          </div>

          {/* Total & Place Order */}
          <div className={styles.orderActions}>
            <span>Total Quantity: {calculateTotal()}</span>
            <button className={styles.placeOrder}>Place Order</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BulkOrder;