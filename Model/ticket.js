const mongoose = require('mongoose');

// Define the ticket schema
const ticketSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },    
    status: { type: String, enum: ['booked', 'canceled'], default: 'booked' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to the User model
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference to the User model (optional)
  },
  { timestamps: true } 
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
