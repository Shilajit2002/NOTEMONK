// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import Multer
const multer = require('multer');
// Import User Collection/Model
const User = require("../Model/user");
// Import Note Collection/Model
const Note = require("../Model/note");
// Import Authentication
const auth = require("../Middleware/auth");

// Create Storage by Multer MemoryStorage
const Storage = multer.memoryStorage({
    // Create the filename for every file
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Store the Notes Files in Multer
const upload = multer({ storage: Storage });

// API for Adding Note Files by Id
router.post('/add-note-files/:id', auth, upload.array('files'), async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            // Store the All files in Array of Objects
            const files = req.files.map(file => {
                return {
                    name: file.originalname,
                    data: file.buffer,
                    size: file.size,
                    contentType: file.mimetype
                }
            })

            // Push the Array of Files in Database which notes has last created
            note.notesArr[note.notesArr.length - 1].files.push(...files);

            //  Save the Document in the Note Collection
            const setNote = await note.save();

            // Set Created Status
            res.status(201).json(setNote);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Editing Note Files by Id
router.patch('/edit-note-files/:id', auth, upload.array('files'), async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            // Find that perticular Note index by using note id
            let noteId = await note.notesArr.findIndex(n => n._id.toString() === req.body._id);

            // Set the Username of that Note User
            note.username = user.username;

            // Store the All files in Array of Objects
            const files = req.files.map(file => {
                return {
                    name: file.originalname,
                    data: file.buffer,
                    size: file.size,
                    contentType: file.mimetype
                }
            })

            // If the Notes have any files then remove all the files
            if (note.notesArr[noteId].files.length !== 0) {
                note.notesArr[noteId].files.splice(0, note.notesArr[noteId].files.length);
            }
            // Push the Array of Files in Database of that perticular notes
            note.notesArr[noteId].files.push(...files);

            //  Save the Document in the Note Collection
            const setNote = await note.save();

            // Set Ok Status
            res.status(200).json(setNote);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }

})

// API for Creating Note Details by Id
router.post('/add-note/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            // If the User havenot create any note then create a new note
            if (!note) {
                note = new Note({
                    user_id: user_id,
                    username: user.username,
                    notesArr: [
                        req.body
                    ]
                })
            }
            // If the User already have any note then push the new note in the notes array database
            else {
                note.username = user.username
                note.notesArr.push(req.body);
            }

            //  Save the Document in the Note Collection
            const setNote = await note.save();

            // Set Created Status
            res.status(201).json(setNote);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Editing Note Details by Id
router.patch('/edit-note/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            // Find that perticular Note index by using note id
            let noteId = await note.notesArr.findIndex(n => n._id.toString() === req.body._id);

            // Set all details of the Note
            note.username = user.username;
            note.notesArr[noteId].title = req.body.title;
            note.notesArr[noteId].description = req.body.description;
            note.notesArr[noteId].view = req.body.view;

            //  Save the Document in the Note Collection
            const setNote = await note.save();

            // Set Ok Status
            res.status(200).json(setNote);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Deleting a Note Details by id
router.delete('/delete-note/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            // Find that perticular Note index by using note id
            let noteId = await note.notesArr.findIndex(n => n._id.toString() === req.body._id);

            // Remove that Perticular Note from the Note array from the Database
            note.notesArr.splice(noteId, 1);

            //  Save the Document in the Note Collection
            const setNote = await note.save();

            // Set Ok Status
            res.status(200).send(setNote);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Get all the Note Details of a perticular User by id
router.get('/all-note/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Find the User by User id
            let user = await User.findOne({ _id: user_id });
            // Find all Notes of that User by User id
            let note = await Note.findOne({ user_id: user_id });

            if (note && note.notesArr.length !== 0) {
                // Set Ok Status
                res.status(200).json(note);
            }
            else {
                // Set Ok Status
                res.status(200).send("No note has been created yet");
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

// Exports the Router
module.exports = router;