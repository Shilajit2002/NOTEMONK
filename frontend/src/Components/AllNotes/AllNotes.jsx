// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// AllNote CSS
import "./AllNotes.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";
// View Notes
import ViewNotes from "../ViewNotes/ViewNotes";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- Backend Url ------------- */
// Base URL
import baseUrl from "../../Helper/BaseUrl";

/* ------------- React Router Dom ------------- */
// UseParams
import { useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Components ------------- */
// Button
import { Button } from "@mui/material";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

/* ------------- MUI Components ------------- */
// Circular Progress
import CircularProgress from "@mui/material/CircularProgress";
// BackDrop
import Backdrop from "@mui/material/Backdrop";

const AllNotes = () => {
  // Take the from Params
  const { id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

  // All Notes UseState
  const [allNotes, setAllNotes] = useState();

  // UserEffect for get all the notes of the user
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
          .get(`${baseUrl}/api/notes/all-note/${userid}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // Set the Notes Details of the User
            // console.log(res.data);
            setAllNotes(res.data);
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
  }, [id]);

  // AllNotesSkList for Storing Skeleton when no notes coming
  const AllNotesSkList = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        // React Fragment
        <React.Fragment key={`ntrag-${i}`}>
          <div className="perNoteBox">
            {/* Skeleton for Button */}
            <Skeleton
              variant="rectangular"
              sx={{
                mr: 2,
                width: 30,
                height: 50,
                backgroundColor: "#0000003b",
                borderRadius: "5px",
              }}
              edge="end"
            />

            {/* Skeleton for Notes */}
            <Skeleton
              variant="rectangular"
              sx={{
                ml: 2,
                width: "90%",
                height: 50,
                backgroundColor: "#0000003b",
                borderRadius: "5px",
              }}
              edge="end"
            />
          </div>
        </React.Fragment>
      );
    }

    return arr;
  };

  // Loading / Circular Progress Open Close UseState
  const [open, setOpen] = useState(false);

  // All Note Delete Func
  const allNoteDelete = () => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    // If token and userid present
    if (token && userid) {
      // If userid and params id match
      if (userid === id) {
        // Confirmation for Delete
        Swal.fire({
          title: "Do you want to delete all the notes?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpen(true);

            // Delete request for delete all notes details
            axios
              .delete(`${baseUrl}/api/notes/delete-all-note/${id}`, {
                headers: {
                  Authorization: `${Cookies.get("token")}`,
                },
              })
              .then((res) => {
                // console.log(res);
                setOpen(false);

                setAllNotes(res.data);
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

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* All Note Details Main Box */}
          <div className="allNotesDetailBox">
            {/* Heading */}
            <h2>My Notes</h2>
            {/* If Note present then print it */}
            {allNotes && allNotes.notesArr.length !== 0 ? (
              <>
                {/* Delete All Note Button */}
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mt: 5,
                  }}
                  onClick={() => {
                    allNoteDelete();
                  }}
                >
                  Delete All
                </Button>
                {/* View All Notes */}
                <ViewNotes allNotes={allNotes} share={"user"} />
              </>
            ) : (
              <>
                {/* If no notes found then print it */}
                {allNotes && allNotes.notesArr.length === 0 ? (
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
                        alignSelf: "center",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      No notes have been added yet (`~`)
                    </h5>
                  </>
                ) : (
                  <>
                    {/* Skeleton for Delete All Button */}
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        mt: 5,
                        width: 120,
                        height: 40,
                        backgroundColor: "#0000003b",
                        borderRadius: "5px",
                      }}
                      edge="end"
                    />
                    {/* Otherwise call AllNotesSkList for showing skeleton*/}
                    {AllNotesSkList()}
                  </>
                )}
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

export default AllNotes;
