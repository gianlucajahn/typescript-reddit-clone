import React, { MouseEventHandler } from 'react';
import './Home.scss';
import CreatePost from '../../components/CreatePost/CreatePost';
import SortBar from '../../components/SortBar/SortBar';
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar';
import { Subreddits } from '../../types/types';

export interface HomeProps {
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
  setLoginModalState: any
}

export default function Home (props: HomeProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    setSort,
    subreddits,
    topSubreddits,
    handleSubMembership,
    handleNavigate,
    navToSubmit,
    loginStatus,
    setLoginModalState
  } = props;

  return (
    <div className="home">
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

      <div className="info">
        <HomeSideBar 
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
        />
      </div>
    </div>
  );
}


