// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import Tag Name Collection/Model
const TagName = require("../Model/tagname");
// Import Authentication
const auth = require("../Middleware/auth");

// API for Get All Tag Name Details
router.get('/alltagnames/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const response = await TagName.find();

            // Set Ok Status
            res.status(200).json(response);

        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// Exports the Router
module.exports = router;