// Imports
import React from 'react';
// CSS Imports
import './Imprint.scss';

export interface ImprintProps {
}

export default function Imprint (props: ImprintProps) {
  return (
    <div className="imprint-container" id="imprint-container">
        <section className="first">
            <div className="left">
                <h5 className="imprint-content">Imprint</h5>
                <h5 className="imprint-content">Report NetzDG Content</h5>
            </div>

            <div className="right">
                <h5 className="imprint-content">Help</h5>
                <h5 className="imprint-content">Transparency Report</h5>
            </div>
        </section>

        <div className="line"></div>

        <section className="second">
        <div className="left">
                <h5 className="imprint-content">User Agreement</h5>
                <h5 className="imprint-content">Privacy Policy</h5>
            </div>

            <div className="right">
                <h5 className="imprint-content">Content Policy</h5>
                <h5 className="imprint-content">Moderator Code of Conduct</h5>
            </div>
        </section>

        <div className="line"></div>

        <section className="third">
        <div className="left">
                <h5 className="imprint-content">English</h5>
                <h5 className="imprint-content">Français</h5>
                <h5 className="imprint-content">Italiano</h5>
            </div>

            <div className="right">
                <h5 className="imprint-content">Deutsch</h5>
                <h5 className="imprint-content">Español</h5>
                <h5 className="imprint-content">Português</h5>
            </div>
        </section>

        <div className="line lastline"></div>

        <h5 className="imprint-credits">No rights reserved. Built for educational purposes.</h5>
    </div>
  );
}
