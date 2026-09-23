const express = require('express');
const router = express.Router(); // Create a new router instance

// Matches: GET /users/
router.get('/', (req, res) => {
    res.send('List of all users');
});

// Matches: GET /users/:id
router.get('/:id', (req, res) => {
    res.send(`Details for user ID: ${req.params.id}`);
});

// Matches: POST /users/
router.post('/', (req, res) => {
    res.send('Create a new user');
});

module.exports = router; // Export the router object
