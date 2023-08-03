// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Navbar CSS
import "./Navbar.css";

// Drawer Nav Component
import DrawerNav from "../DrawerNav/DrawerNav";

/* ------------- Pictures ------------- */
// Logo
import logo from "../../Logo/logo.png";

/* ------------- React Router Dom ------------- */
// UseNavigate
import { useNavigate } from "react-router-dom";
// NavLink
import { NavLink } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookie
import Cookies from "js-cookie";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// Menu
import Menu from "@mui/material/Menu";
// Menu Item
import MenuItem from "@mui/material/MenuItem";
// List Item Icon
import ListItemIcon from "@mui/material/ListItemIcon";
// Divider
import Divider from "@mui/material/Divider";
// Icon Button
import IconButton from "@mui/material/IconButton";
// Tooltip
import Tooltip from "@mui/material/Tooltip";

/* ------------- MUI Icons ------------- */
// LogoOut Icon
import Logout from "@mui/icons-material/Logout";
// Account Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Dashboard Icon
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
// Notes Icon
import NotesIcon from "@mui/icons-material/Notes";
// Notes Add Icon
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const Navbar = () => {
  // Navigate
  const navigate = useNavigate();

  // NavLink Active Style
  const navLinkStyle = ({ isActive }) => {
    return {
      background: isActive ? "linear-gradient(to right,#9e0bac, #1c0d9e" : "",
      color: isActive ? "white" : "",
    };
  };

  // UserName UseState
  const [username, setuserName] = useState(null);
  // User Image Url UseState
  const [imgNavUrl, setimgNavUrl] = useState(null);

  // A chunk size
  const CHUNK_SIZE = 8192;

  // Convert Image Array Buffer to Base 64
  const arrayBufferToBase64 = (buffer) => {
    const chunks = [];
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
      chunks.push(
        String.fromCharCode.apply(null, bytes.slice(i, i + CHUNK_SIZE))
      );
    }
    return btoa(chunks.join(""));
  };

  // UseEffect for Get the User Details
  useEffect(() => {
    // Set Token and UserId in Cookie
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token && userid) {
      // Get Details user from backend
      axios
        .get(`http://localhost:8000/api/users/user/${userid}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          const firstname = res.data[0].firstname;
          const uname = res.data[0].username;
          // Store the Username
          setuserName({
            firstname: firstname,
            uname: uname,
            id: res.data[0]._id,
          });

          // Check if the Image array is null or not
          if (res.data.length === 2 && res.data[1] !== null) {
            // If not then convert Array Buffer Image to Base64String
            const base64String = arrayBufferToBase64(
              res.data[1].image.data.data
            );
            // Create the Image Url
            const imageUrl = `data:${res.data[1].image.contentType};base64,${base64String}`;
            // Set the Image Url for Showing
            setimgNavUrl(imageUrl);
          }
        })
        .catch((err) => {
          Cookies.remove("token");
          Cookies.remove("userid");
        });
    }
  });

  // Anchor UseState for Tooltip
  const [anchorEl, setAnchorEl] = useState(null);

  // Set data in Open for Open Tooltip
  const open = Boolean(anchorEl);

  // Tooltip HandleClick Func
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Tooltip HandleClose Func
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          {/* Logo  */}
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="BS5 Logo" />
            {/* Name */}
            <span className="navbar-text m-2">NOTEmonk</span>
          </NavLink>

          {/* Collapsiable  */}
          <div
            className="navbar-toggler"
            // data-bs-toggle="collapse"
            // data-bs-target="#collapsibleNavbar"
            style={{
              borderStyle: "none",
              margin: "0px",
              padding: "0px",
              cursor: "pointer",
            }}
          >
            {/* Drawer Nav Component */}
            <DrawerNav
              username={username}
              anchor={"right"}
              imgNavUrl={imgNavUrl}
              component="span"
            />
          </div>

          {/* Collapse Part */}
          <div
            className="collapse navbar-collapse justify-content-end"
            // id="collapsibleNavbar"
          >
            {/* Unordered List */}
            <ul className="navbar-nav">
              {/* NavLink Items */}
              <NavLink className="nav-item" style={navLinkStyle} to="/">
                Home
              </NavLink>
              <NavLink className="nav-item" style={navLinkStyle} to="/about">
                About
              </NavLink>

              {/* Logic For Login and Not Login */}
              {
                // Get Token and Userid from Cookie => If Present
                Cookies.get("token") && Cookies.get("userid") ? (
                  <>
                    {
                      // Check the Username is set or not
                      username ? (
                        <>
                          {/* If Yes then so the Tooltip Box*/}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {/* ToolTip */}
                            <Tooltip title="Profile" sx={{ zIndex: 9999 }}>
                              {/* Icon Button */}
                              <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2, color: "white" }}
                                aria-controls={
                                  open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                              >
                                Hey, {username.firstname}
                                {/* Avatar for Logo names */}
                                {imgNavUrl ? (
                                  <Avatar
                                    alt="avatar"
                                    src={imgNavUrl}
                                    sx={{
                                      ml: 2,
                                      width: 32,
                                      height: 32,
                                      boxShadow:
                                        "rgba(34, 140, 221, 0.3) 0px 1px 2px 0px, rgba(0, 139, 245, 0.15) 0px 2px 6px 2px",
                                    }}
                                  />
                                ) : (
                                  <Avatar
                                    sx={{
                                      ml: 2,
                                      width: 32,
                                      height: 32,
                                      bgcolor: stringToColor(
                                        username.firstname.toUpperCase()
                                      ),
                                      boxShadow:
                                        "rgba(34, 140, 221, 0.3) 0px 1px 2px 0px, rgba(0, 139, 245, 0.15) 0px 2px 6px 2px",
                                    }}
                                  >
                                    {username.firstname.charAt(0).toUpperCase()}
                                  </Avatar>
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                          {/* Menu bar */}
                          <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: "visible",
                                filter:
                                  "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                backgroundColor: "#003326ee",
                                "&:before": {
                                  content: '""',
                                  display: "block",
                                  position: "absolute",
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "#003326ee",
                                  transform: "translateY(-50%) rotate(45deg)",
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            {/* Menu Item UserName*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                backgroundColor: "#333132 !important",
                              }}
                            >
                              {username.uname}
                            </MenuItem>

                            {/* Menu Item Profile*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/profile/${username.id}`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <AccountCircleIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Profile
                            </MenuItem>

                            {/* Menu Item Dashboard*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/dashboard/${username.id}`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <SpaceDashboardIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Dashboard
                            </MenuItem>

                            {/* Menu Item Notes*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/all-notes/${username.id}`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <NotesIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Your Notes
                            </MenuItem>

                            {/* Menu Item Add Notes*/}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate(`/add-notes/${username.id}`);
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <NoteAddIcon
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Add Notes
                            </MenuItem>

                            {/* Divider */}
                            <Divider style={{ backgroundColor: "white" }} />

                            {/* Menu Item LogOut */}
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                window.location.href = "/signin";
                                Cookies.remove("token");
                                Cookies.remove("userid");
                              }}
                              sx={{
                                color: "white",
                                fontWeight: 500,
                                letterSpacing: "1px",
                                "&:hover": {
                                  backgroundColor: "#0f000ac4 !important", // Change the background color on hover
                                },
                              }}
                            >
                              <ListItemIcon>
                                <Logout
                                  style={{ color: "white" }}
                                  fontSize="small"
                                />
                              </ListItemIcon>
                              Logout
                            </MenuItem>
                          </Menu>
                        </>
                      ) : (
                        <>
                          {/* if Not then Show the Skeleton Box */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {/* Name Skeleton */}
                            <Skeleton
                              variant="text"
                              sx={{
                                fontSize: "1rem",
                                mr: 1,
                                backgroundColor: "#cdecff77",
                                width: "100px",
                                height: "32px",
                              }}
                            />

                            {/* Logo Skeleton */}
                            <Skeleton
                              variant="circular"
                              sx={{ backgroundColor: "#cdecff77" }}
                              width={32}
                              height={32}
                            />
                          </Box>
                        </>
                      )
                    }
                  </>
                ) : (
                  <>
                    {/* If Not then show the SignUp and SignIn Nav Links */}
                    <NavLink
                      className="nav-item"
                      style={navLinkStyle}
                      to="/signup"
                    >
                      SignUp
                    </NavLink>
                    <NavLink
                      className="nav-item"
                      style={navLinkStyle}
                      to="/signin"
                    >
                      SignIn
                    </NavLink>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
