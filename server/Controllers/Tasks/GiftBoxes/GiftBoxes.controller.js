// const { GiftBoxes, GiftBoxesGeneralHandbags, GiftBoxesCategory } = require("../../../Models/Tasks/GiftBoxes/GiftBox");

// // ✅ Get All Categories
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await GiftBoxesCategory.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Create a New Category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;

//     // ✅ Validate Base64 Format
//     if (!image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     const category = new GiftBoxesCategory({ name, image });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Update Category
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await GiftBoxesCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     await GiftBoxesCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get All Gift Boxes
// exports.getAllGiftBoxes = async (req, res) => {
//     try {
//         console.log("fetching giftboxes")
//       const giftBoxes = await GiftBoxes.find().populate("category", "name");
  
//       // If no gift boxes are found, return an empty array
//       if (!giftBoxes || giftBoxes.length === 0) {
//         return res.status(200).json([]);
//       }
  
//       res.status(200).json(giftBoxes);
//     } catch (error) {
//       // Handle unexpected errors gracefully
//       res.status(500).json({ error: "An error occurred while fetching gift boxes." });
//     }
//   };
  
  
//   exports.createGiftBox = async (req, res) => {
//     try {
//       // Expect the frontend to send:
//       // category: the category _id,
//       // name, image, description, price, minOrderQuantity,
//       // and an optional matchingHandbags array.
//       const { category, name, image, description, price, minOrderQuantity, matchingHandbags } = req.body;
  
//       // Validate all required fields are provided
//       if (!category || !name || !image || !description || !price || !minOrderQuantity) {
//         return res.status(400).json({ message: "Please provide all required fields." });
//       }
  
//       // Find the category using the provided ID in 'category'
//       const categoryFound = await GiftBoxesCategory.findById(category);
//       if (!categoryFound) {
//         return res.status(400).json({ message: "Invalid category" });
//       }
  
//       // Validate that the main image is in Base64 format
//       if (typeof image !== "string" || !image.startsWith("data:image/")) {
//         return res.status(400).json({ message: "Invalid image format" });
//       }
  
//       // Validate matchingHandbags if provided:
//       if (matchingHandbags) {
//         if (!Array.isArray(matchingHandbags)) {
//           return res.status(400).json({ message: "Matching handbags must be an array." });
//         }
//         for (let i = 0; i < matchingHandbags.length; i++) {
//           const mh = matchingHandbags[i];
//           // If an image field is provided in a matching handbag, validate its Base64 format
//           if (mh.image && (typeof mh.image !== "string" || !mh.image.startsWith("data:image/"))) {
//             return res.status(400).json({ message: "Invalid matching handbag image format" });
//           }
//         }
//       }
  
//       // Create and save the new Gift Box
//       const giftBox = new GiftBoxes({
//         category,  // using the 'category' field from request
//         name,
//         image,
//         description,
//         price,
//         minOrderQuantity,
//         matchingHandbags: matchingHandbags || []
//       });
  
//       await giftBox.save();
//       res.status(201).json(giftBox);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
// // ✅ Get All General Handbags
// exports.getAllGeneralHandbags = async (req, res) => {
//   try {
//     const handbags = await GiftBoxesGeneralHandbags.find().populate("category", "name");
//     res.json(handbags);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createGeneralHandbag = async (req, res) => {
//   try {
//     // Expecting the frontend to send a field named `category`
//     const { category, name, image, price, minOrderQuantity } = req.body;

//     // Validate all required fields are provided
//     if (!category || !name || !image || !price || !minOrderQuantity) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }

//     // Find the category using the provided ID in `category`
//     const categoryFound = await GiftBoxesCategory.findById(category);
//     if (!categoryFound) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     // Validate that the image is in Base64 format
//     if (typeof image !== "string" || !image.startsWith("data:image/")) {
//       return res.status(400).json({ message: "Invalid image format" });
//     }

//     // Create and save the new General Handbag
//     const handbag = new GiftBoxesGeneralHandbags({
//       category, // using the 'category' field from the request
//       name,
//       image,
//       price,
//       minOrderQuantity,
//     });
//     await handbag.save();

//     res.status(201).json(handbag);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.updateGiftBox = async (req, res) => {
//     try {
//       const giftBox = await GiftBoxes.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
//       if (!giftBox) {
//         return res.status(404).json({ message: "Gift Box not found" });
//       }
  
//       res.json({ message: "Gift Box updated successfully", giftBox });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.deleteGiftBox = async (req, res) => {
//     try {
//       const giftBox = await GiftBoxes.findByIdAndDelete(req.params.id);
  
//       if (!giftBox) {
//         return res.status(404).json({ message: "Gift Box not found" });
//       }
  
//       res.json({ message: "Gift Box deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.updateGeneralHandbag = async (req, res) => {
//     try {
//       const handbag = await GiftBoxesGeneralHandbags.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
//       if (!handbag) {
//         return res.status(404).json({ message: "General Handbag not found" });
//       }
  
//       res.json({ message: "General Handbag updated successfully", handbag });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   exports.deleteGeneralHandbag = async (req, res) => {
//     try {
//       const handbag = await GiftBoxesGeneralHandbags.findByIdAndDelete(req.params.id);
  
//       if (!handbag) {
//         return res.status(404).json({ message: "General Handbag not found" });
//       }
  
//       res.json({ message: "General Handbag deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };







const { 
  GiftBoxes, 
  GiftBoxesGeneralHandbags, 
  GiftBoxesCategory 
} = require("../../../Models/Tasks/GiftBoxes/GiftBox");

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await GiftBoxesCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New Category
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    // ✅ Validate Base64 Format for image field
    if (!image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }
    const category = new GiftBoxesCategory({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update Category
exports.updateCategory = async (req, res) => {
  try {
    const category = await GiftBoxesCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await GiftBoxesCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Gift Boxes
exports.getAllGiftBoxes = async (req, res) => {
  try {
    console.log("fetching giftboxes");
    const giftBoxes = await GiftBoxes.find()
      .populate("category", "name")
      .populate("preferredSweets", "name image price");
    if (!giftBoxes || giftBoxes.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(giftBoxes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching gift boxes." });
  }
};

// ✅ Get Single Gift Box by ID (to fetch preferred sweets etc.)
exports.getGiftBoxById = async (req, res) => {
  try {
    const giftBox = await GiftBoxes.findById(req.params.id)
      .populate("preferredSweets", "name image price"); // populate preferred sweets details
    if (!giftBox) {
      return res.status(404).json({ message: "Gift box not found" });
    }
    res.status(200).json(giftBox);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Create a New Gift Box (with sweets fields)
exports.createGiftBox = async (req, res) => {
  try {
    // Expected fields from frontend:
    // category, name, image, description, price, minOrderQuantity, 
    // matchingHandbags (Array, optional),
    // sweetsQuantity, and preferredSweets (Array of ObjectIds).
    const { 
      category, 
      name, 
      image, 
      description, 
      price, 
      minOrderQuantity, 
      matchingHandbags,
      sweetsQuantity,
      preferredSweets
    } = req.body;

    if (!category || !name || !image || !description || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const categoryFound = await GiftBoxesCategory.findById(category);
    if (!categoryFound) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    if (matchingHandbags) {
      if (!Array.isArray(matchingHandbags)) {
        return res.status(400).json({ message: "Matching handbags must be an array." });
      }
      for (let i = 0; i < matchingHandbags.length; i++) {
        const mh = matchingHandbags[i];
        if (mh.image && (typeof mh.image !== "string" || !mh.image.startsWith("data:image/"))) {
          return res.status(400).json({ message: "Invalid matching handbag image format" });
        }
      }
    }

    if (sweetsQuantity && isNaN(sweetsQuantity)) {
      return res.status(400).json({ message: "sweetsQuantity should be a number." });
    }
    if (preferredSweets && !Array.isArray(preferredSweets)) {
      return res.status(400).json({ message: "preferredSweets must be an array." });
    }

    console.log("Preferred Sweets:", preferredSweets);

    const giftBox = new GiftBoxes({
      category,
      name,
      image,
      description,
      price,
      minOrderQuantity,
      matchingHandbags: matchingHandbags || [],
      sweetsQuantity: sweetsQuantity || 0,
      preferredSweets: preferredSweets || [],
    });

    await giftBox.save();
    res.status(201).json(giftBox);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update Gift Box (updates sweets fields as well)
exports.updateGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBoxes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!giftBox) {
      return res.status(404).json({ message: "Gift Box not found" });
    }
    res.json({ message: "Gift Box updated successfully", giftBox });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Gift Box
exports.deleteGiftBox = async (req, res) => {
  try {
    const giftBox = await GiftBoxes.findByIdAndDelete(req.params.id);
    if (!giftBox) {
      return res.status(404).json({ message: "Gift Box not found" });
    }
    res.json({ message: "Gift Box deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All General Handbags
exports.getAllGeneralHandbags = async (req, res) => {
  try {
    const handbags = await GiftBoxesGeneralHandbags.find().populate("category", "name");
    res.json(handbags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a New General Handbag
exports.createGeneralHandbag = async (req, res) => {
  try {
    const { category, name, image, price, minOrderQuantity } = req.body;
    if (!category || !name || !image || !price || !minOrderQuantity) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const categoryFound = await GiftBoxesCategory.findById(category);
    if (!categoryFound) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }
    const handbag = new GiftBoxesGeneralHandbags({
      category,
      name,
      image,
      price,
      minOrderQuantity,
    });
    await handbag.save();
    res.status(201).json(handbag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update General Handbag
exports.updateGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GiftBoxesGeneralHandbags.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!handbag) {
      return res.status(404).json({ message: "General Handbag not found" });
    }
    res.json({ message: "General Handbag updated successfully", handbag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete General Handbag
exports.deleteGeneralHandbag = async (req, res) => {
  try {
    const handbag = await GiftBoxesGeneralHandbags.findByIdAndDelete(req.params.id);
    if (!handbag) {
      return res.status(404).json({ message: "General Handbag not found" });
    }
    res.json({ message: "General Handbag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};