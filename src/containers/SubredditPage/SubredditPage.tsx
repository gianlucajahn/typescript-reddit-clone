import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePost from '../../components/CreatePost/CreatePost';
import SubredditHeadline from '../../components/SubredditHeadline/SubredditHeadline';
import { Subreddits, Subreddit } from '../../types/types';
import './SubredditPage.scss';
import SortBar from '../../components/SortBar/SortBar';
import Imprint from '../../components/Imprint/Imprint';
import { ReactComponent as Pen } from "../../resources/images/pen.svg";
import { resourceLimits } from 'worker_threads';

export interface SubredditPageProps {
    randomIntToString: string,
    userName: string,
    currentSort: string,
    setSort: React.MouseEventHandler;
    subreddits: Subreddits,
    topSubreddits: Subreddits,
    handleSubMembership: React.MouseEventHandler,
    handleNavigate: MouseEventHandler<HTMLDivElement>,
    navToSubmit: MouseEventHandler,
    loginStatus: boolean,
    setLoginModalState: any,
    identifyCurrentSub: any,
    currentSub: Subreddit | undefined,
    selectAnchor: React.MouseEventHandler,
    currentAnchor: number | undefined,
    expandRule: MouseEventHandler,
    loginModalState: string
}

export default function SubredditPage (props: SubredditPageProps) {
  const location = useLocation();
  const {
    randomIntToString,
    userName,
    currentSort,
    subreddits,
    topSubreddits,
    loginStatus,
    loginModalState,
    setLoginModalState,
    identifyCurrentSub,
    currentSub,
    currentAnchor,
    expandRule,
    setSort,
    handleSubMembership,
    handleNavigate,
    navToSubmit,
    selectAnchor
  } = props;

  const [communityTheme, setCommunityTheme] = useState(true);
  const [communityOptions, setCommunityOptions] = useState(false);

  const switchCommunityOptions = (e: React.MouseEvent) => {
    setCommunityOptions(!communityOptions);
  }

  const switchCommunityTheme = (e: React.MouseEvent) => {
    setCommunityTheme(!communityTheme);
  }

  const standardTheme = {
    buttonColor: "#0079d3",
    headerColor: "#0079d3",
    banner: "../../resources/images/Communities/todayilearned/banner.jpg",
  }

  return (
    <div className="subredditPage" style={{ backgroundColor: communityTheme ?  currentSub?.backgroundColor : "#edeff1", height: loginModalState === "closed" ? "" : "100vh", overflow: loginModalState === "closed" ? "scroll" : "hidden" }}>
      <img className="subredditBanner" src={communityTheme ? require(`../../resources/images/Communities/${currentSub?.title}/banner.jpg`) : require(`../../resources/images/Communities/todayilearned/banner.jpg`)} />

      <SubredditHeadline 
        currentSub={currentSub}
        handleSubMembership={handleSubMembership}
        selectAnchor={selectAnchor}
        currentAnchor={currentAnchor}
        standardTheme={standardTheme}
        loginStatus={loginStatus}
        communityTheme={communityTheme}
      />

      <div className="subredditContent">
          <div className="feed">
            <CreatePost 
              randomIntToString={randomIntToString}
              userName={userName}
              navToSubmit={navToSubmit}
            />

            <SortBar 
              currentSort={currentSort}
              setSort={setSort}
            />
          </div>
          <div className="sidebar">
            <div className="aboutCommunity">
              <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor }}>
                <h3>About Community</h3>
                <img className="more" src={require("../../resources/images/more_white.PNG")} />
              </div>

              <p className="about">{currentSub?.about}</p>
              <div className="createdAt">
                <img className="cake" src={require("../../resources/images/cake.png")} />
                <p>Created {currentSub?.creationDate}</p>
              </div>

              <div className="memberContainer">
                <div className="memberCount">
                  <p>{currentSub?.members}</p>
                  <h5>Members</h5>
                </div>
                <div className="onlineCount">
                  <div className="number">
                      <div className="dot"></div>
                      <p>{currentSub?.online}</p>
                  </div>
                  <h5>currently online</h5>
                </div>
                <div className="size">
                  <p>{currentSub?.bySize}</p>
                  <h5>Ranked by Size</h5>
                </div>
              </div>

              <button className="createPost" style={{ backgroundColor: communityTheme ? currentSub?.buttonColor : standardTheme.buttonColor }} onClick={navToSubmit}>
                Create Post
              </button>

              <div className="userFlair" style={{ display: loginStatus ? "block" : "none" }}>
                <div className="userFlairDesc">
                  <h5>USER FLAIR PREVIEW</h5>
                  <Pen  
                    style={{ fill: communityTheme ? currentSub?.buttonColor : "#0079d3", 
                    height: "19px", 
                    marginTop: "22px",
                    cursor: "pointer" }}
                  />
                </div>

                <div className="user">
                  <img className="avatar" src={require(`../../resources/images/avatar${userName === "Nikola Tesla" ? "tesla.PNG" : randomIntToString + ".PNG"}`)} />
                  <p className="userName">{userName}</p>
                </div>
              </div>

              <div className="communityOptions">
                <button className="communityToggle" onClick={switchCommunityOptions}>
                  COMMUNITY OPTIONS
                  <img className="expand" src={require("../../resources/images/expandblack.png")} style={{ transform: communityOptions ? "rotate(180deg)" : "" }} />
                </button>

                <div className="theme" style={{ display: communityOptions ? "flex" : "none" }}>
                  <div className="leftTheme">
                    <img className="eye" src={require("../../resources/images/eye.png")} />
                    <p>Community theme</p>
                  </div>
                  <button className="switch" onClick={switchCommunityTheme} style={{ backgroundColor: communityTheme ?  `${currentSub?.buttonColor}` : "#edeff1" }}>
                    <div className="dot" style={{ left: communityTheme ? "52%" : "3%" }}></div>
                  </button>
                </div>
              </div>
            </div>





            <div className="rulesContainer">
                <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor }}>
                    <h3>r/{currentSub?.title} Rules</h3>
                </div>

                {currentSub?.rules.map((rule, i) => {
                  return (
                    <div className={i !== 0 ? i !== currentSub.rules.length - 1 ? "ruleContainer" : "lastRuleContainer" : "firstRuleContainer"} >
                      <div className="ruleHead" id={`${i}`} onClick={expandRule}>
                        <div className="titleDiv">
                          <h3 className="rule-num">{rule?.number + `. `}</h3>
                          <h3 className="rule-title">{rule?.title}</h3>
                        </div>
                        <img className="expand" src={require("../../resources/images/expandblack.png")} style={{ transform: rule?.expanded ? "rotate(180deg)" : "" }}/>
                      </div>
                      <div className="ruleFooter" style={{ display: currentSub.rules[i]?.expanded ? "block" : "none" }}>
                        {rule?.desc}
                      </div>
                    </div>
                  )
                })}
            </div>





            <div className="flairsContainer">
                <div className="head" style={{ backgroundColor: communityTheme ? currentSub?.headerColor : standardTheme.headerColor }}>
                    <h3>Search by flair</h3>
                </div>

                <div className="flairList">
                  {currentSub?.flairs.map((flair, i) => {
                    return (
                      <button className="flair" style={{ backgroundColor: `${flair.color}` }}>
                        {flair.title}
                      </button>
                    )
                  })}
                </div>
            </div>





            <Imprint />
          </div>
      </div>
    </div>
  );
}
