// Imports
import React, { MouseEventHandler, Dispatch, SetStateAction, useState } from 'react';
// Hook Imports
import { useLocation } from 'react-router-dom';
// Type Imports
import { Comment, Post, Subreddit } from '../../types/types';
// Component Imports
import EditComment from '../EditComment/EditComment';
// CSS Imports
import './PostedComment.scss';

export interface PostedCommentProps {
    index: number,
    hoveredComments?: any,
    commentObj: Comment,
    userName: string,
    randomIntToString: string,
    noFurtherNesting?: boolean,
    mainComment: string,
    targetedComment: Comment,
    writeComment: any,
    boxId?: number | undefined,
    setBoxId?: any,
    editComment: any,
    currentEditedComment: string,
    writeNestedComment: any,
    editNestedComment: any,
    currentSub: Subreddit | undefined,
    currentPost: Post,
    nested: boolean,
    navToProfile: MouseEventHandler | undefined,
    navToUserProfile: MouseEventHandler | undefined,
    submitComment: MouseEventHandler,
    handleHoverComment?: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    submitNestedComment: MouseEventHandler,
}

export default function PostedComment (props: PostedCommentProps) {
  const {
    index,
    hoveredComments,
    mainComment,
    boxId,
    randomIntToString,
    setBoxId,
    userName,
    noFurtherNesting,
    commentObj,
    targetedComment,
    currentPost,
    writeComment,
    currentSub,
    nested,
    writeNestedComment,
    editComment,
    editNestedComment,
    currentEditedComment,
    navToProfile,
    navToUserProfile,
    submitComment,
    setIndex,
    submitNestedComment,
    handleHoverComment,
    handleLikeComment,
    handleNestedComment,
  } = props;

  // Declare location variable to use useLocation() hook with
  const location = useLocation();

  // Local state
  const [hover, setHover] = useState({
    upvote: false,
    downvote: false
  })
  const [edited, setEdited] = useState(false);
  const [nestedEdited, setNestedEdited] = useState(false);

  // Switch from PostedComment component to EditComment component
  const switchEdit = (e: React.MouseEvent) => {
    setEdited(!edited);
  }

  // Switch from PostedComment component to EditComment component on nested comments
  const switchNestedEdit = (e: React.MouseEvent) => {
    if (userName === "") {
        return;
    }
    setNestedEdited(!nestedEdited);
  }

  // Hover event handler for upvote/downvote buttons in posted comments
  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === "upvote") {
        setHover({
            upvote: !hover.upvote,
            downvote: hover.downvote
        });
    } else if (target.id === "downvote") {
        setHover({
            upvote: hover.upvote,
            downvote: !hover.downvote
        });
    }
  }

  return (
    <div className="comment" id={`${index}`} style={{ marginLeft: nested ? "10px" : "", marginTop: nested ? "12px" : "", marginBottom: nested ? "10px" : "20px" }}>
        {(nested && commentObj.nested_comments.length !== 0) && <div className="comment-header">
            <img alt="avatar" className="comment-avatar" src={nested ? commentObj.nested_comments[0].author === "Nikola Tesla" ? require("../../resources/images/avatartesla.PNG") : require(`../../resources/images/avatar${randomIntToString}.PNG`) : userName === "Nikola Tesla" ? require("../../resources/images/avatartesla.PNG") : commentObj.author === userName ? require(`../../resources/images/avatar${randomIntToString}.PNG`) : require(`../../resources/images/base_variants/default${commentObj.avatar}.png`)} />
            <h4 className="comment-author" id={nested ? commentObj.nested_comments[0].author : commentObj.author} onClick={nested ? navToProfile : userName === commentObj.author ? navToProfile : navToUserProfile}>{nested ? commentObj.nested_comments[0].author : commentObj.author}</h4>
            <h4 className="comment-timestamp">· {nested ? commentObj.nested_comments[0].time : commentObj.time}</h4>
        </div>}

        {(!nested && !edited) && <div className="comment-header">
            <img alt="avatar" className="comment-avatar" src={nested ? commentObj.author === "Nikola Tesla" ? require("../../resources/images/avatartesla.PNG") : require(`../../resources/images/avatar${randomIntToString}.PNG`) : commentObj.author === "Nikola Tesla" ? require("../../resources/images/avatartesla.PNG") : commentObj.author === userName ? require(`../../resources/images/avatar${randomIntToString}.PNG`) : require(`../../resources/images/base_variants/default${commentObj.avatar}.png`)} />
            <h4 className="comment-author" id={nested ? commentObj.nested_comments[0].author : commentObj.author} onClick={nested ? navToProfile : userName === commentObj.author ? navToProfile : navToUserProfile}>{nested ? commentObj.nested_comments[0].author : commentObj.author}</h4>
            <h4 className="comment-timestamp">· {nested ? commentObj.nested_comments[0].time : commentObj.time}</h4>
        </div>}

        <div className="comment-content-container">
            <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1", height: commentObj.nested_lvl === 0 ? "100%" : "80%" }}></div>
            {!edited && !nested || nested && commentObj.nested_comments.length !== 0 ? <div className="right">
                <p id="content">{nested ? commentObj.nested_comments[0].content : commentObj.content}</p>
                <div className="comment-footer">
                    <button className={nested ? `${index} nested` : `${index}`} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleLikeComment} id="upvote">
                        <img alt="upvote" className="upvote" src={require(`../../resources/images/${nested ? commentObj.nested_comments[0].vote === 0 || commentObj.nested_comments[0].vote === -1 ? hover.upvote ? "upvoteHover.png" : "upvote.png" : "upvoted.png" : commentObj.vote === 0 || commentObj.vote === -1 ?
                                                                                           hover.upvote ? "upvoteHover.png" : "upvote.png" 
                                                                                           : "upvoted.png"}`)} 
                        />
                    </button>
                    <h3 className="votes">{nested ? commentObj.nested_comments[0].upvotes : commentObj.upvotes}</h3>
                    <button className={nested ? `${index} nested` : `${index}`} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleLikeComment} id="downvote">
                        <img alt="downvote" className="downvote" src={require(`../../resources/images/${nested ? commentObj.nested_comments[0].vote === 0 || commentObj.nested_comments[0].vote === 1 ? hover.downvote ? "downvoteHover.png" : "downvote.png" : "downvoted.png" : commentObj.vote === 0 || commentObj.vote === 1 ?
                                                                                            hover.downvote ? "downvoteHover.png" : "downvote.png"  
                                                                                            : "downvoted.png"}`)} 
                        />
                    </button>

                    {nested && commentObj.nested_comments[0].author === userName && location.pathname.includes("user") === false && <div className="edit comment-footer-box" id={`${index}`} onClick={(e) => { handleNestedComment(e); switchNestedEdit(e);}}>
                        <img alt="edit" className="edit-icon" src={require("../../resources/images/pencil.png")} />
                        <h3>Edit</h3>
                    </div>}

                    {nested === false && commentObj.author === userName && location.pathname.includes("user") === false && <div className="edit comment-footer-box" id={`${index}`} onClick={switchEdit}>
                        <img alt="edit" className="edit-icon" src={require("../../resources/images/pencil.png")} />
                        <h3>Edit</h3>
                    </div>}

                    {commentObj.nesting === "none" && location.pathname.includes("user") === false && <div className="reply comment-footer-box" id={`${index}`} onClick={(e) => { handleNestedComment(e); switchNestedEdit(e);}}>
                        <img alt="reply" className="reply-icon" src={require("../../resources/images/comments.png")} />
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
            </div> :
            <EditComment 
              mainComment={mainComment}
              index={index}
              edited={edited}
              commentObj={commentObj}
              nestedEdited={nestedEdited}
              targetedComment={targetedComment}
              writeComment={writeComment}
              submitComment={submitComment}
              currentSub={currentSub}
              nested={false}
              switchNestedEdit={switchNestedEdit}
              setIndex={setIndex}
              switchEdit={switchEdit}
              writeNestedComment={writeNestedComment}
              submitNestedComment={submitNestedComment}
              currentEditedComment={currentEditedComment}
              handleNestedComment={handleNestedComment}
              editComment={editComment}
              editNestedComment={editNestedComment}
              boxId={boxId}
              setBoxId={setBoxId}
              randomIntToString={randomIntToString}
            />}
        </div>

        {commentObj.nesting === "edit" && 
            <div className="nestedComment">
                <div 
                  className="comment-line" 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} 
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} 
                  style={{ backgroundColor: "#edeff1" }}>
                </div>
                <div className="comment-line second-row-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <EditComment 
                  mainComment={mainComment}
                  index={index}
                  edited={true}
                  nestedEdited={nestedEdited}
                  commentObj={commentObj}
                  targetedComment={targetedComment}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  switchNestedEdit={switchNestedEdit}
                  currentSub={currentSub}
                  nested={true}
                  setIndex={setIndex}
                  switchEdit={switchEdit}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  handleNestedComment={handleNestedComment}
                  editComment={editComment}
                  editNestedComment={editNestedComment}
                  boxId={boxId}
                  setBoxId={setBoxId}
                  randomIntToString={randomIntToString}
                />
            </div>}

        {commentObj.nesting === "posted" && noFurtherNesting === undefined &&
            <div className="nestedComment">
                <div 
                  className="comment-line" 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} 
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} 
                  style={{ backgroundColor: "#edeff1", height: "inherit", width: "2px" }}>
                </div>
                <PostedComment
                     index={index}
                     navToProfile={navToProfile}
                     navToUserProfile={navToUserProfile}
                     noFurtherNesting={true}
                     userName={userName}
                     mainComment={mainComment}
                     currentPost={currentPost}
                     handleHoverComment={handleHoverComment}
                     handleLikeComment={handleLikeComment}
                     handleNestedComment={handleNestedComment}
                     hoveredComments={hoveredComments}
                     commentObj={commentObj}
                     targetedComment={currentPost.comments[index].nested_comments[0]}
                     writeComment={writeComment}
                     submitComment={submitComment}
                     currentSub={currentSub}
                     nested={true}
                     setIndex={setIndex}
                     writeNestedComment={writeNestedComment}
                     submitNestedComment={submitNestedComment}
                     currentEditedComment={currentEditedComment}
                     editComment={editComment}
                     editNestedComment={editNestedComment}
                     randomIntToString={randomIntToString}
                />
            </div>
        }
    </div>
  );
}
