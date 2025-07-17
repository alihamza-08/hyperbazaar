const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

router.post("/", offerController.createOffer);
router.get("/user/:userId", offerController.getOffersByUser);
router.put("/:offerId", offerController.updateOffer);
router.delete("/:offerId", offerController.deleteOffer);
router.get("/", offerController.getAllOffers);
router.get("/product/:productId", offerController.getOffersForProduct);
router.put("/apply/:productId/:offerId", offerController.applyOfferOnProduct);
router.put("/remove/:productId", offerController.removeOfferFromProduct);

module.exports = router;
