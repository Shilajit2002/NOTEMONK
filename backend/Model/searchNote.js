// Import Mongoose
const mongoose = require('mongoose');

// Create Search Note Schema
const seacrhNoteSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        ref: "User"
    },
    note_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tag: [
        {
            tagname: {
                type: String
            }
        }
    ],
    like: {
        type: Number
    },
    comments: [
        {
            msg: {
                type: String
            }
        }
    ],
    time: {
        type: Date,
    },
})

// Crate Search Note Collection
const SearchNote = mongoose.model("searchnotes", seacrhNoteSchema);

// Exports Search Note Module
module.exports = SearchNote;