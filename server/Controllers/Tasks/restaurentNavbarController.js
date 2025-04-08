// const Category = require("../../Models/Tasks/restaurtentNavbar"); // Import the Category model
// const mongoose = require("mongoose");

// // Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new category (Base64 Image Handling)
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;

//     if (!name || !image) {
//       return res.status(400).json({ message: "Name and Base64 image are required." });
//     }

//     const category = new Category({ name, image });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;

//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       { name, image },
//       { new: true }
//     );

//     if (!category) {
//       return res.status(404).json({ message: "Category not found." });
//     }

//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found." });
//     }
//     res.status(200).json({ message: "Category deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Category = require("../../Models/Tasks/restaurtentNavbar"); // Import model
const mongoose = require("mongoose");

// Get all categories (Filtered by category type)
// exports.getCategories = async (req, res) => {
//   try {
//     const { category } = req.query; // Allow filtering by category type
//     const query = category ? { category } : {}; // If category is provided, filter

//     const categories = await Category.find(query);
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching categories", error: error.message });
//   }
// };


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new category (Handles Base64 Image)
exports.createCategory = async (req, res) => {
  try {
    const { category, name, image } = req.body;

    if (!category || !name || !image) {
      return res.status(400).json({ message: "Category, name, and image are required." });
    }

    if (!["Restaurant", "Sweets"].includes(category)) {
      return res.status(400).json({ message: "Invalid category type." });
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(409).json({ message: "Category name already exists." });
    }

    const newCategory = new Category({ category, name, image });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const { category, name, image } = req.body;

    if (!category || !name || !image) {
      return res.status(400).json({ message: "Category, name, and image are required." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { category, name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};