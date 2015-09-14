/**
 * Post model
 *
 * @author victor li
 * @date 2015/07/30
 */
'use strict'
let sequelize = require('../modules/sequelize');
let Sequelize = require('sequelize');
let User = require('./User');
let Interaction = require('./Interaction');

let Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: Sequelize.INTEGER, references: {model: User, key: 'id'}},
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    created: {type: Sequelize.TIME, defaultValue: Sequelize.NOW},
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
