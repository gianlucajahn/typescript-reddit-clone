import React from 'react';
import GridPost from '../../components/GridPost/GridPost';
import { Subreddit } from '../../types/types';
import postArray from '../../utils/postArray';
import './Grid.scss';

export interface GridProps {
    currentSub: Subreddit | undefined
}

export default function Grid (props: GridProps) {
  const {
    currentSub
  } = props;

  return (
    <div className="grid">
      {currentSub === undefined && postArray.map((post, i) => {
        if (i >= 10) {
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
