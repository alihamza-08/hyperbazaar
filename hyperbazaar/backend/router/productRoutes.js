
const express = require("express");
const router = express.Router();
const authProduct = require("../controllers/productController");
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const  formidable = require("express-formidable");


//routes
router.post(
  "/create-product",
//   requireSignIn,
//   isAdmin,
formidable(),
authProduct.createProductController);
//routes
router.put(
  "/update-product/:pid",
//   requireSignIn,
//   isAdmin,
  formidable(),
  authProduct.updateProductController
);

//get products
router.get("/get-product", authProduct.getProductController);

//single product
router.get("/get-product/:slug", authProduct.getSingleProductController);

//get photo
router.get("/product-photo/:pid", authProduct.productPhotoController);

//delete rproduct
router.delete("/product/:pid", authProduct.deleteProductController);
// category wise product 
router.get("/product-category/:slug", authProduct.productCategoryController);

// Define route for retrieving products associated with a specific store
router.post("/storefind/:storeId/products", authProduct.getProductByStoreId);

// Create offer route
router.post("/create-offer", authProduct.createOfferController);

// Route to get offer for a specific product
router.get("/:productId/offer", authProduct.getOfferForProductController);

// // Route to apply offer on a product
// router.post("/apply-offer/:productId", authProduct.applyOfferOnProductController);

// // Route to remove offer on a product
// router.delete("/remove-offer/:productId", authProduct.removeOfferOnProductController);

// Route to apply offer on a product
router.put("/apply-offer", authProduct.applyOfferOnProductController);

// Route to remove offer on a product
router.put("/remove-offer/:productId", authProduct.removeOfferOnProductController);

// Route to get products created by a specific user
router.get("/:userId",  authProduct.getProductsByUserIdController);

// Get all offers created by a specific user
router.get('/user/:userId', authProduct.getOffersByUser);

// Delete an offer
router.delete('/:offerId', authProduct.deleteOffer);

// Update an offer
router.put('/:offerId', authProduct.updateOffer);

module.exports= router;
