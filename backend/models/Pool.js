const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema({
  poolId: String,
  category: String,
  type: String,
  contributors: [
    {
      wallet: String,
      cid: String,
      filename: String
    }
  ],
  totalFiles: Number,
  totalSize: String,
  price: String
});

module.exports = mongoose.model("Pool", PoolSchema);
