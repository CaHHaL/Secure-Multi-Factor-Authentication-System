const express = require("express");
const router = express.Router();
const { signup, login, verifyOTP, refreshToken, logout } = require("../controllers/auth.controller");
const rateLimiter = require("../middleware/rateLimiter");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/login", rateLimiter, login);
router.post("/verify-otp", verifyOTP);
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You have accessed a protected route",
        user: req.user,
    });
});
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
