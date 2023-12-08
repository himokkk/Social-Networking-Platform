import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ResetPassword from './pages/reset/ResetPassword';
import ErrorPage from './pages/error/ErrorPage';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile';
import './App.css';
import React, { useState } from 'react';
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css"; 
import "@fontsource/jetbrains-mono/400-italic.css"; 

document.addEventListener("keydown", function(e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
  }
}, false);

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement(BrowserRouter, null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/', element: React.createElement(Home, { email: email, loggedIn: loggedIn, setLoggedIn: setLoggedIn }) }),
        React.createElement(Route, { path: '/login', element: React.createElement(Login, { setLoggedIn: setLoggedIn, setEmail: setEmail }) }),
        React.createElement(Route, { path: '/register', element: React.createElement(Register, { setLoggedIn: setLoggedIn, setEmail: setEmail }) }),
        React.createElement(Route, { path: '/reset', element: React.createElement(ResetPassword, {}) }),
        React.createElement(Route, { path: '/main', element: React.createElement(Main, {}) }),
        React.createElement(Route, { path: '/profile', element: React.createElement(Profile, {}) }),
        React.createElement(Route, { path: '*', element: React.createElement(ErrorPage, {}), })
      )
    )
  );
  
}

export default App;
