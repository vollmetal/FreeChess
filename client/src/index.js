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



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PageBase>
      <Routes>
          <Route path='/' element = {<MainPage />}/>
          <Route path='/game' element = {<GameLobby/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/lobby' element = {<GameLobby />} />
      </Routes>
    </PageBase>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
