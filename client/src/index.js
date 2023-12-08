import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FetchDataProvider } from './context/FetchDataContext';

//CONTEXT
//TODO: import contexts to grab api data

//APP
import App from './App';

//STYLING
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FetchDataProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </FetchDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);











//import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
