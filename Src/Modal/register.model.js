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
    pincode: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    state: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    dob: {
        type: String,
        require: false
    },
    gender: {
        type: String,
        require: false
    },
    token: {
        type: String,
        require: false
    },
    avatar: {
        type: String
    }
})

exports.registerModel = mongoose.model("user", registerModel);