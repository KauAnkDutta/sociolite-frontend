import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

function Register() {
  const [usernamefocused, setUsernameFocused] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [hometownFocus, setHometownFocus] = useState(false);

  

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    city: "",
    hometown: "",
  });

  const readValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const new_user = {
        username: user.username,
        email: user.email,
        password: user.confirmpassword,
        city: user.city,
        from: user.hometown,
      };
  
      try {
        await axios.post(`https://api-sociolite.onrender.com/api/userRegister`, new_user).then((res) => {
          if (res.status === 200) {
            toast.success("SignUp Successful");
            window.location.href = "/login";
          }
        });
      } catch (error) {
        toast.error(error.response.data.msg);
      }
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="register_left">
          <img
            src={logo}
            alt="logo"
            className="register-page-logo"
          />
          <span className="register_desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ratione
            magnam magni adipisci earum fugit minus. Labore aut autem ex placeat
            libero adipisci corrupti, quisquam, possimus velit, eos eum tempore.
          </span>

          <span className="reg-txt">Do you have an account?</span>

          <Link to={`/login`} className="register_register_button">
            Login
          </Link>
        </div>

        <div className="register_right">
          <h1 className="register-heading">Register</h1>
          <form className="register_form_box" onSubmit={handleSubmit}>
            <div className="register_input_container">
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                className="register_input"
                value={user.username}
                onChange={readValue}
                required
                pattern="[A-Za-z0-9 ]{3,16}$"
                onBlur={() => setUsernameFocused(true)}
                autoComplete="true"
                focused={usernamefocused.toString()}
              />

              <span className="error-msg">
                Username should be 3-16 characters and shouldn't include any
                special character!
              </span>
            </div>

            <div className="register_input_container">
              <input
                type="email"
                placeholder="Email"
                className="register_input"
                value={user.email}
                onChange={readValue}
                id="email"
                name="email"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                onBlur={() => setEmailFocus(true)}
                focused={emailFocus.toString()}
                required
              />
              <span className="error-msg">
                It should be a valid email address!
              </span>
            </div>

            <div className="register_input_container">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                className="register_input"
                value={user.password}
                onChange={readValue}
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                required
                onBlur={() => setPasswordFocus(true)}
                focused={passwordFocus.toString()}
              />
              <span className="error-msg">
                Password should be 8-20 characters and include at least 1
                letter, 1 number and 1 special character!
              </span>
            </div>

            <div className="register_input_container">
              <input
                type="password"
                placeholder="Password Again"
                name="confirmpassword"
                id="confirmpassword"
                onChange={readValue}
                className="register_input"
                value={user.confirmpassword}
                pattern={user.password}
                onBlur={() => setConfirmFocus(true)}
                focused={confirmFocus.toString()}
                required
              />
              <span className="error-msg">Passwords don't match!</span>
            </div>

            <div className="register_input_container">
              <input
                type="text"
                placeholder="City"
                className="register_input"
                id="city"
                name="city"
                onChange={readValue}
                value={user.city}
                onBlur={() => setCityFocus(true)}
                focused={cityFocus.toString()}
                required
              />
              <span className="error-msg">Enter The City</span>
            </div>

            <div className="register_input_container">
              <input
                type="text"
                placeholder="Hometown"
                className="register_input"
                onChange={readValue}
                value={user.hometown}
                id="hometown"
                name="hometown"
                onBlur={() => setHometownFocus(true)}
                focused={hometownFocus.toString()}
                required
              />
              <span className="error-msg">Enter Your Hometown</span>
            </div>

            <div>
              <button className="register_button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

// Connect with friends and the world around you on Tribe Media
