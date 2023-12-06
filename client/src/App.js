import { Route, Routes } from 'react-router-dom';

//COMPONENTS
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

//Error Components
import UnhandledError from './errors/UnhandledError';
import NotFound from './errors/NotFound';
import Forbidden from './errors/Forbidden';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />

        <Route element={<PrivateRoute />}/>
          <Route path='/courses/create' element={<CreateCourse />} />
          <Route path='/courses/:id/update' element={<UpdateCourse />} />
        <Route element={<PrivateRoute />}/>
        
        <Route path='/courses/:id' element={<CourseDetail />} />
        <Route path='/signin' element={<UserSignIn />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/signout' element={<UserSignOut />}/>

        <Route path='/notfound' element={<NotFound />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/error' element={<UnhandledError />} />
      </Routes>
    </div>
  );
}


export default App;
