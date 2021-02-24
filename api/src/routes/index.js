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
		})
	);
});

server.get('/courses/division/:id', async (req, res) => {
	const { id } = req.params;
	res.json(await Course_Instructor.findByPk(id));
});

module.exports = server;
