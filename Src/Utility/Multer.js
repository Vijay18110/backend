const multer = require("multer");
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, and WEBP files are allowed"), false);
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); // folder to save files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // rename file
    },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
