// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import Following Collection/Model
const Following = require("../Model/following");
// Import Follower Collection/Model
const Follower = require("../Model/follower");
// Import User Collection/Model
const User = require("../Model/user");
// Import Authentication
const auth = require("../Middleware/auth");

// API for Accept Follower Request
router.post('/follower/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Get the details of the following user by user id
            let following = await Following.findOne({ user_id: req.body._id });
            // Get the details of the follower user by user id
            let follower = await Follower.findOne({ user_id: user_id });

            // Find that following person id
            let followingId = await following.followingArr.findIndex(f => f.following_user_id.toString() === user_id);
            // Find that follower person id
            let followerId = await follower.followerArr.findIndex(f => f.follower_user_id.toString() === req.body._id);

            // Set true for accept
            following.followingArr[followingId].accept = true;
            follower.followerArr[followerId].accept = true;

            //  Save the Document in the Following Collection
            const setFollowing = await following.save();
            //  Save the Document in the Follower Collection
            const setFollower = await follower.save();

            const response = [setFollowing, setFollower]
            // Set Ok Status
            res.status(200).send(response);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Delete Follower Request
router.delete('/follower/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Get the details of the following user by user id
            let following = await Following.findOne({ user_id: req.body._id });
            // Get the details of the follower user by user id
            let follower = await Follower.findOne({ user_id: user_id });

            // Find that following person id
            let followingId = await following.followingArr.findIndex(f => f.following_user_id.toString() === user_id);
            // Find that follower person id
            let followerId = await follower.followerArr.findIndex(f => f.follower_user_id.toString() === req.body._id);

            // Delete the details of the follower and followings
            following.followingArr.splice(followingId, 1);
            follower.followerArr.splice(followerId, 1);

            //  Save the Document in the Following Collection
            const setFollowing = await following.save();
            //  Save the Document in the Follower Collection
            const setFollower = await follower.save();

            const response = [setFollowing, setFollower]
            // Set Ok Status
            res.status(200).send(response);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// API for Get all the Followers of that perticular User
router.get("/follower/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Get the details of the follower user by user id
            let follower = await Follower.findOne({ user_id: user_id });

            if (follower && follower.followerArr.length !== 0) {
                // Set Ok Status
                res.status(200).json(follower);
            }
            else {
                // Set Ok Status
                res.status(200).send("No followers yet (`~`)");
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