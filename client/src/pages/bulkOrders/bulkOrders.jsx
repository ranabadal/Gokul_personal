// import React, { useState } from "react";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate"
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import space from "../../components/hall_details/assets/space.svg";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import card1 from "../../components/hall_details/assets/card1.svg";
// import card2_3 from "../../components/hall_details/assets/card2_3.svg";
// import callender_logo from "../../components/hall_details/assets/callender logo.svg";
// import clock_logo from "../../components/hall_details/assets/clock logo.svg";
// import { useNavigate } from "react-router-dom";


// const BulkOrders = () => {
//     const [hallDetailsData, setHallDetailsData] = useState({
//         name: "Banquet Hall 3",
//         price: "₹ 14999/day",
  

//         description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
//         rating: "5.0",
//         images: [space, card2_3, card2_3, card2_3, card2_3, card2_3, card2_3, card2_3],
//         icons: {
//             heart,
//             star,
//             callender_logo,
//             clock_logo,
//             space
//         },
//         selectedImage: card2_3,
//     });

//     const navigate = useNavigate();

//     const handleDateChange = (field, value) => {
//         setHallDetailsData(prevState => ({
//             ...prevState,
//             [field]: value
//         }));
//     };

//     const handleImageClick = (image) => {
//         setHallDetailsData(prevState => ({
//             ...prevState,
//             selectedImage: image
//         }));
//     };

//     const handleClick =() =>{
         
//         console.log("Button clicked");
//         navigate("/bulkOrderCart")
        
//     };

//     return (
//         <div className={styles.banquets}>
//             <div className={styles.above_header}><AboveHeader /></div>
//             <div className={styles.header}><Header /></div>
//             <div className={styles.gokul_heading}><GokulHeading /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick}/></div>
//             <div className={styles.bulk_order}><BulkOrder /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick} /></div>
//             <div className={styles.deals_timer}><DealsTimer /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick}/></div>
//             <div className={styles.footer}><Footer /></div>
//         </div>
//     );
// };

// export default BulkOrders;



// import React, { useState, useEffect } from "react";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import { useToaster } from "../../utils";
// import { useNavigate } from "react-router-dom";
// import Filter from '../../../src/components/GiftBoxAndBulkPageFilter/filter';


// const BulkOrders = () => {
//     const [bulkOrders, setBulkOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const setToast = useToaster();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBulkOrders = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/bulkOrders");
//                 if (!response.ok) throw new Error("Failed to fetch bulk order data.");

//                 const data = await response.json();
//                 if (data.success) {
//                     const updatedBulkOrders = data.bulkOrders.map((order) => ({
//                         ...order,
//                         selectedImage: order.images[0]?.data
//                             ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//                             : null,
//                     }));
//                     setBulkOrders(updatedBulkOrders);
//                 } else {
//                     throw new Error("No bulk order data found.");
//                 }
//             } catch (error) {
//                 console.error("Error:", error.message);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchBulkOrders();
//     }, []);

//     const handleAddToWishlist = async (bulkOrderId) => {
//         try {
//             const token = localStorage.getItem("jwtToken");

//             if (!token) {
//                 setToast("Please log in first!", "error");
//                 return;
//             }

//             const response = await fetch("http://localhost:8080/api/wishlist", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ bulkOrderId }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setToast("Bulk order added to wishlist successfully!", "success");
//             } else {
//                 alert(`Error adding to wishlist: ${data.message}`);
//             }
//         } catch (error) {
//             console.error("Error adding to wishlist:", error);
//             setToast("An error occurred while adding the bulk order to the wishlist.", "error");
//         }
//     };

//     const handleImageClick = (bulkOrderId, image) => {
//         setBulkOrders((prevBulkOrders) =>
//             prevBulkOrders.map((order) =>
//                 order._id === bulkOrderId ? { ...order, selectedImage: image } : order
//             )
//         );
//     };

//         const handleClick =() =>{
         
//         console.log("Button clicked");
//         navigate("/bulkOrderCart")
        
//     };

//     if (isLoading) return <div className={styles.loading}>Loading bulk order data...</div>;
//     if (error) return <div className={styles.error}>Error: {error}</div>;

//     return (
//         <div className={styles.bulkOrders}>
//             <div className={styles.above_header}>
//                 <AboveHeader />
//             </div>
//             <div className={styles.header}>
//                 <Header />
//             </div>
//             <div className={styles.gokul_heading}>
//                <div>Bulk Order</div>
//             </div>
//                 <Filter/>
//             {bulkOrders.map((order, index) => (
//                 <React.Fragment key={order._id}>
//                     <div className={styles.hall_details}>
//                         <GiftBoxAndBulkTemplate
//                             name={order.title}
//                             price={`₹ ${order.price}`}
//                             description={order.description}
//                             selectedImage={order.selectedImage}
//                             images={order.images.map(
//                                 (img) => `data:${img.contentType};base64,${img.data}`
//                             )}
//                             onImageClick={(image) => handleImageClick(order._id, image)}
//                             onAddToWishlist={() => handleAddToWishlist(order._id)}
//                             showMoreImages={order.images.length > 5}
//                             icons={{ heart, star }}
//                             onClick={handleClick}
//                         />
//                     </div>

//                     {/* Insert BulkOrder after the first item */}
//                     {index === 0 && (
//                         <div className={styles.bulk_order}>
//                             <BulkOrder />
//                         </div>
//                     )}

//                     {/* Insert DealsTimer after every second item */}
//                     {index % 2 === 1 && (
//                         <div className={styles.deals_timer}>
//                             <DealsTimer />
//                         </div>
//                     )}
//                 </React.Fragment>
//             ))}

//             <div className={styles.footer}>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default BulkOrders;




// import React, { useState, useEffect } from "react";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import { useToaster } from "../../utils";
// import { useNavigate } from "react-router-dom";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";

// const BulkOrders = () => {
//   const [bulkOrders, setBulkOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentFilter, setCurrentFilter] = useState("All"); // Initial filter state

//   const setToast = useToaster();
//   const navigate = useNavigate();

//   // Fetch bulk orders from the API
//   useEffect(() => {
//     const fetchBulkOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/bulkOrders");
//         if (!response.ok) throw new Error("Failed to fetch bulk order data.");

//         const data = await response.json();
//         if (data.success) {
//           const updatedBulkOrders = data.bulkOrders.map((order) => ({
//             ...order,
//             selectedImage:
//               order.images?.[0]
//                 ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//                 : null,
//           }));
//           setBulkOrders(updatedBulkOrders);
//         } else {
//           throw new Error("No bulk order data found.");
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBulkOrders();
//   }, []);

//   // Normalize filter labels to match database values
//   const normalizeFilterLabel = (label) => {
//     switch (label) {
//       case "Small (500 gm)":
//         return "500 gm";
//       case "Medium (1 kg)":
//         return "1 kg";
//       case "Large (2 kg)":
//         return "2 kg";
//       default:
//         return label; // "All" or any other label
//     }
//   };

//   // Update the current filter state
//   const handleFilterClick = (filterValue) => {
//     console.log("Filter clicked:", filterValue); // Debugging log
//     setCurrentFilter(filterValue);
//   };

//   // Filter bulk orders based on the current filter
//   const filteredOrders =
//     currentFilter === "All"
//       ? bulkOrders
//       : bulkOrders.filter(
//           (order) => order.size === normalizeFilterLabel(currentFilter)
//         );

//   const handleAddToWishlist = async (bulkOrderId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         setToast("Please log in first!", "error");
//         return;
//       }

//       const response = await fetch("http://localhost:8080/api/wishlist", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ bulkOrderId }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setToast("Bulk order added to wishlist successfully!", "success");
//       } else {
//         alert(`Error adding to wishlist: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       setToast("An error occurred while adding the bulk order to the wishlist.", "error");
//     }
//   };

//   const handleImageClick = (bulkOrderId, image) => {
//     setBulkOrders((prevBulkOrders) =>
//       prevBulkOrders.map((order) =>
//         order._id === bulkOrderId ? { ...order, selectedImage: image } : order
//       )
//     );
//   };

//   const handleClick = () => {
//     navigate("/bulkOrderCart");
//   };

//   if (isLoading) return <div className={styles.loading}>Loading bulk order data...</div>;
//   if (error) return <div className={styles.error}>Error: {error}</div>;

//   return (
//     <div className={styles.bulkOrders}>
//       <div className={styles.above_header}>
//         <AboveHeader />
//       </div>
//       <div className={styles.header}>
//         <Header />
//       </div>
//       <div className={styles.gokul_heading}>
//         <div>Bulk Order</div>
//       </div>

//       {/* Filter Section */}
//       <div className={styles.filtersection}>
//         <div className={styles.filters}>
//           <div className={styles.filterCards}>
//             <FilterChip
//               label="All"
//               isActive={currentFilter === "All"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Small (500 gm)"
//               isActive={currentFilter === "Small (500 gm)"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Medium (1 kg)"
//               isActive={currentFilter === "Medium (1 kg)"}
//               onClick={handleFilterClick}
//             />
//             <FilterChip
//               label="Large (2 kg)"
//               isActive={currentFilter === "Large (2 kg)"}
//               onClick={handleFilterClick}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Display filtered orders */}
//       {filteredOrders.map((order, index) => (
//         <React.Fragment key={order._id}>
//           <div className={styles.hall_details}>
//             <GiftBoxAndBulkTemplate
//               name={order.title}
//               price={`₹ ${order.price}`}


//               size={`₹ ${order.size}`}


              
//               description={order.description}
//               selectedImage={order.selectedImage}
//               images={order.images.map(
//                 (img) => `data:${img.contentType};base64,${img.data}`
//               )}
//               onImageClick={(image) => handleImageClick(order._id, image)}
//               onAddToWishlist={() => handleAddToWishlist(order._id)}
//               showMoreImages={order.images.length > 5}
//               icons={{ heart, star }}
//               onClick={handleClick}
//             />
//           </div>

//           {/* Insert BulkOrder after the first item */}
//           {index === 0 && (
//             <div className={styles.bulk_order}>
//               <BulkOrder

//               />
//             </div>
//           )}

//           {/* Insert DealsTimer after every second item */}
//           {index % 2 === 1 && (
//             <div className={styles.deals_timer}>
//               <DealsTimer title="Exclusive Deal" expiryTime="2025-03-28T23:59:59Z" />
//             </div>
//           )}
//         </React.Fragment>
//       ))}

//       <div className={styles.footer}>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default BulkOrders;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./bulkOrders.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import { useToaster } from "../../utils";
// import Loader from "../../components/Loader/loader2/loader2"

// const BulkOrders = () => {
//   const [bulkOrders, setBulkOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentFilter, setCurrentFilter] = useState("All");
  
//   const setToast = useToaster();
//   const navigate = useNavigate();

//   // Fetch bulk orders from the API
//   useEffect(() => {
//     const fetchBulkOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/bulkOrders");
//         if (!response.ok) throw new Error("Failed to fetch bulk order data.");

//         const data = await response.json();
//         if (data.success) {
//           const updatedBulkOrders = data.bulkOrders.map((order) => ({
//             ...order,
//             selectedImage:
//               order.images?.[0]
//                 ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//                 : null,
//           }));
//           setBulkOrders(updatedBulkOrders);
//         } else {
//           throw new Error("No bulk order data found.");
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBulkOrders();
//   }, []);


//     const handleImageClick = (bulkOrderId, image) => {
//     setBulkOrders((prevBulkOrders) =>
//       prevBulkOrders.map((order) =>
//         order._id === bulkOrderId ? { ...order, selectedImage: image } : order
//       )
//     );
//   };

//   const handleFilterClick = (filterValue) => {
//     setCurrentFilter(filterValue);
//   };

//   const normalizeFilterLabel = (label) => {
//     switch (label) {
//       case "Small (500 gm)":
//         return "500 gm";
//       case "Medium (1 kg)":
//         return "1 kg";
//       case "Large (2 kg)":
//         return "2 kg";
//       default:
//         return label;
//     }
//   };
  
//   const filteredOrders =
//     currentFilter === "All"
//       ? bulkOrders
//       : bulkOrders.filter(
//           (order) => order.size === normalizeFilterLabel(currentFilter)
//         );





// const handleClick = (order) => {
//   try {
//       const token = localStorage.getItem("jwtToken");

//       if (!token) {
//           setToast('Please log in first!', 'error');
//           return;
//       }

//       const selectedOrderDetails = {
//           name: order.title,
//           size: order.size,
//           image: order.images && order.images.length > 0
//               ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
//               : null
//       };

//       console.log("Selected Order Details:", selectedOrderDetails);

//       navigate("/bulkOrderCart", { state: selectedOrderDetails });
//   } catch (error) {
//       console.error("Error in handleClick:", error);
//       setToast('An unexpected error occurred!', 'error');
//   }
// };

//   if (isLoading)
//     return <Loader>Loading bulk order data...</Loader>;
//   if (error) return <div className={styles.error}>Error: {error}</div>;

//   return (
//     <div className={styles.bulkOrders}>
//       <AboveHeader />
//       <Header />
//       <div className={styles.gokul_heading}>
//         <div>Bulk Order</div>
//       </div>

//       {/* Filter Section */}
//       <div className={styles.filtersection}>
//         <div className={styles.filters}>
//           <FilterChip
//             label="All"
//             isActive={currentFilter === "All"}
//             onClick={handleFilterClick}
//           />
//           <FilterChip
//             label="Small (500 gm)"
//             isActive={currentFilter === "Small (500 gm)"}
//             onClick={handleFilterClick}
//           />
//           <FilterChip
//             label="Medium (1 kg)"
//             isActive={currentFilter === "Medium (1 kg)"}
//             onClick={handleFilterClick}
//           />
//           <FilterChip
//             label="Large (2 kg)"
//             isActive={currentFilter === "Large (2 kg)"}
//             onClick={handleFilterClick}
//           />
//         </div>
//       </div>

//       {/* Display filtered orders */}
//       {filteredOrders.map((order) => (
//         <div key={order._id} className={styles.hall_details}>
//           <GiftBoxAndBulkTemplate
//             name={order.title}
//             size={order.size}
//             price={`₹ ${order.price}`}
//             selectedImage={order.selectedImage}
//             description={order.description}
//             images={order.images.map(
//               (img) => `data:${img.contentType};base64,${img.data}`
//             )}
         
//             onImageClick={(image) => handleImageClick(order._id, image)}
                        
//                           showMoreImages={order.images.length > 5}
                        
//                           onClick={() => handleClick(order)}
//           />
//         </div>
//       ))}

//       <Footer />
//     </div>
//   );
// };

// export default BulkOrders;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./bulkOrders.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
import Footer from "../../components/footer/footer";
import BulkOrder from "../../components/bulk_order/bulk_order";
import DealsTimer from "../../components/deals_timer/deals_timer";
import heart from "../../components/hall_details/assets/red heart.svg";
import star from "../../components/hall_details/assets/star.svg";
import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
import { useToaster } from "../../utils";
import Loader from "../../components/Loader/loader2/loader2";

const BulkOrders = () => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("All");

  const setToast = useToaster();
  const navigate = useNavigate();

  // Fetch bulk orders from the API
  useEffect(() => {
    const fetchBulkOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bulkOrders");
        if (!response.ok) throw new Error("Failed to fetch bulk order data.");

        const data = await response.json();
        if (data.success) {
          const updatedBulkOrders = data.bulkOrders.map((order) => ({
            ...order,
            selectedImage:
              order.images?.[0]
                ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
                : null,
          }));
          setBulkOrders(updatedBulkOrders);
        } else {
          throw new Error("No bulk order data found.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBulkOrders();
  }, []);

  const handleImageClick = (bulkOrderId, image) => {
    setBulkOrders((prevBulkOrders) =>
      prevBulkOrders.map((order) =>
        order._id === bulkOrderId ? { ...order, selectedImage: image } : order
      )
    );
  };

  const handleFilterClick = (filterValue) => {
    setCurrentFilter(filterValue);
  };

  const normalizeFilterLabel = (label) => {
    switch (label) {
      case "Small (500 gm)":
        return "500 gm";
      case "Medium (1 kg)":
        return "1 kg";
      case "Large (2 kg)":
        return "2 kg";
      default:
        return label;
    }
  };

  const filteredOrders =
    currentFilter === "All"
      ? bulkOrders
      : bulkOrders.filter(
          (order) => order.size === normalizeFilterLabel(currentFilter)
        );

  const handleClick = (order) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }

      const selectedOrderDetails = {
        name: order.title,
        size: order.size,
        image: order.images && order.images.length > 0
          ? `data:${order.images[0].contentType};base64,${order.images[0].data}`
          : null
      };

      console.log("Selected Order Details:", selectedOrderDetails);

      navigate("/bulkOrderCart", { state: selectedOrderDetails });
    } catch (error) {
      console.error("Error in handleClick:", error);
      setToast('An unexpected error occurred!', 'error');
    }
  };

  return (
    <div className={styles.bulkOrders}>
      <AboveHeader />
      <Header />
      <div className={styles.gokul_heading}>
        <div>Bulk Order</div>
      </div>

      {isLoading && <Loader>Loading bulk order data...</Loader>}

      {!isLoading && error && <div className={styles.error}>Error: {error}</div>}

      {/* Filter Section */}
      {!isLoading && !error && (
        <div className={styles.filtersection}>
          <div className={styles.filters}>
            <FilterChip
              label="All"
              isActive={currentFilter === "All"}
              onClick={handleFilterClick}
            />
            <FilterChip
              label="Small (500 gm)"
              isActive={currentFilter === "Small (500 gm)"}
              onClick={handleFilterClick}
            />
            <FilterChip
              label="Medium (1 kg)"
              isActive={currentFilter === "Medium (1 kg)"}
              onClick={handleFilterClick}
            />
            <FilterChip
              label="Large (2 kg)"
              isActive={currentFilter === "Large (2 kg)"}
              onClick={handleFilterClick}
            />
          </div>
        </div>
      )}

      {/* Display filtered orders */}
      {!isLoading && !error && filteredOrders.map((order) => (
        <div key={order._id} className={styles.hall_details}>
          <GiftBoxAndBulkTemplate
            name={order.title}
            size={order.size}
            price={`₹ ${order.price}`}
            selectedImage={order.selectedImage}
            description={order.description}
            images={order.images.map(
              (img) => `data:${img.contentType};base64,${img.data}`
            )}
            onImageClick={(image) => handleImageClick(order._id, image)}
            showMoreImages={order.images.length > 5}
            onClick={() => handleClick(order)}
          />
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default BulkOrders;