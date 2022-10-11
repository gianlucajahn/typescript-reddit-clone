import React, { MouseEventHandler } from 'react';
import './Home.scss';
import CreatePost from '../../components/CreatePost/CreatePost';
import SortBar from '../../components/SortBar/SortBar';
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar';
import { Post, Subreddit, Subreddits } from '../../types/types';
import Grid from '../Grid/Grid';

export interface HomeProps {
  randomIntToString: string,
  userName: string,
  currentSort: string,
  currentSub: Subreddit | undefined,
  setSort: React.MouseEventHandler;
  subreddits: Subreddits,
  topSubreddits: Subreddits,
  handleSubMembership: React.MouseEventHandler,
  handleNavigate: MouseEventHandler,
  handleLike: MouseEventHandler,
  navToSubmit: MouseEventHandler,
  openPost: MouseEventHandler,
  loginStatus: boolean,
  setLoginModalState: any,
  loginModalState: string,
  posts: Post[],
  currentPost: Post | undefined
}

export default function Home (props: HomeProps) {
  const {
    randomIntToString,
    userName,
    currentSort,
    currentSub,
    currentPost,
    setSort,
    subreddits,
    topSubreddits,
    openPost,
    handleSubMembership,
    handleLike,
    handleNavigate,
    navToSubmit,
    loginStatus,
    setLoginModalState,
    loginModalState,
    posts
  } = props;

  return (
    <div className="home" style={{ maxHeight: loginModalState === "closed" ? "" : "92.75vh", overflow: loginModalState === "closed" ? "" : "hidden" }}>
      <div className="feed" style={{ overflow: "hidden" }}>
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
          loginModalState={loginModalState}
        />
      </div>
    </div>
  );
}


