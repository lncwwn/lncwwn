/**
 * Interaction operation service
 *
 * @author victor li
 * @date 2015/08/07
 */
'use strict'
let moment = require('moment');
let Interaction = require('../models/Interaction');
let InteractionMapper = require('../modules/InteractionMapper');

module.exports = {

    addLike: function(userId, postId) {
        return InteractionMapper.addLike(userId, postId);
    },

    count: function(postId) {
        return InteractionMapper.count(postId);
    }

};

