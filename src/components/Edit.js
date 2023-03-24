import "../styles/Edit.css";
import { Cancel } from "@material-ui/icons";
import { useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Edit({ setActive, active }) {
  const { user } = useContext(AuthContext);

  const UpdateForm = useRef();
  const BE = process.env.BACKEND_API;
  const [usernamefocused, setUsernameFocused] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const readValue = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!UpdateForm.current?.contains(event.target)) {
        setActive(false);
      }
    });
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: user._id,
      usename: userInfo.username,
      email: userInfo.email,
      password: userInfo.passwordAgain,
    };

    try {
      await axios
        .put(`https://api-sociolite.onrender.com/api/user/${user?._id}/update`, updateUser)
        .then((res) => {
          toast.success("Update Successful");
          setActive(false);
        });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="edit" ref={UpdateForm}>
      <i>
        <Cancel className="close-icon" onClick={(e) => setActive(!active)} />
      </i>
      <h1 className="edit-heading">Update Your Profile</h1>

      <form className="edit-form" onSubmit={updateHandler}>
        <div className="input-container">
          <label className="edit-label">Username</label>
          <input
            name="username"
            type="text"
            placeholder={user.username}
            className="edit-input"
            autoComplete="true"
            id="usename"
            value={
              userInfo?.username?.length > 0 ? userInfo?.username : user?.username
            }
            onChange={readValue}
            pattern="[A-Za-z0-9 ]{3,16}$"
            onBlur={() => setUsernameFocused(true)}
            focused={usernamefocused.toString()}
          />
          <span className="update-error-msg">
            Username should be 3-16 characters and shouldn't include any special
            character!
          </span>
        </div>

        <div className="input-container">
          <label className="edit-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder={user.email}
            className="edit-input"
            id="email"
            value={userInfo?.email?.length > 0 ? userInfo?.email : user?.email}
            onChange={readValue}
            onBlur={() => setEmailFocus(true)}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            focused={emailFocus.toString()}
          />

          <span className="update-error-msg">
            It should be a valid email address!
          </span>
        </div>

        <div className="input-container">
          <label className="edit-label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="edit-input"
            minLength="6"
            id="password"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
            value={userInfo.password}
            onChange={readValue}
            onBlur={() => setPasswordFocus(true)}
            focused={passwordFocus.toString()}
          />

          <span className="update-error-msg">
            Password should be 8-20 characters and include at least 1 letter, 1
            number and 1 special character!
          </span>
        </div>

        <div className="input-container">
          <label className="edit-label">Password Again</label>
          <input
            name="passwordAgain"
            type="password"
            placeholder="Password Again"
            className="edit-input"
            minLength="6"
            id="passwordAgain"
            pattern={userInfo.password}
            value={userInfo.passwordAgain}
            onChange={readValue}
            onBlur={() => setConfirmFocus(true)}
            focused={confirmFocus.toString()}
          />

          <span className="update-error-msg">Passwords don't match!</span>
        </div>

        <div className="button-container">
          <button className="update-btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
