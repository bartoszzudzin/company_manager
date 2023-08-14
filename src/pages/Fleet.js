import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { NavLink } from "react-router-dom";

import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Car from "../components/Car";

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const title = (
    <p>
      Fleet of <strong>vehicles</strong>.
    </p>
  );

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

  const getCarsData = () => {
    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/get-car-data/`, {
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
            model: data[key].model,
            year: data[key].year,
            oc: data[key].oc,
            inspection: data[key].inspection,
          });
        }
        setCars(arr);
      });
  };

  useEffect(() => {
    getCarsData();
  }, [cars]);

  const allCars = cars.map((car) => (
    <Car
      id={car.id}
      key={car.id}
      name={car.name}
      model={car.model}
      year={car.year}
      oc={car.oc}
      inspection={car.inspection}
    />
  ));

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
              <p>Your fleet.</p>
              <NavLink to="/dashboard/fleet/add-car">
                <button type="button" className="btn btn-success">
                  Add new car
                </button>
              </NavLink>
              <br />
              <table className="table margin20">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">Vehicle brand</th>
                    <th scope="col">Vehicle model</th>
                    <th scope="col">Year of production</th>
                    <th scope="col">Insurance</th>
                    <th scope="col">Vehicle overview</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{allCars}</tbody>
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

export default Fleet;
