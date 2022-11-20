// Imports
import React, { MouseEventHandler } from 'react';
// Hook Imports
import { useNavigate } from 'react-router-dom';
// CSS Imports
import './CreatePost.scss';

export interface CreatePostProps {
    randomIntToString: string,
    userName: string,
    loginStatus: boolean,
    navToSubmit: MouseEventHandler
}

export default function CreatePost (props: CreatePostProps) {
  const {
    randomIntToString,
    userName,
    loginStatus,
    navToSubmit,
  } = props;

  return (
    <div className="createPostMenu" style={{ display: loginStatus ? "flex" : "none" }}>
        <img className="avatar" onClick={navToSubmit} src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} alt="avatar" />
        <input type="text" onClick={navToSubmit} placeholder="Create Post"></input>
        <button className="imagePost image" onClick={navToSubmit}>
            <img className="icon image" src={require("../../resources/images/img.PNG")} alt="image" />
        </button>
        <button className="linkPost link" onClick={navToSubmit}>
            <img className="icon link" src={require("../../resources/images/link.PNG")} alt="link" />
        </button>
    </div>
  );
}
