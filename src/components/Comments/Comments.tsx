import { AnyNaptrRecord } from 'dns';
import React, { MouseEventHandler, useState } from 'react';
import { Post, Subreddit } from '../../types/types';
import './Comments.scss';
import { ReactComponent as Dropdown } from "../../resources/images/dropdown.svg";

export interface CommentsProps {
  userName: string,
  currentSub: Subreddit | undefined,
  comment: string,
  writeComment: any,
  currentPost: Post,
  submitComment: MouseEventHandler
}

export default function Comments (props: CommentsProps) {
  const {
    userName,
    currentSub,
    comment,
    writeComment,
    currentPost,
    submitComment
  } = props;

  const [focussed, setFocussed] = useState(false);

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3 className="submit-header">Comment as <span style={{ color: currentSub?.buttonColor }}>{userName !== "" ? userName : "User"}</span></h3>

          <div className="hoverArea" style={{ border: focussed ? "1px solid black" : "1px solid transparent" }}>
              <textarea className="comment-box" placeholder="What are your thoughts?" value={comment} onChange={writeComment} onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}></textarea>

              <div className="button-bar">
                <button className="text-settings" aria-label="Bold">
                  <img className="setting-icon" src={require("../../resources/images/bold.png")} />
                </button>
                <button className="text-settings" aria-label="Italic">
                  <img className="setting-icon" src={require("../../resources/images/italic.png")} />
                </button>
                <button className="text-settings" aria-label="Link">
                  <img className="setting-icon" src={require("../../resources/images/clip.png")} />
                </button>
                <button className="text-settings" aria-label="Striked">
                  <img className="setting-icon" src={require("../../resources/images/strikethrough.png")} />
                </button>
                <button className="text-settings" aria-label="Inline Code">
                  <img className="setting-icon" src={require("../../resources/images/inline.png")} />
                </button>
                <button className="text-settings" aria-label="Superscript">
                  <img className="setting-icon" src={require("../../resources/images/superscript.png")} />
                </button>
                <button className="text-settings spoiler" aria-label="Spoiler">
                  <img className="setting-icon" src={require("../../resources/images/spoiler.png")} />
                </button>
    
                <div className="line"></div>
    
                <button className="text-settings" aria-label="Heading">
                  <img className="setting-icon" src={require("../../resources/images/heading.png")} />
                </button>
                <button className="text-settings" aria-label="Bulleted">
                  <img className="setting-icon" src={require("../../resources/images/bulleted.png")} />
                </button>
                <button className="text-settings" aria-label="Numbered"> 
                  <img className="setting-icon" src={require("../../resources/images/numbered.png")} />
                </button>
                <button className="text-settings" aria-label="Quote Block">
                  <img className="setting-icon" src={require("../../resources/images/quote.png")} />
                </button>
                <button className="text-settings" aria-label="More">
                  <img className="setting-icon" src={require("../../resources/images/dots.png")} />
                </button>
    
                <button className="markdown" id="markdown">
                  <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
                </button>

                <button className="markdown submit" style={{ backgroundColor: comment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a", color: comment.length >= 1 ? "white" : "#cdcdcd", cursor: comment.length >= 1 ? "pointer" : "not-allowed" }} onClick={submitComment}>
                  <p>Comment</p>
                </button>
              </div>
          </div>
        </div>

        <div className="comment-list">
          <div className="sorter">
            <h3 style={{ color: currentSub?.buttonColor }}>Sort By: Best</h3>
            <Dropdown 
              fill={currentSub?.buttonColor}
              className="dropdown"
            />
          </div>

          {currentPost.comments.map((comment, i) => {
            return <div className="comment">
              <div className="comment-header">
                <img className="comment-avatar" src={require("../../resources/images/avatar3.PNG")} />
                <h4 className="comment-author">{comment.author}</h4>
                <h4 className="comment-timestamp">· {comment.time}</h4>
              </div>
              <p>{comment.content}</p>
            </div>
          })}
        </div>
    </div>
  );
}
