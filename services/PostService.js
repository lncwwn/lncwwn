/**
 * Post operation service
 *
 * @author victor li
 * @date 2015/07/30
 */
'use strict'
let moment = require('moment');
let Post = require('../models/Post');
let PostMapper = require('../modules/PostMapper');

module.exports = {

    list: function(offset, limit) {
        return PostMapper.list(offset, limit).then(function(posts) {
            posts.forEach(function(post, index) {
                post['created'] = moment(post['created']).format('YYYY-MM-DD HH:mm:ss');
                if (post['updated'])
                    post['updated'] = moment(post['updated']).format('YYYY-MM-DD HH:mm:ss');
            });

            return posts;
        });
    },

    getPostById: function(id) {
        return PostMapper.getPostById(id).then(function(post) {
            post['created'] = moment(post['created']).format('YYYY-MM-DD HH:mm:ss');
            if (post['updated'])
                post['updated'] = moment(post['updated']).format('YYYY-MM-DD HH:mm:ss');

            return post;
        });
    },

    create: function(post) {
        return PostMapper.create(post).then(function(post) {
            return post;
        });
    },

};

