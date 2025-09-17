const ApiResponse = require("../Utility/ApiResponse");
const { validateEmail, validateMobile } = require("../Utility/validation");

exports.registerValidation = async (req, res, next) => {
    try {
        const { name, mobile, email, password } = req.body;
        const isEmpty = [name, mobile, email, password].some((item) => !item?.trim())
        if (isEmpty) {
            const errorResponse = await ApiResponse.error("All the Fields Required!", 501, null)
            return res.json({ data: errorResponse })
        }
        if (!validateEmail(email)) {
            const errorResponse = await ApiResponse.error("Invalid Email!", 501, null)
            return res.json({ data: errorResponse })
        }
        if (!validateMobile(mobile)) {
            const errorResponse = await ApiResponse.error("Invalid mobile Number!", 501, null)
            return res.json({ data: errorResponse })
        }
        next()
    } catch (error) {
        const errorResponse = await ApiResponse.error("Internal Server Error!", 500, null)
        return res.json({ data: errorResponse })
    }
}