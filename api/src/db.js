const Sequelize = require('sequelize');

require('dotenv').config();
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const db = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
	{ logging: false, native: false }
);

module.exports = db;
