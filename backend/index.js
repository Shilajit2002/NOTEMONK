// Import dotenv
require('dotenv').config({ path: './.env' });

// Import Express
const express = require('express');
// Import BodyParser
const bodyParser = require('body-parser');
// Import CORS
const cors = require('cors');
// Connect Database
require("./Database/db");

// Create App
const app = express();

// Get the Port
const port = process.env.PORT || 5000;

// Backend URL
const bUrl = process.env.BACKEND_URL;

// Set up body-parser middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

// Import User Router
app.use("/api/users", require("./Controller/userController"));
// Import Profile Router
app.use("/api/profiles", require("./Controller/profileController"));
// Import CountryCode Router
app.use("/api/codes/", require("./Controller/countryCodeController"));
// Import TagName Router
app.use("/api/tags/", require("./Controller/tagNameController"));
// Import Following Router
app.use("/api/followings/", require("./Controller/followingController"))
// Import Follower Router
app.use("/api/followers/", require("./Controller/followerController"))
// Import Search Router
app.use("/api/searches/", require("./Controller/searchController"))
// Import Note Router
app.use("/api/notes/", require("./Controller/noteController"))
// Import All User Controller Router
app.use("/api/allUser/", require("./Controller/allUserController"))

app.all("*", (req, res) => {
    res.status(404).send("`~` Page Not Found `~`");
})

app.listen(port, () => {
    console.log(`Server Running at Port ${port}`);
    console.log(`Server Running at ${bUrl}`);
})