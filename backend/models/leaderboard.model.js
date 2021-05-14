const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderboardSchema = new Schema(
  {
    score: { type: Number, required: true },
    level: { type: Number, required: true },
    rows: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
