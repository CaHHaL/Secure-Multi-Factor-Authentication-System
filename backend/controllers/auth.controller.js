const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../utils/otp");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        // 5. Response
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(403).json({
                message: "Account temporarily locked due to multiple failed attempts",
            });
        }

        // 4. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            user.failedLoginAttempts += 1;

            // Lock account after 5 failures
            if (user.failedLoginAttempts >= 5) {
                user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
            }

            await user.save();
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 5. Reset counters on successful login
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        // 6. Generate OTP
        const otp = generateOTP();

        // 7. Hash OTP
        const hashedOTP = await bcrypt.hash(otp, 10);

        // 8. Store OTP & expiry
        user.otp = hashedOTP;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        // 9. Send OTP (console for now)
        console.log(`OTP for ${email}: ${otp}`);

        res.status(200).json({
            message: "OTP sent. Please verify to complete login.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });

        if (!user || !user.otp || !user.otpExpires) {
            return res.status(400).json({ message: "OTP not found or expired" });
        }

        // Check expiry
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Compare OTP
        const isValidOTP = await bcrypt.compare(otp, user.otp);

        if (!isValidOTP) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // Clear OTP after successful verification
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Store refresh token
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: "Authentication successful",
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            accessToken: newAccessToken,
        });

    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token required" });
        }

        const user = await User.findOne({ refreshToken });

        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

