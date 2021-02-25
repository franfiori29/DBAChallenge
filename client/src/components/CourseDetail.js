import { Button } from '@chakra-ui/button';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAppContext } from '../context';

function CourseDetail() {
	const [cohorts, setCohorts] = useState([]);
	const [instructor, setInstructor] = useState('');
	const { instructors, courses } = useAppContext();
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const toast = useToast();
	const history = useHistory();

	useEffect(() => {
		axios.get(`http://localhost:4000/courses/${id}`).then((course) => {
			setCohorts(course.data);
			setLoading(false);
		});
	}, [id]);

	const deleteCohort = (cohort) => {
		axios.delete(`http://localhost:4000/cohort/${cohort.id}`).then((res) => {
			if (res) {
				setCohorts((prev) => prev.filter((c) => c.id !== cohort.id));
				toast({
					title: 'Camada eliminada',
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
			}
		});
	};

	const removeTeacher = (cohort) => {
		axios
			.delete(`http://localhost:4000/cohort/instructor/${cohort.id}/`)
			.then((res) => {
				if (res) {
					setCohorts((prev) =>
						prev.map((c) => (c.id === cohort.id ? res.data : c))
					);
					toast({
						title: 'Profesor quitado',
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
				}
			});
	};

	const handleChange = (e, cohort) => {
		axios
			.post(`http://localhost:4000/cohort/${cohort.id}/${e.target.value}`)
			.then((res) => {
				console.log('res :>> ', res);
				if (res) {
					setInstructor('');
					setCohorts((prev) =>
						prev.map((c) => (c.id === cohort.id ? res.data : c))
					);
					toast({
						title: 'Profesor asignado',
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
				}
			});
	};

	if (loading)
		return (
			<Flex justify='center'>
				<Spinner />
			</Flex>
		);

	return (
		<div style={{ width: '60%', margin: 'auto' }}>
			<Flex justifyContent='space-between'>
				<Text fontSize='lg' fontWeight='600'>
					{courses.find((c) => c.id === +id).name}
				</Text>
				<Button
					colorScheme='teal'
					onClick={() => history.push(`/add/cohort?course=${id}`)}
				>
					Añadir camada
				</Button>
			</Flex>
			{cohorts.length > 0 ? (
				<Table variant='striped' size='md'>
					<Thead>
						<Tr>
							<Th>Fecha de inicio</Th>
							<Th>Profesor</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{cohorts.map((cohort) => (
							<Tr key={cohort.id}>
								<Td>{cohort.startDate}</Td>
								<Td>
									{cohort.instructor ? (
										`${cohort.instructor.firstName} ${cohort.instructor.lastName}`
									) : instructor === cohort.id ? (
										<Select
											name='instructorId'
											onChange={(e) => handleChange(e, cohort)}
										>
											<option value={null}></option>
											{instructors.map((inst) => (
												<option
													key={inst.id}
													value={inst.id}
												>{`${inst.firstName} ${inst.lastName}`}</option>
											))}
										</Select>
									) : (
										''
									)}
								</Td>
								<Td>
									{cohort.instructor ? (
										<Button
											colorScheme='red'
											onClick={() => removeTeacher(cohort)}
										>
											Quitar profesor
										</Button>
									) : (
										<Button
											colorScheme={instructor ? 'red' : 'teal'}
											onClick={() =>
												setInstructor((prev) => (prev ? '' : cohort.id))
											}
										>
											{instructor ? 'Cancelar' : 'Asignar profesor'}
										</Button>
									)}
								</Td>
								<Td textAlign='center'>
									<Button
										colorScheme='red'
										onClick={() => deleteCohort(cohort)}
									>
										Eliminar camada
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<Heading size='lg' textAlign='center' marginTop='50px'>
					No hay camadas
				</Heading>
			)}
		</div>
	);
}

export default CourseDetail;
