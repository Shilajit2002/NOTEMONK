// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* ------------- Components ------------- */
// Import Navbar Component
import Navbar from "../Components/Navbar/Navbar";
// Import Home Component
import Home from "../Components/Home/Home";
// Import SignUp Component
import SignUp from "../Components/SignUp/SignUp";
// Import SignIn Component
import SignIn from "../Components/SignIn/SignIn";
// Import Profile Component
import Profile from "../Components/Profile/Profile";
// Import NotFound Component
import NotFound from "../Components/NotFound/NotFound";

const AppRouter = () => {
  return (
    <>
      <Router>
        {/* Navbar Route */}
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route exact path="/" element={<Home />} />
          {/* SignUp Route */}
          <Route exact path="/signup" element={<SignUp />} />
          {/* SignIn Route */}
          <Route exact path="/signin" element={<SignIn />} />
          {/* Profile Route */}
          <Route exact path="/profile/:id" element={<Profile />} />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
