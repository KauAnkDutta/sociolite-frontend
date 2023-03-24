import React from "react";
import '../styles/CloseFrineds.css';
import {useNavigate} from 'react-router-dom';

function CloseFriends({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate()

    return(
        <div onClick={() => navigate(`/profile/${user?.username}`)}>
            <li className="sidebar_friend">
                <img src={user?.profilePicture? PF + user?.profilePicture: PF + "noAvatar.png"} alt="name" className="sidebar_friend_img" />

                <span className="sidebar_friend_name">{user?.username}</span>
            </li>
        </div>
    )
}

export default CloseFriends;
// to={`/profile/${user?.username}`}