// React & UseState
import React, { useState } from "react";
// SignUp CSS
import "./SignIn.css";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate
import { useNavigate } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Inputs ------------- */
// TextField
import TextField from "@mui/material/TextField";
// Box
import Box from "@mui/material/Box";
// Input Adorment
import InputAdornment from "@mui/material/InputAdornment";

/* ------------- MUI Icons ------------- */
// Remember Me Icon
import RememberMeIcon from "@mui/icons-material/RememberMe";
// Email Icon
import EmailIcon from "@mui/icons-material/Email";
// Password Icon
import PasswordIcon from "@mui/icons-material/Password";
// Visibility Icon
import VisibilityIcon from "@mui/icons-material/Visibility";
// Visibility Off Icon
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Icon Button
import IconButton from "@mui/material/IconButton";

/* ------------- Alerts ------------- */
// Snack Bar
import Snackbar from "@mui/material/Snackbar";
// Alert
import MuiAlert from "@mui/material/Alert";

const SignIn = () => {
  // UseNavigate
  const navigate = useNavigate();

  // Password Show,Hide UseState
  const [hidePass, setHidePass] = useState({
    type: "password",
    flag: true,
  });

  // Password See & Hide Func
  const passwordFunc = () => {
    hidePass.flag
      ? setHidePass({
          type: "text",
          flag: false,
        })
      : setHidePass({
          type: "password",
          flag: true,
        });
  };

  // User UseState
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Input Alert UseState
  const [alert, setAlert] = useState({
    usernameAlert: "",
    mailAlert: "",
    passAlert: "",
  });

  // Handle User Change Func
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Snackbar Alert UseState
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Close SnackBar Alert Func
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({
      ...snack,
      open: false,
    });
  };

  // Handle Form Submit Func
  const handleSignIn = (event) => {
    // Stop Reloading the Page when Submiting the Form
    event.preventDefault();

    // Check if the form is fill or not
    if (
      user.username !== "" &&
      alert.usernameAlert === "" &&
      user.email !== "" &&
      alert.mailAlert === "" &&
      user.password !== "" &&
      alert.passAlert === ""
    ) {
      // Send to the Backend of User Form data
      axios
        .post("http://localhost:8000/api/users/login", user)
        .then((req) => {
          // If Success then Set User Null
          setUser({
            username: "",
            email: "",
            password: "",
          });

          Cookies.set("token", req.data.token);
          Cookies.set("userid", req.data.userid);

          navigate(`/dashboard/${Cookies.get("userid")}`);
        })
        .catch((err) => {
          // If Error then show the error message
          if (err.response.data === "User Not Registered !!") {
            setSnack({
              open: true,
              message: "`~` You are not registered !!",
              severity: "info",
            });
          } else if (err.response.data === "Username is Incorrect !!") {
            setSnack({
              open: true,
              message: "`~` Username is Incorrect !!",
              severity: "info",
            });
          } else if (err.response.data === "Password is Incorrect !!") {
            setSnack({
              open: true,
              message: "`~` Password is Incorrect !!",
              severity: "info",
            });
          } else {
            setSnack({
              open: true,
              message: "Server Error !!",
              severity: "error",
            });
          }
        });
    }
    // Else show fill the form
    else {
      setSnack({
        open: true,
        message: "Please fill the form !!",
        severity: "warning",
      });
    }
  };

  return (
    <>
      {/* Main Signin Container */}
      <div className="signinContainer">
        {/* Signin Form Div*/}
        <div className="signinRight">
          {/* Heading */}
          <h2>SIGN IN</h2>
          {/* Signin Form */}
          <form onSubmit={handleSignIn}>
            {/* User Name Box */}
            <Box className="signinbox">
              {/* Remember Me Icon */}
              <RememberMeIcon
                sx={{
                  color: "black",
                  mr: 1,
                  my: 0.5,
                  backgroundColor: "aliceblue",
                  padding: "5px",
                  borderRadius: "50%",
                  fontSize: "2rem",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                }}
              />
              {/* Text Field */}
              <TextField
                label="User Name"
                color="warning"
                type="text"
                name="username"
                value={user.username ? user.username.trim("") : user.username}
                onChange={handleUserChange}
                className="signinInput"
                variant="filled"
                InputProps={{
                  style: {
                    color: "white",
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                  },
                }}
                onBlur={() => {
                  if (
                    !/^((?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,})$/.test(
                      user.username
                    )
                  ) {
                    setAlert({
                      ...alert,
                      usernameAlert:
                        "at least 6 characters and contains lowercase letter & numbers",
                    });
                  } else {
                    setAlert({
                      ...alert,
                      usernameAlert: "",
                    });
                  }
                }}
              />
            </Box>
            {/* Show UserName Alert */}
            <p style={{ marginLeft: "55px" }}>{alert.usernameAlert}</p>

            {/* Email Id Box */}
            <Box className="signinbox">
              {/* Email Icon */}
              <EmailIcon
                sx={{
                  color: "black",
                  mr: 1,
                  my: 0.5,
                  backgroundColor: "aliceblue",
                  padding: "5px",
                  borderRadius: "50%",
                  fontSize: "2rem",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                }}
              />
              {/* Text Field */}
              <TextField
                label="Email Id"
                color="warning"
                type="text"
                name="email"
                value={user.email ? user.email.trim("") : user.email}
                onChange={handleUserChange}
                className="signinInput"
                variant="filled"
                InputProps={{
                  style: {
                    color: "white",
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                  },
                }}
                onBlur={() => {
                  if (
                    !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
                      user.email
                    )
                  ) {
                    setAlert({
                      ...alert,
                      mailAlert: "Invalid email address !!",
                    });
                  } else {
                    setAlert({
                      ...alert,
                      mailAlert: "",
                    });
                  }
                }}
              />
            </Box>
            {/* Show Email Alert */}
            <p>{alert.mailAlert}</p>

            {/* Password Box */}
            <Box className="signinbox">
              {/* Passowrd Icon */}
              <PasswordIcon
                sx={{
                  color: "black",
                  mr: 1,
                  my: 0.5,
                  backgroundColor: "aliceblue",
                  padding: "5px",
                  borderRadius: "50%",
                  fontSize: "2rem",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
                }}
              />
              {/* Text Field */}
              <TextField
                label="Password"
                color="warning"
                type={hidePass.type}
                name="password"
                value={user.password ? user.password.trim("") : user.password}
                onChange={handleUserChange}
                className="signinInput"
                InputProps={{
                  style: {
                    color: "white",
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={passwordFunc}
                        style={{ cursor: "pointer" }}
                        edge="end"
                      >
                        {hidePass.flag ? (
                          <VisibilityOffIcon
                            sx={{ color: "white", fontSize: "1.5rem" }}
                          />
                        ) : (
                          <VisibilityIcon
                            sx={{ color: "white", fontSize: "1.5rem" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                onBlur={() => {
                  if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=,./<>?;:'"[\]{}|~`])(?=.{8,})/.test(
                      user.password
                    )
                  ) {
                    setAlert({
                      ...alert,
                      passAlert:
                        "at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                    });
                  } else {
                    setAlert({
                      ...alert,
                      passAlert: "",
                    });
                  }
                }}
              />
            </Box>
            {/* Show Password Alert */}
            <p style={{ marginLeft: "55px" }}>{alert.passAlert}</p>

            {/* Sign In Submit Button */}
            <button type="submit" className="signupin">
              Sign In
            </button>

            <p style={{ textAlign: "center", margin: "5px 0", color: "white" }}>
              OR
            </p>
            <p style={{ textAlign: "center", margin: "5px 0", color: "white" }}>
              Not have an account?
            </p>

            {/* Sign Up Button */}
            <button
              className="signupup"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </form>

          {/* Snack Bar Alert */}
          <Snackbar
            open={snack.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            {/* Mui Alert */}
            <MuiAlert
              onClose={handleClose}
              severity={snack.severity}
              sx={{ width: "100%" }}
            >
              <strong>{snack.message}</strong>
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default SignIn;
