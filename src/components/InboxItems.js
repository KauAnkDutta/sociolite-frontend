import React, {useContext} from "react";
import '../styles/InboxItems.css'; 
import {get_sender_name} from '../ExtraFunctions';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


export default function InboxItems({empty, notification}){
    const {friends} = useContext(AuthContext);
    const navigate = useNavigate();

    return(
        <div className ="inbox_container">
            {
                empty? (
                    <span className='no_notification'>No New Notification</span>
                ):(
                    <span className="notification_text" onClick={() => navigate(`/messenger`)}> {notification?.quan} Messages from {get_sender_name(notification?.senderId, friends)}</span>  
                )
            }
        </div>
    )
}

