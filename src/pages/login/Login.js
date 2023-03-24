import React, { useRef, useContext } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

function Login() {
  const email = useRef();
  const password = useRef();
  const {isFetching, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-left">
          <img src={logo} alt="logo" className="login-logo"/>
          <p className="login-desc-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="login-text">Don't you have an account?</span>
          <Link to="/register" className="reg-link">
            <button className="login-register-btn">Register</button>
          </Link>
        </div>
        <div className="login-right">
          <h1 className="login-head">Login</h1>
          <form className="login-form">
            <input type="email" placeholder="Email" className="login-input" ref={email}/>
            <input type="password" placeholder="Password" className="login-input" ref={password}/>
            <button onClick={handleSubmit} className='login-btn'>
                {isFetching? <CircularProgress color="inherit" size="15px"/> : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

