// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Search Friend CSS
import "./SearchFriend.css";

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
// Search Icon
import SearchIcon from "@mui/icons-material/Search";

// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";

const SearchFriend = () => {
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
  }, [id]);

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
              backgroundColor: "#24242479",
            }}
          />
          {/* Text Skeleton */}
          <Skeleton
            variant="text"
            sx={{
              backgroundColor: "#24242479",
              width: "80%",
              height: "32px",
            }}
          />
        </Box>
      );
    }

    return arr;
  };

  return (
    <>
      {/* If Token and UserId present then open dashboard */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
        {/* Search Friend Main Box */}
          <div className="searchFriendMainBox">
            {/* Dashboard Buttton */}
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                navigate(`/dashboard/${id}`);
              }}
              className="responBtn"
            >
              {" "}
              Go to Dashboard
            </Button>
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
                    color: "white",
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
                        padding: "3.5px 5px",
                        backgroundColor: "rgba(12, 12, 12, 0.527)",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
                      }}
                      key={index}
                      onClick={() => {
                        navigate(`/profile-info/${f.username}/${f._id}`);
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

export default SearchFriend;
