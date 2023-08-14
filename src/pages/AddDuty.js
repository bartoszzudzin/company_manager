import React, { useState, useEffect } from "react";
import logo from "../images/Logo_transparent.png";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

const AddDuty = () => {
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

  const { id } = useParams();
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);

  const [date, setDate] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [note, setNote] = useState(null);
  const [hours, setHours] = useState(null);

  const [error, setError] = useState(null);

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleStart = (e) => {
    setStart(e.target.value);
  };
  const handleEnd = (e) => {
    setEnd(e.target.value);
  };
  const handleNote = (e) => {
    setNote(e.target.value);
  };
  const handleHours = (e) => {
    setHours(e.target.value);
  };

  const getEmployeeData = () => {
    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/employee/${id}`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setName(data[0].name);
        setSurname(data[0].surname);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, [id]);

  const submitDuty = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100000);

    const dane = {
      id: id,
      dutyId: id + "_" + random,
      date,
      start,
      end,
      note,
      hours,
    };

    const request = new Request("https://companymanager-59f9b2ca55a6.herokuapp.com/add-duty", {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          window.location.href = `/dashboard/employees/working-hours/${id}`;
        } else if (response.status === 400) {
          response.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((error) => console.log("Error =>", error));
  };

  const title = (
    <p>
      Add shift for employee{" "}
      <strong>
        {name} {surname}
      </strong>
      .
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
              <p>{error}</p>
              <form onSubmit={submitDuty}>
                <table className="table margin20 table-secondary">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Note</th>
                      <th scope="col">Total hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-light">
                      <th scope="row">
                        <input
                          type="date"
                          className="form-control"
                          onChange={handleDate}
                          required
                        />
                      </th>
                      <td>
                        <input
                          type="time"
                          className="form-control"
                          onChange={handleStart}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className="form-control"
                          onChange={handleEnd}
                          required
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleNote}
                          required
                        >
                          <option value={"none"}>none</option>
                          <option value={"nightshift"}>night shift</option>
                          <option value={"sickness"}>sickness</option>
                          <option value={"dayoff"}>day off</option>
                          <option value={"absent"}>absent</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          onChange={handleHours}
                          step={"0.01"}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-success">
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

export default AddDuty;
