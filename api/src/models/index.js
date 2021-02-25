const db = require('../db');
const InstructorBuilder = require('./Instructor');
const CourseBuilder = require('./Course');
const Course_InstructorBuilder = require('./Course_Instructor');

const Instructor = InstructorBuilder(db);
const Course = CourseBuilder(db);
const Course_Instructor = Course_InstructorBuilder(db);

Course_Instructor.belongsTo(Instructor);
Course_Instructor.belongsTo(Course);

module.exports = {
	Instructor,
	Course,
	Course_Instructor,
};
