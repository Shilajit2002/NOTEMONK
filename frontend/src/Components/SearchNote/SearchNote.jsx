// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// SearchNote CSS
import "./SearchNote.css";

// Note Image
import noteImg from "./Assets/noteImg.jpg";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Icons ------------- */
// Calender Icon
import EventNoteIcon from "@mui/icons-material/EventNote";
// Share Icon
import ShareIcon from "@mui/icons-material/Share";
// Like Icon
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// Comment Icon
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// Button
import { Button } from "@mui/material";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

const SearchNote = (props) => {
  // Take the from Params
  const { id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

  // UseNavigate
  const navigate = useNavigate();

  // String to Color Func
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  // Description UseState
  const [desc, setDesc] = useState([]);

  // UseEffect for Description See more and see less
  useEffect(() => {
    if (
      props.note &&
      props.note !== "No notes found (`~`)" &&
      props.note.length !== 0
    ) {
      let arr = [];
      for (let i = 0; i < props.note.length; i++) {
        arr.push(false);
      }
      setDesc(arr);
    }
  }, [props.note]);

  // Reverse Note Date String
  const reverseDate = (str) => {
    const val = str.toString().substring(0, 10).split("-");
    let t = val[2] + "-" + val[1] + "-" + val[0];
    return t;
  };

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Search Note Main Box */}
          <div className="searchNoteBox">
            {/* If Note present then print it */}
            {props.note &&
            props.note !== "No notes found (`~`)" &&
            props.note.length !== 0 ? (
              props.note.map((value, index) => {
                return (
                  // Note Box
                  <Box key={value._id} className="NoteBox">
                    {/* Up Note Box */}
                    <div className="upNoteBox">
                      {/* User Note Box */}
                      <div className="userNoteBox">
                        {/* Avaater for User Logo */}
                        <Avatar
                          sx={{
                            mr: 2,
                            width: 35,
                            height: 35,
                            bgcolor: stringToColor(value.username),
                            boxShadow:
                              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                            textAlign: "center",
                            alignSelf: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(
                              `/profile-info/${value.username}/${value.user_id}`
                            );
                          }}
                        >
                          {value.username.charAt(0).toUpperCase()}
                        </Avatar>
                        {/* Username */}
                        <h6
                          onClick={() => {
                            navigate(
                              `/profile-info/${value.username}/${value.user_id}`
                            );
                          }}
                        >
                          {value.username}
                        </h6>
                      </div>
                      {/* Time Note Box */}
                      <div className="timeNoteBox">
                        {/* Note Date */}
                        <p>
                          {/* Calender Icon */}
                          <EventNoteIcon
                            sx={{
                              mr: 1,
                              color: "blue",
                              textAlign: "center",
                              fontSize: "1.5rem",
                            }}
                          />
                          {reverseDate(value.time)}
                        </p>
                      </div>
                    </div>

                    {/* Down Note Box */}
                    <div className="downNoteBox">
                      {/* Title Note Box */}
                      <div className="titleNoteBox">{value.title}</div>
                      {/* Description Note Box */}
                      <div
                        className="descriptionNoteBox"
                        // Set the Text Editor HTML Desc in to inner HTML
                        dangerouslySetInnerHTML={{ __html: value.description }}
                        // Change the style Height by See more and less logic
                        style={{
                          height: desc[index] ? "auto" : "250px",
                          overflow: desc[index] ? "none" : "hidden",
                        }}
                      ></div>
                      {/* Button for See More and See Less Desc */}
                      <Button
                        size="small"
                        sx={{ color: "black" }}
                        onClick={() => {
                          if (desc[index]) {
                            setDesc({
                              ...desc,
                              [index]: false,
                            });
                          } else {
                            setDesc({
                              ...desc,
                              [index]: true,
                            });
                          }
                        }}
                      >
                        {desc[index] ? "See Less..." : "See More..."}
                      </Button>
                      {/* Share Note Box */}
                      <div className="shareNote">
                        {/* Like Icon */}
                        <ThumbUpOutlinedIcon
                          sx={{
                            color: "blue",
                            cursor: "pointer",
                          }}
                        />
                        {/* Comment Icon */}
                        <ChatBubbleOutlineIcon
                          sx={{
                            color: "black",
                            cursor: "pointer",
                          }}
                        />
                        {/* Share Icon */}
                        <ShareIcon
                          sx={{
                            color: "green",
                            cursor: "pointer",
                          }}
                        />
                        {/* View Note Button */}
                        <Button color="secondary" variant="contained" onClick={()=>{
                          navigate(`/profile-info/${value.username}/${value.user_id}/note/${value.note_id}`)
                        }}>
                          View Note
                        </Button>
                      </div>
                    </div>
                  </Box>
                );
              })
            ) : (
              <>
                {/* If no notes found then print it */}
                {props.note && props.note === "No notes found (`~`)" ? (
                  <>
                    {/* Heading */}
                    <h5
                      style={{
                        color: "aliceblue",
                        textAlign: "center",
                        textTransform: "capitalize",
                        letterSpacing: "1.5px",
                        fontFamily: "Times-new-Roman",
                      }}
                    >
                      {props.note}
                    </h5>
                  </>
                ) : (
                  // Before Searching the Note Show this
                  <>
                    {/* Image */}
                    <img
                      src={noteImg}
                      alt=""
                      style={{
                        width: "90%",
                        height: "45vh",
                        marginBottom: "10px",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    />
                    {/* Heading */}
                    <h5
                      style={{
                        color: "aliceblue",
                        textAlign: "center",
                        textTransform: "capitalize",
                        letterSpacing: "1.5px",
                        fontFamily: "Times-new-Roman",
                      }}
                    >
                      ** Search your digital notebook & Find notes by title or
                      keywords **
                    </h5>
                  </>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {/* If Token and UserId not present then redirect SignIn */}
          <SignIn />
        </>
      )}
    </>
  );
};

export default SearchNote;
