const mongoose = require("mongoose");

const footballerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, required: true, min: 5 }, // Assuming players are at least 5 years old
  team: { type: String, enum: ["U13", "U16", "U19", "Professional"], required: true },
  club: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Footballer", footballerSchema);
