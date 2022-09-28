import React from 'react';
import GridPost from '../../components/GridPost/GridPost';
import { Subreddit } from '../../types/types';
import postArray from '../../utils/postArray';
import './Grid.scss';

export interface GridProps {
    currentSub: Subreddit | undefined,
    loginModalState: string
}

export default function Grid (props: GridProps) {
  const {
    currentSub,
    loginModalState
  } = props;

  return (
    <div className="grid" style={{  }}>
      {currentSub === undefined && postArray.map((post, i) => {
        if (loginModalState !== "closed" && i >= 3) {
            return;
        }

        return <GridPost 
                 post={post}
                 currentSub={currentSub} 
                />
      })}
    </div>
  );
}
