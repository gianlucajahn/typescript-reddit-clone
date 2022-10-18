import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePost from '../../components/CreatePost/CreatePost';
import SubredditHeadline from '../../components/SubredditHeadline/SubredditHeadline';
import Grid from '../Grid/Grid';
import { Subreddits, Subreddit, Post } from '../../types/types';
import './SubredditPage.scss';
import SortBar from '../../components/SortBar/SortBar';
import Imprint from '../../components/Imprint/Imprint';
import { ReactComponent as Pen } from "../../resources/images/pen.svg";
import { resourceLimits } from 'worker_threads';
import SubredditSideBar from '../../components/SubredditSideBar/SubredditSideBar';

export interface SubredditPageProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    setSort: React.MouseEventHandler;
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    handleSubMembership: React.MouseEventHandler,
    handleNavigate: MouseEventHandler<HTMLDivElement>,
    navToSubmit: MouseEventHandler,
    openPost: MouseEventHandler,
    handleLike: MouseEventHandler,
    loginStatus: boolean,
    setLoginModalState: any,
    identifyCurrentSub: any,
    currentSub: Subreddit | undefined,
    selectAnchor: React.MouseEventHandler,
    currentAnchor: number | undefined,
    expandRule: MouseEventHandler,
    loginModalState: string,
    posts: Post[],
    currentPost: Post | undefined,
    communityTheme: boolean,
    currentEditedComment: string,
    communityOptions : boolean,
    comment: string,
    writeComment: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    writeNestedComment: any,
    submitNestedComment: MouseEventHandler
    switchCommunityTheme: MouseEventHandler,
    submitComment: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    switchCommunityOptions: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    standardTheme: {
      buttonColor: string,
      headerColor: string,
      banner: string
    }
}

export default function SubredditPage (props: SubredditPageProps) {
  const location = useLocation();
  const {
    randomIntToString,
    userName,
    currentEditedComment,
    currentSort,
    currentPost,
    subreddits,
    topSubreddits,
    loginStatus,
    loginModalState,
    setLoginModalState,
    identifyCurrentSub,
    currentSub,
    posts,
    currentAnchor,
    communityOptions,
    communityTheme,
    standardTheme,
    comment,
    writeComment,
    setIndex,
    writeNestedComment,
    submitNestedComment,
    handleLikeComment,
    handleNestedComment,
    switchCommunityOptions,
    switchCommunityTheme,
    openPost,
    expandRule,
    handleLike,
    setSort,
    handleSubMembership,
    handleNavigate,
    navToSubmit,
    submitComment,
    selectAnchor
  } = props;

  return (
    <div className="subredditPage" style={{ backgroundColor: communityTheme ?  currentSub?.backgroundColor : "#edeff1", height: loginModalState === "closed" ? "" : "100vh", overflow: loginModalState === "closed" ? "scroll" : "hidden" }}>
      <img className="subredditBanner" src={communityTheme ? require(`../../resources/images/Communities/${currentSub?.title}/banner.jpg`) : require(`../../resources/images/Communities/todayilearned/banner.jpg`)} />

      <SubredditHeadline 
        currentSub={currentSub}
        handleSubMembership={handleSubMembership}
        selectAnchor={selectAnchor}
        currentAnchor={currentAnchor}
        standardTheme={standardTheme}
        loginStatus={loginStatus}
        communityTheme={communityTheme}
      />

      <div className="subredditContent">
          <div className="feed">
            <CreatePost 
              randomIntToString={randomIntToString}
              userName={userName}
              navToSubmit={navToSubmit}
              loginStatus={loginStatus}
            />

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
              comment={comment}
              writeComment={writeComment}
              submitComment={submitComment}
              handleLikeComment={handleLikeComment}
              loginStatus={loginStatus}
              handleNestedComment={handleNestedComment}
              setIndex={setIndex}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
            />

          </div>

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
          />
      </div>
    </div>
  );
}
