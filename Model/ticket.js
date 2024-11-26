const mongoose = require('mongoose');

// Define the ticket schema with the custom 'id' field
const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    id: { type: Number, required: true, unique: true },  // Custom 'id' field
    matchId: { type: String, required: true },
    seats: { type: Number, required: true },
    status: { type: String, default: 'booked' },  // Default status when the ticket is created
});

// Create and export the model based on the schema
module.exports = mongoose.model('Ticket', ticketSchema);
