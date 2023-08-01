// React & UseState
import React, { useState } from "react";

// ViewNotes CSS
import "./ViewNotes.css";

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- MUI Icons ------------- */
// Share Icon
import ShareIcon from "@mui/icons-material/Share";
// Like Icon
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// Comment Icon
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// Expand More Icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// File Icon
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// File Download Icon
import FileDownloadIcon from "@mui/icons-material/FileDownload";
// Close Icon
import CloseIcon from "@mui/icons-material/Close";
// Tag Icon
import BookIcon from "@mui/icons-material/Book";
// Note Icon
import NoteIcon from "@mui/icons-material/Note";
// Notes Icon
import NotesIcon from "@mui/icons-material/Notes";
// Edit Icon
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// Delete Icon
import DeleteIcon from "@mui/icons-material/Delete";
// Whatsapp Icon
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// Facebook Icon
import FacebookIcon from "@mui/icons-material/Facebook";
// Twitter Icon
import TwitterIcon from "@mui/icons-material/Twitter";
// LinkedIn Icon
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// Email Icon
import EmailIcon from "@mui/icons-material/Email";
// Telegram Icon
import TelegramIcon from "@mui/icons-material/Telegram";
// Copy Icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// Done Icon
import DoneIcon from "@mui/icons-material/Done";
// Icon Button
import IconButton from "@mui/material/IconButton";
// Tooltip
import Tooltip from "@mui/material/Tooltip";

/* ------------- MUI Components ------------- */
// Box
import Box from "@mui/material/Box";
// Button
import { Button } from "@mui/material";
// Accordion
import Accordion from "@mui/material/Accordion";
// Accordion Summary
import AccordionSummary from "@mui/material/AccordionSummary";
// Accordion Details
import AccordionDetails from "@mui/material/AccordionDetails";
// Typography
import Typography from "@mui/material/Typography";
// Divider Icon
import { Divider } from "@mui/material";
// Paper
import Paper from "@mui/material/Paper";
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
// Chip
import Chip from "@mui/material/Chip";
// Circular Progress
import CircularProgress from "@mui/material/CircularProgress";
// BackDrop
import Backdrop from "@mui/material/Backdrop";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- React Share ------------- */
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

// Load Image File Picture & Create a Short File Name from LoadImage.js file
import { loadImage, truncateFileName } from "./LoadImage";

// Show File and Download File from ViewFiles.js file
import { showFile, downloadFile } from "./ViewFiles";

const ViewNotes = (props) => {
  // Take the from Params
  const { id } = useParams();

  // UseNavigate
  const navigate = useNavigate();

  const [pop, setPop] = useState(props.allNotes);

  // Reverse Note Date String
  const reverseDate = (str) => {
    const val = str.toString().substring(0, 10).split("-");
    let t = val[2] + "-" + val[1] + "-" + val[0];
    return t;
  };

  // Open File Dialog Box UseState
  const [openFileDialog, setOpenFileDialog] = useState(false);

  // Open File Dialog Box Func
  const handleClickOpenFileDialog = () => {
    setOpenFileDialog(true);
  };

  // Close File Dialog Box Func
  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };

  // Open Share Dialog Box UseState
  const [openShareDialog, setOpenShareDialog] = useState(false);

  // Open Share Dialog Box Func
  const handleClickOpenShareDialog = () => {
    setOpenShareDialog(true);
  };

  // Close Share Dialog Box Func
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  // Share Note Id UseState
  const [shareId, setShareId] = useState();

  // View File UseState
  const [file, setFile] = useState({
    name: "",
    buffer: "",
    type: "",
  });

  // Copy UseShareState
  const [copyShare, setCopyShare] = useState(false);

  // Handle Share Copy Url Func
  const handleShareCopyUrl = (url) => {
    const textToCopy = url;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopyShare(true);
        setTimeout(() => {
          setCopyShare(false);
        }, 1000);
      })
      .catch((error) => {
        // console.error("Error copying text:", error);
        setCopyShare(false);
      });
  };

  // Loading / Circular Progress Open Close UseState
  const [open, setOpen] = useState(false);

  // Note Delete Func
  const noteDelete = (note_id) => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Confirmation for Delete
        Swal.fire({
          title: "Do you want to delete the note?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpen(true);

            // Delete request for delete perticular note details
            axios
              .delete(`http://localhost:8000/api/notes/delete-note/${id}`, {
                headers: {
                  Authorization: `${Cookies.get("token")}`,
                },
                data: {
                  _id: note_id,
                },
              })
              .then((res) => {
                // console.log(res);
                setOpen(false);

                setPop(res.data);
              })
              .catch((err) => {
                // console.log(err);
                setOpen(false);

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
  };

  console.log(props);

  return (
    <>
      {/* If Pop Present i.e Notes Present then show It */}
      {pop && pop.notesArr.length !== 0 ? (
        pop.notesArr.map((n, index) => {
          return (
            // Per Note Box
            <div className="perNoteBox" key={n._id}>
              {/* Index Button for user and profClient*/}
              {props.share === "user" || props.share === "profClient" ? (
                <button className="indexNote">{index + 1}</button>
              ) : (
                // Notes Button
                <button className="indexNote">
                  <NotesIcon
                    sx={{
                      alignSelf: "center",
                      textAlign: "center",
                      color: "aliceblue",
                    }}
                  />
                </button>
              )}

              {/* Accordion */}
              <Accordion
                className="accr"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "rgb(26 26 26)",
                }}
              >
                {/* Accordion Summary */}
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{
                    backgroundColor: "rgb(26 26 26)",
                  }}
                >
                  {/* Typography for Title */}
                  <Typography
                    style={{
                      color: "aliceblue",
                      fontFamily:
                        '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                      fontSize: "1.1rem",
                      letterSpacing: "1px",
                      fontWeight: "550",
                    }}
                  >
                    {n.title}
                  </Typography>
                </AccordionSummary>
                {/* Divider */}
                <Divider
                  sx={{
                    backgroundColor: "rgb(178, 207, 216)",
                  }}
                />

                {/* Accordion Details */}
                <AccordionDetails>
                  {/* Typography for Description */}
                  <Typography
                    className="desc"
                    dangerouslySetInnerHTML={{ __html: n.description }}
                  ></Typography>

                  {/* Table for Date and View */}
                  <table
                    className="table table-light table-hover overflow-auto"
                    style={{
                      letterSpacing: "1px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    {/* Thead */}
                    <thead>
                      <tr>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    {/* Tbody */}
                    <tbody
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {/* Table Row */}
                      <tr>
                        {/* Table Data Created Date */}
                        <td>{reverseDate(n.createdAt)}</td>
                        {/* Table Data Updated Date */}
                        <td>{reverseDate(n.updatedAt)}</td>
                        {/* Table View Type */}
                        <td>{n.view}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* File Box for Note Files */}
                  <Box className="fileBox">
                    {/* File Heading*/}
                    <h5>
                      Note Files
                      {/* File Drive Icon */}
                      <InsertDriveFileIcon
                        sx={{
                          textAlign: "center",
                          fontSize: "1.2rem",
                          ml: 1,
                        }}
                      />
                    </h5>
                    {/* Divider */}
                    <Divider
                      sx={{
                        width: "100%",
                        backgroundColor: "yellow",
                      }}
                    />
                    {/* File Box Notes */}
                    <div className="fileBoxNotes">
                      {/* If files present then show it */}
                      {n.files.length !== 0 ? (
                        n.files.map((file) => {
                          return (
                            // Paper
                            <Paper
                              key={file._id}
                              elevation={3}
                              sx={{
                                width: "130px",
                                height: "200px",
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
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  color: "black",
                                  width: "100px",
                                  height: "30px",
                                }}
                              >
                                {truncateFileName(file.name, 7)}
                              </p>
                              {/* View Button for Show File */}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={async () => {
                                  setFile({
                                    name: file.name,
                                    buffer: file.data.data,
                                    type: file.contentType,
                                  });
                                  await handleClickOpenFileDialog();
                                }}
                              >
                                view
                              </Button>
                            </Paper>
                          );
                        })
                      ) : (
                        <>
                          {/* Heading for no Files */}
                          <h5
                            style={{
                              color: "aliceblue",
                              textAlign: "center",
                              textTransform: "capitalize",
                              letterSpacing: "1.5px",
                              fontFamily: "Times-new-Roman",
                              backgroundColor: "transparent",
                              boxShadow: "none",
                            }}
                          >
                            ~* No files have been added yet *~
                          </h5>
                        </>
                      )}
                    </div>
                  </Box>

                  {/* All Notes Tag Box */}
                  <Box className="allNotesTagBox">
                    {/* File Heading*/}
                    <h5>
                      Tags
                      {/* Book Icon */}
                      <BookIcon
                        sx={{
                          textAlign: "center",
                          fontSize: "1.2rem",
                          ml: 1,
                        }}
                      />
                    </h5>
                    {/* Divider */}
                    <Divider
                      sx={{
                        width: "100%",
                      }}
                    />
                    {/* Tag Box */}
                    <div className="tagBox">
                      {/* If tag present then show it */}
                      {n.tag.length !== 0 &&
                        n.tag.map((t, index) => {
                          return (
                            // Chip
                            <Chip
                              key={t._id}
                              label={t.tagname}
                              color={index % 2 === 0 ? "primary" : "warning"}
                              sx={{
                                p: 0.5,
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                cursor: "pointer",
                                m: 1,
                              }}
                              icon={
                                <NoteIcon
                                  sx={{
                                    textAlign: "center",
                                    fontSize: "1.2rem",
                                  }}
                                />
                              }
                            />
                          );
                        })}
                    </div>
                  </Box>

                  {/* Share Note Box */}
                  <div className="shareNote">
                    {/* Like Icon */}
                    <Tooltip title="Like">
                      <IconButton>
                        <ThumbUpOutlinedIcon
                          sx={{
                            color: "cyan",
                            cursor: "pointer",
                            m: 0.5,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    {/* Comment Icon */}
                    <Tooltip title="Comment">
                      <IconButton>
                        <ChatBubbleOutlineIcon
                          sx={{
                            color: "white",
                            cursor: "pointer",
                            m: 0.5,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    {/* Share Icon */}
                    {n.view === "PUBLIC" ? (
                      <>
                        <Tooltip title="Share">
                          <IconButton
                            onClick={() => {
                              setShareId(
                                `/profile-info/${props.allNotes.username}/${props.allNotes.user_id}/note/${n._id}`
                              );
                              handleClickOpenShareDialog();
                            }}
                          >
                            <ShareIcon
                              sx={{
                                color: "green",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Note Button */}
                    {props && props.share === "user" ? (
                      // If User
                      <>
                        {/* Edit Icon */}
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => {
                              navigate(
                                `/edit-note/${props.allNotes.user_id}/note/${n._id}`
                              );
                            }}
                          >
                            <ModeEditIcon
                              sx={{
                                color: "lightblue",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>

                        {/* Delete Icon */}
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              noteDelete(n._id);
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: "red",
                                cursor: "pointer",
                                m: 0.5,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      // If not user but profClient
                      // View Note Button
                      <>
                        {props.share === "profClient" ? (
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                              navigate(
                                `/profile-info/${props.allNotes.username}/${props.allNotes.user_id}/note/${n._id}`
                              );
                            }}
                            sx={{
                              m: 0.5,
                            }}
                          >
                            View Note
                          </Button>
                        ) : (
                          // Else show none
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })
      ) : (
        <>
          {/* Heading */}
          <h5
            style={{
              color: "aliceblue",
              textAlign: "center",
              textTransform: "capitalize",
              letterSpacing: "1.5px",
              fontFamily: "Times-new-Roman",
              margin: "30px 10px",
              backgroundColor: "rgba(0, 0, 0, 0.493)",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            No notes have been added yet (`~`)
          </h5>
        </>
      )}
      {/* Dialog Box for View Note FIles */}
      <Dialog
        open={openFileDialog}
        onClose={handleCloseFileDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxwidth={"sm"}
      >
        {/* Dialog Title */}
        <DialogTitle id="alert-dialog-title">{file && file.name}</DialogTitle>
        {/* Dialog Content */}
        <DialogContent dividers>
          {/* Dialog Content Text */}
          <DialogContentText
            component="span"
            id="alert-dialog-description"
            className="fileContent"
          >
            {file.name && file.buffer && file.type
              ? showFile(
                  file.buffer,
                  file.type,
                  file.name.split(".")[1].toLowerCase()
                )
              : ""}
          </DialogContentText>
        </DialogContent>
        {/* Dialog Actions */}
        <DialogActions>
          {/* File Download Icon */}
          <Tooltip title="Download">
            <IconButton
              onClick={() => {
                downloadFile(file.name, file.buffer, file.type);
              }}
              autoFocus
            >
              <FileDownloadIcon
                sx={{
                  color: "darkmagenta",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Close Icon */}
          <Tooltip title="Close">
            <IconButton onClick={handleCloseFileDialog} autoFocus>
              <CloseIcon
                sx={{
                  color: "red",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>

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

      {/* Dialog Box for Share Note */}
      <Dialog
        open={openShareDialog}
        onClose={handleCloseShareDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        {/* Dialog Title */}
        <DialogTitle id="alert-dialog-title">
          <div className="shareDialogBox">
            <h5>Share</h5>
            <Tooltip title="Close" sx={{ ml: 2 }}>
              <IconButton onClick={handleCloseShareDialog}>
                <CloseIcon
                  color="error"
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </DialogTitle>
        {/* Dialog Content */}
        <DialogContent dividers>
          {/* Dialog Content Text */}
          <DialogContentText component="span" id="alert-dialog-description">
            <input
              type="text"
              name="shareId"
              defaultValue={shareId}
              readOnly
              className="shareUrlBox"
            />
            <div className="shareIconBox">
              {/* Copy */}
              <div
                style={{
                  backgroundColor: "#C1C1C1",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                  borderStyle: "none",
                }}
                onClick={() => {
                  handleShareCopyUrl(shareId);
                }}
              >
                {copyShare ? (
                  <>
                    <Tooltip title="Copied" sx={{ m: 0.5 }}>
                      <IconButton>
                        <DoneIcon
                          sx={{
                            color: "white",
                            fontSize: "2rem",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Copy" sx={{ m: 0.5 }}>
                      <IconButton>
                        <ContentCopyIcon
                          sx={{
                            color: "white",
                            fontSize: "2rem",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
              {/* WP */}
              <WhatsappShareButton
                url={shareId}
                style={{
                  backgroundColor: "#26CC64",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <WhatsAppIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </WhatsappShareButton>
              {/* Facebook */}
              <FacebookShareButton
                url={shareId}
                style={{
                  backgroundColor: "#1674EA",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <FacebookIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </FacebookShareButton>
              {/* Telegram */}
              <TelegramShareButton
                url={shareId}
                style={{
                  backgroundColor: "#28A4E4",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <TelegramIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </TelegramShareButton>
              {/* LinkedIn */}
              <LinkedinShareButton
                url={shareId}
                style={{
                  backgroundColor: "#0077B7",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <LinkedInIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </LinkedinShareButton>
              {/* Email */}
              <EmailShareButton
                url={shareId}
                style={{
                  backgroundColor: "#E1574A",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <EmailIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </EmailShareButton>
              {/* Twitter */}
              <TwitterShareButton
                url={shareId}
                style={{
                  backgroundColor: "#36A0F7",
                  borderRadius: "50%",
                  margin: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
                }}
              >
                <TwitterIcon
                  sx={{
                    m: 1.3,
                    color: "white",
                    fontSize: "2.2rem",
                  }}
                />
              </TwitterShareButton>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewNotes;
