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
} from '@chakra-ui/react';
import { useAppContext } from '../context';
import { useHistory } from 'react-router';

function Courses() {
	const { courses, loading } = useAppContext();
	const history = useHistory();

	if (loading)
		return (
			<Flex justify='center'>
				{' '}
				<Spinner />
			</Flex>
		);

	return (
		<div style={{ width: '40%', margin: 'auto' }}>
			<Flex justifyContent='flex-end'>
				<Button colorScheme='teal'>Añadir Curso</Button>
			</Flex>
			<Table variant='striped' size='md'>
				<Thead>
					<Tr>
						<Th>Nombre del curso</Th>
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
									onClick={() => history.push(`/curso/${course.id}`)}
								>
									{' '}
									Ver Camadas
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
