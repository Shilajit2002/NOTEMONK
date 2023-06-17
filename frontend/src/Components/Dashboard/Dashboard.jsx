// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Dashboard CSS
import "./Dashboard.css";

// PropTypes
import PropTypes from "prop-types";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";
// Following Page
import Following from "../Following/Following";
// Follower Page
import Follower from "../Follower/Follower";

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
// Search Icon
import SearchIcon from "@mui/icons-material/Search";
// Following Icon
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// Follower Icon
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// Notes Icon
import NotesIcon from "@mui/icons-material/Notes";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// Tabs
import Tabs from "@mui/material/Tabs";
// Tab
import Tab from "@mui/material/Tab";
// Typography
import Typography from "@mui/material/Typography";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

// TabPanel Func
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel Props
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// a11yProps Func
function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

const Dashboard = () => {
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

  // SearchNote UseState
  const [searchNote, setSearchNote] = useState("");

  // Handle Search Note Change Func
  const handleSearchNoteChange = (e) => {
    const { value } = e.target;
    setSearchNote(value);
  };

  // UserName UseState
  const [username, setuserName] = useState(null);

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

  // UserEffect for get all the user details
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
          .get(`http://localhost:8000/api/searches/all-users/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the Details of the User
            setuserName(res.data);
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
  });

  // Search Friend UseState
  const [searchFriend, setSearchFriend] = useState("");

  // Friend UseState
  const [friend, setFriend] = useState("");

  // Handle Search Friend Func
  const handleSearchFriendChange = (e) => {
    const { value } = e.target;
    setSearchFriend(value);
    // Filter the usernames using searched data
    setFriend(username.filter((ev) => value && ev.username.includes(value)));
  };

  // FriendSkList for Storing Skeleton when user not search any friends
  const friendSkList = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        // Box
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            margin: "20px 0",
            cursor: "pointer",
          }}
          key={i}
        >
          {/* Avatar SKeleton */}
          <Skeleton
            variant="circular"
            sx={{
              mr: 2,
              width: 32,
              height: 32,
              backgroundColor: "#b8b8b827",
            }}
          />
          {/* Text Skeleton */}
          <Skeleton
            variant="text"
            sx={{
              backgroundColor: "#b8b8b827",
              width: "80%",
              height: "32px",
            }}
          />
        </Box>
      );
    }

    return arr;
  };

  // Value UseState
  const [value, setValue] = React.useState(0);

  // Handle Change Value Func
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      {/* If Token and UserId present then open dashboard */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Dashboard Main Box */}
          <div className="dahsboardMainBox">
            {/* Left Box */}
            <div className="leftBox">
              {/* Note Seach Box */}
              <div className="searchBox">
                {/* Note Search Input */}
                <input
                  type="text"
                  name="searchNote"
                  placeholder="Search notes ...."
                  id=""
                  onChange={handleSearchNoteChange}
                  value={searchNote}
                />
                {/* Search Icon */}
                <SearchIcon
                  style={{
                    fontSize: "2rem",
                    margin: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </div>

              {/* Dash User Box */}
              <div className="dashuserBox">
                {/* Inner Box */}
                <Box
                  sx={{
                    width: "100%",
                    typography: "body1",
                  }}
                >
                  {/* Tabs */}
                  <Tabs
                    orientation="horizontal"
                    variant="scrollable"
                    textColor="inherit"
                    indicatorColor="primary"
                    value={value}
                    onChange={handleChange}
                    aria-label="horizontal tabs example"
                    sx={{
                      width: "100%",
                      borderRight: 1,
                      borderColor: "divider",
                      display: "flex",
                      justifyContent: "space-evenly",
                      backgroundColor: "#242424",
                      color: "whitesmoke",
                      boxShadow:
                        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    {/* Notes Tab */}
                    <Tab
                      icon={<NotesIcon />}
                      label="Notes"
                      {...a11yProps(0)}
                      sx={{ width: "33%" }}
                    />
                    {/* Following Tab */}
                    <Tab
                      icon={<GroupAddIcon />}
                      label="Following"
                      {...a11yProps(1)}
                      sx={{ width: "33%" }}
                    />
                    {/* Follower Tab */}
                    <Tab
                      icon={<PeopleAltIcon />}
                      label="Follower"
                      {...a11yProps(2)}
                      sx={{ width: "33%" }}
                    />
                  </Tabs>
                  {/* TabPanel for Search Note Component */}
                  <TabPanel value={value} index={0}></TabPanel>
                  {/* TabPanel for Following Component*/}
                  <TabPanel value={value} index={1}>
                    <Following />
                  </TabPanel>
                  {/* TabPanel for Follower Component*/}
                  <TabPanel value={value} index={2}>
                    <Follower />
                  </TabPanel>
                </Box>
              </div>
            </div>

            {/* Right Box */}
            <div className="rightBox">
              {/* Search Friend Box */}
              <div className="searchfriendBox">
                {/* Search Friend Input */}
                <input
                  type="text"
                  name="searchFriend"
                  placeholder="Search your friends ...."
                  id=""
                  onChange={handleSearchFriendChange}
                  value={searchFriend}
                />
                {/* Search Icon */}
                <SearchIcon
                  style={{
                    fontSize: "2rem",
                    margin: "5px",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              </div>

              {/* Dash Friend Box */}
              <div className="dashfriendBox">
                {/* If Searched Data Present then Show This */}
                {friend && friend.length !== 0 ? (
                  friend.map((f, index) => (
                    // Box
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        width: "100%",
                        margin: "20px 0",
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={() => {
                        navigate(`/profile-info/${f.username}`);
                      }}
                    >
                      {/* User Logo */}
                      <Avatar
                        sx={{
                          mr: 2,
                          width: 32,
                          height: 32,
                          bgcolor: stringToColor(f.username),
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        }}
                      >
                        {f.username.charAt(0).toUpperCase()}
                      </Avatar>
                      {/* Username */}
                      <h6>{f.username}</h6>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          unFollow(f._id);
                        }}
                      >
                        Follow
                      </button>
                    </Box>
                  ))
                ) : (
                  // If not then call friendsklist func for show skeleton
                  <>{friendSkList()}</>
                )}
              </div>
            </div>
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

export default Dashboard;
