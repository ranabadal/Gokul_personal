const { GiftBoxesForBulkOrder, GeneralHandbag, GiftBoxCategory } = require("../../../Models/Tasks/BulkOrder/GiftBoxesForBulkOrder");

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await GiftBoxCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New Category
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    // ✅ Validate Base64 Format
    if (!image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const category = new GiftBoxCategory({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update Category
exports.updateCategory = async (req, res) => {
  try {
    const category = await GiftBoxCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await GiftBoxCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Gift Boxes
exports.getAllGiftBoxes = async (req, res) => {
    try {
        console.log("fetching giftboxes")
      const giftBoxes = await GiftBoxesForBulkOrder.find().populate("category", "name");
  
      // If no gift boxes are found, return an empty array
      if (!giftBoxes || giftBoxes.length === 0) {
        return res.status(200).json([]);
      }
  
      res.status(200).json(giftBoxes);
    } catch (error) {
      // Handle unexpected errors gracefully
      res.status(500).json({ error: "An error occurred while fetching gift boxes." });
    }
  };
  
// ✅ Create a New Gift Box (With Base64 Image)
exports.createGiftBox = async (req, res) => {
  try {
    const { categoryId, name, image, description, price, minOrderQuantity, matchingHandbags } = req.body;
    const category = await GiftBoxCategory.findById(categoryId);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    if (!image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const giftBox = new GiftBoxesForBulkOrder({ category: categoryId, name, image, description, price, minOrderQuantity, matchingHandbags });
    await giftBox.save();
    res.status(201).json(giftBox);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All General Handbags
exports.getAllGeneralHandbags = async (req, res) => {
  try {
    const handbags = await GeneralHandbag.find().populate("category", "name");
    res.json(handbags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a General Handbag (With Base64 Image)
exports.createGeneralHandbag = async (req, res) => {
  try {
    const { categoryId, name, image, price, minOrderQuantity } = req.body;
    const category = await GiftBoxCategory.findById(categoryId);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    if (!image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const handbag = new GeneralHandbag({ category: categoryId, name, image, price, minOrderQuantity });
    await handbag.save();
    res.status(201).json(handbag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGiftBox = async (req, res) => {
    try {
      const giftBox = await GiftBoxesForBulkOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!giftBox) {
        return res.status(404).json({ message: "Gift Box not found" });
      }
  
      res.json({ message: "Gift Box updated successfully", giftBox });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteGiftBox = async (req, res) => {
    try {
      const giftBox = await GiftBoxesForBulkOrder.findByIdAndDelete(req.params.id);
  
      if (!giftBox) {
        return res.status(404).json({ message: "Gift Box not found" });
      }
  
      res.json({ message: "Gift Box deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateGeneralHandbag = async (req, res) => {
    try {
      const handbag = await GeneralHandbag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!handbag) {
        return res.status(404).json({ message: "General Handbag not found" });
      }
  
      res.json({ message: "General Handbag updated successfully", handbag });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteGeneralHandbag = async (req, res) => {
    try {
      const handbag = await GeneralHandbag.findByIdAndDelete(req.params.id);
  
      if (!handbag) {
        return res.status(404).json({ message: "General Handbag not found" });
      }
  
      res.json({ message: "General Handbag deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };