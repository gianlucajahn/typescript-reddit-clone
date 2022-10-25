import React, { MouseEventHandler } from 'react';
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
    loginStatus,
    draftAmount,
    handleDraft,
    setLoginModalState,
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

      </div>

      <div className="right">

      </div>
    </div>
  );
}
