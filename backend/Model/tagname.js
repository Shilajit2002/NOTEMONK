// Import Mongoose
const mongoose = require('mongoose');

// Create TagName Schema
const tagNameSchema = mongoose.Schema({
    tagname: {
        type: String
    }
})

// Create TagNameCollection
const TagName = mongoose.model("tagnames", tagNameSchema);

// Exports TagName Module
module.exports = TagName;