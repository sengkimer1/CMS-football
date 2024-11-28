const Footballer = require('../Model/footballer');
const mongoose = require('mongoose');

// Get all footballers
exports.getAllFootballers = async (req, res) => {
  try {
    const footballers = await Footballer.find();
    if (!footballers || footballers.length === 0) {
      return res.status(404).json({ error: 'No footballers found' });
    }
    res.status(200).json({ message: 'Footballers retrieved successfully', data: footballers });
  } catch (err) {
    console.error('Error fetching footballers:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get footballer by ID
exports.getFootballerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const footballer = await Footballer.findById(id);
    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }
    res.status(200).json({ message: 'Footballer retrieved successfully', data: footballer });
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
      club,
      country,
      dateOfBirth,
      height,
      weight,
      imageUrl,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !position || !age || !club || !country || !dateOfBirth || !height || !weight) {
      return res.status(400).json({ error: 'All fields except imageUrl are required' });
    }

    const newFootballer = new Footballer({
      firstName,
      lastName,
      position,
      age,
      club,
      country,
      dateOfBirth,
      height,
      weight,
      imageUrl,
    });
    await newFootballer.save();
    res.status(201).json({ message: 'Footballer added successfully', data: newFootballer });
  } catch (err) {
    console.error('Error adding footballer:', err);
    res.status(500).json({ error: 'Failed to add footballer', details: err.message });
  }
};

// Update a footballer
exports.updateFootballer = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updatedData = req.body;
    const footballer = await Footballer.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    res.status(200).json({ message: 'Footballer updated successfully', data: footballer });
  } catch (err) {
    console.error('Error updating footballer:', err);
    res.status(500).json({ error: 'Failed to update footballer', details: err.message });
  }
};

// Delete a footballer
exports.deleteFootballer = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const footballer = await Footballer.findByIdAndDelete(id);

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    res.status(200).json({ message: 'Footballer deleted successfully' });
  } catch (err) {
    console.error('Error deleting footballer:', err);
    res.status(500).json({ error: 'Failed to delete footballer', details: err.message });
  }
};
