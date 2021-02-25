import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	FormLabel,
	Input,
	Select,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../context';
import { useHistory, useLocation } from 'react-router';

function CohortForm() {
	const [cohort, setCohort] = useState({
		courseId: '',
		startDate: '',
		instructorId: null,
	});
	const { instructors, courses } = useAppContext();
	const toast = useToast();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		let courseQuery = new URLSearchParams(location.search).get('course');
		if (courseQuery) {
			let courseToUpdate = courses.find((c) => c.id === +courseQuery);
			setCohort((prev) => ({
				...prev,
				courseId: courseToUpdate.id,
			}));
		}
	}, [courses, location]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:4000/cohort', { cohort }).then((res) => {
			toast({
				title: 'Camada creada',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
			history.push(`/cursos/${cohort.courseId}`);
		});
	};

	const handleChange = (e) => {
		setCohort((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<form style={{ width: '40%', margin: 'auto' }} onSubmit={handleSubmit}>
			<Box pb='1em'>
				<FormLabel>Fecha de inicio</FormLabel>
				<Input
					type='date'
					required
					onChange={handleChange}
					name='startDate'
					value={cohort.startDate}
				/>
			</Box>
			<Box pb='1em'>
				<FormLabel>Profesor</FormLabel>
				<Select name='instructorId' onChange={handleChange}>
					<option value={null}></option>
					{instructors.map((instructor) => (
						<option
							key={instructor.id}
							value={instructor.id}
						>{`${instructor.firstName} ${instructor.lastName}`}</option>
					))}
				</Select>
			</Box>
			<Button type='submit'>Añadir</Button>
		</form>
	);
}

export default CohortForm;
