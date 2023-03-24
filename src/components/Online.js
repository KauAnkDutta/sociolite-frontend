import React from 'react';
import '../styles/Online.css';

function Online({user}){
    return (
        <li className="rightbar_online_friends">
            <div className="online_frnd_img_container">
                <img src={user.profilePicture} alt="profile-pic" className="online_user_pic"/>

                <span className="online"></span>
            </div>

            <span className="online_user">
                {user.username}
            </span>
        </li>
    )
}

export default Online;