// React & UseState & UseEffect
import React, { useEffect, useState } from "react";
// Home CSS
import "./Home.css";

/* ------------- Pictures & Videos ------------- */
// Home Video
import homeBackVid from "./Assets/homeBack.mp4";
// Logo
import logo from "../../Logo/logo.png";
// Note Image
import noteImg from "./Assets/note.jpg";
// Create Note Image
import createNoteImg from "./Assets/createNote.webp";
// Share Note Image
import shareNoteImg from "./Assets/shareNote.jpg";
// Social Note Image
import socialNoteImg from "./Assets/socialNote.jpg";

/* ------------- React Router Dom ------------- */
// UseNavigate & useLocation
import { useNavigate, useLocation } from "react-router-dom";

/* ------------- MUI Icons ------------- */
// Edit Note Icon
import EditNoteIcon from "@mui/icons-material/EditNote";
// Avatar & Button
import { Avatar, Button } from "@mui/material";

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
    let bubble = document.createElement("span");

    let size = Math.random() * 60;

    bubble.style.width = 20 + size + "px";
    bubble.style.height = 20 + size + "px";

    if (event !== null) {
      const xPosition = event.clientX;
      const ypoistion = event.clientY;
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
  };

  // UseEffect for Show Bubble
  useEffect(() => {
    if (location.pathname === "/") {
      setInterval(createBubble, 300);
      setShowBubble(false);
    }
  }, [location.pathname, showBubble]);

  // UseEffect for Set Bubble True
  useEffect(() => {
    if (location.pathname === "/") {
      setShowBubble(true);
    }
  }, [location.pathname]);

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
            <h1>
              Welcome To NoteMonk
              <Avatar
                alt="Logo"
                src={logo}
                sx={{ width: 56, height: 56 }}
                style={{
                  margin: "0 10px",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              />
            </h1>
            {/* H5 */}
            <h5>
              Create your own notes <EditNoteIcon />
            </h5>
            {/* Create Note Button */}
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "10px 0" }}
              onClick={() => {
                navigate("/about");
              }}
            >
              Know More
            </Button>
          </div>
        </div>

        {/* Second Home Div */}
        <div
          className="homebox2"
          onMouseMove={createBubble}
          onTouchMove={createBubble}
        >
          {/* Left Container */}
          <div className="enjoyLeftContainer">
            {/* H2 */}
            <h2>Enjoy note taking with your friends</h2>

            {/* Enjoy Container Button */}
            <div className="enjoyButton">
              {/* SignUp Button */}
              <Button
                variant="contained"
                style={{ margin: "10px 0" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </Button>
              {/* SignIn Button */}
              <Button
                variant="contained"
                color="success"
                style={{ margin: "10px 0" }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
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

        {/* Third Home Div */}
        <div className="homebox3">
          {/* Carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            data-interval="3000"
            data-pause="hover"
          >
            {/* Carousel Inner */}
            <div className="carousel-inner">
              {/* Carousel Item */}
              <div className="carousel-item active">
                {/* Create Note Image First */}
                <img className="img" src={createNoteImg} alt="First slide" />
                {/* Heading */}
                <h3>Crafting Your Ideas: The Power of Note Creation</h3>
              </div>
              {/* Carousel Item */}
              <div className="carousel-item">
                {/* Share Note Image First */}
                <img className="img" src={shareNoteImg} alt="Second slide" />
                {/* Heading */}
                <h3>Passing the Torch of Knowledge: Share Your Notes </h3>
              </div>
              {/* Carousel Item */}
              <div className="carousel-item">
                {/* Social Note Image First */}
                <img className="img" src={socialNoteImg} alt="Third slide" />
                {/* Heading */}
                <h3>Expanding Horizons: Connecting Through Shared Notes</h3>
              </div>
            </div>
            {/* Previous Icon */}
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </a>
            {/* Next Icon */}
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
