const Negotition = require("../models/Negotition");

// Create negotiation
const Negotiation=  async (req, res) => {
  try {
    const { productId, userId, offerAmount } = req.body;
    const negotiation = new Negotition({
      productId,
      userId,
      offerAmount,
    });
    await negotiation.save();
    res.json({ success: true, negotiation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = Negotiation;
