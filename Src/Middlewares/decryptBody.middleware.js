const ApiResponse = require("../Utility/ApiResponse");
const ApiEncryptDecrypt = require("../Utility/Encryption");

async function decryptBody(req, res, next) {
    try {
        if (req.body) {
            // Decrypt request
            if (req.body.encrypted) {
                const decryptedString = await ApiEncryptDecrypt.decryptString(
                    process.env.Encryption_Decryption_Key,
                    req.body.encrypted
                );
                // Replace encrypted body with parsed 
                req.body = JSON.parse(decryptedString);
            }
            else {
                const errorResponse = await ApiResponse.error("invalid Request!", 404, null)
                return res.json({ data: errorResponse })
            }
        }
        next();
    } catch (error) {
        console.error("Body decryption failed:", error);
        return res.status(400).json({ error: "Invalid encrypted request body" });
    }
}

module.exports = decryptBody;
