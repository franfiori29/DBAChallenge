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

function Instructors() {
	const { instructors, loading } = useAppContext();
	const history = useHistory();

	if (loading)
		return (
			<Flex justify='center'>
				<Spinner />
			</Flex>
		);

	return (
		<div style={{ width: '40%', margin: 'auto' }}>
			<Flex justifyContent='flex-end'>
				<Button colorScheme='teal'>Añadir Profesor</Button>
			</Flex>
			<Table variant='striped' size='md'>
				<Thead>
					<Tr>
						<Th>Nombre</Th>
						<Th>Mail</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{instructors.map((instructor) => (
						<Tr key={instructor.id}>
							<Td>
								{instructor.firstName} {instructor.lastName}
							</Td>
							<Td>{instructor.email}</Td>
							<Td textAlign='center'>
								<Button
									colorScheme='teal'
									onClick={() => history.push(`/profesores/${instructor.id}`)}
								>
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

export default Instructors;
