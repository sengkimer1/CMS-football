const Footballer = require('../Model/footballer');
const mongoose = require('mongoose'); 

// Get all footballers
exports.getAllFootballers = async (req, res) => {
  try {
    const footballers = await Footballer.find();
    if (!footballers || footballers.length === 0) {
      return res.status(404).json({ error: 'No footballers found' });
    }
    res.status(200).json(footballers);
  } catch (err) {
    console.error('Error fetching footballers:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get footballer by ID
exports.getFootballerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const footballer = await Footballer.findById(id);
    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }
    res.status(200).json(footballer);
  } catch (err) {
    console.error('Error fetching footballer by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a footballer
exports.addFootballer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      position,
      age,
      team,
      club,
      country,
      dateOfBirth,
      height,
      weight,
      imageUrl,
      createdBy, // Added validation for createdBy as it's required in the schema
    } = req.body;

    const validTeams = ["U13", "U16", "U19", "Senior"];

    // Validate team name
    if (!validTeams.includes(team)) {
      return res.status(400).json({
        error: `Invalid team name: ${team}. Valid options are ${validTeams.join(", ")}.`,
      });
    }

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !position ||
      !age ||
      !team ||
      !club ||
      !country ||
      !dateOfBirth ||
      !height ||
      !weight ||
      !createdBy // Ensure createdBy is provided
    ) {
      return res.status(400).json({ error: "All fields are required, including createdBy." });
    }

    // Validate createdBy as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: "Invalid createdBy user ID." });
    }

    const newFootballer = new Footballer({
      firstName,
      lastName,
      position,
      age,
      team,
      club,
      country,
      dateOfBirth,
      height,
      weight,
      imageUrl,
      createdBy,
    });

    await newFootballer.save();
    res.status(201).json({
      message: "Footballer added successfully",
      data: newFootballer,
    });
  } catch (err) {
    console.error("Error adding footballer:", err);
    res.status(500).json({
      error: "Failed to add footballer",
      details: err.message,
    });
  }
};

// Update a footballer
exports.updateFootballer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.team) {
      const validTeams = ["U13", "U16", "U19", "Senior"];
      if (!validTeams.includes(updatedData.team)) {
        return res.status(400).json({
          error: `Invalid team name: ${updatedData.team}. Valid options are ${validTeams.join(", ")}.`,
        });
      }
    }

    const footballer = await Footballer.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }
    res.status(200).json({ message: 'Footballer updated successfully', data: footballer });
  } catch (err) {
    console.error('Error updating footballer:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Delete a footballer
exports.deleteFootballer = async (req, res) => {
  try {
    const { id } = req.params;
    const footballer = await Footballer.findByIdAndDelete(id);

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    res.status(200).json({ message: 'Footballer deleted successfully' });
  } catch (err) {
    console.error('Error deleting footballer:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


