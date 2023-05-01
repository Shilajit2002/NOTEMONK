import React from 'react'
import './Home.css';

// Home Video
import homeBackVid from './Assets/homeBack.mp4';
// Logo
import logo from '../../Logo/logo.png';

// Import UseNavigate
import { useNavigate } from 'react-router-dom';

// Import Edit Note Icon
import EditNoteIcon from '@mui/icons-material/EditNote';
// Import Avatar & Button
import { Avatar, Button } from '@mui/material';

const Home = () => {
  // Use Navigate
  const navigate = useNavigate();

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
            <Button variant="contained" color="secondary" style={{ margin: '10px 0' }} onClick={() => { navigate('') }}>
              Create Note
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
