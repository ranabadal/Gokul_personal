// import React, { useState, useEffect } from "react";
// import styles from "./banquetQueryMng.module.css";
// import EditQueryForm from './EditQueryForm/editQueryForm';

// const BanquetQueryPage = () => {
//   const [queries, setQueries] = useState([]);
//   const [selectedQuery, setSelectedQuery] = useState(null); // Track the query being edited
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   // Fetch all banquet queries
//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("jwtToken"); // Assuming admin authentication token
//         const response = await fetch("http://localhost:8080/api/queries/", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setQueries(data);
//           setLoading(false);
//         } else {
//           setErrorMessage("Failed to fetch queries.");
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching queries:", error);
//         setErrorMessage("An error occurred. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchQueries();
//   }, []);

//   // Handle approval
//   const handleApprove = async (queryId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/queries/${queryId}/approve`, {
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

//   // Handle deletion
//   const handleDelete = async (queryId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/queries/${queryId}`, {
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

//   // Handle editing a query
//   const handleEdit = (query) => {
//     setSelectedQuery(query); // Set the query to be edited
//   };

//   // Handle saving the edited query
//   const handleSaveEdit = async (updatedQuery) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`http://localhost:8080/api/queries/${updatedQuery._id}`, {
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
//         setSelectedQuery(null); // Close the edit form
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
//       <h2>Admin - Banquet Queries</h2>
//       {selectedQuery ? (
//         <EditQueryForm
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
//               <th>Occasion</th>
//               <th>Guests</th>
//               <th>Menu</th>
//               <th>Dates</th>
//               <th>Timings</th>
//               <th>Comments</th>
//               <th>Total Cost</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {queries.map((query) => (
//               <tr key={query._id}>
//                 <td>{query.users.name}</td>
//                 <td>{query.users.number}</td>
//                 <td>{query.occasion}</td>
//                 <td>{query.guestCount}</td>
//                 <td>{query.selectedCart}</td>
//                 <td>{query.selectedDates.join(", ")}</td>
//                 <td>{query.preferredTimings.join(", ")}</td>
//                 <td>{query.comments || "None"}</td>
//                 <td>₹{query.totalCost}</td>
//                 <td>{query.status || "Pending"}</td>
//                 <td>
//                   <button onClick={() => handleApprove(query._id)}>Approve</button>
//                   <button onClick={() => handleDelete(query._id)}>Delete</button>
//                   <button onClick={() => handleEdit(query)}>Edit</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BanquetQueryPage;


import React, { useState, useEffect } from "react";
import styles from "./banquetQueryMng.module.css";
import EditQueryForm from "./EditQueryForm/editQueryForm";

const BanquetQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null); // Track the query being edited
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch all banquet queries
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/api/queries/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched queries from backend:", data);  // Debug log
          setQueries(data);
          setLoading(false);
        } else {
          setErrorMessage("Failed to fetch queries.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setErrorMessage("An error occurred. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchQueries();
  }, []);

  // Handle approval
  const handleApprove = async (queryId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/queries/${queryId}/approve`, {
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

  // Handle deletion
  const handleDelete = async (queryId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/queries/${queryId}`, {
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

  // Handle editing a query
  const handleEdit = (query) => {
    setSelectedQuery(query); // Set the query to be edited
  };

  // Handle saving the edited query
  const handleSaveEdit = async (updatedQuery) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/queries/${updatedQuery._id}`, {
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
        setSelectedQuery(null); // Close the edit form
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
      <h2>Admin - Banquet Queries</h2>
      {selectedQuery ? (
        <EditQueryForm
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
              <th>Occasion</th>
              <th>Guests</th>
              <th>Menu</th>
              <th>Dates</th>
              <th>Timings</th>
              <th>Menu Preferences</th> 
              <th>Comments</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {queries.map((query) => (
    <tr key={query._id}>
      {/* Use safe chaining for user details */}
      <td>{query.user ? query.user.name : "N/A"}</td>
      <td>{query.user ? query.user.number : "N/A"}</td>
      <td>{query.user ? query.user.email : "N/A"}</td>
      <td>{query.occasion || "N/A"}</td>
      <td>{query.guestCount || "N/A"}</td>
      <td>{query.selectedCart || "N/A"}</td>
      <td>
        {Array.isArray(query.selectedDates)
          ? query.selectedDates
              .map((date) =>
                new Date(date).toLocaleDateString("en-GB")
              )
              .join(", ")
          : "N/A"}
      </td>
      <td>
        {Array.isArray(query.preferredTimings)
          ? query.preferredTimings.join(", ")
          : "N/A"}
      </td>
      <td>
        {query.menuPreferences && Object.keys(query.menuPreferences).length > 0 ? (
          <ul>
            {Object.entries(query.menuPreferences).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value || ""}
              </li>
            ))}
          </ul>
        ) : (
          "N/A"
        )}
      </td>
      <td>{query.comments || "None"}</td>
      <td>₹{query.totalCost || 0}</td>
      <td>{query.status || "Pending"}</td>
      <td>
        <button className={styles.first} onClick={() => handleApprove(query._id)}>
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

export default BanquetQueryPage;