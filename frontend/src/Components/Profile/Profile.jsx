// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// Profile CSS
import "./Profile.css";

/* ------------- Pictures ------------- */
// Default Profile Pic
import defaultProfPic from "./Assets/default_prof.png";

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

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";
// Snack Bar
import Snackbar from "@mui/material/Snackbar";
// Alert
import MuiAlert from "@mui/material/Alert";

/* ------------- MUI Inputs ------------- */
// TextField
import TextField from "@mui/material/TextField";
// Menu Item
import MenuItem from "@mui/material/MenuItem";
// Select
import Select from "@mui/material/Select";
// Form Control
import FormControl from "@mui/material/FormControl";
// Textarea AutoSize
import TextareaAutosize from "@mui/base/TextareaAutosize";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

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
// Add Photo Icon
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// Info Icon
import InfoIcon from "@mui/icons-material/Info";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// BackDrop
import Backdrop from "@mui/material/Backdrop";
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
// Import Button
import { Button } from "@mui/material";

const Profile = () => {
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

  // UseState for Country
  const [countries, setCountries] = useState([]);

  // UseEffect for Get All the Countries from Database
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/codes/allcountrycode")
      .then((res) => {
        // Set the Countries
        setCountries(res.data);
      })
      .catch((err) => {
        // Show Error
        console.log(err);
      });
  }, []);

  // Input Alert UseState
  const [alert, setAlert] = useState({
    firstnameAlert: "",
    lastnameAlert: "",
    mailAlert: "",
    countryAlert: "",
    phoneAlert: "",
  });

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

  // User Details UseState
  const [userdetails, setuserDetails] = useState(null);

  // Handle User Change Func
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setuserDetails({
      ...userdetails,
      [name]: value,
    });
  };

  // Country Local Value UseState
  const [localValue, setLocalValue] = useState("");

  // Handle Country Change Func
  const handleCountryChange = (e) => {
    const { value } = e.target;
    setLocalValue(value);

    // Set the Country and Code Value
    const b = value.indexOf("(");
    const con = value.substring(0, b);
    const cod = value.substring(b);
    setuserDetails({
      ...userdetails,
      country: con,
      code: cod,
    });
  };

  // Image File Store UseState
  const [image, setImage] = useState(null);
  // Image File Alert UseState
  const [imgerror, setimgError] = useState(false);
  // User Image Url UseState
  const [imgurl, setimgUrl] = useState(null);

  // Handle Image Change Func
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // Check the uploaded file is image or not
      if (e.target.files[0].type.match(/image\/*/) == null) {
        // If not then Set Image Url null
        setimgUrl(null);
        // Set Image File Error
        setimgError(true);

        setSnack({
          open: true,
          message: "Only Images are supported !!",
          severity: "warning",
        });

        return;
      }
      // If is it Image File
      else {
        // Set Image File Error null
        setimgError(false);
      }

      // Set Image File
      setImage(e.target.files[0]);

      //  Preview that Image File before uploading
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        setimgUrl(event.target.result);
      };
    }
  };

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

  // UseEffect for Get all the Details of the User
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
          .get(`http://localhost:8000/api/users/user/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the Details of the User
            const details = res.data[0];
            setuserDetails(details);
            setLocalValue(res.data[0].country + res.data[0].code);

            // Check if the Image array is null or not
            if (res.data.length === 2 && res.data[1] !== null) {
              // If not then convert Array Buffer Image to Base64String
              const base64String = arrayBufferToBase64(
                res.data[1].image.data.data
              );
              // Create the Image Url
              const imageUrl = `data:${res.data[1].image.contentType};base64,${base64String}`;
              // Set the Image Url for Showing
              setimgUrl(imageUrl);
            }
          })
          .catch((err) => {
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
            window.location.href = `/profile/${userid}`;
          } else {
            window.location.href = `/profile/${userid}`;
          }
        });
      }
    }
  }, [id]);

  // Loading / Circular Progress Open Close UseState
  const [open, setOpen] = useState(false);

  // Handle Edit Func
  const handleEdit = (event) => {
    // Stop Reloading the Page when Submiting the Form
    event.preventDefault();
    // Check the Condition if the form is fill then got backend
    if (
      userdetails.firstname !== "" &&
      alert.firstnameAlert === "" &&
      userdetails.lastname !== "" &&
      alert.lastnameAlert === "" &&
      userdetails.email !== "" &&
      alert.mailAlert === "" &&
      userdetails.phone !== "" &&
      alert.phoneAlert === "" &&
      userdetails.code !== "" &&
      userdetails.country !== ""
    ) {
      setOpen(true);
      // Send to the Backend of form data for Edit
      axios
        .patch(`http://localhost:8000/api/users/user/${id}`, userdetails, {
          headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          // If the image is choosen and there have no image error then upload the image
          if (image !== null && !imgerror) {
            const formData = new FormData();
            formData.append("profileImage", image);

            // Send data backend for image upload
            axios
              .post(
                `http://localhost:8000/api/profiles/upload/${id}`,
                formData,
                {
                  headers: {
                    Authorization: `${Cookies.get("token")}`,
                  },
                }
              )
              .then((res) => {
                setOpen(false);
                navigate(`/profile/${Cookies.get("userid")}`);
              })
              .catch((err) => {
                setOpen(false);
                console.error(err);
              });
          } else {
            setOpen(false);
            navigate(`/profile/${Cookies.get("userid")}`);
          }
        })
        .catch((err) => {
          setOpen(false);
          setSnack({
            open: true,
            message: "You can not add another person details !!",
            severity: "warning",
          });
        });
    }
    // Other Wise Error
    else {
      setSnack({
        open: true,
        message: "Invalid profile details !!",
        severity: "warning",
      });
    }
  };

  // Open Dialog Box UseState
  const [openDialog, setOpenDialog] = useState(false);

  // Open Dialog Box Func
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close Dialog Box Func
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //  Delete User Details Func
  const handleDeleteUser = () => {
    // Delete request for delete user details
    axios
      .delete(`http://localhost:8000/api/users/user/${id}`, {
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setOpen(false);
        Cookies.remove("token");
        Cookies.remove("userid");
        window.location.href = "/";
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: "You can not delete another person details !!",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <>
      {/* If Token and UserId present then open dashboard */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Profile Main Div */}
          <div className="profileMainBox">
            {/* Profile Inner Div */}
            <div className="profile">
              {/* Profile Upper Div */}
              <div className="upbox">
                {userdetails ? (
                  <>
                    {/* If the userdetails present then show the details of the user */}

                    {/* Profile Picture */}
                    <img
                      src={imgurl ? imgurl : defaultProfPic}
                      alt="Profilepic"
                      className="img"
                    />
                    {/* Picture Upload Button */}
                    <p>
                      <input
                        type="file"
                        id="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="file">
                        <AddAPhotoIcon id="picicon" />
                      </label>
                    </p>
                    {/* Names of the User */}
                    <div className="names">
                      <h3>
                        {userdetails.firstname} {userdetails.lastname}
                      </h3>
                      <h5>{userdetails.username}</h5>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Other wise show skeleton structure */}

                    {/* Profile Skeleton */}
                    <Skeleton
                      variant="circular"
                      sx={{ backgroundColor: "#b8b8b827" }}
                      width={170}
                      height={170}
                      className="img"
                    />

                    {/* Name Skeleton */}
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        backgroundColor: "#b8b8b827",
                        width: "250px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  </>
                )}
              </div>
              {/* Profile Down Div */}
              <div className="downbox">
                {userdetails ? (
                  <>
                    {/* If the userdetails present then show the details of the user */}

                    {/* User Details Edit Form */}
                    <form onSubmit={handleEdit}>
                      <div className="outBox">
                        {/* First Name Box */}
                        <Box className="editbox">
                          {/* Person Icon */}
                          <PersonIcon
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
                            label="First Name"
                            color="warning"
                            type="text"
                            name="firstname"
                            value={
                              userdetails.firstname
                                ? userdetails.firstname.trim("")
                                : userdetails.firstname
                            }
                            onChange={handleUserChange}
                            className="editInput"
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
                                userdetails.firstname === "" ||
                                /^\s*$/.test(userdetails.firstname)
                              ) {
                                setAlert({
                                  ...alert,
                                  firstnameAlert: "Please enter firstname !!",
                                });
                              } else {
                                setAlert({
                                  ...alert,
                                  firstnameAlert: "",
                                });
                              }
                            }}
                          />
                        </Box>
                        {/* Show FirstName Alert */}
                        <p>{alert.firstnameAlert}</p>
                      </div>

                      <div className="outBox">
                        {/* Last Name Box */}
                        <Box className="editbox">
                          {/* Person Icon */}
                          <PersonIcon
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
                            label="Last Name"
                            color="warning"
                            type="text"
                            name="lastname"
                            value={
                              userdetails.lastname
                                ? userdetails.lastname.trim("")
                                : userdetails.lastname
                            }
                            onChange={handleUserChange}
                            className="editInput"
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
                                userdetails.lastname === "" ||
                                /^\s*$/.test(userdetails.lastname)
                              ) {
                                setAlert({
                                  ...alert,
                                  lastnameAlert: "Please enter lastname !!",
                                });
                              } else {
                                setAlert({
                                  ...alert,
                                  lastnameAlert: "",
                                });
                              }
                            }}
                          />
                        </Box>
                        {/* Show LastName Alert */}
                        <p>{alert.lastnameAlert}</p>
                      </div>

                      <div className="outBox">
                        {/* User Name Box */}
                        <Box className="editbox">
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
                            value={userdetails.username}
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
                        {/* None Alert Username */}
                        <p></p>
                      </div>

                      <div className="outBox">
                        {/* Email Id Box */}
                        <Box className="editbox">
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
                            value={
                              userdetails.email
                                ? userdetails.email.trim("")
                                : userdetails.email
                            }
                            onChange={handleUserChange}
                            className="editInput"
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
                                  userdetails.email
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
                      </div>

                      <div className="outBox">
                        {/* Country Box */}
                        <Box className="editbox">
                          {/* Flag Circle Icon */}
                          <FlagCircleIcon
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
                          {/* Select Form */}
                          <FormControl className="editInput">
                            {/* Select */}
                            <Select
                              id="demo-simple-select"
                              name="localValue"
                              value={localValue || "Choose Your Country"}
                              onChange={handleCountryChange}
                              variant="filled"
                              color="warning"
                              sx={{
                                color: "white",
                                fontWeight: "500",
                                letterSpacing: "0.5px",
                              }}
                              className="sel"
                              onBlur={() => {
                                if (localValue === "") {
                                  setAlert({
                                    ...alert,
                                    countryAlert: "Please select country !!",
                                  });
                                } else {
                                  setAlert({
                                    ...alert,
                                    countryAlert: "",
                                  });
                                }
                              }}
                            >
                              {/* Menu Item */}
                              <MenuItem
                                disabled
                                selected
                                value="Choose Your Country"
                              >
                                Choose Your Country
                              </MenuItem>
                              {countries?.map((option, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    value={
                                      option.label + "(+" + option.phone + ")"
                                    }
                                    sx={{
                                      height: "48px", // set the height to 48px
                                      display: "flex",
                                      alignItems: "center", // vertically center the content
                                      width: "fitContent",
                                    }}
                                  >
                                    {/* Country Flag Image Icon */}
                                    <img
                                      loading="lazy"
                                      style={{
                                        width: "25px",
                                        marginRight: "10px",
                                      }}
                                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                      alt=""
                                    />
                                    {option.label} ({option.code}) +
                                    {option.phone}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Box>
                        {/* Show Country Alert */}
                        <p>{alert.countryAlert}</p>
                      </div>

                      <div className="outBox">
                        {/* Phone Box */}
                        <Box className="editbox">
                          {/* Phone Icon */}
                          <PhoneIcon
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
                            label="Phone No."
                            color="warning"
                            type="tel"
                            name="phone"
                            value={
                              userdetails.phone
                                ? userdetails.phone.trim("")
                                : userdetails.phone
                            }
                            onChange={handleUserChange}
                            className="editInput"
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
                                !/^([+]?[0-9]{1,4}[ -]?)?([0-9]{10})$/.test(
                                  userdetails.phone
                                )
                              ) {
                                setAlert({
                                  ...alert,
                                  phoneAlert: "Invalid phone no. !!",
                                });
                              } else {
                                setAlert({
                                  ...alert,
                                  phoneAlert: "",
                                });
                              }
                            }}
                          />
                        </Box>
                        {/* Show Phone Alert */}
                        <p>{alert.phoneAlert}</p>
                      </div>

                      <div className="aboutBox">
                        {/* About Text */}
                        <Box className="editbox">
                          {/* Info Icon */}
                          <InfoIcon
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

                          <h5
                            style={{
                              color: "rgb(80 62 0)",
                              letterSpacing: "1px",
                              fontFamily:
                                "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            }}
                          >
                            ABOUT ME
                          </h5>
                        </Box>

                        {/* About Box */}
                        <Box className="editbox">
                          {/* Text Area */}
                          <TextareaAutosize
                            aria-label="maximum height"
                            placeholder="Write about yourself..."
                            name="about"
                            value={userdetails.about ? userdetails.about : ""}
                            style={{ width: "90%" }}
                            onChange={handleUserChange}
                            className="editInput"
                            variant="filled"
                            inputprops={{
                              style: {
                                color: "white",
                                fontWeight: "500",
                                letterSpacing: "0.5px",
                              },
                            }}
                          />
                        </Box>
                      </div>

                      {/* Save Button */}
                      <Button
                        variant="contained"
                        style={{
                          margin: "10px 0",
                          width: "200px",
                        }}
                        color="success"
                        type="submit"
                      >
                        SAVE
                      </Button>

                      {/* Delete Account Button */}
                      <Button
                        variant="contained"
                        style={{
                          margin: "10px 0",
                          width: "200px",
                        }}
                        color="warning"
                        onClick={handleClickOpenDialog}
                      >
                        DELETE ACCOUNT
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    {/* Other wise show skeleton structure */}
                    <form>
                      {/* Skeleton for Firstname */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for Lastname */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for Username */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for EmailID */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for Country */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for Phoneno. */}
                      <div className="outBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for About */}
                      <div className="aboutBox">
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="text"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "150px",
                              height: "60px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                        <Box className="editbox" sx={{ margin: "5px 0" }}>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              backgroundColor: "#b8b8b827",
                              width: "100%",
                              height: "80px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>
                      </div>

                      {/* Skeleton for Save Button */}
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          backgroundColor: "#b8b8b827",
                          width: "200px",
                          height: "35px",
                          borderTopLeftRadius: "10px",
                          borderRadius: "10px",
                          margin: "20px 0",
                        }}
                      />

                      {/* Skeleton for Delete Button */}
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          backgroundColor: "#b8b8b827",
                          width: "200px",
                          height: "35px",
                          borderTopLeftRadius: "10px",
                          borderRadius: "10px",
                          margin: "20px 0",
                        }}
                      />
                    </form>
                  </>
                )}

                {/* BackDrop for Loading */}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  {/* Circular Progress */}
                  <CircularProgress color="inherit" />
                </Backdrop>

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

                {/* Dialog Box for Delete User */}
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  {/* Dialog Title */}
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                  </DialogTitle>
                  {/* Dialog Content */}
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      If you want to delete your account then you can totally
                      lost your Account Details,Notes,Personal Details,your
                      followers etc.
                    </DialogContentText>
                  </DialogContent>
                  {/* Dialog Actions */}
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button
                      onClick={() => {
                        handleCloseDialog();
                        setOpen(true);
                        handleDeleteUser();
                      }}
                      autoFocus
                    >
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      ) : (
        {
          /* If Token and UserId not present then redirect SignIn */
        }(<SignIn />)
      )}
    </>
  );
};

export default Profile;
