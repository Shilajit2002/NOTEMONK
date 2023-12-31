// React & UseState & UseEffect
import React, { useState, useEffect } from "react";

// EditNote CSS
import "./EditNote.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- Backend Url ------------- */
// Base URL
import baseUrl from "../../Helper/BaseUrl";

/* ------------- React Router Dom ------------- */
// UseNavigate && UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Component ------------- */
// TextField
import TextField from "@mui/material/TextField";
// Box
import Box from "@mui/material/Box";
// Form Control Label
import FormControlLabel from "@mui/material/FormControlLabel";
// Switch
import Switch from "@mui/material/Switch";
// Style
import { styled } from "@mui/material/styles";
// Fab
import Fab from "@mui/material/Fab";
// Paper
import Paper from "@mui/material/Paper";
// Button
import Button from "@mui/material/Button";
// Form Control
import FormControl from "@mui/material/FormControl";
// Chip
import Chip from "@mui/material/Chip";
// AutoComplete
import Autocomplete from "@mui/material/Autocomplete";
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

/* ------------- MUI Icons ------------- */
// Description Icon
import DescriptionIcon from "@mui/icons-material/Description";
// Visibility Icon
import VisibilityIcon from "@mui/icons-material/Visibility";
// Visibility Off Icon
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// View Icon
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
// Add Drive Icon
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
// Add Icon
import AddIcon from "@mui/icons-material/Add";
// Delete Icon
import DeleteIcon from "@mui/icons-material/Delete";
// Label Icon
import LabelIcon from "@mui/icons-material/Label";
// Preview Icon
import PreviewIcon from "@mui/icons-material/Preview";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

/* ------------- Alerts ------------- */
// Snack Bar
import Snackbar from "@mui/material/Snackbar";
// Alert
import MuiAlert from "@mui/material/Alert";
// Swal
import Swal from "sweetalert2";

/* ------------- React Rich Text Editor ------------- */
import TextEditor from "./TextEditor";

// Load Image File Picture & Create a Short File Name from LoadImage.js file
import { loadImage, truncateFileName } from "../ViewNotes/LoadImage";

const EditNote = () => {
  // Use Navigate
  const navigate = useNavigate();

  // Take Id and NoteId from Params
  const { id, note_id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

  // Edit Note UseState
  const [noteEdit, setNoteEdit] = useState();

  //  Select Files UseState
  const [selectedFiles, setSelectedFiles] = useState();

  // Switch Value UseState
  const [switchValue, setSwitchValue] = useState();

  // UserEffect for get a perticular notes of the user
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
          .get(`${baseUrl}/api/notes/note/${userid}/${note_id}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // console.log(res.data);
            // Set the Notes Details of the User
            setNoteEdit({
              _id: res.data._id,
              title: res.data.title,
              description: res.data.description,
              view: res.data.view,
              tag: res.data.tag,
              like: res.data.like,
              comments: res.data.comments,
            });

            // Set the Notes Files Details of the User
            setSelectedFiles(res.data.files);

            // Set the Switch
            setSwitchValue(res.data.view === "PUBLIC");
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
      // If userid and params id not match
      else {
        Swal.fire({
          icon: "warning",
          title: `You can only view your own account !!`,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
      }
    }
  }, [id, note_id]);

  // React IOS Switch Style Func
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(25px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "rgb(4, 90, 6)" : "#045505",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#83072c" : "#3f0614",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  // Handle File Select Func
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    let a = 0;

    //  Store the total size of the files
    for (let j = 0; j < files.length; j++) {
      a += files[j].size;
    }

    //  Check if the total size of the files are less than equal to 3MB then store
    if (a / (1024 * 1024).toFixed(2) <= 3) {
      // Filter out files that are already selected
      const newFiles = files.filter((file) => {
        return !selectedFiles.some(
          (selectedFile) => selectedFile.name === file.name
        );
      });

      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...newFiles,
      ]);
    }
  };

  //  Handle File Delete Func
  const handleFileDelete = (fileName) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.name !== fileName)
    );

    // Reset the value of the file input element
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  // Handle Note Title Change Func
  const handleNoteTitleChange = (e) => {
    const { name, value } = e.target;
    setNoteEdit({
      ...noteEdit,
      [name]: value,
    });
  };

  // Handle Note Description Change Func
  const handleNoteDescChange = (value) => {
    setNoteEdit({
      ...noteEdit,
      description: value,
    });
  };

  //  Handle Note Switch Change Func
  const handleNoteSwitchChange = (event) => {
    setSwitchValue(event.target.checked);

    setNoteEdit({
      ...noteEdit,
      view: event.target.checked ? "PUBLIC" : "PRIVATE",
    });
  };

  //  Handle Note Tag Change Func for UseState
  const handleNoteTagChange = (event, value) => {
    setNoteEdit({
      ...noteEdit,
      tag: value,
    });
  };

  //  Tag Names UseState
  const [names, setNames] = useState([]);

  // UseEffect for Get All Tags from Database
  useEffect(() => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        //  Get all Tagnames from Backend
        axios
          .get(`${baseUrl}/api/tags/alltagnames/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the Tagnames
            setNames(res.data);
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
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
      }
    }
  }, [id, navigate]);

  //  Unique Name for Autocomplete
  const uniqueNames = Array.from([
    ...new Set(names.map((name) => name.tagname)),
  ]);

  //  Is Option Value check the tagname with the currect select autocomplete tagname
  const isOptionEqualToValue = (option, value) =>
    option?.tagname === value?.tagname;

  // Snackbar Alert UseState
  const [snack, setSnack] = useState({
    open: false,
    message: "Please fill the form !!",
    severity: "warning",
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

  // Loading / Circular Progress Open Close UseState
  const [open, setOpen] = useState(false);

  // Open Preview Dialog Box UseState
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  // Open Preview Dialog Box Func
  const handleClickOpenPreviewDialog = () => {
    setOpenPreviewDialog(true);
  };

  // Close Preview Dialog Box Func
  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  // EditNotesSkList for Storing Skeleton when no notes coming
  const EditNotesSkList = () => {
    const arr = (
      <div className="addNoteForm">
        {/* Skeleton for Heading */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 2,
            width: 150,
            height: 30,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for Title */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            width: "100%",
            height: 60,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for Description */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            width: "100%",
            height: "50vh",
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for Button */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 2,
            width: 100,
            height: 40,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for View */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            width: "100%",
            height: 60,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for File */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            width: "100%",
            height: 100,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for Tags */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            width: "100%",
            height: 60,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />

        {/* Skeleton for Button */}
        <Skeleton
          variant="rectangular"
          sx={{
            m: 2,
            width: 100,
            height: 40,
            backgroundColor: "#0000003b",
            borderRadius: "5px",
          }}
          edge="end"
        />
      </div>
    );

    return arr;
  };

  // Handle Form Submit Func
  const handleEditNote = (event) => {
    // Stop Reloading the Page when Submiting the Form
    event.preventDefault();

    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Check if the form is fill or not
        if (
          noteEdit.tag.length !== 0 &&
          noteEdit.title !== "" &&
          noteEdit.title.split(" ") !== "" &&
          noteEdit.description !== "" &&
          noteEdit.description.split(" ") !== "" &&
          noteEdit.view !== ""
        ) {
          setOpen(true);

          // Send to the Backend of Edit Note data
          axios
            .patch(`${baseUrl}/api/notes/edit-note/${userid}`, noteEdit, {
              headers: {
                Authorization: `${token}`,
              },
            })
            .then((req) => {
              const formData = new FormData();

              // if (selectedFiles && selectedFiles.length !== 0) {
              selectedFiles.forEach((file, index) => {
                if (file._id) {
                  const bytes = new Uint8Array(file.data.data);

                  const blobData = new Blob([bytes]);

                  // Create a custom File object with the blob data and other required properties
                  const customFile = new File([blobData], file.name, {
                    type: file.contentType,
                  });

                  formData.append("files", customFile);
                } else {
                  formData.append("files", file);
                }
              });

              // Send data backend for Note File Edit
              axios
                .patch(
                  `${baseUrl}/api/notes/edit-note-files/${userid}/${note_id}`,
                  formData,
                  {
                    headers: {
                      Authorization: `${token}`,
                    },
                  }
                )
                .then((res) => {
                  setOpen(false);

                  // If Success
                  Swal.fire({
                    icon: "success",
                    title: `Note has been sucessfully updated !!`,
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate(`/all-notes/${userid}`);
                    } else {
                      navigate(`/all-notes/${userid}`);
                    }
                  });
                })
                .catch((err) => {
                  setOpen(false);

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
            })
            .catch((err) => {
              setOpen(false);

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
          // Show Warning
          if (noteEdit.title === "" || noteEdit.title.split(" ") === "") {
            setSnack({
              open: true,
              message: "Please Enter Title !!",
              severity: "warning",
            });
          } else if (
            noteEdit.description === "" ||
            noteEdit.description.split(" ") === ""
          ) {
            setSnack({
              open: true,
              message: "Please Enter Description !!",
              severity: "warning",
            });
          } else if (noteEdit.tag.length === 0) {
            setSnack({
              open: true,
              message: "Please Select Tags !!",
              severity: "warning",
            });
          }
        }
      }
      // If userid and params id not match
      else {
        Swal.fire({
          icon: "warning",
          title: `You can only view your own account !!`,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
      }
    }
  };

  // console.log(selectedFiles);
  return (
    <>
      {/* If Token and UserId present then open dashboard */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Edit Note Box */}
          <div className="editNoteBox">
            {noteEdit ? (
              <>
                {/* Add Note Form Box */}
                <div className="addNoteForm">
                  {/* Heading */}
                  <h2>Edit Note</h2>
                  {/* Form */}
                  <form onSubmit={handleEditNote}>
                    {/* Title Box */}
                    <Box className="NoteBox">
                      {/* Text Field */}
                      <TextField
                        label="Title ✏"
                        color="secondary"
                        type="text"
                        name="title"
                        value={noteEdit.title}
                        onChange={handleNoteTitleChange}
                        className="noteInput"
                        variant="filled"
                        InputProps={{
                          style: {
                            color: "black",
                            fontWeight: "600",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </Box>

                    {/* Description Box */}
                    <Box className="NoteBox" sx={{ flexDirection: "column" }}>
                      {/* Description Heading*/}
                      <h5>
                        Description{" "}
                        <DescriptionIcon sx={{ textAlign: "center" }} />
                      </h5>
                      {/* React Rich Text Editor for Description*/}
                      <TextEditor
                        value={noteEdit.description}
                        onChange={handleNoteDescChange}
                      />
                      {/* Preview Button */}
                      <Button
                        variant="contained"
                        color="warning"
                        style={{
                          marginTop: "10px",
                          color: "white",
                          fontWeight: "500",
                          letterSpacing: "1px",
                        }}
                        onClick={handleClickOpenPreviewDialog}
                      >
                        {/* Preview Icon */}
                        <PreviewIcon sx={{ mr: 1 }} /> Preview
                      </Button>
                    </Box>

                    {/* View Box */}
                    <Box className="NoteBox" sx={{ flexDirection: "column" }}>
                      {/* View Heading*/}
                      <h5>
                        View <ViewComfyAltIcon sx={{ textAlign: "center" }} />
                      </h5>
                      {/* View Note Input Box */}
                      <div className="viewNoteInput">
                        {/* Private Heading */}
                        <h6
                          style={{
                            color:
                              noteEdit.view === "PRIVATE" ? "white" : "#006ab1",
                          }}
                        >
                          PRIVATE{" "}
                          <VisibilityOffIcon sx={{ textAlign: "center" }} />
                        </h6>
                        {/* Switch for Toogle */}
                        <FormControlLabel
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "10px",
                          }}
                          control={
                            <IOSSwitch
                              // sx={{ m: 1 }}
                              checked={switchValue}
                              onChange={handleNoteSwitchChange}
                            />
                          }
                          label=""
                        />
                        {/* Public Heading */}
                        <h6
                          style={{
                            color:
                              noteEdit.view === "PUBLIC" ? "white" : "#006ab1",
                          }}
                        >
                          PUBLIC <VisibilityIcon sx={{ textAlign: "center" }} />
                        </h6>
                      </div>
                    </Box>

                    {/* File Box */}
                    <Box className="NoteBox" sx={{ flexDirection: "column" }}>
                      {/* File Heading*/}
                      <h5>
                        Upload Note Files
                        <AddToDriveIcon sx={{ textAlign: "center" }} />
                      </h5>
                      {/* View Note Input Box */}
                      <div className="viewNoteInput">
                        {/* Upload Box */}
                        <div className="uploadBox">
                          {/* Para */}
                          <p style={{ color: "red", fontWeight: "500" }}>
                            Upload files within 3 mb.
                          </p>
                          {/* Clear Button */}
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => {
                              setSelectedFiles([]);
                            }}
                          >
                            CLEAR ALL
                          </Button>
                        </div>
                        {/* Select Files Show */}
                        {selectedFiles &&
                          selectedFiles.map((file, index) => (
                            // Paper
                            <Paper
                              key={index}
                              elevation={3}
                              sx={{
                                width: "130px",
                                height: "190px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                padding: "10px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                margin: "10px",
                              }}
                            >
                              {/* Files Logo */}
                              <img
                                src={loadImage(
                                  file.name
                                    .split(".")
                                    [
                                      file.name.split(".").length - 1
                                    ].toLowerCase()
                                )}
                                alt=""
                                style={{
                                  width: "110px",
                                  height: "110px",
                                  backgroundColor: "white",
                                }}
                              />
                              {/* Files Name */}
                              <p
                                style={{
                                  // overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  color: "black",
                                  width: "100px",
                                }}
                              >
                                {truncateFileName(file.name, 7)}
                              </p>
                              {/* Delete that selected file */}
                              <DeleteIcon
                                onClick={() => handleFileDelete(file.name)}
                                sx={{ color: "red", cursor: "pointer" }}
                              />
                            </Paper>
                          ))}
                        {/* Input File Tag */}
                        <input
                          type="file"
                          multiple
                          id="file"
                          onChange={handleFileSelect}
                          style={{ display: "none" }}
                        />
                        {/* Label for File */}
                        <label htmlFor="file">
                          {/* Fab Tag */}
                          <Fab
                            component="span"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            sx={{ zIndex: 1 }}
                          >
                            {/* Add Icon */}
                            <AddIcon />
                          </Fab>
                        </label>
                      </div>
                    </Box>

                    {/* Tag Box */}
                    <Box className="NoteBox" sx={{ flexDirection: "column" }}>
                      {/* Tag Heading*/}
                      <h5>
                        Add Tags
                        <LabelIcon sx={{ textAlign: "center" }} />
                      </h5>
                      {/* Tag Note Input Box */}
                      <div className="viewNoteInput">
                        {/* Form Control */}
                        <FormControl sx={{ m: 1, width: "95%" }}>
                          {/* AutoComplete */}
                          <Autocomplete
                            multiple
                            id="tags-autocomplete"
                            options={uniqueNames.map((tagname) => ({
                              tagname,
                            }))} // Create objects with unique tagname
                            getOptionLabel={(option) => option?.tagname || ""}
                            value={noteEdit.tag}
                            onChange={handleNoteTagChange}
                            renderInput={(params) => (
                              // Text Field
                              <TextField
                                {...params}
                                variant="outlined"
                                color="secondary"
                                label="Tags"
                                placeholder="Select Tags"
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                // Chip
                                <Chip
                                  key={`${option.tagname}-${index}`}
                                  label={option.tagname}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            // Is Option Value Fnction Call
                            isOptionEqualToValue={isOptionEqualToValue} // Custom equality check
                          />
                        </FormControl>
                      </div>
                    </Box>

                    {/* Add Note Submit Button */}
                    <Button type="submit" variant="contained" color="success">
                      Update Note
                    </Button>
                  </form>

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
                    open={openPreviewDialog}
                    onClose={handleClosePreviewDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxwidth={"sm"}
                  >
                    {/* Dialog Title */}
                    <DialogTitle id="alert-dialog-title">
                      {"Preview Description"}
                    </DialogTitle>
                    {/* Dialog Content */}
                    <DialogContent dividers>
                      {/* Dialog Content Text */}
                      <DialogContentText
                        id="alert-dialog-description"
                        dangerouslySetInnerHTML={{
                          __html: noteEdit.description,
                        }}
                        style={{
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      ></DialogContentText>
                    </DialogContent>
                    {/* Dialog Actions */}
                    <DialogActions>
                      {/* Ok Button */}
                      <Button
                        onClick={handleClosePreviewDialog}
                        autoFocus
                        color="error"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </>
            ) : (
              <>
                {/* Otherwise call EditNotesSkList for showing skeleton*/}
                {EditNotesSkList()}
              </>
            )}
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

export default EditNote;
