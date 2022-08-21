import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from './containers/Home/Home';
import NavBar from './containers/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Routes key={location.pathname} location={location}>
        <Route path='/typescript-reddit-clone/' element={<Home />} />
        <Route path='/typescript-reddit-clone/r/:subredditId' element={<Home />} />
        <Route path='/typescript-reddit-clone/profile' element={<Home />} />
        <Route path='/typescript-reddit-clone/create' element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
