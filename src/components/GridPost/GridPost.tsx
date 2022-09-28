import React from 'react';
import { Subreddit } from '../../types/types';
import './GridPost.scss';

export interface GridPostProps {
    post: any,
    currentSub: Subreddit | undefined
}

export default function GridPost (props: GridPostProps) {
  const {
    post,
    currentSub
  } = props;

  return (
    <div className="gridPost">
        <div className="left">
            <button className="upvote-btn">
                <img className="upvote" src={require(`../../resources/images/${post.vote === 0 || post.vote === -1 ? "upvote.png" : "upvoted.png"}`)} />
            </button>

            <h3 className="votes">{post.upvotes}</h3>

            <button className="downvote-btn">
                <img className="downvote" src={require(`../../resources/images/${post.vote === 0 || post.vote === 1 ? "downvote.png" : "downvoted.png"}`)} />
            </button>
        </div>
        <div className="right">
            <div className="header">
                <img className="subIcon" src={require(`../../resources/images/Communities/${post.subreddit}/icon.png`)} />
                <h5 className="subName">r/{post.subreddit}</h5>
                <h5 className="author">· Posted by u/{post.author}</h5>
                <h5 className="creationDate">· {post.time}</h5>
                <div className="awards">
                    {post.awards.map((award: string, i: number) => {
                        return <img className="award" src={require(`../../resources/images/${award}.png`)} />
                    })}
                </div>
            </div>
        </div>
    </div>
  );
}
