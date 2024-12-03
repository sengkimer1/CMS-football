const mongoose = require("mongoose");

const footballerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, required: true, min: 5 },
  team: { type: String, required: true },
  club: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, { timestamps: true });

module.exports = mongoose.model("Footballer", footballerSchema);
