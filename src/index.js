import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react';
import AuthContext from './services/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <App />
    </AuthContext.Provider>
  )
}
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
