import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';
import './App.css';
import reportWebVitals from './utils/reportWebVitals';
import Routes from "./App/Routes/Routes";

ReactDOM.render(
  <React.StrictMode>
      <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
