// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import User Collection/Model
const User = require("../Model/user");
// Import Authentication
const auth = require("../Middleware/auth");

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

module.exports = router;