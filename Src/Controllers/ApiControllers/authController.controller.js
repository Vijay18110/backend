const jsonwebtoken = require('jsonwebtoken');
const { registerModel } = require('../../Modal/register.model');
const ApiResponse = require('../../Utility/ApiResponse');
exports.login = async (req, res) => {
    const { mobileNo, password } = req.body;
    // Here you would typically check the mobileNo and password against a database
    try {
        const doc = await registerModel.findOne({ mobile: mobileNo, password: password });
        if (doc) {
            // If the credentials are valid, you might generate a token or set a session
            // For this example, we'll just send a success message
            // In a real application, you would return a JWT or session ID here
            const { _id, mobile, name } = doc.toObject()
            const token = jsonwebtoken.sign({ _id, mobile, name }, process.env.JWT_SECRET, { expiresIn: '10m' });
            const successResponse = await ApiResponse.success({ token: token }, "Login successful", 200);
            // Encrypt the error response
            // const encryptedRes = await ApiEncryptDecrypt.encryptString(
            //     process.env.Encryption_Decryption_Key,
            //     JSON.stringify(errorResponse)
            // );
            await registerModel.updateOne({ _id: doc._id }, { token: token });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // only over HTTPS
                // sameSite: "Strict",
            });
            res.json({ data: successResponse });
        } else {
            const errorResponse = await ApiResponse.error("Invalid credentials", 401);
            // Encrypt the error response

            res.status(401).json({ data: errorResponse });
        }
    } catch (error) {
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.headers && req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            const errorResponse = await ApiResponse.error('No token found, already logged out.', 401, null);
            return res.json({ data: errorResponse });
        }

        let decodedToken;
        try {
            decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // Token expired or invalid
            const errorResponse = await ApiResponse.error("Token expired or invalid.", 401, null);
            return res.json({ data: errorResponse });
        }
        const doc = await registerModel.findOne({ mobile: decodedToken?.mobileNo });
        if (!doc) {
            const errorResponse = await ApiResponse.error("Invalid token!", 401, null);
            return res.json({ data: errorResponse });
        }

        if (!doc?.token) {
            const errorResponse = await ApiResponse.error("Invalid token!", 401, null);
            return res.json({ data: errorResponse });
        }

        // Clear token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });


        // Invalidate token in DB
        await registerModel.updateOne(
            { mobile: decodedToken.mobileNo },
            { token: "" }
        );

        const successResponse = await ApiResponse.success(null, "Logout successful!", 200);
        return res.json({ data: successResponse });

    } catch (err) {
        console.error("Logout error:", err);
        const errorResponse = await ApiResponse.error("Server error during logout.", 500, null);
        return res.json({ data: errorResponse });
    }
};
