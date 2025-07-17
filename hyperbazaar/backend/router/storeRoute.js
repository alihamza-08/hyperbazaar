// // storeRoutes.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const storeController = require("../controllers/storeController");
// const  formidable = require("express-formidable");
// const router = express.Router();

// // Apply body-parser middleware to parse JSON and URL-encoded bodies for this router
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// // Route for creating a new store
// router.post(
//     "/createStore", 
//     // formidable(),
// storeController.storeController);
// router.post("/find-store", storeController.findStoreController);
// router.get("/find-store/:id", storeController.getImage);
// module.exports = router;


const express = require("express");
const bodyParser = require("body-parser");
const storeController = require("../controllers/storeController");
const multer = require("multer");
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
// Apply body-parser middleware to parse JSON and URL-encoded bodies for this router
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination folder where uploaded images will be stored
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        // Define the file name for the uploaded image
        cb(null, file.originalname);
    }
});

// Initialize Multer middleware with the specified storage configuration
const upload = multer({ storage: storage });

// Route for creating a new store with image upload
router.post(
    "/createStore",
    // authenticateUser,
    upload.single("image"), // Handle single image upload with field name "image"
    storeController.storeController
);

// Route for finding a store
router.post("/find-store", storeController.findStoreController);
router.get("/find-store/:id", storeController.getImage);


module.exports = router;
