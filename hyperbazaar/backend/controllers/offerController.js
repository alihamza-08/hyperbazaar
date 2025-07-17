
const Offer = require("../models/offerModel")
const User = require("../models/user-models")
const Product = require("../models/productModel");


// Create offer for a specific product and user
const createOffer = async (req, res) => {
  try {
    const { productSlug, userId, discount, expiryDate } = req.body;

    // Find the product by slug
    const product = await Product.findOne({ slug: productSlug });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update or create the offer
    const filter = { product: product._id, user: userId };
    const update = { product: product._id, user: userId, discount, expiryDate };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const offer = await Offer.findOneAndUpdate(filter, update, options);

    res.status(201).json({ success: true, message: "Offer created successfully", offer });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ success: false, message: "Failed to create offer", error: error.message });
  }
};


// Get offers created by a specific user
const getOffersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const offers = await Offer.find({ user: userId });
        res.status(200).json({ success: true, offers });
    } catch (error) {
        console.error("Error getting offers by user:", error);
        res.status(500).json({ success: false, message: "Failed to get offers by user", error: error.message });
    }
};

// Update an existing offer
const updateOffer = async (req, res) => {
    try {
        const { offerId } = req.params;
        const { discount, expiryDate } = req.body;

        const offer = await Offer.findByIdAndUpdate(offerId, { discount, expiryDate }, { new: true });
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        res.status(200).json({ success: true, message: "Offer updated successfully", offer });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ success: false, message: "Failed to update offer", error: error.message });
    }
};

// Delete an offer
const deleteOffer = async (req, res) => {
    try {
        const { offerId } = req.params;

        const offer = await Offer.findByIdAndDelete(offerId);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        res.status(200).json({ success: true, message: "Offer deleted successfully" });
    } catch (error) {
        console.error("Error deleting offer:", error);
        res.status(500).json({ success: false, message: "Failed to delete offer", error: error.message });
    }
};

// Get all offers
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        console.log(offers)
        res.status(200).json({ success: true, offers });
    } catch (error) {
        console.error("Error getting all offers:", error);
        res.status(500).json({ success: false, message: "Failed to get all offers", error: error.message });
    }
};

// Get offers for a specific product
const getOffersForProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const offers = await Offer.find({ product: productId });
        res.status(200).json({ success: true, offers });
    } catch (error) {
        console.error("Error getting offers for product:", error);
        res.status(500).json({ success: false, message: "Failed to get offers for product", error: error.message });
    }
};

// Apply offer on product (update product price with offer discount)
const applyOfferOnProduct = async (req, res) => {
    try {
        const { productId, offerId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        if (offer.expiryDate && new Date() > new Date(offer.expiryDate)) {
            return res.status(400).json({ success: false, message: "Offer has expired" });
        }

        // Apply offer logic here...
        product.price -= product.price * (offer.discount / 100);

        await product.save();

        res.status(200).json({ success: true, message: "Offer applied successfully", product });
    } catch (error) {
        console.error("Error applying offer on product:", error);
        res.status(500).json({ success: false, message: "Failed to apply offer on product", error: error.message });
    }
};

// Remove offer from product (reset product price to original)
const removeOfferFromProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Remove offer logic here...
        product.price = product.originalPrice;

        await product.save();

        res.status(200).json({ success: true, message: "Offer removed from product successfully", product });
    } catch (error) {
        console.error("Error removing offer from product:", error);
        res.status(500).json({ success: false, message: "Failed to remove offer from product", error: error.message });
    }
};

module.exports = {
    createOffer,
    getOffersByUser,
    updateOffer,
    deleteOffer,
    getAllOffers,
    getOffersForProduct,
    applyOfferOnProduct,
    removeOfferFromProduct
};
