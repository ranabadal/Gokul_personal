// const TakeawayOrder = require("../../Models/Tasks/TakeawayOrder");
// const User = require("../../Models/Auth/Auth.model"); // Import User model
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");


// // 📌 Place Order (Checkout)
// exports.placeOrder = async (req, res) => {
//     try {
//       // ✅ Extract the authenticated user's ID from `req.user`
//       const userId = req.user.id;
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       const { products, totalPrice } = req.body;
  
//       if (!products || products.length === 0 || !totalPrice) {
//         return res.status(400).json({ message: "Invalid order data received" });
//       }
  
//       // ✅ Prepare order data including user details
//       const orderData = {
//         user: new mongoose.Types.ObjectId(userId),
//         userName: user.name,
//         userNumber: user.number,
//         userEmail: user.email,
//         products,
//         totalPrice,
//       };
  
//       console.log("📡 Final Order Data:", orderData); // ✅ Debug log
  
//       const newOrder = new TakeawayOrder(orderData);
//       await newOrder.save();
  
//       res.status(201).json({ message: "Order placed successfully", order: newOrder });
//     } catch (error) {
//       console.error("❌ Error placing order:", error);
//       res.status(500).json({ message: "Error placing order", error });
//     }
//   };

// // 📌 Get All Orders (Admin Panel)
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await TakeawayOrder.find().populate("user products.product");
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching orders", error });
//   }
// };

// // 📌 Update Order Status (Admin Approval)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     if (!["Pending", "Accepted", "Rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const updatedOrder = await TakeawayOrder.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     res.status(200).json({ message: "Order status updated", order: updatedOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating order status", error });
//   }
// };

const TakeawayOrder = require("../../Models/Tasks/TakeawayOrder");
const User = require("../../Models/Auth/Auth.model");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// 📌 Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendOrderEmail = async (recipientEmail, subject, order) => {
    try {
      // ✅ Ensure proper product population before generating details
      const populatedOrder = await TakeawayOrder.findById(order._id).populate({
        path: "products.product",
        model: "Product",
        select: "name price",
      });
  
      const userName = order.userName || "Customer";
      const productDetails = populatedOrder.products?.length
        ? populatedOrder.products.map(prod => {
            return `${prod.product?.name || "Unknown Product"} (x${prod.quantity}) - ₹${prod.product?.price ? prod.product.price * prod.quantity : 0}`;
          }).join("\n")
        : "No products in order.";
  
      const totalPrice = order.totalPrice || 0;
      const status = order.status || "Pending";
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: subject,
        text: `Dear ${userName},\n\nYour order status has been updated!\n\nOrder Details:\n${productDetails}\nTotal Price: ₹${totalPrice}\nStatus: ${status}\n\nThank you!\nBest Regards,\nGokuls`,
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${recipientEmail}: ${subject}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  };


exports.placeOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { products, totalPrice } = req.body;
  
      if (!products || products.length === 0 || !totalPrice) {
        return res.status(400).json({ message: "Invalid order data received" });
      }
  
      // ✅ Ensure required user details exist
      if (!user.name || !user.email || !user.number) {
        return res.status(400).json({ message: "User details missing, cannot place order." });
      }
  
      const orderData = {
        user: new mongoose.Types.ObjectId(userId),
        userName: user.name,
        userNumber: user.number,
        userEmail: user.email,
        products,
        totalPrice,
        status: "Pending",
      };
  
      const newOrder = new TakeawayOrder(orderData);
      await newOrder.save();
  
      console.log("📡 Order placed successfully:", newOrder);
  
      // ✅ Send emails (only if email addresses exist)
      if (user.email) {
        await sendOrderEmail(user.email, "Takeaway Order Placed", newOrder);
      }
      if (process.env.ADMIN_EMAIL) {
        await sendOrderEmail(process.env.ADMIN_EMAIL, "New Takeaway Order Arrived", newOrder);
      }
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      console.error("❌ Error placing order:", error);
      res.status(500).json({ message: "Error placing order", error: error.message });
    }
  };


  
exports.getOrders = async (req, res) => {
    try {
      // ✅ Ensure proper user and product population
      const orders = await TakeawayOrder.find()
        .populate({
          path: "user",
          model: "users",
          select: "name number email",
        })
        .populate({
          path: "products.product",
          model: "Product",
          select: "name price",
        });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No takeaway orders found." });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("❌ Error fetching takeaway orders:", error);
      res.status(500).json({ message: "Error fetching takeaway orders", error: error.message });
    }
  };

  exports.acceptOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // ✅ Update order status and populate user details
      const acceptedOrder = await TakeawayOrder.findByIdAndUpdate(
        orderId,
        { status: "Accepted" },
        { new: true }
      ).populate({
        path: "user",
        model: "users", // ✅ Ensure correct model reference
        select: "name number email",
      });
  
      if (!acceptedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      // ✅ Ensure user exists before sending email
      if (acceptedOrder.user?.email) {
        await sendOrderEmail(acceptedOrder.user.email, "Order Accepted - Takeaway", acceptedOrder);
      }
      await sendOrderEmail(process.env.ADMIN_EMAIL, "Takeaway Order Accepted", acceptedOrder);
  
      res.status(200).json({ message: "Order accepted successfully!", order: acceptedOrder });
    } catch (error) {
      console.error("❌ Error accepting order:", error);
      res.status(500).json({ message: "Error accepting order", error: error.message });
    }
  };

  exports.cancelTakeawayOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // ✅ Update order status and populate user details
      const canceledOrder = await TakeawayOrder.findByIdAndUpdate(
        orderId,
        { status: "Canceled" },
        { new: true }
      ).populate({
        path: "user",
        model: "users", // ✅ Ensure correct model reference
        select: "name number email",
      });
  
      if (!canceledOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      // ✅ Ensure user exists before sending email
      if (canceledOrder.user?.email) {
        await sendOrderEmail(canceledOrder.user.email, "Order Canceled - Takeaway", canceledOrder);
      }
      await sendOrderEmail(process.env.ADMIN_EMAIL, "Takeaway Order Canceled", canceledOrder);
  
      res.status(200).json({ message: "Order canceled successfully!", order: canceledOrder });
    } catch (error) {
      console.error("❌ Error canceling order:", error);
      res.status(500).json({ message: "Error canceling order", error: error.message });
    }
  };


exports.rejectOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const rejectedOrder = await TakeawayOrder.findByIdAndUpdate(
        orderId,
        { status: "Rejected" },
        { new: true }
      ).populate({
        path: "user",
        model: "users", // ✅ Use "users" as per your schema definition
        select: "name number email",
      });
  
      if (!rejectedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      // ✅ Send rejection emails
      await sendOrderEmail(rejectedOrder.user.email, "Order Rejected - Takeaway", rejectedOrder);
      await sendOrderEmail(process.env.ADMIN_EMAIL, "Takeaway Order Rejected", rejectedOrder);
  
      res.status(200).json({ message: "Order rejected successfully!", order: rejectedOrder });
    } catch (error) {
      console.error("❌ Error rejecting order:", error);
      res.status(500).json({ message: "Error rejecting order", error });
    }
  };



 

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extract user ID from authenticated request

    // ✅ Fetch orders specific to the logged-in user
    const orders = await TakeawayOrder.find({ user: userId }).populate({
      path: "products.product",
      model: "Product",
      select: "name price",
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No takeaway orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching user takeaway orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};