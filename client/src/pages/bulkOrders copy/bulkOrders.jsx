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


// import React, { useEffect, useState } from "react";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import Footer from "../../components/footer/footer";
// import axios from "axios";
// import Sweets from "./Assets/sweets.png";
// import Snacks from "./Assets/snacks.png";
// import GiftBox from "./GiftBoxesForBulkPage/giftBoxesForBulkPage";

// const BulkOrder = () => {
//   const [selectedBox, setSelectedBox] = useState("Sweet Box");
//   const [selectedType, setSelectedType] = useState("Gift Box");
//   const [selectedItems, setSelectedItems] = useState({});
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [comments, setComments] = useState(""); // ✅ Comment section
//   const [sweets, setSweets] = useState([]);
//   const [snacks, setSnacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showGiftBox, setShowGiftBox] = useState(false); 
//   const [regularBoxQuantity, setRegularBoxQuantity] = useState(0); // ✅ Track Regular Box quantity
// const [selectedGiftBoxItems, setSelectedGiftBoxItems] = useState(null); // ✅ Store Gift Box selection

// const handleGiftBoxSelection = (items) => {
//   setSelectedGiftBoxItems(items); // ✅ Store selected Gift Box data from modal
//   setShowGiftBox(false); // ✅ Close modal after selection
// };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8080/api/products");
//         setSweets(response.data.products.filter((p) => p.category === "Sweets"));
//         setSnacks(response.data.products.filter((p) => p.category === "Restaurant"));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleQuantityChange = (item, operation) => {
//     setSelectedItems((prev) => ({
//       ...prev,
//       [item]: operation === "increase" ? (prev[item] || 0) + 1 : Math.max((prev[item] || 0) - 1, 0),
//     }));
//   };

//   const handleSizeChange = (size, operation) => {
//     setSelectedSizes((prev) => ({
//       ...prev,
//       [size]: operation === "increase" ? (prev[size] || 0) + 1 : Math.max((prev[size] || 0) - 1, 0),
//     }));
//   };

//   const calculateTotal = () =>
//     Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

//   return (
//     <>
//       <AboveHeader />
//       <Header />
//       <div className={`${styles.bulkOrderContainer} ${showGiftBox ? styles.hidden : ""}`}>

//         {/* Left Section - Selection & Items */}
//         <div className={styles.leftSection}>
//           <h2 className={styles.heading}>Place Bulk Order</h2>

//           {/* Box Selection */}
//      {/* Box Selection */}
// <div className={styles.boxSelection}>
//   <button 
//     className={selectedBox === "Sweet Box" ? styles.active : ""} 
//     onClick={() => setSelectedBox("Sweet Box")}
//   >
//     <img src={Sweets} alt="Sweets" className={styles.boxImage} />
//     <span>Sweets</span> {/* ✅ Changed from "Sweet Box" to "Sweets" */}
//   </button>
  
//   <button 
//     className={selectedBox === "Snacks Box" ? styles.active : ""} 
//     onClick={() => setSelectedBox("Snacks Box")}
//   >
//     <img src={Snacks} alt="Snacks" className={styles.boxImage} />
//     <span>Snacks</span> {/* ✅ Changed from "Snacks Box" to "Snacks" */}
//   </button>
// </div>

//           {/* Item Selection */}
//           {loading ? (
//             <p>Loading items...</p>
            
//           ) : (
            
//         <div>
//   <h3 className={styles.sectionHeading}>
//     {selectedBox === "Sweet Box" ? "Select Sweets" : "Select Snacks"}
//   </h3> {/* Dynamically changes based on selection */}
//   <div className={styles.selectionGrid}>
//     {(selectedBox === "Sweet Box" ? sweets : snacks).map((item) => (
//      <div key={item._id} className={styles.item}>
//      {/* Full-height image on the left */}
//      <div className={styles.imageContainer}>
//        <img src={item.image} alt={item.name} className={styles.image} />
//      </div>
   
//      {/* Right side - Details */}
//      <div className={styles.detailsContainer}>
//        {/* Item name */}
//        <div className={styles.name}>{item.name}</div>
   
//        {/* Item price */}
//        <div className={styles.price}>{item.price}/- kg</div>
   
//        {/* Quantity Selector (Bottom) */}
//        <div className={styles.controls}>
//          <button onClick={() => handleQuantityChange(item.name, "decrease")}>-</button>
//          <span>{selectedItems[item.name] || 0}</span>
//          <button onClick={() => handleQuantityChange(item.name, "increase")}>+</button>
//        </div>
//      </div>
//    </div>
//     ))}
//   </div>
// </div>
//           )}
//   <div className={styles.boxType}>
//             <button className={selectedType === "Regular Box" ? styles.active : ""} 
//                     onClick={() => setSelectedType("Regular Box")}>
//               Regular Box
//             </button>
//             <button className={selectedType === "Gift Box" ? styles.active : ""} 
//                     onClick={() => {
//                       setSelectedType("Gift Box");
//                       setShowGiftBox(true);
//                     }}>
//               Gift Box
//             </button>
//           </div>

//           {/* Regular Box Quantity Selection */}
//           {selectedType === "Regular Box" && (
//             <div className={styles.quantitySelector}>
//               <h3>Select Regular Box Quantity</h3>
//               <button onClick={() => setRegularBoxQuantity((prev) => Math.max(prev - 1, 0))}>-</button>
//               <span>{regularBoxQuantity}</span>
//               <button onClick={() => setRegularBoxQuantity((prev) => prev + 1)}>+</button>
//             </div>
//           )}


//           {/* ✅ Comments Section */}
//           <div className={styles.commentsSection}>
//             <label className={styles.commentsLabel}>Add special requests:</label>
//             <textarea
//               className={styles.comments}
//               placeholder="Write your custom message..."
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             ></textarea>
//           </div>
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className={styles.rightSection}>
//           <div className={styles.summary}>
//             <h3>Box Order Summary</h3>
//             {selectedType && (
//               <>
//                 <p>{selectedType} Selected</p>
//                 {selectedType === "Regular Box" && <p>Regular Box Quantity: {regularBoxQuantity}</p>}
//                 {selectedGiftBoxItems && <p>Gift Box: {selectedGiftBoxItems.quantity} (Handbags: {selectedGiftBoxItems.handbags.length})</p>}
//               </>
//             )}

//           </div>

//           {/* Total & Place Order */}
//           <div className={styles.orderActions}>
//             <span>Total Quantity: {calculateTotal()}</span>
//             <button className={styles.placeOrder}>Place Order</button>
//           </div>
//         </div>
//       </div>


//       {showGiftBox && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <button className={styles.closeButton} onClick={() => setShowGiftBox(false)}>×</button>
//             <GiftBox selectedItems={selectedItems} comments={comments} />
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
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
import GiftBox from "./GiftBoxesForBulkPage/giftBoxesForBulkPage";
import RegularBoxModal from "./RegularBoxModal";
import { FaTrash } from "react-icons/fa"; // ✅ Import trash icon
import AddressSelectionModal from "./addressSelectionModal/addressSelectionModal";

const BulkOrder = () => {
  const [selectedBox, setSelectedBox] = useState("Sweet Box");
  const [selectedType, setSelectedType] = useState("Gift Box");
  const [selectedItems, setSelectedItems] = useState({});
  const [comments, setComments] = useState("");
  const [sweets, setSweets] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);



  const [finalSelection, setFinalSelection] = useState(() => {
    return JSON.parse(localStorage.getItem("GiftBoxSelectionforBulkOrders")) || { giftBoxes: [], generalHandbags: [] };
  });

  const [selectedRegularBoxes, setSelectedRegularBoxes] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("RegularBoxSelection")) || {};
    return Object.entries(storedData).map(([id, data]) => ({
      id,
      label: data.label || id, // ✅ Ensure label is stored
      quantity: data.quantity || 1, // ✅ Ensure quantity is a number
    }));
  });

  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showRegularBoxModal, setShowRegularBoxModal] = useState(false);

  const [selectedGiftBoxItems, setSelectedGiftBoxItems] = useState(null);


   // ✅ Fetch addresses when modal opens
   useEffect(() => {
    if (showAddressModal) {
      fetchAddresses();
    }
  }, [showAddressModal]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      const response = await axios.get("http://localhost:8080/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };



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


  const handlePlaceOrder = () => {
    setShowAddressModal(true);
  };

  
  // const handleConfirmOrder = async (selectedAddress) => {
    // try {
    //   const token = localStorage.getItem("jwtToken");
    //   if (!token) {
    //     alert("User authentication required. Please log in.");
    //     return;
    //   }
  
  //     // ✅ Ensure totalCost is calculated in UI
  //     const totalCost = calculateTotalCost();
  
  //     // ✅ Pass full address details from UI
  //     const orderData = {
  //       selectedItems,
  //       selectedRegularBoxes,
  //       giftBoxes: finalSelection.giftBoxes,
  //       generalHandbags: finalSelection.generalHandbags,
  //       comments,
  //       totalCost, // ✅ Passed from UI
  //       address: selectedAddress, // ✅ Full address object instead of just ID
  //     };
  
  //     console.log("Sending Order Data:", orderData);
  
  //     const response = await axios.post("http://localhost:8080/api/bulkOrderQueries", orderData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  
  //     alert("Order placed successfully!");
  //     console.log("Server Response:", response.data);
  
  //     setShowAddressModal(false); // ✅ Close Modal after order is placed
  //   } catch (error) {
  //     console.error("Error placing order:", error.response?.data || error.message || error);
  //     alert(error.response?.data?.message || "Failed to place order. Please try again.");
  //   }
  // };
  const handleConfirmOrder = async (selectedAddress) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("User authentication required. Please log in.");
        return;
      }
  
      // ✅ Ensure address is provided and structured properly
      if (!selectedAddress || typeof selectedAddress !== "object" || Object.keys(selectedAddress).length === 0) {
        alert("Please select a valid delivery address before confirming the order.");
        return;
      }
  
      // ✅ Ensure totalCost is calculated in UI
      const totalCost = calculateTotalCost();
  
      // ✅ Pass full address details from UI
      const orderData = {
        selectedItems,
        selectedRegularBoxes,
        giftBoxes: finalSelection.giftBoxes,
        generalHandbags: finalSelection.generalHandbags,
        comments,
        totalCost, // ✅ Passed from UI
        address: {
          province: selectedAddress.province || "N/A",
          city: selectedAddress.city || "N/A",
          area: selectedAddress.area || "N/A",
          landmark: selectedAddress.landmark || "N/A",
        }, // ✅ Full address object instead of just ID
      };
  
      console.log("Sending Order Data:", orderData);
  
      const response = await axios.post("http://localhost:8080/api/bulkOrderQueries", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success) {
        alert("Order placed successfully!");
        console.log("Server Response:", response.data);
      } else {
        alert(response.data.message || "Failed to place order.");
      }
  
      setShowAddressModal(false); // ✅ Close Modal after order is placed
  
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message || error);
      alert(error.response?.data?.message || "Failed to place order. Please try again.");
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
  
    // ✅ Add cost of sweets/snacks
    Object.entries(selectedItems).forEach(([itemName, qty]) => {
      const itemDetails = sweets.find(s => s.name === itemName) || snacks.find(s => s.name === itemName);
      if (itemDetails?.price) {
        total += itemDetails.price * qty;
      }
    });
  
    // ✅ Add cost of gift boxes
    finalSelection.giftBoxes.forEach((box) => {
      total += box.price * box.quantity;
      box.matchingHandbags?.forEach((handbag) => {
        total += handbag.price * handbag.quantity;
      });
    });
  
    // ✅ Add cost of general handbags
    finalSelection.generalHandbags.forEach((handbag) => {
      total += handbag.price * handbag.quantity;
    });
  
    return total;
  };
  const handleDeleteItem = (id, category) => {
    let updatedData;
  
    if (category === "selectedItems") {
      updatedData = { ...selectedItems };
      delete updatedData[id];
      setSelectedItems(updatedData);
      localStorage.setItem("selectedItems", JSON.stringify(updatedData));
    } 
   else  if (category === "selectedRegularBoxes") {
    const updatedData = selectedRegularBoxes.filter(box => box.id !== id);

    // ✅ Update State & Local Storage
    setSelectedRegularBoxes(updatedData);
    localStorage.setItem("RegularBoxSelection", JSON.stringify(Object.fromEntries(updatedData.map(box => [box.id, box.quantity]))));
  }

  
    else if (category === "giftBoxes") {
      updatedData = { ...finalSelection, giftBoxes: finalSelection.giftBoxes.filter(box => box.id !== id) };
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    } 
    else if (category === "matchingHandbags") {
      updatedData = { ...finalSelection };
      updatedData.giftBoxes.forEach((box) => {
        box.matchingHandbags = box.matchingHandbags.filter(handbag => handbag.id !== id);
      });
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    }

    else if (category === "generalHandbags") { // ✅ Handle General Handbags Deletion
      updatedData = { ...finalSelection, generalHandbags: finalSelection.generalHandbags.filter(handbag => handbag.id !== id) };
      setFinalSelection(updatedData);
      localStorage.setItem("GiftBoxSelectionforBulkOrders", JSON.stringify(updatedData));
    }
  
  };



  // Handle quantity changes for sweets/snacks
  const handleQuantityChange = (item, operation) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: operation === "increase" ? (prev[item] || 0) + 1 : Math.max((prev[item] || 0) - 1, 0),
    }));
  };

  const handleGiftBoxSelection = (items) => {
    setSelectedGiftBoxItems(items);
    setShowGiftBox(false);
  };

  const handleRegularBoxSelection = (boxes) => {
    setSelectedRegularBoxes(boxes);
    setShowRegularBoxModal(false);
  };

  return (
    <>
      <AboveHeader />
      <Header />
      <div className={`${styles.bulkOrderContainer} ${(showGiftBox || showRegularBoxModal) ? styles.hidden : ""}`}>
        {/* Left Section – Product Selection */}
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>Place Bulk Order</h2>
          <div className={styles.boxSelection}>
            <button className={selectedBox === "Sweet Box" ? styles.active : ""} onClick={() => setSelectedBox("Sweet Box")}>
              <img src={Sweets} alt="Sweets" className={styles.boxImage} />
              <span>Sweets</span>
            </button>
            <button className={selectedBox === "Snacks Box" ? styles.active : ""} onClick={() => setSelectedBox("Snacks Box")}>
              <img src={Snacks} alt="Snacks" className={styles.boxImage} />
              <span>Snacks</span>
            </button>
          </div>

          {loading ? (
            <p>Loading items...</p>
          ) : (
            <div>
              <h3 className={styles.sectionHeading}>
                {selectedBox === "Sweet Box" ? "Select Sweets" : "Select Snacks"}
              </h3>
              <div className={styles.selectionGrid}>
                {(selectedBox === "Sweet Box" ? sweets : snacks).map((item) => (
                  <div key={item._id} className={styles.item}>
                    <div className={styles.imageContainer}>
                      <img src={item.image} alt={item.name} className={styles.image} />
                    </div>
                    <div className={styles.detailsContainer}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.price}>{item.price}/- kg</div>
                      <div className={styles.controls}>
                        <button onClick={() => handleQuantityChange(item.name, "decrease")}>-</button>
                        <span>{selectedItems[item.name] || 0}</span>
                        <button onClick={() => handleQuantityChange(item.name, "increase")}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box Type Selector */}
          <div className={styles.boxType}>
            <button className={selectedType === "Regular Box" ? styles.active : ""} onClick={() => setShowRegularBoxModal(true)}>
              Regular Box
            </button>
            <button className={selectedType === "Gift Box" ? styles.active : ""} onClick={() => setShowGiftBox(true)}>
              Gift Box
            </button>
          </div>

          {/* Comments Section */}
          <div className={styles.commentsSection}>
            <label className={styles.commentsLabel}>Add special requests:</label>
            <textarea className={styles.comments} placeholder="Write your custom message..." value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
          </div>
        </div>

        <div className={styles.rightSection}>
  <div className={styles.summary}>
    <h3>Order Summary</h3>

    {/* Selected Sweets/Snacks */}
    {Object.entries(selectedItems)
  .filter(([itemName, qty]) => qty > 0)
  .map(([itemName, qty]) => {
    const itemDetails = sweets.find(s => s.name === itemName) || snacks.find(s => s.name === itemName);
    return (
      <div key={itemName} className={styles.summaryItem}>
        <p><strong>{itemName}</strong>: {qty} kg</p>
        <p>Cost: ₹{itemDetails?.price ? itemDetails.price * qty : "Price not available"}</p>
        <button className={styles.deleteButton} onClick={() => handleDeleteItem(itemName, "selectedItems")}>
          <FaTrash />
        </button>
      </div>
    );
  })}

    {/* Selected Regular Boxes (FREE) */}
    {selectedRegularBoxes.length > 0 && (
  <div className={styles.summarySection}>
    <h4>Regular Box Selection (Free)</h4>
    {selectedRegularBoxes.map((box) => (
      <div key={box.id} className={styles.summaryItem}>
        <p>
          <strong>{box.label}</strong>: Quantity: {box.quantity}
        </p>
        <button 
          className={styles.deleteButton} 
          onClick={() => handleDeleteItem(box.id, "selectedRegularBoxes")}>
          <FaTrash />
        </button>
      </div>
    ))}
  </div>
)}

    {/* Gift Box Selections */}
    {finalSelection.giftBoxes.length > 0 && (
      <div className={styles.summarySection}>
        <h4>Gift Box Selection</h4>
        {finalSelection.giftBoxes.map((box) => (
          <div key={box.id} className={styles.summaryItem}>
            <p><strong>{box.name}</strong>: Quantity: {box.quantity}</p>
            <p>Cost: ₹{box.price * box.quantity}</p>
            <button className={styles.deleteButton} onClick={() => handleDeleteItem(box.id, "giftBoxes")}>
              <FaTrash />
            </button>
            {box.matchingHandbags?.length > 0 && (
              <ul>
                {box.matchingHandbags.map((handbag) => (
                  <li key={handbag.id}>
                    <strong>{handbag.name}</strong>: {handbag.quantity}
                    <p>Cost: ₹{handbag.price * handbag.quantity}</p>
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(handbag.id, "matchingHandbags")}>
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* General Handbags */}
    {finalSelection.generalHandbags.length > 0 && (
      <div className={styles.summarySection}>
        <h4>General Handbags</h4>
        {finalSelection.generalHandbags.map((handbag) => (
          <div key={handbag.id} className={styles.summaryItem}>
            <p><strong>{handbag.name}</strong>: Quantity: {handbag.quantity}</p>
            <p>Cost: ₹{handbag.price * handbag.quantity}</p>
            <button className={styles.deleteButton} onClick={() => handleDeleteItem(handbag.id, "generalHandbags")}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    )}

    {/* ✅ Total Cost Calculation */}
    <div className={styles.totalCost}>
      <h3>Total Cost approx.: ₹{calculateTotalCost()}</h3>
    </div>

    {/* ✅ Place Order Button */}
    <div className={styles.orderActions}>
      <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  </div>
</div>
      </div>

      {showGiftBox && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={() => setShowGiftBox(false)}>×</button>
      <GiftBox selectedItems={selectedItems} comments={comments} onSelect={handleGiftBoxSelection} setFinalSelection={setFinalSelection} />
    </div>
  </div>
)}

      {/* ✅ Regular Box Modal */}
      {showRegularBoxModal && <RegularBoxModal onClose={() => setShowRegularBoxModal(false)} onSelect={handleRegularBoxSelection} />}

      <Footer />

      {showAddressModal && (
        <AddressSelectionModal
          addresses={addresses}
          onClose={() => setShowAddressModal(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

    </>
  );
};

export default BulkOrder;