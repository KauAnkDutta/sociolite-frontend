import React, { useState, useEffect, useContext, useRef } from "react";
import "../profile/Profile.css";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Cancel, InsertPhotoOutlined, PhotoCamera } from "@material-ui/icons";
import { MdModeEdit } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import Edit from "../../components/Edit";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BE = process.env.BACKEND_API
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [file, setFile] = useState(null);
  const [dp, setDp] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const UpdateForm = useRef();

  const preview_selected_display_image = (event) => {
    setDp(event.target.files[0]);
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImgSrc(event.target.result);
    };

    reader.readAsDataURL(selectedImage);
  };

  const preview_selected_cover_image = (event) => {
    setFile(event.target.files[0]);
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImgSrc(event.target.result);
    };

    reader.readAsDataURL(selectedImage);
  };

  // Function To Get The User Updated Data
  const get_user_updated_data = async () => {
    await axios.get(`https://api-sociolite.onrender.com/api/user?userId=${currentUser?._id}`).then((res) => {
      dispatch({ type: "UPDATEUSERINFO", payload: res.data });
    });
  };

  const get_user_profile_info = async () => {
    await axios
      .get(`https://api-sociolite.onrender.com/api/user?username=${username}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_user_profile_info();
  }, [username]);

  const showUpdateForm = () => {
    setActive(!active);
    window.scrollTo({ top: 346, behavior: "smooth" });
  };

  const uploadHandler = async () => {
    if (file && user._id === currentUser._id) {
      const userUpdate = {
        userId: currentUser._id,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        userUpdate.coverPicture = fileName;
        dispatch({
          type: "ADDCOVERPICTURE",
          payload: fileName,
        });

        try {
          await axios.post(`https://api-sociolite.onrender.com/api/upload`, data);
          setFile(null);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        setLoading(true);
        await axios
          .put(`https://api-sociolite.onrender.com/api/user/${currentUser?._id}/update`, userUpdate)
          .then((res) => {
            setLoading(false);
            get_user_updated_data();
            get_user_profile_info();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const uploadDpHandler = async () => {
    if (dp && user._id === currentUser._id) {
      const userUpdate = {
        userId: currentUser._id,
      };
      if (dp) {
        const data = new FormData();
        const fileName = Date.now() + dp.name;
        data.append("name", fileName);
        data.append("file", dp);
        userUpdate.profilePicture = fileName;
        try {
          await axios.post(`https://api-sociolite.onrender.com/api/upload`, data);
          setDp(null);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        setLoading(true);
        await axios
          .put(`https://api-sociolite.onrender.com/api/user/${currentUser?._id}/update`, userUpdate)
          .then((res) => {
            setLoading(false);
            get_user_updated_data();
            get_user_profile_info();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="Profile">
        <Sidebar />
        <div className="profile_right">
          <div className="profile_right_top">
            <div className="profile_cover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.png"
                }
                alt={user.coverPicture}
                className={
                  user.coverPicture ? "profile_cover_img" : "no_cover_image"
                }
              />

              {user._id === currentUser._id && (
                <label className="upload_cover_img" htmlFor="file">
                  <InsertPhotoOutlined className="upload_icon" />
                  <span className="upload_cover_tex">Upload</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={preview_selected_cover_image}
                  />
                </label>
              )}

              <img
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt="profile-pic"
                className="profile_user_img"
              />
              {user._id === currentUser._id && (
                <label htmlFor="dp">
                  <PhotoCamera className="upload_dp_icon" />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="dp"
                    accept=".png, .jpeg, .jpg"
                    onChange={preview_selected_display_image}
                  />
                </label>
              )}
            </div>

            {dp && (
              <div className="cover_Img_Container">
                <img className="cov_Img" src={imgSrc} alt="coverImage" />

                <Cancel
                  className="cover_Cancel_Img"
                  onClick={() => {
                    setDp(null);
                    setImgSrc("");
                  }}
                />

                <button
                  className="upload_btn"
                  onClick={() => uploadDpHandler()}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size="15px" />
                  ) : (
                    "Add Picture"
                  )}
                </button>
              </div>
            )}

            {file && (
              <div className="cover_Img_Container">
                <img className="cov_Img" src={imgSrc} alt="*" />
                <Cancel
                  className="cover_Cancel_Img"
                  onClick={() => {
                    setFile(null);
                    setImgSrc("");
                  }}
                />
                <button className="upload_btn" onClick={() => uploadHandler()}>
                  {loading ? (
                    <CircularProgress color="inherit" size="15px" />
                  ) : (
                    "Add Cover"
                  )}
                </button>
              </div>
            )}

            <div className="profile_info">
              <h4 className="profile_info_name">
                {user.username}{" "}
                {user.username === currentUser.username && (
                  <i onClick={showUpdateForm}>
                    <MdModeEdit className="edit-info-icon" />
                  </i>
                )}
              </h4>
              <span className="profile_info_desc">{user.desc}</span>
            </div>
          </div>

          {user.username === currentUser.username && (
            <div
              className={
                active ? "update-section show-update" : "update-section"
              }
            >
              <Edit setActive={setActive} active={active} />
            </div>
          )}

          <div className="profile_right_bottom">
            <Feed username={username} />
            <Rightbar username={username} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
