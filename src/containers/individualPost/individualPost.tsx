import React, { MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { Subreddits, Subreddit, Post } from '../../types/types';
import { ReactComponent as Cross } from "../../resources/images/cross.svg";
import './individualPost.scss';
import GridPost from '../../components/GridPost/GridPost';
import SubredditSideBar from '../../components/SubredditSideBar/SubredditSideBar';

export interface individualPostProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    currentSub: Subreddit | undefined,
    setSort: React.MouseEventHandler;
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    handleSubMembership: MouseEventHandler,
    handleNavigate: MouseEventHandler,
    handleLike: MouseEventHandler,
    navToSubmit: MouseEventHandler,
    openPost: MouseEventHandler,
    loginStatus: boolean,
    setLoginModalState: any,
    loginModalState: string,
    currentEditedComment: string,
    posts: Post[],
    currentPost: Post | undefined,
    communityTheme: boolean,
    communityOptions : boolean,
    comment: string,
    writeComment: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    writeNestedComment: any,
    submitNestedComment: MouseEventHandler
    expandRule: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    switchCommunityTheme: MouseEventHandler,
    submitComment: MouseEventHandler,
    closePost: MouseEventHandler,
    switchCommunityOptions: MouseEventHandler,
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
    setSort,
    subreddits,
    topSubreddits,
    currentEditedComment,
    comment,
    writeComment,
    setIndex,
    writeNestedComment,
    submitNestedComment,
    handleSubMembership,
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
    communityOptions,
    communityTheme,
    standardTheme,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts,
    currentPost
  } = props;

  return (
    <div className="post-page" style={{ backgroundColor: currentSub?.backgroundColor }}>
      <div className="pageHeader">
        <div className="leftHeader">
          <img className="postIcon" src={require("../../resources/images/post.png")} />
          <h3>{currentPost!.title!.length >= 95 ? currentPost?.title!.substring(0, 95) + " (...)" : currentPost?.title}</h3>
          <button className="flairBtn" style={{ backgroundColor: currentPost?.flair!.color }}>{currentPost?.flair!.title}</button>
        </div>

        <div className="rightHeader" onClick={closePost}>
          <img className="cross" src={require("../../resources/images/cross.png")} />
          <h3>Close</h3>
        </div>
      </div>

      <div className="postContent" style={{ backgroundColor: "#dae0e6" }}>
        <div className="left">
         <GridPost 
            post={currentPost}
            currentSub={currentSub} 
            currentPost={currentPost}
            handleNavigate={handleNavigate}
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
          />
        </div>
      </div>
    </div>
  );
}
