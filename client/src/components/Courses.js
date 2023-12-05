import Course from "./Course";
import NewCourse from "./NewCourse";

import { useState, useEffect } from "react";
import axios from "../api/axios";

const Courses = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/courses')
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <main>
            <div className="wrap main--grid">
                {data.map(course => <Course course={course} key={course.id} />)}
                <NewCourse />
            </div>
        </main>
    );
}

export default Courses;