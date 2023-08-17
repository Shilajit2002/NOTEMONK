// React
import React from "react";

// Footer CSS
import "./Footer.css";

// UseNavigate
import { useNavigate } from "react-router-dom";

// Facebook Icon
import FacebookIcon from "@mui/icons-material/Facebook";
// Twitter Icon
import TwitterIcon from "@mui/icons-material/Twitter";
// LinkedIn Icon
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// Email Icon

// Image
import ImgNote from "./Assets/writing-note.gif";

const Footer = () => {
  // UseNavigate
  const navigate = useNavigate();
  return (
    <>
      {/* Footer Box */}
      <div className="footer">
        {/* Middle Box */}
        <div className="middle">
          {/* Left Box */}
          <div className="left">
            {/* Para */}
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </p>
            {/* Para */}
            <p
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </p>
            {/* Contact Us */}
            <p>Contact Us</p>
          </div>
          {/* Mid Box Gif */}
          <img src={ImgNote} alt="" className="mid" />
          {/* Right Box */}
          <div className="right">
            {/* Facebook Icon */}
            <FacebookIcon
              sx={{
                fontSize: "2rem",
                m: 1,
                cursor: "pointer",
                color: "#01238B",
              }}
            />
            {/* Twitter Icon */}
            <TwitterIcon
              sx={{
                fontSize: "2rem",
                m: 1,
                cursor: "pointer",
                color: "rgb(29,161,242)",
              }}
            />
            {/* LinkedIn Icon */}
            <LinkedInIcon
              sx={{
                fontSize: "2rem",
                m: 1,
                cursor: "pointer",
                color: "#0063C2",
              }}
            />
          </div>
        </div>
        {/* Down Box */}
        <div className="down">
          {/* Para */}
          <p>&copy; 2023 NOTEMONK. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
