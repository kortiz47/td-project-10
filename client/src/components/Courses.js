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
    useEffect(() => {
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //warning on line 17: React Hook useEffect has a missing dependency: 'fetch'. Either include it or remove the dependency array.

    const fetch = async () => {
        await actions.fetchData('/courses');
    }

    return (
        <main>
            <div className="wrap main--grid">
                {Array.isArray(data) && data.map(course => <Course course={course} key={course.id} />)}
                <NewCourse />
            </div>
        </main>
    );
}

export default Courses;

