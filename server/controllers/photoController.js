const { Photo } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../uploads/photos");
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
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type! Only JPG, JPEG, and PNG are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

exports.addPhoto = [
    upload.single("photo"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Photo file is required" });
            }

            const photoUrl = `/uploads/photos/${req.file.filename}`;

            const newPhoto = await Photo.create({ photo_url: photoUrl });

            res.status(201).json({
                message: "Photo added successfully",
                data: newPhoto,
            });
        } catch (error) {
            console.error("Error adding photo:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
];

exports.getAllPhoto = async (req, res) => {
    try {
        const photos = await Photo.findAll();
        res.status(200).json({ photos });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        const photo = await Photo.findByPk(id);

        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        const photoPath = path.join(__dirname, "../uploads/photos", path.basename(photo.photo_url));
        if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
            console.log(`File deleted: ${photoPath}`);
        }

        await photo.destroy();

        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
