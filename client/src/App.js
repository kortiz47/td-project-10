import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='/courses/create' element={<CreateCourse />}/>
        <Route path='/courses/:id/update' element={<UpdateCourse />}/>
        <Route path='/courses/:id' element={<CourseDetail />}/>
        <Route path='/signin'/>
        <Route path='/signup'/>
        <Route path='/signout'/>
      </Routes>
    </div>
  );
}


export default App;
