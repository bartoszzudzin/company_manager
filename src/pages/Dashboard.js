import React, {useState, useEffect} from 'react';
import '../styles/Dashboard.css';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import { NavLink } from 'react-router-dom';

const Dashboard = () =>{

    // const [isLogged, setIsLogged] = useState(false);
    // const [userName, setUserName] = useState(false);

    // useEffect(() => {
    //     checkSession();    
    // }, [isLogged]);

    // const checkSession = () => {
    //     const request = new Request('http://localhost:5000/checkSession', {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: new Headers({'Content-Type': 'application/json'}),
    //     })
    //     fetch(request)
    //     .then(response => {
    //         if (response.ok) {
    //             setIsLogged(true);
    //             return response.json();
    //         } else {
    //             console.log("Użytkownik nie zalogowany");
    //             window.location.href = "/";
    //         }
    //     })
    //     .then(data =>{
    //         setUserName(data ? data.name : null);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // };

    const title = <p>Dashboard of <strong>Company Manager</strong>.</p>
    return(
        // <>
        //     {isLogged ?
            <div className='dashboard'>
                <TopBar 
                title={title}
                // userName={userName}
                />
                <div className='frontPanel'>
                    <NavBar />
                    <div className='window withPadding'>
                        <i className="bi bi-buildings icon"></i>
                    </div>
                </div>
            </div>
            // : 
        // <div className='WelcomePage'>
        //     <div className='center'>
        //         <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
        //         Użytkownik nie zalogowany
        //         </div>
        //         <br />
        //         <NavLink to="/"><button type="submit" className="btn btn-primary">Go to Sign in</button></NavLink>
        //     </div>
        // </div>
        //     }
        // </>
    );
}

export default Dashboard;