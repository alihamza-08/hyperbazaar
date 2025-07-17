// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user-models');

const authenticateUser = async (req, res, next) => {
    // Extract the JWT token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database using the decoded user ID
        const user = await User.findById(decoded.userId);

        // Attach the user object to the request for further processing
        req.user = user;

        // Call next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateUser;
