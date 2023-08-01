// React & UseState & UseEffect
import React, { useState, useEffect } from "react";
// UserSingleNote CSS
import "./UserSingleNote.css";

/* ------------- Components ------------- */
// SignIn Page
import SignIn from "../SignIn/SignIn";
// View Notes
import ViewNotes from "../ViewNotes/ViewNotes";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseParams
import { useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

/* ------------- Alerts ------------- */
// Swal
import Swal from "sweetalert2";

/* ------------- MUI Structure ------------- */
// Skeleton
import Skeleton from "@mui/material/Skeleton";

const UserSingleNote = () => {
  // Take id and note_id from params
  const { id, note_id } = useParams();

  // Take the token and userid if it is not peresent redirect to SignIn page
  if (!(Cookies.get("token") && Cookies.get("userid"))) {
    Cookies.remove("token");
    Cookies.remove("userid");
    window.location.href = "/signin";
  }

  // Single Note UseState
  const [singleNote, setSingleNote] = useState();

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
          `http://localhost:8000/api/allUser/note-user/${userid}/${id}/${note_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          // Set the Notes Details of the User
          setSingleNote({
            notesArr: [res.data[0]],
            ...res.data[1],
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
  }, [id, note_id]);

  // SingleNotesSkList for Storing Skeleton when no notes coming
  const SingleNotesSkList = () => {
    const arr = (
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
    );
    return arr;
  };

  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Single Note Details Main Box */}
          <div className="singleNotesDetailBox">
            {/* If Note present then print it */}
            {singleNote && singleNote.notesArr.length !== 0 ? (
              <>
                {/* View All Notes */}
                <ViewNotes allNotes={singleNote} share={"client"} />
              </>
            ) : (
              <>
                {/* Otherwise call AllNotesSkList for showing skeleton*/}
                {SingleNotesSkList()}
              </>
            )}
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

export default UserSingleNote;
