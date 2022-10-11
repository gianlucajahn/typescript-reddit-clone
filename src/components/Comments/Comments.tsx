import React from 'react';
import { Subreddit } from '../../types/types';
import './Comments.scss';

export interface CommentsProps {
  userName: string,
  currentSub: Subreddit | undefined
}

export default function Comments (props: CommentsProps) {
  const {
    userName,
    currentSub
  } = props;

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3 className="submit-header">Comment as <span style={{ color: currentSub?.buttonColor }}>{userName !== "" ? userName : "User"}</span></h3>

          <textarea className="comment-box" placeholder="What are your thoughts?"></textarea>
          <div className="button-bar">
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/bold.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/italic.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/clip.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/strikethrough.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/inline.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/superscript.png")} />
            </button>
            <button className="text-settings spoiler">
              <img className="setting-icon" src={require("../../resources/images/spoiler.png")} />
            </button>

            <div className="line"></div>

            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/heading.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/bulleted.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/numbered.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/quote.png")} />
            </button>
            <button className="text-settings">
              <img className="setting-icon" src={require("../../resources/images/dots.png")} />
            </button>
          </div>
        </div>

        <div className="comment-list">

        </div>
    </div>
  );
}
