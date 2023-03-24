import React, {useContext, useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';
import Rightbar from '../../components/Rightbar';
import Navbar from '../../components/Navbar';
import {CSSTransition} from 'react-transition-group';
import {AuthContext} from '../../context/AuthContext';

import './Home.css';

function Home(){
    const {user} = useContext(AuthContext)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        if(user){
            setLogged(true)
        }
    }, [user])


    return(
        <>
            <Navbar/>
            <div className="homeContainer">
                <CSSTransition in={logged} timeout={800} classNames="sidebar">
                    <Sidebar/>
                </CSSTransition>

                <CSSTransition in={logged} timeout={800} classNames="feed">
                    <Feed/>
                </CSSTransition>

                <CSSTransition in={logged} timeout={800} classNames="rightbar">
                    <Rightbar/>
                </CSSTransition>
            </div>
        </>
    )
}

export default Home;