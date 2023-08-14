import React from 'react';
import { NavLink } from 'react-router-dom';

const Employee = (props) =>{
    return(
        <li className="list-group-item">
            {props.name} {props.surname}
            <button type="button" className="btn btn-danger right">Delete</button>
            <NavLink to={{
                pathname: `/dashboard/employees/edit-employee/${props.id}`,
                state: {
                    id: props.id
                }
            }}
            ><button type="button" className="btn btn-secondary right">Edit</button></NavLink>
            <NavLink to={{
                pathname: `/dashboard/employees/working-hours/${props.id}`,
                state: {
                    id: props.id
                }
            }}><button type="button" className="btn btn-primary right">Shifts</button></NavLink>
        </li>
    );
}

export default Employee;