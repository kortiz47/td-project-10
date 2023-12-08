import Course from "./Course";
import NewCourse from "./NewCourse";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

/**
 * The Course Component renders the UI for our Home Page that displays the list of courses
 * 
 * @returns Home Page Display for /
 */


const Courses = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api('/courses', "GET", null, null)
                if (response) {
                    if (response.status === 200) {
                        const courses = await response.json();
                        setData(courses);
                    }
                }
                else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
                navigate('/error', { replace: true });
            }
        }

        fetchData();
    }, [navigate]);


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