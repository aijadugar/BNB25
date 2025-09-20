// utils/abciClient.js
const axios = require("axios");

/**
 * Send a transaction to Tendermint via HTTP RPC
 * @param {string} tx - transaction string, e.g., "poolId=123&cid=Qm123&wallet=cosmos1abc"
 * @returns {Promise<Object>} - Tendermint response
 */
exports.sendTxToABCI = async (tx) => {
  try {
    // Use Tendermint broadcast_tx_commit endpoint
    const url = `http://127.0.0.1:26657/broadcast_tx_commit?tx="${encodeURIComponent(tx)}"`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("Error sending tx to Tendermint:", err.message);
    throw err;
  }
};
