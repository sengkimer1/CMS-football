const Match = require("../Model/match");
const Ticket = require("../Model/ticket"); 

exports.getAvailableSeats = async (req, res) => {
  const { matchId } = req.params; // Get match ID from request parameters

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    const tickets = await Ticket.find({ matchId });
    const totalBookedSeats = tickets.reduce((total, ticket) => total + ticket.ticketed, 0);
    const availableSeats = match.seats - totalBookedSeats;
    res.status(200).json({
      message: "Available seats fetched successfully",
      matchId,
      matchDetails: {
        team_A: match.team_A,
        team_B: match.team_B,
        location: match.location,
        match_date: match.match_date,
      },
      totalSeats: match.seats,
      bookedSeats: totalBookedSeats,
      availableSeats,
    });
  } catch (error) {
    console.error("Error fetching available seats:", error.message);
    res.status(500).json({ error: "Failed to fetch available seats" });
  }
};
