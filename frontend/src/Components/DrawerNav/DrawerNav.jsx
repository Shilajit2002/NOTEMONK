// React & UseState
import React, { useState } from "react";
// DrawerNav Css
import "./DrawerNav.css";

/* ------------- Pictures ------------- */
// Logo
import logo from "../../Logo/logo.png";

/* ------------- React Router Dom ------------- */
// UseNavigate
import { useNavigate } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookie
import Cookies from "js-cookie";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Avatar
import Avatar from "@mui/material/Avatar";
// List
import List from "@mui/material/List";
// Menu Item
import MenuItem from "@mui/material/MenuItem";
// List Item
import ListItem from "@mui/material/ListItem";
// List Item Button
import ListItemButton from "@mui/material/ListItemButton";
// List Item Icon
import ListItemIcon from "@mui/material/ListItemIcon";
// List Item Text
import ListItemText from "@mui/material/ListItemText";
// Swipeable Drawer
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// Button
import Button from "@mui/material/Button";

/* ------------- MUI Icons ------------- */
// Menu Icon
import MenuIcon from "@mui/icons-material/Menu";
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
// Home Icon
import HomeIcon from "@mui/icons-material/Home";
// Info Icon
import InfoIcon from "@mui/icons-material/Info";
// Register Icon
import HowToRegIcon from "@mui/icons-material/HowToReg";
// Login Icon
import LoginIcon from "@mui/icons-material/Login";
// Search Icon
import SearchIcon from "@mui/icons-material/Search";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

const DrawerNav = (props) => {
  // Navigate
  const navigate = useNavigate();

  // Drawer UseState
  const [state, setState] = useState({
    right: false,
  });

  // Toogle Drawer Func
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
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

  // Load Details Arrasy of Objects
  const loadDetails = [
    {
      navUrl: "/",
      icon: <HomeIcon />,
      text: "Home",
    },
    {
      navUrl: "/about",
      icon: <InfoIcon />,
      text: "About",
    },
    {
      navUrl: "search-friend",
      icon: <SearchIcon />,
      text: "Search Friends",
    },
    {
      navUrl: "profile",
      icon: <AccountCircleIcon />,
      text: "Profile",
    },
    {
      navUrl: "dashboard",
      icon: <SpaceDashboardIcon />,
      text: "Dashboard",
    },
    {
      navUrl: "all-notes",
      icon: <NotesIcon />,
      text: "Your Notes",
    },
    {
      navUrl: "add-notes",
      icon: <NoteAddIcon />,
      text: "Add Notes",
    },
  ];

  // Load Norm Details Array of Objects
  const loadNormDetails = [
    {
      navUrl: "/",
      icon: <HomeIcon />,
      text: "Home",
    },
    {
      navUrl: "/about",
      icon: <InfoIcon />,
      text: "About",
    },
    {
      navUrl: "/signup",
      icon: <HowToRegIcon />,
      text: "SignUp",
    },
    {
      navUrl: "/signin",
      icon: <LoginIcon />,
      text: "SignIn",
    },
  ];

  // List Func
  const list = (anchor) => (
    // Main Box
    <Box
      sx={{
        width: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Inner Upper Box */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* If Image Present then Show Image */}
        {props.imgNavUrl ? (
          <Avatar
            alt="avatar"
            src={props.imgNavUrl}
            sx={{
              m: 2,
              width: 100,
              height: 100,
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
            }}
          />
        ) : (
          // Else Show Name
          <Avatar
            sx={{
              m: 2,
              width: 80,
              height: 80,
              bgcolor: stringToColor(props.username.firstname.toUpperCase()),
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
            }}
          >
            {/* Firstname */}
            {props.username.firstname.charAt(0).toUpperCase()}
          </Avatar>
        )}
        {/* Firstname */}
        <h4>Hey, {props.username.firstname}</h4>
      </Box>

      {/* Menu Item UserName*/}
      <MenuItem
        sx={{
          color: "white",
          fontWeight: 500,
          letterSpacing: "1px",
          backgroundColor: "#333132 !important",
          p: 1,
          mt: 1,
          borderRadius: "5px",
          alignSelf: "center",
        }}
      >
        {props.username.uname}
      </MenuItem>
      {/* List */}
      <List
        sx={{
          width: "100%",
        }}
      >
        {/* Load Details */}
        {loadDetails.map((l, index) => {
          return (
            // List Item
            <ListItem
              disablePadding
              key={index}
              sx={{
                background:
                  index % 2 === 0
                    ? "radial-gradient(circle at 10% 20%, rgb(0, 95, 104) 0%, rgb(15, 156, 168) 90%)"
                    : "",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
              }}
            >
              {/* List Item Button */}
              <ListItemButton
                onClick={() => {
                  if (index === 0 || index === 1) {
                    navigate(`${l.navUrl}`);
                  } else {
                    navigate(`/${l.navUrl}/${props.username.id}`);
                  }
                }}
              >
                {/* List Item Icon */}
                <ListItemIcon
                  style={{ color: index % 2 === 0 ? "white" : "black" }}
                >
                  {l.icon}
                </ListItemIcon>
                {/* List Item Text */}
                <ListItemText
                  primary={l.text}
                  style={{ color: index % 2 === 0 ? "white" : "black" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Logout */}
        {/* List Item */}
        <ListItem disablePadding>
          {/* List Item Button*/}
          <ListItemButton
            onClick={() => {
              window.location.href = "/signin";
              Cookies.remove("token");
              Cookies.remove("userid");
            }}
          >
            {/* List Item Icon */}
            <ListItemIcon>
              <Logout style={{ color: "black" }} />
            </ListItemIcon>
            {/* List Item Text */}
            <ListItemText primary={"Logout"} style={{ color: "black" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Skeleton List Func
  const SKList = (anchor) => (
    // Main Box
    <Box
      sx={{
        width: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Skeleton for Image */}
      <Skeleton
        variant="circular"
        sx={{ backgroundColor: "#cdecff77", m: 2 }}
        width={100}
        height={100}
      />
      {/* Skeleton for Name */}
      <Skeleton
        variant="rectangular"
        sx={{ backgroundColor: "#cdecff77", m: 2 }}
        width={100}
        height={50}
      />
      {/* Skeleton for Details */}
      {[1, 2, 3, 4].map((a, index) => {
        return (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              backgroundColor: "#cdecff77",
              m: 2,
              width: "100%",
            }}
            height={60}
          />
        );
      })}
    </Box>
  );

  const normList = (anchor) => (
    // Main Box
    <Box
      sx={{
        width: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Inner Upper Box */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <Avatar
          alt="avatar"
          src={logo}
          sx={{
            m: 2,
            width: 100,
            height: 100,
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
          }}
        />
        {/* Website Name */}
        <h4 className="NOTEMONK">NOTEmonk</h4>
      </Box>
      {/* List */}
      <List
        sx={{
          width: "100%",
        }}
      >
        {loadNormDetails.map((l, index) => {
          return (
            // List Item
            <ListItem
              disablePadding
              key={index}
              sx={{
                background:
                  index % 2 === 0
                    ? "radial-gradient(circle at 10% 20%, rgb(0, 95, 104) 0%, rgb(15, 156, 168) 90%)"
                    : "",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
              }}
            >
              {/* List Item Button */}
              <ListItemButton
                onClick={() => {
                  navigate(`${l.navUrl}`);
                }}
              >
                {/* List Item Icon */}
                <ListItemIcon
                  style={{
                    color: index % 2 === 0 ? "white" : "black",
                  }}
                >
                  {l.icon}
                </ListItemIcon>
                {/* List Item Text */}
                <ListItemText
                  primary={l.text}
                  style={{
                    color: index % 2 === 0 ? "white" : "black",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {
        // Get Token and Userid from Cookie => If Present
        Cookies.get("token") && Cookies.get("userid") ? (
          <>
            {/* If props present then do this */}
            {props && props.username && props.anchor ? (
              <>
                <React.Fragment key={props.anchor}>
                  {/* Button */}
                  <Button onClick={toggleDrawer(props.anchor, true)}>
                    {/* Menu Icon */}
                    <MenuIcon
                      sx={{
                        fontSize: "2rem",
                        m: 0,
                        p: 0,
                        color: "white",
                      }}
                    />
                  </Button>
                  {/* Swipeable Drawer */}
                  <SwipeableDrawer
                    anchor={props.anchor}
                    open={state[props.anchor]}
                    onClose={toggleDrawer(props.anchor, false)}
                    onOpen={toggleDrawer(props.anchor, true)}
                  >
                    {list(props.anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              </>
            ) : (
              <>
                {/* If Not then show skeleton */}
                <React.Fragment key={props.anchor}>
                  {/* Button */}
                  <Button onClick={toggleDrawer(props.anchor, true)}>
                    {/* Menu Icon */}
                    <MenuIcon
                      sx={{
                        fontSize: "2rem",
                        m: 0,
                        p: 0,
                        color: "white",
                      }}
                    />
                  </Button>
                  {/* Swipeable Drawer */}
                  <SwipeableDrawer
                    anchor={props.anchor}
                    open={state[props.anchor]}
                    onClose={toggleDrawer(props.anchor, false)}
                    onOpen={toggleDrawer(props.anchor, true)}
                  >
                    {SKList(props.anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              </>
            )}
          </>
        ) : (
          <>
            {/* If not cookies show normals */}
            <React.Fragment key={props.anchor}>
              {/* Button */}
              <Button onClick={toggleDrawer(props.anchor, true)}>
                {/* Menu Icon */}
                <MenuIcon
                  sx={{
                    fontSize: "2rem",
                    m: 0,
                    p: 0,
                    color: "white",
                  }}
                />
              </Button>
              {/* Swipeable Drawer */}
              <SwipeableDrawer
                anchor={props.anchor}
                open={state[props.anchor]}
                onClose={toggleDrawer(props.anchor, false)}
                onOpen={toggleDrawer(props.anchor, true)}
              >
                {normList(props.anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          </>
        )
      }
    </>
  );
};

export default DrawerNav;
