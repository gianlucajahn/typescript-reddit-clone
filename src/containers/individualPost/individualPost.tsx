import React, { MouseEventHandler } from 'react';
import { Subreddits, Subreddit, Post } from '../../types/types';
import { ReactComponent as Cross } from "../../resources/images/cross.svg";
import './individualPost.scss';

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
    loginStatus: boolean,
    setLoginModalState: any,
    loginModalState: string,
    posts: Post[],
    currentPost: Post | undefined,
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
    handleSubMembership,
    handleNavigate,
    handleLike,
    navToSubmit,
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
          <h3>{currentPost?.title}</h3>
          <button className="flairBtn" style={{ backgroundColor: currentPost?.flair.color }}>{currentPost?.flair.title}</button>
        </div>

        <div className="rightHeader">
          <img className="cross" src={require("../../resources/images/cross.png")} />
          <h3>Close</h3>
        </div>
      </div>

      <div className="postContent" style={{ backgroundColor: "#dae0e6" }}>
        <div className="left">

        </div>

        <div className="right">

        </div>
      </div>
    </div>
  );
}
