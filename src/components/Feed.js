import React, {useState, useEffect, useContext} from "react";
import '../styles/Feed.css';
import Share from "./Share";
import Post from "./Post";
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

function Feed({username}){
    const BE = process.env.BACKEND_API;
    const [posts, setPost] = useState([]);
    const {user} = useContext(AuthContext);
    const [updatedPost, setUpdatedPost] = useState([])

    const fetchPosts = async() => {
        const res = username ? await axios.get(`https://api-sociolite.onrender.com/api/profile/` + username) : await axios.get(`https://api-sociolite.onrender.com/api/timeline/` + user._id )
            
        setPost(res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))

        setUpdatedPost(res?.data)
    } 

    useEffect(() => {
        if(username || user?._id){
            fetchPosts()
        } 
    }, [username, user?._id])

    useEffect(() => {
        if(posts.length !== updatedPost.length){
            fetchPosts()
        }
    }, [posts.length, updatedPost.length])

    return(
        <div className="feed_section">
            <div className="feed_wrapper">
                {(!username || username === user.username )&& <Share updatedPost={updatedPost} setUpdatedPost={setUpdatedPost}/>}
                {posts.map((p) => (
                    <Post post={p} key={p._id}/>
                )) } 
            </div>
        </div>
    )
}

export default Feed;