import React, { MouseEventHandler } from 'react';
import './BackToTopButton.scss';

export interface BackToTopButtonProps {

}

const returnToTop = (e: React.MouseEvent) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

export default function BackToTopButton (props: BackToTopButtonProps) {
  return (
    <button className="back-to-top" onClick={returnToTop}>
        Back To Top
    </button>
  );
}
