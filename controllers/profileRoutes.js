const router = require('express').Router()
const sequelize= require('../config/connection')
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_title',
            'created_at',
            'post_content',
            'karma'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
                    'karma'
                ],
                include: {
                    model: User,
                    attributes: ['user_name', 'karma']
                }
            },
            {
                model: User,
                attributes: [
                    'user_name', 'karma'
                ]
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('profile', { post, logged_in: true })
    })
    .catch(err => {
        comnsole.log(err)
        res.status(500).json(err)
    })
})

router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'karma']
          }
        },
        {
          model: User,
          attributes: ['username', 'karma']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, logged_in: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router