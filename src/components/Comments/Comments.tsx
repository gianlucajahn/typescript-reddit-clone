import React from 'react';
import './Comments.scss';

export interface CommentsProps {
  userName: string
}

export default function Comments (props: CommentsProps) {
  const {
    userName
  } = props;

  return (
    <div className="comment-container">
        <div className="submit-comment">
          <h3>Comment as <span>{userName}</span></h3>
        </div>

        <div className="comment-list">

        </div>
    </div>
  );
}
