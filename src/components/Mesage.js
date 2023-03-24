import React, {useContext} from 'react';
import '../styles/Message.css';
import Moment from 'react-moment';
import {AuthContext} from '../context/AuthContext'

export default function Message({message, own}){
    const {friends, user} = useContext(AuthContext)

    const getSendName = (message) => {
        const sender = friends.find(f => f._id === message?.sender)

        return sender
    }

    const sender = getSendName(message)

    return(
        <div className={own? "message own": "message"}>
            <div className="message_top">
                <p className={own? 'message_icon_own': 'message_icon'}><span className='message_icon_letter'>{own ? user?.username[0] : sender?.username[0]}</span></p>

                <p className="message_text">{message?.text}</p>
            </div>

            <div className="message_bottom">
                <Moment fromNow>{message?.createdAt}</Moment>
            </div>
        </div>
    )
}