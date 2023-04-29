// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Follower Schema
const followerSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        ref: "User"
    },
    followerArr: [
        {
            follower_username: {
                type: String,
                ref: "User"
            },
            follower_user_id: {
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

// Crate Follower Collection
const Follower = mongoose.model("followers", followerSchema);

// Exports Follower Module
module.exports = Follower;