import Course from "./Course";
import NewCourse from "./NewCourse";
import { useEffect, useContext } from "react";
import FetchDataContext from "../context/FetchDataContext";

/**
 * The Course Component renders the UI for our Home Page that displays the list of courses
 * 
 * @returns Home Page Display for /
 */


const Courses = () => {
    const { data, actions } = useContext(FetchDataContext);
    console.log(data)
    useEffect(() => {
        const fetch = async() =>{
            await actions.fetchData('/courses');
        }
        fetch();
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