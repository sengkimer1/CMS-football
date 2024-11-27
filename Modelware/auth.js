const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Verifying token..."); // Add this log
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("Token verification failed:", err); // Add this log
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = { verifyToken };
