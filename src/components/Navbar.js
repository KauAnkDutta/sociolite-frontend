import "../styles/Navbar.css";
import { Link } from "react-router-dom";

import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import { CiGrid41 } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { MdOutlineNotificationsNone } from "react-icons/md";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import InboxItems from "./InboxItems";

export default function Navbar() {
  const { user, notifications } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [showNotification, setShowNotification] = useState(false)

  const onClickHandler = () => {
    setShowNotification(!showNotification)
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={'../images/logo.png'} alt="logo" className="logo" />
        </Link>

        <div className="left-icons">
          <HiOutlineHome className="left-icon" />
          <CiGrid41 className="left-icon" />
        </div>

        <div className="search">
          <BiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="right">
        <GoPerson className="icon" />

        <Link to={`/messenger`}>
          <HiOutlineMail className="icon-messenger" />
        </Link>

        <div className="notification-icon">
          <MdOutlineNotificationsNone className="icon-notyfy" onClick={onClickHandler}/>
          <span className={notifications.length > 0 ? "badge badge-show": "badge"}>{notifications?.length}</span>
        </div>

        <div className={showNotification? "notification-box active": "notification-box"}>

          {notifications.length ? (
            notifications.map((notification, key) => (
              <InboxItems notification={notification} key={key} />
            ))
          ) : (
            <InboxItems empty />
          )}
        </div>

        <div className="user">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                ? PF + user.profilePicture
                : PF + "noAvatar.png"
              }
              alt="user-image"
              className="user-image"
              />
          </Link>

          <span className="userName">{user?.username}</span>
        </div>
      </div>
    </div>
  );
}
