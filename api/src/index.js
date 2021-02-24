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
		{ firstName: 'Juan', lastName: 'Pérez' },
		{ firstName: 'Pedro', lastName: 'Picapiedra' },
		{ firstName: 'Santiago', lastName: 'Segura' },
		{ firstName: 'Román', lastName: 'Riquelme' },
	]);
});
