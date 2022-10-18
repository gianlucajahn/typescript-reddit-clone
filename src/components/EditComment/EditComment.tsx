import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Comment, Subreddit } from '../../types/types';
import './EditComment.scss';

export interface EditCommentProps {
    comment: any,
    targetedComment?: Comment | undefined,
    index?: number,
    writeComment: any,
    currentEditedComment?: string,
    currentSub: Subreddit | undefined,
    nested: boolean,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    writeNestedComment?: any,
    submitNestedComment?: MouseEventHandler,
    submitComment: MouseEventHandler,
}

export default function EditComment  (props: EditCommentProps) {
  const {
    comment,
    targetedComment,
    index,
    currentEditedComment,
    writeComment,
    nested,
    currentSub,
    setIndex,
    writeNestedComment,
    submitNestedComment,
    submitComment
  } = props;

  useEffect(() => {
    if (index !== undefined) {
      setIndex(index);
    }
  }, [index])

  const [focussed, setFocussed] = useState(false);

  return (
    <div className="hoverArea" style={{ marginTop: nested ? "18px" : "5px", marginLeft: nested ? "20px" : "", width: nested ? "608px" : "652px", minWidth: nested ? "608px" : "652px", border: focussed ? "1px solid black" : "1px solid transparent" }}>
      <textarea id={index?.toString()} className="comment-box" style={{ height: nested ? "130px" : "139px", minHeight: nested ? "130px" : "139px" , width: nested ? "608px" : "652px", minWidth: nested ? "608px" : "652px", maxWidth: nested ? "608px" : "652px", color: nested ? currentEditedComment!.length >= 1 ? "#060606" : "#878a8c" : comment.length >= 1 ? "#060606" : "#878a8c" }} placeholder="What are your thoughts?" value={nested ? currentEditedComment : comment} onChange={nested ? writeNestedComment : writeComment} onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}></textarea>

      <div className="button-bar">
        <button className="text-settings" aria-label="Bold">
          <img className="setting-icon" src={require("../../resources/images/bold.png")} />
        </button>
        <button className="text-settings" aria-label="Italic">
          <img className="setting-icon" src={require("../../resources/images/italic.png")} />
        </button>
        <button className="text-settings" aria-label="Link">
          <img className="setting-icon" src={require("../../resources/images/clip.png")} />
        </button>
        <button className="text-settings" aria-label="Striked">
          <img className="setting-icon" src={require("../../resources/images/strikethrough.png")} />
        </button>
        <button className="text-settings" aria-label="Inline Code">
          <img className="setting-icon" src={require("../../resources/images/inline.png")} />
        </button>
        <button className="text-settings" aria-label="Superscript">
          <img className="setting-icon" src={require("../../resources/images/superscript.png")} />
        </button>
        <button className="text-settings spoiler" aria-label="Spoiler">
          <img className="setting-icon" src={require("../../resources/images/spoiler.png")} />
        </button>
  
        <div className="line"></div>
  
        <button className="text-settings" aria-label="Heading">
          <img className="setting-icon" src={require("../../resources/images/heading.png")} />
        </button>
        <button className="text-settings" aria-label="Bulleted">
          <img className="setting-icon" src={require("../../resources/images/bulleted.png")} />
        </button>
        <button className="text-settings" aria-label="Numbered"> 
          <img className="setting-icon" src={require("../../resources/images/numbered.png")} />
        </button>
        <button className="text-settings" aria-label="Quote Block">
          <img className="setting-icon" src={require("../../resources/images/quote.png")} />
        </button>
        <button className="text-settings" aria-label="More">
          <img className="setting-icon" src={require("../../resources/images/dots.png")} />
        </button>
  
        <button className="markdown" id="markdown">
          <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
        </button>
  
        <button className="markdown submit" style={{ backgroundColor: comment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a", color: comment.length >= 1 ? "white" : "#cdcdcd", cursor: comment.length >= 1 ? "pointer" : "not-allowed" }} onClick={submitComment}>
          <p>Comment</p>
        </button>
      </div>
    </div>
  );
}
