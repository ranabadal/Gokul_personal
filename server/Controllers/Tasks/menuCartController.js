const Menu = require("../../Models/Tasks/MenuCart"); // Import the Menu model
const mongoose = require("mongoose");

// Fetch all menu items
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Fetch single menu item by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ error: "Menu item not found" });

    res.status(200).json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

// Create a new menu item
exports.createMenu = async (req, res) => {
  try {
    const { menuName, description, price, menuImage } = req.body;
    const newMenu = new Menu({
      menuName,
      description,
      price,
      // menuImage: menuImage
      //   ? {
      //       data: menuImage.split(",")[1],
      //       contentType: image.split(",")[0].split(":")[1].split(";")[0],
      //     }
      //   : null,
      menuImage,
    });

    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

// Update menu item
exports.updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedMenu)
      return res.status(404).json({ error: "Menu item not found" });

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// Delete menu item
exports.deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu)
      return res.status(404).json({ error: "Menu item not found" });

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
