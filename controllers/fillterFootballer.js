const Footballer = require('../Model/footballer');

const getPlayersByTeam = async (req, res) => {
  const { team } = req.params; 
  
  if (!["U13", "U16", "U19", "Professional"].includes(team)) {
    return res.status(400).json({ error: "Invalid team specified" });
  }

  try {
    const players = await Footballer.find({ team });
    return res.status(200).json({ team, players });
  } catch (error) {
    console.error("Error retrieving players:", error.message);
    return res.status(500).json({ error: "Failed to retrieve players" });
  }
};

module.exports = {
  getPlayersByTeam
};
