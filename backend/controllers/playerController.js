const Player = require("../models/Player");

// Create new player
exports.addPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ rating: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update player (score, etc)
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete player
exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update player's score
exports.updatePlayerScore = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    player.score = req.body.score ?? player.score;
    await player.save();

    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

