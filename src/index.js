import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//honeybadger.io for error handling
//https://docs.honeybadger.io/lib/javascript/integration/react/
import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react'

// Configure Honeybadger
const honeybadger = Honeybadger.configure({
  apiKey: process.env.REACT_APP_HONEYBADGER_API_KEY,
  environment: process.env.REACT_APP_HONEYBADGER_ENVIRONMENT, //'production' means that honeybadger will send errors to the honeybadger.io dashboard, 'development' means honeybadger will not send errors to the honeybadger.io dashboard
  revision: 'git SHA/project version',
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HoneybadgerErrorBoundary honeybadger={honeybadger}>
      <App />
    </HoneybadgerErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
