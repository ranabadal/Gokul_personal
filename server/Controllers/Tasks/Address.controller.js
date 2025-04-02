const Address = require('../../Models/Tasks/Address');


// Add Address
const addAddress = async (req, res) => {
  try {
    const { province, city, area, landmark } = req.body;
    const userId = req.user.id; // Get the user ID from the request object
    console.log('Request body:', req.body); // Log the request body
    const newAddress = new Address({ user: userId, province, city, area, landmark }); // Include user in the address
    await newAddress.save();
    res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    console.error('Error saving address:', error.message); // Log the error message
    console.error('Error stack:', error.stack); // Log the error stack trace
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors); // Log the validation errors
      res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

// Get Addresses
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request object
    const addresses = await Address.find({ user: userId }); // Fetch addresses for the logged-in user
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error.message); // Log the error message
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { province, city, area, landmark } = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(addressId, { province, city, area, landmark }, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.error('Error updating address:', error.message); // Log the error message
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    console.log(`Attempting to delete address with ID: ${addressId}`);
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      console.error(`Address with ID: ${addressId} not found`);
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    console.log(`Address with ID: ${addressId} deleted successfully`);
    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};
