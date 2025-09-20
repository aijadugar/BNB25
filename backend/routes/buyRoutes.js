const express = require("express");
const router = express.Router();
const { buyPool } = require("../controllers/buyController");

router.post("/buy", buyPool);

module.exports = router;
