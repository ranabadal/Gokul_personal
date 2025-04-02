const Review = require('../../Models/Tasks/Review');

const getReviews = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request object
    const reviews = await Review.find({ user: userId }).populate('product');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getReviews,
};