import React, {useContext} from "react";
import '../styles/Sidebar.css';
import CloseFriends from "./CloseFrineds";
import {AuthContext} from '../context/AuthContext';
import { FcBookmark,FcCalendar,FcBriefcase,FcConferenceCall,FcGraduationCap,FcFaq,FcVideoCall,FcComments,FcTimeline } from "react-icons/fc";


function Sidebar(){
    const {suggestions} = useContext(AuthContext);
    

    return(
        <div className="sideBar">
            <div className="sidebar_Wrapper">
                <ul className="sidebar_List">
                    <li className="sidebar_list_items">
                        <FcTimeline className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Feed</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcComments className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Chats</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcVideoCall className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Videos</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcConferenceCall className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Groups</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcBookmark className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Bookmarks</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcFaq className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Questions</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcBriefcase className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Jobs</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcCalendar className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Events</span>
                    </li>

                    <li className="sidebar_list_items">
                        <FcGraduationCap className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Courses</span>
                    </li>
                </ul>
                <button className="sidebar_button">Show More</button>

                <hr className="sidebar_hr" />
                <ul className="sidebar_friend_list">
                    {suggestions?.map((u) => (
                        <CloseFriends key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;