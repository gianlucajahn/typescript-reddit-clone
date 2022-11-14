import React, { MouseEventHandler, useState, SetStateAction, Dispatch } from 'react';
import SortBar from '../../components/SortBar/SortBar';
import { Subreddits, Subreddit, Post } from '../../types/types';
import './ProfilePage.scss';

export interface ProfilePageProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    currentSub: Subreddit | undefined,
    setSort: React.MouseEventHandler;
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    renderNum: number,
    setRenderNum: Dispatch<SetStateAction<number>>,
    currentEditedComment: string,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    writeNestedComment: any,
    editComment: any,
    editNestedComment: any,
    currentlyInspectedUser: string,
    savePost: MouseEventHandler,
    enablePremium: MouseEventHandler,
    submitNestedComment: MouseEventHandler
    handleSubMembership: React.MouseEventHandler,
    handleNavigate: MouseEventHandler,
    handleLike: MouseEventHandler,
    navToSubmit: MouseEventHandler,
    openPost: MouseEventHandler,
    submitComment: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    loginStatus: boolean,
    setLoginModalState: any,
    loginModalState: string,
    posts: Post[],
    currentPost: Post | undefined,
    mainComment: string,
    writeComment: any
}

export default function ProfilePage (props:  ProfilePageProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    currentSub,
    renderNum,
    setRenderNum,
    currentPost,
    mainComment,
    writeComment,
    setSort,
    subreddits,
    topSubreddits,
    setIndex,
    currentEditedComment,
    writeNestedComment,
    editComment,
    enablePremium,
    editNestedComment,
    savePost,
    submitNestedComment,
    currentlyInspectedUser,
    handleNestedComment,
    handleLikeComment,
    submitComment,
    openPost,
    handleSubMembership,
    handleLike,
    handleNavigate,
    navToSubmit,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts
    } = props;

    const [currentProfileSection, setCurrentProfileSection] = useState("overview");

    const switchProfileSection = (e: React.MouseEvent) => {
      const target = e.currentTarget;
      setCurrentProfileSection(target.id);
    }

    const hoverCard = (e: React.MouseEvent) => {
      let card = document.getElementById('card');
      card!.style.transition = "0s all";
      let xAxis = (window.innerWidth / 2 - e.pageX) / 47.5;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card!.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    const resetCard = (e: React.MouseEvent) => {
      let xAxis = 0;
      let yAxis = 0;
      let card = document.getElementById('card');
      card!.style.transition = "0.3s all";
      card!.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

  return (
    <div className="profile-page">
      <div className="head">
        <div className="section overview" id="overview" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "overview" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "overview" ? "#0079d3" : "#1a1a1b"}}>OVERVIEW</h3>
        </div>

        <div className="section posts" id="posts" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "posts" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "posts" ? "#0079d3" : "#1a1a1b"}}>POSTS</h3>
        </div>

        <div className="section comments" id="comments" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "comments" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "comments" ? "#0079d3" : "#1a1a1b"}}>COMMENTS</h3>
        </div>

        <div className="section saved" id="saved" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "saved" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "saved" ? "#0079d3" : "#1a1a1b"}}>SAVED</h3>
        </div>

        <div className="section upvoted" id="upvoted" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "upvoted" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "upvoted" ? "#0079d3" : "#1a1a1b"}}>UPVOTED</h3>
        </div>

        <div className="section downvoted" id="downvoted" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "downvoted" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "downvoted" ? "#0079d3" : "#1a1a1b"}}>DOWNVOTED</h3>
        </div>

        <div className="section following" id="following" onClick={switchProfileSection} style={{ borderBottom: currentProfileSection === "following" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "following" ? "#0079d3" : "#1a1a1b"}}>FOLLOWING</h3>
        </div>
      </div>

      <div className="profile-content">
        <div className="feed">
          <SortBar
          currentSort={currentSort}
          setSort={setSort}
          />
        </div>

        <div className="info">
          <div className="card">
            <div className="box">
              <img className="add-photo" src={require("../../resources/images/addphoto.png")} />
            </div>
            <img className="settings" src={require("../../resources/images/bluesettings.png")} />
            <div className="d-card" onMouseMove={hoverCard} id="card" onMouseLeave={resetCard}>
              <div className="card-content">
                <img className="card-icon" src={userName === "Nikola Tesla" ? userName === currentlyInspectedUser ? require(`../../resources/images/avatartesla_head.png`) : require("../../resources/images/base_variants/default1.png") : userName === currentlyInspectedUser ? require(`../../resources/images/avatar${randomIntToString}_head.png`) : require("../../resources/images/base_variants/default1.png")} />
              </div>
            </div>

            <button className="details">
              <img className="hexagon" src={require("../../resources/images/hexagon.png")} />        
              Details    
            </button>
            
            <h1>{userName}</h1>
            <h4>u/{userName} · 1d</h4>

            <button className="style">
              <img className="shirt" src={require("../../resources/images/shirt.png")} />
              Style Avatar
            </button>
          </div>

          <div className="trophies">

          </div>
        </div>
      </div>
    </div>
  );
}
