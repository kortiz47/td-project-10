import './App.css';
import axios from 'axios';

const App = () => {
  const data = axios.get('http://localhost:5000/api/courses')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  return (
    <div>
      <h1>React Application</h1>
      <p>{data}</p>
    </div>
  );
}


export default App;
