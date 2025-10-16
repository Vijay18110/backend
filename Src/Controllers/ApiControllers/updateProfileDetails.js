const { registerModel } = require("../../Modal/register.model");
const ApiResponse = require("../../Utility/ApiResponse");
const uploadToCloudinary = require("../../Utility/Cloudinary");

exports.updateProfileDetails = async (req, res) => {
    if (!Object.entries(req.body).length) {
        const errorsRes = await ApiResponse.error('Send Fields You Want To Update', 400);
        return res.json({ data: errorsRes })
    }
    const { mobile, ...restData } = req.body;
    const userId = req.user._id;
    const doc = await registerModel.findOneAndUpdate({ _id: userId }, restData);
    const successRes = await ApiResponse.success(null, 'Profile Data Updated Successfully', 200);
    res.json({ data: successRes })
}

exports.updateProfilePic = async (req, res) => {
    try {
        const uploadUrl = await uploadToCloudinary(req.file.path);
        const userId = req.user._id;
        const doc = await registerModel.findOneAndUpdate({ _id: userId }, { avatar: uploadUrl });
        const successRes = await ApiResponse.success(null, 'Profile Picture Updated Successfully', 200);
        res.json({ data: successRes })
    } catch (error) {
        console.log(error);
        const errorResponse = await ApiResponse.error("something went wrong !,during update Profile Picture", 500, null)
        res.json({ data: errorResponse })
    }
}