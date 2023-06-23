// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// AddNotes CSS
import "./AddNotes.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";

/* ------------- File Logos ------------- */
import MP3 from "./Assets/mp3File.png";
import PNG from "./Assets/pngFIle.png";
import JPG from "./Assets/jpgFile.jpg";
import JPEG from "./Assets/jpegFile.jpg";
import GIF from "./Assets/gif.png";
import PDF from "./Assets/pdf.png";
import DOC from "./Assets/word.png";
import XL from "./Assets/excel.png";
import PPT from "./Assets/ppt.png";
import ZIP from "./Assets/zip.png";
import TXT from "./Assets/txt.png";
import NULL from "./Assets/null.png";
import C from "./Assets/c.png";
import CP from "./Assets/cplusplus.png";
import CS from "./Assets/c#.png";
import JAVA from "./Assets/java.png";
import PY from "./Assets/py.png";
import JS from "./Assets/js.jpeg";
import TS from "./Assets/ts.png";
import JSX from "./Assets/jsx.png";
import SQL from "./Assets/sql.webp";
import HTML from "./Assets/html.png";
import CSS from "./Assets/css.png";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

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

/* ------------- Alerts ------------- */
// Snack Bar
import Snackbar from "@mui/material/Snackbar";
// Alert
import MuiAlert from "@mui/material/Alert";
// Swal
import Swal from "sweetalert2";

/* ------------- React Rich Text Editor ------------- */
// Ract Quill
import ReactQuill from "react-quill";
// React Quil CSS
import "react-quill/dist/quill.snow.css";

const AddNotes = () => {
  // Use Navigate
  const navigate = useNavigate();

  // Take the from Params
  const { id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

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

  // React React Text Editor Modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ direction: "rtl" }], // text direction
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ code: "" }],
      ["clean"],
    ],
  };

  // React Rich Text Editor Formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align", // corrected from "direction"
    "script", // corrected from "script"
    "font",
    "size",
    "color",
    "background",
    "list",
    "ordered",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "clean",
  ];

  // Image Files Types
  const fileTypes = [
    { img: `${MP3}`, mimeType: "audio/mpeg" },
    { img: `${JPG}`, mimeType: "image/jpg" },
    { img: `${JPEG}`, mimeType: "image/jpeg" },
    { img: `${PNG}`, mimeType: "image/png" },
    { img: `${GIF}`, mimeType: "image/gif" },
    { img: `${PDF}`, mimeType: "application/pdf" },
    { img: `${DOC}`, mimeType: "application/msword" },
    { img: `${DOC}`, mimeType: "application/msword" },
    {
      img: `${DOC}`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { img: `${XL}`, mimeType: "application/vnd.ms-excel" },
    { img: `${XL}`, mimeType: "application/vnd.ms-excel" },
    {
      img: `${XL}`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { img: `${PPT}`, mimeType: "application/vnd.ms-powerpoint" },
    { img: `${PPT}`, mimeType: "application/vnd.ms-powerpoint" },
    {
      img: `${PPT}`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
    { img: `${ZIP}`, mimeType: "application/zip" },
    { img: `${ZIP}`, mimeType: "application/x-zip-compressed" },
    { img: `${TXT}`, mimeType: "text/plain" },
    { img: `${JAVA}`, mimeType: "java" },
    { img: `${C}`, mimeType: "c" },
    { img: `${CP}`, mimeType: "cpp" },
    { img: `${PY}`, mimeType: "text/x-python" },
    { img: `${JSX}`, mimeType: "jsx" },
    { img: `${CS}`, mimeType: "cs" },
    { img: `${TS}`, mimeType: "video/vnd.dlna.mpeg-tts" },
    { img: `${JS}`, mimeType: "text/javascript" },
    { img: `${SQL}`, mimeType: "sql" },
    { img: `${HTML}`, mimeType: "text/html" },
    { img: `${CSS}`, mimeType: "text/css" },
    { img: `${NULL}`, mimeType: "" },
  ];

  // Load Image File Logo as per their Types
  const loadImage = (type) => {
    for (let i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i].mimeType === type) {
        return fileTypes[i].img;
      }
    }
    return fileTypes[fileTypes.length - 1].img;
  };

  //  Select Files UseState
  const [selectedFiles, setSelectedFiles] = useState([]);

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
  };

  //  Truncate File Name Func
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }

    //  Split the file name with the extension and show the name of the file in a proper way
    const fileExt = fileName.split(".").pop();
    const fileNameWithoutExt = fileName.substring(
      0,
      fileName.length - fileExt.length - 1
    );
    const truncatedName = `${fileNameWithoutExt.substring(
      0,
      Math.floor(maxLength / 2)
    )}...${fileNameWithoutExt.substring(
      fileNameWithoutExt.length - Math.ceil(maxLength / 2)
    )}`;

    return `${truncatedName}.${fileExt}`;
  };

  // Add Note UseState
  const [note, setNote] = useState({
    title: "",
    description: "",
    view: "PUBLIC",
    tag: [],
  });

  // Handle Note Title Change Func
  const handleNoteTitleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // Handle Note Description Change Func
  const handleNoteDescChange = (value) => {
    setNote({
      ...note,
      description: value,
    });
  };

  // Switch Value UseState
  const [switchValue, setSwitchValue] = useState(true);

  //  Handle Switch Change Func
  const handleSwitchChange = (event) => {
    setSwitchValue(event.target.checked);

    setNote({
      ...note,
      view: event.target.checked ? "PUBLIC" : "PRIVATE",
    });
  };

  //  Handle Change Func for UseState
  const handleChange = (event, value) => {
    setNote({
      ...note,
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
          .get(`http://localhost:8000/api/tags/alltagnames/${userid}`, {
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
            window.location.href = `/add-notes/${userid}`;
          } else {
            window.location.href = `/add-notes/${userid}`;
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

  // Handle Form Submit Func
  const handleAddNote = (event) => {
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
          note.tag.length !== 0 &&
          note.title !== "" &&
          note.title.split(" ") !== "" &&
          note.description !== "" &&
          note.description.split(" ") !== "" &&
          note.view !== ""
        ) {
          setOpen(true);

          // Send to the Backend of Add Note data
          axios
            .post(`http://localhost:8000/api/notes/add-note/${userid}`, note, {
              headers: {
                Authorization: `${token}`,
              },
            })
            .then((req) => {
              if (selectedFiles !== []) {
                const formData = new FormData();
                selectedFiles.forEach((file, index) => {
                  formData.append("files", file);
                });

                // Send data backend for Note File upload
                axios
                  .post(
                    `http://localhost:8000/api/notes/add-note-files/${userid}`,
                    formData,
                    {
                      headers: {
                        Authorization: `${Cookies.get("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    setOpen(false);

                    // If Success
                    Swal.fire({
                      icon: "success",
                      title: `Note has been sucessfully uploaded !!`,
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
              } else {
                setOpen(false);

                // If Success then Set Note Null
                Swal.fire({
                  icon: "success",
                  title: `Note has been sucessfully uploaded !!`,
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate(`/all-notes/${userid}`);
                  } else {
                    navigate(`/all-notes/${userid}`);
                  }
                });
              }
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
          if (note.title === "" || note.title.split(" ") === "") {
            setSnack({
              open: true,
              message: "Please Enter Title !!",
              severity: "warning",
            });
          } else if (
            note.description === "" ||
            note.description.split(" ") === ""
          ) {
            setSnack({
              open: true,
              message: "Please Enter Description !!",
              severity: "warning",
            });
          } else if (note.tag.length === 0) {
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
            window.location.href = `/add-notes/${userid}`;
          } else {
            window.location.href = `/add-notes/${userid}`;
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
          {/* Main Add Note Box */}
          <div className="addNoteBox">
            {/* Add Note Form Box */}
            <div className="addNoteForm">
              {/* Heading */}
              <h2>Create your Note</h2>
              {/* Form */}
              <form onSubmit={handleAddNote}>
                {/* Title Box */}
                <Box className="NoteBox">
                  {/* Text Field */}
                  <TextField
                    label="Title ✏"
                    color="secondary"
                    type="text"
                    name="title"
                    value={note.title}
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
                    Description <DescriptionIcon sx={{ textAlign: "center" }} />
                  </h5>
                  {/* React Rich Text Editor for Description*/}
                  <ReactQuill
                    theme="snow"
                    className="noteInput"
                    style={{ borderRadius: "0" }}
                    modules={modules}
                    formats={formats}
                    value={note.description}
                    onChange={handleNoteDescChange}
                  />
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
                        color: note.view === "PRIVATE" ? "white" : "#006ab1",
                      }}
                    >
                      PRIVATE <VisibilityOffIcon sx={{ textAlign: "center" }} />
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
                          onChange={handleSwitchChange}
                        />
                      }
                      label=""
                    />
                    {/* Public Heading */}
                    <h6
                      style={{
                        color: note.view === "PUBLIC" ? "white" : "#006ab1",
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
                    {selectedFiles.map((file) => (
                      // Paper
                      <Paper
                        key={file.name}
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
                          src={
                            file.type !== ""
                              ? loadImage(file.type)
                              : loadImage(file.name.split(".")[1])
                          }
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
                        options={uniqueNames.map((tagname) => ({ tagname }))} // Create objects with unique tagname
                        getOptionLabel={(option) => option?.tagname || ""}
                        value={note.tag}
                        onChange={handleChange}
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
                  Add Note
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

export default AddNotes;
