const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }, 
    storeName:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store"
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    quantity: {
      type: Number,
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      type: Boolean
    },
    // Offer fields
    offerPrice: {
      type: Number,
      default: null
    },
    offerExpiryDate: {
      type: Date,
      default: null
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);