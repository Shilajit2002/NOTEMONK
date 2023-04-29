// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Following Schema
const followingSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        ref: "User"
    },
    followingArr: [
        {
            following_username: {
                type: String,
                ref: "User"
            },
            following_user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            accept: {
                type: Boolean,
                require: true
            }
        }
    ]
})

// Crate Following Collection
const Following = mongoose.model("followings", followingSchema);

// Exports Following Module
module.exports = Following;