const jsonwebtoken = require('jsonwebtoken');
const ApiResponse = require('../Utility/ApiResponse');
const ApiEncryptDecrypt = require('../Utility/Encryption');
exports.authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    const errorResponse = ApiResponse.error("Unauthorized access", 404);
    const encryptedError = await ApiEncryptDecrypt.encryptString(
        process.env.Encryption_Decryption_Key,
        JSON.stringify(errorResponse)
    );
    if (!token) {
        return res.status(401).json({ data: encryptedError })
    }
    try {
        const decoded = jsonwebtoken.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request 
        console.log(decoded)
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.log(err);
        if (err.name === 'TokenExpiredError') {
            const errorResponse = ApiResponse.error("Login Token Expire", 401);
            const encryptedError = await ApiEncryptDecrypt.encryptString(
                process.env.Encryption_Decryption_Key,
                JSON.stringify(errorResponse)
            );
            return res.status(401).json({ data: encryptedError })
        }
        const errorResponse = ApiResponse.error("Forbidden access", 401);
        const encryptedError = await ApiEncryptDecrypt.encryptString(
            process.env.Encryption_Decryption_Key,
            JSON.stringify(errorResponse)
        );
        return res.status(403).json({ data: encryptedError })
    }
}