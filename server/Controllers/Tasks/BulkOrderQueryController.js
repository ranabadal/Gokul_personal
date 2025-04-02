const BulkOrderQuery = require("../../Models/Tasks/BulkOrderQuery");
const User = require("../../Models/Auth/Auth.model"); // Import User model (adjust path if needed)
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");


const sendConfirmationEmail = async (userEmail, queryDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use Gmail (or other SMTP provider)
      auth: {
        user: process.env.EMAIL_USER, // Email credentials from environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: userEmail, // Recipient email
      subject: "Order Confirmation - Bulk Order Boxes",
         text: `Dear ${queryDetails.userName},

      Thank you for your order! Here are your order details:
      Box Name: ${queryDetails.boxName}
      Box Size: ${queryDetails.boxSize}
      Sweet Selected:  ${queryDetails.productName}
      Quantity Selected: ${queryDetails.quantity}
      Address Selected: ${queryDetails.address}
      Total Cost: ₹${queryDetails.totalCost}

      We will notify you once your order is processed.

      Best regards,
      Gokuls`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
// Create a new bulk order query
exports.createQuery = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the logged-in user ID from the request (assuming authentication middleware sets it)
    const user = await User.findById(userId); // Fetch user details from the database

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assemble query data including user reference
    const queryData = {
      ...req.body,
      user: userId, // Store user reference
    };

    const newQuery = new BulkOrderQuery(queryData); // Create a new query
    await newQuery.save();


    await sendConfirmationEmail(user.email, "Banquet Query Submitted", queryData);


    res.status(201).json({
      message: "Bulk order query created successfully",
      query: newQuery,
      user: { name: user.name, number: user.number , email: user.email}, // Include user details in response
    });
  } catch (error) {
    console.error("Error creating query:", error.message);
    res.status(500).json({ error: "Failed to create bulk order query" });
  }
};


exports.getUserBulkOrders = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure req.user exists

    console.log("User ID received:", userId, "Type:", typeof userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    // Convert userId to ObjectId for consistency in querying
    const objectUserId = new mongoose.Types.ObjectId(userId);

    // Fetch bulk orders specific to the logged-in user
    const orders = await BulkOrderQuery.find({ user: objectUserId });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching bulk orders:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk orders" });
  }
};


// Get all bulk order queries
exports.getAllQueries = async (req, res) => {
  try {
    // Fetch all queries and populate user details (name and number)
    const queries = await BulkOrderQuery.find().populate({
      path: "user",
      model: "users",
      select: "name number email",
    });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk order queries" });
  }
};

// Get a specific bulk order query by ID
exports.getBulkQueryById = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findById(queryId).populate("user", "name number");

    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.error("Error fetching query:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk order query" });
  }
};

// Update a bulk order query by ID
exports.updateQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedData = req.body;

    const query = await BulkOrderQuery.findByIdAndUpdate(queryId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    res.status(200).json({ message: "Bulk order query updated successfully", query });
  } catch (error) {
    console.error("Error updating query:", error.message);
    res.status(500).json({ error: "Failed to update bulk order query" });
  }
};

// Delete a bulk order query by ID
exports.deleteQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findByIdAndDelete(queryId);

    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    res.status(200).json({ message: "Bulk order query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error.message);
    res.status(500).json({ error: "Failed to delete bulk order query" });
  }
};


const sendApprovalEmail = async (userEmail, queryDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for email credentials
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: userEmail, // Recipient email
      subject: "Order Approved - Bulk Order Boxes",
        text: `Dear ${queryDetails.userName},

      Your order has been approved! Here are your order details:
      Box Name: ${queryDetails.boxName}
      Box Size: ${queryDetails.boxSize}
      Sweet Selected:  ${queryDetails.productName}
      Quantity Selected: ${queryDetails.quantity}
      Address Selected: ${queryDetails.address}
      Total Cost: ₹${queryDetails.totalCost}

      Thank you for choosing us for your gift box needs.

      Best regards,
      Gokuls`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Approval email sent!");
  } catch (error) {
    console.error("Error sending approval email:", error);
  }
};

exports.approveQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findById(queryId).populate({
      path: "user",
      model: "users",
      select: "email",
    });

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    query.status = "Approved";
    await query.save();

    // Send approval email
    try {
      const userEmail = query.user?.email;
      if (userEmail) {
        await sendApprovalEmail(userEmail,query);
      }
    } catch (emailError) {
      console.error("Error sending approval email:", emailError.message);
    }

    res.status(200).json({ message: "Query approved successfully", query });
  } catch (error) {
    console.error("Error approving query:", error.message);
    res.status(500).json({ error: "Failed to approve query" });
  }
};