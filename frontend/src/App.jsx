import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import './App.css';
import React from 'react';
import { useState } from 'react';
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css"; 
import "@fontsource/jetbrains-mono/400-italic.css"; 

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
        React.createElement(Route, { path: '/register', element: React.createElement(Register, { setLoggedIn: setLoggedIn, setEmail: setEmail }) })
      )
    )
  );
  
}

export default App;