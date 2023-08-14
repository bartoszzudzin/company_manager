import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Dashboard.css';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Employee from '../components/Employee';

const Employees = () =>{

    const title = <p><strong>Employees</strong> list.</p>
    const [employees, setEmployees] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState(false);

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

    const request = new Request('https://companymanager-59f9b2ca55a6.herokuapp.com/employees', {
            method: 'GET',
            headers: new Headers({ 'Content-Type' : 'application/json'}),
    });
    useEffect(() =>{
    fetch(request)
        .then(response => response.json())
        .then(data => {
            const arr = [];
            for(let key in data){
                arr.push({
                    id: data[key].id,
                    name: data[key].name,
                    surname: data[key].surname,
                    phone: data[key].phone,
                    birthDate: data[key].birthDate,
                });
            }
            setEmployees(arr);
        })
    }, [])

    const allEmployees = employees.map(employee =>(
        <Employee
            id={employee.id}
            key={employee.phone}
            name={employee.name}
            surname={employee.surname}
            phone={employee.phone}
            birthDate={employee.birthDate}
        />
    ))

    return(
        <>
        {/* {isLogged ? */}
        <div className='dashboard'>
            <TopBar 
            title={title}
            // userName={userName}
            />
            <div className='frontPanel'>
                <NavBar />
                <div className='window withPadding'>
                    <p>Employee management and data entry.</p>
                    <NavLink to="/dashboard/employees/add-employee"><button type="button" className="btn btn-success">Add employee</button></NavLink>
                <ul className="list-group">
                    {allEmployees}
                </ul>
                </div>
            </div>
        </div>
        {/* :
        <div className='WelcomePage'>
            <div className='center'>
                <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                Użytkownik nie zalogowany
                </div>
                <br />
                <NavLink to="/"><button type="submit" className="btn btn-primary">Go to Sign in</button></NavLink>
            </div>
        </div>
        } */}
        </>
    );
}

export default Employees;