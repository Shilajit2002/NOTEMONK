// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import User Collection/Model
const User = require("../Model/user");
// Import Profile Collection/Model
const Profile = require("../Model/profile");
// Import Note Collection/Model
const Note = require("../Model/note");
// Import Following Collection/Model
const Following = require("../Model/following");
// Import Follower Collection/Model
const Follower = require("../Model/follower");
// Import Authentication
const auth = require("../Middleware/auth");

// API for Get Perticular Note Details of a perticular User by id
router.get('/note-user/:id/:prof_id/:note_id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;
            const prof_id = req.params.prof_id;
            const note_id = req.params.note_id;

            // Find all Notes of that User by Prof id
            let note = await Note.findOne({ user_id: prof_id });

            if (note && note.notesArr.length !== 0) {
                // Find that perticular Note index by using note id
                let noteId = await note.notesArr.findIndex(n => n._id.toString() === note_id);

                if (noteId !== -1) {
                    let userDetails = { username: note.username, user_id: note.user_id }
                    // Set Ok Status
                    res.status(200).send([note.notesArr[noteId], userDetails]);
                } else {
                    // Set Internal Server Error Status
                    res.status(500).send("No Notes Found !!");
                }
            }
            else {
                // Set Internal Server Error Status
                res.status(500).send("No User Found !!");
            }

        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Get a Perticular User all details by Profile Id
router.get("/all-user-prof/:id/:prof_id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Get the details of the user by id
            const user = await User.findById(req.params.prof_id);

            // Get the details of the profile by user id
            const profile = await Profile.findOne({ user_id: req.params.prof_id });

            // Get the details of the following user by user id
            const following = await Following.findOne({ user_id: req.params.prof_id });
            let folwLength = 0;
            if (following && following.followingArr.length !== 0) {
                const folwVal = following.followingArr.filter(f => f.accept === true);
                folwLength = folwVal.length;
            }

            // Get the details of the follower user by user id
            const follower = await Follower.findOne({ user_id: req.params.prof_id });
            let folLength = 0;
            let temp=[];
            if (follower && follower.followerArr.length !== 0) {
                const folVal = follower.followerArr.filter(fr => fr.accept === true);
                folLength = folVal.length;
                // Find the Current User in that Person Follower Page
                temp = follower.followerArr.filter(f => f.follower_user_id.toString() === req.params.id);
            }

            // Find all Notes of that User by User id
            const note = await Note.findOne({ user_id: req.params.prof_id });
            let publicNotes = [];
            if (note) {
                publicNotes = note.notesArr.filter(n => n.view !== "PRIVATE");
            }

            // Set both as a Array of Objects
            const response = [user, profile, folLength, folwLength, temp, publicNotes];

            // Set Ok Status
            res.status(200).json(response);
        }
        // If not show error
        else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// Exports the Router
module.exports = router;