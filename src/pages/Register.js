import React, {useState} from 'react';
import logo from '../images/Logo_transparent.png';

const Register = () =>{

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);

    const handleName = (e) =>{
        setName(e.target.value);
    }
    const handlePass = (e) =>{
        setPass(e.target.value);
    }

    const signUp = (e) =>{
        e.preventDefault();
        const id = Math.floor(Math.random() * 100);

        const user = {
            id,
            name: name,
            password: pass,
            role: 'user',
        }

        const request = new Request('https://companymanager-59f9b2ca55a6.herokuapp.com/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({ 'Content-Type' : 'application/json'}),
        });

        fetch(request)
            .then(response => {
                if(response.ok){
                    window.location.href = '/';
                }else if(response.status === 400){
                    response.json().then(data => {
                        setError(data.message);
                    })
                }})
            .catch(error => console.log("Error =>",error));
    }

    return(
        <div className='WelcomePage'>
            <div className='center'>
                <img className='logo' src={logo} alt="logo" />
                {error === null ? 
                <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                Dodawanie nowego użytkownika
                </div> : 
                <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                {error}
                </div>}
                    <form className='addEmployee' onSubmit={signUp}>
                        <div className="mb-3">
                            <label forhtml="name" className="form-label">Nazwa</label>
                            <input placeholder='Nazwa użytkownia' type="text" className="form-control" id="name" onChange={handleName} required/>
                        </div>
                        <div className="mb-3">
                            <label forhtml="pass" className="form-label">Hasło</label>
                            <input placeholder='Silne hasło' type="password" className="form-control" id="pass" onChange={handlePass} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Zarejestruj</button>
                    </form>
            </div>
        </div>
    );
}

export default Register;