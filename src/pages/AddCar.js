import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { model } from "mongoose";

const AddCar = () => {
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
      Adding new car to your <strong>fleet</strong>.
    </p>
  );
  const [info, setInfo] = useState(
    "Use the form to add a new vehicle."
  );

  const [name, setName] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [oc, setOc] = useState(null);
  const [inspection, setInspection] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleModel = (e) => {
    setModel(e.target.value);
  };
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleOc = (e) => {
    setOc(e.target.value);
  };
  const handleInspection = (e) => {
    setInspection(e.target.value);
  };

  const addCar = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100);
    const dane = {
      id: random,
      name: name,
      model: model,
      year: year,
      oc: oc,
      inspection: inspection,
    };
    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/add-car/`, {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          window.location.href = "/dashboard/fleet";
        } else {
          response.json().then((data) => {
            setInfo(data.message);
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* {isLogged ? ( */}
        <div className="dashboard">
          <TopBar title={title}
          //  userName={userName}
           />
          <div className="frontPanel">
            <NavBar />
            <div className="window withPadding">
              <p>{info}</p>
              <form className="addEmployee" onSubmit={addCar}>
                <br />
                <div className="mb-3">
                  <label forhtml="description" className="form-label">
                  Vehicle brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    onChange={handleName}
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="description" className="form-label">
                    Vehicle model
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    onChange={handleModel}
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="year" className="form-label">
                    Year of production
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    onChange={handleYear}
                    step={0}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="oc" className="form-label">
                    Insurance
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="oc"
                    onChange={handleOc}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="inspection" className="form-label">
                    Vehicle overview
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inspection"
                    onChange={handleInspection}
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

export default AddCar;
