import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const EditCar = () => {
  const { id } = useParams();
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
      Edit your <strong>car</strong>.
    </p>
  );
  const [info, setInfo] = useState(
    "Use the form to edit your vehicle."
  );

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [oc, setOc] = useState("");
  const [inspection, setInspection] = useState("");

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

  const getCarData = () => {
    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/get-car-data/${id}`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setName(data[0].name);
        setModel(data[0].model);
        setYear(data[0].year);
        setOc(data[0].oc.slice(0, 10));
        setInspection(data[0].inspection.slice(0, 10));
      });
  };

  const editCar = (e) => {
    e.preventDefault();
    const dane = {
      name: name,
      model: model,
      year: year,
      oc: oc,
      inspection: inspection,
    };

    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/edit-car/${id}`, {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          setInfo("Car data updated successfully");
          window.location.href = "/dashboard/fleet";
        } else {
          setInfo("Something went wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCarData();
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
              <p>{info}</p>
              <form className="addEmployee" onSubmit={editCar}>
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
                    value={name}
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
                    value={model}
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
                    value={year}
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
                    value={oc}
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
                    value={inspection}
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

export default EditCar;
