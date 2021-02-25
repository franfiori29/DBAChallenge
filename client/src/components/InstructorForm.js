import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../context';
import { useHistory } from 'react-router';

function InstructorForm() {
	const [instructor, setInstructor] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	const { setInstructors } = useAppContext();
	const toast = useToast();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/instructors', { instructor })
			.then((res) => {
				setInstructors((prev) => [...prev, res.data]);
				toast({
					title: 'Profesor creado',
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
				history.push('/profesores');
			})
			.catch(() => {
				toast({
					title: 'Este email ya está en uso',
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			});
	};

	const handleChange = (e) => {
		setInstructor((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<form style={{ width: '40%', margin: 'auto' }} onSubmit={handleSubmit}>
			<Box pb='1em'>
				<FormLabel>Nombre</FormLabel>
				<Input type='text' required onChange={handleChange} name='firstName' />
			</Box>
			<Box pb='1em'>
				<FormLabel>Apellido</FormLabel>
				<Input type='text' required onChange={handleChange} name='lastName' />
			</Box>
			<Box pb='1em'>
				<FormLabel>Mail</FormLabel>
				<Input type='email' required onChange={handleChange} name='email' />
			</Box>

			<Button type='submit'>Añadir</Button>
		</form>
	);
}

export default InstructorForm;
