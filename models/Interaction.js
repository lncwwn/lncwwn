/**
 * Interaction model
 *
 * @author victor li
 * @date 2015/008/01
 */
'use strict'
let sequelize = require('../modules/sequelize');
let Sequelize = require('sequelize');

let Interaction = sequelize.define('interaction', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    user: Sequelize.INTEGER,
    post: Sequelize.INTEGER,
    read: Sequelize.INTEGER,
    like: Sequelize.BOOLEAN,
    hate: Sequelize.BOOLEAN,
    created: {type: Sequelize.TIME, defaultValue: Sequelize.NOW}
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'interaction'
});

module.exports = Interaction;
