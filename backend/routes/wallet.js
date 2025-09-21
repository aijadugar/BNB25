const express = require('express');
const router = express.Router();
const Pool = require('../models/Pool'); // Make sure your Pool model points to the correct MongoDB collection

// GET pools contributed by wallet
router.get('/:walletId/pools', async (req, res) => {
  const { walletId } = req.params;
  try {
    const pools = await Pool.find({ "contributors.wallet": walletId }).lean();

    const contributions = pools.map(pool => {
      const contributor = pool.contributors.find(c => c.wallet === walletId);
      return {
        poolId: pool.poolId,
        datasetName: pool.datasetName,
        category: pool.category,
        cid: contributor?.cid || '',
        filename: contributor?.filename || '',
        size: contributor?.size?.$numberInt || contributor?.size || 0,
        earnings: contributor?.earnings?.$numberInt || contributor?.earnings || 0,
        timestamp: contributor?.timestamp?.$numberDouble || contributor?.timestamp || Date.now()
      };
    });

    res.json({ success: true, pools: contributions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
