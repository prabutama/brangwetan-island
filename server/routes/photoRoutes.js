const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { addPhoto, deletePhoto, getAllPhoto } = require("../controllers/photoController");
const checkRole = require("../middlewares/checkRole");

router.post("/", authenticateToken, checkRole("admin"), addPhoto);

router.get("/", getAllPhoto);

router.delete("/:id", authenticateToken, checkRole("admin"), deletePhoto);

module.exports = router;
