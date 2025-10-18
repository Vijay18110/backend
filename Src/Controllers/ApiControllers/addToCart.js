const { cartModel } = require("../../Modal/cart.model");
const ProductModel = require("../../Modal/Product.model");
const ApiResponse = require("../../Utility/ApiResponse");

exports.addToCart = async (req, res) => {

    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        if (!productId) {
            const errorRes = await ApiResponse.error('productId is required !', 400);
            return res.json({ data: errorRes });
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            const errRes = await ApiResponse.error("Product not found", 400);
            return res.status(400).json({ data: errRes });
        }
        // find user or create
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId: userId,
                items: []
            })
        }

        const isExistingProduct = cart?.items.find((item) => item?.productId.toString() === productId);
        if (isExistingProduct) {
            // update only quanttity;
            isExistingProduct["quantity"] = Number(isExistingProduct["quantity"] + Number(quantity));
        }
        else {
            // add new product
            cart.items.push({
                productId,
                name: product.name,
                image: product.images,
                quantity,
                originalPrice: product.price,
                offerPrice: product.offerPrice || product.price, // if offer exists
                discountPercent: product.discountPercent || 0,
            });
        }

        await cart.save()
        const successRes = await ApiResponse.success(cart, 'Cart updated successfully !', 200)
        res.status(200).json({ data: successRes });
    } catch (error) {
        console.log(error)
        const err = await ApiResponse.error('Something Went Wrong ! during add Product to cart', 500);
        res.json({ data: err })
    }
}



exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ userId });
        const successRes = await ApiResponse.success(cart, 'Cart Get SuccessFully !', 200)
        res.status(200).json({ data: successRes });
    } catch (error) {
        console.error(error);
        const successRes = await ApiResponse.error('Something Went During Fetch Cart !', 500)

        res.status(500).json({ data: successRes });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            const errorRes = await ApiResponse.error("Cart not found", 404)
            return res.status(404).json({ data: errorRes });
        }
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );
        await cart.save();
        const successRes = await ApiResponse.error("Item Removed Success !", 200);
        return res.status(200).json({ data: successRes });
    } catch (error) {
        console.error(error);
        const errorRes = await ApiResponse.error("Error removing item", 404)

        res.status(500).json({ data: errorRes });
    }
};





exports.updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user._id; // consistent with auth middleware
        const { productId, flag } = req.body;

        // Validate quantity
        if (!flag) {
            const errorRes = await ApiResponse.error("flag is required or valid", 400);
            return res.status(400).json({ data: errorRes });
        }
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            const errorRes = await ApiResponse.error("Cart Data Found Empty", 404);
            return res.status(404).json({ data: errorRes });
        }

        // Find item in the cart
        const item = cart.items.find(
            (i) => i.productId.toString() === productId
        );

        if (!item) {
            const errorRes = await ApiResponse.error("Item not found in cart", 500);
            return res.status(404).json({ data: errorRes });
        }
        if (flag != 'increament' && flag != 'decreament') {
            const errorRes = await ApiResponse.error("Invalid Flag !", 500);
            return res.json({ data: errorRes });
        }
        // Update quantity
        if (flag === 'increament') {
            item.quantity += 1;
        }
        if (flag === 'decreament') {
            if (item.quantity == 1) {
                cart.items = cart.items.filter(
                    (item) => item.productId.toString() !== productId
                );
            } else {
                item.quantity -= 1;
            }
        }

        // Recalculate totals (triggers pre('save') in schema)
        await cart.save();
        const successRes = await ApiResponse.success(null, "Quantity updated successfully!", 200, {
            cart,
        });
        return res.status(200).json({ data: successRes });

    } catch (error) {
        console.error("Error updating cart quantity:", error);
        const errorRes = await ApiResponse.error("Error updating quantity", 500);
        return res.status(500).json({ data: errorRes });
    }
};
