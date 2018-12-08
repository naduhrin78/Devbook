const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

const User = require("./../../models/User");
const Profile = require("./../../models/Profile");

// @route   POST api/profiles
// @desc    Get profile of current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.body.id })
      .then(profile => {
        if (!profile) {
          errors.profile = "Profile not found";
          return res.status(404).json(errors);
        }

        return res.json(profile);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
