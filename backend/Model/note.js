// Import Mongoose
const mongoose = require('mongoose');
// Import Moment Timezone for User Local Time
const moment = require('moment-timezone');

// Create Note Schema
const noteSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        ref: "User"
    },
    notesArr: [
        {
            title: {
                type: String
            },
            description: {
                type: String
            },
            files: [
                {
                    name: {
                        type: String
                    },
                    data: {
                        type: Buffer
                    },
                    size: {
                        type: Number
                    },
                    contentType: {
                        type: String
                    }
                }
            ],
            view: {
                type: String
            },
            tag: [
                {
                    tagname: {
                        type: String
                    }
                }
            ],
            createdAt: {
                type: Date,
                default: () => moment().tz(moment.tz.guess())
            },
            updatedAt: {
                type: Date,
                default: () => moment().tz(moment.tz.guess())
            },
            edit: [
                {
                    editor_username: {
                        type: String,
                        ref: "User"
                    },
                    editor_user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    },
                    accept: {
                        type: Boolean,
                        require: true
                    },
                    message: {
                        type: String
                    },
                    editedAt: {
                        type: Date,
                        default: Date.now
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
            ]
        }
    ]
})

// Crate Note Collection
const Note = mongoose.model("notes", noteSchema);

// Exports Note Module
module.exports = Note;