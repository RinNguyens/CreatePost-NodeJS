const Sequelize = require("sequelize");

const url = process.env.DATABASE_URL || 'postgres://postgres:rinchans@127.0.0.1:5432/1660490';
const database = new Sequelize(url);

module.exports = database;