// Imports
import React, { MouseEventHandler, Dispatch, SetStateAction, useState, useEffect } from 'react';
// Type Imports
import { Subreddits, Subreddit, Post } from '../../types/types';
// SVG Imports
import { ReactComponent as Cross } from "../../resources/images/cross.svg";
// Hook Imports
import { useLocation } from 'react-router-dom';
// Component Imports
import GridPost from '../../components/GridPost/GridPost';
import SubredditSideBar from '../../components/SubredditSideBar/SubredditSideBar';
import SubmitPage from '../SubmitPage/SubmitPage';
import Confetti from 'react-confetti';
// CSS Imports
import './individualPost.scss';

export interface individualPostProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    currentSub: Subreddit | undefined,
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    addedConfetti: boolean,
    setAddedConfetti: any,
    setCurrentPost: any,
    loginStatus: boolean,
    setLoginModalState: any,
    submitPage: boolean,
    loginModalState: string,
    currentEditedComment: string,
    posts: Post[],
    currentPost: Post | undefined,
    communityTheme: boolean,
    communityOptions : boolean,
    mainComment: string,
    writeComment: any,
    writeNestedComment: any,
    editComment: any,
    editNestedComment: any,
    setCurrentSub: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    setSort: React.MouseEventHandler;
    handleSubMembership: MouseEventHandler,
    handleNavigate: MouseEventHandler,
    handleLike: MouseEventHandler,
    navToUserProfile: MouseEventHandler,
    navToSubmit: MouseEventHandler,
    openPost: MouseEventHandler,
    navToProfile: MouseEventHandler,
    submitNestedComment: MouseEventHandler
    expandRule: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    switchCommunityTheme: MouseEventHandler,
    submitComment: MouseEventHandler,
    closePost: MouseEventHandler,
    switchCommunityOptions: MouseEventHandler,
    savePost: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    standardTheme: {
      buttonColor: string,
      headerColor: string,
      banner: string
    }
}

export default function IndividualPost (props: individualPostProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    currentSub,
    subreddits,
    addedConfetti,
    topSubreddits,
    currentEditedComment,
    mainComment,
    submitPage,
    writeComment,
    writeNestedComment,
    editComment,
    editNestedComment,
    setAddedConfetti,
    setCurrentPost,
    setCurrentSub,
    communityOptions,
    communityTheme,
    standardTheme,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts,
    currentPost,
    setSort,
    setIndex,
    navToProfile,
    savePost,
    submitNestedComment,
    handleSubMembership,
    navToUserProfile,
    handleNestedComment,
    closePost,
    handleNavigate,
    submitComment,
    handleLike,
    navToSubmit,
    openPost,
    expandRule,
    switchCommunityOptions,
    handleLikeComment,
    switchCommunityTheme,
  } = props;

  // declare variable to use useLocation hook with
  const location = useLocation();

  // cover deep linking
  if (currentPost === undefined) {
    let numberArray = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ];
    let eventualPostId = location.pathname.substring(location.pathname.length - 2);
    let firstNum = eventualPostId.substring(0, 1);
    let firstNumToInt = parseInt(firstNum);
    if (numberArray.includes(firstNumToInt)) {
      setCurrentPost(posts[parseInt(eventualPostId)]);
      let currentPost = posts[parseInt(eventualPostId)];
      let subreddit = currentPost.subreddit;
      let subredditId = subreddits.findIndex(sub => sub.title === subreddit);
      setCurrentSub(subreddits[subredditId]);
    } else {
      setCurrentPost(posts[parseInt(eventualPostId.substring(1))]);
      let currentPost = posts[parseInt(eventualPostId.substring(1))];
      let subreddit = currentPost.subreddit;
      let subredditId = subreddits.findIndex(sub => sub.title === subreddit);
      setCurrentSub(subreddits[subredditId]);
    }
  }

  // Local state
  const [confettiRunning, setConfettiRunning] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const width = 1920;
  const height = 1850;

  // Render confetti component if first render of first custom user post
  useEffect(() => {
    if (currentPost?.id === "86") {
      setConfettiRunning(true);
      let turnOff = setTimeout((e) => setConfettiRunning(false), 6000);
      let opacityStep1 = setTimeout((e) => setOpacity(0.8), 3750);
      let opacityStep2 = setTimeout((e) => setOpacity(0.6), 4250);
      let opacityStep3 = setTimeout((e) => setOpacity(0.5), 4750);
      let opacityStep4 = setTimeout((e) => setOpacity(0.4), 5250);
      let opacityStep5 = setTimeout((e) => setOpacity(0.2), 5750);
      let opacityStep6 = setTimeout((e) => setOpacity(0.1), 5950);
      let finishAnimation = setTimeout((e) => setAddedConfetti(true), 6000);
    }
  }, []);

  return (
    <div className="post-page" style={{ backgroundColor: currentSub?.backgroundColor === "#edeff1" ? "#2e2f2f" : currentSub?.backgroundColor }}>
      {confettiRunning && !addedConfetti && <Confetti 
                            width={width} 
                            height={height}
                            numberOfPieces={600}
                            opacity={opacity} />}


      <div className="pageHeader">
        <div className="leftHeader">
          <img alt="post" className="postIcon" src={require("../../resources/images/post.png")} />
          <h3>{currentPost!.title!.length >= 95 ? currentPost?.title!.substring(0, 95) + " (...)" : currentPost?.title}</h3>
          {currentPost?.flair.title !== "none" && <button className="flairBtn" style={{ backgroundColor: currentPost?.flair!.color }}>{currentPost?.flair!.title}</button>}
        </div>

        <div className="rightHeader" onClick={closePost}>
          <img alt="cross" className="cross" src={require("../../resources/images/cross.png")} />
          <h3>Close</h3>
        </div>
      </div>

      <div className="postContent" style={{ backgroundColor: "#dae0e6" }}>
        <div className="left">
         <GridPost 
            post={currentPost}
            posts={posts}
            currentSub={currentSub} 
            currentPost={currentPost}
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
          />
        </div>

        <div className="right">
          <SubredditSideBar
            communityTheme={communityTheme}
            currentSub={currentSub}
            standardTheme={standardTheme}
            loginStatus={loginStatus}
            randomIntToString={randomIntToString}
            navToSubmit={navToSubmit}
            switchCommunityTheme={switchCommunityTheme}
            expandRule={expandRule}
            userName={userName}
            switchCommunityOptions={switchCommunityOptions}
            communityOptions={communityOptions}
            currentPost={currentPost}
            handleNavigate={handleNavigate}
            submitPage={submitPage}
            navToProfile={navToProfile}
          />
        </div>
      </div>
    </div>
  );
}
