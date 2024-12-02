const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
  price: { type: Number, required: true }, 
  status: { type: String, enum: ['booked', 'canceled'], default: 'booked' }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

  
  
  

// Create and export the model based on the schema
