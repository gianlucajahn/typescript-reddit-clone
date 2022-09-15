import React, { MouseEventHandler } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePost from '../../components/CreatePost/CreatePost';
import SubredditHeadline from '../../components/SubredditHeadline/SubredditHeadline';
import { Subreddits, Subreddit } from '../../types/types';
import './SubredditPage.scss';
import SortBar from '../../components/SortBar/SortBar';
import Imprint from '../../components/Imprint/Imprint';

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
    selectAnchor: React.MouseEventHandler,
    currentAnchor: number | undefined
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
    currentAnchor,
    setSort,
    handleSubMembership,
    handleNavigate,
    navToSubmit,
    selectAnchor
  } = props;

  return (
    <div className="subredditPage" style={{ backgroundColor: currentSub ? currentSub?.backgroundColor : "#edeff1" }}>
      <img className="subredditBanner" src={require(`../../resources/images/Communities/${currentSub?.title}/banner.jpg`)} />

      <SubredditHeadline 
        currentSub={currentSub}
        handleSubMembership={handleSubMembership}
        selectAnchor={selectAnchor}
        currentAnchor={currentAnchor}
      />

      <div className="subredditContent">
          <div className="feed">
            <CreatePost 
              randomIntToString={randomIntToString}
              userName={userName}
              navToSubmit={navToSubmit}
            />

            <SortBar 
              currentSort={currentSort}
              setSort={setSort}
            />
          </div>
          <div className="sidebar">
            <div className="aboutCommunity">
              <div className="head">
                <h3>About Community</h3>
                <img className="more" src={require("../../resources/images/more_white.PNG")} />
              </div>
            </div>

            <Imprint />
          </div>
      </div>
    </div>
  );
}
