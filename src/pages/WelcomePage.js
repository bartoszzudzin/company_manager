import React, {useState, useEffect} from 'react';
import '../styles/WelcomePage.css';
import logo from '../images/Logo_transparent.png';

const WelcomePage = () =>{

    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState(null);
    // const [isLogged, setIsLogged] = useState(false);

    const handleName = (e) =>{
        setName(e.target.value);
    }
    const handlePass = (e) =>{
        setPass(e.target.value);
    }

    // useEffect(() => {
    //     checkSession();    
    // }, []);

    const handleLogin = (e) =>{
        e.preventDefault();
        window.location.href = '/dashboard';
        // const user = {
        //     name: name,
        //     password: pass,
        // }
        // const request = new Request('http://localhost:5000/login', {
        //     method: 'POST',
        //     credentials: 'include',
        //     body: JSON.stringify(user),
        //     headers: new Headers({'Content-Type': 'application/json'}),
        // })
        // fetch(request)
        // .then(response => {
        //     if (response.ok) {
        //         console.log("Zalogowano")
        //         return checkSession();
        //     } else {
        //         setError('Wprowadzono błędny login lub hasło');
        //         throw new Error('Błąd logowania');
        //     }
        // })
        // .catch(error => {
        //     console.error(error);
        // });
    };
    const redirect = () =>{
        window.location.href = "/dashboard";
    }
    redirect();
    // const checkSession = () => {
    //     const request = new Request('http://localhost:5000/checkSession', {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: new Headers({'Content-Type': 'application/json'}),
    //     })
    //     fetch(request)
    //     .then(response => {
    //         if (response.ok) {
    //             window.location.href = '/dashboard';
    //             return response.json();
    //         } else {
    //             console.log("Użytkownik nie zalogowany");
    //         }
    //     })
    //     .catch(error => {
    //         //console.error("Użytkownik nie zalogowany");
    //     });
    // };

    return(
        <div className='WelcomePage'>
            <div className='center'>
                <img className='logo' src={logo} alt="logo" />
                {error === null ? 
                <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                Logowanie do aplikacji
                </div> : 
                <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                {error}
                </div>}
                <br />
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Login</label>
                        <input type="text" className="form-control" id="login" onChange={handleName} required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input type="password" className="form-control" id="password" onChange={handlePass} required></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Zaloguj</button>
                </form>
            </div>
        </div>
    );
}

export default WelcomePage;