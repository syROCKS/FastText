import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Lobby from './pages/lobby';
import JoinLobby from './pages/joinLobby';
import CreateLobby from './pages/createLobby';
import Chat from './pages/chat';
import RegisterUser from './pages/registerUser';
import ForgetPassword from './pages/forgetPass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby/" element={<Lobby />} />
        <Route path="/joinLobby/" element={<JoinLobby />} />
        <Route path="/createLobby/" element={<CreateLobby />} />
        <Route path="/registerUser/" element={<RegisterUser />} />
        <Route path="/forgetPass/" element={<ForgetPassword />} />
        <Route path="/chat/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
