


const Order = require("../models/CartOrder");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { retailerId, orderItems, total,productId } = req.body;
    const order = new Order({ retailerId, orderItems, total });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get orders for a specific retailer
exports.getRetailerOrders = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;
    const orders = await Order.find({ retailerId });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching retailer orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
