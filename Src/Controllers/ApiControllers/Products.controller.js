const { Products } = require("../../StaticData/products");
const ApiResponse = require("../../Utility/ApiResponse");

exports.getAllProducts = async (req, res) => {
    try {
        if (!Products || Products.length === 0) {
            const errorResponse = await ApiResponse.error("Products not found!", 404);
            // Encrypt the error response
            return res.status(404).json({ data: errorResponse });
        }
        const successResponse = await ApiResponse.success(
            Products,
            "All Products Get Successfully!",
            200
        );
        // Encrypt the success response
        return res.status(200).json({ data: successResponse });

    } catch (err) {
        console.error(err);
        const errorResponse = await ApiResponse.error("Internal server error", 500);
        res.status(500).json({ data: errorResponse });
    }
};

exports.getProductById = async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    // Simulating a database call to get a product by ID
    const product = Products.find(p => p.id === productId);
    if (!product) {
        const errrorResponse = await ApiResponse.error("products not found !", 500);
        return res.status(400).json({ data: errrorResponse });
    }
    // Sending the product as a response
    const successResponse = await ApiResponse.success(product, "Products Get Successfully!", 404);
    return res.status(200).json({ data: successResponse });
}