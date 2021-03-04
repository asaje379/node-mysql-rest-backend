const Sequelize = require('sequelize');
const squelize = require('../../config/connexion.config');

const _TYPES = {
    int: Sequelize.BIGINT,
    string: Sequelize.TEXT,
    bool: Sequelize.BOOLEAN,
    date: Sequelize.DATEONLY,
    datetime: Sequelize.DATE
}

function model(name, structure) {
    let columns = {};
    columns.id = { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true };
    for (const el of structure) {
        columns[el.name] = {
            type: _TYPES[el.type],
            allowNull: el.null !== undefined ? el.null : true,
            unique: el.unique !== undefined ? el.unique : false
        };
    }
    columns.enabled = { type: Sequelize.BOOLEAN, defaultValue: true };
    return squelize.define(name, columns, {
        tableName: name,
        timestamps: true,
        underscored: true
    });
}

module.exports = model;