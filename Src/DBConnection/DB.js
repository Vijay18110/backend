const { default: mongoose } = require("mongoose")

exports.connectDB = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log(`Database connected successfully`)
    }).catch((err) => console.log(err))
}
