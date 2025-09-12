// utils/ApiResponse.js
class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        this.statusCode = statusCode;
        this.success = statusCode >= 200 && statusCode < 300;
        this.message = message;
        this.data = data;
    }
    static success(data, message = "Success", statusCode = 200) {
        return new ApiResponse(statusCode, data, message);
    }

    static error(message = "Something went wrong", statusCode = 500, data = null) {
        return new ApiResponse(statusCode, data, message);
    }
}
module.exports = ApiResponse;
