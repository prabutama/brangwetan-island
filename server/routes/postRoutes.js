const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");

router.post("/", authenticateToken, createPost);

router.get("/", authenticateToken, getAllPosts);
router.get("/:id", authenticateToken, getPostById);

router.put("/:id", authenticateToken, updatePost);

router.delete("/:id", authenticateToken, deletePost);

module.exports = router;