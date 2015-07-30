var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var PostService = require('../services/PostService');

router.get('/', function(req, res, next) {
    PostService.list().then(function(posts) {
        res.render('posts', {posts: posts});
    });
});

module.exports = router;
