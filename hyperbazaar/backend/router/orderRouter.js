const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/create-order', orderController.createOrder);

// Get orders for a specific retailer
router.get('/retailers/:retailerId/orders', orderController.getRetailerOrders);
// Route to get all orders
router.get('/get-orders', orderController.getAllOrders);

// Route to update order status
router.put('/update-order-status/:orderId', orderController.updateOrderStatus);

module.exports = router;
