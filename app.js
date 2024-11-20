const express = require('express');
const mongoose = require('mongoose');
const footballerRoutes = require('./route/footballerRoutes');
require('dotenv').config();  

const app = express();
app.use(express.json());  
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB CMS_football'))
  .catch((err) => console.log('MongoDB connection error:', err));


app.use('/api',footballerRoutes);

// Start the server
app.listen(PORT, () => {
  console.log('Server running on port 3000');
});
