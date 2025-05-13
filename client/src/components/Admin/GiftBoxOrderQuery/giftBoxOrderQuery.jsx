
import React, { useState, useEffect } from "react";
import EditOrderModal from "./EditQueryModal/editQueryModal"; // Modal for editing orders
import styles from "./giftBoxOrderQuery.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
const GiftBoxOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${BASE_URL}/api/giftBoxOrderQueries/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging output

        if (!response.ok || !data.orders) throw new Error("Failed to fetch orders");

        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (error) {
        setErrorMessage(error.message || "Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, currentStatus, newStatus) => {
    if (currentStatus === "Cancelled") {
      alert("This order has been canceled and cannot be updated.");
      return; // ✅ Stops execution before making API request
    }
  
    if (!window.confirm(`Mark this order as ${newStatus}?`)) return;
  
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BASE_URL}/api/giftBoxOrderQueries/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
  
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to update status");
  
      alert(`Order marked as ${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      alert(`Error updating status: ${error.message}`);
    }
  };


  // Open Edit Modal
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
  };

  // Save Edited Order
  const handleSaveEdit = async (updatedOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${BASE_URL}/api/giftBoxOrderQueries/${updatedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) throw new Error("Failed to update order");

      alert("Order updated successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
      );
      setSelectedOrder(null);
    } catch (error) {
      alert(`Error updating order: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p className={styles.error}>{errorMessage}</p>;

  return (
    <div className={styles.orderAdminContainer}>
      <h2>Gift Box Orders - Admin Panel</h2>

      {selectedOrder ? (
        <EditOrderModal order={selectedOrder} onSave={handleSaveEdit} onCancel={() => setSelectedOrder(null)} />
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Items</th>
              <th>Matching Handbags</th>
              <th>Address</th>
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
                  <td>{order.userMobile}</td>
                  <td>
                    {order.cartItems.map((item, idx) => (
                      <div key={idx}>
                        {item.details.name} - ₹{item.details.price} x {item.details.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.cartItems.map((item) =>
                      item.matchingHandbags && item.matchingHandbags.length > 0 ? (
                        item.matchingHandbags.map((handbag, hIdx) => (
                          <div key={hIdx}>
                            {handbag.name} - ₹{handbag.price} x {handbag.quantity}
                          </div>
                        ))
                      ) : (
                        <div>No matching handbags</div>
                      )
                    )}
                  </td>
                  <td>
                    {order.address.province}, {order.address.city}, {order.address.area}, {order.address.landmark}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                  <button
  className={styles.approveBtn}
  onClick={() => handleStatusUpdate(order._id, order.status, "Approved")}
 // ✅ Prevents action if canceled
>
  Approve
</button>
<button
  className={styles.rejectBtn}
  onClick={() => handleStatusUpdate(order._id, order.status, "Rejected")}
  // ✅ Prevents action if canceled
>
  Reject
</button>
<button
  className={styles.completeBtn}
  onClick={() => handleStatusUpdate(order._id, order.status, "Completed")}
 // ✅ Prevents action if canceled
>
  Complete
</button>
                    <button className={styles.editBtn} onClick={() => handleEditOrder(order)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GiftBoxOrderAdmin;