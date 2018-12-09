const express = require("express");
const bcrypt = require("bcryptjs");
const gravitar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("./../../models/User");
const hashKey = require("./../../config/keys").secret;
const register = require("./../../validation/register");
const login = require("./../../validation/login");

const router = express.Router();

// @route   POST api/users/register
// @desc    Registers a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = register(req.body);

  if (!isValid) return res.status(404).json(errors);

  //Check if user already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Already already exists";
      return res.status(400).json(errors);
    } else {
      // Configure user avatar
      const avatar = gravitar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // New user object to register
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password1
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password1, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // Register user to mongoose
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/register
// @desc    Logs in a user
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = login(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Check if user exists for given mail
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Email not found";
      return res.status(400).json(errors);
    }

    // Check if password is correct for given email
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        // Obtain bearer token
        jwt.sign(payload, hashKey, { expiresIn: "1 day" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/register
// @desc    Currently logged in user
// @access  Protected
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
