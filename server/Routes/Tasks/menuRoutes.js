// routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const menuController = require("../../Controllers/Tasks/MenuController");

router.get("/", menuController.getMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
