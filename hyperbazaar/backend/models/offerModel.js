

// const mongoose = require('mongoose');

// const offerSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
    
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   discount: {
//     type: Number,
//     required: true
//   },
//   expiryDate: {
//     type: Date
//   }
// });

// module.exports = mongoose.model('Offer', offerSchema);



const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
