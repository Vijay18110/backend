
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
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        a {
          background: white;
          color: #4facfe;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          background: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Welcome to My Server</h1>
      <p>Your backend is up and running successfully!</p>
    
    </body>
    </html>
  `);
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