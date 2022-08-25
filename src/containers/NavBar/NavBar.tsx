import React, { MouseEventHandler, useState } from 'react';
import './NavBar.scss';
import { ReactComponent as RedditLogo } from "../../resources/images/redditlogo.svg";
import { ReactComponent as Reddit } from "../../resources/images/reddit.svg";
import { ReactComponent as Search } from "../../resources/images/search.svg";
import { ReactComponent as Expand } from "../../resources/images/expand.svg";
import { ReactComponent as User } from "../../resources/images/user.svg";
import { ObjectType } from 'typescript';

export interface NavBarProps {
  dropdownIsOpen: boolean,
  userName: string,
  handleDropdown: MouseEventHandler<HTMLDivElement>,
  handleExpand: MouseEventHandler<HTMLDivElement>,
  handleLoginModal: MouseEventHandler<HTMLElement>,
  dropdownState: {
    erkunden: boolean,
    gaming: boolean,
    sports: boolean,
    television: boolean,
    celebrity: boolean,
    business: boolean,
    crypto: boolean,
    weitereinfos: boolean,
    richtlinien: boolean,
    mehr: boolean
  }
}

export default function NavBar (props: NavBarProps) {
  const {
    dropdownIsOpen,
    handleDropdown,
    handleExpand,
    handleLoginModal,
    dropdownState,
    userName
  } = props;


  const handleHoverLink = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (e.type === "mouseenter") {
      target.setAttribute('style', 'border: 1px solid #EDEFF1;');
    } else if (!dropdownIsOpen) {
      target.setAttribute('style', 'border: 1px solid transparent');
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
            <button className="auth login" onClick={handleLoginModal} id="login">
              Anmelden
            </button>
            <button className="auth register" onClick={handleLoginModal} id="register">
              Registrieren
            </button>
  
            <div className="userInfo" onClick={handleDropdown}>
              <div className="link" id="link" style={{ border: dropdownIsOpen ? "1px solid #EDEFF1" : "1px solid transparent" }} onMouseEnter={handleHoverLink} onMouseLeave={handleHoverLink}>
                  <img src={require("../../resources/images/user.png")} className="userImg" />
                  <img src={require("../../resources/images/expand.png")} className="expand" />
              </div>
              <div className="dropdownMenu" style={{ display: dropdownIsOpen ? "block" : "none" }} id="dropdownMenu">
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
                  <img className={ dropdownState.gaming ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
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

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.gaming ? "flex" : "none" }}>
                  <h3>Watch Dogs: Legion</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="sports" onClick={handleExpand}>
                  <h3>Sports</h3>
                  <img className={ dropdownState.sports ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>NFL</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>NBA</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Atlanta Hawks</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Los Angeles Lakers</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Boston Celtics</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Arsenal F.C.</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Philadelphia 76ers</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>Premier League</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.sports ? "flex" : "none" }}>
                  <h3>UFC</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="television" onClick={handleExpand}>
                  <h3>Television</h3>
                  <img className={ dropdownState.television ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Game of Thrones</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Breaking Bad</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Rick &#38; Morty</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>The Walking Dead</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>House of Cards</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Prison Break</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Sherlock</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Suits</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.television ? "flex" : "none" }}>
                  <h3>Dark</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="celebrity" onClick={handleExpand}>
                  <h3>Celebrity</h3>
                  <img className={ dropdownState.celebrity ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Tom Hiddleston</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Benedict Cumberbatch</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Mark Ruffalo</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Robert Downey Jr.</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Tom Holland</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Zendaya</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Chris Hemsworth</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Scarlett Johansson</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.celebrity ? "flex" : "none" }}>
                  <h3>Samuel L. Jackson</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="business" onClick={handleExpand}>
                  <h3>Business</h3>
                  <img className={ dropdownState.business ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Berkshire Hathaway</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Tesla</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>SpaceX</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Best Buy</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Walgreens</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Nvidia</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Alphabet</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>Apple</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.business ? "flex" : "none" }}>
                  <h3>GameStop</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="crypto" onClick={handleExpand}>
                  <h3>Crypto</h3>
                  <img className={ dropdownState.crypto ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Cardano</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Dogecoin</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Algorand</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Bitcoin</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Ethereum</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Litecoin</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Bitcoin Cash</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>Ripple</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.crypto ? "flex" : "none" }}>
                  <h3>XRP</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.erkunden ? "flex" : "none" }} id="mehr" onClick={handleExpand}>
                  <h3>Mehr</h3>
                  <img className={ dropdownState.mehr ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Animals and Pets</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Anime</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Philosophy</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Fashion</h3>
                </div>

                <div className="dropdownItem nested" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Hobbies</h3>
                </div>

                <div className="dropdownItem nested lastChild" style={{ display: dropdownState.mehr ? "flex" : "none" }}>
                  <h3>Music</h3>
                </div>

                <div className="line" style={{ display: dropdownState.erkunden ? "block" : "none" }}></div>

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

                <div className="dropdownItem weitereinfos" id="weitereinfos" onClick={handleExpand}>
                  <img className="icon weitereinfos" src={require("../../resources/images/weitereinfos.png")} />
                  <h3>Weitere Infos</h3>
                  <img className={ dropdownState.weitereinfos ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Reddit iOS</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Reddit Android</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Rereddit</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Die besten Communities</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Communities</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Über Reddit</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Blog</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Karriere</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.weitereinfos ? "flex" : "none" }}>
                  <h3>Presse</h3>
                </div>

                <div className="line" style={{ display: dropdownState.weitereinfos ? "block" : "none" }}></div>

                <div className="dropdownItem richtlinien" id="richtlinien" onClick={handleExpand}>
                  <img className="icon richtlinien" src={require("../../resources/images/richtlinien.png")} />
                  <h3>Bedingungen &#38; AGBs</h3>
                  <img className={ dropdownState.richtlinien ? "expanded" : "expand" } src={require("../../resources/images/expandblack.png")} />
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Nutzungsvereinbarung</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Datenschutzerklärung</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Inhaltsrichtlinie</h3>
                </div>

                <div className="dropdownItem expanded" style={{ display: dropdownState.richtlinien ? "flex" : "none" }}>
                  <h3>Moderationsrichtlinien</h3>
                </div>

                <div className="line" style={{ display: dropdownState.richtlinien ? "block" : "none" }}></div>

                <div className="dropdownItem registrieren" onClick={handleLoginModal} id="register">
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
