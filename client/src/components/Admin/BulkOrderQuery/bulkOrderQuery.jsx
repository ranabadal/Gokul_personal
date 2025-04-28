


import React, { useState, useEffect } from "react";
import styles from "./bulkOrderQuery.module.css";
import EditQueryModal from "./EditQueryModal/editQueryModal"; // Modal for editing

const BulkOrderQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
              <th>Products</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Address</th>
              <th>Custom Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) =>
              query.orders.map((order, index) => (
                <tr key={`${query._id}-${index}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={query.orders.length}>{query.user?.name || "N/A"}</td>
                      <td rowSpan={query.orders.length}>{query.user?.number || "N/A"}</td>
                      <td rowSpan={query.orders.length}>{query.user?.email || "N/A"}</td>
                    </>
                  )}
                  <td>{order.boxName || "N/A"}</td>
                  <td>{order.boxSize || "N/A"}</td>
                  <td>
                    {order.sweets.map((sweet) => (
                      <div key={sweet.productName}>
                        {sweet.productName} - ₹{sweet.productPrice}
                      </div>
                    ))}
                  </td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalCost}</td>
                  <td>
                    {order.address ? `${order.address.province}, ${order.address.city}, ${order.address.area}, ${order.address.landmark}` : "N/A"}
                  </td>
                  <td>{order.customMessage || "N/A"}</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={query.orders.length}>{query.status || "Pending"}</td>
                      <td rowSpan={query.orders.length}>
                        <button className={styles.first} onClick={() => handleApprove(query._id, query.status)}>Approve</button>
                        <button className={styles.second} onClick={() => handleDelete(query._id)}>Delete</button>
                        <button className={styles.third} onClick={() => handleEdit(query)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkOrderQueryPage;