import React from "react";
import "./UserNote.css"

/* ------------- Components ------------- */
// View Notes
import ViewNotes from "../../ViewNotes/ViewNotes";

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

const UserNote = (props) => {
  // UserAllNotesSkList for Storing Skeleton when no notes coming
  const userAllNotesSkList = () => {
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

  console.log(props);
  return (
    <>
      {/* If Token and UserId present then open following page */}
      {Cookies.get("token") && Cookies.get("userid") ? (
        <>
          {/* Single Note Details Main Box */}
          <div className="userAllNotesDetailBox">
            {/* If Note present then print it */}
            {props &&
            props.userAllNoteDetails ? (
              <>
                <h2>All Notes</h2>
                {/* View All Notes */}
                <ViewNotes
                  allNotes={props.userAllNoteDetails}
                  share={"profClient"}
                />
              </>
            ) : (
              <>
                {/* Otherwise call AllNotesSkList for showing skeleton*/}
                {userAllNotesSkList()}
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserNote;
