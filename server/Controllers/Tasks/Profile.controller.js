const bcrypt = require('bcryptjs');
const UserModel = require('../../Models/Auth/Auth.model');
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, number } = req.body;
    const user = await UserModel.findByIdAndUpdate(userId, { name, email, number }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// const updateProfilePic = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const profilePic = req.file.path;
//     const user = await UserModel.findByIdAndUpdate(userId, { profilePic }, { new: true }).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     res.status(200).json({ success: true, profilePic: user.profilePic });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    // Convert file buffer to Base64
    const profilePic = file.buffer.toString('base64');

    const user = await UserModel.findByIdAndUpdate(userId, { profilePic }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, profilePic: user.profilePic });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfilePic,
  changePassword
};