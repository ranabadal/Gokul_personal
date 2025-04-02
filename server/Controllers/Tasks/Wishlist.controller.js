const mongoose = require('mongoose');
const User = require('../../Models/Auth/Auth.model'); // Adjust the path to your User model
const Product = require('../../Models/Tasks/Product'); // Adjust the path to your Product model




const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log('User ID:', userId); // Log the userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid user ID: ${userId}`);
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, items: user.wishlist });
  } catch (err) {
    console.error('Error fetching wishlist:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    console.log('User ID:', userId); // Log the userId
    console.log('Product ID:', productId); // Log the productId
    console.log('Product ID Type:', typeof productId); // Log the type of productId

    const productIdStr = productId.toString(); // Ensure productId is a string

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productIdStr)) {
      console.error(`Invalid user ID or product ID: ${userId}, ${productIdStr}`);
      return res.status(400).json({ success: false, message: 'Invalid user ID or product ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Ensure user.wishlist is initialized
    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Ensure product exists
    const product = await Product.findById(productIdStr);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Add to wishlist if not already present
    if (!user.wishlist.includes(productIdStr)) {
      user.wishlist.push(productIdStr);
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Product added to wishlist' });
  } catch (err) {
    console.error('Error adding to wishlist:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Ensure user.wishlist is initialized
    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ success: true, message: 'Product removed from wishlist' });
  } catch (err) {
    console.error('Error removing from wishlist:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getWishlist,addToWishlist, removeFromWishlist };
