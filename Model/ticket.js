const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    id: { type: Number, required: true, unique: true },  // Custom 'id' field
    matchId: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true }, // Add price as a required field
  status: { type: String, enum: ['booked', 'canceled'], default: 'booked' }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

  
  
  

// Create and export the model based on the schema
