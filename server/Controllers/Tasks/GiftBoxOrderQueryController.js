// const BulkOrderQuery = require("../../Models/Tasks/GiftBoxOrderQuery");
// const User = require("../../Models/Auth/Auth.model"); // Import User model (adjust path if needed)
// const nodemailer = require('nodemailer');

// const sendConfirmationEmail = async (userEmail, orderDetails) => {
//   try {
//   const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//     const mailOptions = {
//       from: 'ranabadal435@gmail.com',
//       to: userEmail,
//       subject: 'Order Confirmation - Gift Box',
//       text: `Dear Customer,

//       Thank you for your order! Here are your order details:
//       Box Name: ${orderDetails.boxName}
//       Box Size: ${orderDetails.boxSize}
//       Total Cost: ₹${orderDetails.totalCost}

//       We will notify you once your order is processed.

//       Best regards,
//       Your Team`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Confirmation email sent!');
//   } catch (error) {
//     console.error('Error sending email:', error);
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
//       ...req.body,
//       user: userId, // Store user reference
//     };

//     const newQuery = new BulkOrderQuery(queryData); // Create a new query
//     await newQuery.save();
//     await sendConfirmationEmail(userEmail, { boxName, boxSize, totalCost });
//     res.status(201).json({
//       message: "Bulk order query created successfully",
//       query: newQuery,
//       user: { name: user.name, number: user.number }, // Include user details in response
//     });
//   } catch (error) {
//     console.error("Error creating query:", error.message);
//     res.status(500).json({ error: "Failed to create bulk order query" });
//   }
// };

// // Get all bulk order queries
// exports.getAllQueries = async (req, res) => {
//   try {
//     // Fetch all queries and populate user details (name and number)
//     const queries = await BulkOrderQuery.find().populate({
//       path: "user",
//       model: "users",
//       select: "name number",
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

const GiftBoxOrderQuery = require("../../Models/Tasks/GiftBoxOrderQuery");
const User = require("../../Models/Auth/Auth.model"); // Import User model
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");



const sendConfirmationEmail = async (userEmail, orderDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format product details correctly
    const formattedProducts = orderDetails.products
      .map((product) => `${product.productName} - ₹${product.productPrice} x ${product.quantity}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Order Confirmation - Gift Box",
      text: `Dear ${orderDetails.userName},

      Thank you for your order! Here are your order details:
      
      Box Name: ${orderDetails.boxName}
      Box Size: ${orderDetails.boxSize}
      Products Selected: 
      ${formattedProducts}  
      Total Cost: ₹${orderDetails.totalCost}

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



const sendAdminNotificationEmail = async (userEmail, subject,orderDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format product details correctly
    const formattedProducts = orderDetails.products
      .map((product) => `${product.productName} - ₹${product.productPrice} x ${product.quantity}`)
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      text: `Dear Admin,

      A new order has been placed! Here are the order details:

      User Name: ${orderDetails.userName}
      User Number: ${orderDetails.userNumber}
      User Email: ${orderDetails.userEmail}
      Box Name: ${orderDetails.boxName}
      Box Size: ${orderDetails.boxSize}
      Products Selected:
      ${formattedProducts}
      Total Cost: ₹${orderDetails.totalCost}

      To view the order, please log in to the admin panel.

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
      // Extract the logged-in user ID from the request (assuming authentication middleware sets it)
      const userId = req.user.id;
      const user = await User.findById(userId); // Fetch user details from the database
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Destructure necessary fields from the request body
      // const { boxName, boxSize, products, totalCost, address } = req.body;
  
      // // Validate required fields
      // if (!boxName || !boxSize || !products || products.length === 0 || !totalCost || !address) {
      //   return res.status(400).json({ error: "Missing required fields in the request body" });
      // }
  
      // Assemble query data including user reference
      const queryData = {
        ...req.body,
       user: new mongoose.Types.ObjectId(userId), // Converts userId to ObjectId before saving
             userName: user.name,
        userNumber: user.number,
        userEmail: user.email,
      };
      console.log("Final Query Data:", queryData); 
      const newQuery = new GiftBoxOrderQuery(queryData); // Create a new query
      await newQuery.save(); // Save the query to the database
  
      // Send confirmation email
      
        await sendConfirmationEmail(user.email, queryData);

      await sendAdminNotificationEmail(process.env.ADMIN_EMAIL,"Order Confirmation - Gift Box Order", queryData);
      // Respond with success message and details
      res.status(201).json({
        message: "Gift Box Order query created successfully",
        query: newQuery,
        user: { name: user.name, number: user.number, email: user.email }, // Include user details in response
      });
    } catch (error) {
      // Log any unexpected error and send a generic error response
      console.error("Error creating query:", error.message);
      res.status(500).json({ error: "Failed to create bulk order query" });
    }
  };


  exports.getUserOrders = async (req, res) => {
    try {
      const userId = req.user?.id; // Ensure req.user exists
  
      console.log("User ID received:", userId, "Type:", typeof userId);
  
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid User ID format" });
      }
  
      // Convert userId to ObjectId for consistency in querying
      const objectUserId = new mongoose.Types.ObjectId(userId);
  
      // Fetch bulk orders specific to the logged-in user
      const orders = await GiftBoxOrderQuery.find({ user: objectUserId });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching gift box orders:", error.message);
      res.status(500).json({ error: "Failed to gift box orders" });
    }
  };

// Get all bulk order queries
exports.getAllQueries = async (req, res) => {
  try {
    // Fetch all queries and populate user details (name, number, email)
    const queries = await GiftBoxOrderQuery.find().populate({
      path: "user",
      model: "users",
      select: "name number email", // Include email in populated data
    });

    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error.message);
    res.status(500).json({ error: "Failed to fetch bulk order queries" });
  }
};

// Get a specific bulk order query by ID
exports.getQueryById = async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await GiftBoxOrderQuery.findById(queryId).populate(
      "user",
      "name number email" // Include email in populated data
    );

    if (!query) {
      return res.status(404).json({ error: "Gift Box order query not found" });
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

    const query = await GiftBoxOrderQuery.findByIdAndUpdate(queryId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!query) {
      return res.status(404).json({ error: "Bulk order query not found" });
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

// Delete a bulk order query by ID
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


const sendApprovalEmail = async (userEmail,subject, orderDetails) => {
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
        subject: subject,
        text: `Dear  ${orderDetails.userName},
  
      Here are your order details:
        Box Name: ${orderDetails.boxName}
        Box Size: ${orderDetails.boxSize}
        Total Cost: ₹${orderDetails.totalCost}
  
        Thank you,
  
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
      const query = await GiftBoxOrderQuery.findById(queryId).populate({
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
          await sendApprovalEmail(userEmail,"Order Approved - Gift Box", {
            boxName: query.boxName,
            boxSize: query.boxSize,
            totalCost: query.totalCost,
          });
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


  
  exports.cancelUserOrder = async (req, res) => {
    try {
      const orderId = req.params.id; // Extract order ID
  
      console.log("Canceling Order ID:", orderId);
  
      // Find the order and update its status to "Canceled"
      const order = await GiftBoxOrderQuery.findByIdAndUpdate(
        orderId,
      { status: "Canceled" },
      { new: true }
    ).populate({
      path: "user",
      model: "users",
      select: "name number email",
    });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
   
      res.status(200).json({ message: "Order canceled successfully", order });

      await sendApprovalEmail(order.user.email, "Order Canceled - Gift Boxes Order", {
        userName: order.user.name,
        boxName: order.boxName,
        boxSize: order.boxSize,
        totalCost: order.totalCost,
      });
  
      await sendAdminNotificationEmail(process.env.ADMIN_EMAIL, "User Cancelled Order - Gift Boxes Boxes", {
        userName: order.user.name,
        userNumber: order.user.number,
        userEmail: order.user.email,
        boxName: order.boxName,
        boxSize: order.boxSize,
        products: order.products,
        totalCost: order.totalCost,
      });
  
    } catch (error) {
      console.error("Error canceling order:", error.message);
      res.status(500).json({ error: "Failed to cancel order" });
    }
  };