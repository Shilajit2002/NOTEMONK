// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// ProfileInfo CSS
import "./ProfileInfo.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";
// View Notes
import ViewNotes from "../ViewNotes/ViewNotes";
// User Profile
import UserProfile from "./UserProfile/UserProfile";
// User Note
import UserNote from "./UserNote/UserNote";

// PropTypes
import PropTypes from "prop-types";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Tabs
import Tabs from "@mui/material/Tabs";
// Tab
import Tab from "@mui/material/Tab";
// Typography
import Typography from "@mui/material/Typography";

/* ------------- MUI Icons ------------- */
// AccountCircleIcon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// NotesIcon
import NotesIcon from "@mui/icons-material/Notes";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

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
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ProfileInfo = () => {
  // Take username and id from params
  const { username, id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

  // User All Details UseState
  const [userAllDetails, setUserAllDetails] = useState();
  // User All Note Details UseState
  const [userAllNoteDetails, setUserAllNoteDetails] = useState();

  // UserEffect for get a perticular notes of the user
  useEffect(() => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      // Axios Get Request from Backend
      axios
        .get(
          `http://localhost:8000/api/allUser/all-user-prof/${userid}/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          // Set the Notes Details of the User
          setUserAllDetails(res.data);
          setUserAllNoteDetails({
            notesArr: res.data[5],
            username: res.data[0].username,
            user_id: res.data[0]._id,
          });
        })
        .catch((err) => {
          // console.log(err);
          Swal.fire({
            icon: "warning",
            title: `${err.response.data}`,
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
  }, [id]);

  // Value UseState
  const [value, setValue] = useState(0);

  // Handle Change Value Func
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* ProfileInfo Main Box */}
          <div className="profileInfoMainBox">
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                paddingTop: "90px",
              }}
            >
              {/* Tabs */}
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                textColor="inherit"
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  backgroundColor: "#171815",
                  color: "white",
                  position: "fixed", // Fix the position of the tabs
                  top: 90, // Adjust the distance from the top as needed
                  left: 0, // Fix the tabs on the left side
                  bottom: 0, // Stretch the tabs to the bottom of the viewport
                  zIndex: 1, // Ensure the tabs appear above other content
                }}
              >
                {/* Profile Tab */}
                <Tab
                  label="Profile"
                  icon={<AccountCircleIcon />}
                  iconPosition="end"
                  {...a11yProps(0)}
                  className="tabs"
                  classes={{
                    selected: "tabs--selected",
                  }}
                />
                {/* Notes Tab */}
                <Tab
                  label="Notes"
                  icon={<NotesIcon />}
                  iconPosition="end"
                  {...a11yProps(1)}
                  className="tabs"
                  classes={{
                    selected: "tabs--selected",
                  }}
                />
              </Tabs>
              {/* TabPanel for User Profile Component */}
              <TabPanel
                value={value}
                index={0}
                style={{ width: "100%", marginLeft: "100px" }}
              >
                <UserProfile userAllDetails={userAllDetails} />
              </TabPanel>
              {/* TabPanel for User Note Component */}
              <TabPanel
                value={value}
                index={1}
                style={{ width: "100%", marginLeft: "100px" }}
              >
                <UserNote userAllNoteDetails={userAllNoteDetails} />
              </TabPanel>
            </Box>
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

export default ProfileInfo;
