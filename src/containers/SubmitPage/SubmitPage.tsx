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

  const [OC, setOC] = useState(false);
  const [spoiler, setSpoiler] = useState(false);
  const [NSFW, setNSFW] = useState(false);

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
            <button type="button" className="flair-btn" style={{ backgroundColor: OC ? "#4ac150" : "white", border: OC ? "1px solid #4ac150" : "1px solid #878a8c", gap: OC ? "9px" : "7px" }} onClick={(e) => setOC(!OC)}> 
              <img className={OC ? "check-icon" : "flair-icon"} src={OC ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: OC ? "white" : "#878a8c" }}>OC</h3>
            </button>

            <button type="button" className="flair-btn" style={{ backgroundColor: spoiler ? "black" : "white", border: spoiler ? "1px solid black" : "1px solid #878a8c", gap: spoiler ? "9px" : "7px" }} onClick={(e) => setSpoiler(!spoiler)}>
              <img className={spoiler ? "check-icon" : "flair-icon"} src={spoiler ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: spoiler ? "white" : "#878a8c" }}>Spoiler</h3>
            </button>

            <button type="button" className="flair-btn" style={{ backgroundColor: NSFW ? "rgb(255, 88, 91)" : "white", border: NSFW ? "1px solid rgb(255, 88, 91)" : "1px solid #878a8c", gap: NSFW ? "9px" : "7px" }} onClick={(e) => setNSFW(!NSFW)}>
              <img className={NSFW ? "check-icon" : "flair-icon"} src={NSFW ? require("../../resources/images/check.png") : require("../../resources/images/add.PNG")} />
              <h3 className="active" style={{ color: NSFW ? "white" : "#878a8c" }}>NSFW</h3>
            </button>

            <button type="button" className="flair-btn greyed-out">
              <img className="flair-icon" src={require("../../resources/images/flair.PNG")} />
              <h3 className="grey">Flair</h3>
              <img className="expand" src={require("../../resources/images/expandgrey.png")} />
            </button>
          </div>

          <div className="divider"></div>

          <div className="submit-container">
            <button type="button" className="submit-btn save-draft" style={{ border: customPost.title.length >= 1 ? currentSub !== undefined ? `1px solid ${currentSub.buttonColor}` : `1px solid ${standardTheme.buttonColor}` : "1px solid #b2b2b2" }}>
              <h3 className="active" style={{ color: customPost.title.length >= 1 ? currentSub !== undefined ? currentSub.buttonColor : standardTheme.buttonColor : "#b2b2b2" }}>Save Draft</h3>
            </button>

            <button type="button" className="submit-btn" style={{ backgroundColor: currentSub !== undefined ? customPost.title.length >= 1 ? currentSub.buttonColor : "#848484" : "#848484", border: currentSub !== undefined ? customPost.title.length >= 1 ? currentSub.buttonColor : "#848484" : "#848484" }} onClick={(e) => setNSFW(!NSFW)}>
              <h3 className="active" style={{ color: currentSub !== undefined ? customPost.title.length >= 1 ? "white" : "#b2b2b2" : "#b2b2b2" }}>Post</h3>
            </button>
          </div>

          <div className="footer-container">
            <div className="notification-container">
              <input type="checkbox" className="notification" />
              <h4>Send me post reply notifications</h4>
            </div>

            <div className="connection-container">
              <h4>Connect accounts to share your post</h4>
              <img className="info" src={require("../../resources/images/infos_grey.png")} />
            </div>
          </div>
        </div>
      </div>

      <div className="right">

      </div>
    </div>
  );
}
