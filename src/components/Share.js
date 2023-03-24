import React, {useContext, useRef, useState} from 'react';
import '../styles/Share.css';
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

function Share({setUpdatedPost, updatedPost}){
    const {user} = useContext(AuthContext)
    const BE = process.env.BACKEND_API
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef()
    const [shareFile, setShareFile] = useState(null)
    const [previewImgSrc, setPreviewImgSrc] = useState("")

    const preview_selected_image = (event) => {
        setShareFile(event.target.files[0]);
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event){
            setPreviewImgSrc(event.target.result);
        }

        reader.readAsDataURL(selectedFile)
    }

    const cancel_share_handler = () => {
        setShareFile(null)
        setPreviewImgSrc("")
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(shareFile){
            const data = new FormData();
            const fileName = Date.now() + shareFile.name;
            data.append("name", fileName);
            data.append("file", shareFile);
            newPost.img = fileName;

            
            try {
                await axios.post(`https://api-sociolite.onrender.com/api/upload`, data)
                console.log("formData: ", data)
                setShareFile(null)
                setPreviewImgSrc("")
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post(`https://api-sociolite.onrender.com/api/create/post`, newPost)
            desc.current.value = ""
            setUpdatedPost([...updatedPost, newPost])
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="share">
            <div className="share_container">
                <div className="share_top">
                    <img src={user.profilePicture? PF + user.profilePicture : PF + "noAvatar.png"} alt={user.profilePicture} className='share_profile_pic'/>
                    <input type="text" placeholder={"What's in your mind "+ user.username + "?"} className="share_input" ref={desc}/>
                </div>

                <hr className="share_hr" />
                
                {previewImgSrc && (
                    <div className="share_Img_Container">
                        <img className="share_Img" src={previewImgSrc} alt="share_img" />
                        <Cancel className="share_Cancel_Img" onClick={cancel_share_handler} />
                    </div>
                )}

                <form className="share_bottom" onSubmit={submitHandler}>
                    <div className="share_options">
                        <label htmlFor='file' className="share_option">
                            <PermMedia htmlColor='tomato' className='share_icon'/>
                            <span className="share_icon_text">
                                Photo or Video
                            </span>
                            <input style={{display:"none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={preview_selected_image}/>
                        </label>
                        <div className="share_option">
                            <Label htmlColor='blue' className='share_icon'/>
                            <span className="share_icon_text">
                                Tag
                            </span>
                        </div>
                        <div className="share_option">
                            <Room htmlColor='green' className='share_icon'/>
                            <span className="share_icon_text">
                               Location
                            </span>
                        </div>
                        <div className="share_option">
                            <EmojiEmotions htmlColor='goldenrod' className='share_icon'/>
                            <span className="share_icon_text">
                                Feelings
                            </span>
                        </div>
                    </div>

                    <button className="share_btn" type='submit'>
                        Share
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Share;