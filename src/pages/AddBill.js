import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const AddBill = () => {
  // const [isLogged, setIsLogged] = useState(false);
  // const [userName, setUserName] = useState(false);

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

  const title = (
    <p>
      Add new <strong>bill</strong>.
    </p>
  );
  const [info, setInfo] = useState(
    "Use the form to add a new settlement."
  );
  const [employees, setEmployees] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState(0);
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  const handleEmployeeSelect = (e) => {
    setEmployeeSelected(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };

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

  const addBill = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100);
    const id = date.slice(0, 4) + random;
    const dane = {
      id: id,
      date: date,
      description: description,
      value: value,
    };
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/add-bill/${employeeSelected}`,
      {
        method: "POST",
        body: JSON.stringify(dane),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => {
        if (response.ok) {
          window.location.href = "/dashboard/bills";
        } else {
          response.json().then((data) => {
            setInfo(data.message);
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const allEmployees = employees.map((employee) => (
    <option value={employee.id} key={employee.id}>
      {employee.name} {employee.surname}
    </option>
  ));
  useEffect(() => {
    getEmployeesData();
  }, []);
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
              <p>{info}</p>
              <form className="addEmployee" onSubmit={addBill}>
                <label forhtml="employee" className="form-label">
                  Choose employee from list:
                </label>
                <select
                  className="form-select"
                  id="employee"
                  aria-label="Default select example"
                  onChange={handleEmployeeSelect}
                >
                  <option value={0}>-</option>
                  {allEmployees}
                </select>
                <br />
                <div className="mb-3">
                  <label forhtml="date" className="form-label">
                    Date of bill
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={handleDate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="description" className="form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    onChange={handleDescription}
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="value" className="form-label">
                    Value
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="value"
                    step={0.01}
                    onChange={handleValue}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
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

export default AddBill;
