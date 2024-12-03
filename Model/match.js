const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    team_A: {
      name: { type: String, required: true },
      logo: { type: String, required: true },
    },
    team_B: {
      name: { type: String, required: true },
      logo: { type: String, required: true },
    },
    match_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: "Not specified",
    },
    seats: {
      type: Number,
      default: 0,
      required: true,
    },
    venue: {
      type: String,
      default: "Not assigned",
    },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index to optimize search by match_date
matchSchema.index({ match_date: 1 });

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
