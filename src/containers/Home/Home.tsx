// Imports
import React, { MouseEventHandler, Dispatch, SetStateAction, useRef, useEffect, useState } from 'react';
// Component Imports
import CreatePost from '../../components/CreatePost/CreatePost';
import SortBar from '../../components/SortBar/SortBar';
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar';
import Grid from '../Grid/Grid';
// Type imports
import { Post, Subreddit, Subreddits } from '../../types/types';
// Utility Imports
import userArray from '../../utils/userArray';
// CSS Imports
import './Home.scss';

export interface HomeProps {
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
  loginStatus: boolean,
  setLoginModalState: any,
  loginModalState: string,
  posts: Post[],
  currentPost: Post | undefined,
  mainComment: string,
  writeComment: any,
  setRenderNum: Dispatch<SetStateAction<number>>,
  setIndex: Dispatch<SetStateAction<number | undefined>>
  setSort: React.MouseEventHandler;
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
  navToUserProfile: MouseEventHandler,
  navToProfile: MouseEventHandler,
}

export default function Home (props: HomeProps) {
  const ref = useRef<HTMLDivElement | null>(null)

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
    editComment,
    editNestedComment,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts,
    savePost,
    submitNestedComment,
    handleNestedComment,
    handleLikeComment,
    submitComment,
    openPost,
    handleSubMembership,
    handleLike,
    handleNavigate,
    navToSubmit,
    enablePremium,
    setIndex,
    navToUserProfile,
    setSort,
    navToProfile,
    setRenderNum,
  } = props;

  useEffect(() => {
    if (!ref.current) return

    const cachedRef = ref.current
    const observer = new IntersectionObserver(() => {
      setTimeout(() => setRenderNum((prev) => prev + 2), 750);
    })

    observer.observe(cachedRef)
  }, [ref])

  return (
    <div className="home" style={{ maxHeight: loginModalState === "closed" ? "" : "92.75vh", overflow: loginModalState === "closed" ? "" : "hidden" }}>
      <div className="feed" style={{ overflow: "hidden" }}>
        {userArray.findIndex(user => user.username === userName) === -1 && <CreatePost 
          randomIntToString={randomIntToString}
          userName={userName}
          navToSubmit={navToSubmit}
          loginStatus={loginStatus}
        />}
        
        <SortBar 
          currentSort={currentSort}
          setSort={setSort}
        />

        <Grid 
          currentSub={currentSub}
          currentPost={currentPost}
          loginModalState={loginModalState}
          currentSort={currentSort}
          handleNavigate={handleNavigate}
          posts={posts}
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
          renderNum={renderNum}
          navToUserProfile={navToUserProfile}
          navToProfile={navToProfile}
        />

        <div className="loading" ref={ref}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          Loading more...
        </div>
      </div>

      <div className="info">
        <HomeSideBar 
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          loginModalState={loginModalState}
          enablePremium={enablePremium}
        />
      </div>
    </div>
  );
}


