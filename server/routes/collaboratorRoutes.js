const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { createCollaborator, getAllCollaborators, getCollaboratorById, updateCollaborator, deleteCollaborator } = require("../controllers/collaboratorController");

router.post("/", authenticateToken, checkRole("admin"), createCollaborator);

router.get("/", getAllCollaborators);
router.get("/:id", getCollaboratorById);  

router.put("/:id", updateCollaborator);

router.delete("/:id", authenticateToken, checkRole("admin"), deleteCollaborator);
module.exports = router;