import '../styles/TopBar.css';
import {Search, Person, Chat, Notifications, Home, Widgets} from '@material-ui/icons'
import {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import InboxItems from './InboxItems';

function TopBar(){
    const {user, notifications} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER 

    const show_notification = () => {
        var notification_container = document.getElementById("my_notifications");
        if(notification_container.className === "notification_box"){
            notification_container.className += " display_menu";
        }else{
            notification_container.className = "notification_box";
        }   
    }


    return (
        <div className="topbarContainer">
            <div className="topbar_left">
                <NavLink to={`/`} style={{textDecoration: "none"}}>
                    <span className="logo">Tribe Media</span>
                </NavLink>
            </div>

            <div className="topbar_center">
                <div className="search_bar_container">
                    <i><Search/></i>
                    <input type="text" placeholder='search for friend,post or video' className='search_input'/>
                </div>
            </div>

            <div className="topbar_right">
                <div className="topbar_links_container">
                    <div className="links_main_container" id='link_main_container'>
                        <div className="links_container">
                            <i className='topbar_link'><Home/></i>
                            <span className='topbar_link'><Widgets/></span>    
                        </div>
                    </div>                      
                </div>

                <div className="topbar_icons_container">
                    <div className='topbar_icon'>
                        <i><Person/></i>
                        <span className="icon_badge">1</span>
                    </div>

                    <NavLink to={`/messenger`} className="chat_icon">
                        <div className='topbar_icon'>
                            <i><Chat/></i>
                            <span className={notifications.length ? "icon_badge": "badge"}>{notifications?.length}</span>
                        </div>
                    </NavLink>

                    <div className='topbar_icon' onClick={show_notification}>
                        <i><Notifications/></i>
                        <span className={notifications.length  ? "icon_badge": "badge"}>1</span>
                    </div>

                    <NavLink to={`/profile/${user.username}`}>
                        <img src={user.profilePicture? PF + user.profilePicture : PF + "noAvatar.png"} alt={user.profilePicture} className="topbar_img" />
                    </NavLink>
                </div> 
            </div>

            <div className="notification_box" id='my_notifications'>
                {
                    notifications.length ? (
                        notifications.map((notification,key) => (
                            <InboxItems notification={notification} key={key}/>
                        ))
                    ): (
                        <InboxItems empty/>
                    )
                }
            </div>

        </div>
    )
}

export default TopBar;