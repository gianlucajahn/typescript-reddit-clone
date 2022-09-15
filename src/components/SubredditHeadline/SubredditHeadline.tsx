import * as React from 'react';
import { Subreddit } from '../../types/types';
import './SubredditHeadline.scss';

export interface SubredditHeadlineProps {
    currentSub: Subreddit | undefined,
    currentAnchor: number | undefined,
    selectAnchor: React.MouseEventHandler
    handleSubMembership: React.MouseEventHandler,
}

export default function SubredditHeadline (props: SubredditHeadlineProps) {
  const {
    currentSub,
    currentAnchor,
    selectAnchor,
    handleSubMembership
  } = props;

  return (
    <div className="subredditHeadline">
    <div className="headlineTop">
      <div className="iconContainer">
        <img className="icon" src={require(`../../resources/images/Communities/${currentSub?.title}/icon.png`)} />
      </div>
      <div className="headlineTitle">
        <h1>{currentSub?.officialTitle}</h1>
        <h3>{"r/" + currentSub?.title}</h3>
      </div>
      <button className="headlineJoin" style={{ backgroundColor: currentSub?.buttonColor }} onClick={handleSubMembership} id={currentSub?.title}>{currentSub?.joined ? "Leave" : "Join"}</button>
    </div>
    <div className="headlineBottom">
        {currentSub?.anchors?.map((anchor, i) => {
            return <div className="anchor" style={{ color: currentAnchor === i ? "#1c1c1c" : "#737373" }} id={`${i}`} onClick={selectAnchor}>
                {anchor?.title}
                <div className="anchorLine" style={{ backgroundColor: currentAnchor === i ? currentSub?.buttonColor : "transparent" }}></div>
            </div>
        })}
    </div>
  </div>
  );
}
