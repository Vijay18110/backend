
const ApiEncryptDecrypt = require("./Encryption");
// utils/ApiResponse.js
class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        const responsePayload = {
            statusCode,
            success: statusCode >= 200 && statusCode < 300,
            message,
            data
        };
        // Encrypt the entire object and return string
        return ApiEncryptDecrypt.encryptString(
            process.env.Encryption_Decryption_Key,
            JSON.stringify(responsePayload)
        );
    }
    static success(data, message = "Success", statusCode = 200) {
        return new ApiResponse(statusCode, data, message);
    }
    static error(message = "Something went wrong", statusCode = 500, data = null) {
        return new ApiResponse(statusCode, data, message);
    }
}

module.exports = ApiResponse;



