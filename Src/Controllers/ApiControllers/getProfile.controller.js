const { registerModel } = require("../../Modal/register.model");
const ApiResponse = require("../../Utility/ApiResponse");



exports.getProfileData = async (req, res) => {
    try {
        const doc = await registerModel.findOne({ _id: req.user._id }).select('-_id -token -__v');
        const successRes = await ApiResponse.success(doc, 'Profile Data Get Successfully', 200)
        return res.json({ data: successRes })
    } catch (error) {
        console.log(error);
        const errorRes = await ApiResponse.error('Profile Data Get Successfully', 500)
        res.json({ data: errorRes });
    }
}