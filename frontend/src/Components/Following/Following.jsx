// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Following CSS
import "./Following.css";

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

const Following = () => {
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

  // Following Names UseState
  const [followingName, setFollowingName] = useState(null);

  // No Following Status
  const [noFollowing, setNoFollowing] = useState(null);

  // UserEffect for get all the user following details
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
          .get(`http://localhost:8000/api/followings/following/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the No Following Details of the User
            setNoFollowing(res.data);

            // Set the Following Details of the User
            setFollowingName(res.data.followingArr);
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

  // FollowingNameSkList for Storing Skeleton when user not find any followings
  const followingNameSkList = () => {
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

  // Unfollow Func
  const unFollow = (follId) => {
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
            setFollowingName(res.data[0].followingArr);
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
          <div className="followingMainBox">
            {/* List */}
            <List
              dense
              sx={{ width: "100%", maxWidth: "100%", bgcolor: "#1D2226" }}
            >
              {/* If following names are present then show the data */}
              {followingName && followingName.length !== 0 ? (
                followingName.map((value) => {
                  return (
                    <React.Fragment key={value._id}>
                      {/* List Item */}
                      <ListItem
                        key={value._id}
                        secondaryAction={
                          value.accept ? (
                            // Unfollow Button
                            <Button
                              color="primary"
                              edge="end"
                              sx={{
                                fontWeight: "600",
                                letterSpacing: "1px",
                                borderRadius: "15px",
                              }}
                              onClick={() => {
                                unFollow(value.following_user_id);
                              }}
                            >
                              Unfollow
                            </Button>
                          ) : (
                            // Pending Button
                            <Button
                              variant="outlined"
                              color="secondary"
                              edge="end"
                              sx={{
                                fontWeight: "600",
                                letterSpacing: "1px",
                                borderRadius: "15px",
                              }}
                            >
                              Pending
                            </Button>
                          )
                        }
                        disablePadding
                      >
                        {/* List Item Button */}
                        <ListItemButton
                          onClick={() => {
                            navigate(
                              `/profile-info/${value.following_username}`
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
                                bgcolor: stringToColor(
                                  value.following_username
                                ),
                                boxShadow:
                                  "rgba(56, 88, 102, 0.521) 0px 2px 4px 0px, rgba(71, 88, 95, 0.719) 0px 2px 16px 0px",
                              }}
                            >
                              {value.following_username.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          {/* List Item Text */}
                          <ListItemText
                            id={value.following_username}
                            // User Name
                            primary={value.following_username}
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
                  {noFollowing && noFollowing === "No followings" ? (
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
                        ~* Follow your friends & grow up your network *~
                      </h5>
                    </>
                  ) : (
                    <>
                      {/* Otherwise call followingNameSkList for showing skeleton*/}
                      {followingNameSkList()}
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

export default Following;
