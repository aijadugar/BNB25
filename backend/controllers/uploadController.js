const Pool = require("../models/Pool");
const abciClient = require("../utils/abciClient");

// Simulated CID generator (replace with IPFS later)
const generateCID = (filename) => {
  return "Qm" + Math.random().toString(36).substring(2, 10);
};

exports.uploadFile = async (req, res) => {
  try {
    const { wallet, category, type, size, filename } = req.body;

    // Generate fake CID
    const cid = generateCID(filename);

    // Check if pool exists
    let pool = await Pool.findOne({ category });

    if (!pool) {
      pool = new Pool({
        poolId: Date.now().toString(),
        category,
        type,
        contributors: [],
        totalFiles: 0,
        totalSize: 0,
        price: "100 SYN"
      });
    }

    // Add contributor file
    pool.contributors.push({ wallet, cid, filename });
    pool.totalFiles += 1;
    pool.totalSize = parseInt(pool.totalSize) + parseInt(size);
    await pool.save();

    // --- Send transaction to Tendermint via HTTP RPC ---
    const tx = `poolId=${pool.poolId}&cid=${cid}&wallet=${wallet}`;
    const tendermintResponse = await abciClient.sendTxToABCI(tx);

    return res.json({
      success: true,
      message: "File uploaded and grouped successfully",
      poolId: pool.poolId,
      cid,
      tendermintResponse
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};
