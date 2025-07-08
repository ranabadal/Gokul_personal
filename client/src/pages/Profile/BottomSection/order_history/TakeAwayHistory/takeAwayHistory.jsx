// import React from "react";
// import styles from "./takeAwayHistory.module.css";

// const TakeAwayHistory = () => {
//     return (
//         <div className={styles.order_history_content}>
//             <h2 className={styles.heading}>Take Away History</h2>
//             <p className={styles.comingSoon}>🚀 Feature Coming Soon! Stay tuned for updates. 🎉</p>
//         </div>
//     );
// };

// export default TakeAwayHistory;


// import React, { useState, useEffect } from "react";
// import styles from "./takeAwayHistory.module.css";
// import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal"; // Modal Component
// import { BASE_URL } from "../../../../../Const/Const";
// const TakeawayOrdersHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch(`${BASE_URL}/api/takeawayOrders/orders/user`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data);
//         } else {
//           setErrorMessage("Failed to fetch takeaway orders.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//         setErrorMessage("An error occurred while fetching orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCancelOrder = async (orderId, orderStatus) => {
//     if (orderStatus === "Accepted") {
//       alert("You cannot cancel an order once it has been accepted.");
//       return;
//     }

//     if (orderStatus === "Rejected") {
//         alert("You cannot cancel an order once it has been Rejected.");
//         return;
//       }

//     if (orderStatus === "Canceled") {
//       alert("This order has already been canceled.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`${BASE_URL}/api/takeawayOrders/orders/${orderId}/cancel`, {
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
//       console.error("❌ Error canceling order:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;
//   if (orders.length === 0)
//     return (
//       <>
//         <div className={styles.heading}>Takeaway Order History</div>
//         <p className={styles.noOrders}>🍽 No takeaway orders yet! Start ordering now!</p>
//       </>
//     );

//   return (
//     <div className={styles.orderContainer}>
//       <div className={styles.orderTableContainer}>
//         <table className={styles.orderTable}>
//           <thead>
//             <tr>
//               <th>Products</th>
//               <th>Quantity</th>
//               <th>Total Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={`${order._id}-${index}`}>
//                 <td>
//                   {order.products.map((prod, prodIndex) => (
//                     <div key={prodIndex}>
//                       {prod.product.name} (x{prod.quantity})
//                     </div>
//                   ))}
//                 </td>
//                 <td>{order.products.reduce((sum, prod) => sum + prod.quantity, 0)}</td>
//                 <td>₹{order.totalPrice}</td>
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

// export default TakeawayOrdersHistory;

import React, { useState, useEffect } from "react";
import styles from "./takeAwayHistory.module.css";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal";
import { BASE_URL } from "../../../../../Const/Const";
import { useToaster } from "../../../../../utils"; // Adjust the import path as necessary

const TakeawayOrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
    const setToast = useToaster();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
     

        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setErrorMessage("Please log in to view your order history.");
          return;
        }

        const response = await fetch(
          `${BASE_URL}/api/takeawayOrders/orders/user`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        console.log("API Response:", data);

        if (!response.ok || !Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrorMessage("Could not retrieve your order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId, status) => {
    if (["Accepted", "Rejected", "Canceled"].includes(status)) {
      setToast(`You cannot cancel an order once it has been ${status}.`, "error");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `${BASE_URL}/api/takeawayOrders/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setToast("Order canceled successfully!", "success");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      } else {
        setToast("Failed to cancel order.", "error");
      }
    } catch (err) {
      console.error("❌ Error canceling order:", err);
      setToast("An unexpected error occurred. Please try again later.", "error");
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading orders...</p>;
  }

 

  if (!orders ||orders.length === 0) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.heading}>Takeaway Order History</div>
        <div className={styles.emptyBox}>
          <div className={styles.emptyIcon}>🍱</div>
          <h3>No takeaway orders yet!</h3>
          <p className={styles.muted}>
            Hungry already? Treat yourself to your first flavorful moment with us.
          </p>
  
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orderContainer}>
      <div className={styles.heading}>Takeaway Order History</div>
      <div className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={`${order._id}-${index}`}>
                <td>
                  {order.products.map((prod, i) => (
                    <div key={i}>
                      {prod.product.name} (x{prod.quantity})
                    </div>
                  ))}
                </td>
                <td>{order.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.status || "Pending"}</td>
                <td>
                  <button
                    className={styles.cancel}
                    onClick={() => handleCancelOrder(order._id, order.status)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.view}
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default TakeawayOrdersHistory;