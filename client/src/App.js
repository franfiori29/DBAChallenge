import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Courses from './components/Courses';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from './context';
import CourseDetail from './components/CourseDetail';
import Instructors from './components/Instructors';
import InstructorDetail from './components/InstructorDetail';

function App() {
	return (
		<ChakraProvider>
			<AppProvider>
				<BrowserRouter>
					<Navbar />
					<Route exact path='/'>
						<Courses />
					</Route>
					<Route exact path='/profesores'>
						<Instructors />
					</Route>
					<Route exact path='/curso/:id'>
						<CourseDetail />
					</Route>
					<Route exact path='/profesores/:id'>
						<InstructorDetail />
					</Route>
				</BrowserRouter>
			</AppProvider>
		</ChakraProvider>
	);
}

export default App;
