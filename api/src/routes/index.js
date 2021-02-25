const server = require('express').Router();
const { Instructor, Course, Course_Instructor } = require('../models');

server.get('/courses', async (_, res) => {
	res.json(await Course.findAll());
});

server.get('/courses/:id', async (req, res) => {
	const { id } = req.params;
	res.json(
		await Course_Instructor.findAll({
			where: { courseId: id },
			include: [Course, Instructor],
		})
	);
});

server.post('/courses/:courseId/instructor', async (req, res) => {
	const { courseId } = req.params;
	const { startDate, instructor } = req.body;
	let createdOrFoundInstructor = (
		await Instructor.findOrCreate({
			where: { email: instructor.email },
			defaults: {
				...instructor,
			},
		})
	)[0];
	await Course_Instructor.create({
		startDate,
		courseId,
		instructorId: createdOrFoundInstructor.id,
	});
});

server.delete('/courses/:courseId/:instructorId', async (req, res) => {
	const { courseId, instructorId } = req.params;
	const { startDate } = req.body;
	await Course_Instructor.destroy({
		where: {
			startDate,
			courseId,
			instructorId,
		},
	});
});

server.get('/instructors', async (_, res) => {
	res.json(await Instructor.findAll());
});

server.get('/instructors/:instructorId', async (req, res) => {
	const { instructorId } = req.params;
	res.json(await Course_Instructor.findAll({ where: { instructorId } }));
});

module.exports = server;
