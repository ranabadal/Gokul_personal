

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import styles from "./previewScreen.module.css";
// import Header from "../../../components/header/header";
// import AboveHeader from "../../../components/above_header/above_header";
// import Footer from "../../../components/footer/footer";

// const PreviewScreen = ({selectedCartName,selectedCartImage,selectedCartSize,selectedQuantity, basketTotal,onBack}) => {
//   // State for bulk order basket and confirmed selected address
//   const [basket, setBasket] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // State for fetched addresses, modal visibility, and modal-selected address
//   const [addresses, setAddresses] = useState([]);
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [modalSelectedAddress, setModalSelectedAddress] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();
//   // const { quantity: selectedQuantity, basketTotal } = location.state || {
//   //   quantity: 1,
//   //   basketTotal: 0,
//   // };

//   // On mount, retrieve basket and any selected address from localStorage.
//   useEffect(() => {
//     const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//     setBasket(storedBasket);

//     const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
//     setSelectedAddress(storedAddress);
//   }, []);

//   // Function to fetch addresses from the API.
//   const fetchAddresses = async () => {
//     console.log("Fetching addresses...");
//     try {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         console.log("No JWT token found.");
//         return;
//       }
//       const response = await axios.get("http://localhost:8080/addresses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         console.log("Addresses fetched:", response.data.data);
//         setAddresses(response.data.data);
//       } else {
//         console.error("Failed to fetch addresses.");
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error.message || error);
//     }
//   };

//   // Open the address selection modal.
//   const handleOpenAddressModal = async () => {
//     await fetchAddresses();
//     if (addresses.length > 0) {
//       setShowAddressModal(true);
//     }
//   };

//   // Confirm the address selection from the modal.
//   const handleConfirmModalSelection = () => {
//     if (!modalSelectedAddress) {
//       alert("Please select an address to proceed!");
//       return;
//     }
//     const selected = addresses.find(
//       (addr) => addr._id === modalSelectedAddress
//     );
//     if (selected) {
//       setSelectedAddress(selected);
//       localStorage.setItem("selectedAddress", JSON.stringify(selected));
//     }
//     setShowAddressModal(false);
//   };

//   // Back button handler
//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Confirm order handler
//   const handleConfirmOrder = () => {
//     if (!selectedAddress) {
//       alert("Please select a delivery address first!");
//       return;
//     }
//     alert("Order Confirmed!");
//   };

//   // Fallback if no bulk order has been selected.
//   if (basket.length === 0) {
//     return (
//       <div className={styles.emptyScreen}>
//         <AboveHeader />
//         <Header />
//         <div className={styles.container}>
//           <h2>No Bulk Order Selected</h2>
//           <p>Please go back and select a product before previewing your order.</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // For bulk orders, expect only one item.
//   const orderItem = basket[0];
//   const product = orderItem.productId;

//   return (
//     <div className={styles.previewScreen}>
    
//       <div className={styles.container}>
//         {/* Back Button in Top-Left */}
//         <button className={styles.backButton} onClick={onBack}>
//           &#8592; Back
//         </button>

//         <h2>Bulk Order Preview</h2>
//         <div className={styles.previewContent}>
//           {/* Selected Cart Section */}
//           <div className={styles.productCart}>
//             <div className={styles.productImage}>
//               <img
//                 src={`data:${product.image.contentType};base64,${product.image.data}`}
//                 alt={product.name}
//               />
//             </div>
//             <div className={styles.productInfo}>
//               <h2 className={styles.productName}>{product.name}</h2>
//               <p className={styles.productPrice}>₹{product.price}</p>
//               <p className={styles.productQuantity}>
//                 Quantity: {selectedQuantity}
//               </p>
//               <p className={styles.productTotalPrice}>Total: ₹{basketTotal}</p>
//             </div>
//           </div>

//           {/* Delivery Address Section */}
//           <div className={styles.addressSection}>
//             <h3>Delivery Address</h3>
//             {selectedAddress ? (
//               <div>
//                 <p>
//                   {selectedAddress.province}, {selectedAddress.city}
//                 </p>
//                 <p>
//                   {selectedAddress.area}, {selectedAddress.landmark}
//                 </p>
//                 <button onClick={handleOpenAddressModal}>
//                   Change Address
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <p>No address selected.</p>
//                 <button onClick={handleOpenAddressModal}>
//                   Select Address
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Confirm Order Button at Bottom */}
//         <div className={styles.confirmOrderWrapper}>
//           <button
//             className={styles.confirmOrderButton}
//             onClick={handleConfirmOrder}
//           >
//             Confirm Order
//           </button>
//         </div>
//       </div>
     

//       {/* Inline Address Selection Modal */}
//       {showAddressModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h2>Select Address</h2>
//             {addresses.length === 0 ? (
//               <p>No addresses available.</p>
//             ) : (
//               <div className={styles.addressList}>
//                 {addresses.map((address) => (
//                   <div key={address._id} className={styles.addressItem}>
//                     <input
//                       type="radio"
//                       id={address._id}
//                       name="selectedAddress"
//                       value={address._id}
//                       checked={modalSelectedAddress === address._id}
//                       onChange={() => setModalSelectedAddress(address._id)}
//                     />
//                     <label htmlFor={address._id}>
//                       <p>{`${address.province}, ${address.city}`}</p>
//                       <p>{`${address.area}, ${address.landmark}`}</p>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className={styles.modalActions}>
//               <button
//                 onClick={() => setShowAddressModal(false)}
//                 className={styles.cancelButton}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmModalSelection}
//                 className={styles.confirmButton}
//               >
//                 Confirm Address
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreviewScreen;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./previewScreen.module.css";
import Header from "../../../components/header/header";
import AboveHeader from "../../../components/above_header/above_header";
import Footer from "../../../components/footer/footer";

const PreviewScreen = ({
  name,
  image,
  size,
  selectedQuantity,
  basketTotal,
  onBack,

}) => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const [basket, setBasket] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [modalSelectedAddress, setModalSelectedAddress] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);

    // const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    // setSelectedAddress(storedAddress);
  }, []);

  const fetchAddresses = async () => {
    console.log("Fetching addresses...");
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.log("No JWT token found.");
        return;
      }
      const response = await axios.get("http://localhost:8080/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log("Addresses fetched:", response.data.data);
        setAddresses(response.data.data);
      } else {
        console.error("Failed to fetch addresses.");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message || error);
    }
  };

  const handleOpenAddressModal = async () => {
    await fetchAddresses();
    // if (addresses.length > 0) {

      
    // }
    setShowAddressModal(true);
  };

  const handleConfirmModalSelection = () => {
    if (!modalSelectedAddress) {
      alert("Please select an address to proceed!");
      return;
    }
    const selected = addresses.find(
      (addr) => addr._id === modalSelectedAddress
    );
    if (selected) {
      setSelectedAddress(selected);
      // localStorage.setItem("selectedAddress", JSON.stringify(selected));
    }
    setShowAddressModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };




  const handleConfirmOrder = async () => {
    if (!selectedAddress || Object.keys(selectedAddress).length === 0) {
      alert("Please select a delivery address first!");
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    // Data to be sent to the server
    const requestData = {
      boxName: name,
      boxSize: size,
      productName: product.name,
      productPrice: product.price,
      quantity: selectedQuantity,
      totalCost: basketTotal,
      address: {
        province: selectedAddress.province,
        city: selectedAddress.city,
        area: selectedAddress.area,
        landmark: selectedAddress.landmark,
      },
    };
  
    console.log("Sending data:", requestData); // Log request data
  
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("You must be logged in to confirm the order.");
        setLoading(false);
        return;
      }
  
      const response = await axios.post("http://localhost:8080/api/bulkOrderQueries", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("API response:", response.data); // Log API response
      if (response.data.success) {
        alert(response.data.message || "Order confirmed successfully!");
       
      } else {
        alert(response.data.message || "Failed to confirm order. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error confirming order:", error.message || error);
      alert("An error occurred while confirming the order. Please try again later.");
      setLoading(false);
    }
    navigate("/bulkOrders");
    localStorage.removeItem("basket");
  };


  if (basket.length === 0) {
    return (
      <div className={styles.emptyScreen}>
        <AboveHeader />
        <Header />
        <div className={styles.container}>
          <h2>No Bulk Order Selected</h2>
          <p>Please go back and select a product before previewing your order.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const orderItem = basket[0];
  const product = orderItem.productId;

  return (
    <div className={styles.previewScreen}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={onBack}>
          &#8592; Back
        </button>

        <h2>Bulk Order Preview</h2>
        <div className={styles.previewContent}>
          {/* Selected Gift Cart Section */}
          <div>Selected Box</div>
          <div className={styles.giftCart}>
          
            <div className={styles.productCart}>
              <div className={styles.productImage}>
                <img
                  src={image}
                  alt={"image"}
                />
              </div>
              <div className={styles.productInfo}>
          
                <div className={styles.productName}>{name}</div>
                <p className={styles.productQuantity}>Size: {size}</p>
              </div>
            </div>
          </div>

          {/* Selected Product Cart Section */}
          <div>Selected Product</div>
          <div className={styles.productCart}>
        
            <div className={styles.productImage}>
              <img
                src={`data:${product.image.contentType};base64,${product.image.data}`}
                alt={product.name}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>{product.name}</div>
              <p className={styles.productPrice}>₹{product.price}</p>
              <p className={styles.productQuantity}>
                Quantity: {selectedQuantity}
              </p>
              
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className={styles.addressSection}>
            <h3>Delivery Address</h3>
            {selectedAddress ? (
             <div>
             <p>
               {selectedAddress.province || ''}{selectedAddress.province && selectedAddress.city ? ', ' : ''}{selectedAddress.city || ''}
             </p>
             <p>
               {selectedAddress.area || ''}{selectedAddress.area && selectedAddress.landmark ? ', ' : ''}{selectedAddress.landmark || ''}
             </p>
             <button onClick={handleOpenAddressModal}>Change Address</button>
           </div>
            ) : (
              <div>
                <p>No address selected.</p>
                <button onClick={handleOpenAddressModal}>Select Address</button>
              </div>
            )}
          </div>

        </div>

        <div className={styles.confirmOrderWrapper}>
        <p className={styles.productTotalPrice}>Total: ₹{basketTotal}</p>
          <button
            className={styles.confirmOrderButton}
            onClick={handleConfirmOrder}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm and Save"}
          </button>
        </div>
      </div>

      {showAddressModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Select Address</h2>
            {addresses.length === 0 ? (
              <p>Please first add your Address in Profile Section</p>
            ) : (
              <div className={styles.addressList}>
                {addresses.map((address) => (
                  <div key={address._id} className={styles.addressItem}>
                    <input
                      type="radio"
                      id={address._id}
                      name="selectedAddress"
                      value={address._id}
                      checked={modalSelectedAddress === address._id}
                      onChange={() => setModalSelectedAddress(address._id)}
                    />
                    <label htmlFor={address._id}>
                      <p>{`${address.province}, ${address.city}`}</p>
                      <p>{`${address.area}, ${address.landmark}`}</p>
                    </label>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowAddressModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModalSelection}
                className={styles.confirmButton}
                
              >
                Confirm Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;