import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

const EditDuty = () => {
  const { id } = useParams();
  const { dutyId } = useParams();
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);

  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("brak");
  const [hours, setHours] = useState("");

  const [error, setError] = useState(null);

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

  const getDutyData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-duty-data/${id}/${dutyId}`,
      {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setDate(data.date);
        setStart(data.start);
        setEnd(data.end);
        setNote(data.note);
        setHours(data.hours);
      });
  };

  useEffect(() => {
    getEmployeeData();
    getDutyData();
  }, [id]);

  const saveDuty = (e) => {
    e.preventDefault();
    const dane = {
      date: date,
      start: start,
      end: end,
      note: note,
      hours: hours,
    };
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/update-duty/${id}/${dutyId}`,
      {
        method: "POST",
        body: JSON.stringify(dane),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => {
        if (response.ok) {
          window.location.href = `/dashboard/employees/working-hours/${id}`;
        } else {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
  };

  const title = (
    <p>
      Edit shift for employee {" "}
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
              <form onSubmit={saveDuty}>
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
                          value={date}
                          className="form-control"
                          onChange={handleDate}
                        />
                      </th>
                      <td>
                        <input
                          type="time"
                          value={start}
                          className="form-control"
                          onChange={handleStart}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          value={end}
                          className="form-control"
                          onChange={handleEnd}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleNote}
                          value={note}
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
                          value={hours}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      {/* // ) : (
      //   <div className="WelcomePage">
      //     <div className="center">
      //       <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
      //         Użytkownik nie zalogowany
      //       </div>
      //       <br />
      //       <NavLink to="/">
      //         <button type="submit" className="btn btn-primary">
      //           Przejdź do logowania
      //         </button>
      //       </NavLink>
      //     </div>
      //   </div>
      // )} */}
    </>
  );
};

export default EditDuty;
