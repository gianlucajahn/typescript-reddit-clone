import * as React from 'react';
import './Home.scss';
import CreatePost from '../../components/CreatePost/CreatePost';

export interface HomeProps {
  randomIntToString: string,
  userName: string
}

export default function Home (props: HomeProps) {
  const {
    randomIntToString,
    userName
  } = props;

  return (
    <div className="home">
      <div className="feed">
        <CreatePost 
          randomIntToString={randomIntToString}
          userName={userName} />
      </div>

      <div className="info">

      </div>
    </div>
  );
}


