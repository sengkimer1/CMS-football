// Import Express
const express = require('express');

// Initialize the app
const app = express();

// Define a port
const PORT = 3000;

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
