let express = require('express');
let router = express.Router();
let Promise = require('bluebird');
let Post = require('../models/Post');
let PostService = require('../services/PostService');
let UserService = require('../services/UserService');
let InteractionService = require('../services/InteractionService');

router.get('/', function(req, res, next) {
    PostService.list().then(function(posts) {

        posts.forEach(function(post) {
            post.showMore = false;
            if (post.content.length > 236) {
                post.showMore = true;
                post.summary = post.content.substr(0, 236);
            }
        });

        let authors = posts.map(function(post) {
            return post.getUser();
        });

        let interactions = posts.map(function(post) {
            return post.getInteractions().then(function(interaction) {
                post.interaction = interaction;
            });
        });

        Promise.settle(authors).then(function(results) {
            posts.forEach(function(post) {
                results.forEach(function(result) {
                    const author = result.value();
                    if (post['author'] === author['id']) {
                        post['author'] = author;
                    }
                });
            });

            Promise.settle(interactions).then(function(results) {
                posts.forEach(function(post) {
                    post.interactionData = {};
                    const interaction = post.interaction;
                    if (interaction && interaction.length > 0) {
                        let read = 0, like = 0, hate = 0;
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

                const title = '文章列表';

                res.render('posts', {posts: posts, title: title});
            });

        });
    });
});

router.get('/:id', function(req, res, next) {
    const postId = req.params.id;
    PostService.getPostById(postId).then(function(post) {
        res.render('post', {post: post});
    });
});

router.post('/interact', function(req, res, next) {
    const userId = req.body.userId;
    const postId = req.body.postId;
    InteractionService.addLike(userId, postId).spread(function(interaction, created) {
        if (created) {
            InteractionService.count(postId).then(function(num) {
                res.json({count: num});
            });
        } else {
            res.json({error: true});
        }
    });

});

module.exports = router;
