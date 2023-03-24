import React, {useContext, useState, useEffect, useRef} from 'react';
import Navbar from '../../components/Navbar';
import './Messenger.css';
import Conversation from '../../components/Conversation';
import Message from '../../components/Mesage';
import ChatOnline from '../../components/ChatOnline';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {io} from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../animations/typing.json';


function Messenger(){
    const [conversations , setConversations] = useState([]);
    const BE = process.env.BACKEND_API
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {user, notifications,dispatch, friends} = useContext(AuthContext);
    const socket = useRef()
    const scrollRef = useRef();
    const [onlineUsers, setOnlineUsers] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [messageLength, setMessageLength] = useState(0)

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        socket.current = io("https://api-sociolite.onrender.com/")
        socket.current.on("getMessage", (data) =>{   
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                convoId: data.convoId,
                quan: data.quan,
                createdAt: Date.now()
            }) 
        })
        console.log("welcome")
        socket.current.on("typing", () => setIsTyping(true))
        socket.current.on("stop typing", () => setIsTyping(false))
    }, [socket.current])


    useEffect(() => {
        if(currentChat !== null){
            if(notifications.length >= 1){
                onchangeHan(currentChat?._id)
            }  
        }else{
            socket.current.on("getMessage", data => {
                dispatch({type: "ADDNOTIFICATION", payload: data})
            })
        }
    },[currentChat, notifications.length])


    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    

    useEffect(() => {
        socket.current.emit('addUser', user?._id)
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(friends.filter((f) => users.some((u) => u.userId === f._id)))
        })
    }, [user, friends])

    useEffect(() => {
        const getConversation = async() => {
            try {
                const res = await axios.get(`https://api-sociolite.onrender.com/api/conversation/${user?._id}`)
                setConversations(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getConversation();
    }, [])

    const getMessages = async() => {
        try {
            const res = await axios.get(`https://api-sociolite.onrender.com/api/message/${currentChat?._id}`)
            setMessages(res.data)
            setMessageLength(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(currentChat?._id){
            getMessages()
        }
    }, [currentChat]) //change here

    useEffect(() => {
        if(messageLength < messages?.length){
            getMessages()
        }
    }, [messageLength, messages.length])
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat._id,
        }

        const receiverId = currentChat.members.find(mem => mem !== user?._id)
        const convoId = currentChat._id

        socket.current.emit("sendMessage", {
            senderId: user?._id,
            receiverId, 
            text: newMessage,
            convoId,
            quan: 1,
        })

        try {
            const res = await axios.post(`https://api-sociolite.onrender.com/api/message/`, message)
            setMessages([...messages, res.data])
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        const receiverId = currentChat?.members.find(mem => mem !== user?._id)

        if(!typing){
            setTyping(true)
            socket.current.emit("typing", receiverId)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 4000;
        setTimeout(() => {
            var timenow = new Date().getTime();
            var timeDifference = timenow - lastTypingTime;

            if(timeDifference >= timerLength && typing){
                socket.current.emit("stop typing", receiverId)
                setTyping(false)
            }
        }, timerLength)
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const onchangeHan = (convoId) => {
        dispatch({type:"REMOVENOTIFICATION", payload: convoId})
    }

    return (
        <>
            <Navbar/>
            <div className="messenger">
                <div className="chat_menu">
                    <div className="chat_menu_wrapper">
                        <input type="text" placeholder='Search for friends' className="chat_menu_input" />
                        {conversations.map((convo) => (
                            <div onClick={() => setCurrentChat(convo)} key={convo._id}>
                                <Conversation conversation={convo} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat_box">
                    <div className="chat_box_wrapper">
                        {
                            currentChat ? ( 
                            <>
                                <div className="chat_box_top">
                                    {
                                        messages.map((m, key) => (
                                            <div key={key} ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="chat_box_bottom">
                                    {
                                        isTyping? <div className='lottie_annimation'><Lottie options={defaultOptions} width={78}/></div> : <></>
                                    }
                                    <textarea className="chat_message_input" placeholder='write something....' onChange={typingHandler} value={newMessage}></textarea>
                                    <button className="chat_submit_button" onClick={handleSubmit}>Send</button>
                                </div>
                            </>
                            ):(
                                <span className='no_conversation_text'>Open a conversation to start a chat</span>
                            )

                        }
                    </div>
                </div>

                <div className="chat_online">
                    <div className="chat_online_wrapper">
                        <ChatOnline onlineUsers={onlineUsers} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;

