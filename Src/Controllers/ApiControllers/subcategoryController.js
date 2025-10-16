
const subcategoryModel = require("../../Modal/subcategory.model");
const ApiResponse = require("../../Utility/ApiResponse")

exports.subcategoryController = async (req, res) => {
    try {

        const subcategory = await subcategoryModel.find();
        const successResponse = await ApiResponse.success(subcategory, "subcategory get successfully!", 200)
        return res.json({ data: successResponse });
    } catch (error) {
        const errorResponse = await ApiResponse.error("something went wrong !,during fetch subcategory", 500, null)
        res.json({ data: errorResponse });
    }
}