import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Courses from './components/Courses';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from './context';
import CourseDetail from './components/CourseDetail';
import Instructors from './components/Instructors';
import InstructorDetail from './components/InstructorDetail';
import InstructorForm from './components/InstructorForm';
import CourseForm from './components/CourseForm';
import CohortForm from './components/CohortForm';

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
					<Route exact path='/cursos/:id'>
						<CourseDetail />
					</Route>
					<Route exact path='/profesores/:id'>
						<InstructorDetail />
					</Route>
					<Route exact path='/add/profesor'>
						<InstructorForm />
					</Route>
					<Route exact path='/add/curso'>
						<CourseForm />
					</Route>
					<Route exact path='/add/cohort'>
						<CohortForm />
					</Route>
				</BrowserRouter>
			</AppProvider>
		</ChakraProvider>
	);
}

export default App;
