/**
 * Post model
 *
 * @author victor li
 * @date 2015/07/30
 */

var sequelize = require('../modules/sequelize');
var Sequelize = require('sequelize');
var User = require('./User');

var Post = sequelize.define('post', {
    id: Sequelize.INTEGER,
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

module.exports = Post;
