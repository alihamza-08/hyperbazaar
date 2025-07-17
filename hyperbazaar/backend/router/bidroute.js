// routes/bidRoutes.js

const express = require('express');
const router = express.Router();
const { listBids, approveBid, disapproveBid,createBid } = require('../controllers/bidcontroller');

// Endpoint to list all bids (if needed)
router.get('/bids', listBids);
router.post('/bidscreate', createBid);

// Endpoint to approve a bid
router.put('/bids/approve/:bidId', approveBid);

// Endpoint to disapprove a bid
router.put('/bids/disapprove/:bidId', disapproveBid);

module.exports = router;
