const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const Purchase = require("./models/Purchase");
const poolRoutes = require("./routes/poolRoutes");
const buyRoutes = require("./routes/buyRoutes");
const Pool = require("./models/Pool");
const Users = require('./models/User'); // adjust path if needed
const walletRoutes = require('./routes/wallet'); // adjust path if needed
const withdrawRoutes = require('./controllers/withdrawController'); // adjust path if needed

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // make sure body parsing is enabled
app.use("/api/contributor", withdrawRoutes);

// MongoDB connection
mongoose.connect(
    "mongodb+srv://BNB25:BNB25Hack@cluster0.zt0uubp.mongodb.net/synapse?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));
    
app.use("/api/buy", buyRoutes);
app.use("/api/pool", poolRoutes);
app.use('/api/wallet', walletRoutes);

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

app.get('/api/wallet/:walletId', async (req, res) => {
  const { walletId } = req.params;

  try {
    const pools = await Pool.find({ "contributors.wallet": walletId }).lean();

    const contributions = pools.map(pool => {
      const contributor = pool.contributors.find(c => c.wallet === walletId);
      return {
        poolId: pool.poolId,
        datasetName: pool.datasetName,
        category: pool.category,
        cid: contributor?.cid || "",
        earnings: contributor?.earnings || 0
      };
    });

    // console.log('Backend contributions:', contributions); // debug

    res.json({
      success: true,
      pools: contributions
    });
  } catch (err) {
    console.error('Error fetching wallet contributions:', err);
    res.status(500).json({ success: false, message: 'Error fetching wallet contributions' });
  }
});

  
app.get('/api/pools', async (req, res) => {
  try {
    // Use the imported Pool model
    const pools = await Pool.find({}, { poolId: 1, _id: 0 }); // return only poolId
    res.json({ success: true, pools });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email, password });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "User already exists" });

    const wallet = `cosmos${Math.floor(Math.random() * 1e8)}`; // unique wallet ID
    const newUser = await Users.create({ fullName, email, password, wallet, balance: 0 });

    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// In-memory user store (replace with MongoDB in production)
const users = [];

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    // Replace the next line with your MongoDB logic
    const user = await Users.findOne({ email }); // Users is your MongoDB collection

    if (!user) {
      // Create new user with wallet ID if not exists
      const walletId = 'cosmos' + Math.random().toString(36).substring(2, 10);
      const newUser = await Users.create({ email, password, walletId });
      return res.json({ success: true, email: newUser.email, walletId: newUser.walletId });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.json({ success: true, email: user.email, walletId: user.walletId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(5000, () => console.log("Backend server running on port 5000"));
