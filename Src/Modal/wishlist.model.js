const mongoose = require("mongoose");


const wishlistItemSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, wishList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            }
        ],

        addedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Optional: prevent duplicate wishlist entries for same user + product
wishlistItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

exports.wishlistModel = mongoose.model("WishlistItem", wishlistItemSchema);
