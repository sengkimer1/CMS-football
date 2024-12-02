const mongoose = require('mongoose');

const BookingTicketSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Match', 
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
    unique: true, 
  },
  ticketed: {
    type: Number, 
    required: true,  
  },
  status: {
    type: String,
    enum: ['booked', 'pending', 'cancelled'],  
    default: 'pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model('BookingTicket', BookingTicketSchema);
