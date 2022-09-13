import React, { MouseEventHandler } from 'react';
import { useLocation } from 'react-router-dom';
import SubredditHeadline from '../../components/SubredditHeadline/SubredditHeadline';
import { Subreddits, Subreddit } from '../../types/types';
import './SubredditPage.scss';

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
    loginStatus: boolean,
    setLoginModalState: any,
    identifyCurrentSub: any,
    currentSub: Subreddit | undefined,
}

export default function SubredditPage (props: SubredditPageProps) {
  const location = useLocation();
  const {
    randomIntToString,
    userName,
    currentSort,
    subreddits,
    topSubreddits,
    loginStatus,
    setLoginModalState,
    identifyCurrentSub,
    currentSub,
    setSort,
    handleSubMembership,
    handleNavigate,
    navToSubmit
  } = props;

  return (
    <div className="subredditPage" style={{ backgroundColor: currentSub ? currentSub?.backgroundColor : "#edeff1" }}>
      <img className="subredditBanner" src={require(`../../resources/images/Communities/${currentSub?.title}/banner.jpg`)} />

      <SubredditHeadline 
        currentSub={currentSub}
      />
    </div>
  );
}
