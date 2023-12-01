import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
//Error Components
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

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
        <Route path='/courses/create' element={<CreateCourse />} />
        <Route path='/courses/:id/update' element={<UpdateCourse />} />
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='/signin' element={<UserSignIn />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/signout' />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/error' element={<UnhandledError />} />
      </Routes>
    </div>
  );
}


export default App;
