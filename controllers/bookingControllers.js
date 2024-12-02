const BookingTicket = require("../Model/booking"); 
const Match = require("../Model/match");

exports.bookTicket = async (req, res) => {
  const { matchId, ticketed, status } = req.body;
  
  if (!matchId || !ticketed || !status) {
    return res.status(400).json({ error: "All fields (matchId, ticketed, status) are required" });
  }

  const ticketId = `TICKET-${Date.now()}`;

  const userId = req.user.id;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    const newTicket = new BookingTicket({
      matchId,
      ticketed,
      status,
      ticketId, 
      userId,  
    });

    await newTicket.save();
    res.status(201).json({
      message: "Ticket booked successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error booking ticket:", error.message);
    res.status(500).json({ error: "Failed to book ticket" });
  }
};

exports.getTicketsByMatch = async (req, res) => {
  const { matchId } = req.params;

  try {
    const tickets = await BookingTicket.find({ matchId }).populate('userId', 'name email'); // Populate user details if needed
    if (!tickets.length) {
      return res.status(404).json({ error: "No tickets found for this match" });
    }
    res.status(200).json({ matchId, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};
