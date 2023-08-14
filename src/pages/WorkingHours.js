import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/Dashboard.css";

import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Duty from "../components/Duty";

const Dashboard = (props) => {
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
  const [duties, setDuties] = useState([]);

  const [hoursAmount, setHoursAmount] = useState(0);
  const [salaryPerHour, setSalaryPerHour] = useState(0);
  const [salary, setSalary] = useState(0);

  const handleDate = (e) => {
    setDate(e.target.value);
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
        setSalaryPerHour(data[0].salary);
      });
  };

  const getDutiesData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-duties/${id}/${date}`,
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
            dutyId: data[key].dutyId,
            date: data[key].date,
            start: data[key].start,
            end: data[key].end,
            note: data[key].note,
            hours: data[key].hours,
          });
        }
        setDuties(arr);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, [id]);

  useEffect(() => {
    getDutiesData();
  }, [date]);

  useEffect(() => {
    setHoursAmount(
      allDuties.reduce((sum, duty) => sum + parseFloat(duty.props.hours), 0)
    );
  }, [duties]);

  useEffect(() => {
    setSalary(hoursAmount * salaryPerHour);
  }, [hoursAmount]);

  const allDuties = duties.map((duty) => (
    <Duty
      key={duty.dutyId}
      dutyId={duty.dutyId}
      date={duty.date}
      start={duty.start}
      end={duty.end}
      note={duty.note}
      hours={duty.hours}
    />
  ));

  const sortedDuties = allDuties.slice().sort((a, b) => {
    const dateA = new Date(a.props.date);
    const dateB = new Date(b.props.date);
    return dateA - dateB;
  });

  const title = (
    <p>
      Shifts of employee{" "}
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
              <p>
              Select the month for which you want to summarize the employee's hours {name}{" "}
                {surname}.
              </p>
              <select
                className="form-select width20"
                aria-label="Default select example"
                onChange={handleDate}
              >
                <option defaultValue="Miesiąc">Month</option>
                <option value={"2023-08"}>August 2023</option>
                <option value={"2023-09"}>September 2023</option>
                <option value={"2023-10"}>October 2023</option>
              </select>
              <br />
              <NavLink
                to={{
                  pathname: `/dashboard/employees/working-hours/${id}/add-hours`,
                  state: {
                    id: props.id,
                  },
                }}
              >
                <button type="button" className="btn btn-success">
                  Add shift
                </button>
              </NavLink>

              <table className="table margin50">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Start time</th>
                    <th scope="col">End time</th>
                    <th scope="col">Note</th>
                    <th scope="col">Total hours</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDuties}
                  <tr className="table-secondary">
                    <th scope="row">-</th>
                    <td>-</td>
                    <td>
                      <strong style={{ color: "black" }}>Summary</strong>
                    </td>
                    <td>Sum of hours:</td>
                    <td>{hoursAmount}</td>
                    <td></td>
                  </tr>
                  <tr className="table-success">
                    <th scope="row">-</th>
                    <td>-</td>
                    <td></td>
                    <td>
                      Estimated salary <br /> (gross):
                    </td>
                    <td>{salary} $</td>
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

export default Dashboard;
// zaimplementować listę dodanych godzin
