const { mongoose } = require("mongoose");

const registerModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: false
    }
})

exports.registerModel = mongoose.model("user", registerModel);