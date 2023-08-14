import React, {useState, useEffect} from 'react';
import '../styles/Dashboard.css';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';

const Logout = () =>{
    const title = <p>Wylogowanie.</p>
    return(
        <div className='dashboard'>
            <TopBar title={title}/>
            <div className='frontPanel'>
                <NavBar />
                <div className='window'>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
}

export default Logout;