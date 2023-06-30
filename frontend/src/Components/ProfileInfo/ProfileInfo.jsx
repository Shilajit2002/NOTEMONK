import React from 'react'

/* ------------- React Router Dom ------------- */
// UseNavigate & UseParams
import { useNavigate, useParams } from "react-router-dom";

const ProfileInfo = () => {
  const {username,id}=useParams();

  console.log(username,id);
  return (
    <div>
      
    </div>
  )
}

export default ProfileInfo
