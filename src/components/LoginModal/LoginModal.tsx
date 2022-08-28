import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import { ReactComponent as Google } from "../../resources/images/google.svg";
import { ReactComponent as Apple } from "../../resources/images/apple.svg";
import { ReactComponent as Cross } from "../../resources/images/cross.svg";
import './LoginModal.scss';

export interface LoginModalProps {
    loginModalState: string,
    hoverState: {
        username: boolean,
        password: boolean
    },
    userName: string,
    password: string,
    loginStatus: boolean,
    handleLoginInput: ChangeEventHandler<HTMLInputElement>,
    handleLoginModal: MouseEventHandler<HTMLButtonElement>,
    handleHover: MouseEventHandler<HTMLInputElement>
    handleLogin: MouseEventHandler
}

export default function LoginModal (props: LoginModalProps) {
  const {
    loginModalState,
    hoverState,
    userName,
    password,
    loginStatus,
    handleLogin,
    handleLoginInput,
    handleLoginModal,
    handleHover
  } = props;

  return (
    <div className="topLevel">
        <div className="modalBackground">

        </div>

        <div className="loginModal">
          <img src={require("../../resources/images/loginbackground.png")} className="loginBackground" />
          <div className="modalContent">
            <button id="closed" onClick={handleLoginModal}>
                <Cross className="cross"/>
            </button>
            <h3 className="heading">{loginModalState === "login" ? "Anmelden" : "Registrieren"}</h3>
            <p className="policy">Wenn du fortfährst, stimmst du unserer <span>Benutzervereinbarungen</span> und <span>Datenschutzrichtlinien</span> zu.</p>

            <button className="loginButton googleButton">
                <Google className="google" />
                Weiter mit Google
            </button>

            <button className="loginButton appleButton">
                <Apple className="apple" />
                Mit Apple fortfahren
            </button>

            <h3 className="or">ODER</h3>

            <div className="container username">
                <input className="inputField" type="text" required spellCheck="false" id="username" onChange={handleLoginInput} onMouseEnter={handleHover} onMouseLeave={handleHover} />
                <span className="label">{loginModalState === "login" ? "BENUTZERNAME" : "GEWÜNSCHTER BENUTZERNAME"}</span>
                <div className="circle" style={{ display: hoverState.username === false ? userName.length <= 1 ? "block" : "none" : "none", left: loginModalState === "login" ? "20%" : "35%" }}></div>
            </div>
            <div className="container password">
                <input className="inputField" type="password" required spellCheck="false" id="password" onChange={handleLoginInput} onMouseEnter={handleHover} onMouseLeave={handleHover} />
                <span className="label">{loginModalState === "login" ? "PASSWORT" : "GEWÜNSCHTES PASSWORT"}</span>
                <div className="circle" style={{ display: hoverState.password === false ? password.length <= 1 ? "block" : "none" : "none", left: loginModalState === "login" ? "14.75%" : "29.5%" }}></div>
            </div>

            <button className="anmelden" id="login" onClick={handleLogin}>
                {loginModalState === "login" ? "Anmelden" : "Registrieren"}
            </button>
            <button className="demo" id="demo" onClick={handleLogin}>
                Demo-Account
            </button>

            <p className="suggestion">{loginModalState === "login" ? "Neu bei Reddit?" : "Bereits ein*e Redditor*in?"} <span id={loginModalState === "login" ? "register" : "login"} onClick={handleLoginModal}>{loginModalState === "login" ? "REGISTRIEREN" : "ANMELDEN"}</span></p>
          </div>
        </div>
    </div>
  );
}
