import React from 'react'
import './Home.css';

import homeBackVid from './Assets/homeBack.mp4';

const Home = () => {
  return (
    <>
      <div className="homeCont">
        <div className="homebox1">
        <video src={homeBackVid} autoPlay loop muted />
        </div>
      </div>
    </>
  )
}

export default Home
