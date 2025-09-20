const mongoose = require("mongoose");

const ContributorSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  cid: { type: String, required: true },
  filename: { type: String },
  size: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  timestamp: { type: Number, default: () => Date.now() } // store as UNIX epoch
});


const PoolSchema = new mongoose.Schema({
  poolId: { type: String, required: true, unique: true },
  datasetName: { type: String, required: true },  // name of dataset
  category: { type: String, required: true },
  type: { type: String, required: true },
  contributors: [ContributorSchema],
  totalFiles: { type: Number, default: 0 },
  totalSize: { type: Number, default: 0 },
  price: { type: Number, required: true }       // numeric price per purchase
}, { timestamps: true });

module.exports = mongoose.model("Pool", PoolSchema);
