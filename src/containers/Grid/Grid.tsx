import React from 'react';
import GridPost from '../../components/GridPost/GridPost';
import { Subreddit } from '../../types/types';
import bestOrder from '../../utils/bestOrder';
import hotOrder from '../../utils/hotOrder';
import newOrder from '../../utils/newOrder';
import postArray from '../../utils/postArray';
import topOrder from '../../utils/topOrder';
import './Grid.scss';

export interface GridProps {
    currentSub: Subreddit | undefined,
    loginModalState: string,
    currentSort: string
}

export default function Grid (props: GridProps) {
  const {
    currentSub,
    currentSort,
    loginModalState
  } = props;

  return (
    <div className="grid">
      {currentSub === undefined && currentSort === "best" && bestOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num + 1]}
                 currentSub={currentSub} 
                />
      })}

      {currentSub === undefined && currentSort === "new" && newOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                />
      })}

      {currentSub === undefined && currentSort === "top" && topOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                />
      })}

      {currentSub === undefined && currentSort === "hot" && hotOrder.map((num, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={postArray[num]}
                 currentSub={currentSub} 
                />
      })}

      {currentSub !== undefined && postArray.map((post, i) => {
        if (post.subreddit !== currentSub.title) {
          return;
        }

        return <GridPost 
                 post={postArray[i]}
                 currentSub={currentSub} 
                />
      })}
    </div>
  );
}
