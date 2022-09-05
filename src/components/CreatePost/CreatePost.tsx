import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.scss';

export interface CreatePostProps {
    randomIntToString: string,
    userName: string
}

export default function CreatePost (props: CreatePostProps) {
  const {
    randomIntToString,
    userName
  } = props;

  const navigate = useNavigate();
  const navTo = (e: React.MouseEvent) => {
    navigate("/submit");
  }

  return (
    <div className="createPostMenu" onClick={navTo}>
        <img className="avatar" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
        <input type="text" placeholder="Post erstellen"></input>
        <button className="imagePost">
            <img className="icon" src={require("../../resources/images/img.PNG")} />
        </button>
        <button className="linkPost">
            <img className="icon" src={require("../../resources/images/link.PNG")} />
        </button>
    </div>
  );
}
