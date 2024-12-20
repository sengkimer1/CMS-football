const express = require('express');
const mongoose = require('mongoose');
const footballerRoutes = require('./route/footballerRoutes');
const userRoutes = require('./route/userRoutes');
const ticketRoutes = require('./route/ticketRoutes');
const matchRoutes = require('./route/matchRoutes');
const booking = require('./route/booking')
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB: CMS_football');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  });

// API Routes
app.use('/api', footballerRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api', ticketRoutes);  // Ticket routes
app.use('/api', matchRoutes);
app.use('/api',booking)
// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
