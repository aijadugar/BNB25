const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  poolId: String,
  developerWallet: String,
  cids: [String],
  tendermintResponse: Object,
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
