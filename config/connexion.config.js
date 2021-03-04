const Squelize = require('sequelize');
const config = require('./db.config');

// Connexion a la base de donnees
const squelize = new Squelize(config.database, config.user, config.pass, {
    host: config.host,
    dialect: config.dialect,
    logging: console.log
});
module.exports = squelize;
