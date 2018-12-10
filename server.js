const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const router = express.Router();

const app = express();

// Port config
const port = process.env.PORT || 5000;

// DB key
const dbKey = require("./config/keys").mongoDbKey;

// Register passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Parser for request body
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

// Connect to mongoDb
mongoose
  .connect(
    dbKey,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Successfully connected to MongoDb"))
  .catch(err => console.log(`Failed to connect to db. ${err}`));
