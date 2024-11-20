const Footballer = require('../Model/footballer');

// Get all footballers
exports.getAllFootballers = async (req, res) => {
  const { role } = req.user;

  try {
    const footballers = await Footballer.find();

    if (!footballers || footballers.length === 0) {
      return res.status(404).json({ error: 'No footballers found' });
    }

    if (role === 'USER') {
      const limitedData = footballers.map(({ id, firstName, lastName, position, club, country, imageUrl }) => ({
        id,
        firstName,
        lastName,
        position,
        club,
        country,
        imageUrl
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
};

// Get footballer by ID
exports.getFootballerById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  try {
    const footballer = await Footballer.findOne({ id: Number(id) });

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

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
};

// Add a footballer
exports.addFootballer = async (req, res) => {
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
};

// Update a footballer
exports.updateFootballer = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const updatedData = req.body;

  if (role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const footballer = await Footballer.findOneAndUpdate(
      { id: Number(id) },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    return res.json(footballer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a footballer
exports.deleteFootballer = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const footballer = await Footballer.findOneAndDelete({ id: Number(id) });

    if (!footballer) {
      return res.status(404).json({ error: 'Footballer not found' });
    }

    return res.json({ message: 'Footballer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
