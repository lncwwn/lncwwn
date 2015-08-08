/**
 * Interaction operation module
 *
 * @author victor li
 * @date 2015/08/07
 */

let Interaction = require('../models/Interaction');

let InteractionMapper = {};

InteractionMapper.addLike = function(userId, postId) {
    return Interaction.findOrCreate({where: {user: userId, post: postId}, defaults: {like: true, hate: false}});
};

/**
 * gets count of the specified post
 * @param postId specified post id
 */
InteractionMapper.count = function(postId) {
    return Interaction.count({where: {post: postId}});
}

module.exports = InteractionMapper;
