const Ticket = require('../Model/ticket');
const mongoose = require('mongoose');


// Create a new ticket
exports.createTicketController = async (req, res) => {
  try {
    const { userId, matchId, price,available} = req.body;
    if (!userId || !matchId || !price||!available) {
      return res.status(400).json({
        error: 'userId, matchId, and price are required',
      });
    }

    const createdBy = req.user.id; 
    console.log(createdBy)
    if (!createdBy) {
      return res.status(401).json({ error: 'Unauthorized, user must be logged in' });
    }

    // Create the new ticket
    const ticket = new Ticket({
      userId,
      matchId,
      price,
      available,
      status: 'booked',
      createdBy, 
      updatedBy: createdBy, 
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
    const ticketId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    const ticket = await Ticket.findById(ticketId);

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
    const ticketId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    const { userId, matchId, status, price } = req.body;

    if (!userId && !matchId && !seats && !status && !price) {
      return res.status(400).json({
        error: 'At least one of userId, matchId, seats, status, or price must be provided to update the ticket',
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    // Update only the provided fields
    if (userId) ticket.userId = userId;
    if (matchId) ticket.matchId = matchId;
    if (status) ticket.status = status;
    if (price) ticket.price = price;

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
    const tickets = await Ticket.find();

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

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ error: 'Invalid ticket ID format' });
    }

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

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

