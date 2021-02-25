import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

function InstructorDetail() {
	const { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:4000/instructors/${id}`).then((instructor) => {
			console.log(instructor.data);
		});
	}, [id]);

	return <div>{id}</div>;
}

export default InstructorDetail;
