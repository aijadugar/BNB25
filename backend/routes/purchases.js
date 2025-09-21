// routes/purchases.js
const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// GET purchases by developer wallet
router.get('/:walletId', async (req, res) => {
  const { walletId } = req.params;

  try {
    const purchases = await Purchase.find({ developerWallet: walletId }).lean();

    if (!purchases || purchases.length === 0) {
      return res.json({ success: true, purchases: [] });
    }

    res.json({ success: true, purchases });
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
