const mongoose = require('mongoose');

// Define schema for CartItem
const CartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product'
  },
  productName: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  }
});

// Define schema for Order
const OrderSchema = new mongoose.Schema({
  retailerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Retailer'
  },
  orderItems: [CartItemSchema], // Array of CartItems
  total: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
