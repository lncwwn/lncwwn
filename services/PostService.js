/**
 * Post operation service
 *
 * @author victor li
 * @date 2015/07/30
 */

var moment = require('moment');
var Post = require('../models/Post');
var PostMapper = require('../modules/PostMapper');

module.exports = {

    list: function(offset, limit) {
        return PostMapper.list(offset, limit).then(function(posts) {
            posts.forEach(function(post, index) {
                post['created'] = moment(post['created']).format('YYYY-MM-DD HH:mm:ss');
            });

            return posts;
        });
    }

};

