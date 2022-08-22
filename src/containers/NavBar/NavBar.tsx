import * as React from 'react';
import './NavBar.scss';
import { ReactComponent as RedditLogo } from "../../resources/images/redditlogo.svg";
import { ReactComponent as Reddit } from "../../resources/images/reddit.svg";
import { ReactComponent as Search } from "../../resources/images/search.svg";
import { ReactComponent as Expand } from "../../resources/images/expand.svg";
import { ReactComponent as User } from "../../resources/images/user.svg";

export interface NavBarProps {

}

export default function NavBar (props: NavBarProps) {
  return (
    <div className="navBar">
        <div className="logo">
          <RedditLogo className="redditLogo" />
          <Reddit className="reddit" />
        </div>

        <div className="search">
          <input type="text" placeholder="Reddit durchsuchen" className="searchBar">
          </input>
        </div>

        <div className="user">
            <button className="auth login">
              Login
            </button>
            <button className="auth register">
              Register
            </button>
  
            <div className="userInfo">
              <img src={require("../../resources/images/user.png")} className="userImg" />
              <img src={require("../../resources/images/expand.png")} className="expand" />
            </div>
        </div>
    </div>
  );
}
