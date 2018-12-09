const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

const User = require("./../../models/User");
const Profile = require("./../../models/Profile");
const profileValidator = require("./../../validation/profile");
const experienceValidator = require("./../../validation/experience");
const educationValidator = require("./../../validation/education");

// @route   GET api/profiles
// @desc    Get profile of current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
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

// @route   POST api/profiles
// @desc    Creates or updates a user's profile
// @access  Protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};

    const { errors, isValid } = profileValidator(req.body);

    if (!isValid) return res.status(400).json(errors);

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");

    profileFields.social = {};

    // social
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: req.user.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "Handle already taken";
              return res.status(400).json(errors);
            }
          })
          .catch(err => res.status(400).json(err));

        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   DELETE api/profiles/
// @desc    Deletes a user's account and profile
// @access  Protected
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id })
      .then(() => {
        User.findOneAndDelete({ _id: req.user.id })
          .then(() => res.json("Success"))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   POST api/profiles/experience
// @desc    Creates or updates a user's experience
// @access  Protected
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = experienceValidator(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const experience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.experience.unshift(experience);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   POST api/profiles/education
// @desc    Creates or updates a user's education
// @access  Protected
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = educationValidator(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const experience = {
          school: req.body.school,
          fieldOfStudy: req.body.fieldOfStudy,
          degree: req.body.degree,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.education.unshift(experience);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   DELETE api/profiles/experience
// @desc    Delete a user's experience
// @access  Protected
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeId = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(removeId, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   DELETE api/profiles/education
// @desc    Delete a user's education
// @access  Protected
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeId = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(removeId, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   GET api/profiles/handle/:handle
// @desc    Gets a profile based on handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "Profile doesnt exist for given handle";
        return res.status(400).json(errors);
      }
      return res.json(profile);
    });
});

// @route   GET api/profiles/user/:userId
// @desc    Gets a profile based on userId
// @access  Public
router.get("/user/:id", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "Profile doesnt exist for given userId";
        return res.status(400).json(errors);
      }
      return res.json(profile);
    });
});

// @route   GET api/profiles/all
// @desc    Gets all the profiles
// @access  Public
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There are no profiles";
        return res.status(400).json(errors);
      }
      return res.json(profiles);
    });
});

module.exports = router;
