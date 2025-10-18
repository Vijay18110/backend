const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        discountPercent: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discountPrice: {
            type: Number,
            default: null,
        },
        currency: {
            type: String,
            default: "INR",
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        sku: {
            type: String,
            unique: true,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true, // main category
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null, // optional
        },
        brand: {
            type: String,
        },
        images: [
            {
                url: String,
                alt: String,
            },
        ],
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        attributes: {
            color: String,
            size: String,
            weight: String,
            material: String,
        },
        rating: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", productSchema, "product");
