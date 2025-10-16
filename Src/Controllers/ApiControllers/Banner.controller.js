const bannerModel = require("../../Modal/Banner");
const ApiResponse = require("../../Utility/ApiResponse");

exports.getBanner = async (req, res) => {

    try {
        const doc = await bannerModel.find();
        
        const resSuccess = await ApiResponse.success(doc, 'Banner Get SuccessFully', 200);
        return res.json({ data: resSuccess })
    } catch (error) {
        const resError = ApiResponse.error(`${error.message || 'Serer Error During Banner Api call'}`, 500);
        res.json({ data: resError })
    }
}