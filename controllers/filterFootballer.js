const Footballer = require('../Model/footballer');

const getAllPlayersGroupedByTeam = async (req, res) => {
  try {
    // Fetch players from the database
    const players = await Footballer.find();

    // Group players by team
    const groupedPlayers = {
      U13: [],
      U16: [],
      U19: [],
      Professional: [],
    };

    players.forEach(player => {
      if (groupedPlayers[player.team]) {
        groupedPlayers[player.team].push(player);
      }
    });

    // Return the grouped players
    return res.status(200).json(groupedPlayers);
  } catch (error) {
    console.error("Error retrieving players:", error.message);
    return res.status(500).json({ error: "Failed to retrieve players" });
  }
};

module.exports = {
  getAllPlayersGroupedByTeam,
};
