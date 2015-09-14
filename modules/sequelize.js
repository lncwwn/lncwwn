/**
 * Sequelize module
 *
 * @author victor li
 * @date 2015/07/29
 */
'use strict'
let Sequelize = require('sequelize');
let dbConfig = require('../config/db.config');

let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',

    pool: {
        max: 6,
        min: 0,
        idle: 10000
    }

});

module.exports = sequelize;

