// Imports
import React, { MouseEventHandler, SetStateAction, Dispatch } from 'react';
// Type Imports
import { Post, Subreddit } from '../../types/types';
// Component Imports
import GridPost from '../../components/GridPost/GridPost';
// Utility Imports
import bestOrder from '../../utils/bestOrder';
import hotOrder from '../../utils/hotOrder';
import newOrder from '../../utils/newOrder';
import postArray from '../../utils/postArray';
import topOrder from '../../utils/topOrder';
// CSS Imports
import './Grid.scss';

export interface GridProps {
    currentSub: Subreddit | undefined,
    loginModalState: string,
    currentSort: string,
    currentPost: Post | undefined,
    posts: Post[],
    userName: string,
    mainComment: string,
    writeComment: any,
    randomIntToString: string,
    currentEditedComment: string,
    loginStatus: boolean,
    writeNestedComment: any,
    editComment: any,
    renderNum?: number,
    editNestedComment: any,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    navToProfile: MouseEventHandler,
    navToUserProfile: MouseEventHandler,
    savePost: MouseEventHandler,
    submitNestedComment: MouseEventHandler
    handleNavigate: MouseEventHandler,
    handleLike: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    submitComment: MouseEventHandler,
    openPost: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
}

export default function Grid (props: GridProps) {
  const {
    currentSub,
    currentPost,
    currentSort,
    loginModalState,
    userName,
    currentEditedComment,
    posts,
    renderNum,
    loginStatus,
    mainComment,
    writeComment,
    writeNestedComment,
    editComment,
    editNestedComment,
    randomIntToString,
    setIndex,
    navToProfile,
    navToUserProfile,
    savePost,
    submitNestedComment,
    openPost,
    handleLikeComment,
    handleNestedComment,
    submitComment,
    handleNavigate,
    handleLike
  } = props;

  return (
    <div className="grid">
      {currentSub === undefined && currentSort === "best" && bestOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        if (i > renderNum!) {
          return;
        }

        return <GridPost 
                 post={posts[num + 1]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}

      {currentSub === undefined && currentSort === "new" && newOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        if (i > renderNum!) {
          return;
        }

        return <GridPost 
                 post={posts[num]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}

      {currentSub === undefined && currentSort === "top" && topOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        if (i > renderNum!) {
          return;
        }

        return <GridPost 
                 post={posts[num]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}

      {currentSub === undefined && currentSort === "hot" && hotOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        if (i > renderNum!) {
          return;
        }

        return <GridPost 
                 post={posts[num]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}

      {currentSub !== undefined && postArray.map((post, i) => {
        if (post.subreddit !== currentSub.title) {
          return;
        }

        return <GridPost 
                 post={posts[i]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}

      {currentSub !== undefined && posts.map((post, i) => {
        if (post.subreddit !== currentSub.title) {
          return;
        }

        return <GridPost 
                 post={posts[i]}
                 posts={posts}
                 currentSub={currentSub} 
                 currentPost={currentPost}
                 handleNavigate={handleNavigate}
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
                 navToUserProfile={navToUserProfile}
                 navToProfile={navToProfile}
                />
      })}
    </div>
  );
}
