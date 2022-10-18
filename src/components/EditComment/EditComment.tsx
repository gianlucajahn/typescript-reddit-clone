import React, { MouseEventHandler, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Comment, Subreddit } from '../../types/types';
import './EditComment.scss';

export interface EditCommentProps {
    mainComment: string,
    targetedComment?: Comment | undefined,
    index?: number,
    writeComment: any,
    currentEditedComment?: string,
    currentSub: Subreddit | undefined,
    nested: boolean,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    writeNestedComment?: any,
    submitNestedComment?: MouseEventHandler,
    handleNestedComment?: MouseEventHandler,
    submitComment: MouseEventHandler,
}

export default function EditComment  (props: EditCommentProps) {
  const {
    mainComment,
    targetedComment,
    index,
    currentEditedComment,
    writeComment,
    nested,
    currentSub,
    setIndex,
    writeNestedComment,
    handleNestedComment,
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
      <textarea id={index?.toString()} className="comment-box" style={{ height: nested ? "130px" : "139px", minHeight: nested ? "130px" : "139px" , width: nested ? "608px" : "652px", minWidth: nested ? "608px" : "652px", maxWidth: nested ? "608px" : "652px", color: nested ? currentEditedComment!.length >= 1 ? "#060606" : "#878a8c" : mainComment.length >= 1 ? "#060606" : "#878a8c" }} placeholder="What are your thoughts?" value={nested ? currentEditedComment : mainComment} onChange={nested ? writeNestedComment : writeComment} onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}></textarea>

      <div className="button-bar">
        <div className="start">
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
      
            {!nested && (
              <>
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
              </>
            )}
            <button className="text-settings" aria-label="More">
              <img className="setting-icon" src={require("../../resources/images/dots.png")} />
            </button>
        </div>

        <div className="end">
            <button className="markdown btn" id="markdown">
              <p style={{ color: currentSub?.buttonColor }}>Markdown Mode</p>
            </button>

            {nested && <button className="markdown btn" onClick={handleNestedComment}>
              <p style={{ color: currentSub?.buttonColor }}>Cancel</p>
            </button>}
      
            <button className="markdown submit" style={{ backgroundColor: nested ? currentEditedComment!.length >= 1 ? currentSub?.buttonColor : "#9a9a9a" : mainComment.length >= 1 ? currentSub?.buttonColor : "#9a9a9a", color: nested ? currentEditedComment!.length >= 1 ? "white" : "#cdcdcd" : mainComment.length >= 1 ? "white" : "#cdcdcd", cursor: nested ? currentEditedComment!.length >= 1 ? "pointer" : "not-allowed" : mainComment.length >= 1 ? "pointer" : "not-allowed" }} onClick={nested ? submitNestedComment : submitComment} id={`${index}`}>
              <p>Comment</p>
            </button>
        </div>
      </div>
    </div>
  );
}
