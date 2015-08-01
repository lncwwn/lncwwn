/**
 * Interaction model
 *
 * @author victor li
 * @date 2015/008/01
 */

var sequelize = require('../modules/sequelize');
var Sequelize = require('sequelize');

var Interaction = sequelize.define('interaction', {
    id: Sequelize.INTEGER,
    user: Sequelize.INTEGER,
    post: Sequelize.INTEGER,
    read: Sequelize.INTEGER,
    like: Sequelize.BOOLEAN,
    hate: Sequelize.BOOLEAN
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'interaction'
});

module.exports = Interaction;
