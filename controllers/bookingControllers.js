const BookingTicket = require("../Model/booking");
const Match = require("../Model/match");
// const ticket = require("../Model/ticket");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingTicket.find();
    if (!bookings || bookings.length === 0) {
        return res.status(404).json({ error: 'No bookings found' });
      }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
exports.bookTicket = async (req, res) => {
  const { matchId, ticketed, status, ticket_id } = req.body;

  if (!matchId || !ticketed || !status || !ticket_id || ticketed < 1) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const userId = req.user.id;
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    if (match.seats < ticketed) {
      return res.status(400).json({ error: "Not enough seats available" });
    }
    const totalPrice = match.price * ticketed;
    const newTicket = new BookingTicket({
      matchId,
      ticketed,
      status,
      ticket_id,
      userId,
    });

    await newTicket.save();
    match.seats -= ticketed;
    await match.save();
    res.status(201).json({ message: "Ticket booked", ticket: newTicket, totalPrice });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to book ticket" });
  }
};




exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await BookingTicket.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params; // ticketId should be passed as a URL parameter
  const { ticketed, status } = req.body;

  if (ticketed !== undefined && ticketed < 1) {
    return res.status(400).json({ error: "Ticket count must be greater than zero" });
  }

  try {
    const booking = await BookingTicket.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (ticketed !== undefined) {
      const match = await Match.findById(booking.matchId);
      if (match && match.seats + booking.ticketed - ticketed >= 0) {
        match.seats += booking.ticketed - ticketed; 
        await match.save();
      } else {
        return res.status(400).json({ error: "Not enough seats available" });
      }
      booking.ticketed = ticketed;
    }

    if (status !== undefined) {
      booking.status = status;
    }

    await booking.save();
    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res.status(500).json({ error: "Failed to update booking" });
  }
};
exports.getTicketsByMatch = async (req, res) => {
  const { matchId } = req.params;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    const tickets = await BookingTicket.find({ matchId }).populate('userId', 'name email');
    const ticketsSold = tickets.reduce((total, ticket) => total + ticket.ticketed, 0);
    const totalSeats = match.seats;

    res.status(200).json({
      matchId,
      totalSeats,
      ticketsSold,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};


exports.getMatchRevenue = async (req, res) => {
  const { matchId } = req.params;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    const tickets = await BookingTicket.find({ matchId });
    const ticketsSold = tickets.reduce((total, ticket) => total + ticket.ticketed, 0);
    const totalRevenue = tickets.reduce((total, ticket) => total + ticket.ticketed * ticket.price, 0);

    res.status(200).json({
      message: "Match revenue fetched successfully",
      matchId,
      matchDetails: {
        team_A: match.team_A,
        team_B: match.team_B,
        location: match.location,
        match_date: match.match_date,
      },
      ticketsSold,
      ticketPrice: tickets.length > 0 ? tickets[0].price : 0, 
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching match revenue:", error.message);
    res.status(500).json({ error: "Failed to fetch match revenue" });
  }
};
