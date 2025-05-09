

// const GiftBoxOrderQuery = require("../../../Models/Tasks/GiftBoxes/GiftBoxOrderQuery");
// const User = require("../../../Models/Auth/Auth.model"); // Import User model
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
//     try {
//       // Extract the logged-in user ID from the request (assuming authentication middleware sets it)
//       const userId = req.user.id;
//       const user = await User.findById(userId); // Fetch user details from the database
  
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
  

//       const queryData = {
//         ...req.body,
//        user: new mongoose.Types.ObjectId(userId), // Converts userId to ObjectId before saving
//              userName: user.name,
//         userNumber: user.number,
//         userEmail: user.email,
//       };
//       console.log("Final Query Data:", queryData); 
//       const newQuery = new GiftBoxOrderQuery(queryData); // Create a new query
//       await newQuery.save(); // Save the query to the database
  
//       // Send confirmation email
      
//         await sendConfirmationEmail(user.email, queryData);

//       await sendAdminNotificationEmail(process.env.ADMIN_EMAIL,"Order Confirmation - Gift Box Order", queryData);
//       // Respond with success message and details
//       res.status(201).json({
//         message: "Gift Box Order query created successfully",
//         query: newQuery,
//         user: { name: user.name, number: user.number, email: user.email }, // Include user details in response
//       });
//     } catch (error) {
//       // Log any unexpected error and send a generic error response
//       console.error("Error creating query:", error.message);
//       res.status(500).json({ error: "Failed to create bulk order query" });
//     }
//   };


//   exports.getUserOrders = async (req, res) => {
//     try {
//       const userId = req.user?.id; // Ensure req.user exists
  
//       console.log("User ID received:", userId, "Type:", typeof userId);
  
//       if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({ error: "Invalid User ID format" });
//       }
  
//       // Convert userId to ObjectId for consistency in querying
//       const objectUserId = new mongoose.Types.ObjectId(userId);
  
//       // Fetch bulk orders specific to the logged-in user
//       const orders = await GiftBoxOrderQuery.find({ user: objectUserId });
  
//       res.status(200).json(orders);
//     } catch (error) {
//       console.error("Error fetching gift box orders:", error.message);
//       res.status(500).json({ error: "Failed to gift box orders" });
//     }
//   };

// // Get all bulk order queries
// exports.getAllQueries = async (req, res) => {
//   try {
//     // Fetch all queries and populate user details (name, number, email)
//     const queries = await GiftBoxOrderQuery.find().populate({
//       path: "user",
//       model: "users",
//       select: "name number email", // Include email in populated data
//     });

//     res.status(200).json(queries);
//   } catch (error) {
//     console.error("Error fetching queries:", error.message);
//     res.status(500).json({ error: "Failed to fetch bulk order queries" });
//   }
// };

// // Get a specific bulk order query by ID
// exports.getQueryById = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const query = await GiftBoxOrderQuery.findById(queryId).populate(
//       "user",
//       "name number email" // Include email in populated data
//     );

//     if (!query) {
//       return res.status(404).json({ error: "Gift Box order query not found" });
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

//     const query = await GiftBoxOrderQuery.findByIdAndUpdate(queryId, updatedData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!query) {
//       return res.status(404).json({ error: "Bulk order query not found" });
//     }

//     res.status(200).json({
//       message: "Bulk order query updated successfully",
//       query,
//     });
//   } catch (error) {
//     console.error("Error updating query:", error.message);
//     res.status(500).json({ error: "Failed to update bulk order query" });
//   }
// };

// // Delete a bulk order query by ID
// exports.deleteQuery = async (req, res) => {
//   try {
//     const queryId = req.params.id;
//     const query = await GiftBoxOrderQuery.findByIdAndDelete(queryId);

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


//   exports.approveQuery = async (req, res) => {
//     try {
//       const queryId = req.params.id;
//       const query = await GiftBoxOrderQuery.findById(queryId).populate({
//         path: "user",
//         model: "users",
//         select: "email",
//       });
  
//       if (!query) {
//         return res.status(404).json({ error: "Query not found" });
//       }
  
//       query.status = "Approved";
//       await query.save();
  
//       // Send approval email
//       try {
//         const userEmail = query.user?.email;
//         if (userEmail) {
//           await sendApprovalEmail(userEmail,"Order Approved - Gift Box", {
//             boxName: query.boxName,
//             boxSize: query.boxSize,
//             totalCost: query.totalCost,
//           });
//         }
//       } catch (emailError) {
//         console.error("Error sending approval email:", emailError.message);
//       }
  
//       res.status(200).json({ message: "Query approved successfully", query });
//     } catch (error) {
//       console.error("Error approving query:", error.message);
//       res.status(500).json({ error: "Failed to approve query" });
//     }
//   };


//   exports.cancelUserOrder = async (req, res) => {
//     try {
//       const orderId = req.params.id; // Extract order ID
//       console.log("Canceling Order ID:", orderId);
  
//       // Find the order and update its status to "Canceled"
//       const order = await GiftBoxOrderQuery.findByIdAndUpdate(
//         orderId,
//         { status: "Canceled" },
//         { new: true }
//       ).populate({
//         path: "user",
//         model: "users",
//         select: "name number email",
//       });
  
//       if (!order) {
//         return res.status(404).json({ error: "Order not found" });
//       }
  
//       console.log("Order after cancellation:", order);
  
//       // Ensure user information exists before proceeding
//       if (!order.user || !order.user.email) {
//         console.error("Error: User data is missing in order.");
//         return res.status(500).json({ error: "User information unavailable." });
//       }
  
//       // ✅ Send response BEFORE executing email notifications
//       res.status(200).json({ message: "Order canceled successfully", order });
  
//       // ✅ Prepare order details for email notifications
//       const orderDetails = order.orders
//         .map(
//           (box) =>
//             `Box Name: ${box.boxName}\nBox Size: ${box.boxSize}\nQuantity: ${box.quantity}\nTotal Cost: ₹${box.totalCost}\nSweets:\n${box.sweets
//               .map((sweet) => `  - ${sweet.productName} (₹${sweet.productPrice})`)
//               .join("\n")}`
//         )
//         .join("\n\n");
  
//       const formattedAddress = order.address
//         ? `${order.address.province || "N/A"}, ${order.address.city || "N/A"}, ${order.address.area || "N/A"}, ${order.address.landmark || "N/A"}`
//         : "Address not provided";
  
//       // ✅ Wrap email notifications inside a try-catch block to avoid crashing the server
//       try {
//         await sendApprovalEmail(order.user.email, "Order Canceled - Bulk Order Boxes", {
//           userName: order.user.name,
//           orderDetails,
//           formattedAddress,
//           status: "Canceled",
//         });
  
//         await sendAdminNotificationEmail(process.env.ADMIN_EMAIL, "User Cancelled Order - Bulk Order Boxes", {
//           userName: order.user.name,
//           userNumber: order.user.number,
//           userEmail: order.user.email,
//           orderDetails,
//           formattedAddress,
//           status: "Canceled",
//         });
  
//       } catch (emailError) {
//         console.error("Error sending cancellation emails:", emailError);
//       }
      
//     } catch (error) {
//       console.error("Error canceling order:", error.message);
//       res.status(500).json({ error: "Failed to cancel order" });
//     }
//   };


// controllers/giftBoxOrderQueryController.js

const GiftBoxOrderQuery = require("../../../Models/Tasks/GiftBoxes/GiftBoxOrderQuery");
const User = require("../../../Models/Auth/Auth.model"); // Import User model
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// ----------------------------------------------------------------------------
// Helper: Create a nodemailer transporter instance
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------------------------------------------------------------------
// Helper: Send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// ----------------------------------------------------------------------------
// Helper: Format order details text (for email)
// This function formats the cart items and address into a string.
const formatOrderDetails = (query) => {
  let details = "";
  if (query.cartItems && query.cartItems.length > 0) {
    query.cartItems.forEach((item, idx) => {
      const itemTotal =
        Number(item.details.price) * Number(item.details.quantity);
      details += `Item ${idx + 1} (${item.type}):
  Name: ${item.details.name}
  Unit Price: ₹${item.details.price}
  Quantity: ${item.details.quantity}
  Item Total: ₹${itemTotal}\n`;
      if (item.matchingHandbags && item.matchingHandbags.length > 0) {
        details += "  Matching Handbags:\n";
        item.matchingHandbags.forEach((mh, i) => {
          const mhTotal = Number(mh.price) * Number(mh.quantity);
          details += `    ${i + 1}. ${mh.name} | Unit Price: ₹${mh.price} | Quantity: ${mh.quantity} | Total: ₹${mhTotal}\n`;
        });
      }
      details += "\n";
    });
  }
  details += `Delivery Address:
  Province: ${query.address.province}
  City: ${query.address.city}
  Area: ${query.address.area}
  Landmark: ${query.address.landmark}\n`;
  details += `Overall Total: ₹${query.totalPrice}\n`;
  return details;
};

// ----------------------------------------------------------------------------
// CREATE a new bulk order query
exports.createQuery = async (req, res) => {
  try {
    // Expect req.user to be set by the authentication middleware
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // We expect cartItems, address and totalPrice in the request body.
    const { cartItems, address, totalPrice } = req.body;

    // Compose the query data (also including user details)
    const queryData = {
      ...req.body,
      user: new mongoose.Types.ObjectId(userId),
      userName: user.name,
      userEmail: user.email,
      userMobile: user.number, // Assuming field is "mobile"
      cartItems,
      address,
      totalPrice,
      status: "Pending", // default status
    };

    console.log("Final Query Data:", queryData);

    const newQuery = new GiftBoxOrderQuery(queryData);
    await newQuery.save();

    // Format order details for email
    const orderText = formatOrderDetails(newQuery);

    // Send confirmation email to user
    await sendEmail(
      user.email,
      "Order Confirmation - Gift Box Order",
      `Dear ${user.name},

Thank you for your order! Here are your order details:

${orderText}

We will notify you once your order is processed.

Best regards,
Gokuls`
    );

    // Send notification email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Gift Box Order",
      `Dear Admin,

A new gift box order has been placed.

User Details:
  Name: ${user.name}
  Email: ${user.email}
  Mobile: ${user.number}

Order Details:
${orderText}

Please review the order in the admin panel.

Best regards,
Gokuls`
    );

    res.status(201).json({
      message: "Gift Box Order query created successfully",
      query: newQuery,
      user: { name: user.name, mobile: user.number, email: user.email },
    });
  } catch (error) {
    console.error("Error creating query:", error.message);
    res.status(500).json({ error: "Failed to create bulk order query" });
  }
};

// ----------------------------------------------------------------------------
// GET all queries (Admin protected route)
exports.getAllQueries = async (req, res) => {
  try {
    const orders = await GiftBoxOrderQuery.find().populate("user", "name email mobile");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching queries:", error.message);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ----------------------------------------------------------------------------
// GET queries for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }
    const orders = await GiftBoxOrderQuery.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching gift box orders:", error.message);
    res.status(500).json({ error: "Failed to fetch gift box orders" });
  }
};

// ----------------------------------------------------------------------------
// GET one query by ID
exports.getQueryById = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await GiftBoxOrderQuery.findById(queryId).populate("user", "name mobile email");
    if (!query) {
      return res.status(404).json({ error: "Gift Box order query not found" });
    }
    res.status(200).json(query);
  } catch (error) {
    console.error("Error fetching query:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk order query" });
  }
};

// ----------------------------------------------------------------------------
// UPDATE a query (general update, e.g. marking as Completed)
exports.updateQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedData = req.body;

    const query = await GiftBoxOrderQuery.findByIdAndUpdate(queryId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    // If the updatedData contains status and it is one of the monitored statuses,
    // send an email notification. (For example, Completed)
    if (updatedData.status) {
      const status = updatedData.status;
      let subject = "";
      let message = "";
      if (status === "Completed") {
        subject = "Order Completed";
        message = `Dear ${query.userName},

Your order has been marked as Completed.

Order Details:
${formatOrderDetails(query)}

Thank you for your purchase.

Best regards,
Gokuls`;
      }
      // You can add additional status cases here...

      if (subject) {
        await sendEmail(query.userEmail, subject, message);
      }
    }

    res.status(200).json({
      message: "Bulk order query updated successfully",
      query,
    });
  } catch (error) {
    console.error("Error updating query:", error.message);
    res.status(500).json({ error: "Failed to update bulk order query" });
  }
};

// ----------------------------------------------------------------------------
// DELETE a query by ID
exports.deleteQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await GiftBoxOrderQuery.findByIdAndDelete(queryId);
    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }
    res.status(200).json({ message: "Bulk order query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error.message);
    res.status(500).json({ error: "Failed to delete bulk order query" });
  }
};

// ----------------------------------------------------------------------------
// CANCEL a query (by user) – set status to "Cancelled"
exports.cancelUserOrder = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedQuery = await GiftBoxOrderQuery.findByIdAndUpdate(
      queryId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    // Send cancellation email to the user
    await sendEmail(
      updatedQuery.userEmail,
      "Order Cancelled",
      `Dear ${updatedQuery.userName},

Your order has been cancelled.

Order Details:
${formatOrderDetails(updatedQuery)}

If you have any questions, please contact our support.

Best regards,
Gokuls`
    );

    res.status(200).json({
      message: "Bulk order query cancelled successfully",
      query: updatedQuery,
    });
  } catch (error) {
    console.error("Error cancelling query:", error.message);
    res.status(500).json({ error: "Failed to cancel bulk order query" });
  }
};

// ----------------------------------------------------------------------------
// APPROVE a query (by admin) – set status to "Approved"
// You could similarly add a reject endpoint if needed.
exports.approveQuery = async (req, res) => {
  try {
    const queryId = req.params.id;
    const updatedQuery = await GiftBoxOrderQuery.findByIdAndUpdate(
      queryId,
      { status: "Approved" },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ error: "Bulk order query not found" });
    }

    // Send approval email to the user
    await sendEmail(
      updatedQuery.userEmail,
      "Order Approved",
      `Dear ${updatedQuery.userName},

Your order has been approved!

Order Details:
${formatOrderDetails(updatedQuery)}

Thank you for your order.

Best regards,
Gokuls`
    );

    // Optionally send an email to admin (if needed)
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Order Approved - Gift Box Order",
      `Order approved for ${updatedQuery.userName}.
      
Order Details:
${formatOrderDetails(updatedQuery)}`
    );

    res.status(200).json({
      message: "Bulk order query approved successfully",
      query: updatedQuery,
    });
  } catch (error) {
    console.error("Error approving query:", error.message);
    res.status(500).json({ error: "Failed to approve bulk order query" });
  }
};