import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//COMPONENTS
import Courses from './components/Courses';
import Header from './components/Header';

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
      </Routes>
    </div>
  );
}


export default App;
