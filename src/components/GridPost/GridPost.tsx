import React, { MouseEventHandler } from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import { Subreddit } from '../../types/types';
import './GridPost.scss';

export interface GridPostProps {
    post: any,
    currentSub: Subreddit | undefined,
    handleNavigate: MouseEventHandler
}

export default function GridPost (props: GridPostProps) {
  const {
    post,
    currentSub,
    handleNavigate
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
                <img className="subIcon" src={require(`../../resources/images/Communities/${post.subreddit}/icon.png`)} id={post.subreddit} onClick={handleNavigate} />
                <h5 className="subName" id={post.subreddit} onClick={handleNavigate}>r/{post.subreddit}</h5>
                <h5 className="author">· Posted by <span>u/{post.author}</span></h5>
                <h5 className="creationDate">· {post.time}</h5>
                <div className="awards">
                    {post.awards.map((award: string, i: number) => {
                        return <img className="award" src={require(`../../resources/images/${award}.png`)} />
                    })}
                </div>
            </div>

            <div className="headline">
                <h2 className="headline-text">
                    {post.title}
                    {post.flair.title !== "none" ? <button className="flair" style={{ backgroundColor: post.flair.color }}>{post.flair.title}</button> : null}
                </h2>
            </div>

            <div className="content">
                {post.type === "text" ? 
                <p className="src">{post.src}</p> : <img className="src" src={require(`../../resources/images/Communities/${post.subreddit}/${post.id.toString()}.png`)} />}
            </div>

            <div className="footer">
                <div className="comments footer-div">
                    <img className="comments-icon" src={require("../../resources/images/comments.png")} />
                    <h4>{post.comments.length} Comments</h4>
                </div>

                <div className="awards-footer footer-div">
                    <img className="awards-icon" src={require("../../resources/images/awards.png")} />
                    <h4>Award</h4>
                </div>

                <div className="share footer-div">
                    <img className="share-icon" src={require("../../resources/images/share.png")} />
                    <h4>Share</h4>
                </div>

                <div className="save footer-div">
                    <img className="save-icon" src={require("../../resources/images/save.png")} />
                    <h4>Save</h4>
                </div>

                <div className="more footer-div">
                    <img className="more-icon" src={require("../../resources/images/moregrey.png")} />
                </div>
            </div>
        </div>
    </div>
  );
}
