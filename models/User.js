/**
 * User model
 *
 * @author victor li
 * @date 2015/07/29
 */

var sequelize = require('../modules/sequelize');
var Sequelize = require('sequelize');

var User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    nick: Sequelize.STRING,
    password: Sequelize.STRING,
    joined: Sequelize.TIME,
    active: Sequelize.BOOLEAN
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'user'
});

module.exports = User;

