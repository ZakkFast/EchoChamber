const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

// @route   GET /api/comments
// @desc    Getting all comments
// @access  Public
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// @route   POST /api/comments
// @desc    Creating a new comment
// @access  Private
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// @route   DELETE /api/comements
// @desc    Deleting a post by id
// @access  Private
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;