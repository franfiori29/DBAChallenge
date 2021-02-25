import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

export const AppContext = React.createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
	const [courses, setCourses] = useState([]);
	const [instructors, setInstructors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('http://localhost:4000/courses').then((courses) => {
			setCourses(courses.data);
			setLoading(false);
		});
		axios.get('http://localhost:4000/instructors').then((instructors) => {
			setInstructors(instructors.data);
			setLoading(false);
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				courses,
				setCourses,
				instructors,
				setInstructors,
				loading,
				setLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
