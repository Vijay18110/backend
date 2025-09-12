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
        const errorResponse = ApiResponse.error("Internal server error", 500);
        res.status(500).json({ data: errorResponse });
    }
};
exports.getProductById = async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    // Simulating a database call to get a product by ID
    const product = Products.find(p => p.id === productId);
    if (!product) {
        const errrorResponse = ApiResponse.error("products not found !", 500);
        const errrorResponse1 = await ApiEncryptDecrypt.encryptString(
            process.env.Encryption_Decryption_Key,
            JSON.stringify(errrorResponse)
        );
        return res.status(400).json({ data: errrorResponse1 });
    }
    // Sending the product as a response
    const successResponse = ApiResponse.success(product, "Products Get Successfully!", 404);
    const successResponse1 = await ApiEncryptDecrypt.encryptString(
        process.env.Encryption_Decryption_Key,
        JSON.stringify(successResponse)
    );
    return res.status(200).json({ data: successResponse1 });
}