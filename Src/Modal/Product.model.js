const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        billPrice: { type: Number, required: true },
        collection: { type: String },
        color: { type: String },
        customerId: { type: String, default: "0" },
        discountPercent: { type: Number, default: 0 },
        heightFeet: { type: Number },
        widthFeet: { type: Number },

        // Foreign keys (relations / lookups)
        collectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
        colorId: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
        gstId: { type: mongoose.Schema.Types.ObjectId, ref: "Gst" },
        materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType" },
        shapeId: { type: mongoose.Schema.Types.ObjectId, ref: "Shape" },
        sizeId: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
        styleId: { type: mongoose.Schema.Types.ObjectId, ref: "Style" },
        unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },

        gstPercent: { type: Number },
        hsnCode: { type: String },

        // Booleans
        bestSeller: { type: Boolean, default: false },
        custom: { type: Boolean, default: false },
        newArrival: { type: Boolean, default: false },
        outOfStock: { type: Boolean, default: false },
        washable: { type: Boolean, default: false },

        mrpPrice: { type: Number },
        mainCartId: { type: String },
        material: { type: String },
        cartId: { type: String },
        productDetailsId: { type: String },

        description: { type: String },
        name: { type: String, required: true },
        otherImage: { type: String },
        quantity: { type: Number, default: 1 },
        roomType: { type: String },
        sku: { type: String },
        salePrice: { type: Number },

        shape: { type: String },
        style: { type: String },
        thumbnail: { type: String },
        unit: { type: String },
        variant: { type: String },
        variantImage: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
