const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String,
    image: Array,
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number }, // If product has a discount or special price
    discountPercent: { type: Number, default: 0 }, // 10 means 10%
    quantity: { type: Number, default: 1, min: 1 },
    subtotal: { type: Number, default: 0 },
});

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [cartItemSchema],
        totalItems: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 },
        totalDiscount: { type: Number, default: 0 }, // New: Total discount in ₹
        grandTotal: { type: Number, default: 0 }, // After all discounts
    },
    { timestamps: true }
);

// 🧮 Auto calculate before saving
cartSchema.pre("save", function (next) {
    this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);

    this.items.forEach(item => {
        const price = item.discountPrice || item.originalPrice;
        item.subtotal = price * item.quantity;
    });

    this.totalPrice = this.items.reduce(
        (acc, item) => acc + item.originalPrice * item.quantity,
        0
    );

    this.totalDiscount = this.items.reduce((acc, item) => {
        const diff = item.originalPrice - (item.discountPrice || item.originalPrice);
        return acc + diff * item.quantity;
    }, 0);

    this.grandTotal = this.totalPrice - this.totalDiscount;

    next();
});
exports.cartModel = mongoose.model("Cart", cartSchema);
