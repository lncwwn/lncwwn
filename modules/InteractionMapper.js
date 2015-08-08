/**
 * Interaction operation module
 *
 * @author victor li
 * @date 2015/08/07
 */

let Interaction = require('../models/Interaction');

let InteractionMapper = {};

InteractionMapper.addLike = function(userId, postId) {
    return Interaction.findOrCreate({where: {user: userId, post: postId}, defaults: {like: true, hate: false}})
        .spread(function(interaction, created) {
            console.log(interaction);
            console.log(created);
    });
};

module.exports = InteractionMapper;
