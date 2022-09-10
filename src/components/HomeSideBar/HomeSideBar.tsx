import React, { useState, MouseEventHandler } from 'react';
import './HomeSideBar.scss';
import { Subreddits } from '../../types/types';

export interface HomeSideBarProps {
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    handleSubMembership: React.MouseEventHandler,
    handleNavigate: MouseEventHandler<HTMLDivElement>,
    loginStatus: boolean,
    setLoginModalState: any
}

export default function HomeSideBar (props: HomeSideBarProps) {
  const {
    subreddits,
    topSubreddits,
    handleSubMembership,
    handleNavigate,
    loginStatus,
    setLoginModalState
  } = props;

  const [viewAll, setViewAll] = useState(false);

  const handleView = (e: React.MouseEvent) => {
    setViewAll(!viewAll);
  }

  return (
    <div className="homesidebar">
        
        <div className="topCommunities">
            <div className="topBannerContainer">
                <img className="topBanner" src={require("../../resources/images/bannerTopCommunities3.png")} />
                <h3>Today's Top Growing Communities</h3>
            </div>

            <div className="subredditList">
              {subreddits.map((subreddit, i) => {
                if (viewAll && i > 9) {
                    return;
                } else if (viewAll === false && i > 4) {
                    return;
                }
                return <div className="subInList" onClick={handleNavigate} id={subreddit.title} style={{ 
                    paddingLeft: i === 9 ? "15px" : "23px", 
                    borderBottom: viewAll ? i === 9 ? "none" : "thin solid #edeff1" : i === 4 ? "none" : "thin solid #edeff1",
                    paddingRight: subreddit.joined ? "11px" : "4px"
                }}>
                    <h3 className="num">{i + 1}</h3>
                    <img className="top" src={require("../../resources/images/top.png")} />

                    <img className="logo" src={require(`../../resources/images/Communities/${subreddit.title}/icon.png`)} />
                    <h3 className="title">{"r/" + subreddit.title}</h3>

                    <button className="join" onClick={handleSubMembership} id={subreddit.title} style={{
                        padding: subreddit.joined ? loginStatus ? "2px 10px 4px 9px" : "2px 16px 4px 15px" : "2px 16px 4px 15px",
                        backgroundColor: subreddit.joined ? loginStatus ? "white" : "#0079d3" : "#0079d3",
                        color: subreddit.joined ? loginStatus ? "#0079d3" : "white" : "white",
                        border: subreddit.joined ? loginStatus ? "1px solid #0079d3" : "none" : "none"
                    }}>{subreddit.joined ? loginStatus ? "Leave" : "Join" : "Join"}</button>
                </div>
              })}

              <button className="viewAll" onClick={handleView}>{viewAll ? "View less" : "View All"}</button>
            </div>

        </div>
    </div>
  );
}

