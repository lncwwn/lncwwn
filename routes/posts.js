var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Post = require('../models/Post');
var PostService = require('../services/PostService');
var UserService = require('../services/UserService');

router.get('/', function(req, res, next) {
    PostService.list().then(function(posts) {
        var authors = posts.map(function(post) {
            return post.getUser();
        });

        Promise.settle(authors).then(function(results) {
            posts.forEach(function(post) {
                results.forEach(function(result) {
                    var author = result.value();
                    if (post['author'] === author['id']) {
                        post['author'] = author;
                    }
                });
            });

            res.render('posts', {posts: posts});
        });
    });
});

module.exports = router;
