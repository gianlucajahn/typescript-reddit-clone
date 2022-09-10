import * as React from 'react';
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
  handleSubMembership: React.MouseEventHandler
}

export default function Home (props: HomeProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    setSort,
    subreddits,
    topSubreddits,
    handleSubMembership
  } = props;

  return (
    <div className="home">
      <div className="feed">
        <CreatePost 
          randomIntToString={randomIntToString}
          userName={userName} />
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
        />
      </div>
    </div>
  );
}


