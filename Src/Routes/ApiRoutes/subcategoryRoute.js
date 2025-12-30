
const { subcategoryController } = require('../../Controllers/ApiControllers/subcategoryController');
const { authMiddleware } = require('../../Middlewares/auth.Middleware');

const router = require('express').Router();


router.get('/getAllsubcategories', subcategoryController);

exports.subcategoryRouter = router;