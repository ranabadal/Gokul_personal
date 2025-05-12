const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../Models/Tasks/Admin');

const router = express.Router();



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Received Login Request:", username, password);
  
    // Retrieve admin from database
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log("Admin not found in DB!");
      return res.status(400).json({ msg: 'User not found' });
    }
  
    console.log("Stored Hashed Password in DB:", admin.password);
  
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);
  
    if (!isMatch) {
      console.log("Password does not match!");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
  
    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
    console.log("Login successful! Sending token...");
    res.json({ token });
  });
// Verify Admin
router.get('/verify', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ msg: 'Unauthorized' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ verified: true });
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
});

module.exports = router;