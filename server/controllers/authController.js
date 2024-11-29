const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User, TokenBlacklist } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587, // Gunakan port 587 untuk STARTTLS
    secure: false, // Harus false untuk STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error registering user", Error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );
        res.json({
            "token": token,
            "user": {
                id: user.user_id, name: user.name, email: user.email, role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", Error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>You requested a password reset.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetURL}" target="_blank">${resetURL}</a>
                <p>This link will expire in 1 hour.</p>
            `,
        });
        res
            .status(200)
            .json({ message: "Password reset link has been sent to your email." });
    } catch (error) {
        res.status(500).json({
            message: "Error processing forgot password",
            error: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error resetting password", error: error.message });
    }
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        await TokenBlacklist.create({ token });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error logging out", error: error.message });
    }
};