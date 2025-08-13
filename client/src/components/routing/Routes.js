import React from "react";
import { Route } from "react-router-dom"; 

//
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import Alert from "../components/layout/Alert";
import Dashboard from "../components/dashboard/Dashboard";
import CreateProfile from "../components/profile-forms/CreateProfile";
import EditProfile from "../components/profile-forms/EditProfile";
import AddExperience from "../components/profile-forms/AddExperience";
import AddEducation from "../components/profile-forms/AddEducation";
import Profiles from "../components/profiles/Profiles";
import Profile from "../components/profile/Profile";
import Posts from "../components/posts/Posts";
import Post from "../components/post/Post";
import NotFound from "../components/layout/NotFound";
import PrivateRoute from "../components/routing/PrivateRoute";

const Routes = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/add-education" element={<AddEducation />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routes;
