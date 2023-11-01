// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// SearchNote CSS
import "./SearchNote.css";

// Note Image
import noteImg from "./Assets/noteImg.jpg";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

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
// Whatsapp Icon
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// Facebook Icon
import FacebookIcon from "@mui/icons-material/Facebook";
// Twitter Icon
import TwitterIcon from "@mui/icons-material/Twitter";
// LinkedIn Icon
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// Email Icon
import EmailIcon from "@mui/icons-material/Email";
// Telegram Icon
import TelegramIcon from "@mui/icons-material/Telegram";
// Copy Icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// Done Icon
import DoneIcon from "@mui/icons-material/Done";
// Close Icon
import CloseIcon from "@mui/icons-material/Close";
// Icon Button
import IconButton from "@mui/material/IconButton";
// Tooltip
import Tooltip from "@mui/material/Tooltip";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// Button
import { Button } from "@mui/material";
// Dialog
import Dialog from "@mui/material/Dialog";
// Dialog Content
import DialogContent from "@mui/material/DialogContent";
// Dialog Content Text
import DialogContentText from "@mui/material/DialogContentText";
// Dialog Title
import DialogTitle from "@mui/material/DialogTitle";

/* ------------- React Share ------------- */
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

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

  // Open Share Dialog Box UseState
  const [openShareDialog, setOpenShareDialog] = useState(false);

  // Open Share Dialog Box Func
  const handleClickOpenShareDialog = () => {
    setOpenShareDialog(true);
  };

  // Close Share Dialog Box Func
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  // Share Note Id UseState
  const [shareId, setShareId] = useState();

  // Copy UseShareState
  const [copyShare, setCopyShare] = useState(false);

  // Handle Share Copy Url Func
  const handleShareCopyUrl = (url) => {
    const textToCopy = url;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopyShare(true);
        setTimeout(() => {
          setCopyShare(false);
        }, 1000);
      })
      .catch((error) => {
        // console.error("Error copying text:", error);
        setCopyShare(false);
      });
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
                        <Tooltip title="Like">
                          <IconButton>
                            <ThumbUpOutlinedIcon
                              sx={{
                                color: "cyan",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        {/* Comment Icon */}
                        <Tooltip title="Comment">
                          <IconButton>
                            <ChatBubbleOutlineIcon
                              sx={{
                                color: "blue",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        {/* Share Icon */}
                        <Tooltip title="Share">
                          <IconButton
                            onClick={() => {
                              setShareId(
                                `/profile-info/${value.username}/${value.user_id}/note/${value.note_id}`
                              );
                              handleClickOpenShareDialog();
                            }}
                          >
                            <ShareIcon
                              sx={{
                                color: "green",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        {/* View Note Button */}
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => {
                            navigate(
                              `/profile-info/${value.username}/${value.user_id}/note/${value.note_id}`
                            );
                          }}
                        >
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
                        height: "44vh",
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

          {/* Dialog Box for Share Note */}
          <Dialog
            open={openShareDialog}
            onClose={handleCloseShareDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
          >
            {/* Dialog Title */}
            <DialogTitle id="alert-dialog-title">
              <div className="shareDialogBox">
                <h5>Share</h5>
                <Tooltip title="Close" sx={{ ml: 2 }}>
                  <IconButton onClick={handleCloseShareDialog}>
                    <CloseIcon
                      color="error"
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </DialogTitle>
            {/* Dialog Content */}
            <DialogContent dividers>
              {/* Dialog Content Text */}
              <DialogContentText component="span" id="alert-dialog-description">
                <input
                  type="text"
                  name="shareId"
                  defaultValue={shareId}
                  readOnly
                  className="shareUrlBox"
                />
                <div className="shareIconBox">
                  {/* Copy */}
                  <div
                    style={{
                      backgroundColor: "#C1C1C1",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                      borderStyle: "none",
                    }}
                    onClick={() => {
                      handleShareCopyUrl(shareId);
                    }}
                  >
                    {copyShare ? (
                      <>
                        <Tooltip title="Copied" sx={{ m: 0.5 }}>
                          <IconButton>
                            <DoneIcon
                              sx={{
                                color: "white",
                                fontSize: "2rem",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Copy" sx={{ m: 0.5 }}>
                          <IconButton>
                            <ContentCopyIcon
                              sx={{
                                color: "white",
                                fontSize: "2rem",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </div>
                  {/* WP */}
                  <WhatsappShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#26CC64",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <WhatsAppIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </WhatsappShareButton>
                  {/* Facebook */}
                  <FacebookShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#1674EA",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <FacebookIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </FacebookShareButton>
                  {/* Telegram */}
                  <TelegramShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#28A4E4",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <TelegramIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </TelegramShareButton>
                  {/* LinkedIn */}
                  <LinkedinShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#0077B7",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <LinkedInIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </LinkedinShareButton>
                  {/* Email */}
                  <EmailShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#E1574A",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <EmailIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </EmailShareButton>
                  {/* Twitter */}
                  <TwitterShareButton
                    url={shareId}
                    style={{
                      backgroundColor: "#36A0F7",
                      borderRadius: "50%",
                      margin: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                    }}
                  >
                    <TwitterIcon
                      sx={{
                        m: 1.3,
                        color: "white",
                        fontSize: "2.2rem",
                      }}
                    />
                  </TwitterShareButton>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
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
