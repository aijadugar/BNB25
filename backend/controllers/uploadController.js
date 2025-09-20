const Pool = require("../models/Pool");
const abciClient = require("../utils/abciClient");

// Simulated CID generator (replace with IPFS later)
const generateCID = (filename) => {
  return "Qm" + Math.random().toString(36).substring(2, 10);
};

exports.uploadFile = async (req, res) => {
  try {
    const { contributorWallet, datasetName, category, type, size, filename, description, price } = req.body;

    // Validate required fields
    if (!contributorWallet || !category || !type || !filename || !datasetName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Generate fake CID
    const cid = generateCID(filename);

    // Check if a pool exists
    let pool = await Pool.findOne({ category, type });

    if (!pool) {
      // Create new pool
      pool = new Pool({
        poolId: Date.now().toString(),
        category,
        type,
        datasetName,
        contributors: [],
        totalFiles: 0,
        totalSize: 0,
        price: Number(price) || 100, // Use contributor price, default 100 if not set
        description
      });
    }

    // Add contributor info
    pool.contributors.push({
      wallet: contributorWallet,
      cid,
      filename,
      size: Number(size),
      earnings: 0,
      timestamp: Date.now()
    });

    pool.totalFiles += 1;
    pool.totalSize = (Number(pool.totalSize) || 0) + Number(size);

    await pool.save();

    // Send tx to Tendermint
    const tx = `poolId=${pool.poolId}&cid=${cid}&wallet=${contributorWallet}`;
    const tendermintResponse = await abciClient.sendTxToABCI(tx);

    return res.json({
      success: true,
      message: "File uploaded and grouped successfully",
      poolId: pool.poolId,
      cid,
      price: pool.price,        // return price for frontend
      tendermintResponse
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};
