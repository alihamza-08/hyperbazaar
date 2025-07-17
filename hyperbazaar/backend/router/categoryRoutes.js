
const express = require("express");
// import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
const authCategory = require("../controllers/categoryController");
const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  authCategory.createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  authCategory.updateCategoryController
);

//getALl category
router.get("/get-category", authCategory.categoryControlller);

//single category
router.get("/single-category/:slug", authCategory.singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  authCategory.deleteCategoryCOntroller
); router;

module.exports =router;