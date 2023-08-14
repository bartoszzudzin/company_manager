import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import WelcomePage from '../pages/WelcomePage'
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Invoices from '../pages/Invoices';
import Bills from '../pages/Bills';
import EditBill from '../pages/EditBill';
import AddBill from '../pages/AddBill';
import Offers from '../pages/Offers';
import Fleet from '../pages/Fleet';
import EditCar from '../pages/EditCar';
import AddCar from '../pages/AddCar';
import Logout from '../pages/Logout';
import AddEmployee from '../pages/AddEmployee';
import WorkingHours from '../pages/WorkingHours';
import EditEmployee from '../pages/EditEmployee';
import AddInvoice from '../pages/AddInvoice';
import EditInvoice from '../pages/EditInvoice';
import Register from '../pages/Register';
import AddDuty from '../pages/AddDuty';
import EditDuty from '../pages/EditDuty';

const Routing = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/employees" element={<Employees />} />
                <Route path="/dashboard/employees/add-employee" element={<AddEmployee />} />
                <Route path="/dashboard/employees/working-hours/:id" element={<WorkingHours />} />
                <Route path="/dashboard/employees/working-hours/:id/add-hours" element={<AddDuty />} />
                <Route path="/dashboard/employees/working-hours/:id/edit-hours/:dutyId" element={<EditDuty />} />
                <Route path="/dashboard/employees/edit-employee/:id" element={<EditEmployee />} />
                <Route path="/dashboard/invoices" element={<Invoices />} />
                <Route path="/dashboard/invoices/add-invoice" element={<AddInvoice />} />
                <Route path="/dashboard/invoices/edit-invoice/:id" element={<EditInvoice />} />
                <Route path="/dashboard/bills" element={<Bills />} />
                <Route path="/dashboard/bills/edit-bill/:employee/:id" element={<EditBill />} />
                <Route path="/dashboard/bills/add-bill" element={<AddBill />} />
                <Route path="/dashboard/offers" element={<Offers />} />
                <Route path="/dashboard/fleet" element={<Fleet />} />
                <Route path="/dashboard/fleet/add-car" element={<AddCar />} />
                <Route path="/dashboard/fleet/edit-car/:id" element={<EditCar />} />
                <Route path="/dashboard/logout" element={<Logout />} />

                {/* Admin Paths */}
                <Route path="/add-user" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;