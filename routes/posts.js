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

        var interactions = posts.map(function(interaction) {
            return interaction.getInteractions();
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

            Promise.settle(interactions).then(function(results) {
                posts.forEach(function(post) {
                    results.forEach(function(result) {
                        var interaction = result.value();
                        post.interaction = {};
                        if (interaction && interaction.length > 0) {
                            interaction.forEach(function(i) {

                            });
                        } else {
                            post.interaction.read = 0;
                            post.interaction.like = 0;
                            post.interaction.hate = 0;
                        }
                        console.log(JSON.stringify(interaction));
                    });
                });

                res.render('posts', {posts: posts});
            });

        });
    });
});

module.exports = router;
