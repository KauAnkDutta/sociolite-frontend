import '../styles/Comments.css';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';

export default function Comments({post, owner, showComments}){
    const {user, friends} =  useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const BE = process.env.BACKEND_API
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [updatedComments, setUpdatedComments] = useState([])

    const getFriend = (id)=>{
        const sender = friends?.find((friend) => friend?._id == id)
        return sender?.profilePicture
    }

    const getComments = async() => {
        try {
            await axios.get(`https://api-sociolite.onrender.com/api/post/comments/${post?._id}`)
            .then(res => {
                setComments(res.data)
                setUpdatedComments(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(post?._id && showComments){
            getComments()
        }
    }, [post?._id, showComments])

    const send_comment_handler = async(e) => {
        e.preventDefault()
        const data = {
            comment:{
                senderId: user?._id,
                comment: newComment
            }
        }

        try {
            await axios.put(`https://api-sociolite.onrender.com/api/post/comment/${post?._id}`, data)
            .then(res => {
                if(res.status === 200){
                    console.log("comment sent successfully")
                    setUpdatedComments([...updatedComments, data.comment])
                    setNewComment('')
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(comments?.length !== updatedComments?.length){
            getComments()
        }
    },[comments?.length, updatedComments?.length])

    return(
        <div className={`comments-main-container ${showComments? 'show': ''}`}>

            <div className="write">
                <img src={ PF + user?.profilePicture } className="commenter-image" alt='user-pic'/>

                <input type="text" placeholder="write a comment" className='comment-input'value={newComment} onChange={e => setNewComment(e.target.value)}/>

                <button className='send-comment-btn' onClick={send_comment_handler}>Post</button>
            </div>

            <div className="comments-box">

                {comments.map((comment, key) => (
                    <div className={owner? "comment": "comment"} key={key}>

                        <img src={user?._id === comment?.senderId ? PF + user?.profilePicture: PF + getFriend(comment?.senderId)} className="comment-owner-image"/>

                        <div className="info">
                            <p className="comment-owner-comment">{comment.comment}</p>
                        </div>

                        {/* <span className="comment-created-at">1 hour ago</span> */}
                    </div>
            ))}
            
            </div>

        </div>
    )
}