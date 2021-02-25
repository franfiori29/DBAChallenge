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

server.post('/courses', async (req, res) => {
	const { name } = req.body;
	try {
		res.json(await Course.create({ name }));
	} catch (err) {
		res.status(409).json({ error: 'Nombre en uso' });
	}
});

server.delete('/courses/:id', async (req, res) => {
	const { id } = req.params;
	await Course_Instructor.destroy({ where: { courseId: id } });
	let deleted = await Course.destroy({
		where: { id },
	});
	res.json(deleted);
});

server.post('/cohort/', async (req, res) => {
	const { cohort } = req.body;
	let created = await Course_Instructor.create({ ...cohort });
	res.json(created);
});

server.post('/cohort/:id/:instructorId', async (req, res) => {
	const { id, instructorId } = req.params;
	let updated = await Course_Instructor.update(
		{ instructorId },
		{ where: { id }, returning: true, include: [Instructor] }
	);
	let a = await Course_Instructor.findByPk(id, { include: [Instructor] });
	res.json(a);
});

server.delete('/cohort/:id', async (req, res) => {
	const { id } = req.params;

	let deleted = await Course_Instructor.destroy({ where: { id } });

	res.json(deleted);
});

server.delete('/cohort/instructor/:id', async (req, res) => {
	const { id } = req.params;

	let deleted = await Course_Instructor.update(
		{ instructorId: null },
		{ where: { id }, returning: true }
	);

	res.json(deleted[1][0]);
});

server.get('/instructors', async (_, res) => {
	res.json(await Instructor.findAll());
});

server.post('/instructors', async (req, res) => {
	const { instructor } = req.body;
	try {
		let createdInstructor = await Instructor.create({ ...instructor });
		res.json(createdInstructor);
	} catch (err) {
		res.status(409).json({ error: 'Email already exists' });
	}
});

server.get('/instructors/:instructorId', async (req, res) => {
	const { instructorId } = req.params;
	res.json(
		await Course_Instructor.findAll({
			where: { instructorId },
			include: [Course, Instructor],
		})
	);
});

module.exports = server;
