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
  setIndex: any,
  customPost: Post,
  editPostTitle: any,
  editPostSrc: any,
}

export default function SubmitPage (props: SubmitPageProps) {
  const {
    randomIntToString,
    userName,
    subreddits,
    customPost,
    submitPostType,
    loginStatus,
    draftAmount,
    handleDraft,
    setLoginModalState,
    setSubmitPostType,
    editPostTitle,
    editPostSrc,
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

  const [focussed, setFocussed] = useState(false);
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

          <div className="title-container">
              <input type="text" placeholder="Title" className="title" onChange={(e) => editPostTitle(e)} value={customPost.title} />
              <div className="counter">{customPost.title.length}/300</div>
          </div>

          <div className="src-container" onClick={(e) => setFocussed(true)} onBlur={(e) => setFocussed(false)} style={{ border: focussed ? "1px solid #1c1c1c" : "1px solid transparent" }}>
              <div className="button-bar-top">
                <div className="start">
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
                </div>
    
                <div className="end">
                        <button className="markdown btn" id="markdown">
                          <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
                        </button>
                </div>
              </div>

              <textarea placeholder="Text (optional)" className="src-field" onChange={editPostSrc} value={customPost.src} />
          </div>

          <div className="flair-container">
            <button type="button" className="flair-btn"> 
              <img className="flair-icon" src={require("../../resources/images/add.PNG")} />
              <h3 className="active">OC</h3>
            </button>

            <button type="button" className="flair-btn">
              <img className="flair-icon" src={require("../../resources/images/add.PNG")} />
              <h3 className="active">Spoiler</h3>
            </button>

            <button type="button" className="flair-btn">
              <img className="flair-icon" src={require("../../resources/images/add.PNG")} />
              <h3 className="active">NSFW</h3>
            </button>

            <button type="button" className="flair-btn greyed-out">
              <img className="flair-icon" src={require("../../resources/images/flair.PNG")} />
              <h3 className="grey">Flair</h3>
              <img className="expand" src={require("../../resources/images/expandgrey.png")} />
            </button>
          </div>
        </div>
      </div>

      <div className="right">

      </div>
    </div>
  );
}
