// import React, { useState, useEffect } from "react";
// import styles from "./bulkOrderHistory.module.css";
// import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component

// const BulkOrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch("http://localhost:8080/api/bulkOrderQueries/user", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data);
//         } else {
//           setErrorMessage("Failed to fetch bulk orders.");
//         }
//       } catch (error) {
//         console.error("Error fetching bulk orders:", error);
//         setErrorMessage("An error occurred while fetching bulk orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCancelOrder = async (orderId, orderStatus) => {
//     if (orderStatus === "Approved") {
//       alert("You cannot cancel an order once it has been approved.");
//       return;
//     }

//     if (orderStatus === "Canceled") {
//       alert("This order has already been canceled.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${orderId}/cancel`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         alert("Order canceled successfully!");

//         const updatedResponse = await fetch("http://localhost:8080/api/bulkOrderQueries/user", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (updatedResponse.ok) {
//           const updatedData = await updatedResponse.json();
//           setOrders(updatedData);
//         } else {
//           alert("Failed to refresh orders. Please try again.");
//         }
//       } else {
//         alert("Failed to cancel order.");
//       }
//     } catch (error) {
//       console.error("Error canceling order:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
//   if (orders.length === 0) return <>
//     <div className={styles.heading}>Bulk Order History</div>
//      <p className={styles.noOrders}>📦 No bulk orders yet! Place an order today!</p>
//   </>

//   return (
//     <div className={styles.orderContainer}>
    
//       <div className={styles.orderTableContainer}>
//         <table className={styles.orderTable}>
//           <thead>
//             <tr>
//               <th>Box Name</th>
//               <th>Product Name</th>
//               <th>Quantity</th>
//               <th>Total Cost</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order.boxName || "N/A"}</td>
//                 <td>{order.productName || "N/A"}</td>
//                 <td>{order.quantity || "N/A"}</td>
//                 <td>₹{order.totalCost || 0}</td>
//                 <td>{order.status || "Pending"}</td>
//                 <td>
//                   <button className={styles.cancel} onClick={() => handleCancelOrder(order._id, order.status)}>
//                     Cancel
//                   </button>
//                   <button className={styles.view} onClick={() => setSelectedOrder(order)}>
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
//     </div>
//   );
// };

// export default BulkOrderHistory;


// import React, { useState, useEffect } from "react";
// import styles from "./bulkOrderHistory.module.css";
// import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component

// const BulkOrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch("http://localhost:8080/api/bulkOrderQueries/user", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data);
//         } else {
//           setErrorMessage("Failed to fetch bulk orders.");
//         }
//       } catch (error) {
//         console.error("Error fetching bulk orders:", error);
//         setErrorMessage("An error occurred while fetching bulk orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCancelOrder = async (orderId, orderStatus) => {
//     if (orderStatus === "Approved") {
//       alert("You cannot cancel an order once it has been approved.");
//       return;
//     }
//     if (orderStatus === "Canceled") {
//       alert("This order has already been canceled.");
//       return;
//     }
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${orderId}/cancel`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         alert("Order canceled successfully!");
//         setOrders((prevOrders) =>
//           prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Canceled" } : order))
//         );
//       } else {
//         alert("Failed to cancel order.");
//       }
//     } catch (error) {
//       console.error("Error canceling order:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
//   if (orders.length === 0)
//     return (
//       <>
//         <div className={styles.heading}>Bulk Order History</div>
//         <p className={styles.noOrders}>📦 No bulk orders yet! Place an order today!</p>
//       </>
//     );

//   return (
//     <div className={styles.orderContainer}>
//       <div className={styles.orderTableContainer}>
//         <table className={styles.orderTable}>
//           <thead>
//             <tr>
//               <th>Box Name</th>
//               <th>Products</th>
//               <th>Quantity</th>
//               <th>Total Cost</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) =>
//               order.orders.map((box, index) => (
//                 <tr key={`${order._id}-${index}`}>
//                   <td>{box.boxName || "N/A"}</td>
//                   <td>
//                     {box.sweets.map((sweet, sweetIndex) => (
//                       <div key={sweetIndex}>
//                         {sweet.productName} - ₹{sweet.productPrice}
//                       </div>
//                     ))}
//                   </td>
//                   <td>{box.quantity || "N/A"}</td>
//                   <td>₹{box.totalCost || 0}</td>
//                   {index === 0 && (
//                     <>
//                       <td rowSpan={order.orders.length}>{order.status || "Pending"}</td>
//                       <td rowSpan={order.orders.length}>
//                         <button className={styles.cancel} onClick={() => handleCancelOrder(order._id, order.status)}>
//                           Cancel
//                         </button>
//                         <button className={styles.view} onClick={() => setSelectedOrder(order)}>
//                           View Details
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
//     </div>
//   );
// };

// export default BulkOrderHistory;



import React, { useState, useEffect } from "react";
import styles from "./bulkOrderHistory.module.css";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component

const BulkOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/api/bulkOrderQueries/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging output
    
        if (!response.ok || !Array.isArray(data)) throw new Error("Invalid response format");
    
        setOrders(data);
      } catch (error) {
        console.error("Error fetching bulk orders:", error);
        setErrorMessage("An error occurred while fetching bulk orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId, orderStatus) => {
    if (orderStatus === "Approved") {
      alert("You cannot cancel an order once it has been approved.");
      return;
    }
    if (orderStatus === "Canceled") {
      alert("This order has already been canceled.");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Order canceled successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Canceled" } : order))
        );
      } else {
        alert("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
  if (orders.length === 0)
    return (
      <>
        <div className={styles.heading}>Bulk Order History</div>
        <p className={styles.noOrders}>📦 No bulk orders yet! Place an order today!</p>
      </>
    );

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Items</th>
              <th>Gift Boxes</th>
              <th>Regular Boxes</th>
              <th>Matching Handbags</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {orders && Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order._id}>
        <td>
          {order.selectedItems && Object.keys(order.selectedItems).length > 0 ? (
            Object.entries(order.selectedItems).map(([itemName, qty], idx) => (
              <div key={idx}>{itemName} - {qty} kg</div>
            ))
          ) : "No items"}
        </td>
        <td>
          {order.giftBoxes && order.giftBoxes.length > 0 ? (
            order.giftBoxes.map((box, idx) => (
              <div key={idx}>{box.name} - Qty: {box.quantity} (₹{box.price * box.quantity})</div>
            ))
          ) : "No gift boxes"}
        </td>
        <td>
          {order.selectedRegularBoxes && order.selectedRegularBoxes.length > 0 ? (
            order.selectedRegularBoxes.map((box, idx) => (
              <div key={idx}>{box.label} - Qty: {box.quantity}</div>
            ))
          ) : "No regular boxes"}
        </td>
        <td>
          {order.giftBoxes && order.giftBoxes.some((box) => box.matchingHandbags?.length > 0) ? (
            order.giftBoxes.map((box) =>
              box.matchingHandbags?.map((handbag, hIdx) => (
                <div key={hIdx}>{handbag.name} - Qty: {handbag.quantity} (₹{handbag.price * handbag.quantity})</div>
              ))
            )
          ) : "No matching handbags"}
        </td>
        <td>₹{order.totalCost || "N/A"}</td>
        <td>{order.status || "Pending"}</td>
        <td>
          <button className={styles.cancel} onClick={() => handleCancelOrder(order._id, order.status)}>
            Cancel
          </button>
          <button className={styles.view} onClick={() => setSelectedOrder(order)}>
            View Details
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No bulk orders found.</td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default BulkOrderHistory;