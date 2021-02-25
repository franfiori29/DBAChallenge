import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<Flex
			backgroundColor='teal'
			justify='space-around'
			align='center'
			color='white'
			fontFamily='Poppins'
			fontWeight='600'
			height='4em'
			marginBottom='50px'
		>
			<Link to='/'>
				<Text>CURSOS</Text>
			</Link>
			<Link to='/profesores'>
				<Text>PROFESORES</Text>
			</Link>
		</Flex>
	);
}

export default Navbar;
