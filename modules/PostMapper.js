/**
 * Post operation module
 *
 * @author victor li
 * @date 2015/07/30
 */

var Post = require('../models/Post');

var PostMapper = {};

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

module.exports = PostMapper;
