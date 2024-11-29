const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { createCollaborator, getAllCollaborators, getCollaboratorById, updateCollaborator, deleteCollaborator } = require("../controllers/collaboratorController");

router.post("/", authenticateToken, checkRole(["admin"]), createCollaborator);

router.get("/", authenticateToken, getAllCollaborators);
router.get("/:id", authenticateToken, getCollaboratorById);  

router.put("/:id", authenticateToken, checkRole(["admin"]), updateCollaborator);

router.delete("/:id", authenticateToken, checkRole(["admin"]), deleteCollaborator);
module.exports = router;