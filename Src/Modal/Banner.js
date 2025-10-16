const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema({
    bannerUrl: { type: String, require: true },
    bannerName: { type: String, require: false },
}, { timestamps: true })

const bannerModel = mongoose.model('banner', bannerSchema);
module.exports = bannerModel;