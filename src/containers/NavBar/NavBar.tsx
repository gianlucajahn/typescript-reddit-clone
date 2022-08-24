import React, { useState } from 'react';
import './NavBar.scss';
import { ReactComponent as RedditLogo } from "../../resources/images/redditlogo.svg";
import { ReactComponent as Reddit } from "../../resources/images/reddit.svg";
import { ReactComponent as Search } from "../../resources/images/search.svg";
import { ReactComponent as Expand } from "../../resources/images/expand.svg";
import { ReactComponent as User } from "../../resources/images/user.svg";
import { ObjectType } from 'typescript';

export interface NavBarProps {

}

export default function NavBar (props: NavBarProps) {
  const [dropdownState, setDropdownState] = useState({
    erkunden: false,
    gaming: false,
    sports: false,
    television: false,
    celebrity: false,
    business: false,
    crypto: false,
    weitereinfos: false,
    richtlinien: true
  });

  const handleExpand = (e: React.MouseEvent) => {
    const changedState = e.currentTarget.id;
    if (changedState === "erkunden") {
      setDropdownState({
        erkunden: !dropdownState.erkunden,
        gaming: false,
        sports: false,
        television: false,
        celebrity: false,
        business: false,
        crypto: false,
        weitereinfos: false,
        richtlinien: dropdownState.richtlinien
      })} else {
        setDropdownState({...dropdownState, [changedState]: !dropdownState[changedState as keyof typeof dropdownState]});
      }
  }

  return (
    <div className="navBar">
        <div className="logo">
          <RedditLogo className="redditLogo" />
          <Reddit className="reddit" />
        </div>

        <div className="search">
          <input type="text" placeholder="Reddit durchsuchen" className="searchBar">
          </input>
        </div>

        <div className="user">
            <button className="auth login">
              Anmelden
            </button>
            <button className="auth register">
              Registrieren
            </button>
  
            <div className="userInfo">
              <div className="link">
                  <img src={require("../../resources/images/user.png")} className="userImg" />
                  <img src={require("../../resources/images/expand.png")} className="expand" />
              </div>
              <div className="dropdownMenu">
                <div className="dropdownItem coins">
                  <img className="icon coin" src={require("../../resources/images/coin.png")} />
                  <h3>Münzen</h3>
                </div>

                <div className="dropdownItem premium">
                  <img className="icon premium" src={require("../../resources/images/premium.png")} />
                  <h3>Premium</h3>
                </div>

                <div className="dropdownItem talk">
                  <img className="icon talk" src={require("../../resources/images/talk.png")} />
                  <h3>TALK</h3>
                </div>

                <div className="dropdownItem recent">
                  <img className="icon recent" src={require("../../resources/images/recent.png")} />
                  <h3>Kürzlich besucht</h3>
                </div>

                <div className="dropdownItem erkunden" id="erkunden" onClick={handleExpand}>
                  <img className="icon erkunden" src={require("../../resources/images/erkunden.png")} />
                  <h3>Erkunden</h3>
                  <img className={ dropdownState.erkunden ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="gaming" onClick={handleExpand}>
                  <h3>Gaming</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Valheim</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Genshin Impact</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Minecraft</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Pokimane</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Halo Infinite</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Call of Duty: Warzone</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Path of Exile</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Hollow Knight</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Escape from Tarkov</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Watch Dogs: Legion</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Sports</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Television</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Celebrity</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Business</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Crypto</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }}>
                  <h3>Mehr</h3>
                  <img className="icon expand" src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem einstellungen">
                  <img className="icon einstellungen" src={require("../../resources/images/einstellungen.png")} />
                  <h3>Einstellungen</h3>
                </div>

                <div className="dropdownItem">
                  <img className="icon" src={require("../../resources/images/werbung.png")} />
                  <h3>Wirb auf Reddit</h3>
                </div>

                <div className="dropdownItem hilfecenter">
                  <img className="icon hilfecenter" src={require("../../resources/images/hilfecenter.png")} />
                  <h3>Hilfecenter</h3>
                </div>

                <div className="dropdownItem weitereinfos">
                  <img className="icon weitereinfos" src={require("../../resources/images/weitereinfos.png")} />
                  <h3>Weitere Infos</h3>
                </div>

                <div className="dropdownItem richtlinien">
                  <img className="icon richtlinien" src={require("../../resources/images/richtlinien.png")} />
                  <h3>Bedingungen &#38; Richtlinien</h3>
                </div>

                <div className="dropdownItem registrieren">
                  <img className="icon registrieren" src={require("../../resources/images/registrieren.png")} />
                  <h3>Registrieren &#38; Anmelden</h3>
                </div>

                <div className="dropdownItem" id="credits">
                  <h6>© 2022 Reddit, Inc. Alle Rechte vorbehalten.</h6>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}
