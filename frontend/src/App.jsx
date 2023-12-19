import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkDarkmode } from './functions/checkDarkmode';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Chat from './pages/chat/Chat';
import ResetPassword from './pages/reset/ResetPassword';
import Terms from './pages/terms/Terms';
import ErrorPage from './pages/error/ErrorPage';
import Main from './pages/main/Main';
import './App.css';
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css"; 
import "@fontsource/jetbrains-mono/400-italic.css";
import { CHAT_URL, LOGIN_URL, REGISTER_URL, RESET_URL, ROOT_URL, TERMS_URL } from './urls';

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
  static darkmode = checkDarkmode()
  render() {
    return (React.createElement(
      'div',
      { className: 'App' },
      React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: ROOT_URL, element: React.createElement(Home, { darkmode: self.darkmode }) }),
          React.createElement(Route, { path: LOGIN_URL, element: React.createElement(Login, {}) }),
          React.createElement(Route, { path: REGISTER_URL, element: React.createElement(Register, {}) }),
          React.createElement(Route, { path: CHAT_URL, element: React.createElement(Chat, {}) }),
          React.createElement(Route, { path: RESET_URL, element: React.createElement(ResetPassword, {}) }),
          React.createElement(Route, { path: TERMS_URL, element: React.createElement(Terms, {}) }),
          React.createElement(Route, { path: '/main', element: React.createElement(Main, {}) }),
        React.createElement(Route, { path: '*', element: React.createElement(ErrorPage, {}), })
      )
      )
    ));
  }
}

export default App;
