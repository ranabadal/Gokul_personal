// // controllers/menuController.js
// const Menu = require("../../Models/Tasks/Menu");

// // GET all menus
// // exports.getMenus = async (req, res) => {
// //   try {
// //     const menus = await Menu.find();
// //     res.status(200).json(menus);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // controllers/menuController.js
// exports.getMenus = async (req, res) => {
//     try {
//       let query = {};
//       if (req.query.name) {
//         query.name = req.query.name;
//       }
//       const menus = await Menu.find(query);
//       res.status(200).json(menus);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  

// // GET a single menu by ID
// exports.getMenuById = async (req, res) => {
//   try {
//     const menu = await Menu.findById(req.params.id);
//     if (!menu) {
//       return res.status(404).json({ message: "Menu not found" });
//     }
//     res.status(200).json(menu);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // CREATE a new menu

// exports.createMenu = async (req, res) => {
//   try {
//     console.log("Creating menu with payload:", req.body);
//     const newMenu = new Menu(req.body);
//     const savedMenu = await newMenu.save();
//     res.status(201).json(savedMenu);
//   } catch (error) {
//     console.error("Error in createMenu:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


// // UPDATE an existing menu
// exports.updateMenu = async (req, res) => {
//   try {
//     const menuId = req.params.id;
//     const updatedMenu = await Menu.findByIdAndUpdate(menuId, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedMenu) {
//       return res.status(404).json({ message: "Menu not found" });
//     }
//     res.status(200).json(updatedMenu);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE a menu
// exports.deleteMenu = async (req, res) => {
//   try {
//     const menuId = req.params.id;
//     const deletedMenu = await Menu.findByIdAndDelete(menuId);
//     if (!deletedMenu) {
//       return res.status(404).json({ message: "Menu not found" });
//     }
//     res.status(200).json({ message: "Menu deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




const Menu = require("../../Models/Tasks/Menu");
const pdfParse = require("pdf-parse");

// 📌 GET all menus with optional filtering
exports.getMenus = async (req, res) => {
  try {
    const query = req.query.name ? { name: req.query.name } : {}; // ✅ Filter by name if provided
    const menus = await Menu.find(query);
    
    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "No menus found." });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error("❌ Error fetching menus:", error);
    res.status(500).json({ message: "Error fetching menus", error: error.message });
  }
};

// 📌 GET a single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error("❌ Error fetching menu:", error);
    res.status(500).json({ message: "Error fetching menu", error: error.message });
  }
};

// // 📌 CREATE a new menu with optional PDF upload
// exports.createMenu = async (req, res) => {
//   try {
//     const { name, sections, menuPDFBase64 } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Menu name is required." });
//     }

//     let extractedText = "";
//     if (menuPDFBase64) {
//       // ✅ Decode Base64 PDF for parsing
//       const buffer = Buffer.from(menuPDFBase64, "base64");
//       const pdfData = await pdfParse(buffer);
//       extractedText = pdfData.text; // ✅ Extract text for processing
//     }

//     console.log("📡 Creating menu:", req.body);

//     const newMenu = new Menu({
//       name,
//       sections,
//       menuPDF: menuPDFBase64, // ✅ Store PDF as Base64 (optional)
//       extractedText, // ✅ Save extracted content for reference
//     });

//     const savedMenu = await newMenu.save();
//     res.status(201).json({ message: "Menu created successfully!", menu: savedMenu });
//   } catch (error) {
//     console.error("❌ Error creating menu:", error);
//     res.status(500).json({ message: "Error creating menu", error: error.message });
//   }
// };
// 📄 Create a New Menu
exports.createMenu = async (req, res) => {
  try {
    const { name, sections, menuPdf } = req.body; // ✅ read menuPDF directly

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: "Menu name is required." });
    }

    // Create new menu document
    const newMenu = new Menu({
      name,
      sections: sections || [], // if no sections sent, use empty array
      menuPdf: menuPdf || "",    // if no PDF uploaded, keep empty string
    });

    // Save to database
    const savedMenu = await newMenu.save();

    console.log("✅ Menu created successfully:", savedMenu); // for server debug

    // Send back response
    res.status(201).json({ message: "Menu created successfully!", menu: savedMenu });
    
  } catch (error) {
    console.error("❌ Error creating menu:", error);
    res.status(500).json({ message: "Error creating menu", error: error.message });
  }
};


// 📌 UPDATE an existing menu with optional PDF upload
exports.updateMenu = async (req, res) => {
  try {
    const { name, menuPdf } = req.body;
    const menuId = req.params.id;

    if (!name) {
      return res.status(400).json({ message: "Menu name is required for updating." });
    }

    let extractedText = "";
    if (menuPdf) {
      // ✅ Decode Base64 PDF for parsing
      const buffer = Buffer.from(menuPdf, "base64");
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    }

    const updatedMenu = await Menu.findByIdAndUpdate(menuId, 
      { ...req.body, menuPdf: menuPdf, extractedText }, 
      { new: true, runValidators: true });

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json({ message: "Menu updated successfully!", menu: updatedMenu });
  } catch (error) {
    console.error("❌ Error updating menu:", error);
    res.status(500).json({ message: "Error updating menu", error: error.message });
  }
};

// 📌 DELETE a menu safely
exports.deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(menuId);

    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json({ message: "Menu deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting menu:", error);
    res.status(500).json({ message: "Error deleting menu", error: error.message });
  }
};