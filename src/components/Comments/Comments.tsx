import { AnyNaptrRecord } from 'dns';
import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Post, Subreddit, Comment } from '../../types/types';
import './Comments.scss';
import { ReactComponent as Dropdown } from "../../resources/images/dropdown.svg";
import EditComment from '../EditComment/EditComment';

export interface CommentsProps {
  userName: string,
  currentSub: Subreddit | undefined,
  comment: string,
  writeComment: any,
  currentEditedComment: string,
  currentPost: Post,
  loginStatus: boolean,
  setIndex: Dispatch<SetStateAction<number | undefined>>,
  writeNestedComment: any,
  submitNestedComment: MouseEventHandler,
  submitComment: MouseEventHandler,
  handleLikeComment: MouseEventHandler,
  handleNestedComment: MouseEventHandler
}

export default function Comments (props: CommentsProps) {
  const {
    userName,
    currentSub,
    comment,
    writeComment,
    currentEditedComment,
    currentPost,
    loginStatus,
    setIndex,
    writeNestedComment,
    submitNestedComment,
    submitComment,
    handleLikeComment,
    handleNestedComment
  } = props;

  const [focussed, setFocussed] = useState(false);
  const [hovered, setHovered] = useState({
    upvote: false,
    downvote: false
  });

  const [hoveredComments, setHoveredComments] = useState([
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    }
  ])

  const basicCommentHoverState = [
    {
      upvote: false,
      downvote: false,
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    },
    {
      upvote: false,
      downvote: false
    }
  ];

  useEffect(() => {
    setHoveredComments(basicCommentHoverState);
  }, [loginStatus])

  const handleHoverComment = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const idString = target.classList[0];
    const id = parseInt(idString);
    if (target.id === "upvote") {
        const newHoverState = {
            upvote: !hoveredComments[id].upvote,
            downvote: hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    } else if (target.id === "downvote") {
        const newHoverState = {
          upvote: hoveredComments[id].upvote,
          downvote: !hoveredComments[id].downvote
        };
        const newHoveredArray = [...hoveredComments];
        const exchange = newHoveredArray.map((state, i) => {
          if (i === id) {
            state = newHoverState;
            return state;
          } else {
            return state;
          }
        });
        setHoveredComments(exchange);
    }
  }

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3 className="submit-header">Comment as <span style={{ color: currentSub?.buttonColor }}>{userName !== "" ? userName : "User"}</span></h3>

          <EditComment 
            comment={comment}
            writeComment={writeComment}
            submitComment={submitComment}
            currentSub={currentSub}
            nested={false}
            setIndex={setIndex}
          />
        </div>

        <div className="comment-list">
          <div className="sorter">
            <h3 style={{ color: currentSub?.buttonColor }}>Sort By: Best</h3>
            <Dropdown 
              fill={currentSub?.buttonColor}
              className="dropdown"
            />
          </div>

          <div className="divider"></div>

          {currentPost.comments.map((comment, i) => {
            return <div className="comment" id={`${i}`}>
              <div className="comment-header">
                <img className="comment-avatar" src={require("../../resources/images/avatar3.PNG")} />
                <h4 className="comment-author">{comment.author}</h4>
                <h4 className="comment-timestamp">· {comment.time}</h4>
              </div>
              <div className="comment-content-container">
                    <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                    <div className="right">
                      <p id="content">{comment.content}</p>
                      <div className="comment-footer">
                          <button className={`${i}`} onMouseEnter={handleHoverComment} onMouseLeave={handleHoverComment} onClick={handleLikeComment} id="upvote">
                            <img className="upvote" src={require(`../../resources/images/${comment.vote === 0 || comment.vote === -1 ? 
                                                                                           hoveredComments[i].upvote ? "upvoteHover.png" : "upvote.png" 
                                                                                           : "upvoted.png"}`)} 
                            />
                          </button>
        
                          <h3 className="votes">{comment.upvotes}</h3>
        
                          <button className={`${i}`} onMouseEnter={handleHoverComment} onMouseLeave={handleHoverComment} onClick={handleLikeComment} id="downvote">
                            <img className="downvote" src={require(`../../resources/images/${comment.vote === 0 || comment.vote === 1 ?
                                                                                            hoveredComments[i].downvote ? "downvoteHover.png" : "downvote.png"  
                                                                                            : "downvoted.png"}`)} 
                            />
                          </button>

                          {comment.nested_comments.length < 1 && <div className="reply comment-footer-box" id={`${i}`} onClick={handleNestedComment}>
                            <img className="reply-icon" src={require("../../resources/images/comments.png")} />
                            <h3>Reply</h3>
                          </div>}

                          <div className="comment-footer-box">
                            <h3>Give Award</h3>
                          </div>

                          <div className="comment-footer-box">
                            <h3>Share</h3>
                          </div>

                          <div className="comment-footer-box">
                            <h3>Report</h3>
                          </div>

                          <div className="comment-footer-box">
                            <h3>Save</h3>
                          </div>

                          <div className="comment-footer-box">
                            <h3>Follow</h3>
                          </div>
                      </div>
                    </div>
              </div>

              {comment.nesting === "edit" && 
              <div className="nestedComment">
                <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <div className="comment-line second-row-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <EditComment 
                  comment={comment}
                  index={i}
                  targetedComment={currentPost.comments[i].nested_comments[0]}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={true}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  handleNestedComment={handleNestedComment}
                />
              </div>
              }
              {comment.nesting === "posted" && <h3>Posted</h3>}
            </div>
          })}
        </div>
    </div>
  );
}
