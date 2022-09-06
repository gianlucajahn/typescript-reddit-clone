import React, { useState } from 'react';
import './HomeSideBar.scss';

export interface HomeSideBarProps {
}

export default function HomeSideBar (props: HomeSideBarProps) {
  const {

  } = props;

  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="homesidebar">
        <div className="topCommunities">
            <img className="topBanner" src={require("../../resources/images/bannerTopCommunities3.png")} />
            <h3>Today's Top Growing Communities</h3>

            <div className="communityList">

            </div>
        </div>
    </div>
  );
}

