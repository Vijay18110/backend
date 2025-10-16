const { getProfileData } = require('../../Controllers/ApiControllers/getProfile.controller');
const { updateProfileDetails, updateProfilePic } = require('../../Controllers/ApiControllers/updateProfileDetails');
const { authMiddleware } = require('../../Middlewares/auth.Middleware');
const decryptBody = require('../../Middlewares/decryptBody.middleware');
const upload = require('../../Utility/Multer');

const router = require('express').Router();


router.get('/getProfileDetails', authMiddleware, getProfileData);
router.post('/updateProfileDetails', authMiddleware, decryptBody, updateProfileDetails);
router.post('/updateProfilePicture', authMiddleware, (req, res) => {
    upload.single("avatar")
        (req, res, (err) => {
            if (err) {
                // File type validation or multer error
                return res.status(400).json({
                    success: false,
                    message: err.message || "File upload failed",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }

            // Call your main controller function manually now
            updateProfilePic(req, res);
        });
});
exports.profileRoute = router;