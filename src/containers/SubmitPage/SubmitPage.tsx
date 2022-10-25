import React, { MouseEventHandler, useState } from 'react';
import { Post, Subreddit, Subreddits } from '../../types/types';
import './SubmitPage.scss';

export interface SubmitPageProps {
  randomIntToString: string,
  draftAmount: number,
  handleDraft: any,
  userName: string,
  subreddits: Subreddits,
  loginStatus: boolean,
  setLoginModalState: any,
  submitPostType: string | undefined,
  setSubmitPostType: any,
  handleNavigate: MouseEventHandler,
  navToSubmit: MouseEventHandler,
  loginModalState: string,
  currentSub: Subreddit | undefined,
  posts: Post[],
  currentPost: Post | undefined,
  standardTheme: any,
  openPost: MouseEventHandler,
  setIndex: any
}

export default function SubmitPage (props: SubmitPageProps) {
  const {
    randomIntToString,
    userName,
    subreddits,
    submitPostType,
    loginStatus,
    draftAmount,
    handleDraft,
    setLoginModalState,
    setSubmitPostType,
    handleNavigate,
    navToSubmit,
    loginModalState,
    currentSub,
    posts,
    standardTheme,
    currentPost,
    openPost,
    setIndex,
  } = props;

  const [typeHover, setTypeHover] = useState({
    text: false,
    image: false,
    link: false
  });

  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === "text") {
      setTypeHover({
        text: true,
        image: false,
        link: false
      });
    } else if (target.id === "image") {
      setTypeHover({
        text: false,
        image: true,
        link: false
      });
    } else if (target.id === "link") {
      setTypeHover({
        text: false,
        image: false,
        link: true
      });
    }
  }

  const resetHover = (e: React.MouseEvent) => {
    setTypeHover({
      text: false,
      image: false,
      link: false
    });
  }

  return (
    <div className="submit-page">
      <div className="left">
        <div className="head">
          <h3 className="head-text">Create a post</h3>
          <button className="drafts" style={{ color: currentSub !== undefined ? currentSub.buttonColor : standardTheme.buttonColor }}>
            DRAFTS
            <div className="draft-num">{draftAmount}</div>
          </button>
        </div>

        <div className="divider"></div>

        <button className="community-selector">
          <div className="start">
              <img className="community-icon" src={require(`../../resources/images/Communities/${currentSub !== undefined ? `${currentSub.title}/icon` : "placeholder"}.png`)} />
              <h4 className="community-title">{currentSub !== undefined ? "r/" + currentSub.title : "Choose a community"}</h4>
          </div>
          <img className="expand" src={require("../../resources/images/expand.png")} />
        </button>

        <div className="post-options">
          <div className="post-types">
            <div className="post-type post hoverable" style={{ backgroundColor: submitPostType === "text" ? "#f2f8fd" : typeHover.text ? "#f2f8fd" : "white", borderBottom: submitPostType === "text" ? "2px solid #0079d3" : "" }} id="text" onClick={(e) => setSubmitPostType("text")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img className="text" src={require(`../../resources/images/${submitPostType === "text" ? "typetext_selected" : "typetext"}.png`)} />
              <h2 style={{ color: submitPostType === "text" ? "#0079d3" : "#878a8c" }}>Post</h2>
            </div>

            <div className="post-type img hoverable" style={{ backgroundColor: submitPostType === "image" ? "#f2f8fd" : typeHover.image ? "#f2f8fd" : "white", borderBottom: submitPostType === "image" ? "2px solid #0079d3" : "" }} id="image" onClick={(e) => setSubmitPostType("image")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img className="image" src={require(`../../resources/images/${submitPostType === "image" ? "typeimage_selected" : "typeimage"}.png`)} />
              <h2 style={{ color: submitPostType === "image" ? "#0079d3" : "#878a8c" }}>Images & Video</h2>
            </div>

            <div className="post-type links hoverable" style={{ backgroundColor: submitPostType === "link" ? "#f2f8fd" : typeHover.link ? "#f2f8fd" : "white", borderBottom: submitPostType === "link" ? "2px solid #0079d3" : "" }} id="link" onClick={(e) => setSubmitPostType("link")} onMouseEnter={handleHover} onMouseLeave={resetHover}>
              <img className="link" src={require(`../../resources/images/${submitPostType === "link" ? "typelink_selected" : "typelink"}.png`)} />
              <h2 style={{ color: submitPostType === "link" ? "#0079d3" : "#878a8c" }}>Link</h2>
            </div>

            <div className="post-type polls not-allowed">
              <img className="poll" src={require(`../../resources/images/typepoll.png`)} />
              <h2 className="greyed-out">Poll</h2>
            </div>

            <div className="post-type talks not-allowed">
              <img className="talk" src={require(`../../resources/images/typetalk.png`)} />
              <h2 className="greyed-out">Talk</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="right">

      </div>
    </div>
  );
}
