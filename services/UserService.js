/**
 * User operation service
 *
 * @author victor li
 * @date 2015/07/30
 */

var moment = require('moment');
var User = require('../models/User');
var UserMapper = require('../modules/UserMapper');

module.exports = {

    list: function(offset, limit) {
        return UserMapper.list(offset, limit).then(function(users) {
            users.forEach(function(user, index) {
                user['joined'] = moment(user['joined']).format('YYYY-MM-DD HH:mm:ss');
            });

            return users;
        });
    },

    listByIds: function(ids) {
        return UserMapper.listByIds(ids).then(function(users) {
            users.forEach(function(user, index) {
                user['joined'] = moment(user['joined']).format('YYYY-MM-DD HH:mm:ss');
            });

            return users;
        });
    },

    findById: function(id) {
        return UserMapper.findById(id).then(function(user) {
            return user;
        });
    },

    findByNick: function(nick) {
        return UserMapper.findByNick(nick).then(function(user) {
            return user;
        });
    }

};

