// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import JWT
const jwt = require('jsonwebtoken');
// Import bcryptjs
const bcryptjs = require('bcryptjs');

// Import User Collection/Model
const User = require("../Model/user");
// Import Profile Collection/Model
const Profile = require("../Model/profile");

// Import Following Collection/Model
const Following = require("../Model/following");
// Import Follower Collection/Model
const Follower = require("../Model/follower");

// Import Note Collection/Model
const Note = require("../Model/note");
// Import Search Note Collection/Model
const SearchNote = require("../Model/searchNote");

// Import Authentication
const auth = require("../Middleware/auth");

// Hash Password Func
const hashPassword = async (ps) => {
    // Generating the Salt
    const secPass = await bcryptjs.genSalt(Number(process.env.SALT));
    // Hashing the Password
    return await bcryptjs.hash(ps, secPass);
}

// SIGN UP API
router.post("/register", async (req, res) => {
    try {
        // Check the email is already exists or not
        let user = await User.findOne({ email: req.body.email });
        // If exists the email
        if (user) {
            // Set Conflict Status
            res.status(409).send("User Already Registered !!");
        }
        else {
            // Check the phoneno is already exists or not
            user = await User.findOne({ phone: req.body.phone });
            // If exists the phone
            if (user) {
                // Set Conflict Status
                res.status(409).send("User Already Registered !!");
            }
            else {
                // Check the username is already exists or not
                user = await User.findOne({ username: req.body.username });
                // If exists the username
                if (user) {
                    // Set Conflict Status
                    res.status(409).send("User Already Registered !!");
                }
                else {
                    // Call hashPassword Func
                    const newPass = await hashPassword(password);

                    // Set the Collection Field with Data
                    user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        password: newPass,
                        country: req.body.country,
                        code: req.body.code,
                        phone: req.body.phone
                    })

                    //  Save the Document in the User Collection
                    const createUser = await user.save();
                    //  Set Created Status
                    res.status(201).send(createUser);
                }
            }
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Create Token Func
const createToken = (u) => {
    return jwt.sign({ id: u._id }, process.env.SECRET_KEY,
        {
            // Token expires by 365 days or 1 after year
            expiresIn: "365d"
        }
    );
}

// SIGN IN API
router.post("/login", async (req, res) => {
    try {
        // Store the Username & Email & Password from request
        const { username, email, password } = req.body;
        // Check the Email is exists or not
        let logUser = await User.findOne({ email: email });

        // If not exists
        if (!logUser) {
            //  Set Not Found Status
            res.status(404).send("User Not Registered !!")
        }
        // If exists
        else {
            // Check the Username is exists or not
            // If not exists
            if (logUser.username !== username) {
                //  Set Not Found Status
                res.status(404).send("Username is Incorrect !!")
            }
            // If exists
            else {
                // Compare the password with database password
                const comparePassword = await bcryptjs.compare(password, logUser.password);
                // If the Password is wrong
                if (!comparePassword) {
                    //  Set Not Found Status
                    res.status(404).send("Password is Incorrect !!")
                }
                // If the Password is Correct
                else {
                    // Create a token by secret key
                    const token = createToken(logUser);
                    
                    // Set Ok Status
                    res.status(200).json({ token, userid: logUser._id })
                }
            }
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// API for Get User & Profile Details by ID
router.get("/user/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Get the details of the user by id
            const user = await User.findById(req.user.id);
            // Get the details of the profile by user id
            const profile = await Profile.findOne({ user_id: req.user.id });

            // Set both as a Array of Objects
            const response = [user, profile];

            // Set Ok Status
            res.status(200).json(response);
        }
        // If not show error
        else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

//  API for Update User Details by ID
router.patch("/user/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Check the email is already exists or not
            let user = await User.findOne({ email: req.body.email });
            // If exists the email but different user
            if (user && user._id.toString() !== req.user.id) {
                // Set Conflict Status
                res.status(409).send("User Already Registered !!");
            }
            else {
                // Check the phoneno is already exists or not 
                user = await User.findOne({ phone: req.body.phone });
                // If exists the phone but different user
                if (user && user._id.toString() !== req.user.id) {
                    // Set Conflict Status
                    res.status(409).send("User Already Registered !!");
                }
                else {
                    // Check the username is already exists or not 
                    user = await User.findOne({ username: req.body.username });
                    // If exists the username but different user
                    if (user && user._id.toString() !== req.user.id) {
                        // Set Conflict Status
                        res.status(409).send("User Already Registered !!");
                    }
                    else {
                        //  Update the Details by ID
                        const updateUser = await User.findByIdAndUpdate({ _id: req.user.id }, req.body);
                        // Set Ok Status
                        res.status(200).send(updateUser);
                    }
                }
            }
        } // If not show error
        else {
            // Set Internal Server Error Status
            res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

//  API for Delete User Details by ID
router.delete('/user/:id', auth, async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            // Delete All things of that User
            const user = await User.findByIdAndDelete({ _id: req.user.id });
            const userProfile = await Profile.deleteOne({ user_id: req.user.id });
            const note = await Note.deleteOne({ user_id: req.user.id });
            const following = await Following.deleteOne({ user_id: req.user.id });
            const follower = await Follower.deleteOne({ user_id: req.user.id });
            const searchNote = await SearchNote.deleteMany({ user_id: req.user.id });

            const response = [user, userProfile, note, following, follower, searchNote];

            // Set Ok Status
            res.status(200).json(response);
        } else {
            // Set Internal Server Error Status
            res.status(500).send("You can only delete your own account !!");
        }
    } catch (error) {
        // Set Internal Server Error Status
        res.status(500).send("Server Error !!");
    }
})

// Exports the Router
module.exports = router;