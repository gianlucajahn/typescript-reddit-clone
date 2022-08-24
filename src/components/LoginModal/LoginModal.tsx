import React, { MouseEventHandler } from 'react';
import './LoginModal.scss';

export interface LoginModalProps {
    loginModalState: string,
    handleLoginModal: MouseEventHandler<HTMLButtonElement>
}

export default function LoginModal (props: LoginModalProps) {
  const {
    loginModalState,
    handleLoginModal
  } = props;

  return (
    <div className="topLevel">
        <div className="modalBackground">

        </div>

        <div className="loginModal">
          <img src={require("../../resources/images/loginbackground.png")} className="loginBackground" />
          <div className="modalContent">
            {loginModalState === "login" ? (
                <h3>Anmelden</h3>
            ) : (
                <h3>Registrieren</h3>
            )}
          </div>
        </div>
    </div>
  );
}
