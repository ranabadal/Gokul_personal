// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./takeawayOrdersMng.module.css";

// const TakeawayOrdersManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   // 📌 Fetch all takeaway orders on mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await axios.get("http://localhost:8080/api/takeawayOrders/orders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         console.log("✅ Fetched Orders:", response.data); // ✅ Debug log
//         setOrders(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error.response?.data || error.message);
//         alert("Failed to fetch takeaway orders. Check server logs.");
//       }
//     };

//     fetchOrders();
//   }, []);

//   // 📌 Approve an order
//   const handleApprove = async (orderId, orderStatus) => {
//     if (orderStatus === "Accepted") {
//       alert("This order has already been accepted.");
//       return;
//     }

//     if (orderStatus === "Rejected") {
//       alert("This order was rejected. You cannot approve it now.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("jwtToken");
//       await axios.put(
//         `http://localhost:8080/api/takeawayOrders/orders/${orderId}/status`,
//         { status: "Accepted" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Accepted" } : order))
//       );

//       alert("Order approved successfully!");
//     } catch (error) {
//       console.error("Error approving order:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   // 📌 Reject an order
//   const handleReject = async (orderId, orderStatus) => {
//     if (orderStatus === "Rejected") {
//       alert("This order has already been rejected.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.put(
//         `http://localhost:8080/api/takeawayOrders/orders/${orderId}/status`,
//         { status: "Rejected" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Rejected" } : order))
//       );

//       alert("Order rejected successfully!");
//     } catch (error) {
//       console.error("Error rejecting order:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   // 📌 Delete an order
//   const handleDelete = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.delete(`http://localhost:8080/admin/orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setOrders(orders.filter((order) => order._id !== orderId));
//       alert("Order deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   if (loading) return <p>Loading orders...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

//   return (
//     <div className={styles.orderContainer}>
//       <h2>Admin - Takeaway Orders</h2>

//       <table className={styles.orderTable}>
//         <thead>
//           <tr>
//             <th>User Name</th>
//             <th>Products</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order.user?.name || "N/A"}</td>
//               <td>
//                 {order.products.map((prod, index) => (
//                   <div key={index}>
//                     {prod.product.name} (x{prod.quantity})
//                   </div>
//                 ))}
//               </td>
//               <td>{order.products.reduce((sum, prod) => sum + prod.quantity, 0)}</td>
//               <td>₹{order.totalPrice}</td>
//               <td>{order.status}</td>
//               <td>
//                 {order.status === "Pending" && (
//                   <>
//                     <button className={styles.acceptButton} onClick={() => handleApprove(order._id, order.status)}>
//                       Accept
//                     </button>
//                     <button className={styles.rejectButton} onClick={() => handleReject(order._id, order.status)}>
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {/* <button className={styles.deleteButton} onClick={() => handleDelete(order._id)}>
//                   Delete
//                 </button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TakeawayOrdersManagement;


import React, { useState, useEffect } from "react";
import styles from "./takeawayOrdersMng.module.css";

const TakeawayOrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // 📌 Fetch all takeaway orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:8080/api/takeawayOrders/orders", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setErrorMessage("Failed to fetch takeaway orders.");
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setErrorMessage("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 📌 Approve an order
  const handleApprove = async (orderId, orderStatus) => {
    if (orderStatus === "Accepted") {
      alert("This order has already been accepted.");
      return;
    }

    if (orderStatus === "Canceled") {
      alert("This order was canceled. You cannot approve it now.");
      return;
    }

    if (orderStatus === "Rejected") {
      alert("This order was rejected. You cannot approve it now.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:8080/api/takeawayOrders/orders/${orderId}/accept`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "Accepted" }),
      });

      if (response.ok) {
        alert("Order approved successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Accepted" } : order))
        );
      } else {
        alert("Failed to approve order.");
      }
    } catch (error) {
      console.error("❌ Error approving order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // 📌 Reject an order
  const handleReject = async (orderId, orderStatus) => {
    if (orderStatus === "Rejected") {
      alert("This order has already been rejected.");
      return;
    }

    if (orderStatus === "Accepted") {
      alert("This order has already been accepted. Hence now you can't reject this order.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:8080/api/takeawayOrders/orders/${orderId}/reject`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "Rejected" }),
      });

      if (response.ok) {
        alert("Order rejected successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: "Rejected" } : order))
        );
      } else {
        alert("Failed to reject order.");
      }
    } catch (error) {
      console.error("❌ Error rejecting order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

  return (
    <div className={styles.orderContainer}>
      <h2>Admin - Takeaway Orders</h2>

      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.products.map((prod, index) => (
              <tr key={`${order._id}-${index}`}>
                {index === 0 && (
                  <>
                    <td rowSpan={order.products.length}>{order.user?.name || "N/A"}</td>
                    <td rowSpan={order.products.length}>{order.user?.number || "N/A"}</td>
                    <td rowSpan={order.products.length}>{order.user?.email || "N/A"}</td>
                  </>
                )}
                <td>{prod.product.name || "N/A"}</td>
                <td>{prod.quantity || 0}</td>
                <td>₹{order.totalPrice}</td>
                {index === 0 && (
                  <>
                    <td rowSpan={order.products.length}>{order.status || "Pending"}</td>
                    <td rowSpan={order.products.length}>
                      <button className={styles.first} onClick={() => handleApprove(order._id, order.status)}>
                        Approve
                      </button>
                      <button className={styles.second} onClick={() => handleReject(order._id, order.status)}>
                        Reject
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TakeawayOrdersManagement;