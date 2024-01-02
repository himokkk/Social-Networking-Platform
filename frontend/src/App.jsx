import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Chat from './pages/chat/Chat';
import ResetPassword from './pages/reset/ResetPassword';
import Terms from './pages/terms/Terms';
import Debug from './pages/debug/Debug';
import ErrorPage from './pages/error/ErrorPage';
import './App.css';
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css"; 
import "@fontsource/jetbrains-mono/400-italic.css";
import * as urls from './urls';

// prevent ctrl + save
document.addEventListener("keydown", function(e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
  }
}, false);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "ziomki App",
    };
  }
  render() {
    return (React.createElement(
      'div',
      { className: 'App' },
      React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: urls.ROOT_URL, element: React.createElement(Home, {}) }),
          React.createElement(Route, { path: urls.LOGIN_URL, element: React.createElement(Login, {}) }),
          React.createElement(Route, { path: urls.REGISTER_URL, element: React.createElement(Register, {}) }),
          React.createElement(Route, { path: urls.CHAT_URL, element: React.createElement(Chat, {}) }),
          React.createElement(Route, { path: urls.RESET_URL, element: React.createElement(ResetPassword, {}) }),
          React.createElement(Route, { path: urls.TERMS_URL, element: React.createElement(Terms, {}) }),
          React.createElement(Route, { path: urls.DEBUG_URL, element: React.createElement(Debug, {}) }),
          React.createElement(Route, { path: '*', element: React.createElement(ErrorPage, {}), })
      )
      )
    ));
  }
}

export default App;
