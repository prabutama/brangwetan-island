const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { createModule, getAllModules, getModuleById, updateModule, deleteModule } = require("../controllers/moduleController");
const checkRole = require("../middlewares/checkRole");


router.post("/", authenticateToken, checkRole("admin"), createModule);

router.get("/", getAllModules);
router.get("/:id", getModuleById);

router.put("/:id", authenticateToken, updateModule);

router.delete("/:id", authenticateToken, checkRole("token"), deleteModule);

module.exports = router;
