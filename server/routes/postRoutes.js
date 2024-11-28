const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { createPost, getAllPosts } = require("../controllers/postController");

router.post("/", authenticateToken, createPost);
router.get("/", authenticateToken, getAllPosts);

module.exports = router;