const { DataTypes: D } = require('sequelize');

module.exports = (db) =>
	db.define('course', {
		name: {
			type: D.STRING,
			allowNull: false,
			unique: true,
		},
	});
