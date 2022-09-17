import React, { MouseEventHandler } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePost from '../../components/CreatePost/CreatePost';
import SubredditHeadline from '../../components/SubredditHeadline/SubredditHeadline';
import { Subreddits, Subreddit } from '../../types/types';
import './SubredditPage.scss';
import SortBar from '../../components/SortBar/SortBar';
import Imprint from '../../components/Imprint/Imprint';
import { ReactComponent as Pen } from "../../resources/images/pen.svg";

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
    currentAnchor: number | undefined
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
    setLoginModalState,
    identifyCurrentSub,
    currentSub,
    currentAnchor,
    setSort,
    handleSubMembership,
    handleNavigate,
    navToSubmit,
    selectAnchor
  } = props;

  return (
    <div className="subredditPage" style={{ backgroundColor: currentSub ? currentSub?.backgroundColor : "#edeff1" }}>
      <img className="subredditBanner" src={require(`../../resources/images/Communities/${currentSub?.title}/banner.jpg`)} />

      <SubredditHeadline 
        currentSub={currentSub}
        handleSubMembership={handleSubMembership}
        selectAnchor={selectAnchor}
        currentAnchor={currentAnchor}
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
              <div className="head" style={{ backgroundColor: currentSub?.headerColor }}>
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

              <button className="createPost" style={{ backgroundColor: currentSub?.buttonColor }} onClick={navToSubmit}>
                Create Post
              </button>

              <div className="userFlair" style={{ display: loginStatus ? "block" : "none" }}>
                <div className="userFlairDesc">
                  <h5>USER FLAIR PREVIEW</h5>
                  <Pen  
                    style={{ fill: currentSub?.buttonColor, height: "19px", 
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
                <button className="communityToggle">
                  COMMUNITY OPTIONS
                  <img className="expand" src={require("../../resources/images/expand.png")} />
                </button>
              </div>
            </div>

            <Imprint />
          </div>
      </div>
    </div>
  );
}
