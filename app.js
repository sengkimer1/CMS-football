const express = require('express');
const mongoose = require('mongoose');
const footballerRoutes = require('./route/footballerRoutes');
const userRoutes = require('./route/userRoutes');
const matchRoutes = require('./route/matchRoutes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB: CMS_football');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// API Routes
app.use('/api', footballerRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api', matchRoutes); 

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
