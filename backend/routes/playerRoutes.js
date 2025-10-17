const express = require("express");
const router = express.Router();
const { addPlayer, getPlayers, updatePlayer, deletePlayer, updatePlayerScore } = require("../controllers/playerController");

router.post("/", addPlayer);
router.get("/", getPlayers);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);
router.put("/score/:id", updatePlayerScore);

module.exports = router;
