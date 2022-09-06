import * as React from 'react';
import './Home.scss';
import CreatePost from '../../components/CreatePost/CreatePost';
import SortBar from '../../components/SortBar/SortBar';
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar';

export interface HomeProps {
  randomIntToString: string,
  userName: string,
  currentSort: string,
  setSort: React.MouseEventHandler;
}

export default function Home (props: HomeProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    setSort
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
        <HomeSideBar />
      </div>
    </div>
  );
}


