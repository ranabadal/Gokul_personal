const Deal = require("../../Models/Tasks/TodaysDealProduct.model");
const User = require("../../Models/Auth/Auth.model");
const nodemailer = require("nodemailer");
const cron = require("node-cron");


// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Admin Email
        pass: process.env.EMAIL_PASS,
    },
});


    // Send Email to Users
const sendDealNotificationEmail = async (userEmail, dealDetails) => {
  try {
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: `🔥 Today's Deal: ${dealDetails.title}!`,
          text: `Hello,

Exciting offer today! Here are the details:

 Deal Title: ${dealDetails.title}
 Description: ${dealDetails.description}
 Start Time: ${new Date(dealDetails.startTime).toLocaleString()}
End Time: ${new Date(dealDetails.endTime).toLocaleString()}

 Hurry, this deal expires soon!

Click below to grab the deal now:
👉 Visit: https://yourwebsite.com/deals

Best regards,
Gokuls Sweet Shop`,
      };


      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${userEmail}`);
  } catch (error) {
      console.error("Error sending user email:", error.message);
  }
};

// Send Admin Notification
const sendAdminDealEmail = async (dealDetails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `📢 New Deal Posted: ${dealDetails.title}`,
            text: `Dear Admin,

A new deal has been posted for today:

📌 Deal Title: ${dealDetails.title}
📌 Description: ${dealDetails.description}
📌 Start Time: ${new Date(dealDetails.startTime).toLocaleString()}
📌 End Time: ${new Date(dealDetails.endTime).toLocaleString()}


Please verify the details and manage the promotion via the admin panel.

Best regards,
Gokuls`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Admin notification email sent successfully!");
    } catch (error) {
        console.error("Error sending admin email:", error.message);
    }
};

// Notify Users & Admins When New Deal is Added
const notifyUsersAboutTodaysDeal = async (deal) => {
    try {
        const users = await User.find({}, "email"); // Fetch all users
        const userEmails = users.map(user => user.email);

        for (const email of userEmails) {
            await sendDealNotificationEmail(email, deal);
        }
        
        await sendAdminDealEmail(deal);
    } catch (error) {
        console.error("Error notifying users:", error.message);
    }
};

// Create a new deal and send email notifications
exports.createDeal = async (req, res) => {
    try {
        const { title, description, type, startTime, endTime, image, price } = req.body;

        if (!image) return res.status(400).json({ message: "Image data is required!" });

        const newDeal = new Deal({ title, description, image, type,   startTime: new Date(startTime), // Convert to Date Object
          endTime: new Date(endTime)
        , price });
        await newDeal.save();

        if (type === "today") {
            await notifyUsersAboutTodaysDeal(newDeal); // Send emails when a deal is marked as "today"
        }

        res.status(201).json({ success: true, deal: newDeal });
    } catch (error) {
        console.error("Error creating deal:", error.message);
        res.status(500).json({ error: "Failed to create deal" });
    }
};


// Function to calculate remaining time
const calculateRemainingHours = (startTime, endTime) => {
    const diffMs = new Date(endTime) - new Date(startTime);
    return Math.floor(diffMs / (1000 * 60 * 60)); // Convert to hours
};

exports.getAllDeals = async (req, res) => {
  try {
      const todayDeals = await Deal.find({ type: "today" });
      const upcomingDeals = await Deal.find({ type: "upcoming" });
      const expiredDeals = await Deal.find({ type: "expired" });

      res.status(200).json({
          success: true,
          todayDeals: todayDeals.length > 0 ? todayDeals : [],
          upcomingDeals: upcomingDeals.length > 0 ? upcomingDeals : [],
          expiredDeals: expiredDeals.length > 0 ? expiredDeals : [],
      });
  } catch (error) {
      res.status(500).json({ message: "Error fetching deals", error });
  }
};


const updateDealStates = async () => {
  try {
      // console.log("🔄 Entering updateDealStates function...");
      const now = new Date();

      // Expire today's deals that have ended
      await Deal.updateMany({ type: "today", endTime: { $lte: now } }, { type: "expired" });
      // console.log("🛑 Expired deals updated.");

      // Promote upcoming deal to today's deal
      const upcomingDeal = await Deal.findOne({ type: "upcoming", startTime: { $lte: now } });

      if (upcomingDeal) {
          // console.log("🎯 Found upcoming deal:", upcomingDeal.title);

          upcomingDeal.type = "today";
          await upcomingDeal.save();

          // ✅ Send email notification
          await notifyUsersAboutTodaysDeal(upcomingDeal);

          // console.log("✅ Updated upcoming deal to today's deal and sent emails:", upcomingDeal.title);
      } else {
          // console.log("🔍 No upcoming deals found for transition.");
      }
  } catch (error) {
      // console.error("❌ Error in updateDealStates:", error);
  }
};

// **Cron Job Running in Controller Itself**
cron.schedule("*/5 * * * *", async () => {
    console.log("Checking deal transitions...");
    await updateDealStates();
});


// Get Active Deals
exports.getActiveDeals = async (req, res) => {
  try {
      const todayDeal = await Deal.findOne({ type: "today" });

      if (!todayDeal) {
          return res.status(200).json({ success: false, message: "No active deal found." });
      }

      res.status(200).json({ success: true, todayDeal });
  } catch (error) {
      console.error("Error fetching today's deal:", error);
      res.status(500).json({ success: false, message: "Server error." });
  }
};


exports.getUpcomingDeals = async (req, res) => {
  try {
      const upcomingDeals = await Deal.find({ type: "upcoming" });

      res.status(200).json({ success: true, upcomingDeals });
  } catch (error) {
      console.error("Error fetching upcoming deals:", error);
      res.status(500).json({ success: false, message: "Server error." });
  }
};



exports.getTomorrowDeals = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
        const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

        console.log("Fetching deals between:", startOfTomorrow, "and", endOfTomorrow);

        const tomorrowDeals = await Deal.find({
            type: "upcoming", // Ensuring only upcoming deals are fetched
            startTime: { $gte: startOfTomorrow, $lt: endOfTomorrow }
        });

        console.log("Deals found:", tomorrowDeals);

        res.status(200).json({ success: true, deals: tomorrowDeals });
    } catch (error) {
        console.error("Error fetching tomorrow's deals:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

// Update Deal (Edit)
exports.editDeal = async (req, res) => {
    try {
        const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedDeal) return res.status(404).json({ message: "Deal not found" });

        res.status(200).json({ message: "Deal updated successfully!", updatedDeal });
    } catch (error) {
        res.status(500).json({ message: "Error updating deal", error });
    }
};

// Delete Deal
exports.deleteDeal = async (req, res) => {
    try {
        const deletedDeal = await Deal.findByIdAndDelete(req.params.id);

        if (!deletedDeal) return res.status(404).json({ message: "Deal not found" });

        res.status(200).json({ message: "Deal deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting deal", error });
    }
};



exports.updateDealStates = updateDealStates;