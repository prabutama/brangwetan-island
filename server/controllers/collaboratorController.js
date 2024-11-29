const { Collaborator } = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/collaborators');
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

exports.createCollaborator = [
    upload.single('image'),
    async (req, res) => {
        const { name, website_link } = req.body;

        try {
            if (!req.file) {
                return res.status(400).json({ message: "Image file is required!" });
            }

            const imagePath = `/uploads/collaborators/${req.file.filename}`;

            const collaborator = await Collaborator.create({
                name,
                website_link,
                image: imagePath,
            });

            res.status(201).json({
                message: "Collaborator created successfully",
                collaborator,
            });
        } catch (error) {
            res.status(400).json({ message: "Error creating collaborator", error: error.message });
        }
    },
];

exports.getAllCollaborators = async (req, res) => {
    try {
        const collaborators = await Collaborator.findAll();
        res.status(200).json({ collaborators });
    } catch (error) {
        res.status(400).json({ message: "Error fetching collaborators", error: error.message });
    }
};

exports.getCollaboratorById = async (req, res) => {
    const collaboratorId = req.params.id;
    try {
        const collaborator = await Collaborator.findByPk(collaboratorId);
        if (!collaborator) {
            return res.status(404).json({ message: "Collaborator not found" });
        }
        res.status(200).json({ collaborator });
    } catch (error) {
        res.status(400).json({ message: "Error fetching collaborator", error: error.message });

    }
};

exports.updateCollaborator = async (req, res) => {
    const collaboratorId = req.params.id;
    const { name, website_link } = req.body;
    try {
        const collaborator = await Collaborator.findByPk(collaboratorId);
        if (!collaborator) {
            return res.status(404).json({ message: "Collaborator not found" });
        }
        collaborator.name = name;
        collaborator.website_link = website_link;
        await collaborator.save();
        res.status(200).json({ message: "Collaborator updated successfully", collaborator });
    } catch (error) {
        res.status(400).json({ message: "Error updating collaborator", error: error.message });
    }
};

exports.deleteCollaborator = async (req, res) => {
    const collaboratorId = req.params.id;

    try {
        const collaborator = await Collaborator.findByPk(collaboratorId);
        if (!collaborator) {
            return res.status(404).json({ message: "Collaborator not found" });
        }

        const imagePath = path.join(__dirname, "../uploads/collaborators", path.basename(collaborator.image));

        await collaborator.destroy();

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); 
            console.log(`File deleted: ${imagePath}`);
        } else {
            console.warn(`File not found: ${imagePath}`);
        }

        res.status(200).json({ message: "Collaborator deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting collaborator", error: error.message });
    }
};
