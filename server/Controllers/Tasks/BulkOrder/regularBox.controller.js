// regularBox.controller.js
const RegularBox = require("../../../Models/Tasks/BulkOrder/regularBox.model");

// Create a new Regular Box
exports.createRegularBox = async (req, res) => {
  try {
    const { boxName, size, minOrder } = req.body;
    if (!boxName || !size || !minOrder) {
      return res.status(400).json({ message: "boxName, size, and minOrder are required" });
    }

    const newBox = new RegularBox({ boxName, size, minOrder });
    await newBox.save();
    res.status(201).json(newBox);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Regular Boxes
exports.getAllRegularBoxes = async (req, res) => {
  try {
    const boxes = await RegularBox.find({});
    res.json(boxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Regular Box by its ID
exports.getRegularBoxById = async (req, res) => {
  try {
    const box = await RegularBox.findById(req.params.id);
    if (!box) return res.status(404).json({ message: "Regular box not found" });
    res.json(box);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Regular Box
exports.updateRegularBox = async (req, res) => {
  try {
    const { boxName, size, minOrder } = req.body;
    const updatedBox = await RegularBox.findByIdAndUpdate(
      req.params.id,
      { boxName, size, minOrder },
      { new: true, runValidators: true }
    );
    if (!updatedBox) return res.status(404).json({ message: "Regular box not found" });
    res.json(updatedBox);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Regular Box
exports.deleteRegularBox = async (req, res) => {
  try {
    const deletedBox = await RegularBox.findByIdAndDelete(req.params.id);
    if (!deletedBox) return res.status(404).json({ message: "Regular box not found" });
    res.json({ message: "Regular box deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};