const { registerModel } = require("../../Modal/register.model");
const ApiResponse = require("../../Utility/ApiResponse");

exports.register = async (req, res, next) => {
    try {
        const { name, mobile, email, password } = req.body;
        const isExist = await registerModel.findOne({ $or: [{ mobile: mobile }, { email: email }] });
        if (isExist) {
            const errorResponse = await ApiResponse.error(`User With ${email} or ${mobile} Is already exists`, 500, null)
            return res.json({ data: errorResponse })
        }
        const doc = await registerModel({
            name, email, password, mobile
        })
        const res1 = await doc.save();
        const { __v, password: P, ...safeRes } = res1.toObject();
        const successResponse = await ApiResponse.success(safeRes, "Resgistration Successfull!", 501, null)
        return res.json({ data: successResponse });
    } catch (error) {
        const errorResponse = await ApiResponse.error("Internal Server Error!", 500, null)
        return res.json({ data: errorResponse })
    }
}