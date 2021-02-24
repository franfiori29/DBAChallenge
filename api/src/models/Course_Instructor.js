const { DataTypes: D, DataTypes } = require('sequelize');

module.exports = (db) =>
	db.define('courses_instructors', {
		id: {
			type: D.INTEGER,
			primaryKey: true,
		},
		startDate: {
			type: D.DATE,
			allowNull: false,
		},
	});
