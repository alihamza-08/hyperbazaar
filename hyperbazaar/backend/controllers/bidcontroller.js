// controllers/bidController.js

const Bid = require('../models/bid.model');
const Order = require('../models/CartOrder');

// Function to list all bids (if needed)
const listBids = async (req, res) => {
    try {
        const bids = await Bid.find(); // Assuming 'orderId' is a reference to Order model
        res.json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ error: 'Failed to fetch bids. Please try again.' });
    }
};

// Function to approve a bid
const approveBid = async (req, res) => {
    const { bidId } = req.params;

    try {
        const bid = await Bid.findById(bidId);

        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        // Update bid status
        bid.status = 'approved';
        await bid.save();

        // Update associated order with bid amount
        const order = await Order.findById(bid.orderId);
        if (order) {
            order.total = bid.bidAmount;
            await order.save();
        }

        res.json({ message: 'Bid approved and order updated successfully', bid });
    } catch (error) {
        console.error('Error approving bid:', error);
        res.status(500).json({ error: 'Failed to approve bid. Please try again.' });
    }
};

// Function to disapprove a bid
const disapproveBid = async (req, res) => {
    const { bidId } = req.params;

    try {
        const bid = await Bid.findById(bidId);

        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        // Update bid status
        bid.status = 'rejected';
        await bid.save();

        res.json({ message: 'Bid disapproved successfully', bid });
    } catch (error) {
        console.error('Error disapproving bid:', error);
        res.status(500).json({ error: 'Failed to disapprove bid. Please try again.' });
    }
};

const createBid = async (req, res) => {
    const { productId, bidAmount } = req.body;

    try {
        // Create new bid instance
        const newBid = new Bid({
            productId: productId,
            bidAmount: bidAmount,
            status: 'pending' // Initial status can be 'pending', 'approved', 'rejected', etc.
            // Add any other fields you need to save
        });

        // Save bid to database
        const savedBid = await newBid.save();

        res.status(201).json(savedBid); // Respond with the saved bid object
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ error: 'Failed to create bid. Please try again.' });
    }
};

module.exports = {
    listBids,
    approveBid,
    disapproveBid,
    createBid
};
