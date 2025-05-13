

import React, { useState, useEffect, useCallback } from "react";
import EditOrderModal from "./EditQueryModal/editQueryModal"; // Modal for editing bulk orders
import styles from "./bulkOrderQuery.module.css"; // Admin Panel Styles
import { BASE_URL } from "../../../Const/Const";
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