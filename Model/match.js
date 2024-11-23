const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        home_team: {
            type: String,
            required: [true]
        },
        away_team: {
            type: String,
            required: [true]
        },
        match_date: {
            type: Date,
            required: [true]
        },
        location: {
            type: String,
            default: true
        },
        referee: {
            type: String,
            default: "Not assigned",
        },
        home_score: {
            type: Number,
            default: 0,
            min: [0, "Score cannot be negative"],
        },
        away_score: {
            type: Number,
            default: 0,
            min: [0, "Score cannot be negative"],
        },
    },
    { 
        timestamps: true,
    }
);

matchSchema.index({ match_date: 1 });

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;

