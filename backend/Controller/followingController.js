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

// API for Send Following Request
router.post('/following/:id', auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Get the details of the following user by user id
            let following = await Following.findOne({ user_id: user_id });
            // Get the details of the follower user by user id
            let follower = await Follower.findOne({ user_id: req.body._id });

            // Get the details of the following user by user id
            let followingUser = await User.findOne({ _id: user_id });
            // Get the details of the follower user by user id
            let followerUser = await User.findOne({ _id: req.body._id });

            // If the Following person not following anyone
            if (!following) {
                // Create a new Following Collection
                following = new Following({
                    user_id: user_id,
                    username: followingUser.username,
                    // Store the Follower user id
                    followingArr: [{
                        following_username: followerUser.username,
                        following_user_id: req.body._id,
                        accept: false
                    }]
                })
                // If the Follower person not have any follower
                if (!follower) {
                    // Create a new Follower Collection
                    follower = new Follower({
                        user_id: req.body._id,
                        username: followerUser.username,
                        // Store the Following user id
                        followerArr: [{
                            follower_username: followingUser.username,
                            follower_user_id: user_id,
                            accept: false
                        }]
                    })
                }
                // If the Follower person already have any follower
                else {
                    // Store the Following user id
                    follower.followerArr.push({
                        follower_username: followingUser.username,
                        follower_user_id: user_id,
                        accept: false
                    })
                }
            }
            // If the Following person already following anyone
            else {
                // Find that follower person id
                let followingId = await following.followingArr.findIndex(f => f.following_user_id.toString() === req.body._id);

                //  If not present
                if (followingId === -1) {
                    // Store the Follower user id
                    following.followingArr.push({
                        following_username: followerUser.username,
                        following_user_id: req.body._id,
                        accept: false
                    })
                    // If the Follower person not have any follower
                    if (!follower) {
                        // Create a new Follower Collection
                        follower = new Follower({
                            user_id: req.body._id,
                            username: followerUser.username,
                            // Store the Following user id
                            followerArr: [{
                                follower_username: followingUser.username,
                                follower_user_id: user_id,
                                accept: false
                            }]
                        })
                    }
                    // If the Follower person already have any follower
                    else {
                        // Store the Following user id
                        follower.followerArr.push({
                            follower_username: followingUser.username,
                            follower_user_id: user_id,
                            accept: false
                        })
                    }
                }
                //  If already present the follower user id then delete that follower user
                else {
                    //  If already present the following user id then delete that following user
                    let followerId = await follower.followerArr.findIndex(f => f.follower_user_id.toString() === user_id);

                    // Delete the details of the follower and followings
                    following.followingArr.splice(followingId, 1);
                    follower.followerArr.splice(followerId, 1);
                }
            }
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

// API for Get all the Followings
router.get("/following/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const user_id = req.user.id;

            // Get the details of the following user by user id
            let following = await Following.findOne({ user_id: user_id });

            if (following && following.followingArr.length !== 0) {
                // Set Ok Status
                res.status(200).json(following);
            }
            else {
                // Set Ok Status
                res.status(200).send("No followings");
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