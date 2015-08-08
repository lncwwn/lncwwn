/**
 * Interaction operation service
 *
 * @author victor li
 * @date 2015/08/07
 */

let moment = require('moment');
let Interaction = require('../models/Interaction');
let InteractionMapper = require('../modules/InteractionMapper');

module.exports = {

    addLike: function(userId, postId) {
        InteractionMapper.addLike(userId, postId);
    }

};

