import axios from 'axios';
import { useState, useEffect } from 'react';

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
      <h1>React Application</h1>
      {data.map(item => <p>{item.title}</p>)}
    </div>
  );
}


export default App;
