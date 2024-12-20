import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/Base.css';
import reportWebVitals from './reportWebVitals';
import MainRoute from './App';
import '@quasar/extras/ionicons-v4/ionicons-v4.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MainRoute/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
