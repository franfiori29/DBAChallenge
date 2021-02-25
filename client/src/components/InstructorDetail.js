import { Button } from '@chakra-ui/button';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppContext } from '../context';

function InstructorDetail() {
	const [cohorts, setCohorts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { instructors } = useAppContext();
	const { id } = useParams();
	const toast = useToast();

	useEffect(() => {
		axios.get(`http://localhost:4000/instructors/${id}`).then((instructor) => {
			setCohorts(instructor.data);
			setLoading(false);
		});
	}, [id]);

	const removeTeacherFromCourse = (cohort) => {
		axios
			.delete(`http://localhost:4000/cohort/instructor/${cohort.id}`)
			.then((res) => {
				if (res) {
					setCohorts((prev) => prev.filter((c) => c.id !== cohort.id));
					toast({
						title: 'Camada actualizada',
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
			<Flex>
				<Text fontSize='lg' fontWeight='600'>
					{instructors.find((i) => i.id === +id).lastName}
				</Text>
			</Flex>
			{cohorts.length > 0 ? (
				<Table variant='striped' size='md'>
					<Thead>
						<Tr>
							<Th>Curso</Th>
							<Th>Fecha de inicio</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{cohorts.map((cohort) => (
							<Tr key={cohort.id}>
								<Td>{cohort.course.name}</Td>
								<Td>{cohort.startDate}</Td>
								<Td textAlign='center'>
									<Button
										colorScheme='red'
										onClick={() => removeTeacherFromCourse(cohort)}
									>
										Eliminar
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<Heading size='lg' textAlign='center' marginTop='50px'>
					Sin cursos a cargo
				</Heading>
			)}
		</div>
	);
}

export default InstructorDetail;
