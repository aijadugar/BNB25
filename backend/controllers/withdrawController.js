// backend/controllers/withdrawController.js
const express = require("express");
const router = express.Router();
const Pool = require("../models/Pool");

router.post("/withdraw", async (req, res) => {
  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ success: false, message: "Wallet ID required" });

  try {
    const pools = await Pool.find({ "contributors.wallet": wallet });
    let total = 0;
    for (const pool of pools) {
      for (const c of pool.contributors) {
        if (c.wallet === wallet) {
          total += c.earnings || 0;
          c.earnings = 0;
        }
      }
      await pool.save();
    }
    return res.json({ success: true, withdrawn: total });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
