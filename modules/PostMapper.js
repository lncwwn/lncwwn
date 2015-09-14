/**
 * Post operation module
 *
 * @author victor li
 * @date 2015/07/30
 */
'use strict'
let Post = require('../models/Post');
let moment = require('moment');

let PostMapper = {};

PostMapper.list = function(offset, limit) {
    if (typeof offset === 'undefined') offset = 0;
    if (typeof limit === 'undefined') limit = 20;

    return Post.findAll({
        offset: offset,
        limit: limit,
        order: [['created', 'DESC']]
    }).then(function(posts) {
        return posts;
    });
};

PostMapper.getPostById = function(id) {
    return Post.findOne({
        where: {
            id: id
        }
    }).then(function(post) {
        return post;
    });
};

PostMapper.create = function(post) {
    return Post.create(post);
};

PostMapper.update = function(post) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    post.created = now;
    return Post.updateAttributes(post);
};

module.exports = PostMapper;
