// const BulkOrderQuery = require("../../Models/Tasks/BulkOrderQuery");
// const User = require("../../../Models/Auth/Auth.model"); // Import User model (adjust path if needed)
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");

// const sendConfirmationEmail = async (userEmail, queryDetails) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Format address properly
//     const formattedAddress = queryDetails.address
//       ? `${queryDetails.address.province || "N/A"}, ${queryDetails.address.city || "N/A"}, 
//          ${queryDetails.address.area || "N/A"}, ${queryDetails.address.landmark || "N/A"}`
//       : "Address not provided";

//     // Format bulk orders
//     const orderDetails = queryDetails.orders
//       .map(
//         (order) =>
//           `Box Name: ${order.boxName}\nBox Size: ${order.boxSize}\nQuantity: ${order.quantity}\nTotal Cost: ₹${order.totalCost}\nSweets:\n${order.sweets
//             .map((sweet) => `  - ${sweet.productName} (₹${sweet.productPrice})`)
//             .join("\n")}`
//       )
//       .join("\n\n");

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: "Order Confirmation - Bulk Order Boxes",
//       text: `Dear ${queryDetails.userName},

// Thank you for your order! Here are your order details:

// ${orderDetails}

// Delivery Address:
// ${formattedAddress}

// We will notify you once your order is processed.

// Best regards,
// Gokuls`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Confirmation email sent!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
// const sendAdminNotificationEmail = async (adminEmail, subject, queryDetails) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Format address properly
//     const formattedAddress = queryDetails.address
//       ? `${queryDetails.address.province || "N/A"}, ${queryDetails.address.city || "N/A"}, 
//          ${queryDetails.address.area || "N/A"}, ${queryDetails.address.landmark || "N/A"}`
//       : "Address not provided";

//     // Format bulk orders
//     const orderDetails = queryDetails.orders
//       .map(
//         (order) =>
//           `Box Name: ${order.boxName}\nBox Size: ${order.boxSize}\nQuantity: ${order.quantity}\nTotal Cost: ₹${order.totalCost}\nSweets:\n${order.sweets
//             .map((sweet) => `  - ${sweet.productName} (₹${sweet.productPrice})`)
//             .join("\n")}`
//       )
//       .join("\n\n");

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: adminEmail,
//       subject: subject,
//       text: `Dear Admin,

// A new bulk order has been placed. Here are the order details:

// User Name: ${queryDetails.userName}
// User Number: ${queryDetails.userNumber}
// User Email: ${queryDetails.userEmail}

// ${orderDetails}

// Delivery Address:
// ${formattedAddress}

// To view the order, please log in to the admin panel.

// Best regards,
// Gokuls`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Admin notification email sent!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };




// // Create a new bulk order query
// exports.createQuery = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract the logged-in user ID from the request (assuming authentication middleware sets it)
//     const user = await User.findById(userId); // Fetch user details from the database

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Assemble query data including user reference
//     const queryData = {
//         ...req.body,
//        user: new mongoose.Types.ObjectId(userId), // Converts userId to ObjectId before saving
//              userName: user.name,
//         userNumber: user.number,
//         userEmail: user.email,
//       };
//       console.log("Final Query Data:", queryData); 

//     const newQuery = new BulkOrderQuery(queryData); // Create a new query
//     await newQuery.save();


//     res.status(201).json({
//       message: "Bulk order query created successfully",
//       query: newQuery,
//       user: { name: user.name, number: user.number , email: user.email}, // Include user details in response
//     });

//     await sendAdminNotificationEmail(
//       process.env.ADMIN_EMAIL, // Admin email from environment variables
     
//       "New Order Arrived - Bulk Order Boxes",
//         queryData,
     

      
//     );


//     await sendConfirmationEmail(user.email, queryData);


//     // res.status(201).json({
//     //   message: "Bulk order query created successfully",
//     //   query: newQuery,
//     //   user: { name: user.name, number: user.number , email: user.email}, // Include user details in response
//     // });
//   } catch (error) {
//     console.error("Error creating query:", error.message);
//     res.status(500).json({ error: "Failed to create bulk order query" });
//   }
// };


// exports.getUserBulkOrders = async (req, res) => {
//   try {
//     const userId = req.user?.id; // Ensure req.user exists

//     console.log("User ID received:", userId, "Type:", typeof userId);

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid User ID format" });
//     }

//     // Convert userId to ObjectId for consistency in querying
//     const objectUserId = new mongoose.Types.ObjectId(userId);

//     // Fetch bulk orders specific to the logged-in user
//     const orders = await BulkOrderQuery.find({ user: objectUserId });

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching bulk orders:", error.message);
//     res.status(500).json({ error: "Failed to fetch bulk orders" });
//   }
// };


// // Get all bulk order queries
// exports.getAllQueries = async (req, res) => {
//   try {
//     // Fetch all queries and populate user details (name and number)
//     const queries = await BulkOrderQuery.find().populate({
//       path: "user",
//       model: "users",
//       select: "name number email",
//     });

//     res.status(200).json(queries);
//   } catch (error) {
//     console.error("Error fetching queries:", error.message);
//     res.status(500).json({ error: "Failed to fetch bulk order queries" });
//   }
// };

// // Get a specific bulk order query by ID
// exports.getBulkQueryById = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const query = await BulkOrderQuery.findById(queryId).populate("user", "name number");

//     if (!query) {
//       return res.status(404).json({ error: "Bulk order query not found" });
//     }

//     res.status(200).json(query);
//   } catch (error) {
//     console.error("Error fetching query:", error.message);
//     res.status(500).json({ error: "Failed to fetch bulk order query" });
//   }
// };

// // Update a bulk order query by ID
// exports.updateQuery = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const updatedData = req.body;

//     const query = await BulkOrderQuery.findByIdAndUpdate(queryId, updatedData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!query) {
//       return res.status(404).json({ error: "Bulk order query not found" });
//     }

//     res.status(200).json({ message: "Bulk order query updated successfully", query });
//   } catch (error) {
//     console.error("Error updating query:", error.message);
//     res.status(500).json({ error: "Failed to update bulk order query" });
//   }
// };

// // Delete a bulk order query by ID
// exports.deleteQuery = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const query = await BulkOrderQuery.findByIdAndDelete(queryId);

//     if (!query) {
//       return res.status(404).json({ error: "Bulk order query not found" });
//     }

//     res.status(200).json({ message: "Bulk order query deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting query:", error.message);
//     res.status(500).json({ error: "Failed to delete bulk order query" });
//   }
// };

// const sendApprovalEmail = async (userEmail, subject, queryDetails) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Format bulk orders
//     const orderDetails = queryDetails.orders
//       .map(
//         (order) =>
//           `Box Name: ${order.boxName}\nBox Size: ${order.boxSize}\nQuantity: ${order.quantity}\nTotal Cost: ₹${order.totalCost}\nSweets:\n${order.sweets
//             .map((sweet) => `  - ${sweet.productName} (₹${sweet.productPrice})`)
//             .join("\n")}`
//       )
//       .join("\n\n");

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: subject,
//       text: `Dear ${queryDetails.userName},

// Your bulk order has been approved! Here are your order details:

// ${orderDetails}

// Thank you for your purchase.

// Best regards,
// Gokuls`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Approval email sent!");
//   } catch (error) {
//     console.error("Error sending approval email:", error);
//   }
// };



// exports.approveQuery = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const query = await BulkOrderQuery.findById(queryId).populate({
//       path: "user",
//       model: "users",
//       select: "email",
//     });

//     if (!query) {
//       return res.status(404).json({ error: "Query not found" });
//     }

//     query.status = "Approved";
//     await query.save();

//     // Send approval email
//     try {
//       const userEmail = query.user?.email;
//       if (userEmail) {
//         await sendApprovalEmail(userEmail,"Order Approved - Bulk Order Boxes",query);
//       }
//     } catch (emailError) {
//       console.error("Error sending approval email:", emailError.message);
//     }

//     res.status(200).json({ message: "Query approved successfully", query });
//   } catch (error) {
//     console.error("Error approving query:", error.message);
//     res.status(500).json({ error: "Failed to approve query" });
//   }
// };



// exports.cancelUserOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id; // Extract order ID
//     console.log("Canceling Order ID:", orderId);

//     // Find the order and update its status to "Canceled"
//     const order = await BulkOrderQuery.findByIdAndUpdate(
//       orderId,
//       { status: "Canceled" },
//       { new: true }
//     ).populate({
//       path: "user",
//       model: "users",
//       select: "name number email",
//     });

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     console.log("Order after cancellation:", order);

//     // Check if user exists before sending emails
//     if (!order.user || !order.user.email) {
//       console.error("Error: User data is missing in order.");
//       return res.status(500).json({ error: "User information unavailable." });
//     }

//     res.status(200).json({ message: "Order canceled successfully", order });

//     // Format bulk orders properly for the email
//     const orderDetails = order.orders
//       .map(
//         (box) =>
//           `Box Name: ${box.boxName}\nBox Size: ${box.boxSize}\nQuantity: ${box.quantity}\nTotal Cost: ₹${box.totalCost}\nSweets:\n${box.sweets
//             .map((sweet) => `  - ${sweet.productName} (₹${sweet.productPrice})`)
//             .join("\n")}`
//       )
//       .join("\n\n");

//     const formattedAddress = order.address
//       ? `${order.address.province || "N/A"}, ${order.address.city || "N/A"}, 
//          ${order.address.area || "N/A"}, ${order.address.landmark || "N/A"}`
//       : "Address not provided";

//     // Send cancellation confirmation to user
//     await sendApprovalEmail(order.user.email, "Order Canceled - Bulk Order Boxes", {
//       userName: order.user.name,
//       orderDetails,
//       formattedAddress,
//       status: "Canceled",
//     });

//     // Notify admin about user cancellation
//     await sendAdminNotificationEmail(process.env.ADMIN_EMAIL, "User Cancelled Order - Bulk Order Boxes", {
//       userName: order.user.name,
//       userNumber: order.user.number,
//       userEmail: order.user.email,
//       orderDetails,
//       formattedAddress,
//       status: "Canceled",
//     });

//   } catch (error) {
//     console.error("Error canceling order:", error.message);
//     res.status(500).json({ error: "Failed to cancel order" });
//   }
// };

const BulkOrderQuery = require("../../../Models/Tasks/BulkOrder/BulkOrderQuery");
const User = require("../../../Models/Auth/Auth.model");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");



const sendConfirmationEmail = async (userEmail, queryDetails) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // ✅ Format Address
      const formattedAddress =
        queryDetails.address && Object.values(queryDetails.address).some((value) => value)
          ? `${queryDetails.address.province || "N/A"}, ${queryDetails.address.city || "N/A"}, 
             ${queryDetails.address.area || "N/A"}, ${queryDetails.address.landmark || "N/A"}`
          : "**Delivery address not provided**";
  
      // ✅ Format Selected Regular Boxes
      const regularBoxDetails =
        queryDetails.selectedRegularBoxes.length > 0
          ? queryDetails.selectedRegularBoxes
              .map((box) => `- ${box.label}: Quantity ${box.quantity}`)
              .join("\n")
          : "**No regular boxes selected**";
  
      // ✅ Format Bulk Order Details
      const giftBoxesDetails =
        queryDetails.giftBoxes.length > 0
          ? queryDetails.giftBoxes.map(
              (box) =>
                `- ${box.name} (${box.quantity} units) ₹${box.price * box.quantity}${
                  box.matchingHandbags?.length
                    ? `\n  Matching Handbags:\n${box.matchingHandbags
                        .map((handbag) => `    - ${handbag.name} (${handbag.quantity}) ₹${handbag.price * handbag.quantity}`)
                        .join("\n")}`
                    : ""
                }`
            ).join("\n")
          : "**No gift boxes selected**";
  
      const generalHandbagsDetails =
        queryDetails.generalHandbags.length > 0
          ? queryDetails.generalHandbags
              .map((handbag) => `- ${handbag.name} (${handbag.quantity} units) ₹${handbag.price * handbag.quantity}`)
              .join("\n")
          : "**No general handbags selected**";
  
      const selectedItemsDetails =
        Object.keys(queryDetails.selectedItems).length > 0
          ? Object.entries(queryDetails.selectedItems)
              .map(([item, qty]) => `- ${item}: ${qty} kg`)
              .join("\n")
          : "**No items selected**";
  
      const totalCost =
        queryDetails.totalCost > 0 ? `₹${queryDetails.totalCost}` : "**Total cost calculation error**";
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Order Confirmation - Bulk Order Boxes",
        text: `Dear ${queryDetails.userName},
  
  Thank you for your order! Here are your order details:
  
  Gift Boxes:
  ${giftBoxesDetails}
  
  General Handbags:
  ${generalHandbagsDetails}
  
  Regular Boxes:
  ${regularBoxDetails}
  
  Selected Items:
  ${selectedItemsDetails}
  
  Total Cost: ${totalCost}
  
  Delivery Address:
  ${formattedAddress}
  
  We will notify you once your order is processed.
  
  Best regards,
  Gokuls`,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("✅ Confirmation email sent!");
    } catch (error) {
      console.error("❌ Error sending confirmation email:", error.message);
    }
  };
// ✅ Function to send admin notification email
const sendAdminNotificationEmail = async (adminEmail, queryDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedAddress = queryDetails.address
      ? `${queryDetails.address.province || "N/A"}, ${queryDetails.address.city || "N/A"}, ${queryDetails.address.area || "N/A"}, ${queryDetails.address.landmark || "N/A"}`
      : "Address not provided";

    const orderDetails =
      queryDetails.giftBoxes.length > 0 || queryDetails.generalHandbags.length > 0 || Object.keys(queryDetails.selectedItems).length > 0
        ? `
Gift Boxes:
${queryDetails.giftBoxes.map((box) =>
          `- ${box.name} (${box.quantity} units) ₹${box.price * box.quantity}`
        ).join("\n")}

General Handbags:
${queryDetails.generalHandbags.map((handbag) =>
          `- ${handbag.name} (${handbag.quantity} units) ₹${handbag.price * handbag.quantity}`
        ).join("\n")}

Selected Items:
${Object.entries(queryDetails.selectedItems).map(([item, qty]) =>
          `- ${item}: ${qty} kg`
        ).join("\n")}

Total Cost: ₹${queryDetails.totalCost}
`
        : "No order details available.";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "New Bulk Order Received",
      text: `Dear Admin,

A new bulk order has been placed. Here are the order details:

User Name: ${queryDetails.userName}
User Number: ${queryDetails.userNumber}
User Email: ${queryDetails.userEmail}

${orderDetails}

Delivery Address:
${formattedAddress}

Best regards,
Gokuls`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Admin notification email sent!");
  } catch (error) {
    console.error("❌ Error sending admin notification email:", error.message);
  }
};
// ✅ Create a new bulk order query with total cost from frontend
exports.createQuery = async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User authentication required" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // ✅ Ensure totalCost is passed from the frontend
      if (!req.body.totalCost || req.body.totalCost <= 0) {
        return res.status(400).json({ error: "Invalid total cost. Must be provided from frontend." });
      }
  
      const queryData = {
        ...req.body,
        user: new mongoose.Types.ObjectId(userId),
        userName: user.name,
        userNumber: user.number,
        userEmail: user.email,
        totalCost: req.body.totalCost, // ✅ Fetch total cost from frontend
      };
  
      console.log("📦 Final Query Data:", queryData);
  
      const newQuery = new BulkOrderQuery(queryData);
      await newQuery.save();
  
      res.status(201).json({
        message: "Bulk order query created successfully",
        query: newQuery,
        user: { name: user.name, number: user.number, email: user.email },
      });
  
      await sendAdminNotificationEmail(process.env.ADMIN_EMAIL, queryData);
      await sendConfirmationEmail(user.email, queryData);
    } catch (error) {
      console.error("❌ Error creating bulk order query:", error.message);
      res.status(500).json({ error: "Failed to create bulk order query" });
    }
  };

// ✅ Get all bulk order queries (Admin)
exports.getAllQueries = async (req, res) => {
  try {
    const orders = await BulkOrderQuery.find().populate("user", "name email number");
    console.log("Orders from DB:", orders); // ✅ Debugging output
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching bulk orders:", error.message);
    res.status(500).json({ success: false, message: "Error fetching bulk orders" });
  }
};

// ✅ Get a specific bulk order query by ID
exports.getBulkQueryById = async (req, res) => {
  try {
    const query = await BulkOrderQuery.findById(req.params.id).populate("user", "name number email");
    if (!query) return res.status(404).json({ error: "Bulk order query not found" });
    res.status(200).json(query);
  } catch (error) {
    console.error("❌ Error fetching query:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk order query" });
  }
};

// ✅ Delete a bulk order query (Admin)
exports.deleteQuery = async (req, res) => {
  try {
    const query = await BulkOrderQuery.findByIdAndDelete(req.params.id);
    if (!query) return res.status(404).json({ error: "Bulk order query not found" });
    res.status(200).json({ message: "Bulk order query deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting query:", error.message);
    res.status(500).json({ error: "Failed to delete bulk order query" });
  }
};



// ✅ Get bulk orders for the logged-in user
exports.getUserBulkOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const orders = await BulkOrderQuery.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching user bulk orders:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk orders" });
  }
};

// ✅ Update a bulk order query (Admin)
exports.updateQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedData = req.body;

    const query = await BulkOrderQuery.findByIdAndUpdate(queryId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!query) return res.status(404).json({ error: "Bulk order query not found" });

    res.status(200).json({ message: "Bulk order query updated successfully", query });
  } catch (error) {
    console.error("❌ Error updating query:", error.message);
    res.status(500).json({ error: "Failed to update bulk order query" });
  }
};

// ✅ Function to send approval email
const sendApprovalEmail = async (userEmail, queryDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const orderDetails =
      queryDetails.giftBoxes.length > 0 || queryDetails.generalHandbags.length > 0 || Object.keys(queryDetails.selectedItems).length > 0
        ? `
Gift Boxes:
${queryDetails.giftBoxes.map((box) =>
          `- ${box.name} (${box.quantity} units) ₹${box.price * box.quantity}`
        ).join("\n")}

General Handbags:
${queryDetails.generalHandbags.map((handbag) =>
          `- ${handbag.name} (${handbag.quantity} units) ₹${handbag.price * handbag.quantity}`
        ).join("\n")}

Selected Items:
${Object.entries(queryDetails.selectedItems).map(([item, qty]) =>
          `- ${item}: ${qty} kg`
        ).join("\n")}

Total Cost: ₹${queryDetails.totalCost}
`
        : "No order details available.";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Order Approved - Bulk Order Boxes",
      text: `Dear ${queryDetails.userName},

Your bulk order has been approved! Here are your order details:

${orderDetails}

Thank you for your purchase.

Best regards,
Gokuls`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Approval email sent!");
  } catch (error) {
    console.error("❌ Error sending approval email:", error.message);
  }
};

// ✅ Approve a bulk order query (Admin)
exports.approveQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findById(queryId).populate("user", "email");

    if (!query) return res.status(404).json({ error: "Bulk order query not found" });

    query.status = "Approved";
    await query.save();

    // ✅ Send approval email
    if (query.user?.email) {
      await sendApprovalEmail(query.user.email, query);
    }

    res.status(200).json({ message: "Bulk order query approved successfully", query });
  } catch (error) {
    console.error("❌ Error approving query:", error.message);
    res.status(500).json({ error: "Failed to approve bulk order query" });
  }
};


// Cancel Bulk Order Query (User)
exports.cancelQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findById(queryId).populate("user", "email name");

    if (!query) return res.status(404).json({ error: "Bulk order query not found" });

    // Prevent canceling approved or completed orders.
    if (query.status === "Approved" || query.status === "Completed") {
      return res.status(400).json({ error: "Cannot cancel an approved or completed order" });
    }

    query.status = "Canceled";
    await query.save();

    // Send cancellation email to user.
    if (query.user?.email) {
      await sendAdminNotificationEmail(process.env.ADMIN_EMAIL, queryData);
      await sendConfirmationEmail(query.user.email, "Bulk Order Canceled", `Dear ${query.user.name},\n\nYour bulk order has been canceled.\n\nBest regards,\nGokuls`);
    }

    res.status(200).json({ message: "Bulk order query canceled successfully", query });
  } catch (error) {
    console.error("❌ Error canceling query:", error.message);
    res.status(500).json({ error: "Failed to cancel bulk order query" });
  }
};

// Reject Bulk Order Query (Admin)
exports.rejectQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await BulkOrderQuery.findById(queryId).populate("user", "email name");

    if (!query) return res.status(404).json({ error: "Bulk order query not found" });

    query.status = "Rejected";
    await query.save();

    // Send rejection email to user.
    if (query.user?.email) {
      await sendEmail(query.user.email, "Bulk Order Rejected", `Dear ${query.user.name},\n\nYour bulk order has been rejected.\n\nBest regards,\nGokuls`);
    }

    res.status(200).json({ message: "Bulk order query rejected successfully", query });
  } catch (error) {
    console.error("❌ Error rejecting query:", error.message);
    res.status(500).json({ error: "Failed to reject bulk order query" });
  }
};
