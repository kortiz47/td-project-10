import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
    const [course, setCourse] = useState([]);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchData = async() =>{
            await axios.get(`http://localhost:5000/api${pathname}`)
            .then(response => {
                setCourse(response.data)
            })
            .catch(error => {
                console.log(error);
            });
        }
        fetchData();
    }, [pathname]);
    
   // debugger
    

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By Joe Smith</p>

                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{course.materialsNeeded}</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;


/** TODO: split the materialsNeeded string by the * in order to create a li of the materials in database
 * Current problem: .split is not defined when using it because it seems the api call first returns undefined/it has no data in it
 * so we have to find a way to trigger the function when the page renders at first and nothing is being passed
 */