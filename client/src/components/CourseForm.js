import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../context';
import { useHistory } from 'react-router';

function CourseForm() {
	const [course, setCourse] = useState('');
	const { setCourses } = useAppContext();
	const toast = useToast();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/courses', { name: course })
			.then((res) => {
				setCourses((prev) => [...prev, res.data]);
				toast({
					title: 'Curso creado',
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
				history.push('/');
			})
			.catch(() => {
				toast({
					title: 'Ya existe un curso con este nombre',
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			});
	};

	return (
		<form style={{ width: '40%', margin: 'auto' }} onSubmit={handleSubmit}>
			<Box pb='1em'>
				<FormLabel>Nombre del curso</FormLabel>
				<Input
					type='text'
					required
					onChange={(e) => setCourse(e.target.value)}
					name='firstName'
				/>
			</Box>
			<Button type='submit'>Añadir</Button>
		</form>
	);
}

export default CourseForm;
