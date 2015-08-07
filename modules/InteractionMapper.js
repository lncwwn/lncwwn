/**
 * Interaction operation module
 *
 * @author victor li
 * @date 2015/08/07
 */

var Interaction = require('../models/Interaction');

var InteractionMapper = {};

InteractionMapper.add = function(userId, postId) {
    return Interaction.findOrCreate({where: {user: userId, post: postId}}).spread(function(interaction, created) {
        console.log(interaction);
        console.log(created);
    });
};

module.exports = InteractionMapper;
