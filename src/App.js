import React, { useContext, useEffect } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { get_friends_suggestion } from "./apiCalls";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, dispatch } = useContext(AuthContext);
  const BE = process.env.BACKEND_API

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user?._id) {
          const friendList = await axios.get(`https://api-sociolite.onrender.com/api/get/friends/${user?._id}`);
          dispatch({ type: "ADDFRIENDS", payload: friendList.data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    get_friends_suggestion(user, dispatch);
  }, [user]);

  return (
    <BrowserRouter>

      <ToastContainer
        autoClose={3500}
        position={"bottom-center"}
        theme={"dark"}
        style={{ width: "auto" }}
      />

      <Routes>
        <Route path={`/`} element={user ? <Home /> : <Register />} />
        <Route
          path={`/login`}
          element={user ? <Navigate to={`/`} /> : <Login />}
        />
        <Route path={`/register`} element={<Register />} />
        <Route path={`/profile/:username`} element={<Profile />} />
        <Route path={`/messenger`} element={!user ? <Home /> : <Messenger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
