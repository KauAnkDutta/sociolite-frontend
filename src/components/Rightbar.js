import React, { useEffect, useState, useContext } from "react";
import "../styles/Rightbar.css";
import { Users } from "../dummyData";
import Online from "./Online";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove, Chat } from "@material-ui/icons";
import {get_friends_suggestion} from '../apiCalls';
import gift from '../images/gift.png';

function Rightbar({ username }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const BE = process.env.BACKEND_API
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const get_viewing_profile_friends = async() => {
    try {
      if (user._id) {
        await axios.get(`https://api-sociolite.onrender.com/api/get/friends/${user._id}`)
        .then(res => {
          setFriends(res.data);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
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
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    get_viewing_profile_friends() 
  }, [user]);

  useEffect(() => {
    if (
      currentUser.following.includes(user._id) ||
      currentUser.followers.includes(user._id)
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [user._id]);

  const follow_unfollow_handler = () => {
    try {
      if (followed) {
        axios.put(`https://api-sociolite.onrender.com/api/user/${user?._id}/unfollow`, {
          userId: currentUser._id,
        })
        .then(res => {
          dispatch({
            type: "UNFOLLOW",
            payload: user._id,
          });
          get_viewing_profile_friends(); 
          get_friends_suggestion(currentUser, dispatch);
        }) 
      } else {
        axios.put(`https://api-sociolite.onrender.com/api/user/${user?._id}/follow`, { userId: currentUser?._id })
        .then(res => {
          dispatch({
            type: "FOLLOW",
            payload: user._id,
          });
          get_viewing_profile_friends(); 
          get_friends_suggestion(currentUser, dispatch);
        })
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await axios.get(
          `https://api-sociolite.onrender.com/api/conversation/${currentUser?._id}`
        );
        if (user?._id !== currentUser._id) {
          const exist = conversations.data.some((c) =>
            c.members.includes(user._id)
          );
          setCurrentChat(exist);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [currentUser, user]);

  const createChatHandler = async () => {
    const data = {
      senderId: currentUser._id,
      receiverId: user._id,
    };
    try {
      await axios.post(`https://api-sociolite.onrender.com/api/conversation`, data).then((res) => {
        if (res.status === 200) {
          window.location.href = "/messenger";
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    window.location.href = `/login`;
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="rightbar_birthday_container">
          <img src={gift} className="gift_icon" alt="gift-img" />
          <span className="birthday_text">
            <b>Jack Morestan</b> and <b>2 other friends</b> have a birthday
            today.
          </span>
        </div>

        <img
          src="https://images.pexels.com/photos/6476777/pexels-photo-6476777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Ad-img"
          className="rightbar_ad_img"
        />

        <h4 className="rightbat_title">Online Friends</h4>

        <ul className="rightbar_friends_list">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button
            className="right_follow_button"
            onClick={follow_unfollow_handler}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? (
              <Remove className="follow_btn" />
            ) : (
              <Add className="follow_btn" />
            )}
          </button>
        )}

        {user.username === currentUser.username && (
          <button onClick={() => logoutHandler()} className="logout_btn">
            Logout
          </button>
        )}

        {user._id !== currentUser._id && (
          <div className="chat_btn_container">
            {currentChat ? (
              <NavLink to={"/messenger"}>
                <Chat className="chatIcon" />
              </NavLink>
            ) : (
              <i onClick={() => createChatHandler()}>
                <Chat className="chatIcon" />
              </i>
            )}
          </div>
        )}
        <h4 className="rightbar_title">User information</h4>
        <div className="rightbar_info">
          <div className="rightbar_info_item">
            <span className="rightbar_info_key">City:</span>
            <span className="rightbar_info_value">{user.city}</span>
          </div>
          <div className="rightbar_info_item">
            <span className="rightbar_info_key">From:</span>
            <span className="rightbar_info_value">{user.from}</span>
          </div>
          <div className="rightbar_info_item">
            <span className="rightbar_info_key">Relationship:</span>
            <span className="rightbar_info_value">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>

          <h4 className="rightbar_title">User Friends</h4>

          <div className="rightbar_followings">
            {friends.map((friend) => (
              <div key={friend._id}>
                <div
                  className="rightbar_following"
                  onClick={() => {
                    navigate(`/profile/${friend.username}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "noAvatar.png"
                    }
                    alt="following_name"
                    className="rightbar_following_img"
                  />

                  <span className="rightbar_following_name">
                    {friend.username}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbar_wrapper">
        {username ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
