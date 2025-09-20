const categoryModel = require("../../Modal/category.model");
const ApiResponse = require("../../Utility/ApiResponse")

exports.categoryController = async (req, res) => {

    try {
        const categories = await categoryModel.find();
        const successResponse = await ApiResponse.success(categories, "category get successfully!", 200)
        return res.json({ data: successResponse });
    } catch (error) {
        const errorResponse = await ApiResponse.error("something went wrong !,during fetch categories", 500, null)
        res.json({ data: errorResponse });
    }
}