const Ticket = require('../Model/ticket');
const mongoose = require('mongoose');

// Create a new ticket
exports.createTicketController = async (req, res) => {
  try {
    const { userId, id, matchId, seats } = req.body;

    if (!userId || !id || !matchId || !seats) {
      return res.status(400).json({
        error: 'userId, id, matchId, and seats are required',
      });
    }

    const ticket = new Ticket({
      userId,
      id,
      matchId,
      seats,
      status: 'booked',
    });

    await ticket.save();

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
    });
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    res.status(500).json({
      error: 'Failed to create ticket',
      details: error.message,
    });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id, 10);

    if (isNaN(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    const ticket = await Ticket.findOne({ id: ticketId });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update ticket booking details
exports.updateTicketBooking = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id, 10);

    if (isNaN(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    const { userId, matchId, seats, status } = req.body;

    if (!userId && !matchId && !seats && !status) {
      return res.status(400).json({
        error: 'At least one of userId, matchId, seats, or status must be provided to update the ticket',
      });
    }

    const ticket = await Ticket.findOne({ id: ticketId });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update only the provided fields
    if (userId) ticket.userId = userId;
    if (matchId) ticket.matchId = matchId;
    if (seats) ticket.seats = seats;
    if (status) ticket.status = status;

    await ticket.save();

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket,
    });
  } catch (error) {
    console.error('Error updating ticket:', error.message);
    res.status(500).json({
      message: 'Failed to update ticket',
      error: error.message,
    });
  }
};
// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    // Fetch all tickets from the database
    const tickets = await Ticket.find();

    // Check if no tickets are found
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found' });
    }

    // Respond with the list of tickets
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({
      error: 'Failed to fetch tickets',
      details: error.message,
    });
  }
};
// Delete a ticket booking
exports.deleteTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Validate that the ticketId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    // Find and delete the ticket
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    // If no ticket is found to delete
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Respond with success message
    res.status(200).json({
      message: 'Ticket deleted successfully',
      ticket: deletedTicket,
    });
  } catch (error) {
    console.error('Error deleting ticket:', error.message);
    res.status(500).json({
      error: 'Failed to delete ticket',
      details: error.message,
    });
  }
};
