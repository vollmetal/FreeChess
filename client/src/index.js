import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PageBase from './Components/PageBase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './Components/MainPage';
import GamePage from './Components/Game Components/GamePage';
import store from './store/store';
import Login from './Components/Login';
import GameLobby from './Components/GameLobby';
import NewGame from './Components/NewGame';
import GameList from './Components/GameList';
import Registration from './Components/Registration';

import { io } from "socket.io-client";
import { CssBaseline } from '@mui/material';
import ProfilePage from './Components/Profile/ProfilePage';
import ThemeBase from './Components/ThemeBase';
import { SERVER_PATH, SERVER_PORT, SOCKET_PORT } from './constants';


export const socket = io(`${SERVER_PATH}${SOCKET_PORT}`);
socket.connect()



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <ThemeBase >
          <PageBase>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/game' element={<GameList />} />
              <Route path='/newGame' element={<NewGame />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/lobby/:gameId' element={<GameLobby />} />
              <Route path='/userpage' element={<ProfilePage />} />
            </Routes>
          </PageBase>
        </ThemeBase>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
