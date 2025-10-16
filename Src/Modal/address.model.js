const { default: mongoose } = require("mongoose");



const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // relationship width users works as foreign key
    address: { type: String, require: true },
    type: { type: String, require: true },
    pinCode: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    isDefault: { type: Boolean, default: true }
}, { timestamps: true })

const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel;