/**
 * User operation module
 *
 * @author victor li
 * @date 2015/07/30
 */

var User = require('../models/User');

var UserMapper = {};

UserMapper.list = function(offset, limit) {
    if (typeof offset === 'undefined') offset = 0;
    if (typeof limit === 'undefined') limit = 20;

    return User.findAll({
        offset: offset,
        limit: limit,
        order: [['joined', 'DESC']]
    }).then(function(posts) {
        return posts;
    });
};

UserMapper.listByIds = function(ids) {
    return User.findAll({
        where: {
            id: {
                $in: ids
            }
        }
    }).then(function(users) {
        return users;
    });
};

UserMapper.findById = function(id) {
    return User.findOne({
        where: {
            id: id
        }
    }).then(function(user) {
        return user;
    });
};

UserMapper.findByNick = function(nick) {
    return User.findOne({
        where: {
            nick: nick
        }
    }).then(function(user) {
        return user;
    });
};

module.exports = UserMapper;
