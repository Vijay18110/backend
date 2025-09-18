
// File: index.js
const express = require('express');
const dotenv = require('dotenv');

const sendOTP = require('./Src/Utility/sendOTPUsingFast92MSG');
const cors = require('cors');
const { connectDB } = require('./Src/DBConnection/DB');
const path = require("path");
const { loginRouter } = require('./Src/Routes/ApiRoutes/authRoutes.router');
const { productRoutes } = require('./Src/Routes/ApiRoutes/products.router');
const { webRoutes } = require('./Src/Routes/WebRoutes/webRoutes');
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT;
//database connection
connectDB();



// ejs template engine
app.set("views", path.join(__dirname, '/Src/views'))
app.set('view engine', 'ejs')


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//api routes
app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/product", productRoutes);
//webRoutes
app.use("/", webRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})