const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const poolRoutes = require("./routes/poolRoutes");
const buyRoutes = require("./routes/buyRoutes");
const Pool = require("./models/Pool");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
    "mongodb+srv://BNB25:BNB25Hack@cluster0.zt0uubp.mongodb.net/synapse?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));
    
app.use("/api/buy", buyRoutes);
app.use("/api/pool", poolRoutes);

app.get("/api/pools/:poolId", async (req, res) => {
  try {
    const { poolId } = req.params;
    const pool = await Pool.findOne({ poolId });

    if (!pool) {
      return res.status(404).json({ success: false, message: "Pool not found" });
    }

    // Query Tendermint for proof of contribution
    const tmResponse = await axios.get(
      `http://127.0.0.1:26657/abci_query?data="poolId=${poolId}"`
    );

    const result = tmResponse.data.result.response;
    const txHash = result.value ? JSON.parse(Buffer.from(result.value, 'base64').toString()).cid : null;
    const height = result.height;

    res.json({
      success: true,
      poolId: pool.poolId,
      cids: pool.contributors.map(c => c.cid),
      txHash,  // Tendermint proof hash
      height   // Block height
    });
  } catch (err) {
    console.error("Error fetching pool:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

  

app.listen(5000, () => console.log("Backend server running on port 5000"));
