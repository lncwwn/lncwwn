/**
 * Interaction operation service
 *
 * @author victor li
 * @date 2015/08/07
 */

var moment = require('moment');
var Interaction = require('../models/Interaction');
var InteractionMapper = require('../modules/InteractionMapper');

module.exports = {

    add: function(userId, postId) {
        InteractionMapper.add(userId, postId);
    }

};

