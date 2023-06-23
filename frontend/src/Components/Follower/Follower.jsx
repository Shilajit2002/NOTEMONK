// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Following CSS
import "./Follower.css";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Components ------------- */
// List
import List from "@mui/material/List";
// List Item
import ListItem from "@mui/material/ListItem";
// List Item Button
import ListItemButton from "@mui/material/ListItemButton";
// List Item Text
import ListItemText from "@mui/material/ListItemText";
// List Item Avatar
import ListItemAvatar from "@mui/material/ListItemAvatar";
// Avatar
import Avatar from "@mui/material/Avatar";
// Button & Divider & Box
import { Button, Divider, Box } from "@mui/material";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

const Follower = () => {
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

  // Follower Names UseState
  const [followerName, setFollowerName] = useState(null);

  // No Follower Status
  const [noFollower, setNoFollower] = useState(null);

  // UserEffect for get all the user follower details
  useEffect(() => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Axios Get Request from Backend
        axios
          .get(`http://localhost:8000/api/followers/follower/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the No Follower Details of the User
            setNoFollower(res.data);

            // Set the Follower Details of the User
            setFollowerName(res.data.followerArr);
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
    }
  }, [id]);

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

  // FollowerNameSkList for Storing Skeleton when user not find any followers
  const followerNameSkList = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        // React Fragment
        <React.Fragment key={`frag-${i}`}>
          {/* List Item */}
          <ListItem
            key={i}
            style={{ maxWidth: "100%" }}
            secondaryAction={
              // Skeleton for Button
              <Skeleton
                variant="rectangular"
                sx={{
                  mr: 2,
                  width: 100,
                  height: 30,
                  backgroundColor: "#0000003b",
                  borderRadius: "15px",
                }}
                edge="end"
              />
            }
            disablePadding
          >
            {/* List Item Button */}
            <ListItemButton>
              {/* List Item Avatar */}
              <ListItemAvatar>
                {/* User Logo Skeleton*/}
                <Skeleton
                  variant="circular"
                  sx={{
                    mr: 2,
                    width: 40,
                    height: 40,
                    backgroundColor: "#0000003b",
                  }}
                />
              </ListItemAvatar>
              {/* List Item Text */}
              <ListItemText
                id={i}
                primary={
                  // Skeleton Text
                  <Skeleton
                    variant="text"
                    sx={{
                      backgroundColor: "#0000003b",
                      width: "40%",
                      height: "32px",
                    }}
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          {/* Box */}
          <Box key={`divider-${i}`} display="flex" justifyContent="end">
            {/* Divider */}
            <Divider
              sx={{
                width: "90%",
                backgroundColor: "rgb(178, 207, 216)",
              }}
            />
          </Box>
        </React.Fragment>
      );
    }

    return arr;
  };

  // Reject Func
  const Reject = (follId) => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Axios Delete Request from Backend
        axios
          .delete(`http://localhost:8000/api/followers/follower/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
            data: { _id: follId },
          })
          .then((res) => {
            // Set the Follower Details of the User
            setFollowerName(res.data[1].followerArr);
          })
          .catch((err) => {
            console.log(err);
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
    }
  };

  // Accept Func
  const Accept = (follId) => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Axios Post Request from Backend
        axios
          .post(
            `http://localhost:8000/api/followers/follower/${userid}`,
            { _id: follId },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((res) => {
            // Set the Follower Details of the User
            setFollowerName(res.data[1].followerArr);
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
    }
  };

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Folowing Main Box */}
          <div className="followerMainBox">
            {/* List */}
            <List
              dense
              sx={{ width: "100%", maxWidth: "100%", bgcolor: "#1D2226" }}
            >
              {/* If following names are present then show the data */}
              {followerName && followerName.length !== 0 ? (
                followerName.map((value) => {
                  return (
                    <React.Fragment key={`frag-${value._id}`}>
                      {/* List Item */}
                      <ListItem
                        key={value._id}
                        secondaryAction={
                          value.accept ? (
                            // Remove Button
                            <Button
                              variant="contained"
                              color="error"
                              edge="end"
                              sx={{
                                fontWeight: "600",
                                letterSpacing: "1px",
                                borderRadius: "15px",
                              }}
                              onClick={() => {
                                Reject(value.follower_user_id);
                              }}
                            >
                              Remove
                            </Button>
                          ) : (
                            <>
                              {/* Accept Button */}
                              <Button
                                variant="contained"
                                color="primary"
                                edge="end"
                                sx={{
                                  fontWeight: "600",
                                  letterSpacing: "1px",
                                  borderRadius: "15px",
                                  mr: "10px",
                                }}
                                onClick={() => {
                                  Accept(value.follower_user_id);
                                }}
                              >
                                Accept
                              </Button>

                              {/* Reject Button */}
                              <Button
                                color="error"
                                edge="end"
                                sx={{
                                  fontWeight: "600",
                                  letterSpacing: "1px",
                                  borderRadius: "15px",
                                }}
                                onClick={() => {
                                  Reject(value.follower_user_id);
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          )
                        }
                        disablePadding
                      >
                        {/* List Item Button */}
                        <ListItemButton
                          onClick={() => {
                            navigate(
                              `/profile-info/${value.follower_username}`
                            );
                          }}
                          sx={{
                            padding: "10px",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                          }}
                        >
                          {/* List Item Avatar */}
                          <ListItemAvatar>
                            {/* User Logo */}
                            <Avatar
                              sx={{
                                mr: 2,
                                width: 40,
                                height: 40,
                                bgcolor: stringToColor(value.follower_username),
                                boxShadow:
                                  "rgba(56, 88, 102, 0.521) 0px 2px 4px 0px, rgba(71, 88, 95, 0.719) 0px 2px 16px 0px",
                              }}
                            >
                              {value.follower_username.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          {/* List Item Text */}
                          <ListItemText
                            id={value.follower_username}
                            // User Name
                            primary={value.follower_username}
                          />
                        </ListItemButton>
                      </ListItem>
                      {/* Box */}
                      <Box
                        key={`divider-${value._id}`}
                        display="flex"
                        justifyContent="end"
                      >
                        {/* Divider */}
                        <Divider
                          sx={{
                            width: "92%",
                            backgroundColor: "rgb(178, 207, 216)",
                          }}
                        />
                      </Box>
                    </React.Fragment>
                  );
                })
              ) : (
                <>
                  {noFollower && noFollower === "No followers yet (`~`)" ? (
                    <>
                      <h5
                        style={{
                          color: "aliceblue",
                          textAlign: "center",
                          textTransform: "capitalize",
                          letterSpacing: "1.5px",
                          fontFamily: "Times-new-Roman",
                        }}
                      >
                        {noFollower}
                      </h5>
                    </>
                  ) : (
                    <>
                      {/* Otherwise call followingNameSkList for showing skeleton*/}
                      {followerNameSkList()}
                    </>
                  )}
                </>
              )}
            </List>
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

export default Follower;
