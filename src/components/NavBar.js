import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () =>{

    const handleLogout = () => {
        window.location.href = "/";
      };

    return(
        <ul className="nav flex-column">
            <li className="">
                <NavLink className="nav-link navBar active" aria-current="page" to="/dashboard"><i className="bi bi-house"></i> Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" to="/dashboard/employees"><i className="bi bi-person-circle"></i> Employees</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" to="/dashboard/bills"><i className="bi bi-book-half"></i> Employee settlements</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" to="/dashboard/invoices"><i className="bi bi-currency-dollar"></i> Invoices</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" to="/dashboard/offers"><i className="bi bi-card-list"></i> Offer generator</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" to="/dashboard/fleet"><i className="bi bi-bus-front-fill"></i> Fleet</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link navBar" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> Log out</NavLink>
            </li>
        </ul>
    )
}

export default NavBar;