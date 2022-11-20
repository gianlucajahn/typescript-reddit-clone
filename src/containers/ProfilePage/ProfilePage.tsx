// Imports
import React, { MouseEventHandler, useState, SetStateAction, Dispatch, useEffect } from 'react';
// Component Imports
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
import GridPost from '../../components/GridPost/GridPost';
import PostedComment from '../../components/PostedComment/PostedComment';
import SortBar from '../../components/SortBar/SortBar';
// Type Imports
import { Subreddits, Subreddit, Post, userObjectArray, userObject } from '../../types/types';
// Utility Imports
import userArray from '../../utils/userArray';
// CSS Imports
import './ProfilePage.scss';

export interface ProfilePageProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    currentSub: Subreddit | undefined,
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    renderNum: number,
    currentEditedComment: string,
    writeNestedComment: any,
    editComment: any,
    editNestedComment: any,
    currentlyInspectedUser: string,
    loginStatus: boolean,
    setLoginModalState: any,
    loginModalState: string,
    posts: Post[],
    currentPost: Post | undefined,
    mainComment: string,
    writeComment: any,
    userData: userObjectArray,
    currentUserData: userObject | undefined,
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
    navToProfile: MouseEventHandler,
    navToUserProfile: MouseEventHandler,
    reportUser: MouseEventHandler,
    addFriend: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    followUser: MouseEventHandler,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    setRenderNum: Dispatch<SetStateAction<number>>,
    setSort: React.MouseEventHandler
}

export default function ProfilePage (props:  ProfilePageProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    currentSub,
    renderNum,
    currentPost,
    mainComment,
    writeComment,
    subreddits,
    topSubreddits,
    currentEditedComment,
    writeNestedComment,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts,
    userData,
    currentUserData,
    editComment,
    editNestedComment,
    currentlyInspectedUser,
    savePost,
    submitNestedComment,
    enablePremium,
    setIndex,
    handleNestedComment,
    handleLikeComment,
    submitComment,
    setSort,
    navToProfile,
    navToUserProfile,
    reportUser,
    addFriend,
    openPost,
    handleSubMembership,
    setRenderNum,
    handleLike,
    handleNavigate,
    navToSubmit,
    followUser,
    } = props;

    // Local state
    const [currentProfileSection, setCurrentProfileSection] = useState("overview");
    const [optionsExpanded, setOptionsExpanded] = useState(false);
    const [hoveredSection, setHoveredSection] = useState("none");
    const [backgroundColor, setBackgroundColor] = useState("");

    // profile card background determination
    useEffect(() => {
      switch (currentUserData?.avatar) {
        case "1":
          setBackgroundColor("#51e9f4");
          break;
        case "2":
          setBackgroundColor("#ffd635");
          break;
        case "3":
          setBackgroundColor("#0079d3");
          break;
        case "4":
          setBackgroundColor("#94b3ff");
          break;
        case "5":
          setBackgroundColor("#e4abff");
          break;
        case "6":
          setBackgroundColor("#ff99aa");
          break;
        case "7":
          setBackgroundColor("#0079d2");
          break;
        case "8":
          setBackgroundColor("#7eed56");
          break;
        case "9":
          setBackgroundColor("#4856a3");
          break;
        case "10":
          setBackgroundColor("#d4e815");
          break;
        case "11":
          setBackgroundColor("#ffb470");
          break;
        case "12":
          setBackgroundColor("#ff66ac");
          break;
        case "13":
          setBackgroundColor("#c18d42");
          break;
        case "14":
          setBackgroundColor("#ff5105");
          break;
        case "15":
          setBackgroundColor("#46d160");
          break;
      }

      if (userName === currentlyInspectedUser) {
        switch (currentUserData?.avatar) {
          case "1":
            setBackgroundColor("#51e9f4");
            break;
          case "2":
            setBackgroundColor("#ffd635");
            break;
          case "3":
            setBackgroundColor("#0079d3");
            break;
          case "4":
            setBackgroundColor("#94b3ff");
            break;
          case "5":
            setBackgroundColor("#e4abff");
            break;
          case "6":
            setBackgroundColor("#ff99aa");
            break;
          case "7":
            setBackgroundColor("#0079d2");
            break;
          case "8":
            setBackgroundColor("#7eed56");
            break;
          case "9":
            setBackgroundColor("#4856a3");
            break;
          case "10":
            setBackgroundColor("#d4e815");
            break;
          case "11":
            setBackgroundColor("#ffb470");
            break;
          case "12":
            setBackgroundColor("#ff66ac");
            break;
          case "13":
            setBackgroundColor("#c18d42");
            break;
          case "14":
            setBackgroundColor("#ff5105");
            break;
          case "15":
            setBackgroundColor("#46d160");
            break;
        }

        if (currentUserData?.avatar.length !== 0) {
          return;
        }

        if (userName === "Nikola Tesla") {
          setBackgroundColor("#7193ff")
        } else if (randomIntToString === "1") {
          setBackgroundColor("#ff4500");
        } else if (randomIntToString === "2") {
          setBackgroundColor("#00b7d0");
        } else if (randomIntToString === "3") {
          setBackgroundColor("#ff4500");
        } else if (randomIntToString === "4") {
          setBackgroundColor("#ff4500");
        } else if (randomIntToString === "5") {
          setBackgroundColor("#d0c3c3");
        } else if (randomIntToString === "6") {
          setBackgroundColor("#ffeb0f");
        } else if (randomIntToString === "7") {
          setBackgroundColor("#14d8c3");
        } else if (randomIntToString === "8") {
          setBackgroundColor("#7193ff");
        } else if (randomIntToString === "9") {
          setBackgroundColor("#7193ff");
        } else if (randomIntToString === "10") {
          setBackgroundColor("#5dbbf6");
        }
      }
    }, []);

    // used for conditional src's on img elements
    const nonUserData = [
      "saved",
      "upvoted",
      "downvoted",
      "following"
    ];

    // current data determination
    const date = new Date();
    let day = date.getDate();
    let monthNum = date.getMonth();
    let year = date.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "June",
      "Juli",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let month = monthNames[monthNum - 1];
    let creationDate = `${month} ${day}${day - 20 === 1 ? "st" : day - 30 === 1 ? "st" : day === 1 ? "st" : day - 20 === 2 ? "nd" : day === 2 ? "nd" : "th"}, ${year}`;

    // event handler for switching the profile sections
    const switchProfileSection = (e: React.MouseEvent) => {
      const target = e.currentTarget;
      setCurrentProfileSection(target.id);
    }

    // event handler for animating the profile card on hover
    const hoverCard = (e: React.MouseEvent) => {
      let card = document.getElementById('card');
      card!.style.transition = "0s all";
      let xAxis = (window.innerWidth / 2 - e.pageX) / 47.5;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card!.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    // reset card angle onMouseLeave
    const resetCard = (e: React.MouseEvent) => {
      let xAxis = 0;
      let yAxis = 0;
      let card = document.getElementById('card');
      card!.style.transition = "0.3s all";
      card!.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    // event handler to conditionally color section headlines on hover
    const hoverSection = (e: React.MouseEvent) => {
      const target = e.currentTarget;
      setHoveredSection(target.id);
    }

  return (
    <div className="profile-page">
      <div className="head">
        <div className="section overview" id="overview" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "overview" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "overview" ? "#0079d3" : hoveredSection === "overview" ? "#0079d3" : "#1a1a1b"}}>OVERVIEW</h3>
        </div>

        <div className="section posts" id="posts" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "posts" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "posts" ? "#0079d3" : hoveredSection === "posts" ? "#0079d3" : "#1a1a1b"}}>POSTS</h3>
        </div>

        <div className="section comments" id="comments" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "comments" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "comments" ? "#0079d3" : hoveredSection === "comments" ? "#0079d3" : "#1a1a1b"}}>COMMENTS</h3>
        </div>

        {currentlyInspectedUser === userName && <div className="section saved" id="saved" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "saved" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "saved" ? "#0079d3" : hoveredSection === "saved" ? "#0079d3" : "#1a1a1b"}}>SAVED</h3>
        </div>}

        {currentlyInspectedUser === userName && <div className="section upvoted" id="upvoted" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "upvoted" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "upvoted" ? "#0079d3" : hoveredSection === "upvoted" ? "#0079d3" : "#1a1a1b"}}>UPVOTED</h3>
        </div>}

        {currentlyInspectedUser === userName && <div className="section downvoted" id="downvoted" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "downvoted" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "downvoted" ? "#0079d3" : hoveredSection === "downvoted" ? "#0079d3" : "#1a1a1b"}}>DOWNVOTED</h3>
        </div>}

        {currentlyInspectedUser === userName && <div className="section following" id="following" onClick={switchProfileSection} onMouseEnter={(e) => setHoveredSection(e.currentTarget.id)} onMouseLeave={(e) => setHoveredSection("none")} style={{ borderBottom: currentProfileSection === "following" ? "2px solid #0079d3" : ""}}>
          <h3 style={{ color: currentProfileSection === "following" ? "#0079d3" : hoveredSection === "following" ? "#0079d3" : "#1a1a1b"}}>FOLLOWING</h3>
        </div>}
      </div>

      <div className="profile-content">
        <div className="feed">
          <SortBar
          currentSort={currentSort}
          setSort={setSort}
          />

          <div className="grid">
            <>
            {currentProfileSection === "overview" && posts.map((post, i) => {
              if (post.author !== currentlyInspectedUser) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={undefined}
              currentlyInspectedUser={currentlyInspectedUser}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            
            {currentProfileSection === "overview" && posts.map((post, i) => {
                if (post.comments[0].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[0]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 2) {
                  return;
                }
                if (post.comments[1].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[1]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 3) {
                  return;
                }
                if (post.comments[2].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[2]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 4) {
                  return;
                }
                if (post.comments[3].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[3]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 5) {
                  return;
                }
                if (post.comments[4].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[4]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 6) {
                  return;
                }
                if (post.comments[5].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[5]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }
              })}
            
            {currentProfileSection === "posts" && posts.map((post, i) => {
              if (post.author !== currentlyInspectedUser) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={currentPost}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              currentlyInspectedUser={currentlyInspectedUser}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            
            {currentProfileSection === "comments" && posts.map((post, i) => {
                if (post.comments[0].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[0]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 2) {
                  return;
                }
                if (post.comments[1].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[1]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 3) {
                  return;
                }
                if (post.comments[2].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[2]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 4) {
                  return;
                }
                if (post.comments[3].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[3]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 5) {
                  return;
                }
                if (post.comments[4].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[4]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }

                if (post.comments.length < 6) {
                  return;
                }
                if (post.comments[5].author === currentlyInspectedUser) {
                  return <div className="whiteBox"><PostedComment
                  index={i}
                  currentPost={post}
                  userName={userName}
                  mainComment={mainComment}
                  handleLikeComment={handleLikeComment}
                  handleNestedComment={handleNestedComment}
                  commentObj={post.comments[5]}
                  targetedComment={post.comments[i]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={false}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  randomIntToString={randomIntToString}
                  navToUserProfile={navToUserProfile}
                  navToProfile={navToProfile}
                 /></div>
                }
              })}
              
              {currentProfileSection === "saved" && posts.map((post, i) => {
              if (post.saved === false) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={currentPost}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              currentlyInspectedUser={currentlyInspectedUser}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            
            {currentProfileSection === "upvoted" && posts.map((post, i) => {
              if (post.vote !== 1) {
                return;
              }

              if (post.author === userName) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={currentPost}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              currentlyInspectedUser={currentlyInspectedUser}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            
            {currentProfileSection === "downvoted" && posts.map((post, i) => {
              if (post.vote !== -1) {
                return;
              }

              if (post.author === userName) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={currentPost}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              currentlyInspectedUser={currentlyInspectedUser}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            
            {currentProfileSection === "following" && posts.map((post, i) => {
              const userId = userData.findIndex(user => user.username === userName);

              if (userData[userId].following.includes(post.author) === false) {
                return;
              }

              return <GridPost 
              post={post}
              posts={posts}
              currentSub={currentSub} 
              currentPost={currentPost}
              handleNavigate={handleNavigate}
              handleLike={handleLike}
              currentlyInspectedUser={currentlyInspectedUser}
              openPost={openPost}
              userName={userName}
              mainComment={mainComment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              randomIntToString={randomIntToString}
              savePost={savePost}
              navToUserProfile={navToUserProfile}
              navToProfile={navToProfile}
              nonUserData={nonUserData}
              currentProfileSection={currentProfileSection}
             />
            })}
            </>
          </div>
        </div>

        <div className="info">
          <div className="card">
            <div className="box">
              {currentlyInspectedUser === userName && <img alt="add" className="add-photo" src={require("../../resources/images/addphoto.png")} />}
            </div>
            <img alt="settings" className="settings" src={require("../../resources/images/bluesettings.png")} />
            <div className="d-card" onMouseMove={hoverCard} id="card" onMouseLeave={resetCard} style={{ backgroundColor: backgroundColor }}>
              <div className="card-content">
                <img alt="card" className="card-icon" src={userName === "Nikola Tesla" ? userName === currentlyInspectedUser ? require(`../../resources/images/avatartesla_head.png`) : require(`../../resources/images/base_variants/default${currentUserData?.avatar}.png`) : userName === currentlyInspectedUser ? userArray.findIndex(user => user.username === userName) !== -1 ? require(`../../resources/images/base_variants/default${userArray[userArray.findIndex(user => user.username === userName)].avatar}.png`) : require(`../../resources/images/avatar${randomIntToString}_head.png`) : require(`../../resources/images/base_variants/default${currentUserData?.avatar}.png`)} />
              </div>
            </div>

            <button className="details">
              <img alt="hexagon" className="hexagon" src={require("../../resources/images/hexagon.png")} />        
              Details    
            </button>
            
            <h1>{currentlyInspectedUser === userName ? userName : currentlyInspectedUser}</h1>
            <h4>u/{currentlyInspectedUser === userName ? userName : currentlyInspectedUser} · {currentlyInspectedUser === userName ? userArray.findIndex(user => user.username === userName) === -1 ? "1d" : currentUserData?.age : currentUserData?.age}</h4>

            {currentlyInspectedUser === userName && <button className="style">
              <img alt="shirt" className="shirt" src={require("../../resources/images/shirt.png")} />
              <h3>Style Avatar</h3>
            </button>}

            <div className="userdata">
              <div className="karma-container">
                <h3>Karma</h3>
                <div className="flexbox">
                  <img alt="karma" className="karma" src={require("../../resources/images/karma_blue.png")} />
                  <h4>{currentlyInspectedUser === userName ? userData[userData.findIndex(user => user.username === userName)].karma.length >= 4 ? userData[userData.findIndex(user => user.username === userName)].karma.substring(0, userData[userData.findIndex(user => user.username === userName)].karma.length - 3) + "." + userData[userData.findIndex(user => user.username === userName)].karma.substring(userData[userData.findIndex(user => user.username === userName)].karma.length - 3) : userData[userData.findIndex(user => user.username === userName)].karma : currentUserData!.karma.length >= 4 ? currentUserData?.karma.substring(0, currentUserData.karma.length - 3) + "." + currentUserData?.karma.substring(currentUserData.karma.length - 3) : currentUserData?.karma}</h4>
                </div>
              </div>

              <div className="cake-container">
                <h3>Cake day</h3>
                <div className="flexbox">
                  <img alt="cake" className="cake" src={require("../../resources/images/cake.png")} />
                  <h4>{currentlyInspectedUser === userName ? userArray.findIndex(user => user.username === userName) === -1 ? creationDate : currentUserData?.cakeday : currentUserData?.cakeday}</h4>
                </div>
              </div>
            </div>

            {posts.map((post, i) => {
              if (post.author !== currentlyInspectedUser) {
                return;
              } 
              
              if (post.awards.length === 0) {
                return;
              } else {

              }

              return <div className="awards-display">
                <img alt="award" className="award" src={require(`../../resources/images/${post.awards[0]}.png`)} />
                {post.awards.length >= 2 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[1]}.png`)} />}
                {post.awards.length >= 3 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[2]}.png`)} />}
                {post.awards.length >= 4 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[3]}.png`)} />}
                {post.awards.length >= 5 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[4]}.png`)} />}
                {post.awards.length >= 6 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[5]}.png`)} />}
                {post.awards.length >= 7 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[6]}.png`)} />}
                {post.awards.length >= 8 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[7]}.png`)} />}
                {post.awards.length >= 9 && <img className="award" alt="award" src={require(`../../resources/images/${post.awards[8]}.png`)} />}
                <p>received</p>
              </div>
            })}

            <div className="social-container">
              <button className={currentlyInspectedUser !== userName ? currentUserData?.added ? "social-true" : "social" : "social"} onClick={currentlyInspectedUser !== userName ? addFriend : (e) => null}>
                <img alt="add" className={currentlyInspectedUser !== userName ? currentUserData?.added ? "added" : "add" : "add"} src={currentlyInspectedUser !== userName ? currentUserData?.added ? require("../../resources/images/checkblack.png") : require("../../resources/images/add.PNG") : require("../../resources/images/add.PNG") } />
                <h3>{currentlyInspectedUser === userName ? "Add social link" : currentUserData?.added ? "Request sent" : "Add As Friend"}</h3>
              </button>

              <button className={currentlyInspectedUser !== userName ? currentUserData?.reported ? "social-reported" : "social" : "social"} onClick={currentlyInspectedUser !== userName ? reportUser : (e) => null}>
                <img alt="add" className="add" src={currentlyInspectedUser === userName ? require("../../resources/images/add.PNG") : require("../../resources/images/report.png")} style={{ marginRight: userName === currentlyInspectedUser ? "" : "4px", marginLeft: userName === currentlyInspectedUser ? "" : "4px" }} />
                <h3>{currentlyInspectedUser === userName ? "Add GitHub" : currentUserData?.reported ? "Report sent" : "Report User"}</h3>
              </button>
            </div>

            {currentlyInspectedUser === userName ? <button className="create" onClick={navToSubmit}>
              New Post
            </button> : <div className="social-buttons">
                <button className={userData[userData.findIndex(user => user.username === userName)].following.includes(currentlyInspectedUser) ? "followed" : "create"} onClick={followUser}>{userData[userData.findIndex(user => user.username === userName)].following.includes(currentlyInspectedUser) ? "Unf" : "F"}ollow</button>
                <button className="create-non" style={{ cursor: "not-allowed" }}>Chat</button>
              </div>}

            {
              optionsExpanded ? <div className="option-container">
                <a href="https://reddit.zendesk.com/hc/en-us/articles/115002454126-What-kind-of-profile-moderation-tools-do-I-have-" target="_blank"><button className="optionButton">
                  {currentlyInspectedUser === userName ? "Profile Moderation" : "Get Them Help and Support"}
                </button></a>

                <a href="https://reddit.zendesk.com/hc/en-us/articles/360043043412-What-is-a-custom-feed-and-how-do-I-make-one-" target="_blank"><button className="optionButton">
                  Add to Custom Feed
                </button></a>

                <button className="optionButton">
                  {currentlyInspectedUser === userName ? "User Settings" : "Invite someone to chat"}
                </button>
              </div> : null
            }

            <button className="expandProfile switcher" onClick={(e) => setOptionsExpanded(!optionsExpanded)}>
              {optionsExpanded ? "Fewer Options" : "More Options"}
            </button>
          </div>

          <div className="trophies">
            <h3>Trophy Case ({currentUserData?.trophies.length})</h3>

            {currentUserData?.trophies.map((trophy, i) => {
              return <div className="trophy-container">
                <img alt="trophy" className="tropy-icon" src={require(`../../resources/images/${trophy}.png`)} />
                <h3>{trophy === "sevenyearclub" ? "Seven-Year Club" : 
                     trophy === "sixyearclub" ? "Six-Year Club" : 
                     trophy === "fiveyearclub" ? "Five-Year Club" :
                     trophy === "fouryearclub" ? "Four-Year Club" :
                     trophy === "threeyearclub" ? "Three-Year Club" :
                     trophy === "twoyearclub" ? "Two-Year Club" :
                     trophy === "onedayclub" ? "One-Day Club" :
                     trophy === "popularpost" ? "Popular Post" :
                     trophy === "photograph" ? "Photographer" :
                     trophy === "poster" ? "Post Creator" :
                     trophy === "popularcomment" ? "Popular Comment" :
                     trophy === "commenter" ? "Commenter" :
                     trophy === "betauser" ? "Beta User" :
                     trophy === "newuser" ? "New User" : ""}</h3>
              </div>
            })}
          </div>

          <div className="button-div">
            <BackToTopButton />
          </div>
        </div>
      </div>
    </div>
  );
}
