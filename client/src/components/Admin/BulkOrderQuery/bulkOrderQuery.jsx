


// import React, { useState, useEffect } from "react";
// import styles from "./bulkOrderQuery.module.css";
// import EditQueryModal from "./EditQueryModal/editQueryModal"; // Modal for editing

// const BulkOrderQueryPage = () => {
//   const [queries, setQueries] = useState([]);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("jwtToken");

//         const response = await fetch("http://localhost:8080/api/bulkOrderQueries", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setQueries(data);
//         } else {
//           setErrorMessage("Failed to fetch queries.");
//         }
//       } catch (error) {
//         console.error("Error fetching queries:", error);
//         setErrorMessage("An error occurred while fetching queries.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQueries();
//   }, []);



  
//   const handleApprove = async (queryId,orderStatus) => {

    
//     if (orderStatus === "Approved") {
//       alert("This order has already been Approved.");
//       return;
//     }

//     if (orderStatus === "Canceled") {
//       alert("This order has been canceled. Now you cant Approve it");
//       return;
//     }


//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${queryId}/approve`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         alert("Query approved successfully!");
//         const updatedQueries = queries.map((query) =>
//           query._id === queryId ? { ...query, status: "Approved" } : query
//         );
//         setQueries(updatedQueries);
//       } else {
//         alert("Failed to approve query.");
//       }
//     } catch (error) {
//       console.error("Error approving query:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   // Delete a query
//   const handleDelete = async (queryId) => {
//     if (!window.confirm("Are you sure you want to delete this query?")) return;

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${queryId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         alert("Query deleted successfully!");
//         setQueries(queries.filter((query) => query._id !== queryId));
//       } else {
//         alert("Failed to delete query.");
//       }
//     } catch (error) {
//       console.error("Error deleting query:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   // Edit a query
//   const handleEdit = (query) => {
//     setSelectedQuery(query);
//   };

//   // Save the edited query
//   const handleSaveEdit = async (updatedQuery) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${updatedQuery._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedQuery),
//       });

//       if (response.ok) {
//         alert("Query updated successfully!");
//         const updatedQueries = queries.map((query) =>
//           query._id === updatedQuery._id ? updatedQuery : query
//         );
//         setQueries(updatedQueries);
//         setSelectedQuery(null);
//       } else {
//         alert("Failed to update query.");
//       }
//     } catch (error) {
//       console.error("Error updating query:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

//   return (
//     <div className={styles.queryContainer}>
//       <h2>Admin - Bulk Order Queries</h2>

//       {selectedQuery ? (
//         <EditQueryModal
//           query={selectedQuery}
//           onSave={handleSaveEdit}
//           onCancel={() => setSelectedQuery(null)}
//         />
//       ) : (
//         <table className={styles.queryTable}>
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Phone Number</th>
//               <th>Email</th>
//               <th>Box Name</th>
//               <th>Box Size</th>
//               <th>Products</th>
//               <th>Quantity</th>
//               <th>Total</th>
//               <th>Address</th>
//               <th>Custom Message</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {queries.map((query) =>
//               query.orders.map((order, index) => (
//                 <tr key={`${query._id}-${index}`}>
//                   {index === 0 && (
//                     <>
//                       <td rowSpan={query.orders.length}>{query.user?.name || "N/A"}</td>
//                       <td rowSpan={query.orders.length}>{query.user?.number || "N/A"}</td>
//                       <td rowSpan={query.orders.length}>{query.user?.email || "N/A"}</td>
//                     </>
//                   )}
//                   <td>{order.boxName || "N/A"}</td>
//                   <td>{order.boxSize || "N/A"}</td>
//                   <td>
//                     {order.sweets.map((sweet) => (
//                       <div key={sweet.productName}>
//                         {sweet.productName} - ₹{sweet.productPrice}
//                       </div>
//                     ))}
//                   </td>
//                   <td>{order.quantity}</td>
//                   <td>₹{order.totalCost}</td>
//                   <td>
//                     {order.address ? `${order.address.province}, ${order.address.city}, ${order.address.area}, ${order.address.landmark}` : "N/A"}
//                   </td>
//                   <td>{order.customMessage || "N/A"}</td>
//                   {index === 0 && (
//                     <>
//                       <td rowSpan={query.orders.length}>{query.status || "Pending"}</td>
//                       <td rowSpan={query.orders.length}>
//                         <button className={styles.first} onClick={() => handleApprove(query._id, query.status)}>Approve</button>
//                         <button className={styles.second} onClick={() => handleDelete(query._id)}>Delete</button>
//                         <button className={styles.third} onClick={() => handleEdit(query)}>Edit</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BulkOrderQueryPage;



// import React, { useState, useEffect } from "react";
// import EditOrderModal from "./EditQueryModal/editQueryModal"; // Modal for editing bulk orders
// import styles from "./bulkOrderQuery.module.css"; // Admin Panel Styles

// const BulkOrderAdmin = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch bulk orders from backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch("http://localhost:8080/api/bulkOrderQueries/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         const data = await response.json();
//         console.log("API Response:", data); // ✅ Debugging output
    
//         if (!response.ok || !data.orders) throw new Error("Failed to fetch bulk orders");
    
//         setOrders(Array.isArray(data.orders) ? data.orders : []);
//       } catch (error) {
//         setErrorMessage(error.message || "Error fetching bulk orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Admin status update actions (Approve, Reject, Complete)
//   const handleStatusUpdate = async (orderId, currentStatus, newStatus) => {
//     if (currentStatus === "Canceled") {
//       alert("This bulk order has been canceled and cannot be updated.");
//       return;
//     }

//     if (!window.confirm(`Mark this bulk order as ${newStatus}?`)) return;

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const responseData = await response.json();
//       if (!response.ok) throw new Error(responseData.message || "Failed to update bulk order status");

//       alert(`Bulk order marked as ${newStatus}`);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (error) {
//       alert(`Error updating bulk order status: ${error.message}`);
//     }
//   };

//   // Open Edit Modal
//   const handleEditOrder = (order) => {
//     setSelectedOrder(order);
//   };

//   // Save Edited Order
//   const handleSaveEdit = async (updatedOrder) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${updatedOrder._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(updatedOrder),
//       });

//       if (!response.ok) throw new Error("Failed to update bulk order");

//       alert("Bulk order updated successfully!");
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
//       );
//       setSelectedOrder(null);
//     } catch (error) {
//       alert(`Error updating bulk order: ${error.message}`);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

//   return (
//     <div className={styles.bulkOrderAdminContainer}>
//       <h2>Bulk Orders - Admin Panel</h2>

//       {selectedOrder ? (
//         <EditOrderModal order={selectedOrder} onSave={handleSaveEdit} onCancel={() => setSelectedOrder(null)} />
//       ) : (
//         <table className={styles.orderTable}>
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Selected Items</th>
//               <th>Gift Boxes</th>
//               <th>Regular Boxes</th>
//               <th>Total Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order.userName}</td>
//                   <td>{order.userEmail}</td>
//                   <td>{order.userNumber}</td>
//                   <td>
//                     {Object.entries(order.selectedItems).map(([itemName, qty], idx) => (
//                       <div key={idx}>{itemName} - {qty} kg</div>
//                     ))}
//                   </td>
//                   <td>
//                     {order.giftBoxes.map((box, idx) => (
//                       <div key={idx}>{box.name} - Qty: {box.quantity} (₹{box.price * box.quantity})</div>
//                     ))}
//                   </td>
//                   <td>
//                     {order.selectedRegularBoxes.map((box, idx) => (
//                       <div key={idx}>{box.label} - Qty: {box.quantity}</div>
//                     ))}
//                   </td>
//                   <td>₹{order.totalCost}</td>
//                   <td>{order.status}</td>
//                   <td>
//                     <button
//                       className={styles.approveBtn}
//                       onClick={() => handleStatusUpdate(order._id, order.status, "Approved")}
//                       disabled={order.status === "Canceled"}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className={styles.rejectBtn}
//                       onClick={() => handleStatusUpdate(order._id, order.status, "Rejected")}
//                       disabled={order.status === "Canceled"}
//                     >
//                       Reject
//                     </button>
//                     <button
//                       className={styles.completeBtn}
//                       onClick={() => handleStatusUpdate(order._id, order.status, "Completed")}
//                       disabled={order.status === "Canceled"}
//                     >
//                       Complete
//                     </button>
//                     <button className={styles.editBtn} onClick={() => handleEditOrder(order)}>Edit</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9">No bulk orders found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BulkOrderAdmin;





import React, { useState, useEffect, useCallback } from "react";
import EditOrderModal from "./EditQueryModal/editQueryModal"; // Modal for editing bulk orders
import styles from "./bulkOrderQuery.module.css"; // Admin Panel Styles
import {BASE_URL} from "../../../Const/Const"; // Base URL for API requests

const BulkOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Create a reusable fetchOrders function.
  // Using useCallback ensures that the function identity doesn’t change unnecessarily.
  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BASE_URL}/api/bulkOrderQueries/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok || !data.orders) {
        throw new Error("Failed to fetch bulk orders");
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (error) {
      setErrorMessage(error.message || "Error fetching bulk orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch orders when the component mounts.
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Status update action using the response from the API (or simply re-fetching orders)
  const handleStatusUpdate = async (orderId, currentStatus, newStatus) => {
    if (currentStatus === "Canceled") {
      alert("This bulk order has been canceled and cannot be updated.");
      return;
    }

    if (!window.confirm(`Mark this bulk order as ${newStatus}?`)) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BASE_URL}/api/bulkOrderQueries/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update bulk order status");
      }

      alert(`Bulk order marked as ${newStatus}`);
      // Instead of manually updating the state, re-fetch the orders to reflect all changes.
      fetchOrders();
    } catch (error) {
      alert(`Error updating bulk order status: ${error.message}`);
    }
  };

  // Open the edit modal
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
  };

  // Save edited order by re-fetching orders after a successful update.
  const handleSaveEdit = async (updatedOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BASE_URL}/api/bulkOrderQueries/${updatedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to update bulk order");
      }

      alert("Bulk order updated successfully!");
      setSelectedOrder(null);
      // Re-fetch orders after the edit to update the UI
      fetchOrders();
    } catch (error) {
      alert(`Error updating bulk order: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

  return (
    <div className={styles.bulkOrderAdminContainer}>
      <h2>Bulk Orders - Admin Panel</h2>

      {selectedOrder ? (
        <EditOrderModal
          order={selectedOrder}
          onSave={handleSaveEdit}
          onCancel={() => setSelectedOrder(null)}
        />
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Selected Items</th>
              <th>Gift Boxes</th>
              <th>Regular Boxes</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.userName}</td>
                  <td>{order.userEmail}</td>
                  <td>{order.userNumber}</td>
                  <td>
                    {order.selectedItems &&
                      Object.entries(order.selectedItems).map(([itemName, qty], idx) => (
                        <div key={idx}>
                          {itemName} - {qty} kg
                        </div>
                      ))}
                  </td>
                  <td>
                    {order.giftBoxes &&
                      order.giftBoxes.map((box, idx) => (
                        <div key={idx}>
                          {box.name} - Qty: {box.quantity} (₹{box.price * box.quantity})
                        </div>
                      ))}
                  </td>
                  <td>
                    {order.selectedRegularBoxes &&
                      order.selectedRegularBoxes.map((box, idx) => (
                        <div key={idx}>
                          {box.label} - Qty: {box.quantity}
                        </div>
                      ))}
                  </td>
                  <td>₹{order.totalCost}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleStatusUpdate(order._id, order.status, "Approved")}
                      disabled={order.status === "Canceled"}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleStatusUpdate(order._id, order.status, "Rejected")}
                      disabled={order.status === "Canceled"}
                    >
                      Reject
                    </button>
                    <button
                      className={styles.completeBtn}
                      onClick={() => handleStatusUpdate(order._id, order.status, "Completed")}
                      disabled={order.status === "Canceled"}
                    >
                      Complete
                    </button>
                    <button className={styles.editBtn} onClick={() => handleEditOrder(order)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No bulk orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkOrderAdmin;