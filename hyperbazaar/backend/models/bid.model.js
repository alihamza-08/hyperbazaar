// Example Bid model schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    bidAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
