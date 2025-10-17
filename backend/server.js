const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Chess Tournament API running"));
app.use("/api/players", require("./routes/playerRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
