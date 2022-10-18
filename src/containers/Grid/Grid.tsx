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
    currentEditedComment: string,
    loginStatus: boolean,
    setIndex: Dispatch<SetStateAction<number | undefined>>
    writeNestedComment: any,
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
    loginStatus,
    mainComment,
    writeComment,
    setIndex,
    writeNestedComment,
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

        return <GridPost 
                 post={posts[num + 1]}
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
                />
      })}

      {currentSub === undefined && currentSort === "new" && newOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={posts[num]}
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
                />
      })}

      {currentSub === undefined && currentSort === "top" && topOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={posts[num]}
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
                />
      })}

      {currentSub === undefined && currentSort === "hot" && hotOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={posts[num]}
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
                />
      })}

      {currentSub !== undefined && postArray.map((post, i) => {
        if (post.subreddit !== currentSub.title) {
          return;
        }

        return <GridPost 
                 post={posts[i]}
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
                />
      })}
    </div>
  );
}
