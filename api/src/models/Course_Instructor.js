const { DataTypes: D, DataTypes } = require('sequelize');

module.exports = (db) =>
	db.define('courses_instructors', {
		startDate: {
			type: D.DATEONLY,
			allowNull: false,
		},
		courseId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'courses',
				key: 'id',
			},
		},
		instructorId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'instructors',
				key: 'id',
			},
		},
	});
