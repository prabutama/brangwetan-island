const { Module } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../uploads/modules");
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
    limits: { fileSize: 5 * 2048 * 2048 },
});

exports.createModule = [
    upload.single('content'),
    async (req, res) => {
        const { title, description, type, content } = req.body;
        console.log("Request Body:", req.body);

        if (!title || !description || !type) {
            return res.status(400).json({ message: "title, description, and type are required" });
        }

        try {
            let savedContent = content;
            if (type === "image") {
                if (!req.file) {
                    return res.status(400).json({ message: "Image file is required for type 'image'" });
                }
                savedContent = `/uploads/modules/${req.file.filename}`;
            } else if (type === "video") {
                if (!content || !content.startsWith("http")) {
                    return res.status(400).json({ message: "Valid video URL is required for type 'video'" });
                }
            }

            const module = await Module.create({
                title,
                description,
                type,
                content: savedContent,
            });

            res.status(201).json({ message: "Module created successfully", module });
        } catch (error) {
            res.status(500).json({ message: "Error creating module", error: error.message });
        }
    },
];


exports.getAllModules = async (req, res) => {
    try {
        const modules = await Module.findAll();
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Error fetching modules", error: error.message });
    }
};


exports.getModuleById = async (req, res) => {
    const moduleId = req.params.id;
    try {
        const module = await Module.findByPk(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json({ module });
    } catch (error) {
        res.status(500).json({ message: "Error fetching module", error: error.message });
    }
};

exports.updateModule = async (req, res) => {
    const moduleId = req.params.id;
    const { title, description } = req.body;
    console.log("Request Body:", req.body);
    try {
        const module = await Module.findByPk(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        
        module.title = title;
        module.description = description;

        await module.save();
        res.status(200).json({ message: "Module updated successfully", module });
    } catch (error) {
        res.status(500).json({ message: "Error updating module", error: error.message });
    }
};

exports.deleteModule = async (req, res) => {
    const moduleId = req.params.id;

    try {
        const module = await Module.findByPk(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        if (module.type === "image" && module.content) {
            const imagePath = path.join(__dirname, "../uploads/modules", path.basename(module.content));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`File deleted: ${imagePath}`);
            }
        }

        await module.destroy();

        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting module", error: error.message });
    }
};
