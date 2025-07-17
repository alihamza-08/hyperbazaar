const express = require("express");
const router = express.Router();
const app =  express();
const signupSchema = require("../validater/auth-validater");
const validate = require("../middleware/validate-middleware");
const authControllers = require("../controllers/controllers");
// const authProduct = require("../controllers/productcontroller");
// const productInventary = require("../controllers/productcontroller");


router.route("/").get(authControllers.home);
// router.route("/signup").post(validate(signupSchema), authControllers.register);
router.route("/signup").post(authControllers.register);
router.route('/login').post(authControllers.login);
router.route('/getAllUser').get(authControllers.allUser);
router.route('/getAllUser/delete/:id').delete(authControllers.deleteUser);

module.exports = router;



