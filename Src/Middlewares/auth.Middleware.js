// const jsonwebtoken = require('jsonwebtoken');
// const ApiResponse = require('../Utility/ApiResponse');
// const ApiEncryptDecrypt = require('../Utility/Encryption');
// exports.authMiddleware = async (req, res, next) => {
//     const token = req.headers['authorization'];
//     const errorResponse = ApiResponse.error("Unauthorized access", 404);
//     if (!token) {
//         return res.status(401).json({ data: errorResponse })
//     }
//     try {
//         const decoded = jsonwebtoken.verify(token.split(' ')[1], process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to request
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         console.log(err);
//         if (err.name === 'TokenExpiredError') {
//             const errorResponse = ApiResponse.error("Login Token Expire", 401);
//             return res.status(401).json({ data: errorResponse })
//         }
//         const errorResponse = ApiResponse.error("Forbidden access", 401);

//         return res.status(403).json({ data: errorResponse })
//     }
// }
const jsonwebtoken = require("jsonwebtoken");
const ApiResponse = require("../Utility/ApiResponse");

exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ data: await ApiResponse.error("Unauthorized access", 401) });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (id, role, etc.)
        return next();
    } catch (err) {
        console.error("Auth error:", err);
        if (err.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ data: await ApiResponse.error("Login Token Expired", 401) });
        }
        return res
            .status(401)
            .json({ data: await ApiResponse.error("Invalid or Forbidden Token", 401) });
    }
};
