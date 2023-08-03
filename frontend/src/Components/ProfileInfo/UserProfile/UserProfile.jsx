// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// UserProfile CSS
import "./UserProfile.css";

// Default Profile Pic
import DUP from "./defaultuserPic.jpg";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Icons ------------- */
// Person Icon
import PersonIcon from "@mui/icons-material/Person";
// Remember Me Icon
import RememberMeIcon from "@mui/icons-material/RememberMe";
// Email Icon
import EmailIcon from "@mui/icons-material/Email";
// Country Flag Circle Icon
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
// Phone Icon
import PhoneIcon from "@mui/icons-material/Phone";
// Info Icon
import InfoIcon from "@mui/icons-material/Info";
// Icon Button
import IconButton from "@mui/material/IconButton";
// Close Icon
import CloseIcon from "@mui/icons-material/Close";
// MoreHorizIcon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// Copy Icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// Done Icon
import DoneIcon from "@mui/icons-material/Done";
// Tooltip
import Tooltip from "@mui/material/Tooltip";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Circular Progress
import CircularProgress from "@mui/material/CircularProgress";
// Dialog
import Dialog from "@mui/material/Dialog";
// Dialog Actions
import DialogActions from "@mui/material/DialogActions";
// Dialog Content
import DialogContent from "@mui/material/DialogContent";
// Dialog Content Text
import DialogContentText from "@mui/material/DialogContentText";
// Dialog Title
import DialogTitle from "@mui/material/DialogTitle";
// Button
import { Button } from "@mui/material";

/* ------------- MUI Inputs ------------- */
// TextField
import TextField from "@mui/material/TextField";
// Textarea AutoSize
import TextareaAutosize from "@mui/base/TextareaAutosize";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

const UserProfile = (props) => {
  // UseState for Profile Image
  const [profImg, setProfImg] = useState();

  // A chunk size
  const CHUNK_SIZE = 8192;

  // Convert Image Array Buffer to Base 64
  const arrayBufferToBase64 = (buffer, contentType) => {
    const chunks = [];
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
      chunks.push(
        String.fromCharCode.apply(null, bytes.slice(i, i + CHUNK_SIZE))
      );
    }
    const base64String = btoa(chunks.join(""));
    // Create the Image Url
    const imageUrl = `data:${contentType};base64,${base64String}`;
    // Set the Image Url for Showing
    setProfImg(imageUrl);
  };

  // Loading / Circular Progress Open Close UseState
  const [open, setOpen] = useState(false);

  // Follow UseState
  const [follow, setFollow] = useState();

  // UseEffect for Converting Image and Follow
  useEffect(() => {
    // If presnent then do this
    if (
      Cookies.get("token") &&
      Cookies.get("userid") &&
      props &&
      props.userAllDetails &&
      props.userAllDetails.length === 5 &&
      props.userAllDetails[1]
    ) {
      arrayBufferToBase64(
        props.userAllDetails[1].image.data.data,
        props.userAllDetails[1].image.contentType
      );
      setFollow(props.userAllDetails[4]);
    }
  }, [props]);

  // Number Format Func for Followers and Following
  const numberFormat = (num) => {
    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + "T";
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num + "";
    }
  };

  // Follow User Profile Func
  const followUserProfileFunc = (follId) => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      setOpen(true);
      // Axios Post Request from Backend
      axios
        .post(
          `http://localhost:8000/api/followings/following/${userid}`,
          { _id: follId },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          // Set the Following Details of the User
          // console.log(res.data);
          let val = res.data[1].followerArr;
          const newVal = val.filter((v) => v.follower_user_id === userid);
          // console.log(newVal);

          setFollow(newVal);
          setOpen(false);
        })
        .catch((err) => {
          // console.log(err);
          Swal.fire({
            icon: "warning",
            title: `You are not authenticated !!`,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove("token");
              Cookies.remove("userid");
              window.location.href = `/signin`;
            } else {
              Cookies.remove("token");
              Cookies.remove("userid");
              window.location.href = `/signin`;
            }
          });
        });
    }
    // If userid and params id not match
    else {
      Swal.fire({
        icon: "warning",
        title: `You can only view your own account !!`,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/dashboard/${userid}`;
        } else {
          window.location.href = `/dashboard/${userid}`;
        }
      });
    }
  };

  // Open Contact Dialog Box UseState
  const [openContactDialog, setOpenContactDialog] = useState(false);

  // Open Contact Dialog Box Func
  const handleClickOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  // Close Contact Dialog Box Func
  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

  // Username Copy UseState
  const [userNameCopy, setUsernameCopy] = useState(false);
  // URL Copy UseState
  const [urlCopy, setUrlCopy] = useState(false);

  // Handle UsernameCopy Func
  const usernameCopyFunc = (textContent) => {
    const textToCopy = textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setUsernameCopy(true);
        setTimeout(() => {
          setUsernameCopy(false);
        }, 1000);
      })
      .catch((error) => {
        // console.error("Error copying text:", error);
        setUsernameCopy(false);
      });
  };

  // Handle URLCopy Func
  const urlCopyFunc = (textContent) => {
    const textToCopy = textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setUrlCopy(true);
        setTimeout(() => {
          setUrlCopy(false);
        }, 1000);
      })
      .catch((error) => {
        // console.error("Error copying text:", error);
        setUrlCopy(false);
      });
  };

  const [isScreenWide, setIsScreenWide] = useState(
    window.matchMedia("(min-width: 991px)").matches
  );

  useEffect(() => {
    // Add a listener to update the orientation when the window width changes
    const handleResize = () => {
      setIsScreenWide(window.matchMedia("(min-width: 991px)").matches);
    };
    window.addEventListener("resize", handleResize);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        // User Profile Details Box
        <div className="userProfileDetailsBox">
          {/* If props then show this */}
          {props &&
          props.userAllDetails &&
          props.userAllDetails.length === 5 ? (
            <>
              {/* User Profile Left Box */}
              <div className="userProfileLeft">
                {/* Profile Image */}
                <img src={profImg ? profImg : DUP} alt="" />
                {/* Full Name */}
                <p>
                  {props.userAllDetails[0].firstname}{" "}
                  {props.userAllDetails[0].lastname}
                </p>
                {/* Social Box */}
                <div className="socialsBox">
                  {/* Fol Box */}
                  <div className="folBox">
                    {/* Follower Number */}
                    <p
                      style={{
                        color: "#610939",
                      }}
                    >
                      {numberFormat(props.userAllDetails[2])}
                    </p>
                    {/* Followers */}
                    <p
                      style={{
                        color: "#610939",
                      }}
                    >
                      FOLLOWERS
                    </p>
                  </div>
                  {/* Divider */}
                  <hr />
                  {/* Fol Box */}
                  <div className="folBox">
                    {/* Following Number */}
                    <p
                      style={{
                        color: "rgb(7, 108, 155)",
                      }}
                    >
                      {numberFormat(props.userAllDetails[3])}
                    </p>
                    {/* Followings */}
                    <p
                      style={{
                        color: "rgb(7, 108, 155)",
                      }}
                    >
                      FOLLOWINGS
                    </p>
                  </div>
                </div>
                {/* Fol Button Box */}
                <div className="folButtonBox">
                  {/* If follow present then do this */}
                  {follow && follow.length !== 0 && !open ? (
                    <>
                      {/* If acceptence is true then Show Unfollow Button*/}
                      {follow[0].accept ? (
                        <>
                          {/* UnFollow Button */}
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              followUserProfileFunc(
                                props.userAllDetails[0]._id
                              );
                            }}
                            size="small"
                          >
                            Unfollow
                          </Button>
                        </>
                      ) : (
                        <>
                          {/* If acceptence is false then show Pending Button and Withdraw Button */}
                          {/* Pending Button */}
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            startIcon={<MoreHorizIcon />}
                            sx={{
                              m: 1,
                            }}
                          >
                            Pending
                          </Button>
                          {/* Withdraw Button */}
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => {
                              followUserProfileFunc(
                                props.userAllDetails[0]._id
                              );
                            }}
                            sx={{
                              m: 1,
                            }}
                          >
                            Withdraw
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Else Show Follow Button */}
                      {!open ? (
                        <Button
                          variant="contained"
                          onClick={() => {
                            followUserProfileFunc(props.userAllDetails[0]._id);
                          }}
                          size="small"
                        >
                          Follow
                        </Button>
                      ) : (
                        // If Open true then show Circular Progress
                        // Circular Progress Button
                        <Button variant="text" size="small">
                          <CircularProgress
                            color="secondary"
                            size={"1.435rem"}
                          />
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Contact Info Link */}
                <h6
                  onClick={() => {
                    handleClickOpenContactDialog();
                  }}
                >
                  contact info
                </h6>
              </div>

              {/* User Profile Right Box */}
              <div className="userProfileRight">
                {/* Full Name */}
                <Box className="editbox">
                  {/* Person Icon */}
                  <PersonIcon
                    sx={{
                      color: "black",
                      mr: 1,
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Field */}
                  <TextField
                    label="Full Name"
                    color="warning"
                    type="text"
                    name="fullname"
                    value={
                      props.userAllDetails[0].firstname +
                      " " +
                      props.userAllDetails[0].lastname
                    }
                    className="editInput"
                    variant="filled"
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                      readOnly: true,
                    }}
                  />
                </Box>

                {/* Username */}
                <Box className="editbox">
                  {/* Username Icon */}
                  <RememberMeIcon
                    sx={{
                      color: "black",
                      mr: 1,
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Field */}
                  <TextField
                    label="Username"
                    color="warning"
                    type="text"
                    name="username"
                    value={props.userAllDetails[0].username}
                    className="editInput"
                    variant="filled"
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                      readOnly: true,
                    }}
                  />
                </Box>

                {/* Email */}
                <Box className="editbox">
                  {/* Email Icon */}
                  <EmailIcon
                    sx={{
                      color: "black",
                      mr: 1,
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Field */}
                  <TextField
                    label="Email"
                    color="warning"
                    type="text"
                    name="email"
                    value={props.userAllDetails[0].email}
                    className="editInput"
                    variant="filled"
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                      readOnly: true,
                    }}
                  />
                </Box>

                {/* Phone */}
                <Box className="editbox">
                  {/* Phone Icon */}
                  <PhoneIcon
                    sx={{
                      color: "black",
                      mr: 1,
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Field */}
                  <TextField
                    label="Phone No."
                    color="warning"
                    type="text"
                    name="fullname"
                    value={
                      props.userAllDetails[0].code +
                      " " +
                      props.userAllDetails[0].phone
                    }
                    className="editInput"
                    variant="filled"
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                      readOnly: true,
                    }}
                  />
                </Box>

                {/* Country */}
                <Box className="editbox">
                  {/* Flag Icon */}
                  <FlagCircleIcon
                    sx={{
                      color: "black",
                      mr: 1,
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Field */}
                  <TextField
                    label="Country"
                    color="warning"
                    type="text"
                    name="fullname"
                    value={props.userAllDetails[0].country}
                    className="editInput"
                    variant="filled"
                    InputProps={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                      readOnly: true,
                    }}
                  />
                </Box>

                {/* About Box */}
                <Box className="editboxTextArea">
                  {/* Info Icon */}
                  <InfoIcon
                    sx={{
                      color: "black",
                      my: 0.5,
                      padding: "5px",
                      borderRadius: "50%",
                      fontSize: "2rem",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                    }}
                  />
                  {/* Text Area */}
                  <TextareaAutosize
                    aria-label="maximum height"
                    placeholder="About"
                    name="about"
                    value={
                      props.userAllDetails[0].about
                        ? props.userAllDetails[0].about
                        : ""
                    }
                    style={{ width: "90%" }}
                    className="editInputTextArea"
                    variant="filled"
                    inputprops={{
                      style: {
                        color: "white",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                      },
                    }}
                    aria-readonly
                  />
                </Box>
              </div>
            </>
          ) : (
            // If nothing then show skeleton
            <>
              {/* Left Box Skeleton */}
              <Skeleton
                variant="rectangular"
                sx={{
                  m: 1,
                  width: isScreenWide ? "30%" : "80%",
                  height: "55vh",
                  backgroundColor: "#6969693b",
                  borderRadius: "10px",
                }}
                edge="end"
              />

              {/* Right Box Skeleton */}
              <Skeleton
                variant="rectangular"
                sx={{
                  m: 1,
                  width: isScreenWide ? "30%" : "80%",
                  height: "60vh",
                  backgroundColor: "#6969693b",
                  borderRadius: "10px",
                }}
                edge="end"
              />
            </>
          )}
        </div>
      ) : (
        // Else show none
        <></>
      )}

      {/* Dialog Box for View Contact Info */}
      <Dialog
        open={openContactDialog}
        onClose={handleCloseContactDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxwidth={"sm"}
      >
        {/* Dialog Title */}
        <DialogTitle id="alert-dialog-title">Contact Info</DialogTitle>
        {/* Dialog Content */}
        <DialogContent dividers>
          {/* Dialog Content Text */}
          <DialogContentText
            component="span"
            id="alert-dialog-description"
            className="contContent"
          >
            {/* Contc Box */}
            <div className="contc">
              {/* Username */}
              <p>username</p>
              {/* Inner Contc Box */}
              <div className="innerContc">
                {/* Username Input */}
                <input
                  type="text"
                  value={
                    props &&
                    props.userAllDetails &&
                    props.userAllDetails.length === 5 &&
                    props.userAllDetails[0].username
                  }
                  readOnly
                />
                {/* Username Copy Icon */}
                {!userNameCopy ? (
                  <ContentCopyIcon
                    onClick={() => {
                      usernameCopyFunc(props.userAllDetails[0].username);
                    }}
                    sx={{
                      marginLeft: "15px",
                    }}
                  />
                ) : (
                  // Done Icon
                  <DoneIcon
                    sx={{
                      marginLeft: "15px",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Contc Box */}
            <div className="contc">
              {/* Profile Url */}
              <p>profile url</p>
              {/* Inner Contc Box */}
              <div className="innerContc">
                {/* Url Input */}
                <input type="text" value={window.location.pathname} readOnly />
                {/* URL Copy Icon */}
                {!urlCopy ? (
                  <ContentCopyIcon
                    onClick={() => {
                      urlCopyFunc(window.location.pathname);
                    }}
                    sx={{
                      marginLeft: "15px",
                    }}
                  />
                ) : (
                  // Done Icon
                  <DoneIcon
                    sx={{
                      marginLeft: "15px",
                    }}
                  />
                )}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        {/* Dialog Actions */}
        <DialogActions>
          {/* Close Icon */}
          <Tooltip title="Close">
            <IconButton onClick={handleCloseContactDialog} autoFocus>
              <CloseIcon
                sx={{
                  color: "red",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
