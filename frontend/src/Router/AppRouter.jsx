// React
import React from "react";

/* ------------- React Router Dom ------------- */
// Import Router,Route,Routes
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
// Import Dashboard Component
import Dashboard from "../Components/Dashboard/Dashboard";
// Import Search Friend Component
import SearchFriend from "../Components/SearchFriend/SearchFriend";
// Import All Notes Component
import AllNotes from "../Components/AllNotes/AllNotes";
// Import Add Notes Component
import AddNotes from "../Components/AddNotes/AddNotes";
// Import Edit Note Component
import EditNote from "../Components/EditNote/EditNote";
// Import Profile Info Component
import ProfileInfo from "../Components/ProfileInfo/ProfileInfo";
// Import User Single Note Component
import UserSingleNote from "../Components/UserSingleNote/UserSingleNote";
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
          {/* Dashboard Route */}
          <Route exact path="/dashboard/:id" element={<Dashboard />} />
          {/* Search Friend Route for Responsive */}
          <Route exact path="/search-friend/:id" element={<SearchFriend />} />
          {/* All Notes Route */}
          <Route exact path="/all-notes/:id" element={<AllNotes />} />
          {/* Add Notes Route */}
          <Route exact path="/add-notes/:id" element={<AddNotes />} />
          {/* Edit Note Route */}
          <Route
            exact
            path="/edit-note/:id/note/:note_id"
            element={<EditNote />}
          />
          {/* All User Profile Info Route */}
          <Route
            exact
            path="/profile-info/:username/:id"
            element={<ProfileInfo />}
          />
          {/* All User Single Note Route */}
          <Route
            exact
            path="/profile-info/:username/:id/note/:note_id"
            element={<UserSingleNote />}
          />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
