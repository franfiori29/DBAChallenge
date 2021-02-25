const db = require('./db.js');
const app = require('./app.js');
const { Course, Instructor, Course_Instructor } = require('./models');
require('dotenv').config();

const { PORT } = process.env;

const force = true;
db.sync({ force }).then(async () => {
	app.listen(PORT, function () {
		console.log('Servidor funcionando');
	});
	await Course.bulkCreate([
		{
			name: 'Javascript',
		},
		{
			name: 'CSS',
		},
		{
			name: 'Java',
		},
		{
			name: 'PHP',
		},
	]);
	await Instructor.bulkCreate([
		{ firstName: 'Juan', lastName: 'Pérez', email: 'jp@gmail.com' },
		{ firstName: 'Pedro', lastName: 'Picapiedra', email: 'pp@gmail.com' },
		{ firstName: 'Santiago', lastName: 'Segura', email: 'ss@gmail.com' },
		{ firstName: 'Román', lastName: 'Riquelme', email: 'rr@gmail.com' },
	]);
	Course_Instructor.bulkCreate([
		{
			startDate: '2021-02-26',
			instructorId: 1,
			courseId: 1,
		},
		{
			startDate: '2021-02-27',
			instructorId: 1,
			courseId: 1,
		},
		{
			startDate: '2021-02-27',
			instructorId: 2,
			courseId: 2,
		},
	]).catch(console.log);
});
