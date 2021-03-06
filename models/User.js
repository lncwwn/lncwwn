/**
 * User model
 *
 * @author victor li
 * @date 2015/07/29
 */
'use strict'
let sequelize = require('../modules/sequelize');
let Sequelize = require('sequelize');

let User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nick: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
    joined: Sequelize.TIME,
    active: Sequelize.BOOLEAN
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'user'
});

module.exports = User;

