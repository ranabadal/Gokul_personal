const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  province: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
