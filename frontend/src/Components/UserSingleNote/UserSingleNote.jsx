import React from "react";

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

const UserSingleNote = () => {
  const { username, id, note_id } = useParams();

  return <div></div>;
};

export default UserSingleNote;
