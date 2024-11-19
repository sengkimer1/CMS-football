const express = require('express');
const mongoose = require('mongoose');
const footballerRoutes = require('./route/footballerRoutes');
require('dotenv').config();  

const app = express();
app.use(express.json());  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB CMS_football'))
  .catch((err) => console.log('MongoDB connection error:', err));


app.use('/api',footballerRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
