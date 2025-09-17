const ApiResponse = require("../Utility/ApiResponse");

exports.loginValildation = async (req, res, next) => {
    const { mobileNo, password } = req.body;
    if (!mobileNo || !password) {
        const errorResponse = await ApiResponse.error("mobile No or password are required", 401, null)
        return res.status(400).json({ data: errorResponse });
    }
    if (mobileNo.length !== 10 || password.length < 6) {
        const errorResponse = await ApiResponse.error("mobile No must 10 digit and password at least 6 characters long", 401, null)
        return res.status(400).json({ data: errorResponse });
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(password)) {
        const errorResponse = await ApiResponse.error("Password can only contain alphanumeric characters and special characters !@#$%^&*", 401, null)
        return res.status(400).json({ data: errorResponse });
    }
    next();
}   