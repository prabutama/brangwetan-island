const { Post, User } = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type! Only jpg, jpeg, and png are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 2000 * 2000 },
});

exports.createPost = [
    upload.single('image'),
    async (req, res) => {
        const { title, description } = req.body;
        const userId = req.user.id;

        try {
            if (!req.file) {
                return res.status(400).json({ message: "Image file is required!" });
            }

            const imagePath = `/uploads/${req.file.filename}`;

            const post = await Post.create({
                title,
                description,
                image: imagePath,
                user_id: userId,
            });

            const user = await User.findByPk(userId);

            res.status(201).json({
                message: "Post created successfully",
                post,
                user,
            });
        } catch (error) {
            res.status(400).json({ message: "Error creating post", error: error.message });
        }
    },
];

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: User });
        res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json({ message: "Error fetching posts", error: error.message });
    }
};
