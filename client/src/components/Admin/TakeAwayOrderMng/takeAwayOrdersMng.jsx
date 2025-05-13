
import React, { useState, useEffect } from "react";
import styles from "./takeawayOrdersMng.module.css";
import { BASE_URL } from "../../../Const/Const"; // Adjust the import path as necessary
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
        const response = await fetch(`${BASE_URL}/api/takeawayOrders/orders`, {
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
      const response = await fetch(`${BASE_URL}/api/takeawayOrders/orders/${orderId}/accept`, {
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
      const response = await fetch(`${BASE_URL}/api/takeawayOrders/orders/${orderId}/reject`, {
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