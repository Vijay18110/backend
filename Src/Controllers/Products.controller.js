const { Products } = require("../StaticData/products");
const ApiResponse = require("../Utility/ApiResponse");
const ApiEncryptDecrypt = require('../Utility/Encryption')
exports.getAllProducts = async (req, res) => {
    try {
        if (!Products || Products.length === 0) {
            const errorResponse = ApiResponse.error("Products not found!", 404);

            // Encrypt the error response
            const encryptedError = await ApiEncryptDecrypt.encryptString(
                process.env.Encryption_Decryption_Key,
                JSON.stringify(errorResponse)
            );

            return res.status(404).json({ data: encryptedError });
        }
        const successResponse = ApiResponse.success(
            Products,
            "All Products Get Successfully!",
            200
        );

        // Encrypt the success response
        const encryptedSuccess = await ApiEncryptDecrypt.encryptString(
            process.env.Encryption_Decryption_Key,
            JSON.stringify(successResponse)
        );

        return res.status(200).json({ data: encryptedSuccess });

    } catch (err) {
        console.error(err);
        res.status(500).json(ApiResponse.error("Internal server error"));
    }
};
exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    // Simulating a database call to get a product by ID
    const product = Products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json(ApiResponse.error("products not found !"));
    }
    // Sending the product as a response
    res.status(200).json(ApiResponse.success(product, "Products Get Successfully !"));
}