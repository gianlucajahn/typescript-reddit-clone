import React, { MouseEventHandler, SetStateAction, Dispatch } from 'react';
import GridPost from '../../components/GridPost/GridPost';
import { Post, Subreddit } from '../../types/types';
import bestOrder from '../../utils/bestOrder';
import hotOrder from '../../utils/hotOrder';
import newOrder from '../../utils/newOrder';
import postArray from '../../utils/postArray';
import topOrder from '../../utils/topOrder';
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
    setIndex: Dispatch<SetStateAction<number | undefined>>
    writeNestedComment: any,
    editComment: any,
    renderNum?: number,
    navToProfile: MouseEventHandler,
    editNestedComment: any,
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
    navToProfile,
    posts,
    renderNum,
    loginStatus,
    mainComment,
    writeComment,
    setIndex,
    writeNestedComment,
    editComment,
    editNestedComment,
    randomIntToString,
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
    </div>
  );
}
