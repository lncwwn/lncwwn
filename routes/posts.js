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

        var interactions = posts.map(function(post) {
            return post.getInteractions().then(function(interaction) {
                post.interaction = interaction;
            });
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
                    post.interactionData = {};
                    var interaction = post.interaction;
                    if (interaction && interaction.length > 0) {
                        var read = 0, like = 0, hate = 0;
                        interaction.forEach(function(i) {
                            read += i.read;
                            if (i.like) like++;
                            if (i.hate) hate++;
                        });
                        post.interactionData.read = read;
                        post.interactionData.like = like;
                        post.interactionData.hate = hate;
                    } else {
                        post.interactionData.read = 0;
                        post.interactionData.like = 0;
                        post.interactionData.hate = 0;
                    }
                });

                res.render('posts', {posts: posts});
            });

        });
    });
});

module.exports = router;
