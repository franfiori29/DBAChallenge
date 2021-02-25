import React from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Flex,
	Spinner,
	useToast,
} from '@chakra-ui/react';
import { useAppContext } from '../context';
import { useHistory } from 'react-router';
import axios from 'axios';

function Courses() {
	const { courses, setCourses, loading } = useAppContext();
	const history = useHistory();
	const toast = useToast();

	const deleteCourse = (id) => {
		axios.delete(`http://localhost:4000/courses/${id}`).then((res) => {
			if (res) setCourses((prev) => prev.filter((c) => c.id !== id));
			toast({
				title: 'Curso eliminado',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
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
			<Flex justifyContent='flex-end'>
				<Button colorScheme='teal' onClick={() => history.push('/add/curso')}>
					Añadir Curso
				</Button>
			</Flex>
			<Table variant='striped' size='md'>
				<Thead>
					<Tr>
						<Th>Nombre del curso</Th>
						<Th></Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{courses.map((course) => (
						<Tr key={course.id}>
							<Td>{course.name}</Td>
							<Td textAlign='center'>
								<Button
									colorScheme='teal'
									onClick={() => history.push(`/cursos/${course.id}`)}
								>
									Ver Camadas
								</Button>
							</Td>
							<Td textAlign='center'>
								<Button
									colorScheme='red'
									onClick={() => deleteCourse(course.id)}
								>
									Eliminar curso
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</div>
	);
}

export default Courses;
