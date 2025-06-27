// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "banquets",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;



const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Default folder is "banquets"
    let folderName = "banquets";

    // Existing condition: Assign "products" folder if request URL contains '/products'
    if (req.originalUrl && req.originalUrl.includes("/products")) {
      folderName = "products";
    }
    // New addition: Assign subfolders under "bulkorders"
    else if (req.originalUrl && req.originalUrl.includes("/bulkorders/categories")) {
      folderName = "bulkorders/categories";
    } else if (req.originalUrl && req.originalUrl.includes("/bulkorders/giftBoxes")) {
      folderName = "bulkorders/giftBoxes";
    } else if (req.originalUrl && req.originalUrl.includes("/bulkorders/generalHandbags")) {
      folderName = "bulkorders/generalHandbags";
    }
    // Preserve your old conditions for giftboxes
    else if (req.originalUrl && req.originalUrl.includes("/categories")) {
      folderName = "giftboxes/categories";
    } else if (req.originalUrl && req.originalUrl.includes("/giftBoxes")) {
      folderName = "giftboxes/giftBoxes";
    } else if (req.originalUrl && req.originalUrl.includes("/generalHandbags")) {
      folderName = "giftboxes/handbags";
    }

    return {
      folder: folderName,
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;