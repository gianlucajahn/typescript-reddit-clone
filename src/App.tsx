import React, { MouseEventHandler, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from './containers/Home/Home';
import NavBar from './containers/NavBar/NavBar';
import { isReturnStatement } from 'typescript';
import LoginModal from './components/LoginModal/LoginModal';

function App() {
  const location = useLocation();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [loginModalState, setLoginModalState] = useState("closed");
  const [dropdownState, setDropdownState] = useState({
    erkunden: false,
    gaming: false,
    sports: false,
    television: false,
    celebrity: false,
    business: false,
    crypto: false,
    mehr: false,
    weitereinfos: false,
    richtlinien: true
  });

  const handleExpand = (e: React.MouseEvent) => {
    const changedState = e.currentTarget.id;
    if (changedState === "erkunden") {
      setDropdownState({
        erkunden: !dropdownState.erkunden,
        gaming: false,
        sports: false,
        television: false,
        celebrity: false,
        business: false,
        crypto: false,
        mehr: false,
        weitereinfos: dropdownState.weitereinfos,
        richtlinien: dropdownState.richtlinien
      })} else {
        setDropdownState({...dropdownState, [changedState]: !dropdownState[changedState as keyof typeof dropdownState]});
      }
  }

  const handleDropdown = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "link") {
      setDropdownIsOpen(!dropdownIsOpen);
      setDropdownState({
        erkunden: false,
        gaming: false,
        sports: false,
        television: false,
        celebrity: false,
        business: false,
        crypto: false,
        mehr: false,
        weitereinfos: false,
        richtlinien: true
      });
    }
  }

  const checkDropdown = (e: any) => {
    if (e.target.id === "link") {
      return;
    } else {
      const dropdownMenu = document.getElementById('dropdownMenu');
      let node = e.target;
      while (node) {
        if (node === dropdownMenu) {
          setDropdownIsOpen(true);
          return;
        }
    
        node = node.parentNode;
      }
  
      setDropdownIsOpen(false);
    }
  }

  const handleLoginModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setLoginModalState(target.id);
  }

  return (
    <div onClick={checkDropdown} id="app">
      {loginModalState !== "closed" ? 
      <LoginModal 
        loginModalState={loginModalState}
        handleLoginModal={handleLoginModal}
      /> : null}
      <NavBar 
        dropdownIsOpen={dropdownIsOpen}
        dropdownState={dropdownState}
        handleDropdown={handleDropdown}
        handleExpand={handleExpand}
        handleLoginModal={handleLoginModal}
      />
      <Routes key={location.pathname} location={location}>
        <Route path='/typescript-reddit-clone/' element={<Home />} />
        <Route path='/typescript-reddit-clone/r/:subredditId' element={<Home />} />
        <Route path='/typescript-reddit-clone/profile' element={<Home />} />
        <Route path='/typescript-reddit-clone/create' element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
