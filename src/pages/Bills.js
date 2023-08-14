import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Dashboard.css";

import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Bill from "../components/Bill";

const Bills = () => {
  const [id, setId] = useState(0);
  const [date, setDate] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [valueAmount, setValueAmount] = useState(0);

  const [bills, setBills] = useState([]);

  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(false);

  // useEffect(() => {
  //   checkSession();
  // }, [isLogged]);

  // const checkSession = () => {
  //   const request = new Request("http://localhost:5000/checkSession", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //   });
  //   fetch(request)
  //     .then((response) => {
  //       if (response.ok) {
  //         setIsLogged(true);
  //         return response.json();
  //       } else {
  //         console.log("Użytkownik nie zalogowany");
  //         window.location.href = "/";
  //       }
  //     })
  //     .then((data) => {
  //       setUserName(data ? data.name : null);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleId = (e) => {
    setId(e.target.value);
  };

  const getBillsData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-bill-data/${id}/${date}`,
      {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        const arr = [];
        for (let key in data) {
          arr.push({
            id: data[key].id,
            date: data[key].date,
            description: data[key].description,
            value: data[key].value,
          });
        }
        setBills(arr);
      });
  };

  useEffect(() => {
    getBillsData();
  }, [id]);

  useEffect(() => {
    getBillsData();
  }, [date]);

  const allBills = bills.map((bill) => (
    <Bill
      key={bill.id}
      id={bill.id}
      employee={id}
      date={bill.date}
      description={bill.description}
      value={bill.value}
    />
  ));

  useEffect(() => {
    setValueAmount(
      allBills.reduce((sum, bill) => sum + parseFloat(bill.props.value), 0)
    );
  }, [bills]);

  const getEmployeesData = () => {
    const request = new Request("https://companymanager-59f9b2ca55a6.herokuapp.com/employees", {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        const arr = [];
        for (let key in data) {
          arr.push({
            id: data[key].id,
            name: data[key].name,
            surname: data[key].surname,
          });
        }
        setEmployees(arr);
      });
  };

  const allEmployees = employees.map((employee) => (
    <option value={employee.id} key={employee.id}>
      {employee.name} {employee.surname}
    </option>
  ));
  useEffect(() => {
    getEmployeesData();
  }, []);

  const title = (
    <p>
      Employee <strong>settlements.</strong>
    </p>
  );
  return (
    <>
      {/* {isLogged ? ( */}
        <div className="dashboard">
          <TopBar title={title} 
          // userName={userName} 
          />
          <div className="frontPanel">
            <NavBar />
            <div className="window withPadding">
              <p>View and manage employee billing.</p>
              <NavLink to="/dashboard/bills/add-bill">
                <button type="button" className="btn btn-success">
                  Add new bill
                </button>
              </NavLink>
              <p className="margin50">
              Select the employee and month for which you want to view settlement.
              </p>
              <select
                className="form-select width20"
                aria-label="Default select example"
                onChange={handleId}
              >
                <option value={0}>-</option>
                {allEmployees}
              </select>
              <br />
              <label>Month</label>
              <select
                className="form-select width20"
                aria-label="Default select example"
                onChange={handleDate}
              >
                <option value={"0"}>-</option>
                <option value={"2023-08"}>August 2023</option>
                <option value={"2023-09"}>September 2023</option>
                <option value={"2023-10"}>October 2023</option>
              </select>
              <br />
              <table className="table">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">Date</th>
                    <th scope="col">Note</th>
                    <th scope="col">Value</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBills}
                  <tr className="table-success">
                    <th scope="row"></th>
                    <td>
                      <strong style={{ color: "black" }}>Summary:</strong>
                    </td>
                    <td>
                      <strong style={{ color: "black" }}>
                        {valueAmount} $
                      </strong>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {/* ) : (
        <div className="WelcomePage">
          <div className="center">
            <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
              Użytkownik nie zalogowany
            </div>
            <br />
            <NavLink to="/">
              <button type="submit" className="btn btn-primary">
                Przejdź do logowania
              </button>
            </NavLink>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Bills;
