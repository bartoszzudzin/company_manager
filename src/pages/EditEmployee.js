import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";
import "../styles/Dashboard.css";

import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const EditEmployee = () => {
  const title = (
    <p>
      Edit employee data <strong>{name} {surname}</strong>.
    </p>
  );

  const { id } = useParams();
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [error, setError] = useState(null);

  //DATABASE INFO
  const [dbName, setDBName] = useState("");
  const [dbSurname, setDBSurname] = useState("");
  const [dbPhone, setDBPhone] = useState("");
  const [dbBday, setDBBday] = useState("");
  const [dbSalary, setDbSalary] = useState("");

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

  const [info, setInfo] = useState(
    "Make changes to the employee's data in the form below."
  );

  const handleName = (e) => {
    setDBName(e.target.value);
  };
  const handleSurname = (e) => {
    setDBSurname(e.target.value);
  };
  const handlePhone = (e) => {
    setDBPhone(e.target.value);
  };
  const handleBDate = (e) => {
    setDBBday(e.target.value);
  };
  const handleDbSalary = (e) => {
    setDbSalary(e.target.value);
  };
  const updateEmployee = (e) => {
    e.preventDefault();
    const dane = {
      name: dbName,
      surname: dbSurname,
      phone: dbPhone,
      birthDate: dbBday,
      salary: dbSalary,
    };

    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/update-employee/${id}`, {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          setInfo("Successfully updated employee data");
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => setError(error));
  };

  const getEmployeeData = () => {
    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/employee/${id}`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setDBName(data[0].name);
        setDBSurname(data[0].surname);
        setDBPhone(data[0].phone);
        const inputDate = data[0].birthDate;
        const dateObject = new Date(inputDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const convertedDate = `${year}-${month}-${day}`;
        setDBBday(convertedDate);
        setDbSalary(data[0].salary);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, [id]);
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
              <form className="addEmployee" onSubmit={updateEmployee}>
                <div className="mb-3">
                  <label forhtml="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleName}
                    value={dbName}
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
                    value={dbSurname}
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
                    value={dbPhone}
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
                    value={dbBday}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="salary" className="form-label">
                  Gross hourly rate (USD)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    onChange={handleDbSalary}
                    value={dbSalary}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
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

export default EditEmployee;
