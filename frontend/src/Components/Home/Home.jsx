import React, { useEffect, useState } from 'react'
import './Home.css';

// Home Video
import homeBackVid from './Assets/homeBack.mp4';
// Logo
import logo from '../../Logo/logo.png';
// Note Image
import noteImg from './Assets/note.jpg';

// Import UseNavigate & useLocation
import { useNavigate, useLocation } from 'react-router-dom';

// Import Edit Note Icon
import EditNoteIcon from '@mui/icons-material/EditNote';
// Import Avatar & Button
import { Avatar, Button } from '@mui/material';

const Home = () => {
  // Use Navigate
  const navigate = useNavigate();

  // Use Location
  const location = useLocation();

  // Bubble UseState
  const [showBubble, setShowBubble] = useState(true);

  // Create Bubble Func
  const createBubble = (event = null) => {
    let con = document.querySelector(".homebox2");
    if (!con) {
      return;
    }
    let bubble = document.createElement('span');

    let size = Math.random() * 60;

    bubble.style.width = 20 + size + 'px';
    bubble.style.height = 20 + size + 'px';

    if (event !== null) {
      const xPosition = event.clientX
      const ypoistion = event.clientY
      bubble.style.left = xPosition + "px";
      bubble.style.top = ypoistion + "px";
    } else {
      // eslint-disable-next-line no-restricted-globals
      bubble.style.left = Math.random() * innerWidth + "px";
    }

    if (bubble.style.left !== null) {
      con.appendChild(bubble);
    }

    setTimeout(() => {
      bubble.remove();
    }, 4000);
  }

  // UseEffect for Show Bubble
  useEffect(() => {
    if (location.pathname === '/') {
      setInterval(createBubble, 300);
      setShowBubble(false);
    }
  }, [location.pathname, showBubble]);

  // UseEffect for Set Bubble True
  useEffect(() => {
    if (location.pathname === '/') {
      setShowBubble(true);
    }
  }, [location.pathname])


  return (
    <>
      {/* Main Home */}
      <div className="homeCont">
        {/* First Home Div */}
        <div className="homebox1">
          {/* Video */}
          <video src={homeBackVid} autoPlay loop muted />
          {/* Middle Welcome Container */}
          <div className="welcomeContainer">
            {/* H1 */}
            <h1>Welcome To NoteMonk
              <Avatar
                alt="Logo"
                src={logo}
                sx={{ width: 56, height: 56 }}
                style={{ margin: '0 10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
              />
            </h1>
            {/* H5 */}
            <h5>Create your own notes <EditNoteIcon /></h5>
            {/* Create Note Button */}
            <Button variant="contained" color="secondary" style={{ margin: '10px 0' }} onClick={() => { navigate('/about') }}>
              Know More
            </Button>
          </div>
        </div>

        {/* Second Home Div */}
        <div className="homebox2" onMouseMove={createBubble} onTouchMove={createBubble}>
          {/* Left Container */}
          <div className="enjoyLeftContainer">
            {/* H2 */}
            <h2>Enjoy note taking with your friends</h2>

            {/* Enjoy Container Button */}
            <div className="enjoyButton">
              {/* SignUp Button */}
              <Button variant="contained" style={{ margin: '10px 0' }} onClick={() => { navigate('/signup') }}>
                SignUp
              </Button>
              {/* SignIn Button */}
              <Button variant="contained" color="success" style={{ margin: '10px 0' }} onClick={() => { navigate('/signin') }}>
                SignIn
              </Button>
            </div>
          </div>

          {/* Right Container */}
          <div className="enjoyRightContainer">
            {/* Mobile Design Outer Box */}
            <div className="noteOuter">
              {/* Note Image */}
              <img src={noteImg} alt="NoteImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
