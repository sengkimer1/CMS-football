const Match = require("../Model/match");
const Ticket = require("../Model/ticket"); // Assuming Ticket model is defined elsewhere

// Create a new match
exports.createMatch = async (req, res) => {  
    try {
        const { team_A, team_B, match_date, location, seats, referee } = req.body;

        // Validation
        if (!team_A || !team_B || !match_date || seats === undefined) {
            return res.status(400).json({ message: 'team_A, team_B, match_date, and seats are required.' });
        }

        const newMatch = new Match({
            team_A,
            team_B,
            match_date: new Date(match_date),
            location: location || "To be determined",
            seats, 
            referee: referee || "Not assigned",
          
        });
        
        const savedMatch = await newMatch.save();
        return res.status(201).json({
            message: "Match created successfully!",
            match: savedMatch,
        });
    } catch (error) {
        console.error("Error creating match:", error);
        return res.status(500).json({
            message: "An error occurred while creating the match.",
            error: error.message,
        });
    }
};

// Get all matches
exports.getAllMatch = async (req, res) => {
    try {
        const getMatch = await Match.find();
        return res.status(200).json({ message: "Fetched all matches successfully", getMatch });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get a match by ID
exports.getMatchID = async (req, res) => {
    try {
        const id = req.params.id;
        const getMatch = await Match.findById(id);
        
        if (!getMatch) {
            return res.status(404).json({ message: "Match not found" });
        }

        return res.status(200).json({ message: "Fetched match by ID successfully", getMatch });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update match details
exports.updateMatch = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body; 
        
        // Validation: Ensure at least one field to update exists
        if (Object.keys(update).length === 0) {
            return res.status(400).json({ message: 'No fields to update.' });
        }

        const updatedMatch = await Match.findByIdAndUpdate(
            id, 
            update, { new: true, runValidators: true }
        );

        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match not found.' });
        }

        return res.status(200).json({ message: 'Update successful', updatedMatch });
    } catch (error) {
        console.error("Error updating match:", error);
        return res.status(500).json({
            message: "An error occurred while updating the match.",
            error: error.message,
        });
    }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
    try {
        const id = req.params.id;
        
        const deleteMatch = await Match.findByIdAndDelete(id);
        
        if (!deleteMatch) {
            return res.status(404).json({ message: 'Match not found.' });
        }

        return res.status(200).json({ message: 'Delete successful', deleteMatch });
    } catch (error) {
        console.error("Error deleting match:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the match.",
            error: error.message,
        });
    }
};

// Get the available seats for a match
exports.getAvailableSeats = async (req, res) => {
  try {
    const matchId = req.params.matchId;

    // Find the match by matchId and get the total seats
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    const totalSeats = match.seats; // Use the seats value from the match document

    const bookedSeats = await Ticket.aggregate([
      { $match: { matchId: matchId, status: { $ne: 'canceled' } } },
      { $group: { _id: "$matchId", totalSeatsBooked: { $sum: "$seats" } } }
    ]);

    const totalSeatsBooked = bookedSeats.length > 0 ? bookedSeats[0].totalSeatsBooked : 0;

    // Calculate available seats
    const availableSeats = totalSeats - totalSeatsBooked;

    // Respond with the available seats for the match
    res.status(200).json({
      matchId,
      totalSeats,
      totalSeatsBooked,
      availableSeats,
    });
  } catch (error) {
    console.error('Error fetching available seats:', error.message);
    res.status(500).json({
      message: 'Failed to fetch available seats',
      error: error.message,
    });
  }
};
