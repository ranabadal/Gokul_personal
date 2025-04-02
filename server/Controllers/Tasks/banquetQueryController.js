// const BanquetQuery = require("../../Models/Tasks/BanquetQuery");
// const User = require("../../Models/Auth/Auth.model"); // Import User model

// // Create a new banquet query
// createQuery = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract logged-in user ID from request
//     const user = await User.findById(userId); // Fetch user details from the database

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Assemble query data including the user reference
//     const queryData = {
//       ...req.body,
//       user: userId, // Store user reference
//     };

//     const newQuery = new BanquetQuery(queryData); // Create a new query
//     await newQuery.save();

//     res.status(201).json({
//       message: "Query created successfully",
//       query: newQuery,
//       user: { name: user.name, number: user.number }, // Include user details in the response
//     });
//   } catch (error) {
//     console.error("Error creating query:", error);
//     res.status(500).json({ error: "Failed to create query" });
//   }
// };

// // // Correct export
// // createQuery = async (req, res) => {
// //     try {
// //       const userId = req.user._id;
// //       const queryData = { ...req.body, user: userId };
// //       const newQuery = new BanquetQuery(queryData);
// //       await newQuery.save();
// //       res.status(201).json({ message: "Query created successfully", query: newQuery });
// //     } catch (error) {
// //       console.error("Error creating query:", error);
// //       res.status(500).json({ error: "Failed to create query" });
// //     }
// //   };


// // Get all banquet queries
// getAllQueries = async (req, res) => {
//     try {
     
//     //   const queries = await BanquetQuery.find().populate("users", "name number");
//     const queries = await BanquetQuery.find().populate({ path: 'user', model: 'users', select: 'name number' });

//       res.status(200).json(queries);
//     } catch (error) {
//       console.error("Error fetching queries:", error.message || error);
//       res.status(500).json({ error: "Failed to fetch queries" });
//     }
//   };

// // getAllQueries = async (req, res) => {
// //     try {
// //       const queries = await BanquetQuery.find(); // Skip populate for debugging
// //       res.status(200).json(queries);
// //     } catch (error) {
// //       console.error("Error fetching queries:", error.message || error);
// //       res.status(500).json({ error: "Failed to fetch queries" });
// //     }
// //   };

// // Get a specific query by ID
// getQueryById = async (req, res) => {
//     try {
//       const queryId = req.params.id;
//       const query = await BanquetQuery.findById(queryId).populate("user", "name number");
  
//       if (!query) {
//         return res.status(404).json({ error: "Query not found" });
//       }
  
//       res.status(200).json(query);
//     } catch (error) {
//       console.error("Error fetching query:", error);
//       res.status(500).json({ error: "Failed to fetch query" });
//     }
//   };
// // Update a banquet query by ID
// updateQuery = async (req, res) => {
//     try {
//       const queryId = req.params.id;
//       const updatedData = req.body;
  
//       const query = await BanquetQuery.findByIdAndUpdate(queryId, updatedData, {
//         new: true,
//         runValidators: true,
//       });
  
//       if (!query) {
//         return res.status(404).json({ error: "Query not found" });
//       }
  
//       res.status(200).json({ message: "Query updated successfully", query });
//     } catch (error) {
//       console.error("Error updating query:", error);
//       res.status(500).json({ error: "Failed to update query" });
//     }
//   };
// // Delete a banquet query by ID
// deleteQuery = async (req, res) => {
//     try {
//       const queryId = req.params.id;
//       const query = await BanquetQuery.findByIdAndDelete(queryId);
  
//       if (!query) {
//         return res.status(404).json({ error: "Query not found" });
//       }
  
//       res.status(200).json({ message: "Query deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting query:", error);
//       res.status(500).json({ error: "Failed to delete query" });
//     }
//   };

// module.exports = {
//     createQuery,
//     getAllQueries,
//     getQueryById,
//     updateQuery,
//     deleteQuery

// };



const BanquetQuery = require("../../Models/Tasks/BanquetQuery");
const User = require("../../Models/Auth/Auth.model"); // Import User model
const nodemailer = require("nodemailer"); // For email notifications
const mongoose = require("mongoose");
// Function to send notification emails
const sendNotificationEmail = async (userEmail, subject, queryDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Email credentials
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format data for email
    const formattedSelectedDates = queryDetails.selectedDates?.length > 0
      ? queryDetails.selectedDates.map((date) => new Date(date).toDateString()).join(", ")
      : "No Dates Selected";

    const formattedPreferredTimings = queryDetails.preferredTimings?.length > 0
      ? queryDetails.preferredTimings.join(", ")
      : "Not Specified";

    const formattedMenuPreferences = queryDetails.menuPreferences
      ? Object.entries(queryDetails.menuPreferences)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
          .join("\n")
      : "No Preferences Provided";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      text: `Dear ${queryDetails.userName},

Thank you for your banquet query. Here are the full details:

Hall Name: ${queryDetails.hallTitle}
Occasion: ${queryDetails.occasion}
Number of Guests: ${queryDetails.guestCount}
Selected Cart: ${queryDetails.selectedCart}
Selected Dates: ${formattedSelectedDates}
Preferred Timings: ${formattedPreferredTimings}
Additional Comments: ${queryDetails.comments || "None"}
Menu Preferences:
${formattedMenuPreferences}
Total Cost: ₹${queryDetails.totalCost}

We will review your query and notify you shortly.

Best regards,
Gokuls`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Create a new banquet query
const createQuery = async (req, res) => {
  try {
    const userId = req.user.id; // Extract logged-in user ID
    const user = await User.findById(userId); // Fetch user details

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const queryData = {
    //   ...req.body,
    //   user: userId,
    //   userName: user.name, // Include user name for email personalization
    // };
    const queryData = {
      ...req.body,
      user: new mongoose.Types.ObjectId(userId), // Converts userId to ObjectId before saving
      userName: user.name, // Keeps existing logic unchanged
    };

    const newQuery = new BanquetQuery(queryData); // Create a new query
    await newQuery.save();

    // Send confirmation email
    await sendNotificationEmail(user.email, "Banquet Query Submitted", queryData);

    res.status(201).json({
      message: "Query created successfully",
      query: newQuery,
      user: { name: user.name, number: user.number , email: user.email},
    });
  } catch (error) {
    console.error("Error creating query:", error.message);
    res.status(500).json({ error: "Failed to create query" });
  }
};

// Get all banquet queries
const getAllQueries = async (req, res) => {
  try {
    const queries = await BanquetQuery.find().populate({
      path: "user",
      model: "users",
      select: "name number email",
    });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error.message);
    res.status(500).json({ error: "Failed to fetch queries" });
  }
};

const getUserQueries = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure req.user is defined

    console.log("User ID received:", userId, "Type:", typeof userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);

    const queries = await BanquetQuery.find({ user: objectUserId });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching user queries:", error.message);
    res.status(500).json({ error: "Failed to fetch user queries" });
  }
};



// Get a specific query by ID
const getQueryById = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BanquetQuery.findById(queryId).populate(
      "user",
      "name number email"
    );

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.error("Error fetching Id:", error.message);
    res.status(500).json({ error: "Failed to fetch query" });
  }
};

// Update a banquet query by ID
const updateQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedData = req.body;

    const query = await BanquetQuery.findByIdAndUpdate(queryId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json({ message: "Query updated successfully", query });
  } catch (error) {
    console.error("Error updating query:", error.message);
    res.status(500).json({ error: "Failed to update query" });
  }
};

// Approve a banquet query by ID and notify user via email
const approveQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BanquetQuery.findById(queryId).populate({
      path: "user",
      model: "users",
      select: "email",
    });

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    query.status = "Approved";
    await query.save();

    // Send approval notification email
    await sendNotificationEmail(query.user.email, "Banquet Query Approved", {
      hallTitle: query.hallTitle,
      occasion: query.occasion,
      guestCount: query.guestCount,
      selectedCart: query.selectedCart,
      selectedDates: query.selectedDates,
      preferredTimings: query.preferredTimings,
      comments: query.comments,
      menuPreferences: query.menuPreferences,
      totalCost: query.totalCost,
      userName: query.user.name,
    });

    res.status(200).json({ message: "Query approved successfully", query });
  } catch (error) {
    console.error("Error approving query:", error.message);
    res.status(500).json({ error: "Failed to approve query" });
  }
};

// Delete a banquet query by ID
const deleteQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BanquetQuery.findByIdAndDelete(queryId);

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error.message);
    res.status(500).json({ error: "Failed to delete query" });
  }
};

// Exporting all methods
module.exports = {
  createQuery,
  getAllQueries,
  getQueryById,
  updateQuery,
  approveQuery,
  deleteQuery,
  getUserQueries,
};