const Purchase = require("../models/Purchase");
const Pool = require("../models/Pool");
const abciClient = require("../utils/abciClient");

// Developer buys pool
exports.buyPool = async (req, res) => {
  try {
    const { developerWallet, poolId, amount } = req.body;

    // Check if pool exists in MongoDB
    const pool = await Pool.findOne({ poolId });
    if (!pool) {
      return res.status(404).json({ success: false, message: "Pool not found" });
    }

    // Ensure purchases and contributors arrays exist
    if (!pool.purchases) pool.purchases = [];
    if (!pool.contributors) pool.contributors = [];

    // Check if developer already bought this pool
    const existingPurchase = await Purchase.findOne({ poolId, developerWallet });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this pool",
      });
    }

    // Determine purchase amount
    const price = amount ?? pool.price ?? 100; // use provided amount, pool price or fallback 100
    if (price <= 0) {
      return res.status(400).json({ success: false, message: "Invalid purchase amount" });
    }

    // Send buy transaction to Tendermint ABCI
    const tx = `buy=${poolId}&wallet=${developerWallet}&amount=${price}`;
    const chainRes = await abciClient.sendTxToABCI(tx);

    // Compute total size of all contributors (fallback to equal split if 0)
    const totalSize = pool.totalSize ?? pool.contributors.reduce((s, c) => s + (c.size || 0), 0);

    const royaltyResponses = [];
    let distributed = 0;

    if (!totalSize || totalSize <= 0) {
      // Equal split if totalSize is 0
      const equalShare = Math.floor(price / pool.contributors.length);
      for (const c of pool.contributors) {
        c.earnings = (c.earnings || 0) + equalShare;
        const royaltyTx = `royalty=${poolId}&wallet=${c.wallet}&amount=${equalShare}`;
        const royRes = await abciClient.sendTxToABCI(royaltyTx);
        royaltyResponses.push({ wallet: c.wallet, payout: equalShare, royRes });
      }
    } else {
      // Proportional split by size
      for (let i = 0; i < pool.contributors.length; i++) {
        const c = pool.contributors[i];
        let payout = Math.floor((Number(c.size || 0) / Number(totalSize)) * price);
        if (i === pool.contributors.length - 1) payout = price - distributed; // last contributor gets remainder
        distributed += payout;

        c.earnings = (c.earnings || 0) + payout;
        const royaltyTx = `royalty=${poolId}&wallet=${c.wallet}&amount=${payout}`;
        const royRes = await abciClient.sendTxToABCI(royaltyTx);
        royaltyResponses.push({ wallet: c.wallet, payout, royRes });
      }
    }

    // Save pool with updated contributors and purchases
    pool.purchases.push({ developerWallet, amount: price, timestamp: Date.now() });
    pool.markModified("contributors");
    await pool.save();

    // Store purchase in MongoDB
    const purchase = new Purchase({
      poolId,
      developerWallet,
      cids: pool.contributors.map(c => c.cid),
      tendermintResponse: chainRes
    });
    await purchase.save();

    // Respond to frontend
    return res.json({
      success: true,
      message: "Pool purchased successfully",
      poolId,
      cids: pool.contributors.map(c => c.cid),
      tendermintResponse: chainRes,
      royaltyResponses
    });

  } catch (err) {
    console.error("Error in buyPool:", err);
    res.status(500).json({ success: false, message: "Purchase failed" });
  }
};
