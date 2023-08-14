import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const AddEmployee = () => {
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

  const title = (
    <p>
      Add new <strong>employee</strong>.
    </p>
  );

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(
    "Enter all the necessary data to add a new employee."
  );

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSurname = (e) => {
    setSurname(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleBDate = (e) => {
    setBirthDate(e.target.value);
  };
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  const addNewEmployee = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100);

    const employee = {
      id: id,
      name: name,
      surname: surname,
      phone: phone,
      birthDate: birthDate,
      salary: salary,
    };

    const request = new Request("https://companymanager-59f9b2ca55a6.herokuapp.com/add-employee", {
      method: "POST",
      body: JSON.stringify(employee),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          setInfo("Successfully added a new employee.");
        } else if (response.status === 400) {
          response.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((error) => console.log("Error =>", error));
  };

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
              {error === null ? (
                <p>{info}</p>
              ) : (
                <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                  {error}
                </div>
              )}
              <form className="addEmployee" onSubmit={addNewEmployee}>
                <div className="mb-3">
                  <label forhtml="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="surname" className="form-label">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    onChange={handleSurname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    onChange={handlePhone}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="birthdate" className="form-label">
                    Birth date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthdate"
                    onChange={handleBDate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="salary" className="form-label">
                    Hourly rate (USD)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="birthdate"
                    step={0.01}
                    onChange={handleSalary}
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
                Go to Sign in
              </button>
            </NavLink>
          </div>
        </div>
      )} */}
    </>
  );
};

export default AddEmployee;
