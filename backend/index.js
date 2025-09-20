const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const poolRoutes = require("./routes/poolRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
    "mongodb+srv://BNB25:BNB25Hack@cluster0.zt0uubp.mongodb.net/synapse?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));
    
app.use("/api/pool", poolRoutes);

app.listen(5000, () => console.log("Backend server running on port 5000"));
