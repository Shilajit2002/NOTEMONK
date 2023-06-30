// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import User Collection/Model
const User = require("../Model/user");
// Import Search Note Collection/Model
const SearchNote = require("../Model/searchNote");
// Import Authentication
const auth = require("../Middleware/auth");

// Get all the User details
router.get("/all-users/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Find all the Users Details
            const user = await User.find();

            let response = [];

            if (user) {
                // Take only the id and username from the User details
                response = user.filter(u => u._id.toString() !== req.user.id).map(({ _id, username }) => ({ _id, username }));
            }

            // Set Ok Status
            res.status(200).json(response);
        }
        // If not show error
        else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Get all the notes details by posting search notes 
router.post("/all-users-notes/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Find all the Users Details
            const searchNote = await SearchNote.find();

            let note = [];

            if (searchNote) {
                // Convert the search text into an array of individual words
                const searchWords = req.body.searchText.toLowerCase().split(' ');

                note = searchNote.filter(u => {
                    const noteTitle = u.title.toLowerCase();
                    const noteTags = u.tag.map(t => t.tagname.toLowerCase());

                    // Check if any word in the search text matches the note's title
                    const titleMatches = searchWords.some(word => noteTitle.includes(word));

                    // Check if any word in the search text matches any of the note's tag names
                    const tagMatches = searchWords.some(word => noteTags.some(tag => tag.includes(word)));

                    return titleMatches || tagMatches;
                });
            }

            // Set Ok Status
            if (note.length !== 0) {
                res.status(200).json(note);
            }
            else {
                res.status(200).send("No notes found (`~`)");
            }
        }
        // If not show error
        else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

module.exports = router;