/**
 * User model
 *
 * @author victor li
 * @date 2015/07/29
 */

let sequelize = require('../modules/sequelize');
let Sequelize = require('sequelize');

let User = sequelize.define('user', {
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

