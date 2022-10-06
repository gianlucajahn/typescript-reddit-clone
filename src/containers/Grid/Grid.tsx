import React, { MouseEventHandler } from 'react';
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
    posts: Post[],
    handleNavigate: MouseEventHandler
}

export default function Grid (props: GridProps) {
  const {
    currentSub,
    currentSort,
    loginModalState,
    posts,
    handleNavigate
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
                 handleNavigate={handleNavigate}
                />
      })}

      {currentSub === undefined && currentSort === "new" && newOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                 handleNavigate={handleNavigate}
                />
      })}

      {currentSub === undefined && currentSort === "top" && topOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                 handleNavigate={handleNavigate}
                />
      })}

      {currentSub === undefined && currentSort === "hot" && hotOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                 handleNavigate={handleNavigate}
                />
      })}

      {currentSub !== undefined && postArray.map((post, i) => {
        if (post.subreddit !== currentSub.title) {
          return;
        }

        return <GridPost 
                 post={postArray[i]}
                 currentSub={currentSub} 
                 handleNavigate={handleNavigate}
                />
      })}
    </div>
  );
}
