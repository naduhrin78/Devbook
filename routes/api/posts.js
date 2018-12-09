const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("./../../models/Post");
const postValidator = require("./../../validation/post");

// @route   POST api/posts
// @desc    Creates a post
// @access  Protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidator(req.body);

    if (!isValid) return res.status(400).json(errors);

    const postFields = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    new Post(postFields)
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(400).json(err));
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Protected
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ id: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (post.user.toString() != req.user.id) {
            errors.post = "Unauthorized to delete this post";
            return res.status(401).json(erros);
          }

          post.delete().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

module.exports = router;
