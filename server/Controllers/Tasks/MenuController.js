// controllers/menuController.js
const Menu = require("../../Models/Tasks/Menu");

// GET all menus
// exports.getMenus = async (req, res) => {
//   try {
//     const menus = await Menu.find();
//     res.status(200).json(menus);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// controllers/menuController.js
exports.getMenus = async (req, res) => {
    try {
      let query = {};
      if (req.query.name) {
        query.name = req.query.name;
      }
      const menus = await Menu.find(query);
      res.status(200).json(menus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// GET a single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new menu

exports.createMenu = async (req, res) => {
  try {
    console.log("Creating menu with payload:", req.body);
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error("Error in createMenu:", error);
    res.status(500).json({ error: error.message });
  }
};


// UPDATE an existing menu
exports.updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a menu
exports.deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
