const { request } = require("express");
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(

    {
        id: {
            type: Number,
            request: [true],
            unique: [true]
        },
        team_A: {
            name: { type: String, required: true },
            logo:{type: String, required: true }
        },
        team_B: {
            name: {type: String, required: true},
            logo:{type: String, required: true }
        },
        match_date: {
            type: Date,
            required: [true]
        },
        location: {
            type: String,
            default: true
        },
        seats: {
            type: Number,
            default: 0, 
            required: true,
          },
        referee: {
            type: String,
            default: "Not assigned",
        },
        score_A: {
            type: Number,
            default: 0,
            min: [0, "Score cannot be negative"],
        },
        score_B: {
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

