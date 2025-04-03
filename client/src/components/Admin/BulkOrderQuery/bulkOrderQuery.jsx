// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./bulkOrderQuery.module.css";

// const BulkOrderQuery = () => {
//   const [queries, setQueries] = useState([]);
//   const [editingQueryId, setEditingQueryId] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch all queries on component mount
//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         setIsLoading(true); // Ensure loading state is set
//         const token = localStorage.getItem("jwtToken");
//         const response = await axios.get("http://localhost:8080/api/bulkOrderQueries", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass token in headers for secure access
//           },
//         });
//         setQueries(response.data);
//       } catch (error) {
//         console.error("Error fetching bulk order queries:", error.message || error);
//         setErrorMessage("Failed to fetch queries. Please try again later.");
//       } finally {
//         setIsLoading(false); // Clear loading state
//       }
//     };

//     fetchQueries();
//   }, []);

//   const handleEdit = (query) => {
//     setEditingQueryId(query._id);
//     setEditedData(query);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.put(
//         `http://localhost:8080/api/bulkOrderQueries/${editingQueryId}`,
//         editedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         const updatedQueries = queries.map((query) =>
//           query._id === editingQueryId ? response.data.query : query
//         );
//         setQueries(updatedQueries);
//         setEditingQueryId(null);
//         alert("Query updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating query:", error.message || error);
//       alert("Failed to update query.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this query?")) {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await axios.delete(`http://localhost:8080/api/bulkOrderQueries/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.data.success) {
//           setQueries(queries.filter((query) => query._id !== id));
//           alert("Query deleted successfully!");
//         }
//       } catch (error) {
//         console.error("Error deleting query:", error.message || error);
//         alert("Failed to delete query.");
//       }
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.put(
//         `http://localhost:8080/api/bulkOrderQueries/${id}`,
//         { status: "Approved" },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         const updatedQueries = queries.map((query) =>
//           query._id === id ? response.data.query : query
//         );
//         setQueries(updatedQueries);
//         alert("Query approved successfully!");
//       }
//     } catch (error) {
//       console.error("Error approving query:", error.message || error);
//       alert("Failed to approve query.");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (errorMessage) {
//     return <div className={styles.error}>{errorMessage}</div>;
//   }

//   return (
//     <div className={styles.adminPage}>
//       <h2>Bulk Order Queries</h2>
//       <table className={styles.queryTable}>
//         <thead>
//           <tr>
//           <th>User Name</th>
//           <th>Phone Number</th>
//             <th>Box Name</th>
//             <th>Box Size</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Address</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {queries.map((query) => (
//             <tr key={query._id}>
//               {editingQueryId === query._id ? (
//                 <>
//                   <td>
//                     <input
//                       type="text"
//                       name="boxName"
//                       value={editedData.boxName}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="boxSize"
//                       value={editedData.boxSize}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="productName"
//                       value={editedData.productName}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="productPrice"
//                       value={editedData.productPrice}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={editedData.quantity}
//                       onChange={handleInputChange}
//                     />
//                   </td>
//                   <td>{editedData.totalCost}</td>
//                   <td>{`${query.address.province}, ${query.address.city}`}</td>
//                   <td>{editedData.status}</td>
//                   <td>
//                     <button onClick={handleSave}>Save</button>
//                     <button onClick={() => setEditingQueryId(null)}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                 <td>{query.user ? query.user.name : "N/A"}</td>
//                 <td>{query.user ? query.user.number : "N/A"}</td>
//                   <td>{query.boxName}</td>
//                   <td>{query.boxSize}</td>
//                   <td>{query.productName}</td>
//                   <td>₹{query.productPrice}</td>
//                   <td>{query.quantity}</td>
//                   <td>₹{query.totalCost}</td>
//                   <td>{`${query.address.province}, ${query.address.city}`}</td>
//                   <td>{query.status}</td>
//                   <td>
//                     <button onClick={() => handleEdit(query)}>Edit</button>
//                     <button onClick={() => handleApprove(query._id)}>Approve</button>
//                     <button onClick={() => handleDelete(query._id)}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BulkOrderQuery;


import React, { useState, useEffect } from "react";
import styles from "./bulkOrderQuery.module.css";
import EditQueryModal from "./EditQueryModal/editQueryModal"; // Modal for editing

const BulkOrderQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null); // For editing
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error handling

  // Fetch all bulk order queries on mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");

        const response = await fetch("http://localhost:8080/api/bulkOrderQueries", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQueries(data);
        } else {
          setErrorMessage("Failed to fetch queries.");
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setErrorMessage("An error occurred while fetching queries.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Approve a query
  const handleApprove = async (queryId,orderStatus) => {

    
    if (orderStatus === "Approved") {
      alert("This order has already been Approved.");
      return;
    }

    if (orderStatus === "Canceled") {
      alert("This order has been canceled. Now you cant Approve it");
      return;
    }


    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${queryId}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Query approved successfully!");
        const updatedQueries = queries.map((query) =>
          query._id === queryId ? { ...query, status: "Approved" } : query
        );
        setQueries(updatedQueries);
      } else {
        alert("Failed to approve query.");
      }
    } catch (error) {
      console.error("Error approving query:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Delete a query
  const handleDelete = async (queryId) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${queryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Query deleted successfully!");
        setQueries(queries.filter((query) => query._id !== queryId));
      } else {
        alert("Failed to delete query.");
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Edit a query
  const handleEdit = (query) => {
    setSelectedQuery(query);
  };

  // Save the edited query
  const handleSaveEdit = async (updatedQuery) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/bulkOrderQueries/${updatedQuery._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedQuery),
      });

      if (response.ok) {
        alert("Query updated successfully!");
        const updatedQueries = queries.map((query) =>
          query._id === updatedQuery._id ? updatedQuery : query
        );
        setQueries(updatedQueries);
        setSelectedQuery(null);
      } else {
        alert("Failed to update query.");
      }
    } catch (error) {
      console.error("Error updating query:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

  return (
    <div className={styles.queryContainer}>
      <h2>Admin - Bulk Order Queries</h2>

      {selectedQuery ? (
        <EditQueryModal
          query={selectedQuery}
          onSave={handleSaveEdit}
          onCancel={() => setSelectedQuery(null)}
        />
      ) : (
        <table className={styles.queryTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Box Name</th>
              <th>Box Size</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query._id}>
                <td>{query.user?.name || "N/A"}</td>
                <td>{query.user ? query.user.number : "N/A"}</td>
                <td>{query.user ? query.user.email : "N/A"}</td>
                <td>{query.boxName || "N/A"}</td>
                <td>{query.boxSize || "N/A"}</td>
                <td>{query.productName || "N/A"}</td>
                <td>₹{query.productPrice || 0}</td>
                <td>{query.quantity || "N/A"}</td>
                <td>₹{query.totalCost || 0}</td>
                <td>
                  {query.address
                    ? `${query.address.province}, ${query.address.city},${query.address.area},${query.address.landmark}`
                    : "N/A"}
                </td>
                <td>{query.status || "Pending"}</td>
                <td>
                  <button className={styles.first} onClick={() => handleApprove(query._id,query.status)}>
                    Approve
                  </button>
                  <button className={styles.second} onClick={() => handleDelete(query._id)}>
                    Delete
                  </button>
                  <button className={styles.third} onClick={() => handleEdit(query)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkOrderQueryPage;