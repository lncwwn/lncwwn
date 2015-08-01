/**
 * Post model
 *
 * @author victor li
 * @date 2015/07/30
 */

var sequelize = require('../modules/sequelize');
var Sequelize = require('sequelize');
var User = require('./User');
var Interaction = require('./Interaction');

var Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    author: Sequelize.INTEGER,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    created: Sequelize.TIME,
    updated: Sequelize.TIME,
    deleted: Sequelize.BOOLEAN
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'post'
});

Post.belongsTo(User, {foreignKey: 'author', targetKey: 'id'});
Post.hasMany(Interaction, {foreignKey: 'post'});

module.exports = Post;
