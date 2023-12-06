import Course from "./Course";
import NewCourse from "./NewCourse";
import { useState, useEffect } from "react";
import { api } from "../utils/apiHelper";

const Courses = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() =>{
            const response = await api('/courses', "GET", null, null)
                .then(response => response.json())
                .catch(error => console.log(error));
        setData(response);
        }
        fetchData();
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