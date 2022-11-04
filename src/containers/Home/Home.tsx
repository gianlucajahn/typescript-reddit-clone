import React, { MouseEventHandler, Dispatch, SetStateAction, useRef, useEffect, useState } from 'react';
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
  currentEditedComment: string,
  setIndex: Dispatch<SetStateAction<number | undefined>>
  writeNestedComment: any,
  editComment: any,
  editNestedComment: any,
  savePost: MouseEventHandler,
  enablePremium: MouseEventHandler,
  submitNestedComment: MouseEventHandler
  handleSubMembership: React.MouseEventHandler,
  handleNavigate: MouseEventHandler,
  handleLike: MouseEventHandler,
  navToSubmit: MouseEventHandler,
  openPost: MouseEventHandler,
  submitComment: MouseEventHandler,
  handleLikeComment: MouseEventHandler,
  handleNestedComment: MouseEventHandler,
  loginStatus: boolean,
  setLoginModalState: any,
  loginModalState: string,
  posts: Post[],
  currentPost: Post | undefined,
  mainComment: string,
  writeComment: any
}

export default function Home (props: HomeProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [renderNum, setRenderNum] = useState(5);

  const {
    randomIntToString,
    userName,
    currentSort,
    currentSub,
    currentPost,
    mainComment,
    writeComment,
    setSort,
    subreddits,
    topSubreddits,
    setIndex,
    currentEditedComment,
    writeNestedComment,
    editComment,
    enablePremium,
    editNestedComment,
    savePost,
    submitNestedComment,
    handleNestedComment,
    handleLikeComment,
    submitComment,
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

  useEffect(() => {
    if (!ref.current) return

    const cachedRef = ref.current
    const observer = new IntersectionObserver(() => {
      setTimeout(() => setRenderNum((prev) => prev + 2), 750);
    })

    observer.observe(cachedRef)
  }, [ref])

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
          mainComment={mainComment}
          writeComment={writeComment}
          submitComment={submitComment}
          handleLikeComment={handleLikeComment}
          loginStatus={loginStatus}
          handleNestedComment={handleNestedComment}
          setIndex={setIndex}
          writeNestedComment={writeNestedComment}
          submitNestedComment={submitNestedComment}
          currentEditedComment={currentEditedComment}
          editComment={editComment}
          editNestedComment={editNestedComment}
          randomIntToString={randomIntToString}
          savePost={savePost}
          renderNum={renderNum}
        />

        {renderNum <= 85 && <div className="loading" ref={ref}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          Loading more...
        </div>}
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
          enablePremium={enablePremium}
        />
      </div>
    </div>
  );
}


