const { DataTypes: D } = require('sequelize');

module.exports = (db) =>
	db.define('instructor', {
		firstName: {
			type: D.STRING,
			allowNull: false,
		},
		lastName: {
			type: D.STRING,
			allowNull: false,
		},
		email: {
			type: D.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
	});
