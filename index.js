// File: index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./Src/DBConnection/DB');
const path = require("path");
const { loginRouter } = require('./Src/Routes/ApiRoutes/authRoutes.router');
const { productRoutes } = require('./Src/Routes/ApiRoutes/products.router');
const { webRoutes } = require('./Src/Routes/WebRoutes/webRoutes');
const { categoryRouter } = require('./Src/Routes/ApiRoutes/categoryRoutes.router');
const { subcategoryRouter } = require('./Src/Routes/ApiRoutes/subcategoryRoute');
const { bannerRoute } = require('./Src/Routes/ApiRoutes/BannerRoute');
const { profileRoute } = require('./Src/Routes/ApiRoutes/profileRouter');
const { addressRoute } = require('./Src/Routes/ApiRoutes/addressRoute');
// environment setup
dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 5000;
//database connection 
connectDB();

// ejs template engin
app.set("views", path.join(__dirname, '/Src/views'));
app.set('view engine', 'ejs');

// Middleware

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(
  cors({
    origin: ["http://localhost:5174", 'https://ecommerceproject10.netlify.app'], // <-- add all frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // allow cookies/auth headers
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//api routes
app.use("/api/v1/auth", loginRouter);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", subcategoryRouter);
app.use('/api/v1/getBanner', bannerRoute);
app.use('/api/v1', profileRoute);
app.use('/api/v1', addressRoute);

//webRoutes
app.use("/", webRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})