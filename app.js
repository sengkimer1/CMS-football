// // Import Express
// const express = require('express');

// // Initialize the app
// const app = express();

// // Define a port
// const PORT = 3000;

// // Define a basic route
// app.get('/', (req, res) => {
//     res.send('Hello, Express!');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });




require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const conDB = require('./config/db');
const jwt = require("jsonwebtoken");
const userModel = require('./userModel');


const app = express();
const port = process.env.PORT || 5000;

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Coonect to the database
conDB();


// router handlers 
app.get('/home', (req, res) => {
  res.status(200).json('You are welcome');
})

// Define a route that registers users to the database


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});