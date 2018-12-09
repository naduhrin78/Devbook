const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("./../../models/Post");
const postValidator = require("./../../validation/post");

// @TODO Update a post

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

// @route   POST api/posts/:id/like
// @desc    Like a post or unlike if already liked
// @access  Protected
router.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ id: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (
            // Check if already liked
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // Unlike if liked i.e remove user id from like array of post
            const removeId = post.likes
              .map(like => like.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeId, 1);
          } else {
            // Like i.e add user id to like array of post
            post.likes.unshift({ user: req.user.id });
          }
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

// @route   POST api/posts/:id/comment
// @desc    Comment on a post
// @access  Protected
router.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ id: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          const { errors, isValid } = postValidator(req.body);

          if (!isValid) return res.status(400).json(errors);

          const commentFields = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
          post.comments.unshift(commentFields);
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

// @route   DELETE api/posts/:id/comment/:comment_id
// @desc    Delete a comment on a post
// @access  Protected
router.delete(
  "/:id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ id: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentdoesnotexit: "Comment does not exit" });
          }

          const removeId = post.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.comment_id);

          if (post.comments[removeId].user.toString() != req.user.id)
            return res
              .status(401)
              .json({ comment: "Unauthorized to delete this comment" });

          post.comments.splice(removeId, 1);

          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    });
  }
);

module.exports = router;
