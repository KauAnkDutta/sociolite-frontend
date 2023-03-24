import React, {useContext} from 'react';
import '../styles/ChatOnline.css';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';


export default function ChatOnline({onlineUsers, setCurrentChat}){
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const BE = process.env.BACKEND_API

    const handleOnclick = async(c_user) => {
        try {
            const res = await axios.get(`https://api-sociolite.onrender.com/api/find/${user?._id}/${c_user?._id}`)
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div className="chat_online">
            {
                onlineUsers.map((u) => (
                    <div className="chat_online_friend_container" key={u._id} onClick={() => handleOnclick(u)}>
                        <div className="chat_online_img_container">
                            <img src={u.profilePicture? PF + u.profilePicture: PF + "noAvatar.png"} alt={u.profilePicture} className='chat_online_image'/>

                            <div className="chat_online_badge"></div>

                        </div>

                        <span className="chat_online_name">{u.username}</span>
                    </div>
                ))
            }
        </div>
    )
}