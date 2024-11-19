const express = require('express');
const Footballer = require('../Model/footballer'); 

const router = express.Router();
const authenticateUser = (req, res, next) => {
  req.user = {
    id: 123,
    role: 'ADMIN'
  };
  next();
};

// GET API to fetch all footballers
router.get('/footballers', authenticateUser, async (req, res) => {
  const { role } = req.user;

  try {
    // Fetch all footballers
    const footballers = await Footballer.find();

    if (!footballers || footballers.length === 0) {
      return res.status(404).json({ error: 'No footballers found' });
    }

    // Role-based response
    if (role === 'USER') {
      const limitedData = footballers.map((footballer) => ({
        id: footballer.id,
        firstName: footballer.firstName,
        lastName: footballer.lastName,
        position: footballer.position,
        club: footballer.club,
        country: footballer.country,
        imageUrl: footballer.imageUrl 
      }));
      return res.json(limitedData);
    }

    if (role === 'ADMIN') {
      return res.json(footballers);
    }

    return res.status(403).json({ error: 'Unauthorized access' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET API to fetch a footballer by ID
router.get('/footballers/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  try {
    // Find the footballer by ID
    const footballer = await Footballer.findOne({ id: Number(id) });

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    // Role-based response
    if (role === 'USER') {
      return res.json({
        id: footballer.id,
        firstName: footballer.firstName,
        lastName: footballer.lastName,
        position: footballer.position,
        club: footballer.club,
        country: footballer.country,
        imageUrl: footballer.imageUrl 
      });
    }

    if (role === 'ADMIN') {
      return res.json(footballer);
    }

    return res.status(403).json({ error: 'Unauthorized access' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST route to add a footballer
router.post('/footballers', async (req, res) => {
  try {
    const { id, firstName, lastName, position, club, country, dateOfBirth, height, weight, imageUrl } = req.body;


    if (!id || !firstName || !lastName || !position || !club || !country || !dateOfBirth || !height || !weight) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const newFootballer = new Footballer({
      id,
      firstName,
      lastName,
      position,
      club,
      country,
      dateOfBirth,
      height,
      weight,
      imageUrl
    });

    await newFootballer.save();
    res.status(201).json({ message: 'Footballer added successfully', data: newFootballer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add footballer', error: err.message });
  }
});
router.put('/footballers/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const updatedData = req.body;  // Data sent by the client to update

  // Check if the user is an admin
  if (role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    // Find and update the footballer by ID
    const footballer = await Footballer.findOneAndUpdate(
      { id: Number(id) },  // Search for the footballer by ID
      updatedData,  // The data to update
      { new: true, runValidators: true }  // Return the updated document, and validate
    );

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    // Return the updated footballer details
    return res.json(footballer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.delete('/footballers/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  // Check if the user is an admin
  if (role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    // Find and delete the footballer by ID
    const footballer = await Footballer.findOneAndDelete({ id: Number(id) });

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    // Return success message
    return res.json({ message: 'Footballer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
