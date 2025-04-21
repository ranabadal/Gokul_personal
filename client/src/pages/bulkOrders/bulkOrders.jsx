


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
import bulkOrderPic from "./Assets/bulk_pic.png";


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
      <div className={styles.gokul_img}>
       <img src={bulkOrderPic} alt="bulk order pic"/>

      </div>
{/* 
      {isLoading && <Loader>Loading bulk order data...</Loader>}

      {!isLoading && error && <div className={styles.error}>Error: {error}</div>} */}

      {/* Filter Section */}
      {/* {!isLoading && !error && (
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
      )} */}

      {/* Display filtered orders */}
      {/* {!isLoading && !error && filteredOrders.map((order) => (
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
      ))} */}

      <Footer />
    </div>
  );
};

export default BulkOrders;