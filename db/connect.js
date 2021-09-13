const {Sequelize} = require('sequelize');
const config = require('../config/config');

module.exports = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    port: config.development.port,
    dialect: "mysql",
    define: { charset: 'utf8', dialectOptions: { collate: 'utf8_general_ci' }}
});
