
// File: index.js
const express = require('express');
const dotenv = require('dotenv');
const { loginRouter } = require('./Src/Routes/authRoutes.router');
const { productRoutes } = require('./Src/Routes/products');
const sendOTP = require('./Src/Utility/sendOTPUsingFast92MSG');
const cors = require('cors');
const { connectDB } = require('./Src/DBConnection/DB');
dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT;
//database connection
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
//routes

//
app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/product", productRoutes);
app.get('/', (req, res) => {
    res.send('Serer is running!');
});
app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    try {
        const otp = await sendOTP(phoneNumber);
        res.json({ success: true, message: 'OTP sent successfully', otp }); // Remove `otp` from response in production
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})