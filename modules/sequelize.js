/**
 * Sequelize module
 *
 * @author victor li
 * @date 2015/07/29
 */

var Sequelize = require('sequelize');
var dbConfig = require('../config/db.config');

var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',

    pool: {
        max: 6,
        min: 0,
        idle: 10000
    }

});

module.exports = sequelize;

