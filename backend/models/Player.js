const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  federation: { type: String, required: true },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model("Player", playerSchema);
