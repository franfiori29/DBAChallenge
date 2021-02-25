import { Button } from '@chakra-ui/button';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppContext } from '../context';

function CourseDetail() {
	const [cohorts, setCohorts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:4000/courses/${id}`).then((course) => {
			setCohorts(course.data);
			setLoading(false);
		});
	}, [id]);
	console.log(cohorts);

	if (loading)
		return (
			<Flex justify='center'>
				<Spinner />
			</Flex>
		);

	return (
		<div style={{ width: '40%', margin: 'auto' }}>
			<Flex justifyContent='space-between'>
				<Text fontSize='lg' fontWeight='600'>
					REACT
				</Text>
				<Button colorScheme='teal'>Añadir camada</Button>
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
							<Tr>
								<Td>{cohort.startDate}</Td>
								<Td>
									{cohort.instructor.firstName} {cohort.instructor.lastName}
								</Td>
								<Td textAlign='center'>
									<Button colorScheme='red'>Eliminar</Button>
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
