import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.scss';

export interface CreatePostProps {
    randomIntToString: string,
    userName: string,
    navToSubmit: MouseEventHandler
}

export default function CreatePost (props: CreatePostProps) {
  const {
    randomIntToString,
    userName,
    navToSubmit,
  } = props;

  const navigate = useNavigate();

  return (
    <div className="createPostMenu" onClick={navToSubmit}>
        <img className="avatar" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
        <input type="text" placeholder="Create Post"></input>
        <button className="imagePost">
            <img className="icon" src={require("../../resources/images/img.PNG")} />
        </button>
        <button className="linkPost">
            <img className="icon" src={require("../../resources/images/link.PNG")} />
        </button>
    </div>
  );
}
