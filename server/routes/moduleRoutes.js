const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { createModule, getAllModules, getModuleById, updateModule, deleteModule } = require("../controllers/moduleController");


router.post("/", authenticateToken, createModule);

router.get("/", getAllModules);
router.get("/:id", getModuleById);

router.put("/:id", authenticateToken, updateModule);

router.delete("/:id", deleteModule);

module.exports = router;
