const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const Admin = require('../Models/Tasks/Admin'); // Adjust the path to your Admin model
const isAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Received Token:", token); // Debugging
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging
        req.user = decoded;

        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
        }

        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};
module.exports = { isAdmin };