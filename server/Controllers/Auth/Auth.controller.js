// const UserModel = require('../../Models/Auth/Auth.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const SECRET_KEY = process.env.JWT_SECRET;

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, number, profilePic } = req.body;
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ success: false, message: "Email already exists" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const userModel = await UserModel.create({ name, email, password: hashedPassword, number, profilePic });
//         const token = jwt.sign({ id: userModel._id }, SECRET_KEY, { expiresIn: '24h' });
//         return res.status(201).json({ success: true, message: "User created successfully", token });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//         const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '24h' });
//         res.status(200).json({ success: true, message: "Logged in successfully", token, name: user.name, profilePic: user.profilePic });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const token = crypto.randomBytes(20).toString('hex');
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         await user.save();

//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             to: user.email,
//             from: 'ranabadal3004@gmail.com',
//             subject: 'Password Reset',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//                    Please click on the following link, or paste this into your browser to complete the process:\n\n
//                    http://localhost:3000/reset-password/${token}\n\n
//                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//         };

//         await transporter.sendMail(mailOptions);

//         res.json({ success: true, message: 'Password reset link sent to your email' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// const resetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;
//     try {
//         const user = await UserModel.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         res.json({ success: true, message: 'Password has been reset' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

// module.exports = {
//     signup,
//     login,
//     forgotPassword,
//     resetPassword
// };
const UserModel = require('../../Models/Auth/Auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const SECRET_KEY = process.env.JWT_SECRET;

const signup = async (req, res) => {
    try {
        const { name, email, password, number, profilePic, googleSignup } = req.body;

        if (!googleSignup) {
            // Validate fields for manual signup
            if (!password || !number) {
                return res.status(400).json({ success: false, message: "Password and number are required" });
            }
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const userModel = await UserModel.create({ name, email, password: hashedPassword, number, profilePic, googleSignup });
        const token = jwt.sign({ id: userModel._id }, SECRET_KEY, { expiresIn: '24h' });
        return res.status(201).json({ success: true, message: "User created successfully", token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({ success: true, message: "Logged in successfully", token, name: user.name, profilePic: user.profilePic });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'ranabadal3004@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'Password has been reset' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password, number } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (number) {
            user.number = number;
        }

        await user.save();
        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    updateProfile // Export the updateProfile function
};